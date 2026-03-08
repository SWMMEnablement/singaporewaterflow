import { useCallback, useRef, useEffect, useState } from 'react';

export const useRainAmbience = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{
    rain: AudioBufferSourceNode | null;
    rainGain: GainNode | null;
    patter: AudioBufferSourceNode | null;
    patterGain: GainNode | null;
  }>({ rain: null, rainGain: null, patter: null, patterGain: null });
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const getCtx = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const createNoiseBuffer = useCallback((ctx: AudioContext, type: 'pink' | 'white') => {
    const size = 2 * ctx.sampleRate;
    const buffer = ctx.createBuffer(1, size, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    if (type === 'pink') {
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < size; i++) {
        const w = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + w * 0.0555179;
        b1 = 0.99332 * b1 + w * 0.0750759;
        b2 = 0.96900 * b2 + w * 0.1538520;
        b3 = 0.86650 * b3 + w * 0.3104856;
        b4 = 0.55000 * b4 + w * 0.5329522;
        b5 = -0.7616 * b5 - w * 0.0168980;
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11;
        b6 = w * 0.115926;
      }
    } else {
      for (let i = 0; i < size; i++) {
        data[i] = Math.random() * 2 - 1;
      }
    }
    return buffer;
  }, []);

  const startRain = useCallback(() => {
    const ctx = getCtx();

    // Stop previous
    try { nodesRef.current.rain?.stop(); } catch {}
    try { nodesRef.current.patter?.stop(); } catch {}
    if (intervalRef.current) clearInterval(intervalRef.current);

    // === Steady rain layer (pink noise, low-pass filtered) ===
    const rainNode = ctx.createBufferSource();
    rainNode.buffer = createNoiseBuffer(ctx, 'pink');
    rainNode.loop = true;

    const rainFilter = ctx.createBiquadFilter();
    rainFilter.type = 'lowpass';
    rainFilter.frequency.value = 800;

    const rainGain = ctx.createGain();
    rainGain.gain.setValueAtTime(0, ctx.currentTime);
    rainGain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 1.5);

    rainNode.connect(rainFilter);
    rainFilter.connect(rainGain);
    rainGain.connect(ctx.destination);
    rainNode.start();

    // === Patter layer (white noise, band-pass for sharper drops) ===
    const patterNode = ctx.createBufferSource();
    patterNode.buffer = createNoiseBuffer(ctx, 'white');
    patterNode.loop = true;

    const patterBP = ctx.createBiquadFilter();
    patterBP.type = 'bandpass';
    patterBP.frequency.value = 3000;
    patterBP.Q.value = 1.5;

    const patterGain = ctx.createGain();
    patterGain.gain.setValueAtTime(0, ctx.currentTime);
    patterGain.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 2);

    patterNode.connect(patterBP);
    patterBP.connect(patterGain);
    patterGain.connect(ctx.destination);
    patterNode.start();

    // === Occasional drip accents ===
    intervalRef.current = setInterval(() => {
      if (Math.random() < 0.4) {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.connect(g);
        g.connect(ctx.destination);
        osc.type = 'sine';
        const freq = 600 + Math.random() * 600;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.4, ctx.currentTime + 0.08);
        g.gain.setValueAtTime(0.02 + Math.random() * 0.02, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.08);
      }
    }, 300);

    nodesRef.current = { rain: rainNode, rainGain, patter: patterNode, patterGain };
    setIsPlaying(true);
  }, [getCtx, createNoiseBuffer]);

  const stopRain = useCallback(() => {
    const ctx = audioContextRef.current;
    if (!ctx) return;

    const t = ctx.currentTime;
    nodesRef.current.rainGain?.gain.linearRampToValueAtTime(0, t + 1);
    nodesRef.current.patterGain?.gain.linearRampToValueAtTime(0, t + 1);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setTimeout(() => {
      try { nodesRef.current.rain?.stop(); } catch {}
      try { nodesRef.current.patter?.stop(); } catch {}
      nodesRef.current = { rain: null, rainGain: null, patter: null, patterGain: null };
    }, 1100);

    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    isPlaying ? stopRain() : startRain();
  }, [isPlaying, startRain, stopRain]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      try { nodesRef.current.rain?.stop(); } catch {}
      try { nodesRef.current.patter?.stop(); } catch {}
    };
  }, []);

  return { isPlaying, toggle, startRain, stopRain };
};
