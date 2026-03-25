import { useState } from 'react';
import { Home, MapPin, Phone, Mail, Instagram, Facebook, MessageCircle, ArrowUp, CheckCircle } from 'lucide-react';
import { footerConfig } from '../config';
import { useLanguage } from '../contexts/LanguageContext';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Home, MapPin, Phone, Mail, Instagram, Facebook, MessageCircle, ArrowUp,
};

export function Footer() {
  if (!footerConfig.brandName) return null;

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { language, isRTL } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setNewsletterStatus('success');
      setNewsletterEmail('');
    } catch {
      setNewsletterStatus('error');
    }

    setTimeout(() => setNewsletterStatus('idle'), 4000);
  };

  const t = {
    newsletter: language === 'fr' ? footerConfig.newsletterLabel : footerConfig.newsletterLabelAr,
    newsletterPlaceholder: language === 'fr' ? footerConfig.newsletterPlaceholder : footerConfig.newsletterPlaceholderAr,
    newsletterButton: language === 'fr' ? footerConfig.newsletterButtonText : footerConfig.newsletterButtonTextAr,
    backToTop: language === 'fr' ? footerConfig.backToTopText : footerConfig.backToTopTextAr,
  };

  return (
    <footer className="relative bg-[#0B0F17] border-t border-white/10" role="contentinfo">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              {footerConfig.logo ? (
                <img 
                  src={footerConfig.logo} 
                  alt="SH Real Estate" 
                  className="h-16 w-auto"
                />
              ) : (
                <div className="w-10 h-10 rounded-full border-2 border-[#D4A14C] flex items-center justify-center">
                  <Home className="w-5 h-5 text-[#D4A14C]" aria-hidden="true" />
                </div>
              )}
            </div>
            {footerConfig.description && (
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                {language === 'fr' ? footerConfig.description : footerConfig.descriptionAr}
              </p>
            )}
            {/* Social Links */}
            {footerConfig.socialLinks.length > 0 && (
              <nav aria-label="Social media links">
                <div className="flex gap-3">
                  {footerConfig.socialLinks.map((social) => {
                    const IconComponent = iconMap[social.icon];
                    const isSnapchat = social.label === 'Snapchat';
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className={`w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 ${
                          isSnapchat 
                            ? 'text-[#FFFC00] hover:bg-[#FFFC00] hover:border-[#FFFC00] hover:text-[#0B0F17]' 
                            : 'text-white/60 hover:bg-[#D4A14C] hover:border-[#D4A14C] hover:text-[#0B0F17]'
                        }`}
                      >
                        {IconComponent && <IconComponent className="w-4 h-4" />}
                      </a>
                    );
                  })}
                </div>
              </nav>
            )}
          </div>

          {/* Link Groups */}
          {footerConfig.linkGroups.map((group, index) => (
            <nav key={index} aria-label={language === 'fr' ? group.title : group.titleAr}>
              <h3 className="font-serif text-lg text-white mb-5">
                {language === 'fr' ? group.title : group.titleAr}
              </h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-white/70 text-sm hover:text-[#D4A14C] transition-colors"
                    >
                      {language === 'fr' ? link.name : link.nameAr}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact Info + Newsletter */}
          <div>
            <h3 className="font-serif text-lg text-white mb-5">
              {language === 'fr' ? 'Contact' : 'اتصال'}
            </h3>
            {footerConfig.contactItems.length > 0 && (
              <ul className="space-y-4 mb-6">
                {footerConfig.contactItems.map((item, index) => {
                  const IconComponent = iconMap[item.icon];
                  return (
                    <li key={index} className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      {IconComponent && <IconComponent className="w-4 h-4 text-[#D4A14C] mt-0.5 flex-shrink-0" aria-hidden="true" />}
                      <span className="text-white/70 text-sm">{item.text}</span>
                    </li>
                  );
                })}
              </ul>
            )}

            {/* Newsletter */}
            {footerConfig.newsletterLabel && (
              <div className="pt-6 border-t border-white/10">
                <p className="text-white/70 text-sm mb-3">{t.newsletter}</p>
                {newsletterStatus === 'success' ? (
                  <div className="flex items-center gap-2 text-green-400 text-sm">
                    <CheckCircle className="w-4 h-4" />
                    <span>{footerConfig.newsletterSuccessText}</span>
                  </div>
                ) : (
                  <form onSubmit={handleNewsletter} className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <label htmlFor="newsletter-email" className="sr-only">{t.newsletter}</label>
                    <input
                      id="newsletter-email"
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder={t.newsletterPlaceholder}
                      required
                      autoComplete="email"
                      className="flex-1 px-3 py-2 bg-white/5 border border-white/20 rounded-sm text-white text-sm placeholder-white/40 focus:outline-none focus:border-[#D4A14C] transition-colors"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#D4A14C] text-[#0B0F17] text-sm rounded-sm hover:bg-[#e5b55d] transition-colors font-medium"
                    >
                      {t.newsletterButton}
                    </button>
                  </form>
                )}
                {newsletterStatus === 'error' && (
                  <p className="text-red-400 text-xs mt-2">{footerConfig.newsletterErrorText}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className={`flex flex-wrap items-center justify-center gap-4 text-white/50 text-xs ${isRTL ? 'flex-row-reverse' : ''}`}>
            {footerConfig.copyrightText && (
              <span>{footerConfig.copyrightText}</span>
            )}
            {footerConfig.legalLinks.map((link, index) => (
              <span key={index}>
                <span className="hidden md:inline">|</span>
                <button className="hover:text-[#D4A14C] transition-colors ml-2 md:ml-0">{link}</button>
              </span>
            ))}
            {footerConfig.icpText && (
              <>
                <span className="hidden md:inline">|</span>
                <span>{footerConfig.icpText}</span>
              </>
            )}
          </div>

          {/* Back to Top */}
          {footerConfig.backToTopText && (
            <button
              onClick={scrollToTop}
              className={`flex items-center gap-2 text-white/70 text-sm hover:text-[#D4A14C] transition-colors group ${isRTL ? 'flex-row-reverse' : ''}`}
              aria-label={t.backToTop}
            >
              <span>{t.backToTop}</span>
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#D4A14C] group-hover:bg-[#D4A14C] transition-all duration-300">
                <ArrowUp className={`w-4 h-4 group-hover:text-[#0B0F17] ${isRTL ? 'rotate-180' : ''}`} />
              </div>
            </button>
          )}
        </div>
      </div>
    </footer>
  );
}
