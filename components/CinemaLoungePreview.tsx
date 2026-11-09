'use client';

import React, { useState } from 'react';
import {
  Film,
  Play,
  Star,
  Clock,
  Sparkles,
  LogOut,
  SlidersHorizontal,
  Bookmark,
  Share2,
  Tv,
  Info,
  Check,
} from 'lucide-react';
import type { UserSession } from './LoginForm';
import CinemaTicketCard from './CinemaTicketCard';

interface CinemaLoungePreviewProps {
  user: UserSession;
  onLogout: () => void;
}

interface MovieItem {
  id: string;
  title: string;
  originalTitle: string;
  year: number;
  duration: string;
  director: string;
  rating: string;
  score: number;
  genre: string;
  format: string;
  synopsis: string;
  gradient: string;
  isPremiere?: boolean;
}

const FEATURED_MOVIES: MovieItem[] = [
  {
    id: 'm1',
    title: 'DUNA: PARTE DOIS',
    originalTitle: 'Dune: Part Two',
    year: 2024,
    duration: '2h 46m',
    director: 'Denis Villeneuve',
    rating: '14 Anos',
    score: 9.3,
    genre: 'Ficção Científica / Épico',
    format: 'IMAX 70MM • DOLBY ATMOS',
    synopsis: 'Paul Atreides se une a Chani e aos Fremen em busca de vingança contra os conspiradores que destruíram sua família, enfrentando uma escolha entre o amor de sua vida e o destino do universo.',
    gradient: 'from-[#FF6B00]/40 via-[#1A1A24] to-[#0B0B0F]',
    isPremiere: true,
  },
  {
    id: 'm2',
    title: 'OPPENHEIMER',
    originalTitle: 'Oppenheimer',
    year: 2023,
    duration: '3h 00m',
    director: 'Christopher Nolan',
    rating: '16 Anos',
    score: 9.1,
    genre: 'Drama / Biografia',
    format: 'IMAX 70MM ANALÓGICO',
    synopsis: 'A história do físico americano J. Robert Oppenheimer, seu papel no Projeto Manhattan e o desenvolvimento da bomba atômica que mudou o curso da humanidade.',
    gradient: 'from-[#FFB800]/30 via-[#1A1A24] to-[#0B0B0F]',
  },
  {
    id: 'm3',
    title: 'BLADE RUNNER 2049',
    originalTitle: 'Blade Runner 2049',
    year: 2017,
    duration: '2h 44m',
    director: 'Denis Villeneuve',
    rating: '14 Anos',
    score: 8.9,
    genre: 'Cyberpunk / Neo-Noir',
    format: '4K HDR10+ • DOLBY VISION',
    synopsis: 'Trinta anos após os eventos do primeiro filme, um novo blade runner descobre um segredo há muito enterrado que pode mergulhar a sociedade no caos.',
    gradient: 'from-[#E50914]/35 via-[#1A1A24] to-[#0B0B0F]',
    isPremiere: true,
  },
  {
    id: 'm4',
    title: 'INTERESTELAR',
    originalTitle: 'Interstellar',
    year: 2014,
    duration: '2h 49m',
    director: 'Christopher Nolan',
    rating: '10 Anos',
    score: 9.4,
    genre: 'Aventura Cósmica',
    format: 'IMAX DIGITAL REMASTER',
    synopsis: 'Uma equipe de exploradores viaja através de um buraco de minhoca no espaço, na tentativa desesperada de garantir a sobrevivência da humanidade.',
    gradient: 'from-[#FF6B00]/30 via-[#1A1A24] to-[#0B0B0F]',
  },
  {
    id: 'm5',
    title: 'CIDADE DE DEUS',
    originalTitle: 'City of God',
    year: 2002,
    duration: '2h 10m',
    director: 'Fernando Meirelles & Kátia Lund',
    rating: '18 Anos',
    score: 9.0,
    genre: 'Drama Policial',
    format: 'RESTAURAÇÃO 4K 35MM',
    synopsis: 'Nas favelas do Rio de Janeiro dos anos 1970, dois rapazes seguem caminhos diferentes: um se torna fotógrafo e o outro se torna traficante.',
    gradient: 'from-[#FFB800]/40 via-[#1A1A24] to-[#0B0B0F]',
  },
  {
    id: 'm6',
    title: 'PULP FICTION: TEMPO DE VIOLÊNCIA',
    originalTitle: 'Pulp Fiction',
    year: 1994,
    duration: '2h 34m',
    director: 'Quentin Tarantino',
    rating: '18 Anos',
    score: 9.2,
    genre: 'Crime / Cult Classic',
    format: '35MM VINTAGE PROJECTION',
    synopsis: 'As vidas de dois assassinos da máfia, um boxeador, a esposa de um gângster e dois bandidos se entrelaçam em quatro contos de violência e redenção.',
    gradient: 'from-[#E50914]/30 via-[#1A1A24] to-[#0B0B0F]',
  },
];

