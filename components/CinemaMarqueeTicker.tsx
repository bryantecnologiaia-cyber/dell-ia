'use client';

import React from 'react';
import { Film, Sparkles, Popcorn, Ticket, Database } from 'lucide-react';
import CinemaProjectorAudio from './CinemaProjectorAudio';

interface CinemaMarqueeTickerProps {
  onToggleTicketModal?: () => void;
  showTicketButton?: boolean;
  onOpenSupabaseModal?: () => void;
}

const CINEMA_QUOTES = [
  { author: 'Stanley Kubrick', text: 'Se pode ser escrito ou pensado, pode ser transformado em cinema.' },
  { author: 'Jean-Luc Godard', text: 'O cinema é a verdade a 24 quadros por segundo.' },
  { author: 'Martin Scorsese', text: 'O cinema toca nossas emoções mais profundas e ilumina o que há de humano.' },
  { author: 'Alfred Hitchcock', text: 'O cinema não é um pedaço de vida, é uma fatia de bolo.' },
  { author: 'Christopher Nolan', text: 'A melhor experiência cinematográfica acontece no escuro da sala de cinema.' },
  { author: 'Federico Fellini', text: 'Um filme diferente é um mundo diferente onde você escolhe habitar.' },
];

export default function CinemaMarqueeTicker({
  onToggleTicketModal,
  showTicketButton = true,
  onOpenSupabaseModal,
}: CinemaMarqueeTickerProps) {
  return (
    <>
      {/* Top Cinema Marquee Bar */}
      <header className="relative z-30 w-full border-b border-[#FF6B00]/25 bg-[#0B0B0F]/90 backdrop-blur-md px-4 py-2.5 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Brand mark */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E50914] animate-pulse shadow-[0_0_8px_#E50914]" />
              <span className="font-heading font-black text-sm sm:text-base tracking-wider text-[#F4F4F6] uppercase">
                OBSIDIAN <span className="text-[#FF6B00]">CINEMA</span>
              </span>
            </div>

            {/* Badges */}
            <div className="hidden sm:flex items-center gap-1.5 font-mono text-[10px]">
              <span className="px-2 py-0.5 rounded bg-[#FF6B00]/15 text-[#FF6B00] border border-[#FF6B00]/30 font-bold">
                IMAX 70MM
              </span>
              <span className="px-2 py-0.5 rounded bg-[#FFB800]/15 text-[#FFB800] border border-[#FFB800]/30 font-bold">
                DOLBY ATMOS
              </span>
              <span className="px-2 py-0.5 rounded bg-[#E50914]/15 text-[#E50914] border border-[#E50914]/30 font-bold">
                4K LASER
              </span>
            </div>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Supabase status/modal button */}
            {onOpenSupabaseModal && (
              <button
                type="button"
                onClick={onOpenSupabaseModal}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1A1A24] hover:bg-[#252533] border border-[#FF6B00]/40 text-[#FF6B00] hover:text-[#FFB800] text-xs font-mono font-bold tracking-wider transition cursor-pointer"
                title="Configurações e Variáveis do Supabase"
              >
                <Database className="w-3.5 h-3.5 text-[#FF6B00]" />
                <span className="hidden md:inline">SUPABASE</span>
              </button>
            )}

            {/* Ambient Audio Synthesizer */}
            <CinemaProjectorAudio />

            {/* Quick Ticket Pass trigger */}
            {showTicketButton && onToggleTicketModal && (
              <button
                type="button"
                onClick={onToggleTicketModal}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFB800]/15 hover:bg-[#FFB800]/25 border border-[#FFB800]/40 text-[#FFB800] text-xs font-mono font-bold tracking-wider transition cursor-pointer"
              >
                <Ticket className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">BILHETE VIP</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Bottom Marquee Director Quotes Ticker */}
      <footer className="fixed bottom-0 inset-x-0 z-20 border-t border-[#FF6B00]/25 bg-[#0B0B0F]/95 backdrop-blur-md overflow-hidden py-1.5 select-none">
        <div className="flex items-center">
          {/* Label indicator */}
          <div className="px-3 py-0.5 bg-[#FF6B00] text-[#0B0B0F] font-heading font-black text-[10px] uppercase tracking-widest shrink-0 flex items-center gap-1.5 z-10 shadow-lg">
            <Popcorn className="w-3 h-3" />
            <span className="hidden sm:inline">CINE CITAÇÕES</span>
          </div>

          {/* Moving quotes banner */}
          <div className="overflow-hidden relative w-full flex">
            <div className="animate-quote-ticker flex items-center gap-8 pl-4 whitespace-nowrap text-xs text-[#9E9EA8] font-mono">
              {[...CINEMA_QUOTES, ...CINEMA_QUOTES].map((item, idx) => (
                <span key={`ticker-quote-${idx}`} className="flex items-center gap-2">
                  <span className="text-[#FF6B00]">★</span>
                  <span className="italic text-[#F4F4F6]">&quot;{item.text}&quot;</span>
                  <span className="text-[#FFB800] font-bold">— {item.author}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
