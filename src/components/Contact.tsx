
import { useState } from 'react';
import { MessageCircle, Video, Music } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Пожалуйста, заполните все поля');
      return;
    }

    console.log('Form submitted:', formData);
    toast.success('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.');
    
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-16 text-center">
            Контакты
          </h2>

          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-medium mb-6">
                  Свяжитесь с нами
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  Готовы обсудить сотрудничество, участие в проектах или 
                  просто поговорить о любимых вселенных.
                </p>
              </div>

              <div className="space-y-6">
                <a 
                  href="https://t.me/ReunionRS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 text-muted-foreground hover:text-white transition-colors duration-300"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Telegram: @ReunionRS</span>
                </a>

                <a 
                  href="https://t.me/FanFilmImperialCommando"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 text-muted-foreground hover:text-white transition-colors duration-300"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Канал: Imperial Commando</span>
                </a>

                <a 
                  href="https://www.youtube.com/@IlyaSmirnov-z4n"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 text-muted-foreground hover:text-white transition-colors duration-300"
                >
                  <Video className="w-5 h-5" />
                  <span>YouTube</span>
                </a>

                <a 
                  href="https://www.tiktok.com/@ilushacosplayer?is_from_webapp=1&sender_device=pc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 text-muted-foreground hover:text-white transition-colors duration-300"
                >
                  <Music className="w-5 h-5" />
                  <span>TikTok: @ilushacosplayer</span>
                </a>
              </div>
            </div>

            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Ваше имя"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-0 py-4 bg-transparent border-0 border-b border-white/20 text-white placeholder-muted-foreground focus:outline-none focus:border-white/40 transition-colors duration-300"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-0 py-4 bg-transparent border-0 border-b border-white/20 text-white placeholder-muted-foreground focus:outline-none focus:border-white/40 transition-colors duration-300"
                  />
                </div>

                <div>
                  <textarea
                    name="message"
                    placeholder="Расскажите о себе или вашей идее"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-0 py-4 bg-transparent border-0 border-b border-white/20 text-white placeholder-muted-foreground focus:outline-none focus:border-white/40 transition-colors duration-300 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full md:w-auto px-8 py-4 bg-white text-black font-medium hover:bg-white/90 transition-colors duration-300"
                >
                  Отправить сообщение
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
