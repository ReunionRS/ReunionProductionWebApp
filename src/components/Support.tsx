
import { Heart, Users, Camera } from 'lucide-react';

const Support = () => {
  const supportOptions = [
    {
      icon: Heart,
      title: "Финансовая поддержка",
      description: "Поддержите наши проекты через Boosty и Patreon",
      action: "Поддержать"
    },
    {
      icon: Users,
      title: "Присоединиться к команде",
      description: "Ищем актёров, костюмеров, операторов и монтажёров",
      action: "Связаться"
    },
    {
      icon: Camera,
      title: "Техническая помощь",
      description: "Оборудование, локации, экспертиза — любая помощь важна",
      action: "Предложить"
    }
  ];

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
                <div key={index} className="group">
                  <div className="bg-white/5 rounded-lg p-8 text-center hover:bg-white/10 transition-colors duration-300">
                    <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-white/10 group-hover:bg-white/20 transition-colors duration-300">
                      <IconComponent className="w-8 h-8" />
                    </div>
                    
                    <h3 className="text-xl font-medium mb-4">
                      {option.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {option.description}
                    </p>
                    
                    <button className="inline-flex items-center justify-center px-6 py-3 border border-white/20 rounded-lg hover:border-white/40 hover:bg-white/5 transition-all duration-300">
                      {option.action}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Support;
