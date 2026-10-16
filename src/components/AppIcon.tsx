import { useId } from 'react';
import type { AppId } from '../hooks/useWindowManager';
export const apps = [
  {id:'about',label:'Sobre mim',file:'sobre_mim.txt',color:'pink'},
  {id:'projects',label:'Projetos',file:'projetos.exe',color:'yellow'},
  {id:'experience',label:'Experiência',file:'experiencia.exe',color:'blue'},
  {id:'skills',label:'Skills',file:'skills.exe',color:'purple'},
  {id:'terminal',label:'Terminal',file:'terminal.exe',color:'dark'},
  {id:'contact',label:'Contato',file:'contato.exe',color:'pink'}
] as const;

/** Original vector objects with highlights and depth, rather than boxed line icons. */
export function AppIcon({id, small=false}:{id:AppId;small?:boolean}) {
  const key=useId().replace(/[^a-zA-Z0-9]/g,'');
  const fill=(name:string)=>`url(#${key}-${name})`;
  return <span aria-hidden="true" className={`app-icon object-icon ${small?'small':''}`}><svg viewBox="0 0 48 48" fill="none">
    <defs>
      <linearGradient id={`${key}-paper`} x1="12" y1="4" x2="38" y2="42" gradientUnits="userSpaceOnUse"><stop stopColor="#fff"/><stop offset=".5" stopColor="#f7faff"/><stop offset="1" stopColor="#b2c9e0"/></linearGradient>
      <linearGradient id={`${key}-blue`} x1="8" y1="6" x2="37" y2="40" gradientUnits="userSpaceOnUse"><stop stopColor="#c5efff"/><stop offset=".3" stopColor="#7abde6"/><stop offset=".7" stopColor="#357ac2"/><stop offset="1" stopColor="#1d4c99"/></linearGradient>
      <linearGradient id={`${key}-gold`} x1="12" y1="10" x2="32" y2="43" gradientUnits="userSpaceOnUse"><stop stopColor="#fff9c9"/><stop offset=".35" stopColor="#ffe58c"/><stop offset=".8" stopColor="#f6bf4c"/><stop offset="1" stopColor="#d99823"/></linearGradient>
      <linearGradient id={`${key}-leather`} x1="12" y1="12" x2="29" y2="42" gradientUnits="userSpaceOnUse"><stop stopColor="#dba878"/><stop offset=".35" stopColor="#b9814c"/><stop offset="1" stopColor="#704724"/></linearGradient>
      <linearGradient id={`${key}-metal`} x1="8" y1="7" x2="34" y2="38" gradientUnits="userSpaceOnUse"><stop stopColor="#fff"/><stop offset=".33" stopColor="#dce7ee"/><stop offset=".6" stopColor="#899eaf"/><stop offset="1" stopColor="#d5e3ed"/></linearGradient>
      <linearGradient id={`${key}-black`} x1="10" y1="9" x2="37" y2="39" gradientUnits="userSpaceOnUse"><stop stopColor="#34495b"/><stop offset="1" stopColor="#050b13"/></linearGradient>
    </defs>
    <ellipse cx="25" cy="43" rx="18" ry="2" fill="#143256" opacity=".19"/>
    {id==='about' && <>
      <path d="M10 5h22l7 7v30H10z" fill={fill('paper')} stroke="#537b9d"/>
      <path d="M32 5v8h7" fill="#d4e8f8" stroke="#537b9d"/>
      <path d="M12 7h18" stroke="white" strokeWidth="2"/>
      <rect x="15" y="16" width="19" height="19" rx="1" fill={fill('blue')} stroke="#6793b9"/>
      <circle cx="24" cy="22" r="4" fill="#fff6db" stroke="#d7c7a1" strokeWidth=".7"/>
      <path d="M17 33c0-6 3-7 7-7s8 1 8 7" fill="#fff8e8"/>
      <path d="M16 38h17" stroke="#7b9cb7"/>
    </>}
    {id==='projects' && <>
      <path d="M5 13l14-3 5 5 17-2 2 25-35 6z" fill="#d89d30" stroke="#a17725"/>
      <path d="M7 11h13l4 5h17v22L7 42z" fill={fill('gold')} stroke="#b58c31"/>
      <path d="M12 17l21-3 4 22-25 6z" fill={fill('paper')} stroke="#b6b6a7"/>
      <path d="M6 24l37-5-6 22-30 3z" fill={fill('gold')} stroke="#b58c31"/>
      <path d="M8 25l33-4" stroke="#fff4ba" strokeWidth="2"/>
      <path d="M9 41l26-3" stroke="#e9b04c"/>
    </>}
    {id==='experience' && <>
      <path d="M17 15V9c0-4 14-4 14 0v6" stroke="#684527" strokeWidth="4"/>
      <path d="M18 13V9c0-2 12-2 12 0v4" stroke="#d8b27d" strokeWidth="2"/>
      <path d="M5 16l34-3 5 5-1 23-34 3-4-5z" fill="#6b472d" stroke="#69472a"/>
      <path d="M5 16h34v25H5z" fill={fill('leather')} stroke="#7c542f"/>
      <path d="M5 17h34v12H5z" fill={fill('leather')} stroke="#7c542f"/>
      <path d="M7 18h30" stroke="#edc693"/>
      <path d="M12 17v23M32 17v23" stroke="#694425" strokeWidth="3"/>
      <rect x="10" y="26" width="5" height="6" rx="1" fill={fill('gold')} stroke="#6e5326"/>
      <rect x="30" y="26" width="5" height="6" rx="1" fill={fill('gold')} stroke="#6e5326"/>
    </>}
    {id==='skills' && <>
      <path d="M29 5l3 3 5-1 3 5-3 4 1 5-5 3-4-3-5 1-3-5 3-4-1-5z" fill={fill('metal')} stroke="#60798f"/>
      <circle cx="31" cy="14" r="4" fill="#627d92" stroke="#e7f5ff"/>
      <path d="M10 23l4-4 5 2 4-1 4 5-2 4 1 5-5 4-5-2-4 1-4-5 2-4z" fill={fill('blue')} stroke="#416c9c"/>
      <circle cx="17" cy="29" r="4" fill="#d9edf8" stroke="#496e95"/>
      <path d="M37 23l4 4-16 16-5-5z" fill={fill('gold')} stroke="#936e31"/>
      <path d="M38 23l-5-5 3-7-7 3-2 7 5 5-11 11 3 3 13-13z" fill={fill('metal')} stroke="#5c748b"/>
    </>}
    {id==='terminal' && <>
      <path d="M5 8l36-1 3 4v30L5 43z" fill="#7d92a6" stroke="#4d667e"/>
      <rect x="4" y="9" width="37" height="31" rx="1" fill={fill('black')} stroke="#d3e3f0"/>
      <path d="M5 10h35v6H5z" fill={fill('blue')}/>
      <path d="M8 12h5M31 12h2M35 12h2" stroke="#fff"/>
      <path d="M10 22l5 4-5 4M19 32h10" stroke="#f0f7f0" strokeWidth="2.5"/>
    </>}
    {id==='contact' && <>
      <path d="M5 15l32-5 7 4-1 25-32 5-7-4z" fill="#81a7ca" stroke="#517d9f"/>
      <path d="M4 16h36v25H4z" fill={fill('paper')} stroke="#789dbd"/>
      <path d="M5 40l13-14h9l12 14" fill="#e3ecf5" stroke="#98b4ca"/>
      <path d="M5 17l17 14 17-14" fill="#f8fbff" stroke="#86a7c4"/>
      <path d="M7 17h30" stroke="white" strokeWidth="2"/>
      <path d="M32 7l8-2 4 4-2 9-8 2-4-4z" fill={fill('blue')} stroke="#3267a2"/>
      <path d="M34 11l3 3 5-5" stroke="white" strokeWidth="1.5"/>
    </>}
  </svg></span>;
}
export function BrandMark(){return <svg className="brand-mark" viewBox="0 0 28 28" aria-hidden="true"><path d="M4 7l9-3v9l-9 2z" fill="#f4b54a"/><path d="M15 4l9 3v8l-9-2z" fill="#85c867"/><path d="M4 17l9-2v9l-9-2z" fill="#5faff2"/><path d="M15 15l9 2v5l-9 2z" fill="#f1e67c"/><path d="M5 8l7-2M16 6l7 2" stroke="#fff" opacity=".7"/></svg>;}
