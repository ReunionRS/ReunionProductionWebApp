import React, { useState, useEffect } from 'react';
import { signInWithPopup, GoogleAuthProvider, User } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useNavigate } from 'react-router-dom';

const GoogleAuth: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    // Проверяем, авторизован ли пользователь при загрузке
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        // Перенаправляем на админку если пользователь уже авторизован
        navigate('/admin');
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const signInWithGoogle = async () => {
    setLoading(true);
    setError('');
    
    try {
      const provider = new GoogleAuthProvider();
      // Дополнительные настройки провайдера
      provider.addScope('email');
      provider.addScope('profile');
      
      const result = await signInWithPopup(auth, provider);
      console.log('Пользователь вошел:', result.user);
      
      // После успешной авторизации перенаправляем на админку
      navigate('/admin');
    } catch (error: any) {
      console.error('Ошибка авторизации:', error);
      
      // Обработка различных типов ошибок
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          setError('Окно авторизации было закрыто');
          break;
        case 'auth/popup-blocked':
          setError('Всплывающее окно заблокировано браузером');
          break;
        case 'auth/cancelled-popup-request':
          setError('Запрос авторизации отменен');
          break;
        default:
          setError('Произошла ошибка при авторизации');
      }
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Ошибка выхода:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-lg border border-white/10 max-w-md w-full mx-4">
        <h1 className="text-2xl font-bold text-white text-center mb-8">
          Авторизация
        </h1>

        {user ? (
          // Если пользователь авторизован
          <div className="text-center">
            <div className="mb-6">
              <img
                src={user.photoURL || ''}
                alt="Profile"
                className="w-16 h-16 rounded-full mx-auto mb-4"
              />
              <h2 className="text-white text-lg font-medium">
                {user.displayName}
              </h2>
              <p className="text-gray-400 text-sm">{user.email}</p>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={() => navigate('/admin')}
                className="w-full bg-white text-black py-2 px-4 rounded-md font-medium hover:bg-gray-100 transition-colors"
              >
                Перейти в админку
              </button>
              
              <button
                onClick={signOut}
                className="w-full bg-red-600 text-white py-2 px-4 rounded-md font-medium hover:bg-red-700 transition-colors"
              >
                Выйти
              </button>
            </div>
          </div>
        ) : (
          // Если пользователь не авторизован
          <div className="text-center">
            <p className="text-gray-400 mb-6">
              Войдите через Google для доступа к админке
            </p>
            
            {error && (
              <div className="bg-red-900/50 border border-red-600 text-red-200 p-3 rounded-md mb-4">
                {error}
              </div>
            )}
            
            <button
              onClick={signInWithGoogle}
              disabled={loading}
              className="w-full bg-white text-black py-3 px-4 rounded-md font-medium hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                  Вход...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Войти через Google
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoogleAuth;