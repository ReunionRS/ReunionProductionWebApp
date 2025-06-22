
import { useState, useEffect } from 'react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/90 backdrop-blur-sm' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div 
            className="text-xl font-medium tracking-tight cursor-pointer"
            onClick={() => scrollToSection('hero')}
          >
            Reunion Production
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('about')}
              className="text-muted-foreground hover:text-white transition-colors duration-300"
            >
              О нас
            </button>
            <button 
              onClick={() => scrollToSection('projects')}
              className="text-muted-foreground hover:text-white transition-colors duration-300"
            >
              Проекты
            </button>
            <button 
              onClick={() => scrollToSection('support')}
              className="text-muted-foreground hover:text-white transition-colors duration-300"
            >
              Поддержать
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-muted-foreground hover:text-white transition-colors duration-300"
            >
              Контакты
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden w-6 h-6 flex flex-col justify-center items-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
              isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
            }`}></span>
            <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
              isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}></span>
            <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
              isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'
            }`}></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-out ${
          isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          <nav className="flex flex-col space-y-4 pt-6 pb-2">
            <button 
              onClick={() => scrollToSection('about')}
              className="text-muted-foreground hover:text-white transition-colors duration-300 text-left"
            >
              О нас
            </button>
            <button 
              onClick={() => scrollToSection('projects')}
              className="text-muted-foreground hover:text-white transition-colors duration-300 text-left"
            >
              Проекты
            </button>
            <button 
              onClick={() => scrollToSection('support')}
              className="text-muted-foreground hover:text-white transition-colors duration-300 text-left"
            >
              Поддержать
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-muted-foreground hover:text-white transition-colors duration-300 text-left"
            >
              Контакты
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
