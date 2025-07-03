import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import logo from '../../assets/logo/logo.webp';
import { Instagram, Facebook, Twitter } from "lucide-react";

const navLinks = ["home", "services", "projects", "contact"];
const socialLinks = [
  { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
  { name: "Facebook", icon: Facebook, href: "https://facebook.com" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
];

const Footer = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Branding and Logo */}
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
                Greek Community in Tashkent
              </span>
            </div>
            <p className="text-gray-400 text-sm text-center md:text-left">
              {t("footer.description", "Connecting the Greek diaspora in Tashkent with culture, community, and heritage.")}
            </p>
          </motion.div>

          {/* Navigation Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4">{t("footer.navigation", "Navigation")}</h3>
            <ul className="space-y-2 text-center md:text-left">
              {navLinks.map((key) => (
                <motion.li
                  key={key}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: navLinks.indexOf(key) * 0.1 }}
                >
                  <a
                    href={`#${key}`}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                  >
                    {t(key)}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Social Media and Language */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4">{t("footer.connect", "Connect With Us")}</h3>
            <div className="flex space-x-4 mb-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                >
                  <social.icon className="w-6 h-6 text-gray-300 hover:text-blue-400 transition-colors duration-200" />
                </motion.a>
              ))}
            </div>
            <h3 className="text-lg font-semibold mb-2">{t("footer.language", "Language")}</h3>
            <div className="flex space-x-3">
              <LangButton lng="en" label="EN" changeLanguage={changeLanguage} />
              <LangButton lng="ru" label="RU" changeLanguage={changeLanguage} />
              <LangButton lng="el" label="EL" changeLanguage={changeLanguage} />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <p>
            &copy; {new Date().getFullYear()} Greek Community in Tashkent. {t("footer.rights", "All rights reserved.")}
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

// Language button component
const LangButton = ({ lng, label, changeLanguage }) => (
  <button
    onClick={() => changeLanguage(lng)}
    className="px-3 py-1 rounded-full text-gray-300 hover:text-white hover:bg-blue-600 transition-colors duration-200 text-sm font-medium"
  >
    {label}
  </button>
);

export default Footer;