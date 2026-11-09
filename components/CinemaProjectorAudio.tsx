'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Volume2, VolumeX, Disc3, Radio } from 'lucide-react';

export default function CinemaProjectorAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.25);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Stop synthesizer
  const stopAudio = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  // Start synthesizing 35mm mechanical projector whir + sprocket clicks
  const startAudio = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume * 0.4, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Brown noise motor hum generator
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = output[i];
        output[i] *= 1.8;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Low pass filter for warm motor hum
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, ctx.currentTime);
      filter.Q.setValueAtTime(2, ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(masterGain);
      whiteNoise.start(0);

      // Rhythmic sprocket teeth click: 24 fps (24 clicks per second or cadence pulses)
      // We simulate subtle clicks every ~80ms (around 12-24 clicks per sec)
      const playClick = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return;
        const now = audioCtxRef.current.currentTime;
        const osc = audioCtxRef.current.createOscillator();
        const clickGain = audioCtxRef.current.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(700 + Math.random() * 120, now);
        osc.frequency.exponentialRampToValueAtTime(120, now + 0.035);

        clickGain.gain.setValueAtTime(0.08 * volume, now);
        clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

        osc.connect(clickGain);
        clickGain.connect(audioCtxRef.current.destination);

        osc.start(now);
        osc.stop(now + 0.04);
      };

      intervalRef.current = setInterval(playClick, 82);
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }, [volume]);

  const toggleSound = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  };

  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(
        volume * 0.4,
        audioCtxRef.current.currentTime
      );
    }
  }, [volume]);

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, [stopAudio]);

  return (
    <div className="flex items-center gap-2 bg-[#121218]/90 border border-[#FF6B00]/30 hover:border-[#FF6B00]/60 rounded-full px-3 py-1.5 backdrop-blur-md transition-all shadow-md">
      <button
        onClick={toggleSound}
        type="button"
        title={isPlaying ? 'Desativar som do projetor' : 'Ativar som ambiente de projetor 35mm'}
        className="flex items-center gap-2 text-xs font-semibold tracking-wide text-[#F4F4F6] hover:text-[#FF6B00] transition-colors"
      >
        <span className="relative flex h-2 w-2">
          {isPlaying && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6B00] opacity-75" />
          )}
          <span
            className={`relative inline-flex rounded-full h-2 w-2 ${
              isPlaying ? 'bg-[#FF6B00]' : 'bg-[#5C5C6B]'
            }`}
          />
        </span>

        {isPlaying ? (
          <Volume2 className="w-3.5 h-3.5 text-[#FF6B00] animate-pulse" />
        ) : (
          <VolumeX className="w-3.5 h-3.5 text-[#9E9EA8]" />
        )}

        <span className="hidden sm:inline text-[11px] font-mono">
          {isPlaying ? 'PROJETOR 35MM: ATIVO' : 'SOM PROJETOR: MUDO'}
        </span>
      </button>

      {isPlaying && (
        <div className="flex items-center gap-1.5 pl-1 border-l border-[#5C5C6B]/40">
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-14 h-1 bg-[#1A1A24] rounded-lg appearance-none cursor-pointer accent-[#FF6B00]"
            title={`Volume: ${Math.round(volume * 100)}%`}
          />
          <Disc3 className="w-3 h-3 text-[#FFB800] animate-spin" />
        </div>
      )}
    </div>
  );
}
