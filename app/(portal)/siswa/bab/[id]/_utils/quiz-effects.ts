import confetti from 'canvas-confetti';

/**
 * Memicu efek kembang api (fireworks) megah ketika nilai siswa sempurna 100.
 */
export function triggerPerfectScoreFireworks() {
  const duration = 3.5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 99999 };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval: any = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    // Kembang api sisi kiri
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: ['#ffd700', '#ff007f', '#00e5ff', '#ff3d00', '#76ff03'],
    });

    // Kembang api sisi kanan
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: ['#ffd700', '#ff007f', '#00e5ff', '#ff3d00', '#76ff03'],
    });
  }, 250);
}

/**
 * Memicu efek selebrasi bintang emas & konfeti sejuk untuk nilai 80 - 99.
 */
export function triggerExcellentCelebration() {
  confetti({
    particleCount: 120,
    spread: 100,
    origin: { y: 0.6 },
    colors: ['#38bdf8', '#34d399', '#f59e0b', '#818cf8'],
    zIndex: 99999,
  });

  setTimeout(() => {
    confetti({
      particleCount: 60,
      angle: 60,
      spread: 60,
      origin: { x: 0 },
      colors: ['#10b981', '#6366f1', '#fbbf24'],
      zIndex: 99999,
    });
    confetti({
      particleCount: 60,
      angle: 120,
      spread: 60,
      origin: { x: 1 },
      colors: ['#10b981', '#6366f1', '#fbbf24'],
      zIndex: 99999,
    });
  }, 300);
}

/**
 * Memicu efek tepuk tangan & taburan lembut untuk nilai lulus 60 - 79.
 */
export function triggerGoodJobCelebration() {
  confetti({
    particleCount: 50,
    spread: 60,
    origin: { y: 0.7 },
    colors: ['#10b981', '#6ee7b7', '#93c5fd'],
    zIndex: 99999,
  });
}
