import { useState, useRef, useEffect } from 'react';
import { Award, BookOpen, History, Clock, Phone } from 'lucide-react';
import { aboutConfig, phoneConfig } from '../config';
import { useLanguage } from '../contexts/LanguageContext';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Award, BookOpen, History, Clock,
};

export function About() {
  if (!aboutConfig.mainTitle) return null;

  const [activeTab, setActiveTab] = useState(aboutConfig.tabs[0]?.id || '');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { language, isRTL } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const activeTabData = aboutConfig.tabs.find(tab => tab.id === activeTab);

  const handleCall = () => {
    window.location.href = `tel:${phoneConfig.phoneNumber}`;
  };

  const t = {
    script: language === 'fr' ? aboutConfig.scriptText : aboutConfig.scriptTextAr,
    subtitle: language === 'fr' ? aboutConfig.subtitle : aboutConfig.subtitleAr,
    title: language === 'fr' ? aboutConfig.mainTitle : aboutConfig.mainTitleAr,
    intro: language === 'fr' ? aboutConfig.introText : aboutConfig.introTextAr,
    cta: language === 'fr' ? aboutConfig.ctaButtonText : aboutConfig.ctaButtonTextAr,
    call: language === 'fr' ? 'Appeler' : 'اتصل',
    yearBadge: language === 'fr' ? aboutConfig.yearBadgeLabel : aboutConfig.yearBadgeLabelAr,
    openingHours: language === 'fr' ? aboutConfig.openingHours : aboutConfig.openingHoursAr,
    openingHoursLabel: language === 'fr' ? aboutConfig.openingHoursLabel : aboutConfig.openingHoursLabelAr,
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#0B0F17] py-20 overflow-hidden"
    >
      <div className="container-custom">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <span className="font-script text-3xl text-[#D4A14C]">{t.script}</span>
            </div>
            <div className={`transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="text-white/60 text-sm uppercase tracking-[0.2em] mt-4">{t.subtitle}</p>
            </div>
            <h2 className={`font-serif text-4xl md:text-5xl lg:text-6xl text-white mt-4 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {t.title}
            </h2>
          </div>
          
          <div className={`flex items-end transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-white/70 text-lg leading-relaxed">{t.intro}</p>
          </div>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left side - Timeline & Year badge */}
          <div className="lg:col-span-4">
            {/* Year badge */}
            <div className={`mb-8 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${isRTL ? 'translate-x-12' : '-translate-x-12'}`}`}>
              <div className="inline-flex flex-col items-center bg-[#D4A14C]/10 border border-[#D4A14C]/30 rounded-sm p-6">
                <span className="font-serif text-5xl text-[#D4A14C]">{aboutConfig.yearBadge}</span>
                <span className="text-white/60 text-sm uppercase tracking-wider mt-2">{t.yearBadge}</span>
              </div>
            </div>

            {/* Timeline */}
            <div className={`space-y-6 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${isRTL ? 'translate-x-12' : '-translate-x-12'}`}`}>
              {aboutConfig.timeline.map((item, index) => (
                <div key={index} className={`flex gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-[#D4A14C] rounded-full" />
                    {index < aboutConfig.timeline.length - 1 && (
                      <div className="w-px flex-1 bg-white/10 mt-2" />
                    )}
                  </div>
                  <div className="pb-6">
                    <span className="text-[#D4A14C] text-sm font-medium">{item.year}</span>
                    <p className="text-white/70 text-sm mt-1">
                      {language === 'fr' ? item.event : item.eventAr}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Opening hours */}
            <div className={`mt-8 p-4 bg-white/5 border border-white/10 rounded-sm transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${isRTL ? 'translate-x-12' : '-translate-x-12'}`}`}>
              <div className={`flex items-center gap-2 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Clock className="w-4 h-4 text-[#D4A14C]" />
                <span className="text-white/60 text-sm">{t.openingHoursLabel}</span>
              </div>
              <p className="text-white font-medium">{t.openingHours}</p>
            </div>
          </div>

          {/* Right side - Tabs & Content */}
          <div className="lg:col-span-8">
            {/* Tabs */}
            <div className={`flex gap-2 mb-8 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {aboutConfig.tabs.map((tab) => {
                const TabIcon = iconMap[tab.icon] || Award;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-sm transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-[#D4A14C] text-[#0B0F17]'
                        : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <TabIcon className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {language === 'fr' ? tab.name : tab.nameAr}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Tab content */}
            {activeTabData && (
              <div className={`grid md:grid-cols-2 gap-8 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                {/* Image */}
                <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
                  <img
                    src={activeTabData.image}
                    alt={language === 'fr' ? activeTabData.content.title : activeTabData.content.titleAr}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17]/60 to-transparent" />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4A14C]/10 rounded-sm mb-4 w-fit">
                    <span className="text-[#D4A14C] text-xs uppercase tracking-wider">
                      {language === 'fr' ? activeTabData.content.highlight : activeTabData.content.highlightAr}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl text-white mb-4">
                    {language === 'fr' ? activeTabData.content.title : activeTabData.content.titleAr}
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {language === 'fr' ? activeTabData.content.description : activeTabData.content.descriptionAr}
                  </p>
                  
                  <div className="flex flex-wrap gap-3 mt-6">
                    <button
                      onClick={handleCall}
                      className="group inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium transition-all duration-300 bg-white/10 border border-white/30 text-white hover:bg-white/20 rounded-sm"
                    >
                      <Phone className="w-4 h-4" />
                      {t.call}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Quote */}
            {aboutConfig.quote.text && (
              <div className={`mt-12 p-8 bg-white/5 border border-white/10 rounded-sm transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <p className="text-[#D4A14C] text-sm uppercase tracking-[0.2em] mb-4">
                  {language === 'fr' ? aboutConfig.quote.prefix : aboutConfig.quote.prefixAr}
                </p>
                <blockquote className="font-serif text-xl md:text-2xl text-white/90 italic leading-relaxed">
                  "{language === 'fr' ? aboutConfig.quote.text : aboutConfig.quote.textAr}"
                </blockquote>
                <p className="text-white/50 mt-4 text-sm">— {aboutConfig.quote.attribution}</p>
              </div>
            )}
          </div>
        </div>
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
