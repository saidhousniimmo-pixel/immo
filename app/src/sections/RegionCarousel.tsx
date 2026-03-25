import { useState, useRef, useEffect } from 'react';
import { MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { regionCarouselConfig } from '../config';
import { useLanguage } from '../contexts/LanguageContext';

export function RegionCarousel() {
  if (!regionCarouselConfig.mainTitle) return null;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
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

  useEffect(() => {
    if (isAutoPlaying && isVisible) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % regionCarouselConfig.slides.length);
      }, 6000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, isVisible]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev + 1) % regionCarouselConfig.slides.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev - 1 + regionCarouselConfig.slides.length) % regionCarouselConfig.slides.length);
  };

  const t = {
    script: language === 'fr' ? regionCarouselConfig.scriptText : regionCarouselConfig.scriptTextAr,
    subtitle: language === 'fr' ? regionCarouselConfig.subtitle : regionCarouselConfig.subtitleAr,
    title: language === 'fr' ? regionCarouselConfig.mainTitle : regionCarouselConfig.mainTitleAr,
    locationTag: language === 'fr' ? regionCarouselConfig.locationTag : regionCarouselConfig.locationTagAr,
  };

  return (
    <section
      id="regions"
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
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <h2 className={`font-serif text-4xl md:text-5xl lg:text-6xl text-white mt-4 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {t.title}
          </h2>
          
          {/* Location tag */}
          <div className={`flex items-center gap-2 text-white/60 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <MapPin className="w-4 h-4 text-[#D4A14C]" />
            <span className="text-sm">{t.locationTag}</span>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div className="container-custom">
        <div className={`relative transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {/* Main image */}
          <div className="relative aspect-[21/9] rounded-sm overflow-hidden">
            {regionCarouselConfig.slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-1000 ${
                  index === activeIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                }`}
              >
                <img
                  src={slide.image}
                  alt={language === 'fr' ? slide.title : slide.titleAr}
                  className="w-full h-full object-cover"
                />
                {/* Ken Burns effect for active slide */}
                {index === activeIndex && (
                  <div className="absolute inset-0 animate-kenburns">
                    <img
                      src={slide.image}
                      alt=""
                      className="w-full h-full object-cover scale-110"
                    />
                  </div>
                )}
              </div>
            ))}
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F17]/60 via-transparent to-[#0B0F17]/60" />

            {/* Navigation arrows */}
            <button
              onClick={prevSlide}
              className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-12 h-12 bg-[#0B0F17]/80 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-[#D4A14C] hover:border-[#D4A14C] hover:text-[#0B0F17] transition-all duration-300`}
              aria-label="Previous slide"
            >
              <ChevronLeft className={`w-6 h-6 ${isRTL ? 'rotate-180' : ''}`} />
            </button>
            <button
              onClick={nextSlide}
              className={`absolute ${isRTL ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 w-12 h-12 bg-[#0B0F17]/80 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-[#D4A14C] hover:border-[#D4A14C] hover:text-[#0B0F17] transition-all duration-300`}
              aria-label="Next slide"
            >
              <ChevronRight className={`w-6 h-6 ${isRTL ? 'rotate-180' : ''}`} />
            </button>

            {/* Slide indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {regionCarouselConfig.slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setActiveIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'w-8 bg-[#D4A14C]' : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Slide info cards */}
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {regionCarouselConfig.slides.map((slide, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setActiveIndex(index);
                }}
                className={`text-left p-6 border rounded-sm transition-all duration-500 ${
                  index === activeIndex 
                    ? 'bg-white/10 border-[#D4A14C]/50' 
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${500 + index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-serif text-xl text-white">
                    {language === 'fr' ? slide.title : slide.titleAr}
                  </h4>
                  <span className="text-[#D4A14C] text-sm">
                    {slide.area} {language === 'fr' ? slide.unit : slide.unitAr}
                  </span>
                </div>
                <p className="text-white/50 text-sm mb-3">
                  {language === 'fr' ? slide.subtitle : slide.subtitleAr}
                </p>
                <p className="text-white/70 text-sm line-clamp-2">
                  {language === 'fr' ? slide.description : slide.descriptionAr}
                </p>
              </button>
            ))}
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
