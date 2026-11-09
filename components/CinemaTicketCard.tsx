'use client';

import React from 'react';
import { Ticket, Film, Sparkles, CheckCircle2, QrCode } from 'lucide-react';

interface CinemaTicketCardProps {
  userEmail?: string;
  ticketCode?: string;
  theaterRoom?: string;
  seat?: string;
  sessionTime?: string;
  format?: string;
  isAdmitted?: boolean;
}

export default function CinemaTicketCard({
  userEmail = 'cinefilo@cinema.com',
  ticketCode = 'OBS-8924-VIP',
  theaterRoom = 'SALA 01 (IMAX LASER)',
  seat = 'FIL E • POL 12',
  sessionTime = 'HOJE • 21:30',
  format = 'IMAX 70MM / DOLBY ATMOS',
  isAdmitted = false,
}: CinemaTicketCardProps) {
  return (
    <div className="relative w-full max-w-sm mx-auto select-none group">
      {/* Glow aura */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#FF6B00]/30 via-[#FFB800]/25 to-[#E50914]/30 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition duration-500" />

      {/* Main Ticket Container */}
      <div className="relative bg-[#121218] border border-[#FF6B00]/30 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl">
        {/* Top Header Marquee */}
        <div className="bg-gradient-to-r from-[#FF6B00] via-[#FF7A1A] to-[#E50914] px-5 py-3 text-[#0B0B0F] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Film className="w-5 h-5 text-[#0B0B0F]" />
            <span className="font-heading font-black text-xs uppercase tracking-widest text-[#0B0B0F]">
              OBSIDIAN CINEMA
            </span>
          </div>
          <span className="bg-[#0B0B0F] text-[#FFB800] text-[10px] font-mono font-extrabold px-2 py-0.5 rounded tracking-wider border border-[#FFB800]/40">
            ADMIT ONE
          </span>
        </div>

        {/* Ticket Body Content */}
        <div className="p-5 space-y-4">
          {/* Status Badge */}
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#FFB800]/10 text-[#FFB800] border border-[#FFB800]/30">
              <Sparkles className="w-3 h-3 text-[#FFB800]" />
              PASSAPORTE VIP CINEASTA
            </span>
            <span className="text-[11px] font-mono text-[#9E9EA8] tracking-widest">
              {ticketCode}
            </span>
          </div>

          {/* Attendee Info */}
          <div>
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#9E9EA8]">
              TITULAR DO INGRESSO
            </span>
            <p className="font-heading font-bold text-sm text-[#F4F4F6] truncate">
              {userEmail || 'Cinéfilo Membro'}
            </p>
          </div>

          {/* Grid specs */}
          <div className="grid grid-cols-2 gap-3 py-2 border-y border-[#5C5C6B]/20">
            <div>
              <span className="text-[9px] uppercase font-mono tracking-wider text-[#9E9EA8]">
                SALA & EXPERIÊNCIA
              </span>
              <p className="font-heading text-xs font-semibold text-[#FF6B00]">
                {theaterRoom}
              </p>
            </div>
            <div>
              <span className="text-[9px] uppercase font-mono tracking-wider text-[#9E9EA8]">
                ASSENTO RESERVADO
              </span>
              <p className="font-heading text-xs font-semibold text-[#FFB800]">
                {seat}
              </p>
            </div>
            <div>
              <span className="text-[9px] uppercase font-mono tracking-wider text-[#9E9EA8]">
                HORÁRIO DE ENTRADA
              </span>
              <p className="font-heading text-xs font-semibold text-[#F4F4F6]">
                {sessionTime}
              </p>
            </div>
            <div>
              <span className="text-[9px] uppercase font-mono tracking-wider text-[#9E9EA8]">
                ESPECIFICAÇÕES
              </span>
              <p className="font-heading text-xs font-semibold text-[#E50914]">
                {format}
              </p>
            </div>
          </div>
        </div>

        {/* Perforated Tear Line with Left & Right Cutout Notches */}
        <div className="relative py-2 flex items-center justify-between">
          {/* Left semi-circle cut */}
          <div className="w-5 h-6 bg-[#0B0B0F] rounded-r-full -ml-3 border-r border-[#FF6B00]/40" />

          {/* Dashed line */}
          <div className="flex-1 border-t-2 border-dashed border-[#5C5C6B]/50 mx-2" />

          {/* Right semi-circle cut */}
          <div className="w-5 h-6 bg-[#0B0B0F] rounded-l-full -mr-3 border-l border-[#FF6B00]/40" />
        </div>

        {/* Ticket Stub Bottom Barcode Section */}
        <div className="p-4 pt-1 bg-[#1A1A24]/60 flex items-center justify-between gap-3">
          {/* Simulated Barcode */}
          <div className="flex-1 flex flex-col gap-1">
            <div className="h-9 w-full flex items-center justify-between gap-[2px] bg-[#0B0B0F] p-1.5 rounded border border-[#5C5C6B]/30 relative overflow-hidden">
              {/* Scanline laser */}
              <div className="absolute inset-y-0 w-1 bg-[#E50914] shadow-[0_0_8px_#E50914] animate-pulse" style={{ left: '45%' }} />
              
              {/* Barcode stripes */}
              {Array.from({ length: 34 }).map((_, i) => (
                <div
                  key={`barcode-bar-${i}`}
                  className="h-full bg-[#F4F4F6]"
                  style={{
                    width: i % 4 === 0 ? '3px' : i % 2 === 0 ? '1.5px' : '2px',
                    opacity: i % 5 === 0 ? 0.4 : 0.9,
                  }}
                />
              ))}
            </div>
            <div className="flex justify-between text-[8px] font-mono text-[#9E9EA8] tracking-widest">
              <span>* {ticketCode} *</span>
              <span className="text-[#FF6B00] font-bold">VÁLIDO HOJE</span>
            </div>
          </div>

          {/* QR Code graphic */}
          <div className="w-12 h-12 bg-[#0B0B0F] border border-[#FFB800]/40 rounded p-1 flex items-center justify-center shrink-0">
            <QrCode className="w-10 h-10 text-[#FFB800]" />
          </div>
        </div>

        {/* Admitted Stamp if logged in */}
        {isAdmitted && (
          <div className="absolute inset-0 bg-[#0B0B0F]/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 rounded-full bg-[#FF6B00]/20 border-2 border-[#FF6B00] flex items-center justify-center mb-3 cinema-glow-primary">
              <CheckCircle2 className="w-9 h-9 text-[#FF6B00]" />
            </div>
            <div className="border-2 border-[#E50914] px-4 py-1.5 rounded rotate-[-6deg] mb-2 shadow-[0_0_15px_rgba(229,9,20,0.5)]">
              <span className="font-heading font-black text-sm tracking-widest text-[#E50914] uppercase">
                ★ ENTRADA LIBERADA ★
              </span>
            </div>
            <p className="text-xs text-[#F4F4F6]">
              Apresente na entrada da Sala 01
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
