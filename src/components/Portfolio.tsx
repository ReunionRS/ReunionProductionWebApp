
import { useState } from 'react';

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
}

const Portfolio = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: "Рекламный ролик",
      category: "Реклама",
      image: "/placeholder.svg",
      description: "Эмоциональная история бренда"
    },
    {
      id: 2,
      title: "Корпоративный фильм",
      category: "Корпоратив",
      image: "/placeholder.svg",
      description: "Презентация компании будущего"
    },
    {
      id: 3,
      title: "Музыкальный клип",
      category: "Музыка",
      image: "/placeholder.svg",
      description: "Визуализация звука"
    },
    {
      id: 4,
      title: "Документальный проект",
      category: "Документалистика",
      image: "/placeholder.svg",
      description: "Реальные истории людей"
    },
    {
      id: 5,
      title: "Fashion съёмка",
      category: "Мода",
      image: "/placeholder.svg",
      description: "Стиль в каждом кадре"
    },
    {
      id: 6,
      title: "Event съёмка",
      category: "События",
      image: "/placeholder.svg",
      description: "Моменты, которые важны"
    }
  ];

  return (
    <section id="portfolio" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-16 text-center">
            Портфолио
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group cursor-pointer"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="relative aspect-[4/3] bg-white/5 rounded-lg overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  <div className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
                    hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className="absolute inset-0 flex items-center justify-center p-6">
                      <div className="text-center">
                        <h3 className="text-xl font-medium mb-2">
                          {project.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {project.category}
                        </p>
                        <p className="text-sm">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
