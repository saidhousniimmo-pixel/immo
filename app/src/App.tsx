import { useState, useCallback, useEffect } from 'react';
import { Navigation } from './sections/Navigation';
import { Hero } from './sections/Hero';
import { PropertyShowcase } from './sections/PropertyShowcase';
import { RegionCarousel } from './sections/RegionCarousel';
import { About } from './sections/About';
import { Testimonials } from './sections/Testimonials';
import { ContactForm } from './sections/ContactForm';
import { Footer } from './sections/Footer';
import { Preloader } from './components/Preloader';
import { ScrollToTop } from './components/ScrollToTop';
import { WhatsAppButton } from './components/WhatsAppButton';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Check if we're on the admin page
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/admin' || path === '/admin/') {
      setIsAdmin(true);
    }
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleAdminLogin = useCallback(() => {
    setIsAdminLoggedIn(true);
  }, []);

  const handleAdminLogout = useCallback(() => {
    setIsAdminLoggedIn(false);
  }, []);

  // Prevent scroll during loading
  useEffect(() => {
    if (isLoading && !isAdmin) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading, isAdmin]);

  // Admin route
  if (isAdmin) {
    return (
      <LanguageProvider>
        {isAdminLoggedIn ? (
          <AdminDashboard onLogout={handleAdminLogout} />
        ) : (
          <AdminLogin onLogin={handleAdminLogin} />
        )}
      </LanguageProvider>
    );
  }

  // Main website
  return (
    <LanguageProvider>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}

      <div className={`min-h-screen bg-[#0B0F17] ${isLoading ? 'overflow-hidden max-h-screen' : ''}`}>
        <Navigation />

        <main>
          <Hero isReady={!isLoading} />
          <PropertyShowcase />
          <RegionCarousel />
          <About />
          <Testimonials />
          <ContactForm />
        </main>

        <Footer />
        <ScrollToTop />
        <WhatsAppButton />
      </div>
    </LanguageProvider>
  );
}

export default App;
