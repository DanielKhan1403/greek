
import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

const Contacts = () => {
  const { t } = useTranslation();

  return (
    <section className="w-full px-4 py-12 bg-white text-gray-800">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          custom={1}
          className="text-3xl font-bold mb-8 text-center"
        >
          📇 {t("contact_title", { defaultValue: "Контакты" })}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Contact Information */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            custom={2}
            className="space-y-5"
          >
            <div>
              <h3 className="text-xl font-semibold text-gray-700">
                {t("center_name", { defaultValue: "Греческий Культурный Центр" })}
              </h3>
              <p className="text-gray-600">
                {t("center_former_name", {
                  defaultValue:
                    "(бывш. Ташкентское Городское Общество Греческой Культуры)",
                })}
              </p>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="text-blue-600 mt-1" />
              <p>
                
                  
                    ул. Юсуфа Хос Ходжиба, 30А, 100031, Ташкент, Узбекистан
                
              </p>
            </div>

            <div className="flex flex-col items-start">
              <h3 className="text-lg font-semibold mb-4">
                {t("contact_f", { defaultValue: "Contacts" })}
              </h3>
              <ul className="text-gray-600 text-sm space-y-3">
                <li className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-blue-400" />
                  <a
                    href="tel:+998712562803"
                    className="hover:text-blue-400 transition"
                  >
                    {t("chairman", { defaultValue: "Председатель" })}: +998712562803
                  </a>
                </li>
                <li className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-blue-400" />
                  <a
                    href="tel:+998901782202"
                    className="hover:text-blue-400 transition"
                  >
                    {t("vice_chairman", { defaultValue: "Зам. председателя" })}: +998901782202
                  </a>
                </li>
                <li className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-green-400" />
                  <a
                    href="tel:+998881000414"
                    className="hover:text-blue-400 transition"
                  >
                    {t("contact_button_1", { defaultValue: "Контакт 1" })}: +998881000414
                  </a>
                </li>
                <li className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-green-400" />
                  <a
                    href="tel:+998977090689"
                    className="hover:text-blue-400 transition"
                  >
                    {t("contact_button_2", { defaultValue: "Контакт 2" })}: +998977090689
                  </a>
                </li>
                
                <li className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-red-600" />
                  <a href="mailto:greektashkent@gmail.com" className="hover:text-blue-400 transition">
                    greektashkent@gmail.com
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mt-6 mb-2">
                🕒 {t("hours_title", { defaultValue: "Режим работы" })}:
              </h4>
              <ul className="text-sm text-gray-700">
                <li>{t("hours", { defaultValue: "Пн – Пт: 10:00 – 17:00" })}</li>
              </ul>
            </div>
          </motion.div>

          {/* Yandex Map */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            custom={3}
            className="w-full h-80"
          >
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=69.260926%2C41.300502&mode=whatshere&whatshere%5Bpoint%5D=69.260926%2C41.300502&z=17"
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
              className="rounded-xl shadow-lg"
              title={t("map_title", { defaultValue: "Греческий Культурный Центр на карте" })}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
