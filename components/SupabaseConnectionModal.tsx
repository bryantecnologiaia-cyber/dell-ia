'use client';

import React, { useState, useEffect } from 'react';
import {
  Database,
  KeyRound,
  Check,
  Copy,
  ExternalLink,
  ShieldAlert,
  Sparkles,
  X,
  Code2,
} from 'lucide-react';
import { isSupabaseConfigured, getActiveSupabaseConfig } from '@/lib/supabaseClient';

interface SupabaseConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfigUpdated?: () => void;
}

export default function SupabaseConnectionModal({
  isOpen,
  onClose,
  onConfigUpdated,
}: SupabaseConnectionModalProps) {
  const [url, setUrl] = useState(() => {
    if (typeof window !== 'undefined') {
      return getActiveSupabaseConfig().url || '';
    }
    return '';
  });
  const [anonKey, setAnonKey] = useState(() => {
    if (typeof window !== 'undefined') {
      return getActiveSupabaseConfig().anonKey || '';
    }
    return '';
  });
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'vars' | 'sql' | 'test'>('vars');

  if (!isOpen) return null;

  const isConnected = isSupabaseConfigured();

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(label);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSaveInBrowser = () => {
    if (url.trim() && anonKey.trim()) {
      localStorage.setItem('supabase_custom_url', url.trim());
      localStorage.setItem('supabase_custom_key', anonKey.trim());
      setIsSaved(true);
      setTimeout(() => {
        setIsSaved(false);
        if (onConfigUpdated) onConfigUpdated();
        window.location.reload();
      }, 700);
    }
  };

  const handleClearBrowserConfig = () => {
    localStorage.removeItem('supabase_custom_url');
    localStorage.removeItem('supabase_custom_key');
    setUrl('');
    setAnonKey('');
    if (onConfigUpdated) onConfigUpdated();
    window.location.reload();
  };

  const sqlSchema = `-- TABELA DE PERFIS DOS CINÉFILOS (Execute no SQL Editor do Supabase)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text not null,
  name text,
  handle text,
  bio text,
  tier text default 'VIP Gold',
  ticket_code text,
  favorite_genres text[],
  favorite_director text,
  top_movies text[],
  avatar_icon text default 'clapperboard',
  theater_city text,
  sessions_watched int default 14,
  hours_watched int default 38,
  reviews_written int default 9,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Ativar Row Level Security (RLS)
alter table public.profiles enable row level security;

-- Políticas de segurança
create policy "Ver próprio perfil" on public.profiles
  for select using (auth.uid() = id);

create policy "Criar próprio perfil" on public.profiles
  for insert with check (auth.uid() = id);

create policy "Atualizar próprio perfil" on public.profiles
  for update using (auth.uid() = id);`;

  return (
    <div className="fixed inset-0 z-50 bg-[#0B0B0F]/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#121218] border border-[#FF6B00]/40 rounded-2xl max-w-xl w-full p-6 cinema-glow-primary shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#9E9EA8] hover:text-[#E50914] transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#0B0B0F] border border-[#FF6B00]/50 flex items-center justify-center text-[#FF6B00]">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-[#FFB800] animate-ping'
                }`}
              />
              <span className="text-[10px] font-mono tracking-widest text-[#FFB800] uppercase font-bold">
                {isConnected ? 'SUPABASE CONECTADO' : 'CONEXÃO PENDENTE COM SUPABASE'}
              </span>
            </div>
            <h3 className="font-heading font-black text-lg text-[#F4F4F6]">
              Configuração & Variáveis Supabase
            </h3>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-[#0B0B0F] p-1 rounded-xl border border-[#5C5C6B]/30 mb-5">
          <button
            type="button"
            onClick={() => setActiveTab('vars')}
            className={`flex-1 py-1.5 text-xs font-heading font-bold rounded-lg transition ${
              activeTab === 'vars'
                ? 'bg-[#FF6B00] text-[#0B0B0F]'
                : 'text-[#9E9EA8] hover:text-[#F4F4F6]'
            }`}
          >
            1. Variáveis de Conexão
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('test')}
            className={`flex-1 py-1.5 text-xs font-heading font-bold rounded-lg transition ${
              activeTab === 'test'
                ? 'bg-[#FFB800] text-[#0B0B0F]'
                : 'text-[#9E9EA8] hover:text-[#F4F4F6]'
            }`}
          >
            2. Conectar Agora
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('sql')}
            className={`flex-1 py-1.5 text-xs font-heading font-bold rounded-lg transition ${
              activeTab === 'sql'
                ? 'bg-[#E50914] text-white'
                : 'text-[#9E9EA8] hover:text-[#F4F4F6]'
            }`}
          >
            3. Script SQL (Tabela)
          </button>
        </div>

        {/* Tab 1: Variables (.env) */}
        {activeTab === 'vars' && (
          <div className="space-y-4 text-xs text-[#9E9EA8]">
            <p>
              Para persistir os usuários no seu banco Supabase, adicione as variáveis abaixo no seu arquivo{' '}
              <code className="text-[#FFB800] bg-[#0B0B0F] px-1.5 py-0.5 rounded">.env.local</code> ou no painel de segredos:
            </p>

            <div className="space-y-3">
              {/* Var 1: URL */}
              <div className="bg-[#0B0B0F] p-3 rounded-xl border border-[#5C5C6B]/30">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono font-bold text-[#FF6B00]">NEXT_PUBLIC_SUPABASE_URL</span>
                  <button
                    onClick={() => handleCopy('NEXT_PUBLIC_SUPABASE_URL="https://seu-projeto.supabase.co"', 'url')}
                    className="flex items-center gap-1 text-[11px] text-[#FFB800] hover:text-[#FF6B00]"
                  >
                    {copiedKey === 'url' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'url' ? 'Copiado!' : 'Copiar'}</span>
                  </button>
                </div>
                <code className="block text-[11px] text-[#F4F4F6] font-mono break-all">
                  https://seu-projeto.supabase.co
                </code>
              </div>

              {/* Var 2: Anon Key */}
              <div className="bg-[#0B0B0F] p-3 rounded-xl border border-[#5C5C6B]/30">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono font-bold text-[#FF6B00]">NEXT_PUBLIC_SUPABASE_ANON_KEY</span>
                  <button
                    onClick={() => handleCopy('NEXT_PUBLIC_SUPABASE_ANON_KEY="sua-chave-anonima"', 'key')}
                    className="flex items-center gap-1 text-[11px] text-[#FFB800] hover:text-[#FF6B00]"
                  >
                    {copiedKey === 'key' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'key' ? 'Copiado!' : 'Copiar'}</span>
                  </button>
                </div>
                <code className="block text-[11px] text-[#F4F4F6] font-mono break-all">
                  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
                </code>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#1A1A24] border border-[#FFB800]/25 flex items-center justify-between">
              <span className="text-[11px]">Onde encontrar no painel do Supabase?</span>
              <a
                href="https://supabase.com/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[11px] font-bold text-[#FFB800] hover:underline"
              >
                <span>Project Settings &gt; API</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}

        {/* Tab 2: Test / Enter Credentials in Browser */}
        {activeTab === 'test' && (
          <div className="space-y-4">
            <p className="text-xs text-[#9E9EA8]">
              Você pode colar suas chaves do Supabase diretamente aqui para testar o cadastro e login funcional em tempo real agora mesmo:
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#F4F4F6] mb-1">
                  Project URL do Supabase
                </label>
                <input
                  type="text"
                  placeholder="https://xyzproject.supabase.co"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full bg-[#0B0B0F] border border-[#5C5C6B]/40 focus:border-[#FF6B00] rounded-xl px-3.5 py-2 text-xs text-[#F4F4F6] font-mono outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#F4F4F6] mb-1">
                  Anon / Public Key do Supabase
                </label>
                <input
                  type="text"
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6..."
                  value={anonKey}
                  onChange={(e) => setAnonKey(e.target.value)}
                  className="w-full bg-[#0B0B0F] border border-[#5C5C6B]/40 focus:border-[#FF6B00] rounded-xl px-3.5 py-2 text-xs text-[#F4F4F6] font-mono outline-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleSaveInBrowser}
                  className="flex-1 py-2.5 rounded-xl bg-[#FF6B00] hover:bg-[#FF7A1A] text-[#0B0B0F] font-heading font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition cinema-glow-primary"
                >
                  {isSaved ? <Check className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                  <span>{isSaved ? 'Conectado!' : 'Salvar e Conectar Supabase'}</span>
                </button>

                {url && (
                  <button
                    type="button"
                    onClick={handleClearBrowserConfig}
                    className="px-3 py-2.5 rounded-xl bg-[#1A1A24] border border-[#5C5C6B]/40 text-xs text-[#9E9EA8] hover:text-[#E50914] transition"
                  >
                    Limpar
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: SQL Schema */}
        {activeTab === 'sql' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-[#9E9EA8]">
              <span>Script para criar a tabela de cinéfilos no Supabase:</span>
              <button
                onClick={() => handleCopy(sqlSchema, 'sql')}
                className="flex items-center gap-1 text-[#FFB800] hover:text-[#FF6B00] font-mono"
              >
                {copiedKey === 'sql' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'sql' ? 'Copiado!' : 'Copiar SQL'}</span>
              </button>
            </div>
            <pre className="bg-[#0B0B0F] p-3 rounded-xl border border-[#5C5C6B]/30 text-[11px] font-mono text-[#F4F4F6] overflow-x-auto max-h-56 leading-relaxed">
              {sqlSchema}
            </pre>
            <p className="text-[11px] text-[#9E9EA8]">
              (Dica: Copie o SQL acima e cole no menu <strong>SQL Editor</strong> do seu painel do Supabase para criar as políticas RLS).
            </p>
          </div>
        )}

        {/* Modal Footer */}
        <div className="mt-6 pt-4 border-t border-[#5C5C6B]/20 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#1A1A24] text-xs font-semibold text-[#F4F4F6] hover:bg-[#252533] transition"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
