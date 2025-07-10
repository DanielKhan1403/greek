import PostsList from "../features/posts/PostList";
import EventsList from "../features/events/EventsList";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const sectionVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="bg-gradient-to-b from-white to-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-16 space-y-28">

        {/* Latest Posts */}
        <motion.section
          className="space-y-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariant}
        >
          <div className="text-center">
            <h2 className="text-5xl font-extrabold text-gray-800 tracking-tight">
              📰 {t("latest_posts_title")}
            </h2>
            <p className="mt-3 text-gray-600 text-lg max-w-xl mx-auto">
              {t("latest_posts_subtitle")}
            </p>
          </div>
          <PostsList />
        </motion.section>

        {/* Upcoming Events */}
        <motion.section
          className="space-y-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariant}
        >
          <div className="text-center">
            <h2 className="text-5xl font-extrabold text-gray-800 tracking-tight">
              📅 {t("upcoming_events_title")}
            </h2>
            <p className="mt-3 text-gray-600 text-lg max-w-xl mx-auto">
              {t("upcoming_events_subtitle")}
            </p>
          </div>
          <EventsList />
        </motion.section>

      </div>
    </div>
  );
}
