import { useEffect, useRef, useState } from 'react';
import clickUrl from '../assets/sounds/mouse-click.wav?url';

export function useUISound() {
  const [enabled, setEnabled] = useState(() => {
    try { return localStorage.getItem('isaos-sound') !== 'false'; } catch { return true; }
  });
  const enabledRef = useRef(enabled);
  const audio = useRef<HTMLAudioElement | null>(null);
  const last = useRef(-Infinity);

  function getAudio() {
    if (!audio.current) {
      const element = new Audio(clickUrl);
      element.preload = 'auto';
      element.volume = .45;
      audio.current = element;
      element.load();
    }
    return audio.current;
  }

  useEffect(() => {
    const element = getAudio();
    return () => {
      element.pause();
      element.removeAttribute('src');
      element.load();
      if (audio.current === element) audio.current = null;
    };
  }, []);

  // Retain the reusable hook's API; every action now uses the same physical click.
  function play(_kind: 'open' | 'click' | 'close' = 'click', force = false) {
    if ((!enabledRef.current && !force) || performance.now() - last.current < 25) return;
    last.current = performance.now();
    try {
      const element = getAudio();
      element.pause();
      // Seeking before metadata exists can throw in some browsers.
      if (element.readyState > 0) element.currentTime = 0;
      // Call play directly inside the gesture, without fetch/decode/resume awaits.
      void element.play().catch(error => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        console.warn('[Isabela Targino] Não foi possível reproduzir o clique do mouse:', error);
      });
    } catch (error) { console.warn('[Isabela Targino] Áudio indisponível:', error); }
  }

  function toggle() {
    const next = !enabledRef.current;
    enabledRef.current = next;
    setEnabled(next);
    try { localStorage.setItem('isaos-sound', String(next)); } catch { /* Storage may be unavailable. */ }
    if (next) play('click', true);
    else audio.current?.pause();
  }

  return { enabled, toggle, play };
}

