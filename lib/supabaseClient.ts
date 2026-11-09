'use client';

import { createClient, SupabaseClient, User } from '@supabase/supabase-js';

// Environment variables
const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const envKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if credentials are set and not default placeholders
export function isSupabaseConfigured(): boolean {
  if (typeof window !== 'undefined') {
    // Check localStorage overrides if user entered keys in the UI modal
    const localUrl = localStorage.getItem('supabase_custom_url');
    const localKey = localStorage.getItem('supabase_custom_key');
    if (localUrl && localKey && localUrl.startsWith('http')) return true;
  }
  return Boolean(
    envUrl &&
    envKey &&
    !envUrl.includes('seu-projeto') &&
    !envUrl.includes('your-project') &&
    envUrl.startsWith('http')
  );
}

export function getActiveSupabaseConfig() {
  if (typeof window !== 'undefined') {
    const localUrl = localStorage.getItem('supabase_custom_url');
    const localKey = localStorage.getItem('supabase_custom_key');
    if (localUrl && localKey) {
      return { url: localUrl, anonKey: localKey, isCustom: true };
    }
  }
  return {
    url: envUrl || '',
    anonKey: envKey || '',
    isCustom: false,
  };
}

let supabaseInstance: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  const config = getActiveSupabaseConfig();
  if (!config.url || !config.anonKey || !config.url.startsWith('http')) {
    return null;
  }
  try {
    if (!supabaseInstance) {
      supabaseInstance = createClient(config.url, config.anonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        },
      });
    }
    return supabaseInstance;
  } catch (err) {
    console.warn('Erro ao inicializar cliente Supabase:', err);
    return null;
  }
}

export interface CinephileProfile {
  id?: string;
  email: string;
  name: string;
  tier: 'VIP Gold' | 'Crítico Master' | 'Diretor' | 'Convidado';
  ticketCode: string;
  handle?: string;
  bio?: string;
  favoriteGenres?: string[];
  favoriteDirector?: string;
  topMovies?: string[];
  avatarIcon?: string;
  theaterCity?: string;
  sessionsWatched?: number;
  hoursWatched?: number;
  reviewsWritten?: number;
  badges?: string[];
  membershipDate?: string;
}

/**
 * Save or update extended cinephile profile in Supabase and local cache
 */
export async function saveCinephileProfile(
  profile: Partial<CinephileProfile> & { email: string }
): Promise<{ success: boolean; error: string | null; profile?: CinephileProfile }> {
  const supabase = getSupabase();

  // Save to local storage cache so it persists seamlessly in both modes
  if (typeof window !== 'undefined') {
    const profilesCache = JSON.parse(localStorage.getItem('obsidian_profiles_cache') || '{}');
    const existing = profilesCache[profile.email.toLowerCase()] || {};
    const updated = {
      ...existing,
      ...profile,
      updated_at: new Date().toISOString(),
    };
    profilesCache[profile.email.toLowerCase()] = updated;
    localStorage.setItem('obsidian_profiles_cache', JSON.stringify(profilesCache));
  }

  if (!supabase) {
    return { success: true, error: null };
  }

  try {
    // 1. Update user metadata in Supabase Auth
    await supabase.auth.updateUser({
      data: {
        name: profile.name,
        tier: profile.tier,
        handle: profile.handle,
        bio: profile.bio,
        favoriteGenres: profile.favoriteGenres,
        favoriteDirector: profile.favoriteDirector,
        topMovies: profile.topMovies,
        avatarIcon: profile.avatarIcon,
        theaterCity: profile.theaterCity,
      },
    });

    // 2. Upsert into Supabase public.profiles table
    const { data: authData } = await supabase.auth.getUser();
    if (authData.user) {
      await supabase.from('profiles').upsert({
        id: authData.user.id,
        email: profile.email,
        name: profile.name,
        tier: profile.tier,
        ticket_code: profile.ticketCode,
        handle: profile.handle,
        bio: profile.bio,
        favorite_genres: profile.favoriteGenres,
        favorite_director: profile.favoriteDirector,
        top_movies: profile.topMovies,
        avatar_icon: profile.avatarIcon,
        theater_city: profile.theaterCity,
        sessions_watched: profile.sessionsWatched,
        hours_watched: profile.hoursWatched,
        reviews_written: profile.reviewsWritten,
        updated_at: new Date().toISOString(),
      });
    }

    return { success: true, error: null };
  } catch (err: unknown) {
    console.warn('Erro ao sincronizar com tabela profiles do Supabase:', err);
    // Even if remote table hasn't run the migration yet, the auth metadata and local cache succeeded
    return { success: true, error: null };
  }
}

