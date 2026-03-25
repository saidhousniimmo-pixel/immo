import { useState, useRef, useEffect } from 'react';
import { MapPin, FileCheck, Phone, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { propertyShowcaseConfig } from '../config';
import { useLanguage } from '../contexts/LanguageContext';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MapPin, FileCheck, Phone,
};

export function PropertyShowcase() {
  if (!propertyShowcaseConfig.mainTitle) return null;

  const [activeIndex, setActiveIndex] = useState(0);
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

  const activeProperty = propertyShowcaseConfig.properties[activeIndex];

  const nextProperty = () => {
    setActiveIndex((prev) => (prev + 1) % propertyShowcaseConfig.properties.length);
  };

  const prevProperty = () => {
    setActiveIndex((prev) => (prev - 1 + propertyShowcaseConfig.properties.length) % propertyShowcaseConfig.properties.length);
  };

  const openWhatsApp = () => {
    const propertyName = language === 'fr' ? activeProperty.name : activeProperty.nameAr;
    const location = language === 'fr' ? activeProperty.location : activeProperty.locationAr;
    const message = language === 'fr'
      ? `Bonjour, je suis intéressé par le terrain ${propertyName} à ${location}. Pouvez-vous m'en dire plus ?`
      : `مرحباً، أنا مهتم بالأرض ${propertyName} في ${location}. هل يمكنك إخباري المزيد؟`;
    window.open(`https://wa.me/212631800376?text=${encodeURIComponent(message)}`, '_blank');
  };

  const t = {
    script: language === 'fr' ? propertyShowcaseConfig.scriptText : propertyShowcaseConfig.scriptTextAr,
    subtitle: language === 'fr' ? propertyShowcaseConfig.subtitle : propertyShowcaseConfig.subtitleAr,
    title: language === 'fr' ? propertyShowcaseConfig.mainTitle : propertyShowcaseConfig.mainTitleAr,
    requestInfo: language === 'fr' ? 'Demander infos' : 'طلب معلومات',
    surface: language === 'fr' ? 'Surface' : 'المساحة',
    accessibility: language === 'fr' ? 'Accessibilité' : 'إمكانية الوصول',
    potential: language === 'fr' ? 'Potentiel' : 'الإمكانيات',
  };

  return (
    <section
      id="properties"
      ref={sectionRef}
      className="relative min-h-screen bg-[#0B0F17] py-20 overflow-hidden"
    >
      {/* Header */}
      <div className="container-custom mb-12">
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

      {/* Main Showcase */}
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image Side */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${isRTL ? 'translate-x-12' : '-translate-x-12'}`}`}>
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
              {propertyShowcaseConfig.properties.map((property, index) => (
                <div
                  key={property.id}
                  className={`absolute inset-0 transition-all duration-700 ${
                    index === activeIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                  }`}
                >
                  <img
                    src={property.image}
                    alt={language === 'fr' ? property.name : property.nameAr}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 ${property.glowColor} mix-blend-overlay`} />
                </div>
              ))}
              
              {/* Navigation arrows */}
              <button
                onClick={prevProperty}
                className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-10 h-10 bg-[#0B0F17]/80 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-[#D4A14C] hover:border-[#D4A14C] hover:text-[#0B0F17] transition-all duration-300`}
                aria-label="Previous property"
              >
                <ChevronLeft className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
              </button>
              <button
                onClick={nextProperty}
                className={`absolute ${isRTL ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 w-10 h-10 bg-[#0B0F17]/80 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-[#D4A14C] hover:border-[#D4A14C] hover:text-[#0B0F17] transition-all duration-300`}
                aria-label="Next property"
              >
                <ChevronRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
              </button>

              {/* Location badge */}
              <div className={`absolute bottom-4 ${isRTL ? 'right-4' : 'left-4'} bg-[#0B0F17]/90 backdrop-blur-sm px-4 py-2 rounded-sm border border-white/10`}>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#D4A14C]" />
                  <span className="text-white text-sm font-medium">
                    {language === 'fr' ? activeProperty.location : activeProperty.locationAr}
                  </span>
                </div>
              </div>
            </div>

            {/* Thumbnail navigation */}
            <div className="flex gap-3 mt-4">
              {propertyShowcaseConfig.properties.map((property, index) => (
                <button
                  key={property.id}
                  onClick={() => setActiveIndex(index)}
                  className={`relative w-20 h-14 rounded-sm overflow-hidden transition-all duration-300 ${
                    index === activeIndex ? 'ring-2 ring-[#D4A14C]' : 'opacity-50 hover:opacity-80'
                  }`}
                >
                  <img
                    src={property.image}
                    alt={language === 'fr' ? property.name : property.nameAr}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Content Side */}
          <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${isRTL ? '-translate-x-12' : 'translate-x-12'}`}`}>
            {/* Type label */}
            <div className={`flex items-center gap-3 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className="text-[#D4A14C] text-xs uppercase tracking-[0.2em]">
                {language === 'fr' ? activeProperty.type : activeProperty.typeAr}
              </span>
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-white/40 text-xs">
                {String(activeIndex + 1).padStart(2, '0')} / {String(propertyShowcaseConfig.properties.length).padStart(2, '0')}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-serif text-4xl md:text-5xl text-white mb-2">
              {language === 'fr' ? activeProperty.name : activeProperty.nameAr}
            </h3>
            <p className="text-white/60 text-lg mb-6">
              {language === 'fr' ? activeProperty.subtitle : activeProperty.subtitleAr}
            </p>

            {/* Description */}
            <p className="text-white/70 leading-relaxed mb-8">
              {language === 'fr' ? activeProperty.description : activeProperty.descriptionAr}
            </p>

            {/* Features grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/5 border border-white/10 rounded-sm p-4">
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">{t.surface}</p>
                <p className="text-white font-medium">
                  {language === 'fr' ? activeProperty.surface : activeProperty.surfaceAr}
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-sm p-4">
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">{t.accessibility}</p>
                <p className="text-white font-medium">
                  {language === 'fr' ? activeProperty.accessibility : activeProperty.accessibilityAr}
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-sm p-4 col-span-2">
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">{t.potential}</p>
                <p className="text-white font-medium">
                  {language === 'fr' ? activeProperty.potential : activeProperty.potentialAr}
                </p>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={openWhatsApp}
              className={`group inline-flex items-center gap-3 px-8 py-3.5 text-sm font-medium tracking-wide transition-all duration-300 bg-[#D4A14C] text-[#0B0F17] hover:bg-[#e5b55d] hover:-translate-y-0.5 rounded-sm ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              {t.requestInfo}
              <ArrowRight className={`w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 ${isRTL ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* Features section */}
        <div className="grid md:grid-cols-3 gap-6 mt-20">
          {propertyShowcaseConfig.features.map((feature, index) => {
            const FeatureIcon = iconMap[feature.icon] || MapPin;
            return (
              <div
                key={index}
                className={`group p-6 bg-white/5 border border-white/10 rounded-sm hover:bg-white/10 hover:border-[#D4A14C]/30 transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${500 + index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-[#D4A14C]/10 rounded-sm flex items-center justify-center mb-4 group-hover:bg-[#D4A14C]/20 transition-colors">
                  <FeatureIcon className="w-6 h-6 text-[#D4A14C]" />
                </div>
                <h4 className="text-white font-medium mb-2">
                  {language === 'fr' ? feature.title : feature.titleAr}
                </h4>
                <p className="text-white/60 text-sm">
                  {language === 'fr' ? feature.description : feature.descriptionAr}
                </p>
              </div>
            );
          })}
        </div>

        {/* Quote */}
        {propertyShowcaseConfig.quote.text && (
          <div className={`mt-20 text-center max-w-2xl mx-auto transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-[#D4A14C] text-sm uppercase tracking-[0.2em] mb-4">
              {language === 'fr' ? propertyShowcaseConfig.quote.prefix : propertyShowcaseConfig.quote.prefixAr}
            </p>
            <blockquote className="font-serif text-2xl md:text-3xl text-white/90 italic leading-relaxed">
              "{language === 'fr' ? propertyShowcaseConfig.quote.text : propertyShowcaseConfig.quote.textAr}"
            </blockquote>
            <p className="text-white/50 mt-4 text-sm">— {propertyShowcaseConfig.quote.attribution}</p>
          </div>
        )}
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
