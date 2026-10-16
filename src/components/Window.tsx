import { useEffect, useRef, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Minus, X, Square, Copy } from 'lucide-react';
import { AppIcon, apps } from './AppIcon';
import { type WindowState } from '../hooks/useWindowManager';
import { useLanguage } from '../hooks/useLanguage';
export function Window({state,children,onFocus,onClose,onMinimize,onMove,onMaximize}:{state:WindowState;children:ReactNode;onFocus:()=>void;onClose:()=>void;onMinimize:()=>void;onMove:(x:number,y:number)=>void;onMaximize:()=>void}){
 const {t}=useLanguage(); const ref=useRef<HTMLElement>(null); const reduced=useReducedMotion();
 useEffect(()=>{function resize(){onMove(state.x,state.y);}window.addEventListener('resize',resize);return()=>window.removeEventListener('resize',resize);},[state.x,state.y,onMove]);
 useEffect(()=>{if(!state.minimized)ref.current?.focus({preventScroll:true});},[state.minimized]);
 const app=apps.find(a=>a.id===state.id)!;
 return <motion.section ref={ref} tabIndex={-1} aria-label={t(app.label)} className={`os-window ${state.maximized?'maximized':'  '} ${state.id==='terminal'?'terminal-window':''}`} style={{left:state.x,top:state.y,zIndex:state.z,display:state.minimized?'none':undefined}} initial={{opacity:0,scale:reduced?1:.97,y:reduced?0:8}} animate={{opacity:1,scale:1,y:0}} transition={{duration:.16}} onPointerDown={onFocus} onFocus={onFocus} onKeyDown={e=>{if(e.key==='Escape')onClose();}}>
 <header className="titlebar" onPointerDown={e=>{if((e.target as HTMLElement).closest('button')||state.maximized||window.innerWidth<=760)return;e.preventDefault();const startX=e.clientX,startY=e.clientY,originalX=state.x,originalY=state.y;e.currentTarget.setPointerCapture(e.pointerId);const el=e.currentTarget;const move=(ev:PointerEvent)=>onMove(originalX+ev.clientX-startX,originalY+ev.clientY-startY);const end=()=>{el.removeEventListener('pointermove',move);el.removeEventListener('pointerup',end);el.removeEventListener('pointercancel',end);};el.addEventListener('pointermove',move);el.addEventListener('pointerup',end);el.addEventListener('pointercancel',end);}}><div className="window-title"><AppIcon id={state.id} small/><span>{t(app.file)}</span></div><div className="window-controls"><button aria-label={`${t('Minimizar')} ${t(app.label)}`} onClick={onMinimize}><Minus size={15}/></button><button className={state.maximized?'is-maximized':undefined} aria-label={`${t(state.maximized?'Restaurar':'Maximizar')} ${t(app.label)}`} title={t(state.maximized?'Restaurar janela':'Maximizar janela')} aria-pressed={state.maximized} onClick={onMaximize}>{state.maximized?<Copy size={14}/>:<Square size={12}/>}</button><button className="close" aria-label={`${t('Fechar')} ${t(app.label)}`} onClick={onClose}><X size={16}/></button></div></header>
 <div className="window-body">{children}</div><footer className="window-status"><span><span className="status-dot"/> {state.id==='about'?t('um pequeno universo, muitas possibilidades'):'Isabela Targino · '+t(app.label)}</span><span>UTF-8 <span className="resize-mark">◢</span></span></footer></motion.section>;
}




