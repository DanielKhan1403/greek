
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useState } from "react";

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

const tabVariants = {
  active: { scale: 1.05, backgroundColor: "#1E3A8A", color: "#FFFFFF" },
  inactive: { scale: 1, backgroundColor: "#E5E7EB", color: "#1F2937" },
};

export default function OurHistory() {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language || "ru");

  // Image URLs from Unsplash
  const images = {
    intro: "https://images.unsplash.com/photo-1669717815785-c35fbf698bb8?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    history: "https://images.unsplash.com/photo-1717539778198-b453ac88f2ba?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    mission: "https://plus.unsplash.com/premium_photo-1723874529023-f867c1dcb077?q=80&w=1690&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    activities: "https://images.unsplash.com/photo-1663431262590-b2cdcf44cfaf?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <section className="bg-gray-100 text-gray-800 py-20 px-4 sm:px-6 lg:px-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        className="max-w-6xl mx-auto space-y-16"
      >
        {/* Language Switcher */}
        <div className="flex justify-center space-x-4">
          {["ru", "el", "en"].map((lang) => (
            <motion.button
              key={lang}
              variants={tabVariants}
              animate={language === lang ? "active" : "inactive"}
              whileHover={{ scale: 1.1 }}
              onClick={() => handleLanguageChange(lang)}
              className="px-6 py-2 rounded-full font-medium text-lg transition-colors"
            >
              {lang === "ru" && "🇷🇺 Русский"}
              {lang === "el" && "🇬🇷 Ελληνικά"}
              {lang === "en" && "🇬🇧 English"}
            </motion.button>
          ))}
        </div>

        {/* Title */}
        <div className="text-center space-y-6">
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-5xl font-extrabold tracking-tight text-blue-800"
          >
            {t("history_title")}
          </motion.h2>
        </div>

        {/* Intro Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.img
            src={images.intro}
            alt={t("intro_title")}
            className="rounded-2xl shadow-lg w-full object-cover h-64 md:h-80"
            whileHover={{ scale: 1.02 }}
            variants={fadeUp}
            custom={2}
          />
          <motion.div variants={fadeUp} custom={2.5} className="space-y-4">
            <h3 className="text-3xl font-semibold text-blue-700">{t("intro_title")}</h3>
            <p className="text-lg text-gray-700 leading-relaxed">{t("intro_text")}</p>
          </motion.div>
        </div>

        {/* History Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={fadeUp} custom={3} className="space-y-4">
            <h3 className="text-3xl font-semibold text-blue-700">{t("history_subtitle")}</h3>
            <p className="text-lg text-gray-700 leading-relaxed">{t("history_text")}</p>
          </motion.div>
          <motion.img
            src={images.history}
            alt={t("history_subtitle")}
            className="rounded-2xl shadow-lg w-full object-cover h-64 md:h-80"
            whileHover={{ scale: 1.02 }}
            variants={fadeUp}
            custom={3.5}
          />
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.img
            src={images.mission}
            alt={t("mission_title")}
            className="rounded-2xl shadow-lg w-full object-cover h-64 md:h-80"
            whileHover={{ scale: 1.02 }}
            variants={fadeUp}
            custom={4}
          />
          <motion.div variants={fadeUp} custom={4.5} className="space-y-4">
            <h3 className="text-3xl font-semibold text-blue-700">{t("mission_title")}</h3>
            <p className="text-lg text-gray-700 leading-relaxed">{t("mission_text")}</p>
          </motion.div>
        </div>

        {/* Activities Section */}
        <motion.div variants={fadeUp} custom={5} className="space-y-6">
          <h3 className="text-3xl font-semibold text-blue-700">{t("activities_title")}</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {["education", "culture", "celebrations", "social"].map((category, index) => (
              <motion.div
                key={category}
                variants={fadeUp}
                custom={5.5 + index * 0.2}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <h4 className="text-xl font-semibold text-blue-600">{t(`${category}_title`)}</h4>
                <ul className="list-disc list-inside text-lg text-gray-700 space-y-2 mt-3">
                  {t(`${category}_list`, { returnObjects: true }).map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          
          <motion.img
            src={images.activities}
            alt={t("activities_title")}
            className="rounded-2xl shadow-lg w-full object-cover h-64 mt-8"
            whileHover={{ scale: 1.02 }}
            variants={fadeUp}
            custom={6.5}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
