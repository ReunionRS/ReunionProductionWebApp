
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Support from '@/components/Support';
import Contact from '@/components/Contact';

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <Hero />
      <About />
      <Projects />
      <Support />
      <Contact />
    </div>
  );
};

export default Index;
