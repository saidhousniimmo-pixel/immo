import { useRef, useEffect, useState } from 'react';
import { Star, Quote } from 'lucide-react';
import { testimonialsConfig } from '../config';
import { useLanguage } from '../contexts/LanguageContext';

export function Testimonials() {
  if (!testimonialsConfig.mainTitle) return null;

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

  const t = {
    script: language === 'fr' ? testimonialsConfig.scriptText : testimonialsConfig.scriptTextAr,
    subtitle: language === 'fr' ? testimonialsConfig.subtitle : testimonialsConfig.subtitleAr,
    title: language === 'fr' ? testimonialsConfig.mainTitle : testimonialsConfig.mainTitleAr,
    testimonialsScript: language === 'fr' ? testimonialsConfig.testimonialsScriptText : testimonialsConfig.testimonialsScriptTextAr,
    testimonialsSubtitle: language === 'fr' ? testimonialsConfig.testimonialsSubtitle : testimonialsConfig.testimonialsSubtitleAr,
    testimonialsTitle: language === 'fr' ? testimonialsConfig.testimonialsMainTitle : testimonialsConfig.testimonialsMainTitleAr,
    storyScript: language === 'fr' ? testimonialsConfig.storyScriptText : testimonialsConfig.storyScriptTextAr,
    storySubtitle: language === 'fr' ? testimonialsConfig.storySubtitle : testimonialsConfig.storySubtitleAr,
    storyTitle: language === 'fr' ? testimonialsConfig.storyTitle : testimonialsConfig.storyTitleAr,
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative min-h-screen bg-[#0B0F17] py-20 overflow-hidden"
    >
      <div className="container-custom">
        {/* Success Stories */}
        <div className="mb-20">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="font-script text-3xl text-[#D4A14C]">{t.script}</span>
          </div>
          <div className={`transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-white/60 text-sm uppercase tracking-[0.2em] mt-4">{t.subtitle}</p>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <h2 className={`font-serif text-4xl md:text-5xl lg:text-6xl text-white mt-4 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {t.title}
            </h2>
          </div>

          {/* Stories grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {testimonialsConfig.articles.map((article, index) => (
              <div
                key={article.id}
                className={`group relative bg-white/5 border border-white/10 rounded-sm overflow-hidden hover:bg-white/10 hover:border-[#D4A14C]/30 transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={article.image}
                    alt={language === 'fr' ? article.title : article.titleAr}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className={`flex items-center gap-3 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="px-2 py-1 bg-[#D4A14C]/10 text-[#D4A14C] text-xs uppercase tracking-wider rounded-sm">
                      {language === 'fr' ? article.category : article.categoryAr}
                    </span>
                    <span className="text-white/40 text-xs">{article.date}</span>
                  </div>
                  <h4 className="font-serif text-xl text-white mb-2 group-hover:text-[#D4A14C] transition-colors">
                    {language === 'fr' ? article.title : article.titleAr}
                  </h4>
                  <p className="text-white/60 text-sm line-clamp-2">
                    {language === 'fr' ? article.excerpt : article.excerptAr}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <span className="font-script text-3xl text-[#D4A14C]">{t.testimonialsScript}</span>
            </div>
            <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="text-white/60 text-sm uppercase tracking-[0.2em] mt-4">{t.testimonialsSubtitle}</p>
            </div>
            <h3 className={`font-serif text-3xl md:text-4xl text-white mt-4 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {t.testimonialsTitle}
            </h3>
          </div>

          {/* Testimonials grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {testimonialsConfig.testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`relative p-6 bg-white/5 border border-white/10 rounded-sm transition-all duration-500 hover:bg-white/10 hover:border-[#D4A14C]/30 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${800 + index * 100}ms` }}
              >
                {/* Quote icon */}
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-[#D4A14C] rounded-full flex items-center justify-center">
                  <Quote className="w-4 h-4 text-[#0B0F17]" />
                </div>

                {/* Stars */}
                <div className={`flex gap-1 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < testimonial.rating ? 'text-[#D4A14C] fill-[#D4A14C]' : 'text-white/20'}`}
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-white/80 text-sm leading-relaxed mb-6">
                  "{language === 'fr' ? testimonial.text : testimonial.textAr}"
                </p>

                {/* Author */}
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-10 h-10 bg-[#D4A14C]/20 rounded-full flex items-center justify-center">
                    <span className="text-[#D4A14C] font-medium text-sm">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{testimonial.name}</p>
                    <p className="text-white/50 text-xs">
                      {language === 'fr' ? testimonial.role : testimonial.roleAr}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Story/Process section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className={`relative transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${isRTL ? 'translate-x-12' : '-translate-x-12'}`}`}>
            <div className="aspect-[4/3] rounded-sm overflow-hidden">
              <img
                src={testimonialsConfig.storyImage}
                alt={language === 'fr' ? testimonialsConfig.storyImageCaption : testimonialsConfig.storyImageCaptionAr}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Quote overlay */}
            <div className={`absolute -bottom-6 ${isRTL ? '-left-6' : '-right-6'} bg-[#0B0F17] border border-[#D4A14C]/30 p-6 max-w-xs rounded-sm`}>
              <p className="text-[#D4A14C] text-xs uppercase tracking-[0.2em] mb-2">
                {language === 'fr' ? testimonialsConfig.storyQuote.prefix : testimonialsConfig.storyQuote.prefixAr}
              </p>
              <blockquote className="font-serif text-white/90 italic text-sm">
                "{language === 'fr' ? testimonialsConfig.storyQuote.text : testimonialsConfig.storyQuote.textAr}"
              </blockquote>
              <p className="text-white/50 mt-2 text-xs">— {testimonialsConfig.storyQuote.attribution}</p>
            </div>
          </div>

          {/* Content */}
          <div className={`transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${isRTL ? '-translate-x-12' : 'translate-x-12'}`}`}>
            <span className="font-script text-2xl text-[#D4A14C]">{t.storyScript}</span>
            <p className="text-white/60 text-sm uppercase tracking-[0.2em] mt-4">{t.storySubtitle}</p>
            <h3 className="font-serif text-3xl md:text-4xl text-white mt-4 mb-6">{t.storyTitle}</h3>
            
            {(language === 'fr' ? testimonialsConfig.storyParagraphs : testimonialsConfig.storyParagraphsAr).map((paragraph, index) => (
              <p key={index} className="text-white/70 leading-relaxed mb-4">{paragraph}</p>
            ))}

            {/* Timeline */}
            <div className="grid grid-cols-4 gap-4 mt-8">
              {testimonialsConfig.storyTimeline.map((item, index) => (
                <div key={index} className="text-center p-4 bg-white/5 border border-white/10 rounded-sm">
                  <span className="font-serif text-2xl text-[#D4A14C]">{item.value}</span>
                  <p className="text-white/60 text-xs mt-1">
                    {language === 'fr' ? item.label : item.labelAr}
                  </p>
                </div>
              ))}
            </div>
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
