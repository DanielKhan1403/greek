import PostsList from "../features/posts/PostList";
import EventsList from "../features/events/EventsList";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

const sectionVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Home() {
  const { t } = useTranslation();
  const [showPosts, setShowPosts] = useState(false);
  const [showEvents, setShowEvents] = useState(false);

  useEffect(() => {
    const postsCacheTime = parseInt(localStorage.getItem("posts_cache_time"), 10);
    const eventsCacheTime = parseInt(localStorage.getItem("events_cache_time"), 10);
    const now = Date.now();
    const cacheDuration = 10 * 60 * 1000; // 10 минут

    if (!postsCacheTime || now - postsCacheTime > cacheDuration) {
      localStorage.removeItem("posts_cache");
    }
    if (!eventsCacheTime || now - eventsCacheTime > cacheDuration) {
      localStorage.removeItem("events_cache");
    }

    setShowPosts(true);
    setShowEvents(true);
  }, []);

  return (
    <div className="bg-gradient-to-b from-white to-gray-100">
      <div className="w-full px-4 sm:px-6 lg:px-12 py-20 space-y-32">
        {/* Latest Posts Section */}
        {showPosts && (
          <motion.section
            id="posts"
            className="space-y-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariant}
          >
            <div className="text-center">
              <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800">
                📰 {t("latest_posts_title")}
              </h2>
              <p className="mt-4 text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto">
                {t("latest_posts_subtitle")}
              </p>
            </div>

            <PostsList />
          </motion.section>
        )}

        {/* Upcoming Events Section */}
        {showEvents && (
          <motion.section
            id="events"
            className="space-y-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariant}
          >
            <div className="text-center">
              <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800">
                📅 {t("upcoming_events_title")}
              </h2>
              <p className="mt-4 text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto">
                {t("upcoming_events_subtitle")}
              </p>
            </div>

            <EventsList />
          </motion.section>
        )}
      </div>
    </div>
  );
}