export default function CinemaLoungePreview({
  user,
  onLogout,
}: CinemaLoungePreviewProps) {
  const [selectedMovie, setSelectedMovie] = useState<MovieItem>(FEATURED_MOVIES[0]);
  const [showTrailerModal, setShowTrailerModal] = useState(false);
  const [savedToWatchlist, setSavedToWatchlist] = useState<Record<string, boolean>>({});

  const toggleWatchlist = (id: string) => {
    setSavedToWatchlist((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-8 animate-in fade-in duration-500">
      {/* Top Banner Navigation */}
      <header className="bg-[#121218]/90 border border-[#FF6B00]/30 rounded-2xl p-4 sm:p-6 mb-8 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-4 cinema-card-glow">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF6B00] to-[#E50914] flex items-center justify-center text-[#0B0B0F] cinema-glow-primary">
            <Film className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse" />
              <span className="text-[10px] font-mono tracking-widest text-[#FFB800] uppercase font-bold">
                SESSÃO PRIVADA INICIADA
              </span>
            </div>
            <h1 className="font-heading font-black text-xl text-[#F4F4F6]">
              Bem-vindo à Sala, <span className="text-[#FF6B00]">{user.name}</span>
            </h1>
            <p className="text-xs text-[#9E9EA8]">
              Passaporte {user.tier} • Acesso liberado ao catálogo Theatrical
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right pr-3 border-r border-[#5C5C6B]/30 font-mono text-xs">
            <span className="text-[#9E9EA8] block text-[10px]">CÓDIGO DA POLTRONA</span>
            <span className="text-[#FFB800] font-bold">{user.ticketCode}</span>
          </div>

          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1A1A24] hover:bg-[#252533] border border-[#E50914]/40 hover:border-[#E50914] text-xs font-semibold text-[#F4F4F6] hover:text-[#E50914] transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Encerrar Sessão / Voltar</span>
          </button>
        </div>
      </header>

      {/* Main Grid: Ticket Stub & Featured Spotlight */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {/* Left Column: Interactive Digital Ticket */}
        <div className="lg:col-span-1">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF6B00]">
              SEU BILHETE DE ENTRADA
            </span>
            <span className="text-[10px] bg-[#E50914] text-white font-bold px-2 py-0.5 rounded uppercase">
              VALIDADO
            </span>
          </div>
          <CinemaTicketCard
            userEmail={user.email}
            ticketCode={user.ticketCode}
            theaterRoom="SALA 01 - PROJEÇÃO 35MM"
            seat="FIL E • POL 12"
            sessionTime="HOJE • 21:30"
            format="IMAX 70MM / DOLBY ATMOS"
            isAdmitted={true}
          />
        </div>

        {/* Right Column: Active Movie Spotlight */}
        <div className="lg:col-span-2">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FFB800]">
              EM DESTAQUE NA TELA PRINCIPAL
            </span>
            <span className="text-xs text-[#9E9EA8]">Selecione um filme abaixo</span>
          </div>

          <div className="relative bg-[#121218] border border-[#FF6B00]/40 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between min-h-[380px]">
            {/* Ambient Background Gradient for the film */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${selectedMovie.gradient} opacity-40 pointer-events-none`}
            />

            <div className="relative z-10 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                {selectedMovie.isPremiere && (
                  <span className="bg-[#E50914] text-white text-[10px] font-mono font-black px-2.5 py-1 rounded tracking-wider uppercase shadow-[0_0_12px_rgba(229,9,20,0.6)]">
                    ESTREIA EXCLUSIVA
                  </span>
                )}
                <span className="bg-[#FF6B00]/20 text-[#FF6B00] border border-[#FF6B00]/40 text-[10px] font-mono font-bold px-2.5 py-1 rounded tracking-wider uppercase">
                  {selectedMovie.format}
                </span>
                <span className="bg-[#1A1A24] text-[#9E9EA8] text-[10px] font-mono px-2 py-1 rounded">
                  {selectedMovie.rating}
                </span>
              </div>

              <div>
                <h2 className="font-heading font-black text-2xl sm:text-4xl text-[#F4F4F6] tracking-tight">
                  {selectedMovie.title}
                </h2>
                <p className="text-xs font-mono text-[#FFB800] mt-0.5">
                  {selectedMovie.originalTitle} • {selectedMovie.year} • {selectedMovie.duration}
                </p>
              </div>

              <p className="text-sm text-[#F4F4F6]/90 line-clamp-3 leading-relaxed max-w-xl">
                {selectedMovie.synopsis}
              </p>

              <div className="flex items-center gap-6 text-xs text-[#9E9EA8] pt-2">
                <div>
                  <span className="block text-[10px] font-mono uppercase">DIREÇÃO</span>
                  <span className="font-semibold text-[#F4F4F6]">{selectedMovie.director}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-mono uppercase">AVALIAÇÃO</span>
                  <span className="font-bold text-[#FFB800] flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-[#FFB800]" />
                    {selectedMovie.score} / 10
                  </span>
                </div>
              </div>
            </div>

            {/* Actions CTA */}
            <div className="relative z-10 pt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setShowTrailerModal(true)}
                className="px-6 py-3 rounded-xl bg-[#FF6B00] hover:bg-[#FF7A1A] text-[#0B0B0F] font-heading font-black text-xs uppercase tracking-wider flex items-center gap-2 cinema-glow-primary transition cursor-pointer"
              >
                <Play className="w-4 h-4 fill-[#0B0B0F]" />
                <span>Iniciar Projeção / Trailer</span>
              </button>

              <button
                onClick={() => toggleWatchlist(selectedMovie.id)}
                className={`px-4 py-3 rounded-xl border text-xs font-semibold flex items-center gap-2 transition cursor-pointer ${
                  savedToWatchlist[selectedMovie.id]
                    ? 'bg-[#FFB800]/20 border-[#FFB800] text-[#FFB800]'
                    : 'bg-[#1A1A24] border-[#5C5C6B]/40 hover:border-[#FF6B00] text-[#F4F4F6]'
                }`}
              >
                {savedToWatchlist[selectedMovie.id] ? (
                  <>
                    <Check className="w-4 h-4 text-[#FFB800]" />
                    <span>Na sua Lista VIP</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4" />
                    <span>Adicionar à Lista</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Em Cartaz Hoje Catalog Reel */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B00]" />
            <h3 className="font-heading font-black text-lg tracking-wider text-[#F4F4F6] uppercase">
              EM CARTAZ HOJE NA OBSIDIAN
            </h3>
          </div>
          <span className="text-xs font-mono text-[#9E9EA8]">6 Obras Disponíveis</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {FEATURED_MOVIES.map((movie) => {
            const isSelected = selectedMovie.id === movie.id;
            return (
              <div
                key={movie.id}
                onClick={() => setSelectedMovie(movie)}
                className={`group relative rounded-xl overflow-hidden cursor-pointer p-3 transition-all duration-300 border ${
                  isSelected
                    ? 'bg-[#1A1A24] border-[#FF6B00] cinema-glow-primary scale-[1.02]'
                    : 'bg-[#121218] border-[#5C5C6B]/30 hover:border-[#FFB800]/60 hover:-translate-y-1'
                }`}
              >
                {/* Poster graphic frame */}
                <div className="aspect-[2/3] rounded-lg bg-gradient-to-br from-[#1A1A24] via-[#121218] to-[#0B0B0F] border border-[#5C5C6B]/20 p-2 flex flex-col justify-between mb-2 relative overflow-hidden">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] font-mono font-bold text-[#FFB800]">
                      {movie.year}
                    </span>
                    {movie.isPremiere && (
                      <span className="w-2 h-2 rounded-full bg-[#E50914] animate-ping" />
                    )}
                  </div>

                  <div className="flex flex-col items-center justify-center my-auto text-center">
                    <Film className="w-8 h-8 text-[#FF6B00]/70 group-hover:text-[#FF6B00] transition" />
                    <span className="text-[10px] font-mono text-[#9E9EA8] mt-2">
                      {movie.genre.split('/')[0]}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-[9px] font-mono text-[#FFB800]">
                    <span className="flex items-center gap-0.5">
                      <Star className="w-2.5 h-2.5 fill-[#FFB800]" /> {movie.score}
                    </span>
                    <span className="text-[8px] text-[#9E9EA8]">{movie.duration}</span>
                  </div>
                </div>

                <h4 className="font-heading font-bold text-xs text-[#F4F4F6] truncate">
                  {movie.title}
                </h4>
                <p className="text-[10px] text-[#9E9EA8] truncate">
                  {movie.director}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Trailer Simulation Modal */}
      {showTrailerModal && (
        <div className="fixed inset-0 z-50 bg-[#0B0B0F]/90 backdrop-blur-lg flex items-center justify-center p-4">
          <div className="bg-[#121218] border border-[#FF6B00]/50 rounded-2xl max-w-2xl w-full p-6 cinema-glow-primary relative">
            <div className="flex items-center justify-between pb-3 border-b border-[#5C5C6B]/30 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#E50914] animate-ping" />
                <span className="font-heading font-bold text-sm text-[#F4F4F6]">
                  PROJEÇÃO SALA 01: {selectedMovie.title}
                </span>
              </div>
              <button
                onClick={() => setShowTrailerModal(false)}
                className="text-xs text-[#9E9EA8] hover:text-[#E50914] font-mono font-bold"
              >
                ✕ FECHAR
              </button>
            </div>

            {/* Simulated Theatrical Projection Screen */}
            <div className="aspect-video w-full rounded-xl bg-[#0B0B0F] border border-[#FF6B00]/40 flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F] via-transparent to-[#FF6B00]/10" />
              
              {/* Projector beam simulator */}
              <div className="w-16 h-16 rounded-full bg-[#FF6B00]/20 border border-[#FF6B00] flex items-center justify-center mb-3 animate-pulse">
                <Play className="w-8 h-8 text-[#FF6B00] fill-[#FF6B00] ml-1" />
              </div>

              <p className="font-heading font-black text-sm text-[#F4F4F6] tracking-widest uppercase">
                {selectedMovie.title}
              </p>
              <p className="text-xs font-mono text-[#FFB800] mt-1">
                TRANSMISSÃO EXCLUSIVA 4K • DOLBY ATMOS
              </p>
              <p className="text-[11px] text-[#9E9EA8] mt-3 max-w-sm text-center px-4">
                (Simulação do reprodutor cinematográfico Obsidian Cinema conectado à sua credencial VIP).
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-[#9E9EA8] font-mono">
                Assento Conectado: <strong className="text-[#FFB800]">{user.ticketCode}</strong>
              </span>
              <button
                onClick={() => setShowTrailerModal(false)}
                className="px-4 py-2 rounded-xl bg-[#FF6B00] text-[#0B0B0F] font-heading font-bold text-xs uppercase"
              >
                Concluir Visualização
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
