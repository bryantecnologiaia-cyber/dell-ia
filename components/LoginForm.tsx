'use client';

import React, { useState } from 'react';
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
} from 'lucide-react';

export interface UserSession {
  email: string;
  name: string;
  tier: 'VIP Gold' | 'Crítico Master' | 'Diretor' | 'Convidado';
  ticketCode: string;
}

interface LoginFormProps {
  onLoginSuccess: (user: UserSession) => void;
  onPreviewTicket?: () => void;
}

export default function LoginForm({
  onLoginSuccess,
  onPreviewTicket,
}: LoginFormProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [selectedTier, setSelectedTier] = useState<'VIP Gold' | 'Crítico Master' | 'Diretor'>('VIP Gold');

  // Fast demo account filler
  const handleQuickDemo = (tier: 'VIP Gold' | 'Crítico Master' | 'Diretor') => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        email: email || 'cinefilo@cinema.com',
        name: name || (email.split('@')[0].toUpperCase()),
        tier: selectedTier,
        ticketCode: `OBS-${Math.floor(1000 + Math.random() * 9000)}-${selectedTier.substring(0, 3).toUpperCase()}`,
      });
    }, 700);
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
    }, 500);
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
        <div className="text-center pt-2 pb-6">
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
            Onde a sétima arte encontra a escuridão absoluta do cinema.
          </p>
        </div>

        {/* Tab switchers: ENTRAR vs CRIAR CONTA */}
        <div className="flex bg-[#0B0B0F] p-1 rounded-xl border border-[#5C5C6B]/30 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab('login')}
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
            onClick={() => setActiveTab('signup')}
            className={`flex-1 py-2 text-xs font-heading font-bold rounded-lg transition-all tracking-wider ${
              activeTab === 'signup'
                ? 'bg-[#FF6B00] text-[#0B0B0F] cinema-glow-primary'
                : 'text-[#9E9EA8] hover:text-[#F4F4F6]'
            }`}
          >
            NOVO CINÉFILO
          </button>
        </div>

        {/* Quick Demo Pre-fill Pills */}
        <div className="mb-5">
          <div className="flex items-center justify-between text-[10px] font-mono text-[#9E9EA8] uppercase tracking-wider mb-2">
            <span>Acesso Rápido de Teste:</span>
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
            <div>
              <label className="block text-xs font-semibold text-[#F4F4F6] mb-1.5">
                Nome de Cinéfilo
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9E9EA8]" />
                <input
                  type="text"
                  required
                  placeholder="Ex: Martin Scorsese"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#0B0B0F]/90 border border-[#5C5C6B]/40 focus:border-[#FF6B00] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#F4F4F6] placeholder:text-[#5C5C6B] outline-none transition focus:ring-1 focus:ring-[#FF6B00]"
                />
              </div>
            </div>
          )}

          {/* Email input */}
          <div>
            <label className="block text-xs font-semibold text-[#F4F4F6] mb-1.5 flex items-center justify-between">
              <span>E-mail ou ID de Ingresso</span>
              <span className="text-[10px] font-mono text-[#FFB800]">PASSAPORTE</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9E9EA8]" />
              <input
                type="email"
                required
                placeholder="cinefilo@cinema.com"
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
                Senha da Cabine
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

          {/* Remember me & Cinephile terms */}
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
              <span className="text-xs text-[#9E9EA8]">Lembrar minha poltrona</span>
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
                VALIDANDO INGRESSO...
              </span>
            ) : (
              <>
                <span>{activeTab === 'login' ? 'ENTRAR NA SALA' : 'EMITIR MEU INGRESSO'}</span>
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

        {/* Alternative fast guest / social options */}
        <div className="space-y-2.5">
          <button
            type="button"
            onClick={handleGuestLogin}
            disabled={isLoading}
            className="w-full py-2.5 px-4 rounded-xl bg-[#1A1A24] hover:bg-[#222230] border border-[#FFB800]/30 hover:border-[#FFB800] text-xs font-bold text-[#F4F4F6] flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 text-[#FFB800]" />
            <span>Entrar como Convidado (Guest Pass)</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo('VIP Gold')}
              className="py-2 px-3 rounded-xl bg-[#0B0B0F] hover:bg-[#1A1A24] border border-[#5C5C6B]/30 hover:border-[#5C5C6B] text-[11px] text-[#F4F4F6] flex items-center justify-center gap-2 transition"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15.2s.7 5.5 1.9 7.9l3.7-2.9z"
                />
                <path
                  fill="#34A853"
                  d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16.5C3.7 20.2 7.5 23.5 12 23.5z"
                />
              </svg>
              <span>Google</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemo('Crítico Master')}
              className="py-2 px-3 rounded-xl bg-[#0B0B0F] hover:bg-[#1A1A24] border border-[#5C5C6B]/30 hover:border-[#5C5C6B] text-[11px] text-[#F4F4F6] flex items-center justify-center gap-2 transition"
            >
              <svg className="w-3.5 h-3.5 fill-current text-white" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.87c.65-.79 1.1-1.89.98-3-.95.04-2.1.63-2.77 1.42-.58.68-1.1 1.78-.96 2.86 1.06.08 2.11-.53 2.75-1.28" />
              </svg>
              <span>Apple ID</span>
            </button>
          </div>
        </div>

        {/* Footer format badges */}
        <div className="mt-6 pt-4 border-t border-[#5C5C6B]/20 flex items-center justify-between text-[10px] font-mono text-[#9E9EA8]">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#FF6B00]" />
            SESSÃO CRIPTOGRAFADA
          </span>
          <div className="flex gap-2 text-[#FFB800] font-bold">
            <span className="bg-[#0B0B0F] px-1.5 py-0.5 rounded border border-[#FFB800]/30">4K HDR</span>
            <span className="bg-[#0B0B0F] px-1.5 py-0.5 rounded border border-[#E50914]/30 text-[#E50914]">IMAX</span>
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
                Recuperar Acesso à Sala
              </h3>
            </div>
            <p className="text-xs text-[#9E9EA8] mb-4">
              Informe seu e-mail de cinéfilo para enviarmos um link seguro de redefinição de credenciais.
            </p>

            {resetEmailSent ? (
              <div className="bg-[#FF6B00]/10 border border-[#FF6B00]/40 p-4 rounded-xl text-center mb-4">
                <Check className="w-6 h-6 text-[#FF6B00] mx-auto mb-2" />
                <p className="text-xs font-semibold text-[#F4F4F6]">
                  Instruções enviadas para seu e-mail!
                </p>
                <p className="text-[11px] text-[#9E9EA8] mt-1">
                  Verifique sua caixa de entrada e spam.
                </p>
              </div>
            ) : (
              <div className="space-y-3 mb-4">
                <input
                  type="email"
                  defaultValue={email || 'cinefilo@cinema.com'}
                  placeholder="Seu e-mail cadastrado"
                  className="w-full bg-[#0B0B0F] border border-[#5C5C6B]/40 focus:border-[#FF6B00] rounded-xl px-3.5 py-2 text-xs text-[#F4F4F6] outline-none"
                />
                <button
                  type="button"
                  onClick={() => setResetEmailSent(true)}
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