/**
 * Load full cinephile profile
 */
export async function loadCinephileProfile(
  email: string
): Promise<CinephileProfile | null> {
  const supabase = getSupabase();

  // 1. Try local cache first for instant reactivity
  let cached: CinephileProfile | null = null;
  if (typeof window !== 'undefined') {
    const profilesCache = JSON.parse(localStorage.getItem('obsidian_profiles_cache') || '{}');
    if (profilesCache[email.toLowerCase()]) {
      cached = profilesCache[email.toLowerCase()];
    }
  }

  if (!supabase) {
    return cached;
  }

  try {
    const { data: authData } = await supabase.auth.getUser();
    if (authData.user && authData.user.email?.toLowerCase() === email.toLowerCase()) {
      const meta = authData.user.user_metadata || {};
      
      // Try to read from table 'profiles'
      let dbProfile: Record<string, any> = {};
      try {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authData.user.id)
          .single();
        if (data) dbProfile = data;
      } catch {
        // Table might be optional
      }

      const merged: CinephileProfile = {
        id: authData.user.id,
        email: authData.user.email,
        name: dbProfile.name || meta.name || cached?.name || email.split('@')[0],
        tier: dbProfile.tier || meta.tier || cached?.tier || 'VIP Gold',
        ticketCode: dbProfile.ticket_code || meta.ticketCode || cached?.ticketCode || `OBS-8841-VIP`,
        handle: dbProfile.handle || meta.handle || cached?.handle || `@${email.split('@')[0]}`,
        bio: dbProfile.bio || meta.bio || cached?.bio || 'Cinéfilo apaixonado pela experiência da tela grande e projeção 35mm.',
        favoriteGenres: dbProfile.favorite_genres || meta.favoriteGenres || cached?.favoriteGenres || ['Ficção Científica', 'Neo-Noir'],
        favoriteDirector: dbProfile.favorite_director || meta.favoriteDirector || cached?.favoriteDirector || 'Christopher Nolan',
        topMovies: dbProfile.top_movies || meta.topMovies || cached?.topMovies || ['Blade Runner 2049', 'Interestelar', 'Duna'],
        avatarIcon: dbProfile.avatar_icon || meta.avatarIcon || cached?.avatarIcon || 'clapperboard',
        theaterCity: dbProfile.theater_city || meta.theaterCity || cached?.theaterCity || 'Sala IMAX - São Paulo',
        sessionsWatched: dbProfile.sessions_watched ?? cached?.sessionsWatched ?? 14,
        hoursWatched: dbProfile.hours_watched ?? cached?.hoursWatched ?? 38,
        reviewsWritten: dbProfile.reviews_written ?? cached?.reviewsWritten ?? 9,
        badges: cached?.badges || ['Cineasta 35mm', 'Madrugador IMAX', 'Cinéfilo Fundador'],
        membershipDate: cached?.membershipDate || '09 Nov 2026',
      };

      if (typeof window !== 'undefined') {
        const profilesCache = JSON.parse(localStorage.getItem('obsidian_profiles_cache') || '{}');
        profilesCache[email.toLowerCase()] = merged;
        localStorage.setItem('obsidian_profiles_cache', JSON.stringify(profilesCache));
      }

      return merged;
    }
  } catch (err) {
    console.warn('Erro ao carregar perfil do Supabase:', err);
  }

  return cached;
}

/**
 * Register a new cinephile account with email, password and profile data in Supabase
 */
