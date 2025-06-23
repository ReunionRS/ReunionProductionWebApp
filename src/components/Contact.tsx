import { useState } from 'react';
import { MessageCircle, Video, Music, Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    telegram: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.telegram || !formData.message) {
      toast.error('Пожалуйста, заполните все обязательные поля');
      return;
    }

    // Простая валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Пожалуйста, введите корректный email');
      return;
    }

    // Валидация Telegram username
    const telegramRegex = /^@?[a-zA-Z0-9_]{5,32}$/;
    if (!telegramRegex.test(formData.telegram)) {
      toast.error('Пожалуйста, введите корректный Telegram username (например: @username или username)');
      return;
    }

    setIsSubmitting(true);

    try {
      // Отправляем через Telegram Bot
      const telegramSuccess = await sendToTelegram();
      
      if (telegramSuccess) {
        toast.success('Сообщение успешно отправлено! Мы ответим на ваш email в течение 24 часов.');
        setFormData({ name: '', email: '', telegram: '', message: '' });
      } else {
        toast.error('Произошла ошибка при отправке. Попробуйте позже или свяжитесь через Telegram.');
      }

    } catch (error) {
      console.error('Ошибка отправки формы:', error);
      toast.error('Произошла ошибка при отправке. Попробуйте позже или свяжитесь через Telegram.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Функция отправки в Telegram через JSONP (обходит CORS)
  const sendToTelegram = async (): Promise<boolean> => {
    return new Promise((resolve) => {
      try {
        const TELEGRAM_WEBHOOK_URL = import.meta.env.VITE_TELEGRAM_WEBHOOK_URL || 
          'https://script.google.com/macros/s/AKfycbyTmX2KSn2AndGXJp1XDMB5oBvALRG2K0cx9xUwXOLDLJPIlXEHXNgRUH6v0iQtbp6_/exec';
        
        if (TELEGRAM_WEBHOOK_URL.includes('YOUR_SCRIPT_ID')) {
          console.log('Telegram webhook не настроен');
          resolve(false);
          return;
        }

        // Создаем уникальное имя для callback функции
        const callbackName = `telegramCallback_${Date.now()}`;
        
        // Создаем callback функцию
        (window as any)[callbackName] = (response: any) => {
          try {
            console.log('JSONP response:', response);
            const success = response && (response.success === true || response.status === 'OK');
            resolve(success);
          } catch (error) {
            console.error('Ошибка обработки JSONP ответа:', error);
            resolve(false);
          } finally {
            // Очищаем
            delete (window as any)[callbackName];
            if (script.parentNode) {
              script.parentNode.removeChild(script);
            }
          }
        };

        // Формируем URL с параметрами
        const params = new URLSearchParams({
          action: 'send_message',
          name: formData.name,
          email: formData.email,
          telegram: formData.telegram,
          message: formData.message,
          timestamp: new Date().toISOString(),
          source: 'website_contact_form',
          callback: callbackName
        });

        const url = `${TELEGRAM_WEBHOOK_URL}?${params.toString()}`;

        // Создаем script элемент для JSONP
        const script = document.createElement('script');
        script.src = url;
        
        // Обработчик ошибок
        script.onerror = () => {
          console.error('JSONP script error');
          delete (window as any)[callbackName];
          if (script.parentNode) {
            script.parentNode.removeChild(script);
          }
          resolve(false);
        };

        // Таймаут
        setTimeout(() => {
          if ((window as any)[callbackName]) {
            console.log('JSONP timeout, assuming success');
            delete (window as any)[callbackName];
            if (script.parentNode) {
              script.parentNode.removeChild(script);
            }
            resolve(true); // Считаем успешным по таймауту
          }
        }, 10000);

        document.head.appendChild(script);

      } catch (error) {
        console.error('Ошибка отправки в Telegram:', error);
        resolve(false);
      }
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let value = e.target.value;
    
    // Нормализуем Telegram username
    if (e.target.name === 'telegram') {
      // Убираем пробелы
      value = value.trim();
      // Добавляем @ если его нет
      if (value && !value.startsWith('@')) {
        value = '@' + value;
      }
    }
    
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  return (
    <section id="contact" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-16 text-center text-white">
            Контакты
          </h2>

          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-medium mb-6 text-white">
                  Свяжитесь с нами
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                  Готовы обсудить сотрудничество, участие в проектах или 
                  просто поговорить о любимых вселенных.
                </p>
              </div>

              <div className="space-y-6">
                <a 
                  href="https://t.me/ReunionProducion"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Telegram</span>
                </a>

                <a 
                  href="https://t.me/FanFilmImperialCommando"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Канал Telegram</span>
                </a>

                <a 
                  href="https://www.youtube.com/@IlyaSmirnov-z4n"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <Video className="w-5 h-5" />
                  <span>YouTube</span>
                </a>

                <a 
                  href="https://www.tiktok.com/@ilushacosplayer?is_from_webapp=1&sender_device=pc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <Music className="w-5 h-5" />
                  <span>TikTok</span>
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
                    className="w-full px-0 py-4 bg-transparent border-0 border-b border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition-colors duration-300"
                    disabled={isSubmitting}
                    required
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-0 py-4 bg-transparent border-0 border-b border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition-colors duration-300"
                    disabled={isSubmitting}
                    required
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="telegram"
                    placeholder="Ваш Telegram @username"
                    value={formData.telegram}
                    onChange={handleChange}
                    className="w-full px-0 py-4 bg-transparent border-0 border-b border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition-colors duration-300"
                    disabled={isSubmitting}
                    required
                  />
                </div>

                <div>
                  <textarea
                    name="message"
                    placeholder="Расскажите о себе или вашей идее"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-0 py-4 bg-transparent border-0 border-b border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition-colors duration-300 resize-none"
                    disabled={isSubmitting}
                    required
                  />
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center justify-center space-x-2 px-8 py-4 bg-white text-black font-medium hover:bg-white/90 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed min-w-[200px]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Отправка...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Отправить сообщение</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-xs text-gray-500 text-center">
                  * Обязательные поля. Мы ответим на ваш email в течение 24 часов.<br/>
                  Ваши данные защищены и не передаются третьим лицам.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;