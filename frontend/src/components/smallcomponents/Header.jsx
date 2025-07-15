import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import logo from '../../assets/logo/logo.webp';

const navLinks = ["home", "posts", "events", "contacts", "aboutus"];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const sidebarVariants = {
    open: { x: 0, opacity: 1, transition: { duration: 0.3, ease: "easeInOut" } },
    closed: { x: "-100%", opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } },
  };

  return (
    <header className="bg-white shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="flex items-center space-x-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.img
            src={logo}
            alt="Greek Community Logo"
            className="w-12 h-12 rounded-full object-cover shadow-md"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
          />
          <span className="text-2xl font-bold text-gray-800 tracking-tight">
            Greek Community in Tashkent
          </span>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-lg">
          {navLinks.map((key) => (
  <a
    key={key}
    href={key === "home" ? "/" : `/${key}`}
    className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
  >
    {t(key)}
  </a>
))}
        </nav>

        {/* Desktop Language + Button */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <LangButton lng="en" label="EN" changeLanguage={changeLanguage} />
            <LangButton lng="ru" label="RU" changeLanguage={changeLanguage} />
            <LangButton lng="el" label="EL" changeLanguage={changeLanguage} />
          </div>
          <a
            href="/bemember"
            className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            {t("become_member")}
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <motion.div
        className="md:hidden fixed top-0 left-0 h-full w-64 bg-white shadow-2xl z-50"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
      >
        <div className="flex flex-col p-6 space-y-4">
          <div className="flex justify-end">
            <button
              className="text-gray-700 focus:outline-none"
              onClick={() => setIsOpen(false)}
            >
              <X size={28} />
            </button>
          </div>
          {navLinks.map((key) => (
            <a
              key={key}
               href={key === "home" ? "/" : `/${key}`}
              className="py-3 text-lg text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
              onClick={() => setIsOpen(false)}
            >
              {t(key)}
            </a>
          ))}

          <div className="pt-4 border-t border-gray-200 flex flex-col space-y-3">
            <div className="flex space-x-2 justify-start">
              <LangButton lng="en" label="EN" changeLanguage={changeLanguage} />
              <LangButton lng="ru" label="RU" changeLanguage={changeLanguage} />
              <LangButton lng="el" label="EL" changeLanguage={changeLanguage} />
            </div>
            <a
              href="/bemember"
              className="py-2 px-4 bg-blue-600 text-white rounded-full text-center font-medium hover:bg-blue-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {t("become_member")}
            </a>
          </div>
        </div>
      </motion.div>

      {/* Mobile Overlay */}
      {isOpen && (
        <motion.div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </header>
  );
};

const LangButton = ({ lng, label, changeLanguage }) => (
  <button
    onClick={() => changeLanguage(lng)}
    className="px-3 py-1 rounded-full text-gray-600 hover:text-white hover:bg-blue-600 transition-colors duration-200 text-sm font-medium"
  >
    {label}
  </button>
);

export default Header;
