// Web Audio synthetic tactile "POP" sound effect for The Fidget Game bubbles
let audioCtx: AudioContext | null = null;

export function playPopSound(pitchMultiplier: number = 1.0) {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    const baseFreq = 420 * pitchMultiplier;
    const now = audioCtx.currentTime;

    osc.type = 'sine';
    // Frequency drop for tactile pop "thump"
    osc.frequency.setValueAtTime(baseFreq * 1.4, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.4, now + 0.08);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  } catch (e) {
    // Audio context may fail if user has not interacted
    console.debug('Pop sound skipped:', e);
  }
}

// Text-to-speech voiceover playback helper using Web Speech API
export function speakVoiceover(
  text: string,
  onEnd?: () => void,
  rate: number = 1.05
): SpeechSynthesisUtterance | null {
  if (!('speechSynthesis' in window)) {
    onEnd?.();
    return null;
  }

  window.speechSynthesis.cancel();

  // Strip stage directions like "VO: " or quotes
  const cleanedText = text.replace(/^["'\s]+|["'\s]+$/g, '').replace(/^VO:\s*/i, '');

  const utterance = new SpeechSynthesisUtterance(cleanedText);
  utterance.rate = rate;
  utterance.pitch = 1.08; // slightly energetic, friendly tone

  const voices = window.speechSynthesis.getVoices();
  // Prefer natural English voices (Google US English, Samantha, Karen, etc.)
  const preferredVoice = voices.find(
    (v) =>
      (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Karen') || v.name.includes('Zira')) &&
      v.lang.startsWith('en')
  ) || voices.find((v) => v.lang.startsWith('en'));

  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }

  utterance.onend = () => {
    onEnd?.();
  };

  utterance.onerror = () => {
    onEnd?.();
  };

  window.speechSynthesis.speak(utterance);
  return utterance;
}

export function stopVoiceover() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
