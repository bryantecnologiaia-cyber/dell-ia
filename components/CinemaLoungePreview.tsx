'use client';

import React, { useState, useEffect } from 'react';
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
  User,
  Edit3,
  Award,
  Clapperboard,
  Heart,
  BadgeCheck,
  Armchair,
  Filter,
} from 'lucide-react';
import type { UserSession } from './LoginForm';
import CinemaTicketCard from './CinemaTicketCard';
import CinephileProfileModal from './CinephileProfileModal';
import CinemaTrailerPlayerModal, { DetailedMovieItem } from './CinemaTrailerPlayerModal';
import {
  CinephileProfile,
  loadCinephileProfile,
} from '@/lib/supabaseClient';

interface CinemaLoungePreviewProps {
  user: UserSession;
  onLogout: () => void;
}

const DETAILED_MOVIES: DetailedMovieItem[] = [
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
    synopsis:
      'Paul Atreides se une a Chani e aos Fremen em busca de vingança contra os conspiradores que destruíram sua família, enfrentando uma escolha entre o amor de sua vida e o destino do universo.',
    gradient: 'from-[#FF6B00]/40 via-[#1A1A24] to-[#0B0B0F]',
    youtubeId: 'Way9Dexny3w',
    cinematographer: 'Greig Fraser, ASC, ACS',
    soundtrack: 'Hans Zimmer (Mixagem Dolby Atmos 7.1.4)',
    aspectRatio: '1.43:1 (IMAX GT Laser) / 1.90:1',
    trivia: [
      'Filmado 100% com câmeras digitais certificadas para IMAX (ARRI Alexa LF e Mini LF).',
      'As cenas no deserto de Arrakis foram gravadas nos desertos de Abu Dhabi e na Jordânia sob luz natural extrema.',
      'A língua Fremen (Chakobsa) foi falada com sotaques específicos concebidos por linguistas dedicados.',
    ],
    cast: [
      { actor: 'Timothée Chalamet', role: 'Paul Atreides' },
      { actor: 'Zendaya', role: 'Chani' },
      { actor: 'Rebecca Ferguson', role: 'Lady Jessica' },
      { actor: 'Austin Butler', role: 'Feyd-Rautha Harkonnen' },
    ],
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
    synopsis:
      'A história do físico americano J. Robert Oppenheimer, seu papel crucial no Projeto Manhattan e o desenvolvimento da bomba atômica que moldou o destino da humanidade.',
    gradient: 'from-[#FFB800]/30 via-[#1A1A24] to-[#0B0B0F]',
    youtubeId: 'uYPbbksJxIg',
    cinematographer: 'Hoyte van Hoytema, ASC, FSF, NSC',
    soundtrack: 'Ludwig Göransson (Gravado com orquestra de cordas e sintetizadores)',
    aspectRatio: '2.20:1 (70mm 5-perf) / 1.43:1 (IMAX 15-perf)',
    trivia: [
      'A Kodak desenvolveu o primeiro filme 65mm preto e branco da história especificamente para esta produção.',
      'O rolo de filme de 70mm IMAX pesava cerca de 272 kg e media mais de 17,7 quilômetros de comprimento.',
      'Nenhum efeito visual de computação gráfica (CGI) foi utilizado na simulação do teste Trinity.',
    ],
    cast: [
      { actor: 'Cillian Murphy', role: 'J. Robert Oppenheimer' },
      { actor: 'Emily Blunt', role: 'Katherine Oppenheimer' },
      { actor: 'Matt Damon', role: 'General Leslie Groves' },
      { actor: 'Robert Downey Jr.', role: 'Lewis Strauss' },
    ],
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
    synopsis:
      'Trinta anos após os eventos do primeiro filme, o blade runner policial K desenterra um segredo há muito tempo oculto que tem o poder de mergulhar a sociedade no caos.',
    gradient: 'from-[#E50914]/35 via-[#1A1A24] to-[#0B0B0F]',
    youtubeId: 'gCcx85zbxz4',
    cinematographer: 'Roger Deakins, ASC, BSC (Vencedor do Oscar)',
    soundtrack: 'Hans Zimmer & Benjamin Wallfisch (Sintetizadores Yamaha CS-80)',
    aspectRatio: '2.39:1 (Panavision) / 1.55:1 (IMAX)',
    trivia: [
      'Roger Deakins utilizou iluminação prática em escala monumental, incluindo anéis de lâmpadas incandescentes para simular néon.',
      'A icônica cena em Las Vegas foi iluminada inteiramente em tom âmbar utilizando gelatina cinematográfica amarela.',
      'A estátua gigante e cenários foram construídos fisicamente em miniaturas detalhadas nos estúdios da Nova Zelândia.',
    ],
    cast: [
      { actor: 'Ryan Gosling', role: 'Oficial K' },
      { actor: 'Harrison Ford', role: 'Rick Deckard' },
      { actor: 'Ana de Armas', role: 'Joi' },
      { actor: 'Sylvia Hoeks', role: 'Luv' },
    ],
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
    synopsis:
      'Com o fim dos recursos da Terra, uma equipe de astronautas e cientistas atravessa um buraco de minhoca perto de Saturno na busca desesperada por um novo lar para a humanidade.',
    gradient: 'from-[#FF6B00]/30 via-[#1A1A24] to-[#0B0B0F]',
    youtubeId: 'zSWdZVtXT7E',
    cinematographer: 'Hoyte van Hoytema, ASC',
    soundtrack: 'Hans Zimmer (Gravado no órgão de tubos da igreja Temple Church em Londres)',
    aspectRatio: '2.39:1 / 1.43:1 (IMAX 70mm)',
    trivia: [
      'A representação visual do buraco negro Gargantua foi modelada através de equações reais do físico ganhador do Nobel Kip Thorne.',
      'Os robôs TARS e CASE eram marionetes mecânicas reais manobradas por um dublê no set.',
      'Nolan plantou 500 acres de milho verdadeiro para a fazenda de Cooper e depois vendeu a safra com lucro.',
    ],
    cast: [
      { actor: 'Matthew McConaughey', role: 'Cooper' },
      { actor: 'Anne Hathaway', role: 'Brand' },
      { actor: 'Jessica Chastain', role: 'Murph' },
      { actor: 'Michael Caine', role: 'Professor Brand' },
    ],
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
    synopsis:
      'Nas favelas do Rio de Janeiro dos anos 1970 aos anos 1980, dois rapazes seguem caminhos opostos: Buscapé encontra sua salvação na fotografia enquanto Zé Pequeno domina o crime.',
    gradient: 'from-[#FFB800]/40 via-[#1A1A24] to-[#0B0B0F]',
    youtubeId: 'dcUOO4Itgmw',
    cinematographer: 'César Charlone, ABC',
    soundtrack: 'Antonio Pinto & Ed Côrtes',
    aspectRatio: '1.85:1 (Filme 35mm Super 16 com granulação acentuada)',
    trivia: [
      'A maior parte do elenco foi formada por jovens moradores de comunidades do Rio de Janeiro que nunca haviam atuado antes.',
      'Indicado a 4 Oscars em 2004: Melhor Direção, Roteiro Adaptado, Fotografia e Montagem.',
      'O estilo de montagem frenética e transições de cor marcaram uma revolução no cinema latino-americano mundial.',
    ],
    cast: [
      { actor: 'Alexandre Rodrigues', role: 'Buscapé' },
      { actor: 'Leandro Firmino', role: 'Zé Pequeno' },
      { actor: 'Phellipe Haagensen', role: 'Bené' },
      { actor: 'Seu Jorge', role: 'Mané Galinha' },
    ],
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
    synopsis:
      'As vidas de dois assassinos profissionais, a esposa viciada de um chefão do crime e um boxeador em fuga colidem em três histórias cruzadas com diálogos icônicos.',
    gradient: 'from-[#E50914]/30 via-[#1A1A24] to-[#0B0B0F]',
    youtubeId: 's7EdQ4FqbhY',
    cinematographer: 'Andrzej Sekuła',
    soundtrack: 'Trilha sonora clássica selecionada por Tarantino (Surf Rock, Soul e Funk)',
    aspectRatio: '2.35:1 (Filme 35mm Kodak 50D com baixo grão)',
    trivia: [
      'Vencedor da Palma de Ouro no Festival de Cannes de 1994 e do Oscar de Melhor Roteiro Original.',
      'O conteúdo da misteriosa maleta de Marcellus Wallace nunca é revelado, emanando apenas um brilho dourado.',
      'A famosa cena de dança no Jack Rabbit Slims foi inspirada no filme "Bande à Part" de Jean-Luc Godard.',
    ],
    cast: [
      { actor: 'John Travolta', role: 'Vincent Vega' },
      { actor: 'Samuel L. Jackson', role: 'Jules Winnfield' },
      { actor: 'Uma Thurman', role: 'Mia Wallace' },
      { actor: 'Bruce Willis', role: 'Butch Coolidge' },
    ],
  },
];

