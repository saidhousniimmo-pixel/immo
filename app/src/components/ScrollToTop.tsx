import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { scrollToTopConfig } from '../config';
import { useLanguage } from '../contexts/LanguageContext';

export function ScrollToTop() {
  if (!scrollToTopConfig.ariaLabel) return null;

  const [isVisible, setIsVisible] = useState(false);
  const { language, isRTL } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const label = language === 'fr' ? scrollToTopConfig.ariaLabel : scrollToTopConfig.ariaLabelAr;

  return (
    <button
      onClick={scrollToTop}
      aria-label={label}
      className={`fixed bottom-8 ${isRTL ? 'right-8' : 'left-8'} z-40 w-12 h-12 rounded-full bg-[#D4A14C]/90 text-[#0B0F17] flex items-center justify-center shadow-lg shadow-[#D4A14C]/20 backdrop-blur-sm transition-all duration-300 hover:bg-[#D4A14C] hover:scale-110 ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <ArrowUp className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
    </button>
  );
}
