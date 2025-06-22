import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { toast } from "sonner";

const Admin = () => {
  const [formData, setFormData] = useState({
    title: "",
    status: "",
    description: "",
    fullDescription: "",
    websiteUrl: "",
    color: "from-blue-600/20 to-white/5",
    posterUrl: "",
    videoUrl: "",
  });

  const [projects, setProjects] = useState<any[]>([]);

  const fetchProjects = async () => {
    const snapshot = await getDocs(collection(db, "projects"));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { title, status, description, posterUrl, videoUrl } = formData;

    if (!title || !status || !description || !posterUrl || !videoUrl) {
      toast.error("Пожалуйста, заполните обязательные поля.");
      return;
    }

    await addDoc(collection(db, "projects"), {
      ...formData,
      createdAt: new Date(),
    });

    toast.success("Проект добавлен");
    setFormData({
      title: "",
      status: "",
      description: "",
      fullDescription: "",
      websiteUrl: "",
      color: "from-blue-600/20 to-white/5",
      posterUrl: "",
      videoUrl: "",
    });
    fetchProjects();
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "projects", id));
    toast.success("Проект удален");
    fetchProjects();
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl mb-6">Админка</h1>
      <form onSubmit={handleSubmit} className="grid gap-4 max-w-2xl">
        <input type="text" placeholder="Название *" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="bg-gray-900 border p-2" />
        <input type="text" placeholder="Статус *" required value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="bg-gray-900 border p-2" />
        <textarea placeholder="Краткое описание *" required value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="bg-gray-900 border p-2" />
        <textarea placeholder="Полное описание" value={formData.fullDescription} onChange={(e) => setFormData({...formData, fullDescription: e.target.value})} className="bg-gray-900 border p-2" />
        <input type="url" placeholder="Ссылка на сайт" value={formData.websiteUrl} onChange={(e) => setFormData({...formData, websiteUrl: e.target.value})} className="bg-gray-900 border p-2" />
        <input type="url" placeholder="Ссылка на постер (картинку) *" required value={formData.posterUrl} onChange={(e) => setFormData({...formData, posterUrl: e.target.value})} className="bg-gray-900 border p-2" />
        <input type="url" placeholder="Ссылка на видео *" required value={formData.videoUrl} onChange={(e) => setFormData({...formData, videoUrl: e.target.value})} className="bg-gray-900 border p-2" />
        <select value={formData.color} onChange={(e) => setFormData({...formData, color: e.target.value})} className="bg-gray-900 border p-2">
          <option value="from-blue-600/20 to-white/5">Синий</option>
          <option value="from-red-600/20 to-white/5">Красный</option>
          <option value="from-yellow-600/20 to-white/5">Жёлтый</option>
          <option value="from-purple-600/20 to-white/5">Фиолетовый</option>
        </select>
        <button type="submit" className="bg-white text-black px-4 py-2">Сохранить</button>
      </form>

      <h2 className="text-2xl mt-10 mb-4">Проекты</h2>
      <div className="grid gap-4">
        {projects.map((p) => (
          <div key={p.id} className="border border-white/10 p-4">
            <h3 className="text-xl">{p.title}</h3>
            <p>{p.status}</p>
            <img src={p.posterUrl} alt={p.title} className="h-32 object-cover my-2" />
            <button onClick={() => handleDelete(p.id)} className="mt-2 bg-red-600 px-3 py-1">Удалить</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
