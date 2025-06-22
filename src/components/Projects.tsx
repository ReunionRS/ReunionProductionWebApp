
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Project {
  id: number;
  title: string;
  universe: string;
  status: string;
  description: string;
  color: string;
  websiteUrl?: string;
  fullDescription?: string;
  videoPreview?: string;
}

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Загружаем проекты из localStorage
    const savedProjects = localStorage.getItem('reunion-projects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      // Устанавливаем начальный проект, если нет сохраненных данных
      const initialProject = {
        id: 1,
        title: "Star Wars: Imperial Commando",
        universe: "Star Wars",
        status: "В разработке",
        description: "Эпическая история элитного отряда имперских коммандос",
        color: "from-blue-600/20 to-white/5",
        websiteUrl: "https://t.me/FanFilmImperialCommando",
        fullDescription: "Фанатский фильм по вселенной Star Wars, рассказывающий историю элитного отряда имперских коммандос. Проект находится в активной разработке, включает в себя профессиональные костюмы, спецэффекты и оригинальный сценарий, вдохновленный легендами расширенной вселенной."
      };
      setProjects([initialProject]);
      localStorage.setItem('reunion-projects', JSON.stringify([initialProject]));
    }
  }, []);

  const handleProjectClick = (projectId: number) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <section id="projects" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-16 text-center">
            Проекты
          </h2>

          {projects.length === 0 ? (
            <div className="text-center text-gray-400">
              <p>Проекты пока не добавлены</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="group cursor-pointer"
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => handleProjectClick(project.id)}
                >
                  <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
                    {/* Video Background */}
                    {project.videoPreview && hoveredProject === project.id && (
                      <video
                        autoPlay
                        loop
                        muted
                        className="absolute inset-0 w-full h-full object-cover"
                      >
                        <source src={project.videoPreview} type="video/mp4" />
                      </video>
                    )}
                    
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color}`}></div>
                    
                    {/* Overlay */}
                    <div className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
                      hoveredProject === project.id ? 'opacity-90' : 'opacity-40'
                    }`}>
                      <div className="absolute inset-0 flex items-center justify-center p-6">
                        <div className="text-center">
                          <h3 className="text-xl md:text-2xl font-medium mb-2">
                            {project.title}
                          </h3>
                          <p className="text-sm text-gray-300 mb-2">
                            {project.universe}
                          </p>
                          <p className="text-xs text-white/60 mb-4">
                            {project.status}
                          </p>
                          <p className="text-sm">
                            {project.description}
                          </p>
                          <p className="text-xs text-white/80 mt-4">
                            Нажмите для подробностей
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
