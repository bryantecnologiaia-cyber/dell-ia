'use client';

import React, { useState, useEffect } from 'react';
import {
  Film,
  Clapperboard,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
  User,
  KeyRound,
  Zap,
  AlertCircle,
  Database,
  CheckCircle2,
} from 'lucide-react';
import {
  registerCinephile,
  loginCinephile,
  sendPasswordResetEmail,
  isSupabaseConfigured,
  CinephileProfile,
} from '@/lib/supabaseClient';

export interface UserSession {
  email: string;
  name: string;
  tier: 'VIP Gold' | 'Crítico Master' | 'Diretor' | 'Convidado';
  ticketCode: string;
}

interface LoginFormProps {
  onLoginSuccess: (user: UserSession) => void;
  onPreviewTicket?: () => void;
  onOpenSupabaseModal?: () => void;
}

export default function LoginForm({
  onLoginSuccess,
  onPreviewTicket,
  onOpenSupabaseModal,
}: LoginFormProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [selectedTier, setSelectedTier] = useState<'VIP Gold' | 'Crítico Master' | 'Diretor'>('VIP Gold');
  const isDbConfigured = isSupabaseConfigured();

  // Quick pre-fill for demo/testing
  const handleQuickDemo = (tier: 'VIP Gold' | 'Crítico Master' | 'Diretor') => {
    setErrorMessage(null);
    setSuccessMessage(null);
    if (tier === 'VIP Gold') {
      setEmail('vip@obsidiancinema.com');
      setPassword('Cinefilo4K@2026');
      setName('Alexandre Cinephile');
      setSelectedTier('VIP Gold');
    } else if (tier === 'Crítico Master') {
      setEmail('critico@cahiersducinema.com');
      setPassword('PalmaDeOuro2026');
      setName('Helena Prado (Crítica)');
      setSelectedTier('Crítico Master');
    } else {
      setEmail('diretor@universal.com');
      setPassword('FilmReel70mm!');
      setName('Diretor Convidado');
      setSelectedTier('Diretor');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!email || !password) {
      setErrorMessage('Por favor, informe seu e-mail e senha.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('A senha precisa ter pelo menos 6 caracteres.');
      return;
    }

    setIsLoading(true);

    try {
      if (activeTab === 'signup') {
        // Register user via Supabase
        const cinephileName = name.trim() || email.split('@')[0];
        const res = await registerCinephile({
          email: email.trim(),
          password,
          name: cinephileName,
          tier: selectedTier,
        });

        if (res.error) {
          setErrorMessage(res.error);
          setIsLoading(false);
          return;
        }

        if (res.user) {
          setSuccessMessage(
            res.isSimulated
              ? 'Conta de cinéfilo registrada com sucesso! (Modo Simulação)'
              : 'Conta cadastrada no Supabase com sucesso!'
          );

          setTimeout(() => {
            onLoginSuccess({
              email: res.user!.email,
              name: res.user!.name,
              tier: res.user!.tier,
              ticketCode: res.user!.ticketCode,
            });
          }, 800);
        }
      } else {
        // Login existing user via Supabase
        const res = await loginCinephile({
          email: email.trim(),
          password,
        });

        if (res.error) {
          setErrorMessage(res.error);
          setIsLoading(false);
          return;
        }

        if (res.user) {
          setSuccessMessage('Bilhete validado! Acessando a sala de cinema...');
          setTimeout(() => {
            onLoginSuccess({
              email: res.user!.email,
              name: res.user!.name,
              tier: res.user!.tier,
              ticketCode: res.user!.ticketCode,
            });
          }, 600);
        }
      }
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error ? err.message : 'Ocorreu um erro ao comunicar com o servidor.'
      );
      setIsLoading(false);
    }
  };

  const handleGuestLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        email: 'visitante@cinema.com',
        name: 'Cinéfilo Convidado',
        tier: 'Convidado',
        ticketCode: 'GUEST-7721-VIP',
      });
    }, 400);
  };

  const handlePasswordReset = async () => {
    if (!email) {
      setErrorMessage('Digite seu e-mail para receber as instruções de recuperação.');
      return;
    }
    const res = await sendPasswordResetEmail(email);
    if (res.success) {
      setResetEmailSent(true);
    } else {
      setErrorMessage(res.error || 'Erro ao enviar e-mail de recuperação.');
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Outer ambient glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#FF6B00]/40 via-[#FFB800]/30 to-[#E50914]/40 rounded-3xl blur-xl opacity-75 transition duration-500" />

      {/* Main Glassmorphic Card */}
      <div className="relative bg-[#121218]/95 border border-[#FF6B00]/30 rounded-2xl p-6 sm:p-8 backdrop-blur-2xl cinema-card-glow overflow-hidden">
        {/* Marquee bulb header lights along top edge */}
        <div className="absolute top-0 inset-x-0 h-1.5 flex justify-between px-3 overflow-hidden">
          {Array.from({ length: 16 }).map((_, i) => (
            <span
              key={`bulb-${i}`}
              className="w-1.5 h-1.5 rounded-full bg-[#FFB800] animate-marquee-lights"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>

        {/* Card Header & Brand Clapperboard */}
        <div className="text-center pt-2 pb-5">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-br from-[#1A1A24] via-[#121218] to-[#0B0B0F] border border-[#FF6B00]/40 shadow-inner mb-3 cinema-glow-primary">
            <Clapperboard className="w-8 h-8 text-[#FF6B00] animate-pulse" />
          </div>

          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#E50914] animate-ping" />
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#E50914] uppercase">
              SESSÃO EXCLUSIVA • SALA 01
            </span>
          </div>

          <h2 className="font-heading font-black text-2xl sm:text-3xl tracking-tight text-[#F4F4F6]">
            OBSIDIAN <span className="text-[#FF6B00]">CINEMA</span>
          </h2>
          <p className="text-xs text-[#9E9EA8] mt-1 max-w-xs mx-auto">
            Autenticação e cadastro com banco de dados Supabase.
          </p>

          {/* Supabase Connection Status Pill */}
          {onOpenSupabaseModal && (
            <div className="mt-3 flex justify-center">
              <button
                type="button"
                onClick={onOpenSupabaseModal}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase transition cursor-pointer border ${
                  isDbConfigured
                    ? 'bg-emerald-950/60 text-emerald-400 border-emerald-500/40 hover:bg-emerald-900/60'
                    : 'bg-[#FF6B00]/15 text-[#FFB800] border-[#FF6B00]/40 hover:bg-[#FF6B00]/25'
                }`}
              >
                <Database className="w-3 h-3 text-[#FF6B00]" />
                <span>{isDbConfigured ? '🟢 SUPABASE ATIVO' : '⚡ VER VARIÁVEIS SUPABASE'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Tab switchers: ENTRAR vs CRIAR CONTA */}
        <div className="flex bg-[#0B0B0F] p-1 rounded-xl border border-[#5C5C6B]/30 mb-5">
          <button
            type="button"
            onClick={() => {
              setActiveTab('login');
              setErrorMessage(null);
              setSuccessMessage(null);
            }}
            className={`flex-1 py-2 text-xs font-heading font-bold rounded-lg transition-all tracking-wider ${
              activeTab === 'login'
                ? 'bg-[#FF6B00] text-[#0B0B0F] cinema-glow-primary'
                : 'text-[#9E9EA8] hover:text-[#F4F4F6]'
            }`}
          >
            ENTRAR NA SALA
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('signup');
              setErrorMessage(null);
              setSuccessMessage(null);
            }}
            className={`flex-1 py-2 text-xs font-heading font-bold rounded-lg transition-all tracking-wider ${
              activeTab === 'signup'
                ? 'bg-[#FF6B00] text-[#0B0B0F] cinema-glow-primary'
                : 'text-[#9E9EA8] hover:text-[#F4F4F6]'
            }`}
          >
            CADASTRAR E-MAIL
          </button>
        </div>

        {/* Notifications / Feedback */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-[#E50914]/15 border border-[#E50914]/40 text-xs text-[#ffb4ab] flex items-start gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-[#E50914] shrink-0 mt-0.5" />
            <div className="flex-1">{errorMessage}</div>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-300 flex items-start gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div className="flex-1">{successMessage}</div>
          </div>
        )}

        {/* Quick Demo Pre-fill Pills */}
        <div className="mb-5">
          <div className="flex items-center justify-between text-[10px] font-mono text-[#9E9EA8] uppercase tracking-wider mb-2">
            <span>Preenchimento Rápido:</span>
            <span className="text-[#FFB800]">1 Clique</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => handleQuickDemo('VIP Gold')}
              className="px-2 py-1.5 rounded-lg bg-[#1A1A24] border border-[#FF6B00]/30 hover:border-[#FF6B00] text-[10px] font-bold text-[#F4F4F6] hover:text-[#FF6B00] transition-colors truncate"
            >
              ★ VIP Gold
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('Crítico Master')}
              className="px-2 py-1.5 rounded-lg bg-[#1A1A24] border border-[#FFB800]/30 hover:border-[#FFB800] text-[10px] font-bold text-[#F4F4F6] hover:text-[#FFB800] transition-colors truncate"
            >
              ✒️ Crítico
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('Diretor')}
              className="px-2 py-1.5 rounded-lg bg-[#1A1A24] border border-[#E50914]/30 hover:border-[#E50914] text-[10px] font-bold text-[#F4F4F6] hover:text-[#E50914] transition-colors truncate"
            >
              🎬 Diretor
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {activeTab === 'signup' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-[#F4F4F6] mb-1.5">
                  Nome do Cinéfilo
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9E9EA8]" />
                  <input
                    type="text"
                    required
                    placeholder="Ex: Christopher Nolan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#0B0B0F]/90 border border-[#5C5C6B]/40 focus:border-[#FF6B00] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#F4F4F6] placeholder:text-[#5C5C6B] outline-none transition focus:ring-1 focus:ring-[#FF6B00]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#F4F4F6] mb-1.5">
                  Categoria de Assento Desejada
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['VIP Gold', 'Crítico Master', 'Diretor'] as const).map((tier) => (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => setSelectedTier(tier)}
                      className={`py-1.5 px-2 rounded-lg text-[10px] font-bold border transition ${
                        selectedTier === tier
                          ? 'bg-[#FF6B00] text-[#0B0B0F] border-[#FF6B00]'
                          : 'bg-[#0B0B0F] text-[#9E9EA8] border-[#5C5C6B]/30 hover:text-white'
                      }`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Email input */}
          <div>
            <label className="block text-xs font-semibold text-[#F4F4F6] mb-1.5 flex items-center justify-between">
              <span>E-mail do Cinéfilo</span>
              <span className="text-[10px] font-mono text-[#FFB800]">SUPABASE AUTH</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9E9EA8]" />
              <input
                type="email"
                required
                placeholder="seu.email@cinema.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0B0B0F]/90 border border-[#5C5C6B]/40 focus:border-[#FF6B00] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#F4F4F6] placeholder:text-[#5C5C6B] outline-none transition focus:ring-1 focus:ring-[#FF6B00]"
              />
            </div>
          </div>

          {/* Password input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-[#F4F4F6]">
                Senha de Acesso (Mín. 6 dígitos)
              </label>
              {activeTab === 'login' && (
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-[11px] text-[#FFB800] hover:text-[#FF6B00] transition-colors"
                >
                  Esqueceu a senha?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9E9EA8]" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                minLength={6}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0B0B0F]/90 border border-[#5C5C6B]/40 focus:border-[#FF6B00] rounded-xl pl-10 pr-10 py-2.5 text-sm text-[#F4F4F6] placeholder:text-[#5C5C6B] outline-none transition focus:ring-1 focus:ring-[#FF6B00]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9E9EA8] hover:text-[#F4F4F6] transition"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Remember me & Ticket toggle */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <div
                onClick={() => setRememberMe(!rememberMe)}
                className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                  rememberMe
                    ? 'bg-[#FF6B00] border-[#FF6B00]'
                    : 'border-[#5C5C6B] bg-[#0B0B0F]'
                }`}
              >
                {rememberMe && <Check className="w-3 h-3 text-[#0B0B0F] stroke-[3]" />}
              </div>
              <span className="text-xs text-[#9E9EA8]">Lembrar minha sessão</span>
            </label>

            {onPreviewTicket && (
              <button
                type="button"
                onClick={onPreviewTicket}
                className="text-xs font-mono text-[#FF6B00] hover:text-[#FFB800] flex items-center gap-1 transition"
              >
                <Sparkles className="w-3 h-3" />
                Ver Ingresso
              </button>
            )}
          </div>

          {/* Primary CTA Submit Button with Electric Ember Radiant Glow */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#FF6B00] via-[#FF7A1A] to-[#FF6B00] hover:from-[#FF7A1A] hover:to-[#FF6B00] text-[#0B0B0F] font-heading font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 cinema-glow-primary active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer shadow-lg"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-[#0B0B0F] border-t-transparent rounded-full animate-spin" />
                {activeTab === 'signup' ? 'CADASTRANDO NO SUPABASE...' : 'VALIDANDO NO SUPABASE...'}
              </span>
            ) : (
              <>
                <span>
                  {activeTab === 'login' ? 'ENTRAR NA SALA' : 'CADASTRAR E-MAIL NO SUPABASE'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#5C5C6B]/25" />
          </div>
          <span className="relative px-3 bg-[#121218] text-[10px] font-mono tracking-widest text-[#9E9EA8] uppercase">
            OU ACESSO RÁPIDO
          </span>
        </div>

        {/* Guest access option */}
        <button
          type="button"
          onClick={handleGuestLogin}
          disabled={isLoading}
          className="w-full py-2.5 px-4 rounded-xl bg-[#1A1A24] hover:bg-[#222230] border border-[#FFB800]/30 hover:border-[#FFB800] text-xs font-bold text-[#F4F4F6] flex items-center justify-center gap-2 transition cursor-pointer"
        >
          <Zap className="w-3.5 h-3.5 text-[#FFB800]" />
          <span>Entrar como Convidado (Guest Pass)</span>
        </button>

        {/* Footer format badges */}
        <div className="mt-6 pt-4 border-t border-[#5C5C6B]/20 flex items-center justify-between text-[10px] font-mono text-[#9E9EA8]">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#FF6B00]" />
            SUPABASE RLS ATIVO
          </span>
          <div className="flex gap-2 text-[#FFB800] font-bold">
            <span className="bg-[#0B0B0F] px-1.5 py-0.5 rounded border border-[#FFB800]/30">POSTGRES</span>
            <span className="bg-[#0B0B0F] px-1.5 py-0.5 rounded border border-[#E50914]/30 text-[#E50914]">AUTH 2.0</span>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 z-50 bg-[#0B0B0F]/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121218] border border-[#FF6B00]/40 rounded-2xl max-w-sm w-full p-6 cinema-glow-primary shadow-2xl relative">
            <div className="flex items-center gap-2 mb-3 text-[#FF6B00]">
              <KeyRound className="w-5 h-5" />
              <h3 className="font-heading font-bold text-base text-[#F4F4F6]">
                Recuperar Senha via Supabase
              </h3>
            </div>
            <p className="text-xs text-[#9E9EA8] mb-4">
              Informe seu e-mail cadastrado no Supabase para receber um link de redefinição de senha.
            </p>

            {resetEmailSent ? (
              <div className="bg-[#FF6B00]/10 border border-[#FF6B00]/40 p-4 rounded-xl text-center mb-4">
                <Check className="w-6 h-6 text-[#FF6B00] mx-auto mb-2" />
                <p className="text-xs font-semibold text-[#F4F4F6]">
                  Instruções enviadas para seu e-mail!
                </p>
                <p className="text-[11px] text-[#9E9EA8] mt-1">
                  Verifique sua caixa de entrada e pasta de spam.
                </p>
              </div>
            ) : (
              <div className="space-y-3 mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Seu e-mail cadastrado"
                  className="w-full bg-[#0B0B0F] border border-[#5C5C6B]/40 focus:border-[#FF6B00] rounded-xl px-3.5 py-2 text-xs text-[#F4F4F6] outline-none"
                />
                <button
                  type="button"
                  onClick={handlePasswordReset}
                  className="w-full py-2.5 rounded-xl bg-[#FF6B00] text-[#0B0B0F] font-heading font-bold text-xs uppercase tracking-wider cinema-glow-primary"
                >
                  Enviar Link de Recuperação
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                setShowForgotPassword(false);
                setResetEmailSent(false);
              }}
              className="w-full py-2 text-xs text-[#9E9EA8] hover:text-[#F4F4F6] text-center"
            >
              Fechar e voltar ao login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
