import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { toast } from 'sonner';
import VideoPlayer from '../components/VideoPlayer';

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

const Admin = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    status: '',
    description: '',
    fullDescription: '',
    websiteUrl: '',
    color: 'from-blue-600/20 to-white/5',
    posterUrl: '',
    videoUrl: ''
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'projects'));
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Project[];
      setProjects(data);
    } catch (error) {
      console.error('Ошибка при загрузке проектов:', error);
      toast.error('Ошибка при загрузке проектов');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.title || !formData.status || !formData.description) {
      toast.error('Заполните все обязательные поля');
      setLoading(false);
      return;
    }

    try {
      const projectData = {
        ...formData,
        createdAt: new Date(),
        fullDescription: formData.fullDescription || formData.description,
        websiteUrl: formData.websiteUrl || null
      };

      if (editingProject) {
        await updateDoc(doc(db, 'projects', editingProject.id), projectData);
        toast.success('Проект обновлен!');
      } else {
        await addDoc(collection(db, 'projects'), projectData);
        toast.success('Проект добавлен!');
      }

      resetForm();
      fetchProjects();
    } catch (error) {
      console.error('Ошибка при сохранении:', error);
      toast.error('Ошибка при сохранении проекта');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      status: project.status,
      description: project.description,
      fullDescription: project.fullDescription || '',
      websiteUrl: project.websiteUrl || '',
      color: project.color,
      posterUrl: project.posterUrl,
      videoUrl: project.videoUrl
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Удалить проект "${title}"?`)) {
      try {
        await deleteDoc(doc(db, 'projects', id));
        toast.success('Проект удален');
        fetchProjects();
      } catch (error) {
        console.error('Ошибка при удалении:', error);
        toast.error('Ошибка при удалении проекта');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      status: '',
      description: '',
      fullDescription: '',
      websiteUrl: '',
      color: 'from-blue-600/20 to-white/5',
      posterUrl: '',
      videoUrl: ''
    });
    setEditingProject(null);
    setShowForm(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const colorOptions = [
    { value: 'from-blue-600/20 to-white/5', label: 'Синий' },
    { value: 'from-red-600/20 to-white/5', label: 'Красный' },
    { value: 'from-green-600/20 to-white/5', label: 'Зеленый' },
    { value: 'from-purple-600/20 to-white/5', label: 'Фиолетовый' },
    { value: 'from-yellow-600/20 to-white/5', label: 'Желтый' },
    { value: 'from-pink-600/20 to-white/5', label: 'Розовый' }
  ];

  const getVideoTypeHint = (url: string) => {
    if (!url) return '';
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      return '🎬 YouTube видео';
    }
    if (url.includes('vimeo.com')) {
      return '🎬 Vimeo видео';
    }
    if (url.match(/\.(mp4|webm|ogg|mov|avi)(\?.*)?$/i)) {
      return '📁 Видео файл';
    }
    return '❓ Неопределенный тип';
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Управление проектами</h1>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-white text-black px-6 py-3 rounded-lg hover:bg-white/90 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Добавить проект</span>
            </button>
          </div>

          {/* Форма добавления/редактирования */}
          {showForm && (
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-medium mb-6">
                {editingProject ? 'Редактировать проект' : 'Добавить новый проект'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Название *</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-white/40"
                      placeholder="Введите название проекта"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Статус *</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/40"
                      required
                    >
                      <option value="" className="bg-black">Выберите статус</option>
                      <option value="В разработке" className="bg-black">В разработке</option>
                      <option value="Пре-продакшн" className="bg-black">Пре-продакшн</option>
                      <option value="Продакшн" className="bg-black">Продакшн</option>
                      <option value="Пост-продакшн" className="bg-black">Пост-продакшн</option>
                      <option value="Завершен" className="bg-black">Завершен</option>
                      <option value="Приостановлен" className="bg-black">Приостановлен</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Краткое описание *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-white/40 resize-none"
                    placeholder="Краткое описание для превью"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Полное описание</label>
                  <textarea
                    name="fullDescription"
                    value={formData.fullDescription}
                    onChange={handleChange}
                    rows={5}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-white/40 resize-none"
                    placeholder="Подробное описание для страницы проекта"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">URL постера *</label>
                    <input
                      type="url"
                      name="posterUrl"
                      value={formData.posterUrl}
                      onChange={handleChange}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-white/40"
                      placeholder="https://example.com/poster.jpg"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      URL видео * {getVideoTypeHint(formData.videoUrl)}
                    </label>
                    <input
                      type="url"
                      name="videoUrl"
                      value={formData.videoUrl}
                      onChange={handleChange}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-white/40"
                      placeholder="YouTube, Vimeo или прямая ссылка на файл"
                      required
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      Поддерживается: YouTube, Vimeo, MP4, WebM, OGG, MOV, AVI
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Цветовая схема</label>
                    <select
                      name="color"
                      value={formData.color}
                      onChange={handleChange}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/40"
                    >
                      {colorOptions.map(option => (
                        <option key={option.value} value={option.value} className="bg-black">
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">URL сайта проекта</label>
                    <input
                      type="url"
                      name="websiteUrl"
                      value={formData.websiteUrl}
                      onChange={handleChange}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-white/40"
                      placeholder="https://project-website.com (необязательно)"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    Отмена
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 bg-white text-black rounded-lg hover:bg-white/90 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Сохранение...' : (editingProject ? 'Обновить' : 'Добавить')}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Список проектов */}
          <div className="space-y-4">
            {projects.length === 0 ? (
              <p className="text-center text-gray-400 py-8">Проекты не найдены</p>
            ) : (
              projects.map(project => (
                <div key={project.id} className="bg-white/5 border border-white/10 rounded-lg p-6">
                  <div className="grid md:grid-cols-4 gap-6 items-center">
                    <div className="md:col-span-2">
                      <h3 className="text-xl font-medium mb-2">{project.title}</h3>
                      <p className="text-gray-400 mb-2">{project.status}</p>
                      <p className="text-sm text-gray-500">{project.description}</p>
                      {project.websiteUrl && (
                        <a 
                          href={project.websiteUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 text-sm mt-2 inline-block"
                        >
                          Открыть сайт проекта
                        </a>
                      )}
                    </div>

                    <div className="aspect-video bg-white/5 rounded-lg overflow-hidden">
                      {project.posterUrl ? (
                        <img
                          src={project.posterUrl}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${project.color} flex items-center justify-center`}>
                          <span className="text-sm text-center">{project.title}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => setPreviewProject(previewProject?.id === project.id ? null : project)}
                        className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                        title="Предпросмотр видео"
                      >
                        {previewProject?.id === project.id ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => handleEdit(project)}
                        className="p-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
                        title="Редактировать"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id, project.title)}
                        className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                        title="Удалить"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Предпросмотр видео */}
                  {previewProject?.id === project.id && (
                    <div className="mt-6 pt-6 border-t border-white/10">
                      <h4 className="text-lg font-medium mb-4">Предпросмотр видео ({getVideoTypeHint(project.videoUrl)})</h4>
                      <div className="aspect-video bg-black rounded-lg overflow-hidden">
                        <VideoPlayer
                          url={project.videoUrl}
                          poster={project.posterUrl}
                          controls={true}
                        />
                      </div>
                    </div>
                  )}
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