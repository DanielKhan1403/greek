import { useEffect, useState } from 'react';
import Preloader from './components/preloaders/Preloader';
import Header from './components/smallcomponents/Header';
import Footer from './components/smallcomponents/Footer'; // Импортируем компонент Footer
import PostEventList from './components/PostEventListener';

function App() {
  const [loading, setLoading] = useState(true);
  const MINIMUM_LOADER_TIME = 2000; // Минимальное время отображения прелоадера (2 секунды)

  useEffect(() => {
    let isMounted = true;
    const startTime = Date.now();

    // Функция для проверки загрузки ресурсов
    const checkResourcesLoaded = () => {
      // Симуляция загрузки данных
      const fakeApiCall = new Promise((resolve) => setTimeout(resolve, 1000));

      // Проверяем загрузку всех изображений на странице
      const images = document.getElementsByTagName('img');
      const imagePromises = Array.from(images).map(
        (img) =>
          new Promise((resolve) => {
            if (img.complete) resolve();
            else {
              img.onload = resolve;
              img.onerror = resolve; // Обрабатываем ошибки загрузки
            }
          })
      );

      // Ожидаем завершения всех загрузок
      Promise.all([fakeApiCall, ...imagePromises]).then(() => {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = MINIMUM_LOADER_TIME - elapsedTime;

        // Убедимся, что прелоадер показывается минимум MINIMUM_LOADER_TIME
        if (remainingTime > 0) {
          setTimeout(() => {
            if (isMounted) setLoading(false);
          }, remainingTime);
        } else {
          if (isMounted) setLoading(false);
        }
      });
    };

    checkResourcesLoaded();

    return () => {
      isMounted = false; // Предотвращаем обновление состояния после размонтирования
    };
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header /> {/* Добавляем Header */}
      <main className="pt-16 flex-grow flex items-center justify-center">
        {/* pt-16 добавляет отступ сверху, чтобы контент не перекрывался фиксированным header'ом */}
        
        {/* Основной контент */}
        <PostEventList />
      </main>
      <Footer /> {/* Добавляем Footer */}
    </div>
  );
}

export default App;