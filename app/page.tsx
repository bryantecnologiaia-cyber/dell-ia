'use client';

import React, { useState } from 'react';
import CinemaBackground from '@/components/CinemaBackground';
import CinemaMarqueeTicker from '@/components/CinemaMarqueeTicker';
import LoginForm, { UserSession } from '@/components/LoginForm';
import CinemaTicketCard from '@/components/CinemaTicketCard';
import CinemaLoungePreview from '@/components/CinemaLoungePreview';
import SupabaseConnectionModal from '@/components/SupabaseConnectionModal';
import { logoutCinephile } from '@/lib/supabaseClient';
import { Film, Sparkles, Clapperboard, X, Ticket, Database } from 'lucide-react';

export default function CinemaLoginPage() {
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showSupabaseModal, setShowSupabaseModal] = useState(false);
  const [viewMode, setViewMode] = useState<'form' | 'ticket'>('form');

  const handleLoginSuccess = (user: UserSession) => {
    setCurrentUser(user);
  };

  const handleLogout = async () => {
    await logoutCinephile();
    setCurrentUser(null);
  };

  return (
    <div className="relative min-h-screen bg-[#0B0B0F] text-[#F4F4F6] flex flex-col justify-between selection:bg-[#FF6B00] selection:text-[#0B0B0F]">
      {/* Dynamic Theatrical Background: Projector Beam, Dust Particles, 35mm Film Strips, Theater Horizon */}
      <CinemaBackground showFilmStrips={true} />

      {/* Top Header Marquee Bar with Sound Synthesizer, Supabase status & Ticket shortcut */}
      <CinemaMarqueeTicker
        onToggleTicketModal={() => setShowTicketModal(true)}
        showTicketButton={!currentUser}
        onOpenSupabaseModal={() => setShowSupabaseModal(true)}
      />

      {/* Main Center Stage */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8 sm:py-12">
        {currentUser ? (
          /* Logged In: Unlocked Cinema Lounge */
          <CinemaLoungePreview user={currentUser} onLogout={handleLogout} />
        ) : (
          /* Login Screen Container */
          <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
            {/* Cinematic Hero Tagline */}
            <div className="text-center mb-6 sm:mb-8 space-y-2 max-w-2xl animate-in fade-in duration-700">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121218] border border-[#FF6B00]/40 text-xs font-mono text-[#FFB800] cinema-glow-secondary">
                <Sparkles className="w-3.5 h-3.5 text-[#FF6B00]" />
                <span className="font-bold tracking-wider uppercase">
                  PORTAL DO CINÉFILO • SUPABASE AUTH
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#E50914] animate-ping" />
              </div>

              <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-[#F4F4F6] tracking-tight leading-tight">
                SUA POLTRONA NA <br />
                <span className="bg-gradient-to-r from-[#FF6B00] via-[#FFB800] to-[#E50914] bg-clip-text text-transparent">
                  PRIMEIRA FILA
                </span>{' '}
                DO CINEMA
              </h1>

              <p className="text-sm sm:text-base text-[#9E9EA8] max-w-xl mx-auto font-sans leading-relaxed">
                Autenticação de usuários e cadastro via Supabase. Guarde sua poltrona exclusiva e acesse o catálogo completo em 4K.
              </p>

              {/* View mode toggle on mobile / tablet */}
              <div className="lg:hidden flex justify-center pt-2">
                <div className="inline-flex bg-[#121218] p-1 rounded-xl border border-[#5C5C6B]/40">
                  <button
                    type="button"
                    onClick={() => setViewMode('form')}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                      viewMode === 'form'
                        ? 'bg-[#FF6B00] text-[#0B0B0F]'
                        : 'text-[#9E9EA8] hover:text-[#F4F4F6]'
                    }`}
                  >
                    Formulário de Login
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('ticket')}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                      viewMode === 'ticket'
                        ? 'bg-[#FFB800] text-[#0B0B0F]'
                        : 'text-[#9E9EA8] hover:text-[#F4F4F6]'
                    }`}
                  >
                    <Ticket className="w-3.5 h-3.5" />
                    Bilhete Digital
                  </button>
                </div>
              </div>
            </div>

            {/* Content Layout: Login Form & Companion Ticket Pass */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-4xl">
              {/* Login Card */}
              <div
                className={`lg:col-span-7 w-full ${
                  viewMode === 'ticket' ? 'hidden lg:block' : 'block'
                }`}
              >
                <LoginForm
                  onLoginSuccess={handleLoginSuccess}
                  onPreviewTicket={() => setShowTicketModal(true)}
                  onOpenSupabaseModal={() => setShowSupabaseModal(true)}
                />
              </div>

              {/* Companion Interactive Ticket Card on Desktop or when toggled */}
              <div
                className={`lg:col-span-5 w-full flex flex-col items-center justify-center ${
                  viewMode === 'form' ? 'hidden lg:flex' : 'flex'
                }`}
              >
                <div className="w-full">
                  <div className="text-center lg:text-left mb-3">
                    <span className="text-[11px] font-mono tracking-widest text-[#FFB800] uppercase font-bold flex items-center justify-center lg:justify-start gap-1.5">
                      <Film className="w-3.5 h-3.5 text-[#FF6B00]" />
                      SEU INGRESSO VIRTUAL
                    </span>
                    <p className="text-xs text-[#9E9EA8]">
                      Gera automaticamente seu assento reservado na Sala 01
                    </p>
                  </div>

                  <CinemaTicketCard
                    userEmail="cinefilo@cinema.com"
                    ticketCode="OBS-8841-VIP"
                    theaterRoom="SALA 01 (IMAX LASER)"
                    seat="FILEIRA E • POLTRONA 12"
                    sessionTime="HOJE • 21:30"
                    format="IMAX 70MM / DOLBY ATMOS"
                    isAdmitted={false}
                  />

                  {/* Supabase integration card */}
                  <div className="mt-4 p-3.5 rounded-xl bg-[#121218]/90 border border-[#FF6B00]/30 text-xs text-[#9E9EA8] flex items-center justify-between font-mono">
                    <div className="flex items-center gap-2 text-[#FF6B00]">
                      <Database className="w-4 h-4" />
                      <span className="font-bold">SUPABASE POSTGRES</span>
                    </div>
                    <button
                      onClick={() => setShowSupabaseModal(true)}
                      className="text-[#FFB800] hover:underline text-[11px] font-bold"
                    >
                      Ver Variáveis →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Ticket Modal popup if clicked from mobile or header */}
      {showTicketModal && (
        <div className="fixed inset-0 z-50 bg-[#0B0B0F]/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-sm w-full">
            <button
              onClick={() => setShowTicketModal(false)}
              className="absolute -top-10 right-0 text-xs font-mono text-[#9E9EA8] hover:text-[#E50914] flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              FECHAR
            </button>
            <CinemaTicketCard
              userEmail={currentUser ? currentUser.email : 'cinefilo@cinema.com'}
              ticketCode={currentUser ? currentUser.ticketCode : 'OBS-8841-VIP'}
              isAdmitted={Boolean(currentUser)}
            />
          </div>
        </div>
      )}

      {/* Supabase Connection Details & Variables Modal */}
      <SupabaseConnectionModal
        isOpen={showSupabaseModal}
        onClose={() => setShowSupabaseModal(false)}
      />

      {/* Bottom spacer for quotes ticker */}
      <div className="h-8" />
    </div>
  );
}
