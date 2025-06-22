
const About = () => {
  return (
    <section id="about" className="min-h-screen flex items-center bg-black">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight">
                О нас
              </h2>
              
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Мы — фанатское объединение, которое воплощает в жизнь истории 
                  из любимых вселенных с профессиональным подходом.
                </p>
                
                <p>
                  Наша страсть к кинематографу и преданность легендарным франшизам 
                  вдохновляет нас создавать качественный фан-контент, который 
                  достоин оригинальных произведений.
                </p>
                
                <p>
                  От концепции до постпродакшена — мы подходим к каждому проекту 
                  с вниманием к деталям и уважением к исходному материалу.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-blue-600/10 to-red-600/10 rounded-lg flex items-center justify-center">
                <div className="text-6xl md:text-8xl font-light text-white/20">
                  R
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
