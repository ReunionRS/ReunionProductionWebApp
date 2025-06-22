
import { useState, useEffect } from 'react';
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
}

const Admin = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    universe: '',
    status: '',
    description: '',
    color: 'from-blue-600/20 to-white/5',
    websiteUrl: '',
    fullDescription: ''
  });

  useEffect(() => {
    // Загружаем проекты из localStorage при инициализации
    const savedProjects = localStorage.getItem('reunion-projects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      // Устанавливаем начальный проект
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

  const saveProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
    localStorage.setItem('reunion-projects', JSON.stringify(newProjects));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.universe || !formData.status || !formData.description) {
      toast.error('Пожалуйста, заполните все обязательные поля');
      return;
    }

    if (editingProject) {
      const updatedProjects = projects.map(p => 
        p.id === editingProject.id 
          ? { ...editingProject, ...formData }
          : p
      );
      saveProjects(updatedProjects);
      toast.success('Проект обновлен');
      setEditingProject(null);
    } else {
      const newProject: Project = {
        id: Date.now(),
        ...formData
      };
      saveProjects([...projects, newProject]);
      toast.success('Проект добавлен');
      setIsAddingProject(false);
    }

    setFormData({
      title: '',
      universe: '',
      status: '',
      description: '',
      color: 'from-blue-600/20 to-white/5',
      websiteUrl: '',
      fullDescription: ''
    });
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      universe: project.universe,
      status: project.status,
      description: project.description,
      color: project.color,
      websiteUrl: project.websiteUrl || '',
      fullDescription: project.fullDescription || ''
    });
    setIsAddingProject(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Вы уверены, что хотите удалить этот проект?')) {
      const updatedProjects = projects.filter(p => p.id !== id);
      saveProjects(updatedProjects);
      toast.success('Проект удален');
    }
  };

  const colorOptions = [
    { value: 'from-blue-600/20 to-white/5', label: 'Синий' },
    { value: 'from-red-600/20 to-white/5', label: 'Красный' },
    { value: 'from-yellow-600/20 to-white/5', label: 'Желтый' },
    { value: 'from-purple-600/20 to-white/5', label: 'Фиолетовый' },
    { value: 'from-green-600/20 to-white/5', label: 'Зеленый' }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-medium">Админ панель</h1>
            <div className="space-x-4">
              <a 
                href="/"
                className="px-4 py-2 border border-white/20 hover:border-white/40 transition-colors"
              >
                На главную
              </a>
              <button
                onClick={() => {
                  setIsAddingProject(true);
                  setEditingProject(null);
                  setFormData({
                    title: '',
                    universe: '',
                    status: '',
                    description: '',
                    color: 'from-blue-600/20 to-white/5',
                    websiteUrl: '',
                    fullDescription: ''
                  });
                }}
                className="px-4 py-2 bg-white text-black hover:bg-white/90 transition-colors"
              >
                Добавить проект
              </button>
            </div>
          </div>

          {/* Форма добавления/редактирования */}
          {isAddingProject && (
            <div className="mb-8 p-6 border border-white/20 rounded-lg">
              <h2 className="text-2xl mb-4">
                {editingProject ? 'Редактировать проект' : 'Добавить новый проект'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Название проекта *"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-2 bg-transparent border border-white/20 text-white placeholder-muted-foreground focus:outline-none focus:border-white/40"
                    required
                  />
                  
                  <input
                    type="text"
                    placeholder="Вселенная *"
                    value={formData.universe}
                    onChange={(e) => setFormData({...formData, universe: e.target.value})}
                    className="w-full px-4 py-2 bg-transparent border border-white/20 text-white placeholder-muted-foreground focus:outline-none focus:border-white/40"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Статус *"
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-4 py-2 bg-transparent border border-white/20 text-white placeholder-muted-foreground focus:outline-none focus:border-white/40"
                    required
                  />
                  
                  <select
                    value={formData.color}
                    onChange={(e) => setFormData({...formData, color: e.target.value})}
                    className="w-full px-4 py-2 bg-black border border-white/20 text-white focus:outline-none focus:border-white/40"
                  >
                    {colorOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <textarea
                  placeholder="Краткое описание *"
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-2 bg-transparent border border-white/20 text-white placeholder-muted-foreground focus:outline-none focus:border-white/40 resize-none"
                  required
                />

                <textarea
                  placeholder="Полное описание"
                  rows={4}
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({...formData, fullDescription: e.target.value})}
                  className="w-full px-4 py-2 bg-transparent border border-white/20 text-white placeholder-muted-foreground focus:outline-none focus:border-white/40 resize-none"
                />

                <input
                  type="url"
                  placeholder="Ссылка на проект"
                  value={formData.websiteUrl}
                  onChange={(e) => setFormData({...formData, websiteUrl: e.target.value})}
                  className="w-full px-4 py-2 bg-transparent border border-white/20 text-white placeholder-muted-foreground focus:outline-none focus:border-white/40"
                />

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-white text-black hover:bg-white/90 transition-colors"
                  >
                    {editingProject ? 'Обновить' : 'Добавить'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingProject(false);
                      setEditingProject(null);
                    }}
                    className="px-6 py-2 border border-white/20 hover:border-white/40 transition-colors"
                  >
                    Отмена
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Список проектов */}
          <div className="space-y-4">
            <h2 className="text-2xl mb-4">Проекты ({projects.length})</h2>
            {projects.length === 0 ? (
              <p className="text-muted-foreground">Проекты не найдены</p>
            ) : (
              projects.map((project) => (
                <div key={project.id} className="p-4 border border-white/20 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-medium">{project.title}</h3>
                      <p className="text-muted-foreground">{project.universe} • {project.status}</p>
                      <p className="text-sm mt-2">{project.description}</p>
                      {project.websiteUrl && (
                        <a 
                          href={project.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 text-sm"
                        >
                          {project.websiteUrl}
                        </a>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(project)}
                        className="px-3 py-1 text-sm border border-white/20 hover:border-white/40 transition-colors"
                      >
                        Изменить
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 transition-colors"
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
