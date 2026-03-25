import { useState, useEffect, useRef } from 'react';
import { Send, CheckCircle, AlertCircle, MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { contactFormConfig, phoneConfig } from '../config';
import { useLanguage } from '../contexts/LanguageContext';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MapPin, Phone, Mail, Clock,
};

export function ContactForm() {
  if (!contactFormConfig.mainTitle) return null;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    visitDate: '',
    visitors: 'Agricole',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', visitDate: '', visitors: 'Agricole', message: '' });
    } catch {
      setStatus('error');
    }

    setIsSubmitting(false);
    setTimeout(() => setStatus('idle'), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
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

  const t = {
    script: language === 'fr' ? contactFormConfig.scriptText : contactFormConfig.scriptTextAr,
    subtitle: language === 'fr' ? contactFormConfig.subtitle : contactFormConfig.subtitleAr,
    title: language === 'fr' ? contactFormConfig.mainTitle : contactFormConfig.mainTitleAr,
    intro: language === 'fr' ? contactFormConfig.introText : contactFormConfig.introTextAr,
    infoTitle: language === 'fr' ? contactFormConfig.contactInfoTitle : contactFormConfig.contactInfoTitleAr,
    whatsappTitle: language === 'fr' ? 'WhatsApp Direct' : 'واتساب مباشر',
    whatsappDesc: language === 'fr' 
      ? 'Réponse rapide garantie. Discutez directement avec Said HOUSNI.'
      : 'رد سريع مضمون. تحدث مباشرة مع سعيد حسني.',
    whatsappBtn: language === 'fr' ? 'Démarrer la conversation' : 'ابدأ المحادثة',
    callBtn: language === 'fr' ? 'Appeler maintenant' : 'اتصل الآن',
  };

  const form = contactFormConfig.form;
  const visitorOptions = language === 'fr' ? form.visitorsOptions : form.visitorsOptionsAr;

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-20 overflow-hidden bg-[#F4F1EA]"
    >
      <div className="container-custom relative">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="font-script text-3xl text-[#D4A14C] block mb-2">{t.script}</span>
          <span className="text-[#0B0F17]/60 text-xs uppercase tracking-[0.2em] mb-4 block">
            {t.subtitle}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#0B0F17] mb-4">
            {t.title}
          </h2>
          {t.intro && (
            <p className="text-[#0B0F17]/70 max-w-2xl mx-auto">
              {t.intro}
            </p>
          )}
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className={`transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${isRTL ? '-translate-x-12' : 'translate-x-12'}`}`}>
              {t.infoTitle && (
                <h3 className="font-serif text-2xl text-[#0B0F17] mb-6">{t.infoTitle}</h3>
              )}
              <div className="space-y-4" role="list" aria-label="Contact information">
                {contactFormConfig.contactInfo.map((item) => {
                  const IconComponent = iconMap[item.icon];
                  const isWhatsApp = item.label.includes('WhatsApp');
                  const isPhone = item.icon === 'Phone';
                  return (
                    <div
                      key={item.label}
                      onClick={isPhone ? handleCall : isWhatsApp ? openWhatsApp : undefined}
                      className={`flex items-start gap-4 p-4 bg-white rounded-lg border border-[#0B0F17]/10 hover:border-[#D4A14C]/50 transition-all ${isPhone || isWhatsApp ? 'cursor-pointer' : ''} ${isPhone ? 'hover:bg-[#D4A14C]/5' : ''} ${isWhatsApp ? 'hover:bg-[#25D366]/5' : ''}`}
                      role="listitem"
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isWhatsApp ? 'bg-[#25D366]/10' : isPhone ? 'bg-[#D4A14C]/10' : 'bg-[#D4A14C]/10'}`}>
                        {isWhatsApp ? (
                          <MessageCircle className="w-5 h-5 text-[#25D366]" />
                        ) : (
                          IconComponent && <IconComponent className={`w-5 h-5 ${isPhone ? 'text-[#D4A14C]' : 'text-[#D4A14C]'}`} />
                        )}
                      </div>
                      <div>
                        <p className="text-xs text-[#0B0F17]/60 uppercase tracking-wider mb-1">
                          {language === 'fr' ? item.label : item.labelAr}
                        </p>
                        <p className="text-[#0B0F17] font-medium">{item.value}</p>
                        <p className="text-sm text-[#0B0F17]/60">
                          {language === 'fr' ? item.subtext : item.subtextAr}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick WhatsApp CTA */}
            <div className={`p-6 bg-[#25D366]/10 border border-[#25D366]/30 rounded-lg transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${isRTL ? '-translate-x-12' : 'translate-x-12'}`}`}>
              <div className={`flex items-center gap-3 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <MessageCircle className="w-6 h-6 text-[#25D366]" />
                <h4 className="font-medium text-[#0B0F17]">{t.whatsappTitle}</h4>
              </div>
              <p className="text-[#0B0F17]/70 text-sm mb-4">{t.whatsappDesc}</p>
              <button
                onClick={openWhatsApp}
                className="w-full py-3 bg-[#25D366] text-white rounded-lg font-medium hover:bg-[#128C7E] transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                {t.whatsappBtn}
              </button>
            </div>

            {/* Click to Call CTA */}
            <div className={`p-6 bg-[#D4A14C]/10 border border-[#D4A14C]/30 rounded-lg transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${isRTL ? '-translate-x-12' : 'translate-x-12'}`}`}>
              <div className={`flex items-center gap-3 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Phone className="w-6 h-6 text-[#D4A14C]" />
                <h4 className="font-medium text-[#0B0F17]">{language === 'fr' ? 'Appel Direct' : 'اتصال مباشر'}</h4>
              </div>
              <p className="text-[#0B0F17]/70 text-sm mb-4">
                {language === 'fr' ? 'Appelez-nous directement au ' : 'اتصل بنا مباشرة على '} {phoneConfig.displayNumber}
              </p>
              <button
                onClick={handleCall}
                className="w-full py-3 bg-[#D4A14C] text-[#0B0F17] rounded-lg font-medium hover:bg-[#e5b55d] transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                {t.callBtn}
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className={`bg-white rounded-lg border border-[#0B0F17]/10 p-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${isRTL ? 'translate-x-12' : '-translate-x-12'}`}`}>
              {status === 'success' ? (
                <div className="text-center py-12" role="alert">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="font-serif text-2xl text-[#0B0F17] mb-2">
                    {language === 'fr' ? form.successMessage : form.successMessageAr}
                  </h3>
                </div>
              ) : status === 'error' ? (
                <div className="text-center py-12" role="alert">
                  <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  <h3 className="font-serif text-2xl text-[#0B0F17] mb-2">
                    {language === 'fr' ? form.errorMessage : form.errorMessageAr}
                  </h3>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label htmlFor="contact-name" className="block text-sm text-[#0B0F17]/80 mb-2">
                        {language === 'fr' ? form.nameLabel : form.nameLabelAr} <span className="text-[#D4A14C]">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder={language === 'fr' ? form.namePlaceholder : form.namePlaceholderAr}
                        autoComplete="name"
                        className="w-full px-4 py-3 bg-[#F4F1EA] border border-[#0B0F17]/10 rounded-sm text-[#0B0F17] placeholder-[#0B0F17]/40 focus:outline-none focus:border-[#D4A14C] transition-colors"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="contact-phone" className="block text-sm text-[#0B0F17]/80 mb-2">
                        {language === 'fr' ? form.phoneLabel : form.phoneLabelAr} <span className="text-[#D4A14C]">*</span>
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder={language === 'fr' ? form.phonePlaceholder : form.phonePlaceholderAr}
                        autoComplete="tel"
                        className="w-full px-4 py-3 bg-[#F4F1EA] border border-[#0B0F17]/10 rounded-sm text-[#0B0F17] placeholder-[#0B0F17]/40 focus:outline-none focus:border-[#D4A14C] transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="contact-email" className="block text-sm text-[#0B0F17]/80 mb-2">
                        {language === 'fr' ? form.emailLabel : form.emailLabelAr} <span className="text-[#D4A14C]">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder={language === 'fr' ? form.emailPlaceholder : form.emailPlaceholderAr}
                        autoComplete="email"
                        className="w-full px-4 py-3 bg-[#F4F1EA] border border-[#0B0F17]/10 rounded-sm text-[#0B0F17] placeholder-[#0B0F17]/40 focus:outline-none focus:border-[#D4A14C] transition-colors"
                      />
                    </div>

                    {/* Visit Date */}
                    <div>
                      <label htmlFor="contact-date" className="block text-sm text-[#0B0F17]/80 mb-2">
                        {language === 'fr' ? form.visitDateLabel : form.visitDateLabelAr} <span className="text-[#D4A14C]">*</span>
                      </label>
                      <input
                        id="contact-date"
                        type="date"
                        name="visitDate"
                        value={formData.visitDate}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-[#F4F1EA] border border-[#0B0F17]/10 rounded-sm text-[#0B0F17] focus:outline-none focus:border-[#D4A14C] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Project Type */}
                  <div>
                    <label htmlFor="contact-visitors" className="block text-sm text-[#0B0F17]/80 mb-2">
                      {language === 'fr' ? form.visitorsLabel : form.visitorsLabelAr}
                    </label>
                    <select
                      id="contact-visitors"
                      name="visitors"
                      value={formData.visitors}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#F4F1EA] border border-[#0B0F17]/10 rounded-sm text-[#0B0F17] focus:outline-none focus:border-[#D4A14C] transition-colors"
                    >
                      {visitorOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="contact-message" className="block text-sm text-[#0B0F17]/80 mb-2">
                      {language === 'fr' ? form.messageLabel : form.messageLabelAr}
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder={language === 'fr' ? form.messagePlaceholder : form.messagePlaceholderAr}
                      className="w-full px-4 py-3 bg-[#F4F1EA] border border-[#0B0F17]/10 rounded-sm text-[#0B0F17] placeholder-[#0B0F17]/40 focus:outline-none focus:border-[#D4A14C] transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#D4A14C] text-[#0B0F17] rounded-sm font-medium hover:bg-[#e5b55d] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-[#0B0F17]/30 border-t-[#0B0F17] rounded-full animate-spin" />
                        {language === 'fr' ? form.submittingText : form.submittingTextAr}
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        {language === 'fr' ? form.submitText : form.submitTextAr}
                      </>
                    )}
                  </button>

                  {contactFormConfig.privacyNotice && (
                    <p className="text-xs text-[#0B0F17]/50 text-center">
                      {language === 'fr' ? contactFormConfig.privacyNotice : contactFormConfig.privacyNoticeAr}
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
