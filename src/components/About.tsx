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

            <div className="relative group">
              {/* Основной контейнер с анимированными градиентами */}
              <div className="relative aspect-square rounded-lg flex items-center justify-center p-4 overflow-hidden bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-red-600/10 bg-300% animate-gradient-shift">
                
                {/* Вращающийся фоновый градиент */}
                <div className="absolute inset-2 bg-gradient-to-r from-blue-500/10 via-purple-500/15 via-red-500/10 to-blue-500/10 rounded-lg animate-spin-slow"></div>
                
                {/* Пульсирующий overlay */}
                <div className="absolute inset-4 bg-gradient-to-br from-blue-400/5 to-red-400/5 rounded-lg animate-pulse-slow"></div>
                
                {/* Светящийся border эффект */}
                <div className="absolute inset-0 rounded-lg animate-glow opacity-60"></div>
                
                {/* Логотип */}
                <img 
                  src="/logo.png" 
                  alt="RS Logo"
                  className="relative z-10 w-full h-full object-contain filter brightness-90 transition-all duration-700 group-hover:scale-110 group-hover:brightness-110 group-hover:drop-shadow-lg"
                />
                
                {/* Дополнительный hover эффект */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 via-purple-400/0 to-red-400/0 group-hover:from-blue-400/15 group-hover:via-purple-400/10 group-hover:to-red-400/15 rounded-lg transition-all duration-700"></div>
              </div>
              
              {/* Внешний светящийся ring */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 rounded-lg opacity-20 blur-sm group-hover:opacity-40 transition-opacity duration-500"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;