import { useState } from 'react';
export type AppId = 'about' | 'projects' | 'experience' | 'skills' | 'terminal' | 'contact';
export type WindowState = { id: AppId; minimized: boolean; maximized: boolean; z: number; x: number; y: number };
export const clampPosition = (x: number, y: number) => ({ x: Math.max(8, Math.min(x, Math.max(8, window.innerWidth - Math.min(740, window.innerWidth - 32) - 16))), y: Math.max(50, Math.min(y, Math.max(50, window.innerHeight - 160))) });
export function useWindowManager() {
  const [windows, setWindows] = useState<WindowState[]>([{ id: 'about', minimized: false, maximized: false, z: 1, x: Math.max(130, (window.innerWidth - 740) / 2), y: Math.max(75, (window.innerHeight - 550) / 2) }]);
  const focus = (id: AppId) => setWindows(ws => ws.map(w => w.id === id ? { ...w, minimized: false, z: Math.max(0, ...ws.map(v => v.z)) + 1 } : w));
  const open = (id: AppId) => setWindows(ws => { const z = Math.max(0, ...ws.map(w => w.z)) + 1; return ws.some(w => w.id === id) ? ws.map(w => w.id === id ? { ...w, minimized: false, z } : w) : [...ws, { id, minimized: false, maximized: false, z, ...clampPosition((window.innerWidth - 740) / 2 + ws.length * 22, 90 + ws.length * 24) }]; });
  const close = (id: AppId) => setWindows(ws => ws.filter(w => w.id !== id));
  const minimize = (id: AppId) => setWindows(ws => ws.map(w => w.id === id ? { ...w, minimized: true } : w));
  const move = (id: AppId, x: number, y: number) => setWindows(ws => ws.map(w => w.id === id ? { ...w, ...clampPosition(x, y) } : w));
  const toggleMaximize = (id: AppId) => setWindows(ws => ws.map(w => w.id === id ? { ...w, maximized: !w.maximized, minimized: false, z: Math.max(0, ...ws.map(v => v.z)) + 1 } : w));
  return { windows, open, close, minimize, move, focus, toggleMaximize };
}
