import { Heart, Users, Camera, ExternalLink, Zap } from 'lucide-react';

const SupportEnhanced = () => {
  const supportOptions = [
    {
      icon: Heart,
      title: "Финансовая поддержка",
      description: "Поддержите наши проекты через Boosty и Patreon",
      action: "Поддержать",
      url: "https://boosty.to/ilyaivanoskyi",
      color: "from-red-500/20 to-pink-500/20",
      hoverColor: "from-red-500/30 to-pink-500/30",
      buttonColor: "border-red-400/40 hover:border-red-400/70 hover:bg-red-500/10"
    },
    {
      icon: Users,
      title: "Присоединиться к команде",
      description: "Ищем композиторов, 3Д художников, CGI-специалистов, актёров озвучки",
      action: "Связаться",
      url: "https://t.me/ReunionProducion",
      color: "from-blue-500/20 to-cyan-500/20",
      hoverColor: "from-blue-500/30 to-cyan-500/30",
      buttonColor: "border-blue-400/40 hover:border-blue-400/70 hover:bg-blue-500/10"
    },
    {
      icon: Camera,
      title: "Техническая помощь",
      description: "Оборудование, локации, экспертиза — любая помощь важна",
      action: "Предложить",
      url: "https://t.me/ReunionProducion",
      color: "from-green-500/20 to-emerald-500/20",
      hoverColor: "from-green-500/30 to-emerald-500/30",
      buttonColor: "border-green-400/40 hover:border-green-400/70 hover:bg-green-500/10"
    }
  ];

  const handleButtonClick = (url, title) => {
    // Открываем ссылку в новой вкладке
    window.open(url, '_blank', 'noopener,noreferrer');
    
    // Опционально: аналитика или уведомление
    console.log(`Redirecting to: ${title} - ${url}`);
  };

  return (
    <section id="support" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6">
              Поддержать проект
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Вместе мы создаём качественный фан-контент. 
              Ваша поддержка помогает воплощать амбициозные идеи в реальность.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {supportOptions.map((option, index) => {
              const IconComponent = option.icon;
              return (
                <div key={index} className="group relative">
                  {/* Светящийся фон при ховере */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${option.hoverColor} rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}></div>
                  
                  <div className={`relative bg-white/5 bg-gradient-to-br ${option.color} rounded-lg p-8 text-center hover:bg-white/10 transition-all duration-300 border border-white/10 group-hover:border-white/20`}>
                    <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
                      <IconComponent className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    
                    <h3 className="text-xl font-medium mb-4 group-hover:text-white transition-colors">
                      {option.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed group-hover:text-white/80 transition-colors">
                      {option.description}
                    </p>
                    
                    <button 
                      onClick={() => handleButtonClick(option.url, option.title)}
                      className={`relative inline-flex items-center justify-center gap-2 px-6 py-3 border rounded-lg transition-all duration-300 group/button overflow-hidden ${option.buttonColor}`}
                    >
                      {/* Анимированный фон кнопки */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/button:translate-x-full transition-transform duration-700"></div>
                      
                      <span className="relative font-medium">{option.action}</span>
                      <ExternalLink className="relative w-4 h-4 opacity-60 group-hover/button:opacity-100 group-hover/button:scale-110 transition-all duration-300" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Дополнительная информация */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-muted-foreground">
                Все ссылки откроются в новой вкладке
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportEnhanced;