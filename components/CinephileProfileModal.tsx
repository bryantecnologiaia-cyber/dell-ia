'use client';

import React, { useState } from 'react';
import {
  User,
  Film,
  Clapperboard,
  Star,
  Award,
  Sparkles,
  Camera,
  Popcorn,
  Disc3,
  Check,
  X,
  Save,
  MapPin,
  Clock,
  Heart,
  Edit3,
  BadgeCheck,
} from 'lucide-react';
import { CinephileProfile, saveCinephileProfile } from '@/lib/supabaseClient';

interface CinephileProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: CinephileProfile;
  onProfileUpdated: (updated: CinephileProfile) => void;
}

const AVAILABLE_GENRES = [
  'Ficção Científica',
  'Neo-Noir',
  'Épico',
  'Cyberpunk',
  'Terror Psicológico',
  'Drama de Época',
  'Clássicos 35mm',
  'Cinema Autoral',
  'Suspense Policial',
  'Aventura Cósmica',
];

const AVATARS = [
  { id: 'clapperboard', label: 'Claquete', icon: Clapperboard, color: '#FF6B00' },
  { id: 'projector', label: 'Projetor', icon: Disc3, color: '#FFB800' },
  { id: 'film', label: 'Película', icon: Film, color: '#E50914' },
  { id: 'camera', label: 'Câmera', icon: Camera, color: '#FF6B00' },
  { id: 'popcorn', label: 'Pipoca Dourada', icon: Popcorn, color: '#FFB800' },
  { id: 'star', label: 'Estrela VIP', icon: Star, color: '#FFB800' },
];

export default function CinephileProfileModal({
  isOpen,
  onClose,
  profile,
  onProfileUpdated,
}: CinephileProfileModalProps) {
  const [activeTab, setActiveTab] = useState<'view' | 'edit'>('view');
  const [name, setName] = useState(profile.name || '');
  const [handle, setHandle] = useState(profile.handle || `@${profile.email.split('@')[0]}`);
  const [bio, setBio] = useState(
    profile.bio || 'Cinéfilo apaixonado pela experiência da tela grande e projeção 35mm.'
  );
  const [tier, setTier] = useState(profile.tier || 'VIP Gold');
  const [favoriteDirector, setFavoriteDirector] = useState(
    profile.favoriteDirector || 'Christopher Nolan'
  );
  const [theaterCity, setTheaterCity] = useState(
    profile.theaterCity || 'Sala IMAX - São Paulo'
  );
  const [avatarIcon, setAvatarIcon] = useState(profile.avatarIcon || 'clapperboard');
  const [favoriteGenres, setFavoriteGenres] = useState<string[]>(
    profile.favoriteGenres || ['Ficção Científica', 'Neo-Noir']
  );
  const [movie1, setMovie1] = useState(profile.topMovies?.[0] || 'Blade Runner 2049');
  const [movie2, setMovie2] = useState(profile.topMovies?.[1] || 'Interestelar');
  const [movie3, setMovie3] = useState(profile.topMovies?.[2] || 'Duna: Parte 2');
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const toggleGenre = (genre: string) => {
    if (favoriteGenres.includes(genre)) {
      setFavoriteGenres(favoriteGenres.filter((g) => g !== genre));
    } else {
      setFavoriteGenres([...favoriteGenres, genre]);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSavedSuccess(false);

    const updatedProfile: CinephileProfile = {
      ...profile,
      name,
      handle: handle.startsWith('@') ? handle : `@${handle}`,
      bio,
      tier,
      favoriteDirector,
      theaterCity,
      avatarIcon,
      favoriteGenres,
      topMovies: [movie1, movie2, movie3].filter(Boolean),
      sessionsWatched: profile.sessionsWatched ?? 14,
      hoursWatched: profile.hoursWatched ?? 38,
      reviewsWritten: profile.reviewsWritten ?? 9,
      badges: profile.badges || ['Cineasta 35mm', 'Madrugador IMAX', 'Cinéfilo Fundador'],
    };

    const res = await saveCinephileProfile(updatedProfile);
    setIsSaving(false);

    if (res.success) {
      setSavedSuccess(true);
      onProfileUpdated(updatedProfile);
      setTimeout(() => {
        setSavedSuccess(false);
        setActiveTab('view');
      }, 700);
    }
  };

  const SelectedAvatarComponent =
    AVATARS.find((a) => a.id === avatarIcon)?.icon || Clapperboard;

  return (
    <div className="fixed inset-0 z-50 bg-[#0B0B0F]/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#121218] border border-[#FF6B00]/40 rounded-2xl max-w-2xl w-full p-6 sm:p-8 cinema-glow-primary shadow-2xl relative max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#9E9EA8] hover:text-[#E50914] transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#5C5C6B]/30 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF6B00] via-[#FF7A1A] to-[#E50914] flex items-center justify-center text-[#0B0B0F] shadow-lg cinema-glow-primary">
              <SelectedAvatarComponent className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse" />
                <span className="text-[10px] font-mono tracking-widest text-[#FFB800] uppercase font-bold">
                  PERFIL DO CINÉFILO • SUPABASE CLOUD
                </span>
              </div>
              <h2 className="font-heading font-black text-xl text-[#F4F4F6]">
                {profile.name || 'Seu Perfil'}
              </h2>
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="flex bg-[#0B0B0F] p-1 rounded-xl border border-[#5C5C6B]/40">
            <button
              type="button"
              onClick={() => setActiveTab('view')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold font-heading transition ${
                activeTab === 'view'
                  ? 'bg-[#FF6B00] text-[#0B0B0F]'
                  : 'text-[#9E9EA8] hover:text-[#F4F4F6]'
              }`}
            >
              Visualizar Perfil
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('edit')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold font-heading transition flex items-center gap-1.5 ${
                activeTab === 'edit'
                  ? 'bg-[#FFB800] text-[#0B0B0F]'
                  : 'text-[#9E9EA8] hover:text-[#F4F4F6]'
              }`}
            >
              <Edit3 className="w-3 h-3" />
              Editar Informações
            </button>
          </div>
        </div>

        {/* Tab 1: View Profile & Cinephile Passport */}
        {activeTab === 'view' && (
          <div className="space-y-6 animate-in fade-in">
            {/* Top Identity Hero Card */}
            <div className="bg-[#1A1A24] border border-[#FF6B00]/30 rounded-2xl p-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-[#FF6B00]/15 to-transparent rounded-full blur-xl pointer-events-none" />

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-heading font-black text-xl text-[#F4F4F6]">
                      {name || profile.name}
                    </h3>
                    <BadgeCheck className="w-4 h-4 text-[#FFB800]" />
                  </div>
                  <p className="text-xs font-mono text-[#FFB800]">{handle}</p>
                  <p className="text-xs text-[#9E9EA8] mt-2 max-w-md leading-relaxed">
                    {bio}
                  </p>
                </div>

                <div className="text-left sm:text-right shrink-0">
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-[#FF6B00]/20 text-[#FF6B00] border border-[#FF6B00]/40 mb-1">
                    {tier}
                  </span>
                  <div className="text-[11px] font-mono text-[#9E9EA8]">
                    Bilhete: <strong className="text-[#F4F4F6]">{profile.ticketCode}</strong>
                  </div>
                  <div className="text-[10px] font-mono text-[#5C5C6B]">
                    Membro desde: {profile.membershipDate || '09 Nov 2026'}
                  </div>
                </div>
              </div>

              {/* Theater Location */}
              <div className="mt-4 pt-3 border-t border-[#5C5C6B]/25 flex items-center gap-2 text-xs text-[#9E9EA8]">
                <MapPin className="w-3.5 h-3.5 text-[#E50914]" />
                <span>Cinema Favorito: <strong className="text-[#F4F4F6]">{theaterCity}</strong></span>
              </div>
            </div>

            {/* Cinephile Metrics Counter */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-[#0B0B0F] border border-[#5C5C6B]/30 rounded-xl p-3">
                <span className="block text-[10px] font-mono text-[#9E9EA8] uppercase">
                  SESSÕES NA SALA
                </span>
                <span className="font-heading font-black text-xl text-[#FF6B00]">
                  {profile.sessionsWatched ?? 14}
                </span>
              </div>
              <div className="bg-[#0B0B0F] border border-[#5C5C6B]/30 rounded-xl p-3">
                <span className="block text-[10px] font-mono text-[#9E9EA8] uppercase">
                  HORAS DE FILME
                </span>
                <span className="font-heading font-black text-xl text-[#FFB800]">
                  {profile.hoursWatched ?? 38}h
                </span>
              </div>
              <div className="bg-[#0B0B0F] border border-[#5C5C6B]/30 rounded-xl p-3">
                <span className="block text-[10px] font-mono text-[#9E9EA8] uppercase">
                  CRÍTICAS ESCRITAS
                </span>
                <span className="font-heading font-black text-xl text-[#E50914]">
                  {profile.reviewsWritten ?? 9}
                </span>
              </div>
            </div>

            {/* Curated Favorites Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Genres */}
              <div className="bg-[#1A1A24]/70 border border-[#5C5C6B]/30 rounded-xl p-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#FF6B00] block mb-2">
                  GÊNEROS FAVORITOS
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {favoriteGenres.map((g) => (
                    <span
                      key={g}
                      className="px-2 py-0.5 rounded-md bg-[#0B0B0F] border border-[#FF6B00]/30 text-[10px] text-[#F4F4F6]"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              </div>

              {/* Director & Top 3 Movies */}
              <div className="bg-[#1A1A24]/70 border border-[#5C5C6B]/30 rounded-xl p-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#FFB800] block mb-2">
                  DIRETOR DESTAQUE
                </span>
                <p className="text-xs font-semibold text-[#F4F4F6] mb-3">
                  🎬 {favoriteDirector}
                </p>

                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#9E9EA8] block mb-1">
                  TOP 3 FILMES DA VIDA
                </span>
                <ul className="text-xs space-y-1 text-[#F4F4F6]/90">
                  {movie1 && <li>1. {movie1}</li>}
                  {movie2 && <li>2. {movie2}</li>}
                  {movie3 && <li>3. {movie3}</li>}
                </ul>
              </div>
            </div>

            {/* Badges and Trophies */}
            <div className="bg-[#121218] border border-[#FFB800]/30 rounded-xl p-4">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#FFB800] block mb-2 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#FFB800]" />
                EMBLEMAS DE CONQUISTA
              </span>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-[#FF6B00]/15 text-[#FF6B00] border border-[#FF6B00]/30 text-xs font-mono font-bold flex items-center gap-1">
                  ★ Cineasta 35mm
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[#FFB800]/15 text-[#FFB800] border border-[#FFB800]/30 text-xs font-mono font-bold flex items-center gap-1">
                  🎟️ Madrugador IMAX
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[#E50914]/15 text-[#E50914] border border-[#E50914]/30 text-xs font-mono font-bold flex items-center gap-1">
                  🍿 Membro Fundador
                </span>
              </div>
            </div>

            {/* Action to switch to edit */}
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setActiveTab('edit')}
                className="px-5 py-2.5 rounded-xl bg-[#FF6B00] hover:bg-[#FF7A1A] text-[#0B0B0F] font-heading font-black text-xs uppercase tracking-wider flex items-center gap-2 cinema-glow-primary transition"
              >
                <Edit3 className="w-4 h-4" />
                <span>Editar Minhas Informações</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Edit Profile Form */}
        {activeTab === 'edit' && (
          <form onSubmit={handleSave} className="space-y-4 animate-in fade-in">
            {savedSuccess && (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Perfil atualizado com sucesso no Supabase!</span>
              </div>
            )}

            {/* Avatar selector */}
            <div>
              <label className="block text-xs font-semibold text-[#F4F4F6] mb-2">
                Ícone Cinematográfico de Avatar
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {AVATARS.map((av) => {
                  const Icon = av.icon;
                  const isSelected = avatarIcon === av.id;
                  return (
                    <button
                      key={av.id}
                      type="button"
                      onClick={() => setAvatarIcon(av.id)}
                      className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition ${
                        isSelected
                          ? 'bg-[#FF6B00]/20 border-[#FF6B00] text-[#FF6B00]'
                          : 'bg-[#0B0B0F] border-[#5C5C6B]/30 text-[#9E9EA8] hover:text-[#F4F4F6]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-[10px] font-mono">{av.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Name and Handle */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#F4F4F6] mb-1">
                  Nome do Cinéfilo
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome"
                  className="w-full bg-[#0B0B0F] border border-[#5C5C6B]/40 focus:border-[#FF6B00] rounded-xl px-3.5 py-2 text-xs text-[#F4F4F6] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#F4F4F6] mb-1">
                  Apelido de Cinema (@handle)
                </label>
                <input
                  type="text"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  placeholder="@cinefilo"
                  className="w-full bg-[#0B0B0F] border border-[#5C5C6B]/40 focus:border-[#FF6B00] rounded-xl px-3.5 py-2 text-xs text-[#FFB800] font-mono outline-none"
                />
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-xs font-semibold text-[#F4F4F6] mb-1">
                Bio de Cinéfilo
              </label>
              <textarea
                rows={2}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Conte sobre sua paixão por filmes, diretores e formatos favoritos..."
                className="w-full bg-[#0B0B0F] border border-[#5C5C6B]/40 focus:border-[#FF6B00] rounded-xl px-3.5 py-2 text-xs text-[#F4F4F6] outline-none resize-none"
              />
            </div>

            {/* Tier & Cinema City */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#F4F4F6] mb-1">
                  Categoria de Assento
                </label>
                <select
                  value={tier}
                  onChange={(e) => setTier(e.target.value as any)}
                  className="w-full bg-[#0B0B0F] border border-[#5C5C6B]/40 focus:border-[#FF6B00] rounded-xl px-3.5 py-2 text-xs text-[#FF6B00] outline-none"
                >
                  <option value="VIP Gold">★ VIP Gold</option>
                  <option value="Crítico Master">✒️ Crítico Master</option>
                  <option value="Diretor">🎬 Diretor Convidado</option>
                  <option value="Convidado">🎟️ Convidado</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#F4F4F6] mb-1">
                  Cinema / Cidade Favorita
                </label>
                <input
                  type="text"
                  value={theaterCity}
                  onChange={(e) => setTheaterCity(e.target.value)}
                  placeholder="Ex: Sala IMAX - Rio de Janeiro"
                  className="w-full bg-[#0B0B0F] border border-[#5C5C6B]/40 focus:border-[#FF6B00] rounded-xl px-3.5 py-2 text-xs text-[#F4F4F6] outline-none"
                />
              </div>
            </div>

            {/* Director and Top 3 Movies */}
            <div>
              <label className="block text-xs font-semibold text-[#F4F4F6] mb-1">
                Diretor Favorito
              </label>
              <input
                type="text"
                value={favoriteDirector}
                onChange={(e) => setFavoriteDirector(e.target.value)}
                placeholder="Ex: Stanley Kubrick, Denis Villeneuve..."
                className="w-full bg-[#0B0B0F] border border-[#5C5C6B]/40 focus:border-[#FF6B00] rounded-xl px-3.5 py-2 text-xs text-[#F4F4F6] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#F4F4F6] mb-1">
                Top 3 Filmes Favoritos da Sua Vida
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  value={movie1}
                  onChange={(e) => setMovie1(e.target.value)}
                  placeholder="Filme 1"
                  className="bg-[#0B0B0F] border border-[#5C5C6B]/40 rounded-xl px-3 py-1.5 text-xs text-[#F4F4F6] outline-none"
                />
                <input
                  type="text"
                  value={movie2}
                  onChange={(e) => setMovie2(e.target.value)}
                  placeholder="Filme 2"
                  className="bg-[#0B0B0F] border border-[#5C5C6B]/40 rounded-xl px-3 py-1.5 text-xs text-[#F4F4F6] outline-none"
                />
                <input
                  type="text"
                  value={movie3}
                  onChange={(e) => setMovie3(e.target.value)}
                  placeholder="Filme 3"
                  className="bg-[#0B0B0F] border border-[#5C5C6B]/40 rounded-xl px-3 py-1.5 text-xs text-[#F4F4F6] outline-none"
                />
              </div>
            </div>

            {/* Favorite Genres Selectable Chips */}
            <div>
              <label className="block text-xs font-semibold text-[#F4F4F6] mb-1.5">
                Gêneros que Mais Gosta (Clique para selecionar)
              </label>
              <div className="flex flex-wrap gap-1.5">
                {AVAILABLE_GENRES.map((g) => {
                  const isSelected = favoriteGenres.includes(g);
                  return (
                    <button
                      key={g}
                      type="button"
                      onClick={() => toggleGenre(g)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono transition border ${
                        isSelected
                          ? 'bg-[#FF6B00] text-[#0B0B0F] border-[#FF6B00] font-bold'
                          : 'bg-[#0B0B0F] text-[#9E9EA8] border-[#5C5C6B]/30 hover:border-[#FFB800]'
                      }`}
                    >
                      {isSelected ? '✓ ' : '+ '}
                      {g}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Form Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#5C5C6B]/30">
              <button
                type="button"
                onClick={() => setActiveTab('view')}
                className="px-4 py-2 text-xs text-[#9E9EA8] hover:text-[#F4F4F6]"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FF6B00] via-[#FF7A1A] to-[#FF6B00] text-[#0B0B0F] font-heading font-black text-xs uppercase tracking-wider flex items-center gap-2 cinema-glow-primary transition disabled:opacity-50"
              >
                {isSaving ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-[#0B0B0F] border-t-transparent rounded-full animate-spin" />
                    SALVANDO NO SUPABASE...
                  </span>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>Salvar Perfil no Supabase</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
