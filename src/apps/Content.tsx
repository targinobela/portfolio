import { useState, type FormEvent } from 'react';
import { ArrowUpRight, ArrowRight, Download, Github, Linkedin, Mail, Code2, ImageIcon } from 'lucide-react';
import { profile, projects, skills, experience } from '../data/portfolio';
import { useLanguage } from '../hooks/useLanguage';
import type { AppId } from '../hooks/useWindowManager';

export function Resume() {
  const {t}=useLanguage();
  return profile.resume ? <a className="button secondary" href={profile.resume} download><Download size={16}/>{t('Baixar currículo')}</a> : <button className="button secondary" disabled title={t('O currículo ainda precisa ser fornecido')}><Download size={16}/>{t('Currículo em breve')}</button>;
}
export function Socials() {
  const {t}=useLanguage();
  return <div className="socials">{profile.github ? <a href={profile.github} target="_blank" rel="noreferrer"><Github size={16}/>GitHub<ArrowUpRight size={13}/></a> : <span title={t('Link ainda não fornecido')}><Github size={16}/>GitHub · {t('em breve')}</span>}{profile.linkedin ? <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16}/>LinkedIn<ArrowUpRight size={13}/></a> : <span title={t('Link ainda não fornecido')}><Linkedin size={16}/>LinkedIn · {t('em breve')}</span>}</div>;
}

type TerminalLine = {text:string; literal?:boolean; kind?:'skills'};
function TerminalApp({open}:{open:(id:AppId)=>void}) {
  const {t}=useLanguage();
  // Store message keys, so changing language also translates existing output.
  const [lines,setLines]=useState<TerminalLine[]>([{text:'Isabela Targino [versão 1.0]'}, {text:'Bem-vinda(o) ao meu cantinho digital.'}, {text:'Digite help para explorar.'}]);
  const [input,setInput]=useState('');
  const [history,setHistory]=useState<string[]>([]);
  const [cursor,setCursor]=useState(0);
  function submit(e:FormEvent) {
    e.preventDefault();const command=input.trim().toLowerCase();setInput('');setHistory(h=>[...h,command]);setCursor(0);
    if(command==='clear'){setLines([]);return;}
    let answer:TerminalLine={text:'Comando não encontrado. Digite help.'};
    if(command==='help')answer={text:'help · about · projects · skills · contact · clear',literal:true};
    if(command==='about')answer={text:'Isabela Targino — Desenvolvedora de Software. Java, AWS e aplicações web.'};
    if(command==='skills')answer={text:'',kind:'skills'};
    if(command==='projects'){open('projects');answer={text:'Abrindo projetos.exe…'};}
    if(command==='contact'){open('contact');answer={text:[profile.email,profile.github,profile.linkedin].filter(Boolean).join(' · '),literal:true};}
    if(command==='sudo')answer={text:'Com grandes poderes vêm grandes code reviews.'};
    if(command==='gg')answer={text:'Conquista desbloqueada: explorador(a) do desktop de Isabela Targino ✦'};
    setLines(l=>[...l.slice(-150),{text:`isa@portfolio:~$ ${input}`,literal:true},answer]);
  }
  return <div className="terminal" onClick={e=>e.currentTarget.querySelector('input')?.focus()}>
    <div className="terminal-lines" role="log" aria-live="polite">{lines.map((line,i)=><div key={i}>{line.kind==='skills'?Object.values(skills).flat().map(t).join(' · '):line.literal?line.text:t(line.text)}</div>)}</div>
    <form onSubmit={submit}><label htmlFor="command">isa@portfolio:~$</label><input id="command" autoComplete="off" spellCheck={false} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==='ArrowUp'){e.preventDefault();const n=Math.min(cursor+1,history.length);setCursor(n);setInput(history[history.length-n]||'');}if(e.key==='ArrowDown'){e.preventDefault();const n=Math.max(0,cursor-1);setCursor(n);setInput(n?history[history.length-n]:'');}}} aria-label={t('Comando do terminal')}/></form>
  </div>;
}