export default function CinemaLoungePreview({
  user,
  onLogout,
}: CinemaLoungePreviewProps) {
  const [selectedMovie, setSelectedMovie] = useState<DetailedMovieItem>(DETAILED_MOVIES[0]);
  const [showTrailerModal, setShowTrailerModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedGenreFilter, setSelectedGenreFilter] = useState<string>('todos');
  const [savedToWatchlist, setSavedToWatchlist] = useState<Record<string, boolean>>({});
  const [userSeat, setUserSeat] = useState<string>('FIL E • POL 12');

  // Full cinephile profile state initialized with current user
  const [profile, setProfile] = useState<CinephileProfile>({
    email: user.email,
    name: user.name,
    tier: user.tier,
    ticketCode: user.ticketCode,
    handle: `@${user.email.split('@')[0]}`,
    bio: 'Cinéfilo apaixonado pela experiência da tela grande, diretores autorais e projeção 35mm.',
    favoriteGenres: ['Ficção Científica', 'Neo-Noir', 'Épico'],
    favoriteDirector: 'Christopher Nolan',
    topMovies: ['Blade Runner 2049', 'Interestelar', 'Duna: Parte 2'],
    theaterCity: 'Sala IMAX - São Paulo',
    sessionsWatched: 14,
    hoursWatched: 38,
    reviewsWritten: 9,
    badges: ['Cineasta 35mm', 'Madrugador IMAX', 'Cinéfilo Fundador'],
    membershipDate: '09 Nov 2026',
  });

  // Load existing profile from Supabase/cache on mount
  useEffect(() => {
    async function fetchProfile() {
      const existing = await loadCinephileProfile(user.email);
      if (existing) {
        setProfile((prev) => ({
          ...prev,
          ...existing,
        }));
      }
    }
    fetchProfile();
  }, [user.email]);

  const toggleWatchlist = (id: string) => {
    setSavedToWatchlist((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleProfileUpdated = (updated: CinephileProfile) => {
    setProfile(updated);
  };

  const handleSeatChanged = (newSeat: string) => {
    setUserSeat(newSeat);
  };

  const handleOpenTrailer = (movie: DetailedMovieItem) => {
    setSelectedMovie(movie);
    setShowTrailerModal(true);
  };

  // Filtered movies
  const filteredMovies = DETAILED_MOVIES.filter((m) => {
    if (selectedGenreFilter === 'todos') return true;
    if (selectedGenreFilter === 'imax') return m.format.includes('IMAX');
    if (selectedGenreFilter === 'estreia') return m.isPremiere;
    if (selectedGenreFilter === '35mm') return m.format.includes('35MM');
    if (selectedGenreFilter === '4k') return m.format.includes('4K');
    return true;
  });

  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-8 animate-in fade-in duration-500">
      {/* Top Banner Navigation */}
      <header className="bg-[#121218]/90 border border-[#FF6B00]/30 rounded-2xl p-4 sm:p-6 mb-6 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-4 cinema-card-glow">
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
            <h1 className="font-heading font-black text-xl text-[#F4F4F6] flex items-center gap-2">
              Bem-vindo, <span className="text-[#FF6B00]">{profile.name}</span>
              <span className="text-xs font-mono text-[#9E9EA8] font-normal">
                ({profile.handle || `@${user.email.split('@')[0]}`})
              </span>
            </h1>
            <p className="text-xs text-[#9E9EA8]">
              Passaporte <span className="text-[#FFB800] font-semibold">{profile.tier}</span> • Poltrona {userSeat}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Profile CTA Button */}
          <button
            onClick={() => setShowProfileModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FF6B00] via-[#FF7A1A] to-[#FF6B00] hover:from-[#FF7A1A] text-[#0B0B0F] font-heading font-black text-xs uppercase tracking-wider cinema-glow-primary transition cursor-pointer shadow-md"
          >
            <User className="w-4 h-4" />
            <span>Meu Perfil</span>
          </button>

          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1A1A24] hover:bg-[#252533] border border-[#E50914]/40 hover:border-[#E50914] text-xs font-semibold text-[#F4F4F6] hover:text-[#E50914] transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sair</span>
          </button>
        </div>
      </header>

      {/* Cinephile Profile Spotlight Ribbon */}
      <div className="bg-[#1A1A24]/90 border border-[#FFB800]/30 rounded-2xl p-4 sm:p-5 mb-8 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0B0B0F] border border-[#FFB800]/40 flex items-center justify-center text-[#FFB800] shrink-0">
            <Clapperboard className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-heading font-black text-[#F4F4F6]">
                Identidade Cinéfila Ativa:
              </span>
              <span className="text-xs font-mono text-[#FFB800] font-bold">
                {profile.favoriteDirector ? `Fã de ${profile.favoriteDirector}` : 'Sem diretor definido'}
              </span>
            </div>
            <p className="text-xs text-[#9E9EA8] line-clamp-1">
              Top Filmes: {profile.topMovies?.join(' • ') || 'Adicione seus 3 filmes favoritos no perfil'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-3 text-center font-mono">
            <div>
              <span className="text-[10px] text-[#9E9EA8] block uppercase">Sessões</span>
              <span className="font-bold text-xs text-[#FF6B00]">{profile.sessionsWatched ?? 14}</span>
            </div>
            <div className="h-6 w-px bg-[#5C5C6B]/40" />
            <div>
              <span className="text-[10px] text-[#9E9EA8] block uppercase">Horas</span>
              <span className="font-bold text-xs text-[#FFB800]">{profile.hoursWatched ?? 38}h</span>
            </div>
            <div className="h-6 w-px bg-[#5C5C6B]/40" />
            <div>
              <span className="text-[10px] text-[#9E9EA8] block uppercase">Críticas</span>
              <span className="font-bold text-xs text-[#E50914]">{profile.reviewsWritten ?? 9}</span>
            </div>
          </div>

          <button
            onClick={() => setShowProfileModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0B0B0F] hover:bg-[#121218] border border-[#FF6B00]/40 text-[#FF6B00] hover:text-[#FFB800] text-xs font-mono font-bold transition"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Editar Perfil</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Ticket Stub & Featured Spotlight */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {/* Left Column: Interactive Digital Ticket */}
        <div className="lg:col-span-1 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF6B00]">
              SEU BILHETE DE ENTRADA
            </span>
            <span className="text-[10px] bg-[#E50914] text-white font-bold px-2 py-0.5 rounded uppercase">
              VALIDADO
            </span>
          </div>

          <CinemaTicketCard
            userEmail={profile.name || user.email}
            ticketCode={profile.ticketCode || user.ticketCode}
            theaterRoom="SALA 01 - PROJEÇÃO 35MM"
            seat={userSeat}
            sessionTime="HOJE • 21:30"
            format="IMAX 70MM / DOLBY ATMOS"
            isAdmitted={true}
          />

          <button
            onClick={() => handleOpenTrailer(selectedMovie)}
            className="w-full py-2.5 rounded-xl bg-[#1A1A24] hover:bg-[#252533] border border-[#FFB800]/40 text-xs font-mono font-bold text-[#FFB800] flex items-center justify-center gap-2 transition"
          >
            <Armchair className="w-4 h-4" />
            <span>Trocar Minha Poltrona ({userSeat})</span>
          </button>
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
                <div>
                  <span className="block text-[10px] font-mono uppercase">CÂMERAS</span>
                  <span className="font-mono text-[#FF6B00]">{selectedMovie.aspectRatio.split('/')[0]}</span>
                </div>
              </div>
            </div>

            {/* Actions CTA */}
            <div className="relative z-10 pt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => handleOpenTrailer(selectedMovie)}
                className="px-6 py-3 rounded-xl bg-[#FF6B00] hover:bg-[#FF7A1A] text-[#0B0B0F] font-heading font-black text-xs uppercase tracking-wider flex items-center gap-2 cinema-glow-primary transition cursor-pointer shadow-lg"
              >
                <Play className="w-4 h-4 fill-[#0B0B0F]" />
                <span>Assistir Trailer Oficial</span>
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
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B00]" />
            <h3 className="font-heading font-black text-lg tracking-wider text-[#F4F4F6] uppercase">
              EM CARTAZ HOJE NA OBSIDIAN
            </h3>
          </div>

          {/* Catalog Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1">
            {[
              { id: 'todos', label: 'Todos' },
              { id: 'estreia', label: '★ Estreias' },
              { id: 'imax', label: 'IMAX 70mm' },
              { id: '4k', label: '4K Remaster' },
              { id: '35mm', label: 'Película 35mm' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedGenreFilter(f.id)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition whitespace-nowrap border ${
                  selectedGenreFilter === f.id
                    ? 'bg-[#FF6B00] text-[#0B0B0F] border-[#FF6B00]'
                    : 'bg-[#121218] text-[#9E9EA8] border-[#5C5C6B]/30 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {filteredMovies.map((movie) => {
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
                    {/* Hover play button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenTrailer(movie);
                      }}
                      className="w-10 h-10 rounded-full bg-[#FF6B00]/20 group-hover:bg-[#FF6B00] border border-[#FF6B00] flex items-center justify-center transition shadow-lg cinema-glow-primary mb-2"
                      title="Assistir Trailer"
                    >
                      <Play className="w-4 h-4 text-[#FF6B00] group-hover:text-[#0B0B0F] fill-current ml-0.5 transition" />
                    </button>
                    <span className="text-[10px] font-mono text-[#9E9EA8]">
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
                <div className="flex items-center justify-between text-[10px] text-[#9E9EA8] mt-0.5">
                  <span className="truncate">{movie.director}</span>
                  <span className="text-[#FF6B00] font-mono font-bold shrink-0">TRAILER ▶</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Real Movie Trailer Player + Behind the Scenes + Community Reviews + Seat Picker Modal */}
      <CinemaTrailerPlayerModal
        isOpen={showTrailerModal}
        onClose={() => setShowTrailerModal(false)}
        movie={selectedMovie}
        userProfile={profile}
        currentSeat={userSeat}
        onSeatChanged={handleSeatChanged}
      />

      {/* Profile Editor & Details Modal */}
      <CinephileProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        profile={profile}
        onProfileUpdated={handleProfileUpdated}
      />
    </div>
  );
}
