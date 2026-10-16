import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Volume2, VolumeX, X, Download, Github, Linkedin } from 'lucide-react';
import { useWindowManager, type AppId } from './hooks/useWindowManager';
import { useUISound } from './hooks/useUISound';
import { Room } from './components/Room';
import { Window } from './components/Window';
import { apps, AppIcon, BrandMark } from './components/AppIcon';
import { Content } from './apps/Content';
import { profile } from './data/portfolio';
import { LanguageProvider, useLanguage } from './hooks/useLanguage';
import './styles.css';
import './styles/xp.css';

function App() {
  const {language, toggleLanguage, t} = useLanguage();
  const wm = useWindowManager();
  const sound = useUISound();
  const [now, setNow] = useState(new Date());
  const [menu, setMenu] = useState(false);
  const [selected, setSelected] = useState<AppId | null>(null);
  const startButton = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  useEffect(() => { const interval = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(interval); }, []);
  useEffect(() => { if (menu) menuRef.current?.querySelector('button')?.focus(); }, [menu]);
  const open = (id: AppId) => { wm.open(id); setMenu(false); };
  const closeMenu = () => { setMenu(false); startButton.current?.focus(); };
  const topWindow = Math.max(0, ...wm.windows.filter(w => !w.minimized).map(w => w.z));
  const menuApp = (id: AppId, description?: string) => {
    const app = apps.find(a => a.id === id)!;
    return <button key={id} onClick={() => open(id)}><AppIcon id={id}/><span>{t(app.label)}{description && <small>{t(description)}</small>}</span></button>;
  };

  return <div className="desktop" onClick={e => { if ((e.target as Element).closest('button:not(:disabled),a[href]')) sound.play(); }}>
    <Room/>
    <main className="desktop-area" aria-label={`${t('Desktop de')} ${profile.name}`} onClick={e => { if (e.target === e.currentTarget) setSelected(null); }}>
      <nav className="desktop-icons" aria-label={t('Aplicativos — clique, Enter ou toque para abrir')}>
        {apps.map(app => <button key={app.id} className={`desktop-icon ${selected === app.id ? 'selected' : ''}`}
          onClick={() => { setSelected(app.id); open(app.id); }}
          title={`${t(app.label)} — ${t('clique para abrir')}`}>
          <AppIcon id={app.id}/><span>{t(app.label)}</span><span className="shortcut-arrow" aria-hidden="true">↗</span>
        </button>)}
      </nav>
      {wm.windows.map(w => <Window key={w.id} state={w} onFocus={() => wm.focus(w.id)} onClose={() => wm.close(w.id)} onMinimize={() => wm.minimize(w.id)} onMaximize={() => wm.toggleMaximize(w.id)} onMove={(x,y) => wm.move(w.id,x,y)}><Content id={w.id} open={open}/></Window>)}
    </main>
    {menu && <>
      <button className="menu-backdrop" aria-label={t('Fechar menu Iniciar')} onClick={closeMenu}/>
      <nav ref={menuRef} id="start-menu" className="start-menu" aria-label={t('Menu Iniciar')} onKeyDown={e => { if (e.key === 'Escape') { e.stopPropagation(); closeMenu(); } }}>
        <div className="start-heading"><span className="start-avatar">{profile.avatar ? <img src={profile.avatar} alt=""/> : <AppIcon id="about"/>}</span><strong>{profile.name}</strong></div>
        <div className="start-columns">
          <div className="start-primary">
            {menuApp('about', 'Conheça a desenvolvedora')}
            {menuApp('projects', 'Quem Tá na Quadra?')}
            {menuApp('terminal', 'Prompt de comando')}
            <div className="start-separator"/>
            <a href={profile.github} target="_blank" rel="noreferrer"><Github size={24}/><span>GitHub<small>targinobela</small></span></a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={24}/><span>LinkedIn<small>Isabela Targino</small></span></a>
          </div>
          <div className="start-secondary">
            {menuApp('experience')}
            {menuApp('skills')}
            {menuApp('contact')}
            <div className="start-separator"/>
            {profile.resume ? <a href={profile.resume} download><Download size={20}/><span>{t('Meu currículo')}</span></a> : <button disabled title={t('O PDF do currículo ainda não foi configurado')}><Download size={20}/><span>{t('Currículo em breve')}</span></button>}
          </div>
        </div>
        <footer><button onClick={closeMenu}><span className="close-menu-icon"><X size={17}/></span>{t('Fechar menu')}</button></footer>
      </nav>
    </>}
    <footer className="taskbar">
      <button ref={startButton} className={`start-button ${menu ? 'active' : ''}`} aria-controls="start-menu" aria-expanded={menu} onClick={() => setMenu(v => !v)}><BrandMark/><span>{t('Iniciar')}</span></button>
      <div className="task-divider"/>
      <div className="task-apps" aria-label={t('Janelas abertas')}>{wm.windows.map(w => <button key={w.id} className={`task-app ${w.minimized ? 'minimized' : w.z === topWindow ? 'active' : ''}`} aria-label={`${t('Restaurar')} ${t(apps.find(a => a.id === w.id)!.label)}`} onClick={() => wm.focus(w.id)}><AppIcon id={w.id} small/><span>{t(apps.find(a => a.id === w.id)!.file)}</span><i/></button>)}</div>
      <div className="system-tray">
        <button className="language-switch" onClick={toggleLanguage} aria-label={language==='pt-BR'?'Switch language to English':'Mudar idioma para português'} title={language==='pt-BR'?'Switch to English':'Mudar para português'}><span lang="pt-BR" className={language==='pt-BR'?'current-language':undefined}>PT-BR</span><span aria-hidden="true">/</span><span lang="en" className={language==='en'?'current-language':undefined}>EN</span></button>
        <button onClick={sound.toggle} aria-label={sound.enabled ? t('Desativar sons') : t('Ativar sons')} aria-pressed={sound.enabled} title={sound.enabled ? t('Som ativado — clique para silenciar') : t('Som desativado — clique para ativar')}>{sound.enabled ? <Volume2 size={18}/> : <VolumeX size={18}/>}</button>
        <time dateTime={now.toISOString()}><strong>{now.toLocaleTimeString(language, {hour:'2-digit', minute:'2-digit'})}</strong><span>{now.toLocaleDateString(language, {day:'2-digit', month:'2-digit'})}</span></time>
      </div>
    </footer>
  </div>;
}
class ErrorBoundary extends React.Component<{children:React.ReactNode},{failed:boolean}> {
  state={failed:false};
  static getDerivedStateFromError(){return{failed:true};}
  render(){return this.state.failed ? <ErrorScreen/> : this.props.children;}
}
function ErrorScreen(){const {t}=useLanguage();return <main className="error-screen"><h1>{t('Uma pausa no sistema.')}</h1><p>{t('Não foi possível abrir o desktop.')}</p><button className="button primary" onClick={()=>location.reload()}>{t('Reiniciar desktop')}</button></main>;}
createRoot(document.getElementById('root')!).render(<React.StrictMode><LanguageProvider><ErrorBoundary><App/></ErrorBoundary></LanguageProvider></React.StrictMode>);