export function Content({id,open}:{id:AppId;open:(id:AppId)=>void}) {
  const {t,language}=useLanguage();
  if(id==='about')return <>
    <div className="about-layout"><div className="intro">
      <div className="eyebrow"><span/>{t('UM POUCO SOBRE MIM')}</div>
      <h1>{t('Olá, eu sou')}<br/>{language==='pt-BR'?'a ':''}<span>Isabela Targino.</span><span className="spark">✦</span></h1>
      <p className="role">{t('Desenvolvedora de Software')}</p>
      <p>{t('Sou formada em Análise e Desenvolvimento de Sistemas e atualmente estudo Engenharia da Computação. Tenho experiência em desenvolvimento de software na Amazon Brasil, com foco em Java, AWS e aplicações web.')}</p>
      <p>{t('Adoro tecnologia, jogos e construir soluções para problemas reais.')}</p>
    </div><aside className="avatar-panel">{profile.avatar?<img src={profile.avatar} alt={t('Avatar pixel art de Isabela Targino')}/>:<div className="avatar-placeholder"><ImageIcon size={36} strokeWidth={1}/><span>{t('seu avatar entra aqui')}</span><small>{t('aguardando foto de referência')}</small></div>}<div className="avatar-caption"><span/>{t('café, código & pixels')}</div></aside></div>
    <div className="actions"><button className="button primary" onClick={()=>open('projects')}>{t('Ver projetos')}<ArrowRight size={16}/></button><Resume/></div>
    <div className="about-footer"><Socials/><span className="little-note">{t('feito de ideias e alguns pixels ✧')}</span></div>
  </>;
  if(id==='projects')return <>
    <div className="eyebrow">{t('EXPLORADOR DE PROJETOS')}</div><h2>{t('Ideias que saíram do papel')}<span className="accent">.</span></h2><p className="muted">{t('Um projeto de cada vez. Sempre aprendendo no caminho.')}</p>
    {projects.map(project=><article className="project" key={project.url}>
      {project.logo?<div className="project-logo"><img src={project.logo} alt={`${t('Logo de')} ${project.name}`}/></div>:project.screenshot?<img src={project.screenshot} alt={`${t('Captura de')} ${project.name}`}/>:<div className="project-art"><div className="court"><div/><i/></div><span>QUEM TÁ<br/>NA QUADRA?</span><small>{t('ilustração · captura ainda não disponível')}</small></div>}
      <div className="project-copy"><span className="tag">{t('PROJETO PUBLICADO')}</span><h3>{project.name}</h3><p>{t(project.description)}</p><a className="button primary" target="_blank" rel="noreferrer" href={project.url}>{t('Ver projeto')}<ArrowUpRight size={16}/></a>{project.source&&<a className="button secondary" href={project.source} target="_blank" rel="noreferrer">{t('Código-fonte')}</a>}</div>
    </article>)}<p className="file-note">{String(projects.length).padStart(2,'0')} {t(projects.length===1?'projeto':'projetos')} · {t('novas ideias em construção')}</p>
  </>;
  if(id==='experience')return <><div className="eyebrow">{t('MEU CAMINHO ATÉ AQUI')}</div><h2>{t('Experiência')}<span className="accent">.</span></h2><div className="timeline">{experience.map((job,i)=><article key={job.company}><div className="timeline-dot">{String(i+1).padStart(2,'0')}</div><span className="muted date">{t(job.period)}</span><h3>{t(job.company)}</h3><p className="job-role">{t(job.role)}</p><ul>{job.details.map(d=><li key={d}>{t(d)}</li>)}</ul></article>)}</div></>;
  if(id==='skills')return <><div className="eyebrow">{t('MINHA CAIXA DE FERRAMENTAS')}</div><h2>{t('Tecnologias & práticas')}<span className="accent">.</span></h2><p className="muted">{t('Ferramentas que fazem parte da minha trajetória.')}</p><div className="skill-groups">{Object.entries(skills).map(([group,items])=><section key={group}><h3><Code2 size={17}/>{t(group)}</h3><div className="tags">{items.map(item=><span key={item}>{t(item)}</span>)}</div></section>)}</div></>;
  if(id==='terminal')return <TerminalApp open={open}/>;
  return <><div className="eyebrow">{t('VAMOS CONVERSAR')}</div><h2>{t('Uma boa ideia começa')}<br/>{t('com um olá')}<span className="accent">.</span></h2><p>{t('Para falar sobre tecnologia, projetos ou uma oportunidade.')}</p><div className="contact-card"><Mail size={28}/><div><h3>{t('E-mail')}</h3>{profile.email?<a href={`mailto:${profile.email}`}>{profile.email}</a>:<p className="muted">{t('Endereço ainda não fornecido.')}</p>}</div></div><Socials/><div className="contact-resume"><Resume/></div><p className="file-note">{t('E-mail, GitHub, LinkedIn e currículo disponíveis acima.')}</p></>;
}

