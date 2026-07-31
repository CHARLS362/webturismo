/**
 * Synthesizes a mystical, ascending Andean chime arpeggio using the browser's Web Audio API.
 * Pure code-based audio synthesis, zero external network requests.
 */
export const playMisticSound = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    
    // Play a series of notes in an ascending pentatonic scale (mistic chime)
    const playNote = (delayMs, frequency, durationSec) => {
      setTimeout(() => {
        if (ctx.state === 'suspended') {
          ctx.resume();
        }
        
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        osc.type = 'sine'; // Soft, flute-like tone
        osc.frequency.setValueAtTime(frequency, ctx.currentTime);
        
        // Soft attack, exponential decay for chime ring out
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + durationSec);
        
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        osc.start();
        osc.stop(ctx.currentTime + durationSec);
      }, delayMs);
    };
    
    // Play Pentatonic scale notes: C5, D5, E5, G5, A5, C6
    playNote(0, 523.25, 1.2);   // C5
    playNote(150, 587.33, 1.2); // D5
    playNote(300, 659.25, 1.2); // E5
    playNote(450, 783.99, 1.5); // G5
    playNote(600, 880.00, 1.5); // A5
    playNote(750, 1046.50, 2.0); // C6
  } catch (e) {
    console.warn('Web Audio API not supported or blocked by user gesture:', e);
  }
};

/**
 * Fires a high-performance, full-screen canvas confetti animation.
 * Runs at 60fps and self-destructs after 4 seconds.
 */
export const triggerConfetti = () => {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '99999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const handleResize = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  };
  window.addEventListener('resize', handleResize);

  const colors = ['#f4ce14', '#c85833', '#cc9c56', '#6a7b51', '#dfdcd4', '#6b8ea2', '#ff007f'];
  const particles = [];

  // Create initial particle pool
  for (let i = 0; i < 120; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height - height, // Start offscreen top
      r: Math.random() * 6 + 4,
      d: Math.random() * height,
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.random() * 10 - 5,
      tiltAngleIncremental: Math.random() * 0.07 + 0.02,
      tiltAngle: 0,
      speedX: Math.random() * 4 - 2,
      speedY: Math.random() * 3 + 4,
    });
  }

  let animationFrameId;
  const startTime = Date.now();

  const draw = () => {
    ctx.clearRect(0, 0, width, height);

    let activeParticles = 0;

    particles.forEach((p) => {
      p.tiltAngle += p.tiltAngleIncremental;
      p.y += p.speedY;
      p.x += p.speedX;
      p.tilt = Math.sin(p.tiltAngle) * 12;

      // Draw ribbon particle
      ctx.beginPath();
      ctx.lineWidth = p.r * 1.5;
      ctx.strokeStyle = p.color;
      ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
      ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
      ctx.stroke();

      // Only count particles still on screen
      if (p.y <= height + 20) {
        activeParticles++;
      }
    });

    // Animate if active particles exist and within time limit (4 seconds)
    if (activeParticles > 0 && Date.now() - startTime < 4000) {
      animationFrameId = requestAnimationFrame(draw);
    } else {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.remove();
    }
  };

  draw();
};
