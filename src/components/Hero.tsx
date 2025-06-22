
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/50"></div>
      
      <div className="relative z-10 text-center px-6">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight mb-8 animate-fade-in">
          Reunion
          <br />
          Production
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-16 animate-fade-in-up">
          Создаём визуальные истории, которые остаются в памяти
        </p>

        <button 
          onClick={scrollToProjects}
          className="group inline-flex items-center justify-center w-16 h-16 rounded-full border border-white/20 hover:border-white/40 transition-all duration-300 animate-scale-in"
        >
          <ArrowDown className="w-6 h-6 group-hover:translate-y-1 transition-transform duration-300" />
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-px h-16 bg-gradient-to-b from-white/0 via-white/40 to-white/0"></div>
      </div>
    </section>
  );
};

export default Hero;
