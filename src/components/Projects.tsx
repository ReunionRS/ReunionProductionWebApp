import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import VideoPlayer from "../components/VideoPlayer";

interface Project {
  id: string;
  title: string;
  status: string;
  description: string;
  fullDescription?: string;
  websiteUrl?: string;
  color: string;
  posterUrl: string;
  videoUrl: string;
  createdAt: any;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const snapshot = await getDocs(collection(db, "projects"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Project[];
        setProjects(data);
      } catch (error) {
        console.error("Ошибка при загрузке проектов:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleProjectClick = (projectId: string) => {
    navigate(`/project/${projectId}`);
  };

  if (loading) {
    return (
      <section className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-16 text-center text-white">
              Проекты
            </h2>
            <div className="text-center text-white">
              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p>Загрузка проектов...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-16 text-center text-white">
            Проекты
          </h2>

          {projects.length === 0 ? (
            <p className="text-center text-gray-400">Проекты не найдены</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="group cursor-pointer"
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => handleProjectClick(project.id)}
                >
                  <div className="relative aspect-[16/9] rounded-lg overflow-hidden border border-white/10 hover:border-white/20 transition-colors duration-300">
                    {hoveredId === project.id ? (
                      <VideoPlayer
                        url={project.videoUrl}
                        autoPlay={true}
                        muted={true}
                        loop={true}
                        controls={false}
                        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                      />
                    ) : (
                      <img
                        src={project.posterUrl}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                      />
                    )}

                    <div
                      className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
                        hoveredId === project.id ? "opacity-90" : "opacity-80"
                      }`}
                    >
                      <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-white">
                        <div>
                          <h3 className="text-xl md:text-2xl font-medium mb-2">
                            {project.title}
                          </h3>
                          <p className="text-sm text-gray-300 mb-2">
                            {project.status}
                          </p>
                          <p className="text-sm">{project.description}</p>
                          
                          {/* Индикатор клика */}
                          <p className="text-xs text-gray-400 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Нажмите для подробностей
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${project.color} mix-blend-overlay`}
                    />
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