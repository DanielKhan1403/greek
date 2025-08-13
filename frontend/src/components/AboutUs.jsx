import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import cultureImg from "../assets/about/cultureImg.webp";
import kidsImg from "../assets/about/kidsImg.webp";
import concertImg from "../assets/about/concertImg.webp";
import joinImg from "../assets/about/joinImg.webp";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

export default function AboutUs() {
  const { t } = useTranslation();

  return (
    <section className="bg-white text-gray-800 py-20 px-4 sm:px-6 lg:px-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        className="max-w-6xl mx-auto space-y-16"
      >
        {/* Заголовок */}
        <div className="text-center space-y-6">
          <h2 className="text-5xl font-extrabold tracking-tight text-blue-800">
            {t("about_title")}
          </h2>
          <p className="text-xl leading-relaxed text-gray-700 max-w-4xl mx-auto">
            {t("about_intro")}
          </p>
        </div>

        {/* Миссия */}
        <div className="space-y-4">
          <h3 className="text-3xl font-semibold text-blue-700">{t("about_mission_title")}</h3>
          <ul className="list-disc list-inside space-y-2 text-lg text-gray-700">
            {t("about_mission_list", { returnObjects: true }).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Направления деятельности */}
        <div className="space-y-6">
          <h3 className="text-3xl font-semibold text-blue-700">{t("about_directions_title")}</h3>

          {/* Культурные мероприятия */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.img
              src={cultureImg}
              alt={t("culture_events_title")}
              className="rounded-2xl shadow-lg w-full object-cover"
              whileHover={{ scale: 1.02 }}
            />
            <div>
              <h4 className="text-2xl font-semibold text-blue-600">{t("culture_events_title")}</h4>
              <ul className="list-disc list-inside text-lg text-gray-700 space-y-2 mt-3">
                {t("culture_events_list", { returnObjects: true }).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Танцевальный ансамбль */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h4 className="text-2xl font-semibold text-blue-600">{t("dance_title")}</h4>
              <ul className="list-disc list-inside text-lg text-gray-700 space-y-2 mt-3">
                {t("dance_list", { returnObjects: true }).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <motion.img
              src={kidsImg}
              alt={t("dance_title")}
              className="rounded-2xl shadow-lg w-full object-cover"
              whileHover={{ scale: 1.02 }}
            />
          </div>

          {/* Образовательные курсы */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.img
              src={concertImg}
              alt={t("education_title")}
              className="rounded-2xl shadow-lg w-full object-cover"
              whileHover={{ scale: 1.02 }}
            />
            <div>
              <h4 className="text-2xl font-semibold text-blue-600">{t("education_title")}</h4>
              <ul className="list-disc list-inside text-lg text-gray-700 space-y-2 mt-3">
                {t("education_list", { returnObjects: true }).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Международное сотрудничество */}
          <div className="space-y-4">
            <h4 className="text-2xl font-semibold text-blue-600">{t("international_title")}</h4>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t("international_list", { returnObjects: true }).join(" ")}
            </p>
          </div>
        </div>

        {/* Как присоединиться */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-semibold text-blue-700">{t("join_us_title")}</h3>
            <ul className="list-disc list-inside text-lg text-gray-700 space-y-2 mt-3">
              {t("join_us_list", { returnObjects: true }).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <motion.img
            src={joinImg}
            alt={t("join_us_title")}
            className="rounded-2xl shadow-lg w-full object-cover"
            whileHover={{ scale: 1.02 }}
          />
        </div>
        

        {/* Кнопка */}
        <div className="text-center pt-10">
          <motion.a
            href="/bemember"
            whileHover={{ scale: 1.05 }}
            className="inline-block bg-blue-600 text-white px-8 py-4 text-lg rounded-full font-medium shadow-md hover:bg-blue-700 transition-colors"
          >
            {t("join_us_button", { defaultValue: "Стать участником" })}
          </motion.a>
        </div>
      </motion.div>
      {/* Greek Holidays Section */}
<motion.div variants={fadeUp} custom={7} className="space-y-6">
  <h3 className="text-3xl font-semibold text-blue-700">{t("holidays_title")}</h3>
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    {t("holidays", { returnObjects: true }).map((holiday, index) => (
      <motion.div
        key={holiday.name}
        variants={fadeUp}
        custom={7.2 + index * 0.2}
        className="bg-white p-6 rounded-xl shadow-md"
      >
        <h4 className="text-xl font-bold text-blue-600">{holiday.name}</h4>
        <p className="text-sm text-gray-500">{holiday.date}</p>
        <p className="mt-2 text-gray-700">{holiday.description}</p>
      </motion.div>
    ))}
  </div>
</motion.div>

    </section>
  );
}