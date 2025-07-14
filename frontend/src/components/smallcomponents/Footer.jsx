import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import logo from '../../assets/logo/logo.webp';
import { Instagram, Send } from "lucide-react";

const navLinks = ["home", "posts", "events", "contact", "aboutus"];

const socialLinks = [
  {
    name: "greeks_house",
    icon: Instagram,
    href: "https://www.instagram.com/greeks_house?igsh=NnU2MzI3OGdvcTBz",
  },
  {
    name: "greeks_uzbekistan",
    icon: Instagram,
    href: "https://www.instagram.com/greeks_uzbekistan?igsh=b3ZrcWFjbnVxdmti",
  },
  {
    name: "Telegram",
    icon: Send,
    href: "https://t.me/TGOGK2020",
  },
];

const Footer = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Branding */}
          <motion.div
            className="flex flex-col items-center md:items-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <motion.img
                src={logo}
                alt="Greek Community Logo"
                className="w-12 h-12 rounded-full object-cover shadow-md"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
              />
              <span className="text-2xl font-bold tracking-tight">
                {t("title_f", "Greek Community in Tashkent")}
              </span>
            </div>
            <p className="text-gray-400 text-sm text-center md:text-left">
              {t(
                "description",
                "Connecting the Greek diaspora in Tashkent with culture, community, and heritage."
              )}
            </p>
          </motion.div>

          {/* Navigation */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4">{t("navigation", "Navigation")}</h3>
            <ul className="space-y-2 text-center md:text-left">
              {navLinks.map((key) => (
                <motion.li
                  key={key}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: navLinks.indexOf(key) * 0.1 }}
                >
                  <a
                    href={key === "home" ? "/" : `/${key}/`}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                  >
                    {t(`${key}`)}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4">{t("contact_f", "Contacts")}</h3>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>
                <a href="mailto:greekcommunity.tashkent@gmail.com" className="hover:text-blue-400 transition">
                  greekcommunity.tashkent@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+998901234567" className="hover:text-blue-400 transition">
                  +998 90 123 45 67
                </a>
              </li>
              <li>{t("city", "Tashkent, Uzbekistan")}</li>
            </ul>
            <div className="mt-4 text-gray-400 text-sm">
              <p className="mb-2">{t("footer.addressLabel", "Our address")}:</p>
              <a
                href="https://yandex.uz/maps/10335/tashkent/house/YkAYdAFgQEcBQFprfX9xcXljZg==/?ll=69.260926%2C41.300502&z=17"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
              >
                {t("fullAddress", "Юсуф-Хос-Ходжиб 30А, Ташкент, Узбекистан 100031")}
              </a>
            </div>
          </div>

          {/* Social & Language */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4">{t("connect", "Connect With Us")}</h3>
            <div className="flex space-x-4 mb-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                  title={social.name}
                >
                  <social.icon className="w-6 h-6 text-gray-300 hover:text-blue-400 transition-colors duration-200" />
                </motion.a>
              ))}
            </div>
            <h3 className="text-lg font-semibold mb-2">{t("language", "Language")}</h3>
            <div className="flex space-x-3">
              <LangButton lng="en" label="EN" changeLanguage={changeLanguage} />
              <LangButton lng="ru" label="RU" changeLanguage={changeLanguage} />
              <LangButton lng="el" label="EL" changeLanguage={changeLanguage} />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="mt-10 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <p>
            &copy; {new Date().getFullYear()} {t("title_f", "Greek Community in Tashkent")}. {t("rights", "All rights reserved.")}
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

const LangButton = ({ lng, label, changeLanguage }) => (
  <button
    onClick={() => changeLanguage(lng)}
    className="px-3 py-1 rounded-full text-gray-300 hover:text-white hover:bg-blue-600 transition-colors duration-200 text-sm font-medium"
  >
    {label}
  </button>
);

export default Footer;
