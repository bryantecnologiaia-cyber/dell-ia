'use client';

import React, { useState } from 'react';
import {
  X,
  Play,
  Star,
  Film,
  Sparkles,
  Volume2,
  Tv,
  Maximize2,
  Clock,
  Award,
  Layers,
  MessageSquare,
  Send,
  Eye,
  EyeOff,
  Check,
  Disc3,
  Armchair,
  Share2,
} from 'lucide-react';
import { CinephileProfile } from '@/lib/supabaseClient';

export interface MovieReview {
  id: string;
  author: string;
  tier: string;
  rating: number;
  content: string;
  date: string;
  hasSpoilers?: boolean;
}

export interface DetailedMovieItem {
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
  youtubeId: string;
  cinematographer: string;
  soundtrack: string;
  aspectRatio: string;
  trivia: string[];
  cast: { actor: string; role: string }[];
  isPremiere?: boolean;
}

interface CinemaTrailerPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  movie: DetailedMovieItem;
  userProfile: CinephileProfile;
  currentSeat: string;
  onSeatChanged: (newSeat: string) => void;
}

export default function CinemaTrailerPlayerModal({
  isOpen,
  onClose,
  movie,
  userProfile,
  currentSeat,
  onSeatChanged,
}: CinemaTrailerPlayerModalProps) {
  const [activeTab, setActiveTab] = useState<'trailer' | 'technical' | 'reviews' | 'seats'>('trailer');
  const [lightsDimmed, setLightsDimmed] = useState(false);
  const [reviews, setReviews] = useState<MovieReview[]>([
    {
      id: 'rev-1',
      author: 'Helena Prado',
      tier: 'Crítico Master',
      rating: 10,
      content:
        'Uma obra-prima absoluta da computação visual e da montagem analógica. A mixagem de som em Dolby Atmos reverbera cada grão de areia e cada explosão. Essencial em IMAX.',
      date: 'Ontem',
      hasSpoilers: false,
    },
    {
      id: 'rev-2',
      author: 'Carlos Mendes',
      tier: 'VIP Gold',
      rating: 9,
      content:
        'A cinematografia com lentes Ultra Vista 70 entrega um escopo épico que não víamos desde Lawrence da Arábia. A trilha sonora é de arrepiar.',
      date: 'Há 3 dias',
      hasSpoilers: false,
    },
    {
      id: 'rev-3',
      author: 'Marina Silveira',
      tier: 'Diretor',
      rating: 9.5,
      content:
        'O confronto no clímax final subverte as expectativas tradicionais de herói. Atuação magistral.',
      date: 'Há 1 semana',
      hasSpoilers: true,
    },
  ]);

  const [revealedSpoilers, setRevealedSpoilers] = useState<Record<string, boolean>>({});
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewScore, setNewReviewScore] = useState(10);
  const [newReviewSpoilers, setNewReviewSpoilers] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Seat picking state
  const [selectedSeatInternal, setSelectedSeatInternal] = useState(currentSeat);
  const [seatConfirmMessage, setSeatConfirmMessage] = useState(false);

  if (!isOpen) return null;

  const toggleSpoiler = (id: string) => {
    setRevealedSpoilers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewText.trim()) return;

    const newRev: MovieReview = {
      id: 'rev-' + Date.now(),
      author: userProfile.name || 'Cinéfilo',
      tier: userProfile.tier || 'VIP Gold',
      rating: newReviewScore,
      content: newReviewText.trim(),
      date: 'Agora',
      hasSpoilers: newReviewSpoilers,
    };

    setReviews([newRev, ...reviews]);
    setNewReviewText('');
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 2500);
  };

  const handleSelectSeat = (seatId: string) => {
    setSelectedSeatInternal(seatId);
    onSeatChanged(seatId);
    setSeatConfirmMessage(true);
    setTimeout(() => setSeatConfirmMessage(false), 2000);
  };

  // Seating grid: Rows A to G, seats 1 to 12
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const occupiedSeats = ['B4', 'B5', 'C8', 'D6', 'D7', 'E8', 'F3', 'F4', 'G10'];

  return (
    <div
      className={`fixed inset-0 z-50 transition-colors duration-500 flex items-center justify-center p-2 sm:p-4 ${
        lightsDimmed ? 'bg-[#000000]/98' : 'bg-[#0B0B0F]/90 backdrop-blur-xl'
      }`}
    >
      <div className="bg-[#121218] border border-[#FF6B00]/40 rounded-2xl max-w-4xl w-full p-4 sm:p-6 cinema-glow-primary shadow-2xl relative max-h-[95vh] overflow-y-auto">
        {/* Top Controls Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-[#5C5C6B]/30 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E50914] animate-ping" />
            <h2 className="font-heading font-black text-sm sm:text-base text-[#F4F4F6] truncate uppercase tracking-wider">
              {movie.title} • {movie.format}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {/* Lights switch */}
            <button
              type="button"
              onClick={() => setLightsDimmed(!lightsDimmed)}
              className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold transition flex items-center gap-1.5 border ${
                lightsDimmed
                  ? 'bg-[#FF6B00] text-[#0B0B0F] border-[#FF6B00]'
                  : 'bg-[#1A1A24] text-[#9E9EA8] border-[#5C5C6B]/40 hover:text-white'
              }`}
              title="Apagar ou acender as luzes da sala"
            >
              <span>💡</span>
              <span className="hidden sm:inline">
                {lightsDimmed ? 'Luzes: Apagadas' : 'Apagar Luzes'}
              </span>
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-1.5 text-[#9E9EA8] hover:text-[#E50914] transition rounded-lg hover:bg-[#1A1A24]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab switchers */}
        <div className="flex bg-[#0B0B0F] p-1 rounded-xl border border-[#5C5C6B]/30 mb-4 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('trailer')}
            className={`flex-1 min-w-[120px] py-1.5 text-xs font-heading font-bold rounded-lg transition tracking-wider flex items-center justify-center gap-1.5 ${
              activeTab === 'trailer'
                ? 'bg-[#FF6B00] text-[#0B0B0F] cinema-glow-primary'
                : 'text-[#9E9EA8] hover:text-[#F4F4F6]'
            }`}
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Trailer Oficial</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('technical')}
            className={`flex-1 min-w-[130px] py-1.5 text-xs font-heading font-bold rounded-lg transition tracking-wider flex items-center justify-center gap-1.5 ${
              activeTab === 'technical'
                ? 'bg-[#FFB800] text-[#0B0B0F]'
                : 'text-[#9E9EA8] hover:text-[#F4F4F6]'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>Bastidores & Specs</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('reviews')}
            className={`flex-1 min-w-[130px] py-1.5 text-xs font-heading font-bold rounded-lg transition tracking-wider flex items-center justify-center gap-1.5 ${
              activeTab === 'reviews'
                ? 'bg-[#E50914] text-white'
                : 'text-[#9E9EA8] hover:text-[#F4F4F6]'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Críticas ({reviews.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('seats')}
            className={`flex-1 min-w-[130px] py-1.5 text-xs font-heading font-bold rounded-lg transition tracking-wider flex items-center justify-center gap-1.5 ${
              activeTab === 'seats'
                ? 'bg-[#FF6B00] text-[#0B0B0F]'
                : 'text-[#9E9EA8] hover:text-[#F4F4F6]'
            }`}
          >
            <Armchair className="w-3.5 h-3.5" />
            <span>Reservar Poltrona</span>
          </button>
        </div>

        {/* Tab 1: Video Trailer Embed */}
        {activeTab === 'trailer' && (
          <div className="space-y-4 animate-in fade-in">
            {/* Theatrical Video Screen Frame */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-[#000000] border-2 border-[#FF6B00]/40 shadow-[0_0_35px_rgba(255,107,0,0.25)]">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${movie.youtubeId}?autoplay=1&rel=0&modestbranding=1&color=white`}
                title={`${movie.title} - Trailer Oficial`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            {/* Quick Specs under trailer */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs bg-[#0B0B0F] p-3 rounded-xl border border-[#5C5C6B]/30 font-mono">
              <div className="flex items-center gap-4">
                <span className="text-[#FF6B00] font-bold">
                  DIREÇÃO: {movie.director}
                </span>
                <span className="text-[#FFB800]">
                  ÁUDIO: {movie.soundtrack}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#9E9EA8]">ASPECT RATIO:</span>
                <span className="text-[#F4F4F6] font-bold">{movie.aspectRatio}</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Technical Specs & Behind the Scenes Trivia */}
        {activeTab === 'technical' && (
          <div className="space-y-4 animate-in fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Technical Specifications */}
              <div className="bg-[#1A1A24] border border-[#FF6B00]/30 rounded-xl p-4 space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF6B00] block flex items-center gap-1.5">
                  <Film className="w-4 h-4" />
                  ESPECIFICAÇÕES TÉCNICAS DE PROJEÇÃO
                </span>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-[#5C5C6B]/20">
                    <span className="text-[#9E9EA8]">Direção de Fotografia:</span>
                    <span className="font-semibold text-[#F4F4F6]">{movie.cinematographer}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#5C5C6B]/20">
                    <span className="text-[#9E9EA8]">Trilha Sonora Original:</span>
                    <span className="font-semibold text-[#FFB800]">{movie.soundtrack}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#5C5C6B]/20">
                    <span className="text-[#9E9EA8]">Proporção de Tela:</span>
                    <span className="font-mono text-[#F4F4F6]">{movie.aspectRatio}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#5C5C6B]/20">
                    <span className="text-[#9E9EA8]">Duração Oficial:</span>
                    <span className="font-semibold text-[#F4F4F6]">{movie.duration}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#9E9EA8]">Classificação Indicativa:</span>
                    <span className="font-semibold text-[#E50914]">{movie.rating}</span>
                  </div>
                </div>
              </div>

              {/* Cast */}
              <div className="bg-[#1A1A24] border border-[#FFB800]/30 rounded-xl p-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FFB800] block mb-3 flex items-center gap-1.5">
                  <Award className="w-4 h-4" />
                  ELENCO PRINCIPAL
                </span>
                <div className="space-y-2 text-xs">
                  {movie.cast.map((c, i) => (
                    <div key={i} className="flex justify-between items-center py-1 border-b border-[#5C5C6B]/20">
                      <span className="font-semibold text-[#F4F4F6]">{c.actor}</span>
                      <span className="text-[#9E9EA8] font-mono text-[11px]">{c.role}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Curiosidades de Bastidores (Trivia) */}
            <div className="bg-[#0B0B0F] border border-[#5C5C6B]/30 rounded-xl p-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF6B00] block mb-2 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#FFB800]" />
                CURIOSIDADES DE BASTIDORES & PRODUÇÃO
              </span>
              <ul className="space-y-2 text-xs text-[#9E9EA8]">
                {movie.trivia.map((triv, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#FF6B00] font-bold">★</span>
                    <span className="leading-relaxed text-[#F4F4F6]/90">{triv}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tab 3: Community Reviews & Write Review */}
        {activeTab === 'reviews' && (
          <div className="space-y-5 animate-in fade-in">
            {/* Form to submit review */}
            <form onSubmit={handleAddReview} className="bg-[#1A1A24] border border-[#FF6B00]/30 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#F4F4F6] uppercase flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#FF6B00]" />
                  Publicar sua Avaliação como {userProfile.name}
                </span>

                {/* Score Selector */}
                <div className="flex items-center gap-1">
                  <span className="text-[11px] font-mono text-[#9E9EA8] mr-1">Nota:</span>
                  {[7, 8, 9, 10].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setNewReviewScore(num)}
                      className={`w-6 h-6 rounded text-xs font-bold font-mono transition ${
                        newReviewScore === num
                          ? 'bg-[#FFB800] text-[#0B0B0F]'
                          : 'bg-[#0B0B0F] text-[#9E9EA8] border border-[#5C5C6B]/30'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                rows={2}
                required
                value={newReviewText}
                onChange={(e) => setNewReviewText(e.target.value)}
                placeholder="Escreva sua análise crítica sobre a direção, atuações, som e impacto deste filme..."
                className="w-full bg-[#0B0B0F] border border-[#5C5C6B]/40 focus:border-[#FF6B00] rounded-xl p-3 text-xs text-[#F4F4F6] outline-none resize-none"
              />

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={newReviewSpoilers}
                    onChange={(e) => setNewReviewSpoilers(e.target.checked)}
                    className="accent-[#FF6B00]"
                  />
                  <span className="text-[11px] text-[#9E9EA8]">Contém Spoilers da trama</span>
                </label>

                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#FF6B00] hover:bg-[#FF7A1A] text-[#0B0B0F] font-heading font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition cinema-glow-primary cursor-pointer"
                >
                  <Send className="w-3 h-3" />
                  <span>Publicar Crítica</span>
                </button>
              </div>

              {reviewSubmitted && (
                <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1 pt-1">
                  <Check className="w-3.5 h-3.5" />
                  Crítica adicionada com sucesso à sessão!
                </div>
              )}
            </form>

            {/* List of reviews */}
            <div className="space-y-3">
              {reviews.map((rev) => {
                const isSpoilerHidden = rev.hasSpoilers && !revealedSpoilers[rev.id];
                return (
                  <div
                    key={rev.id}
                    className="bg-[#0B0B0F] border border-[#5C5C6B]/30 rounded-xl p-4 space-y-2 relative"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-bold text-xs text-[#F4F4F6]">
                          {rev.author}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-[#FF6B00]/15 text-[#FF6B00] border border-[#FF6B00]/30 font-bold">
                          {rev.tier}
                        </span>
                        <span className="text-[10px] text-[#9E9EA8] font-mono">• {rev.date}</span>
                      </div>

                      <div className="flex items-center gap-1 text-[#FFB800] text-xs font-bold font-mono bg-[#FFB800]/10 px-2 py-0.5 rounded">
                        <Star className="w-3 h-3 fill-[#FFB800]" />
                        <span>{rev.rating}/10</span>
                      </div>
                    </div>

                    {/* Content or Spoiler Blur */}
                    {isSpoilerHidden ? (
                      <div className="bg-[#121218] p-3 rounded-lg border border-[#E50914]/40 flex items-center justify-between">
                        <span className="text-xs text-[#ffb4ab] flex items-center gap-1.5 font-semibold">
                          ⚠️ Esta crítica contém revelações (spoilers)
                        </span>
                        <button
                          type="button"
                          onClick={() => toggleSpoiler(rev.id)}
                          className="text-xs text-[#FF6B00] hover:underline font-mono font-bold flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Clique para Revelar</span>
                        </button>
                      </div>
                    ) : (
                      <p className="text-xs text-[#F4F4F6]/90 leading-relaxed">
                        {rev.content}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 4: Interactive Theater Seat Picker */}
        {activeTab === 'seats' && (
          <div className="space-y-4 animate-in fade-in">
            {/* Screen indicator */}
            <div className="text-center pt-2">
              <div className="w-3/4 mx-auto h-2 bg-gradient-to-r from-transparent via-[#FF6B00] to-transparent rounded-full mb-1 shadow-[0_0_16px_#FF6B00]" />
              <span className="text-[10px] font-mono tracking-widest text-[#9E9EA8] uppercase font-bold">
                TELA GIGANTE IMAX 70MM • PROJEÇÃO LASER
              </span>
            </div>

            {/* Grid of seats */}
            <div className="bg-[#0B0B0F] p-4 sm:p-6 rounded-2xl border border-[#5C5C6B]/30 flex flex-col items-center gap-2">
              {rows.map((row) => (
                <div key={row} className="flex items-center gap-1.5 sm:gap-2">
                  <span className="w-4 text-[10px] font-mono text-[#9E9EA8] font-bold text-center">
                    {row}
                  </span>

                  <div className="flex gap-1 sm:gap-1.5">
                    {Array.from({ length: 12 }).map((_, colIdx) => {
                      const seatNum = colIdx + 1;
                      const seatId = `FIL ${row} • POL ${seatNum}`;
                      const isOccupied = occupiedSeats.includes(`${row}${seatNum}`);
                      const isSelected = selectedSeatInternal === seatId;
                      const isVipRow = row === 'E' || row === 'F';

                      return (
                        <button
                          key={seatId}
                          type="button"
                          disabled={isOccupied}
                          onClick={() => handleSelectSeat(seatId)}
                          title={`${seatId} ${isOccupied ? '(Ocupado)' : isVipRow ? '(VIP)' : ''}`}
                          className={`w-5 h-5 sm:w-6 sm:h-6 rounded-t-md text-[9px] font-mono font-bold transition flex items-center justify-center cursor-pointer ${
                            isSelected
                              ? 'bg-[#FF6B00] text-[#0B0B0F] shadow-[0_0_12px_#FF6B00] scale-110 z-10'
                              : isOccupied
                              ? 'bg-[#1A1A24] text-[#5C5C6B] border border-[#5C5C6B]/20 cursor-not-allowed opacity-40'
                              : isVipRow
                              ? 'bg-[#FFB800]/20 hover:bg-[#FFB800] hover:text-[#0B0B0F] text-[#FFB800] border border-[#FFB800]/40'
                              : 'bg-[#121218] hover:bg-[#FF6B00]/40 text-[#9E9EA8] border border-[#5C5C6B]/40'
                          }`}
                        >
                          {seatNum}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Legend & Current selected info */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs bg-[#1A1A24] p-3 rounded-xl border border-[#5C5C6B]/30 font-mono">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-t-sm bg-[#FF6B00]" />
                  <span>Sua Poltrona</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-t-sm bg-[#FFB800]/30 border border-[#FFB800]" />
                  <span>VIP Livre</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-t-sm bg-[#1A1A24] opacity-40" />
                  <span>Ocupado</span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[#9E9EA8]">Assento Ativo:</span>
                <strong className="text-[#FF6B00] font-bold">{selectedSeatInternal}</strong>
              </div>
            </div>

            {seatConfirmMessage && (
              <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-300 flex items-center justify-center gap-1.5 animate-in fade-in">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Poltrona atualizada no seu bilhete com sucesso!</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
