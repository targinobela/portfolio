import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { getInitialLanguage, translate, type Language } from '../data/translations';

const LanguageContext = createContext<{language: Language; toggleLanguage: () => void; t: (text: string) => string} | null>(null);

export function LanguageProvider({children}: {children: ReactNode}) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  useEffect(() => {
    document.documentElement.lang = language;
    document.title = `Isabela Targino · ${translate(language, 'Desenvolvedora de Software')}`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', translate(language, 'Isabela Targino — Desenvolvedora de Software. Projetos e experiência em um desktop inspirado no Windows XP.'));
    try { localStorage.setItem('portfolio-language', language); } catch { /* Language switching also works without storage. */ }
  }, [language]);
  const toggleLanguage = () => setLanguage(current => current === 'pt-BR' ? 'en' : 'pt-BR');
  return <LanguageContext.Provider value={{language, toggleLanguage, t: text => translate(language, text)}}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage requires LanguageProvider');
  return context;
}
