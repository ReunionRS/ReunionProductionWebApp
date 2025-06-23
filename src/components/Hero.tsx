import { ArrowDown } from 'lucide-react';

const HeroCinematic = () => {
  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="https://reunionrs.github.io/VideoToImperial/0000-02020_2.mp4" type="video/mp4" />
      </video>

      {/* Star Wars inspired cinematic overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-blue-900/20 to-black/70"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-900/10 to-transparent"></div>
      
      {/* Subtle Empire-inspired red accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-red-900/20"></div>
      
      <div className="relative z-10 text-center px-6">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight mb-8 animate-fade-in text-white drop-shadow-2xl">
          Reunion
          <br />
          <span className="text-blue-100">Production</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-blue-100/90 max-w-2xl mx-auto mb-16 animate-fade-in-up drop-shadow-lg">
          Создаём визуальные истории, которые остаются в памяти
        </p>

        <button 
          onClick={scrollToProjects}
          className="group inline-flex items-center justify-center w-16 h-16 rounded-full border border-blue-300/40 hover:border-blue-300/70 hover:bg-blue-500/20 transition-all duration-300 animate-scale-in backdrop-blur-sm"
        >
          <ArrowDown className="w-6 h-6 text-blue-100 group-hover:translate-y-1 transition-transform duration-300" />
        </button>
      </div>

      {/* Scroll indicator with blue accent */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-px h-16 bg-gradient-to-b from-blue-300/0 via-blue-300/50 to-blue-300/0"></div>
      </div>

      {/* Subtle light effects */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-red-400/10 rounded-full blur-2xl"></div>
      </div>
    </section>
  );
};

export default HeroCinematic;