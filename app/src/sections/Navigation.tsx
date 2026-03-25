import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Home, MapPin, Users, Mail, MessageCircle, Globe, Phone } from 'lucide-react';
import { navigationConfig, phoneConfig } from '../config';
import { useLanguage } from '../contexts/LanguageContext';

export function Navigation() {
  if (!navigationConfig.brandName) return null;

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { language, toggleLanguage, isRTL } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const openWhatsApp = () => {
    const message = language === 'fr' 
      ? "Bonjour, je suis intéressé par un terrain. Pouvez-vous m'en dire plus ?"
      : "مرحباً، أنا مهتم بقطعة أرض. هل يمكنك إخباري المزيد؟";
    window.open(`https://wa.me/212631800376?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleCall = () => {
    window.location.href = `tel:${phoneConfig.phoneNumber}`;
  };

  const navLinks = navigationConfig.navLinks;

  const t = {
    whatsapp: language === 'fr' ? 'WhatsApp' : 'واتساب',
    call: language === 'fr' ? 'Appeler' : 'اتصل',
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#0B0F17]/95 backdrop-blur-md py-3'
          : 'bg-transparent py-5'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollToSection('#hero')}
          className="flex items-center gap-3 group"
          aria-label={navigationConfig.brandName}
        >
          {navigationConfig.logo ? (
            <img 
              src={navigationConfig.logo} 
              alt="SH Real Estate" 
              className="h-12 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-10 h-10 rounded-full border-2 border-[#D4A14C] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <Home className="w-5 h-5 text-[#D4A14C]" aria-hidden="true" />
            </div>
          )}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8" role="menubar">
          {navLinks.map((link) => (
            <div
              key={link.name}
              className="relative"
              onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
              onMouseLeave={() => setActiveDropdown(null)}
              role="none"
            >
              <button
                onClick={() => !link.dropdown && scrollToSection(link.href)}
                className="flex items-center gap-1 text-sm text-white/80 hover:text-[#D4A14C] transition-colors duration-300 py-2"
                role="menuitem"
                aria-haspopup={link.dropdown ? 'true' : undefined}
                aria-expanded={link.dropdown ? activeDropdown === link.name : undefined}
              >
                {link.name}
                {link.dropdown && (
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                    activeDropdown === link.name ? 'rotate-180' : ''
                  }`} aria-hidden="true" />
                )}
              </button>

              {/* Dropdown Menu */}
              {link.dropdown && (
                <div
                  className={`absolute top-full ${isRTL ? 'right-0' : 'left-0'} pt-2 transition-all duration-300 ${
                    activeDropdown === link.name
                      ? 'opacity-100 visible translate-y-0'
                      : 'opacity-0 invisible -translate-y-2'
                  }`}
                  role="menu"
                >
                  <div className="bg-[#0B0F17]/95 backdrop-blur-md rounded-md overflow-hidden min-w-[180px] border border-white/10">
                    {link.dropdown.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => scrollToSection(item.href)}
                        className="block w-full text-left px-4 py-3 text-sm text-white/80 hover:bg-[#D4A14C]/20 hover:text-[#D4A14C] transition-colors"
                        role="menuitem"
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Side: Language + CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-2 text-sm text-white/80 hover:text-[#D4A14C] transition-colors duration-300 border border-white/20 rounded hover:border-[#D4A14C]/50"
            aria-label="Toggle language"
          >
            <Globe className="w-4 h-4" />
            <span>{language === 'fr' ? 'FR' : 'AR'}</span>
          </button>

          {/* Click to Call */}
          <button
            onClick={handleCall}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-300 bg-white/10 border border-white/30 text-white hover:bg-white/20 rounded"
            aria-label="Call"
          >
            <Phone className="w-4 h-4" />
            {t.call}
          </button>

          {/* WhatsApp CTA */}
          <button
            onClick={openWhatsApp}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium tracking-wide transition-all duration-300 bg-[#25D366] text-white rounded hover:bg-[#128C7E] hover:-translate-y-0.5"
          >
            <MessageCircle className="w-4 h-4" />
            {t.whatsapp}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 top-[72px] bg-[#0B0F17]/98 backdrop-blur-lg transition-all duration-500 ${
          isMobileMenuOpen
            ? 'opacity-100 visible'
            : 'opacity-0 invisible pointer-events-none'
        }`}
        role="menu"
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="container-custom py-8 flex flex-col gap-2">
          {/* Language Toggle Mobile */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-3 w-full py-4 text-lg text-white border-b border-white/10 hover:text-[#D4A14C] transition-colors"
          >
            <Globe className="w-5 h-5 text-[#D4A14C]" />
            {language === 'fr' ? 'Français' : 'العربية'}
          </button>

          {navLinks.map((link) => {
            const iconMap = { Home, MapPin, Users, Mail };
            const IconComponent = iconMap[link.icon as keyof typeof iconMap] || Home;
            return (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="flex items-center gap-3 w-full py-4 text-lg text-white border-b border-white/10 hover:text-[#D4A14C] transition-colors"
                role="menuitem"
              >
                <IconComponent className="w-5 h-5 text-[#D4A14C]" />
                {link.name}
              </button>
            );
          })}

          {/* Click to Call Mobile */}
          <button
            onClick={handleCall}
            className="flex items-center justify-center gap-2 bg-white/10 border border-white/30 text-white py-4 rounded mt-4"
          >
            <Phone className="w-5 h-5" />
            {t.call}
          </button>

          {/* WhatsApp CTA Mobile */}
          <button
            onClick={openWhatsApp}
            className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 rounded mt-2 font-medium"
          >
            <MessageCircle className="w-5 h-5" />
            {t.whatsapp}
          </button>
        </div>
      </div>
    </nav>
  );
}