export async function registerCinephile({
  email,
  password,
  name,
  tier = 'VIP Gold',
}: {
  email: string;
  password: string;
  name: string;
  tier?: 'VIP Gold' | 'Crítico Master' | 'Diretor';
}): Promise<{ user: CinephileProfile | null; error: string | null; isSimulated?: boolean }> {
  const supabase = getSupabase();
  const ticketCode = `OBS-${Math.floor(1000 + Math.random() * 9000)}-${tier.substring(0, 3).toUpperCase()}`;

  // If Supabase credentials are not connected yet, provide local storage simulation so the UI doesn't freeze
  if (!supabase) {
    // Store in local storage as fallback simulation
    const usersJson = localStorage.getItem('obsidian_simulated_users') || '[]';
    const users: Array<{ email: string; pass: string; name: string; tier: any; ticketCode: string }> = JSON.parse(usersJson);
    
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { user: null, error: 'Este e-mail já possui cadastro na sala. Tente fazer login.' };
    }

    const newUser = { email, pass: password, name, tier, ticketCode };
    users.push(newUser);
    localStorage.setItem('obsidian_simulated_users', JSON.stringify(users));

    return {
      user: {
        id: 'sim-' + Date.now(),
        email,
        name,
        tier,
        ticketCode,
      },
      error: null,
      isSimulated: true,
    };
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          tier,
          ticketCode,
        },
      },
    });

    if (error) {
      return { user: null, error: error.message };
    }

    if (data.user) {
      // Optional: attempt to save to 'profiles' table if it exists in Supabase
      try {
        await supabase.from('profiles').upsert({
          id: data.user.id,
          email,
          name,
          tier,
          ticket_code: ticketCode,
          updated_at: new Date().toISOString(),
        });
      } catch (profileErr) {
        // Table might not exist yet; metadata is already saved in Auth
        console.info('Aviso sobre tabela profiles:', profileErr);
      }

      return {
        user: {
          id: data.user.id,
          email: data.user.email || email,
          name: data.user.user_metadata?.name || name,
          tier: data.user.user_metadata?.tier || tier,
          ticketCode: data.user.user_metadata?.ticketCode || ticketCode,
        },
        error: null,
      };
    }

    return { user: null, error: 'Não foi possível criar o usuário no Supabase.' };
  } catch (err: unknown) {
    return {
      user: null,
      error: err instanceof Error ? err.message : 'Falha na comunicação com o Supabase.',
    };
  }
}

/**
 * Sign in existing cinephile account
 */
export async function loginCinephile({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ user: CinephileProfile | null; error: string | null; isSimulated?: boolean }> {
  const supabase = getSupabase();

  if (!supabase) {
    // Check local simulated storage
    const usersJson = localStorage.getItem('obsidian_simulated_users') || '[]';
    const users: Array<{ email: string; pass: string; name: string; tier: any; ticketCode: string }> = JSON.parse(usersJson);
    
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.pass === password
    );

    if (found) {
      return {
        user: {
          id: 'sim-' + found.email,
          email: found.email,
          name: found.name,
          tier: found.tier,
          ticketCode: found.ticketCode,
        },
        error: null,
        isSimulated: true,
      };
    }

    // Allow default test credentials even without DB
    if (email.includes('@') && password.length >= 6) {
      return {
        user: {
          id: 'sim-demo',
          email,
          name: email.split('@')[0],
          tier: 'VIP Gold',
          ticketCode: `OBS-${Math.floor(1000 + Math.random() * 9000)}-VIP`,
        },
        error: null,
        isSimulated: true,
      };
    }

    return { user: null, error: 'Credenciais inválidas. Verifique seu e-mail e senha.' };
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { user: null, error: error.message };
    }

    if (data.user) {
      const meta = data.user.user_metadata || {};
      const tier = meta.tier || 'VIP Gold';
      const ticketCode = meta.ticketCode || `OBS-${data.user.id.substring(0, 4)}-VIP`;

      return {
        user: {
          id: data.user.id,
          email: data.user.email || email,
          name: meta.name || email.split('@')[0],
          tier,
          ticketCode,
        },
        error: null,
      };
    }

    return { user: null, error: 'Usuário não encontrado.' };
  } catch (err: unknown) {
    return {
      user: null,
      error: err instanceof Error ? err.message : 'Falha na comunicação com o Supabase.',
    };
  }
}

/**
 * Send password reset email via Supabase
 */
export async function sendPasswordResetEmail(email: string): Promise<{ success: boolean; error: string | null }> {
  const supabase = getSupabase();
  if (!supabase) {
    return { success: true, error: null }; // Simulated
  }

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) return { success: false, error: error.message };
    return { success: true, error: null };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : 'Erro ao enviar e-mail' };
  }
}

/**
 * Sign out
 */
export async function logoutCinephile(): Promise<void> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.warn('Erro ao deslogar do Supabase:', err);
    }
  }
}
