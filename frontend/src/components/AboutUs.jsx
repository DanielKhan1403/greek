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
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
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
        <div className="text-center space-y-6">
          <h2 className="text-5xl font-extrabold tracking-tight text-blue-800">
            {t("about_title")}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t("about_intro")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.img
            src={cultureImg}
            alt="Greek Culture"
            className="rounded-2xl shadow-lg w-full object-cover"
            whileHover={{ scale: 1.02 }}
          />
          <div className="space-y-5">
            <h3 className="text-2xl font-semibold text-blue-700">
              {t("what_we_do")}
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {t("what_we_do_list", { returnObjects: true }).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-blue-700">
              {t("kids_program")}
            </h3>
            <p className="text-gray-600">{t("kids_program_description")}</p>
          </div>
          <motion.img
            src={kidsImg}
            alt="Kids activities"
            className="rounded-2xl shadow-lg w-full object-cover"
            whileHover={{ scale: 1.02 }}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.img
            src={concertImg}
            alt="Greek concert"
            className="rounded-2xl shadow-lg w-full object-cover"
            whileHover={{ scale: 1.02 }}
          />
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-blue-700">
              {t("celebrations")}
            </h3>
            <p className="text-gray-600">{t("celebrations_description")}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-blue-700">
              {t("join_us")}
            </h3>
            <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: t("join_us_description").replace(/\n/g, "<br />") }} />
            <p className="text-sm text-gray-500">{t("membership_fee_note")}</p>
          </div>
          <motion.img
            src={joinImg}
            alt="Join us"
            className="rounded-2xl shadow-lg w-full object-cover"
            whileHover={{ scale: 1.02 }}
          />
        </div>

        <div className="text-center pt-10">
          <motion.a
            href="/bemember"
            whileHover={{ scale: 1.05 }}
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-medium shadow-md hover:bg-blue-700 transition-colors"
          >
            {t("become_member")}
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
