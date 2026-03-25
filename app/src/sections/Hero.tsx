import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { heroConfig, phoneConfig } from '../config';
import { useLanguage } from '../contexts/LanguageContext';

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!start || hasRun.current) return;
    hasRun.current = true;

    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);

  return count;
}

export function Hero({ isReady }: { isReady: boolean }) {
  if (!heroConfig.mainTitle) return null;

  const [phase, setPhase] = useState(0);
  const [bgIndex, setBgIndex] = useState(0);
  const { language, isRTL } = useLanguage();
  
  // Background slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % heroConfig.backgroundImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Build count-up hooks from stats config
  const stat0 = heroConfig.stats[0];
  const stat1 = heroConfig.stats[1];
  const stat2 = heroConfig.stats[2];
  const count0 = useCountUp(stat0?.value ?? 0, 2000, phase >= 4);
  const count1 = useCountUp(stat1?.value ?? 0, 2200, phase >= 4);
  const count2 = useCountUp(stat2?.value ?? 0, 1800, phase >= 4);
  const counts = [count0, count1, count2];

  useEffect(() => {
    if (!isReady) return;
    const t1 = setTimeout(() => setPhase(1), 100);
    const t2 = setTimeout(() => setPhase(2), 800);
    const t3 = setTimeout(() => setPhase(3), 1400);
    const t4 = setTimeout(() => setPhase(4), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [isReady]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCall = () => {
    window.location.href = `tel:${phoneConfig.phoneNumber}`;
  };

  const t = {
    script: language === 'fr' ? heroConfig.scriptText : heroConfig.scriptTextAr,
    title: language === 'fr' ? heroConfig.mainTitle : heroConfig.mainTitleAr,
    cta: language === 'fr' ? heroConfig.ctaButtonText : heroConfig.ctaButtonTextAr,
    call: language === 'fr' ? 'Appeler maintenant' : 'اتصل الآن',
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0B0F17]"
    >
      {/* Dynamic Background Slideshow */}
      <div className="absolute inset-0">
        {heroConfig.backgroundImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-2000 ${
              index === bgIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 hero-kenburns">
              <img
                src={img}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F17]/80 via-[#0B0F17]/40 to-[#0B0F17]/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-transparent to-[#0B0F17]/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className={`container-custom py-32 lg:py-40 ${isRTL ? 'text-right' : 'text-left'}`}>
          {/* Script accent */}
          <div className={`transition-all duration-1000 ease-out ${phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <span className="font-script text-3xl md:text-4xl text-[#D4A14C]">{t.script}</span>
          </div>

          {/* Divider line */}
          <div 
            className={`my-6 h-px bg-[#D4A14C]/50 transition-all duration-1000 ease-out ${
              phase >= 2 ? 'w-24 opacity-100' : 'w-0 opacity-0'
            } ${isRTL ? 'mr-0 ml-auto' : ''}`} 
            style={{ transitionDelay: '0.2s' }} 
          />

          {/* Main Title */}
          <h1 
            className={`font-serif text-4xl md:text-5xl lg:text-7xl text-white leading-[0.95] tracking-tight transition-all duration-1000 ease-out max-w-4xl ${
              phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            } ${isRTL ? 'mr-0 ml-auto' : ''}`} 
            style={{ transitionDelay: '0.3s' }}
          >
            {t.title}
          </h1>

          {/* Subtitle */}
          <p 
            className={`mt-6 text-white/70 text-lg md:text-xl max-w-xl transition-all duration-1000 ease-out ${
              phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            } ${isRTL ? 'mr-0 ml-auto' : ''}`}
            style={{ transitionDelay: '0.4s' }}
          >
            {language === 'fr' 
              ? "Terrains agricoles et de construction à Rabat-Salé, Shoul et Zaër"
              : "أراضي زراعية وبناء في الرباط-سلا والسهول وزعير"
            }
          </p>

          {/* CTAs */}
          <div 
            className={`mt-10 flex flex-wrap gap-4 transition-all duration-700 ease-out ${
              phase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <button
              onClick={() => scrollToSection(heroConfig.ctaTarget || '#properties')}
              className="group inline-flex items-center gap-3 px-8 py-3.5 text-sm font-medium tracking-wide transition-all duration-300 bg-[#D4A14C] text-[#0B0F17] hover:bg-[#e5b55d] hover:-translate-y-0.5 rounded-sm"
            >
              {t.cta}
              <ArrowRight className={`w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 ${isRTL ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Click to Call Button */}
            <button
              onClick={handleCall}
              className="group inline-flex items-center gap-3 px-8 py-3.5 text-sm font-medium tracking-wide transition-all duration-300 bg-white/10 border border-white/30 text-white hover:bg-white/20 hover:-translate-y-0.5 rounded-sm"
            >
              <Phone className="w-4 h-4" />
              {t.call}
            </button>
          </div>
        </div>
      </div>

      {/* Stats with count-up */}
      {heroConfig.stats.length > 0 && (
        <div 
          className={`absolute bottom-12 left-0 right-0 z-10 transition-all duration-1000 ease-out ${
            phase >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="container-custom">
            <div 
              className="grid gap-8 max-w-4xl mx-auto bg-[#0B0F17]/80 backdrop-blur-sm rounded-lg p-6 border border-white/10"
              style={{ gridTemplateColumns: `repeat(${heroConfig.stats.length}, minmax(0, 1fr))` }}
            >
              {heroConfig.stats.map((stat, index) => (
                <div 
                  key={index} 
                  className={`text-center ${index > 0 ? (isRTL ? 'border-r' : 'border-l') + ' border-white/10' : ''}`}
                >
                  <div className="font-serif text-3xl md:text-4xl text-[#D4A14C] mb-1 tabular-nums">
                    {counts[index]}{stat.suffix}
                  </div>
                  <div className="text-xs md:text-sm text-white/60 uppercase tracking-wider">
                    {language === 'fr' ? stat.label : stat.labelAr}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Background indicators */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {heroConfig.backgroundImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setBgIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === bgIndex ? 'w-8 bg-[#D4A14C]' : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Background ${index + 1}`}
          />
        ))}
      </div>

      {/* Grain overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay'
        }}
      />
    </section>
  );
}
