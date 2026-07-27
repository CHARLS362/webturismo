let audioInstance = null;

export const aiVoice = {
  speak: (text, lang = 'es', onStart = null, onEnd = null) => {
    // Stop any active audio
    aiVoice.stop();

    // Clean text from markdown tokens (e.g. *, #, etc.) for smoother pronunciation
    const cleanText = text.replace(/[*#_]/g, '');

    // Try Native SpeechSynthesis first
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      // Cancel previous speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = lang === 'en' ? 'en-US' : 'es-ES';

      // Attempt to load and filter for natural high-quality voices
      const voices = window.speechSynthesis.getVoices();
      let selectedVoice = null;

      if (lang === 'en') {
        selectedVoice = voices.find(v => v.name.toLowerCase().includes('google') && v.lang.startsWith('en')) ||
                        voices.find(v => v.name.toLowerCase().includes('natural') && v.lang.startsWith('en')) ||
                        voices.find(v => v.lang.startsWith('en'));
      } else {
        selectedVoice = voices.find(v => v.name.toLowerCase().includes('google') && v.lang.startsWith('es')) ||
                        voices.find(v => v.name.toLowerCase().includes('natural') && v.lang.startsWith('es')) ||
                        voices.find(v => v.lang.startsWith('es'));
      }

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      utterance.rate = 0.95; // Slightly slower for better clarity
      utterance.pitch = 1.0;

      if (onStart) utterance.onstart = onStart;
      if (onEnd) utterance.onend = onEnd;

      utterance.onerror = (e) => {
        console.warn('Native SpeechSynthesis error, falling back to Google Translate TTS:', e);
        aiVoice.speakGoogleTTS(cleanText, lang, onStart, onEnd);
      };

      window.speechSynthesis.speak(utterance);
    } else {
      // Fallback
      aiVoice.speakGoogleTTS(cleanText, lang, onStart, onEnd);
    }
  },

  speakGoogleTTS: (text, lang = 'es', onStart = null, onEnd = null) => {
    try {
      const tl = lang === 'en' ? 'en' : 'es';
      const encodedText = encodeURIComponent(text);
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${tl}&client=tw-ob&q=${encodedText}`;

      audioInstance = new Audio(url);
      if (onStart) audioInstance.onplay = onStart;
      if (onEnd) audioInstance.onended = onEnd;

      audioInstance.play().catch(e => {
        console.error('Google Translate TTS play rejected:', e);
        if (onEnd) onEnd();
      });
    } catch (err) {
      console.error('Google Translate TTS setup error:', err);
      if (onEnd) onEnd();
    }
  },

  stop: () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (audioInstance) {
      audioInstance.pause();
      audioInstance.currentTime = 0;
      audioInstance = null;
    }
  }
};
