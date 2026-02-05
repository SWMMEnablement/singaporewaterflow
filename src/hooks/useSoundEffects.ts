import { useCallback, useRef, useEffect } from 'react';

export const useSoundEffects = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const waterFlowNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const waterFlowGainRef = useRef<GainNode | null>(null);
  const waterFlowFilterRef = useRef<BiquadFilterNode | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  // Water drop/splash sound
  const playWaterDrop = useCallback(() => {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.15);
    
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.15);
  }, [getAudioContext]);

  // Pipe placement click sound
  const playPipePlace = useCallback(() => {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(150, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.08);
    
    gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.08);
  }, [getAudioContext]);

  // Pipe rotation sound
  const playPipeRotate = useCallback(() => {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(300, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(500, ctx.currentTime + 0.05);
    
    gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.05);
  }, [getAudioContext]);

  // Level complete fanfare
  const playLevelComplete = useCallback(() => {
    const ctx = getAudioContext();
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    
    notes.forEach((freq, i) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(freq, ctx.currentTime);
      
      const startTime = ctx.currentTime + i * 0.12;
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.25, startTime + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + 0.3);
    });
  }, [getAudioContext]);

  // Error/overflow warning sound
  const playOverflow = useCallback(() => {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(200, ctx.currentTime);
    oscillator.frequency.setValueAtTime(150, ctx.currentTime + 0.1);
    oscillator.frequency.setValueAtTime(200, ctx.currentTime + 0.2);
    
    gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.25);
  }, [getAudioContext]);

  // Start simulation sound
  const playStart = useCallback(() => {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(400, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.15);
  }, [getAudioContext]);

  // Hint reveal sound
  const playHint = useCallback(() => {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(600, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.12);
  }, [getAudioContext]);

  // Celebration/correct answer sound - triumphant ascending notes
  const playCelebration = useCallback(() => {
    const ctx = getAudioContext();
    const notes = [392, 523.25, 659.25, 783.99]; // G4, C5, E5, G5 - triumphant arpeggio
    
    notes.forEach((freq, i) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(freq, ctx.currentTime);
      
      const startTime = ctx.currentTime + i * 0.08;
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.2, startTime + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.25);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + 0.25);
    });
  }, [getAudioContext]);

  // Wrong answer - gentle descending tone
  const playWrongAnswer = useCallback(() => {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(400, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(250, ctx.currentTime + 0.3);
    
    gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.3);
  }, [getAudioContext]);

  // Race countdown beep
  const playCountdownBeep = useCallback(() => {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, ctx.currentTime); // A4
    
    gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.1);
  }, [getAudioContext]);

  // Race start horn sound
  const playRaceStart = useCallback(() => {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const oscillator2 = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    oscillator2.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(220, ctx.currentTime);
    oscillator2.type = 'sawtooth';
    oscillator2.frequency.setValueAtTime(330, ctx.currentTime);
    
    gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
    
    oscillator.start(ctx.currentTime);
    oscillator2.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.4);
    oscillator2.stop(ctx.currentTime + 0.4);
  }, [getAudioContext]);

  // Start continuous water flow sound - returns stop function
  const startWaterFlow = useCallback((intensity: number = 0.5) => {
    const ctx = getAudioContext();
    
    // Stop previous sound if any
    if (waterFlowNodeRef.current) {
      try {
        waterFlowNodeRef.current.stop();
      } catch (e) {}
    }
    
    // Create noise buffer for water rushing sound
    const bufferSize = 2 * ctx.sampleRate;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    
    // Generate pink-ish noise for water sound
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }
    
    const noiseNode = ctx.createBufferSource();
    noiseNode.buffer = noiseBuffer;
    noiseNode.loop = true;
    
    const gainNode = ctx.createGain();
    const filterNode = ctx.createBiquadFilter();
    
    filterNode.type = "lowpass";
    filterNode.frequency.setValueAtTime(300 + intensity * 1500, ctx.currentTime);
    
    noiseNode.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(intensity * 0.12, ctx.currentTime + 0.3);
    
    waterFlowNodeRef.current = noiseNode;
    waterFlowGainRef.current = gainNode;
    waterFlowFilterRef.current = filterNode;
    
    noiseNode.start();
    
    return () => {
      if (waterFlowGainRef.current) {
        waterFlowGainRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3);
      }
      setTimeout(() => {
        if (waterFlowNodeRef.current) {
          try {
            waterFlowNodeRef.current.stop();
          } catch (e) {}
          waterFlowNodeRef.current = null;
        }
      }, 350);
    };
  }, [getAudioContext]);

  // Update water flow intensity
  const updateWaterFlowIntensity = useCallback((intensity: number) => {
    const ctx = audioContextRef.current;
    if (!ctx || !waterFlowGainRef.current || !waterFlowFilterRef.current) return;
    
    waterFlowGainRef.current.gain.setTargetAtTime(intensity * 0.12, ctx.currentTime, 0.1);
    waterFlowFilterRef.current.frequency.setTargetAtTime(300 + intensity * 1500, ctx.currentTime, 0.1);
  }, []);

  // Stop water flow sound
  const stopWaterFlow = useCallback(() => {
    const ctx = audioContextRef.current;
    if (!ctx || !waterFlowNodeRef.current) return;
    
    if (waterFlowGainRef.current) {
      waterFlowGainRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3);
    }
    setTimeout(() => {
      if (waterFlowNodeRef.current) {
        try {
          waterFlowNodeRef.current.stop();
        } catch (e) {}
        waterFlowNodeRef.current = null;
      }
    }, 350);
  }, []);

  // Victory fanfare - for race winner
  const playVictoryFanfare = useCallback(() => {
    const ctx = getAudioContext();
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
    
    notes.forEach((freq, i) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(freq, ctx.currentTime);
      
      const startTime = ctx.currentTime + i * 0.1;
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.25, startTime + 0.02);
      gainNode.gain.setValueAtTime(0.25, startTime + 0.15);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.4);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + 0.4);
    });
  }, [getAudioContext]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (waterFlowNodeRef.current) {
        try {
          waterFlowNodeRef.current.stop();
        } catch (e) {}
      }
    };
  }, []);

  return {
    playWaterDrop,
    playPipePlace,
    playPipeRotate,
    playLevelComplete,
    playOverflow,
    playStart,
    playHint,
    playCelebration,
    playWrongAnswer,
    playCountdownBeep,
    playRaceStart,
    startWaterFlow,
    updateWaterFlowIntensity,
    stopWaterFlow,
    playVictoryFanfare,
  };
};
