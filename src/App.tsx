import React, { useState } from 'react';
import { I18nProvider, useI18n } from './contexts/I18nContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { Toaster, toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Globe } from 'lucide-react';
import EducationWork from './components/EducationWork';
import VisualSpaces from './components/VisualSpaces';
import Networks from './components/Networks';
import Banking from './components/Banking';
import ContactForm from './components/ContactForm';

const Header = ({ currentTab, setCurrentTab }: { currentTab: string, setCurrentTab: (t: string) => void }) => {
  const { lang, toggleLang, t } = useI18n();
  const { theme, toggleTheme } = useTheme();

  const tabs = [
    { id: 'edu', label: t('nav.edu') },
    { id: 'visual', label: t('nav.visual') },
    { id: 'net', label: t('nav.net') },
    { id: 'bank', label: t('nav.bank') },
    { id: 'contact', label: t('nav.contact') },
  ];

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center mb-12 relative"
    >
      <div className="absolute top-0 right-0 flex gap-3">
        <button onClick={toggleLang} className="text-text-accent hover:text-text-primary transition-colors flex items-center gap-1 text-sm font-bold uppercase tracking-widest">
          <Globe size={14} /> {lang === 'vi' ? 'VN' : 'EN'}
        </button>
        <button onClick={toggleTheme} className="text-text-accent hover:text-text-primary transition-colors">
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      <div className="relative w-32 h-32 mx-auto mb-6 group cursor-pointer">
        <img 
          src="/image/avatar.jpg" 
          alt="Nguyen Quang Trung" 
          className="w-full h-full rounded-full object-cover border border-border-primary grayscale contrast-[105%] transition-all duration-500 ease-in-out group-hover:grayscale-0 group-hover:contrast-100 group-hover:scale-105 group-hover:border-border-hover"
        />
      </div>
      <h1 className="text-2xl tracking-[5px] uppercase mb-2 font-bold">NGUYEN QUANG TRUNG</h1>
      <p className="text-text-accent text-sm tracking-[1px] mb-6">15/06/2001 // @trng_c3ntr4le</p>
      
      <div className="max-w-[500px] mx-auto mb-5 text-[0.85rem] text-center">
        <a 
          href="https://maps.app.goo.gl/nX8r2rYeq324eN4y9" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-block text-[#999] hover:text-text-primary transition-all duration-300 py-1 px-2 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
        >
          {t('header.location')}
        </a>
      </div>

      <nav className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 max-w-[600px] mx-auto mt-8 mb-2 py-3 px-1 border-y border-dashed border-border-primary">
        {tabs.map(tab => (
          <button 
            key={tab.id}
            onClick={() => setCurrentTab(tab.id)}
            className={`text-[9.5px] sm:text-xs font-bold tracking-[1px] sm:tracking-[2px] uppercase transition-all duration-300 py-1.5 px-1.5 sm:px-2 ${currentTab === tab.id ? 'text-text-primary drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] -translate-y-[1px]' : 'text-[#8c8c8c] hover:text-text-primary hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] hover:-translate-y-[1px]'}`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </motion.header>
  );
};

const MainContent = () => {
  const { t } = useI18n();
  const [currentTab, setCurrentTab] = useState('edu');

  const renderTab = () => {
    switch(currentTab) {
      case 'edu': return <EducationWork />;
      case 'visual': return <VisualSpaces />;
      case 'net': return <Networks />;
      case 'bank': return <Banking />;
      case 'contact': return <ContactForm />;
      default: return <EducationWork />;
    }
  };

  return (
    <div className="w-full max-w-[700px] mx-auto px-5 pt-10 pb-[100px] min-h-screen">
      <Header currentTab={currentTab} setCurrentTab={setCurrentTab} />
      
      <main className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {renderTab()}
          </motion.div>
        </AnimatePresence>
      </main>
      
      <a 
        href="tel:0964375548" 
        className="fixed bottom-7 right-6 bg-white text-black flex items-center gap-2 py-3 px-[22px] rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.6)] text-xs font-black tracking-[1.5px] z-[99998] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] border border-white/20 hover:-translate-y-1 hover:scale-[1.03] hover:bg-[#00ff66] hover:shadow-[0_14px_40px_rgba(0,255,102,0.35)] max-[480px]:p-3 max-[480px]:bottom-6 max-[480px]:right-5"
      >
        <svg className="w-[15px] h-[15px] max-[480px]:w-[18px] max-[480px]:h-[18px]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
        </svg>
        <span className="max-[480px]:hidden">{t('header.callme')}</span>
      </a>
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <div className="bg-overlay"></div>
        <Toaster 
          position="bottom-center" 
          toastOptions={{
            style: {
              background: 'var(--card-bg)',
              color: 'var(--text-color)',
              border: '1px solid var(--border-color)',
              fontFamily: "'Courier New', Courier, monospace",
              borderRadius: '0px',
            },
          }} 
        />
        <MainContent />
      </I18nProvider>
    </ThemeProvider>
  );
}
