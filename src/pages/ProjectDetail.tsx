
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

interface Project {
  id: number;
  title: string;
  universe: string;
  status: string;
  description: string;
  color: string;
  websiteUrl?: string;
  fullDescription?: string;
  poster?: string;
  trailer?: string;
  screenshots?: string[];
}

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    message: ''
  });

  useEffect(() => {
    const savedProjects = localStorage.getItem('reunion-projects');
    if (savedProjects) {
      const projects = JSON.parse(savedProjects);
      const foundProject = projects.find((p: Project) => p.id === parseInt(id || ''));
      setProject(foundProject || null);
    }
  }, [id]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Пожалуйста, заполните все обязательные поля');
      return;
    }

    console.log('Project contact form submitted:', { project: project?.title, ...formData });
    toast.success('Ваше сообщение отправлено! Мы свяжемся с вами в ближайшее время.');
    
    setFormData({ name: '', email: '', role: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4">Проект не найден</h1>
          <Link to="/" className="text-white hover:text-gray-300">
            Вернуться на главную
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="py-6 px-6 border-b border-white/10">
        <div className="container mx-auto max-w-6xl">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-white hover:text-gray-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Назад к проектам</span>
          </Link>
        </div>
      </header>

      {/* Project Hero */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-medium tracking-tight mb-4">
                {project.title}
              </h1>
              <p className="text-xl text-gray-400 mb-4">{project.universe}</p>
              <p className="text-lg text-gray-500 mb-8">{project.status}</p>
              <p className="text-lg leading-relaxed mb-8">
                {project.fullDescription || project.description}
              </p>
              
              {project.websiteUrl && (
                <a 
                  href={project.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-white text-black font-medium hover:bg-white/90 transition-colors duration-300"
                >
                  <span>Перейти к проекту</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>

            <div className="space-y-6">
              {/* Poster */}
              <div className="aspect-[2/3] bg-white/5 rounded-lg overflow-hidden">
                {project.poster ? (
                  <img
                    src={project.poster}
                    alt={`${project.title} Poster`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${project.color} flex items-center justify-center`}>
                    <span className="text-2xl font-medium">{project.title}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trailer Section */}
      {project.trailer && (
        <section className="py-20 bg-white/5">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="text-3xl font-medium mb-8">Трейлер</h2>
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <video 
                src={project.trailer}
                controls
                className="w-full h-full"
                poster={project.poster}
              >
                Ваш браузер не поддерживает видео.
              </video>
            </div>
          </div>
        </section>
      )}

      {/* Screenshots */}
      {project.screenshots && project.screenshots.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="text-3xl font-medium mb-8">Скриншоты</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.screenshots.map((screenshot, index) => (
                <div key={index} className="aspect-video bg-white/5 rounded-lg overflow-hidden">
                  <img
                    src={screenshot}
                    alt={`${project.title} Screenshot ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Form */}
      <section className="py-20 bg-white/5">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium mb-4">
              Присоединиться к проекту
            </h2>
            <p className="text-lg text-gray-400">
              Хотите принять участие в создании этого проекта? Расскажите о себе!
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="max-w-2xl mx-auto space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Ваше имя *"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-0 py-4 bg-transparent border-0 border-b border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition-colors duration-300"
                  required
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email *"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-0 py-4 bg-transparent border-0 border-b border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition-colors duration-300"
                  required
                />
              </div>
            </div>

            <div>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-0 py-4 bg-transparent border-0 border-b border-white/20 text-white focus:outline-none focus:border-white/40 transition-colors duration-300"
              >
                <option value="" className="bg-black">Выберите роль (необязательно)</option>
                <option value="actor" className="bg-black">Актёр</option>
                <option value="director" className="bg-black">Режиссёр</option>
                <option value="cameraman" className="bg-black">Оператор</option>
                <option value="editor" className="bg-black">Монтажёр</option>
                <option value="sound" className="bg-black">Звукорежиссёр</option>
                <option value="costume" className="bg-black">Костюмер</option>
                <option value="makeup" className="bg-black">Гримёр</option>
                <option value="producer" className="bg-black">Продюсер</option>
                <option value="other" className="bg-black">Другое</option>
              </select>
            </div>

            <div>
              <textarea
                name="message"
                placeholder="Расскажите о своём опыте и почему хотите участвовать в проекте *"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-0 py-4 bg-transparent border-0 border-b border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition-colors duration-300 resize-none"
                required
              />
            </div>

            <div className="text-center pt-4">
              <button
                type="submit"
                className="px-8 py-4 bg-white text-black font-medium hover:bg-white/90 transition-colors duration-300"
              >
                Отправить заявку
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
