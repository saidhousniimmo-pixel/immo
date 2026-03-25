import { useState, useEffect } from 'react';
import { MessageCircle, X, Phone } from 'lucide-react';
import { whatsAppConfig, phoneConfig } from '../config';
import { useLanguage } from '../contexts/LanguageContext';

export function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { language, isRTL } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsAppClick = () => {
    const message = language === 'fr' ? whatsAppConfig.message : whatsAppConfig.messageAr;
    window.open(`https://wa.me/${whatsAppConfig.phoneNumber.replace(/\+/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleCallClick = () => {
    window.location.href = `tel:${phoneConfig.phoneNumber}`;
  };

  const t = {
    title: language === 'fr' ? 'WhatsApp' : 'واتساب',
    subtitle: language === 'fr' ? 'Réponse sous 24h' : 'رد خلال 24 ساعة',
    greeting: language === 'fr' 
      ? "Bonjour ! Comment pouvons-nous vous aider aujourd'hui ?"
      : "مرحباً! كيف يمكننا مساعدتك اليوم؟",
    startChat: language === 'fr' ? 'Démarrer la conversation' : 'ابدأ المحادثة',
    callNow: language === 'fr' ? 'Appeler maintenant' : 'اتصل الآن',
  };

  const positionClass = whatsAppConfig.position === 'right' 
    ? (isRTL ? 'left-6' : 'right-6')
    : (isRTL ? 'right-6' : 'left-6');

  return (
    <>
      {/* Floating WhatsApp Button */}
      <div
        className={`fixed bottom-6 ${positionClass} z-50 transition-all duration-500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
        }`}
      >
        {/* Chat Popup */}
        {isOpen && (
          <div className={`absolute bottom-16 ${whatsAppConfig.position === 'right' ? (isRTL ? 'left-0' : 'right-0') : (isRTL ? 'right-0' : 'left-0')} w-72 bg-white rounded-2xl shadow-2xl overflow-hidden mb-2 animate-in fade-in slide-in-from-bottom-4 duration-300`}>
            <div className="bg-[#25D366] p-4 flex items-center justify-between">
              <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{t.title}</p>
                  <p className="text-white/80 text-xs">{t.subtitle}</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 bg-gray-50">
              <p className="text-gray-600 text-sm mb-4">{t.greeting}</p>
              
              {/* WhatsApp Button */}
              <button
                onClick={handleWhatsAppClick}
                className="w-full bg-[#25D366] text-white py-3 px-4 rounded-xl font-medium text-sm hover:bg-[#128C7E] transition-colors flex items-center justify-center gap-2 mb-2"
              >
                <MessageCircle className="w-4 h-4" />
                {t.startChat}
              </button>
              
              {/* Call Button */}
              <button
                onClick={handleCallClick}
                className="w-full bg-[#D4A14C] text-[#0B0F17] py-3 px-4 rounded-xl font-medium text-sm hover:bg-[#e5b55d] transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                {t.callNow}
              </button>
            </div>
          </div>
        )}

        {/* Main Button */}
        <button
          onClick={() => isOpen ? handleWhatsAppClick() : setIsOpen(true)}
          className="group relative w-14 h-14 bg-[#25D366] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
          aria-label="Contact via WhatsApp"
        >
          {/* Pulse animation */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
          
          {/* Icon */}
          <MessageCircle className="w-7 h-7 text-white relative z-10" />
          
          {/* Tooltip */}
          <span className={`absolute ${whatsAppConfig.position === 'right' ? (isRTL ? 'left-full ml-3' : 'right-full mr-3') : (isRTL ? 'right-full mr-3' : 'left-full ml-3')} top-1/2 -translate-y-1/2 bg-[#0B0F17] text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}>
            {language === 'fr' ? 'Discuter sur WhatsApp' : 'تحدث على واتساب'}
          </span>
        </button>
      </div>
    </>
  );
}
