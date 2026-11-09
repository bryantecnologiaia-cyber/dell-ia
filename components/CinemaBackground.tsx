'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Film, Sparkles } from 'lucide-react';

interface CinemaBackgroundProps {
  intensity?: number;
  showFilmStrips?: boolean;
}

export default function CinemaBackground({
  intensity = 1,
  showFilmStrips = true,
}: CinemaBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.3 });

  // Handle subtle mouse parallax on the projector beam
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Canvas volumetric dust particles in the projector beam
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Generate floating dust motes
    const particleCount = 70;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.6,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -Math.random() * 0.6 - 0.2, // drifting slowly upward in projector heat
      alpha: Math.random() * 0.6 + 0.2,
      pulse: Math.random() * Math.PI,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Projector source at top center
      const sourceX = width * (0.5 + (mousePos.x - 0.5) * 0.08);
      const sourceY = 0;

      // Volumetric beam boundaries (cone going down)
      const targetLeft = width * 0.15;
      const targetRight = width * 0.85;
      const bottomY = height;

      // Projector Light Beam Gradient
      const beamGrad = ctx.createRadialGradient(
        sourceX,
        sourceY,
        10,
        sourceX,
        height * 0.6,
        height * 0.85
      );
      beamGrad.addColorStop(0, 'rgba(255, 235, 180, 0.22)');
      beamGrad.addColorStop(0.2, 'rgba(255, 107, 0, 0.12)');
      beamGrad.addColorStop(0.6, 'rgba(255, 184, 0, 0.04)');
      beamGrad.addColorStop(1, 'rgba(11, 11, 15, 0)');

      // Draw light cone
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(sourceX - 30, sourceY);
      ctx.lineTo(targetRight, bottomY);
      ctx.lineTo(targetLeft, bottomY);
      ctx.lineTo(sourceX + 30, sourceY);
      ctx.closePath();
      ctx.fillStyle = beamGrad;
      ctx.fill();

      // Draw dust motes illuminated by the projector beam
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.pulse += 0.02;

        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        // Check if particle is inside the general beam cone
        const progressY = p.y / height;
        const beamLeftAtY = sourceX - 30 + (targetLeft - (sourceX - 30)) * progressY;
        const beamRightAtY = sourceX + 30 + (targetRight - (sourceX + 30)) * progressY;
        const inBeam = p.x >= beamLeftAtY && p.x <= beamRightAtY;

        const currentAlpha = inBeam
          ? (Math.sin(p.pulse) * 0.3 + 0.7) * p.alpha * 0.85
          : 0.08;

        ctx.beginPath();
        ctx.arc(p.x, p.y, inBeam ? p.size * 1.2 : p.size * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = inBeam
          ? `rgba(255, 220, 160, ${currentAlpha})`
          : `rgba(255, 107, 0, ${currentAlpha})`;
        ctx.fill();
      });

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePos]);

  // Classic film titles and stills for the rolling 35mm side strips
  const filmFramesLeft = [
    { title: 'METROPOLIS', year: '1927', scene: '🎬 CENA 04 - CIDADE DAS MÁQUINAS' },
    { title: '2001: UMA ODISSÉIA', year: '1968', scene: '🪐 CENA 12 - JÚPITER E ALÉM' },
    { title: 'BLADE RUNNER', year: '1982', scene: '🌧️ CENA 09 - LÁGRIMAS NA CHUVA' },
    { title: 'CINEMA PARADISO', year: '1988', scene: '🎞️ CENA 15 - SALA DE PROJEÇÃO' },
    { title: 'APOCALYPSE NOW', year: '1979', scene: '🚁 CENA 03 - VOO DAS VALQUÍRIAS' },
    { title: 'TAXI DRIVER', year: '1976', scene: '🚖 CENA 07 - NEON EM MANHATTAN' },
  ];

  const filmFramesRight = [
    { title: 'INTERESTELAR', year: '2014', scene: '⏳ CENA 08 - PLANETA DE MILLER' },
    { title: 'PULP FICTION', year: '1994', scene: '💼 CENA 02 - A MALETA DOURADA' },
    { title: 'O PODEROSO CHEFÃO', year: '1972', scene: '🕯️ CENA 01 - A OFERTA IRRECUSÁVEL' },
    { title: 'CASABLANCA', year: '1942', scene: '✈️ CENA 14 - NOITE NA PISTA' },
    { title: 'DUNE: PARTE 2', year: '2024', scene: '🏜️ CENA 11 - O VERME DA AREIA' },
    { title: 'MAD MAX: FURY ROAD', year: '2015', scene: '🔥 CENA 05 - TEMPESTADE TÓXICA' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Deep Obsidian canvas background with subtle ambient glows */}
      <div className="absolute inset-0 bg-[#0B0B0F]" />

      {/* Atmospheric radial glow from center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[550px] bg-gradient-to-b from-[#FF6B00]/15 via-[#FFB800]/8 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[300px] bg-gradient-to-t from-[#E50914]/10 via-[#FF6B00]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Canvas for volumetric dust in projector beam */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full mix-blend-screen opacity-90"
      />

      {/* Projector Hardware Lens & Beam Flare at Top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
        {/* Projector casing outline */}
        <div className="w-44 h-5 bg-[#121218] border-b border-[#FF6B00]/40 rounded-b-xl flex items-center justify-between px-4 shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E50914] animate-ping" />
          <span className="text-[9px] font-mono tracking-widest text-[#FFB800] uppercase font-bold">
            PROJ 35MM #01
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
        </div>

        {/* Projector optical lens bulb */}
        <div className="relative -mt-1 w-14 h-6 rounded-full bg-gradient-to-b from-[#FFF5D6] via-[#FFB800] to-[#FF6B00] shadow-[0_0_35px_#FFB800,0_0_60px_#FF6B00] animate-projector-flicker flex items-center justify-center">
          <div className="w-8 h-2 rounded-full bg-white blur-[1px]" />
        </div>
      </div>

      {/* Left 35mm Film Strip (Rolling up) */}
      {showFilmStrips && (
        <aside
          aria-label="Película 35mm decorativa esquerda"
          className="hidden xl:block absolute left-4 top-0 bottom-0 w-24 overflow-hidden opacity-35 hover:opacity-75 transition-opacity duration-500 border-x border-[#FF6B00]/20 bg-[#121218]/80 backdrop-blur-sm"
        >
          {/* Left sprocket perforations */}
          <div className="absolute left-1 top-0 bottom-0 w-3 flex flex-col justify-between py-2 z-10">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={`sprocket-l-${i}`}
                className="w-2.5 h-3 bg-[#0B0B0F] border border-[#FF6B00]/30 rounded-[2px] my-1"
              />
            ))}
          </div>

          {/* Right sprocket perforations */}
          <div className="absolute right-1 top-0 bottom-0 w-3 flex flex-col justify-between py-2 z-10">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={`sprocket-lr-${i}`}
                className="w-2.5 h-3 bg-[#0B0B0F] border border-[#FF6B00]/30 rounded-[2px] my-1"
              />
            ))}
          </div>

          {/* Scrolling frames */}
          <div className="animate-film-scroll-up px-4 py-2 flex flex-col gap-6">
            {[...filmFramesLeft, ...filmFramesLeft].map((frame, idx) => (
              <div
                key={`left-frame-${idx}`}
                className="w-16 h-28 bg-[#1A1A24] border border-[#FF6B00]/40 rounded p-1 flex flex-col justify-between shadow-inner"
              >
                <div className="flex justify-between items-center text-[7px] font-mono text-[#FFB800]">
                  <span>35mm</span>
                  <span>{frame.year}</span>
                </div>
                <div className="h-16 bg-gradient-to-br from-[#FF6B00]/20 via-[#1A1A24] to-[#E50914]/20 rounded flex items-center justify-center text-center p-1">
                  <Film className="w-5 h-5 text-[#FF6B00]/60" />
                </div>
                <div className="text-[7px] font-bold text-[#F4F4F6] truncate tracking-tight">
                  {frame.title}
                </div>
              </div>
            ))}
          </div>
        </aside>
      )}

      {/* Right 35mm Film Strip (Rolling down) */}
      {showFilmStrips && (
        <aside
          aria-label="Película 35mm decorativa direita"
          className="hidden xl:block absolute right-4 top-0 bottom-0 w-24 overflow-hidden opacity-35 hover:opacity-75 transition-opacity duration-500 border-x border-[#FF6B00]/20 bg-[#121218]/80 backdrop-blur-sm"
        >
          {/* Left sprocket */}
          <div className="absolute left-1 top-0 bottom-0 w-3 flex flex-col justify-between py-2 z-10">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={`sprocket-rl-${i}`}
                className="w-2.5 h-3 bg-[#0B0B0F] border border-[#FF6B00]/30 rounded-[2px] my-1"
              />
            ))}
          </div>

          {/* Right sprocket */}
          <div className="absolute right-1 top-0 bottom-0 w-3 flex flex-col justify-between py-2 z-10">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={`sprocket-rr-${i}`}
                className="w-2.5 h-3 bg-[#0B0B0F] border border-[#FF6B00]/30 rounded-[2px] my-1"
              />
            ))}
          </div>

          {/* Scrolling frames */}
          <div className="animate-film-scroll-down px-4 py-2 flex flex-col gap-6">
            {[...filmFramesRight, ...filmFramesRight].map((frame, idx) => (
              <div
                key={`right-frame-${idx}`}
                className="w-16 h-28 bg-[#1A1A24] border border-[#FFB800]/40 rounded p-1 flex flex-col justify-between shadow-inner"
              >
                <div className="flex justify-between items-center text-[7px] font-mono text-[#E50914] font-bold">
                  <span>EXP-70</span>
                  <span>{frame.year}</span>
                </div>
                <div className="h-16 bg-gradient-to-br from-[#E50914]/20 via-[#1A1A24] to-[#FFB800]/20 rounded flex items-center justify-center text-center p-1">
                  <Film className="w-5 h-5 text-[#FFB800]/60" />
                </div>
                <div className="text-[7px] font-bold text-[#F4F4F6] truncate tracking-tight">
                  {frame.title}
                </div>
              </div>
            ))}
          </div>
        </aside>
      )}

      {/* Cinema theater velvet seats silhouette at the bottom */}
      <div className="absolute bottom-0 inset-x-0 h-28 pointer-events-none z-10">
        {/* Soft dark gradient fade */}
        <div className="w-full h-full bg-gradient-to-t from-[#0B0B0F] via-[#0B0B0F]/90 to-transparent flex items-end justify-center gap-2 sm:gap-4 px-8 opacity-40">
          {Array.from({ length: 18 }).map((_, idx) => (
            <div
              key={`seat-${idx}`}
              className="flex-1 max-w-10 h-10 rounded-t-xl bg-[#121218] border-t-2 border-[#E50914]/30 shadow-lg relative"
            >
              <div className="w-full h-2 rounded-t-xl bg-[#E50914]/20" />
            </div>
          ))}
        </div>
      </div>

      {/* Subtle film grain texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
