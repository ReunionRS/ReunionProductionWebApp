
const Services = () => {
  const services = [
    {
      title: "Видеопродакшн",
      description: "Полный цикл производства видеоконтента от идеи до монтажа"
    },
    {
      title: "Рекламные ролики",
      description: "Создание эффективной рекламы для различных медиаплатформ"
    },
    {
      title: "Корпоративные фильмы",
      description: "Презентация вашего бизнеса через качественное видео"
    },
    {
      title: "Музыкальные клипы",
      description: "Визуальное воплощение музыкальных произведений"
    },
    {
      title: "Event съёмка",
      description: "Профессиональная съёмка мероприятий любого масштаба"
    },
    {
      title: "Постпродакшн",
      description: "Монтаж, цветокоррекция, звуковой дизайн и спецэффекты"
    }
  ];

  return (
    <section id="services" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-16 text-center">
            Услуги
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="group p-8 border border-white/10 rounded-lg hover:border-white/20 transition-all duration-300"
              >
                <h3 className="text-xl font-medium mb-4 group-hover:text-white transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
