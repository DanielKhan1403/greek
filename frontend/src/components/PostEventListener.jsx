import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../BaseUrl";

// Хук для отслеживания мобильного режима
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isMobile;
}

// Утилита для нормализации индекса
const normalizeIndex = (i, len) => ((i % len) + len) % len;

// Обработка свайпа
const handleDragEnd = (offsetX, currentIndex, length, setIndex) => {
  const threshold = window.innerWidth < 640 ? 50 : 100;
  if (offsetX > threshold) {
    setIndex(normalizeIndex(currentIndex - 1, length));
  } else if (offsetX < -threshold) {
    setIndex(normalizeIndex(currentIndex + 1, length));
  }
};

/* ----------------- Мобильная версия ----------------- */
function CarouselMobile({ items, currentIndex, setIndex, linkPrefix }) {
  const len = items.length;
  if (!len) return null;

  const item = items[currentIndex];

  return (
    <div className="flex justify-center items-center select-none px-2">
      <motion.div
        key={item.id}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.3}
        onDragEnd={(e, info) =>
          handleDragEnd(info.offset.x, currentIndex, len, setIndex)
        }
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4 }}
        className="w-[90vw] max-w-sm aspect-[4/5] rounded-xl overflow-hidden shadow-lg bg-white relative"
      >
        <img
          src={item.cover}
          alt={item.short_description}
          className="w-full h-full object-cover"
          draggable={false}
        />
        <div className="absolute bottom-0 bg-gradient-to-t from-black/70 to-transparent w-full p-4 text-white">
          <h3 className="text-lg font-bold">{item.title}</h3>
          <p className="text-sm line-clamp-2">{item.short_description}</p>
          <a
            href={`${linkPrefix}/${item.id}`}
            className="inline-block mt-1 text-indigo-200 text-sm"
          >
            Подробнее →
          </a>
        </div>
      </motion.div>
    </div>
  );
}

/* ----------------- Десктоп версия ----------------- */
function CarouselDesktop({ items, currentIndex, setIndex, linkPrefix }) {
  const len = items.length;
  if (!len) return null;

  const baseX = Math.min(550, window.innerWidth * 0.45);
  const cardWidth = 450;
  const cardHeight = cardWidth * 1.3;

  return (
    <div className="flex justify-center items-center select-none">
      <div className="relative w-full max-w-[1500px] aspect-[16/9] flex justify-center items-center overflow-hidden">
        {items.map((item, i) => {
          const relativeIndex = ((i - currentIndex + len) % len);
          if (![0, 1, len - 1].includes(relativeIndex)) return null;

          let scale = 0.8;
          let opacity = 0.5;
          let xOffset = 0;
          let zIndex = 10;

          if (relativeIndex === 0) {
            scale = 1;
            opacity = 1;
            zIndex = 20;
          } else if (relativeIndex === 1) {
            xOffset = baseX;
          } else if (relativeIndex === len - 1) {
            xOffset = -baseX;
          }

          return (
            <motion.div
              key={item.id}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, info) =>
                handleDragEnd(info.offset.x, currentIndex, len, setIndex)
              }
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity, scale, x: xOffset, zIndex }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute rounded-2xl overflow-hidden shadow-lg bg-white cursor-pointer"
              style={{ width: cardWidth, height: cardHeight }}
              onClick={() => {
                if (relativeIndex !== 0) {
                  setIndex(i);
                }
              }}
            >
              <img
                src={item.cover}
                alt={item.short_description}
                className="w-full h-full object-cover"
                draggable={false}
              />
              <div className="absolute bottom-0 bg-gradient-to-t from-black/70 to-transparent w-full p-4 text-white">
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="text-sm line-clamp-2">{item.short_description}</p>
                <a
                  href={`${linkPrefix}/${item.id}`}
                  className="inline-block mt-1 text-indigo-200 text-sm"
                >
                  Подробнее →
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ----------------- Главный компонент ----------------- */
export default function Home() {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [posts, setPosts] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [postsIndex, setPostsIndex] = useState(0);
  const [eventsIndex, setEventsIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const [postsRes, eventsRes] = await Promise.all([
        axios.get(`${BASE_URL}/api/v1/main/posts/`),
        axios.get(`${BASE_URL}/api/v1/main/events/`),
      ]);
      setPosts(postsRes.data.results || []);
      setEvents(eventsRes.data.results || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <div className="text-center py-12">Loading...</div>;

  const CarouselComp = isMobile ? CarouselMobile : CarouselDesktop;

  return (
    <div className="bg-gradient-to-br from-gray-100 via-white to-gray-200 text-gray-900 min-h-screen">
      <div className="px-4 sm:px-6 lg:px-12 py-12 space-y-16">
        <motion.section
          id="posts"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
          }}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center">
            📰 {t("latest_posts_title")}
          </h2>
          <CarouselComp
            items={posts}
            currentIndex={postsIndex}
            setIndex={setPostsIndex}
            linkPrefix="/posts"
          />
        </motion.section>

        <motion.section
          id="events"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
          }}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center">
            🎉 {t("upcoming_events_title")}
          </h2>
          <CarouselComp
            items={events}
            currentIndex={eventsIndex}
            setIndex={setEventsIndex}
            linkPrefix="/events"
          />
        </motion.section>
      </div>
    </div>
  );
}
