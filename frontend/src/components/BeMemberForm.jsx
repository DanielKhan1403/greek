import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

export default function BeMemberForm() {
  const { t } = useTranslation();
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    full_name: "",
    birth_date: "",
    phone_number: "",
    telegram_account: "",
    email: "",
    address: "",
    greek_ancestor_relation: "",
    greek_ancestor_surname: "",
    about_yourself: "",
    interested_activities: "",
    your_contribution: "",
  });

  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (success && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [success]);

  const helpTexts = {
    full_name: t("help_full_name"),
    birth_date: t("help_birth_date"),
    phone_number: t("help_phone_number"),
    telegram_account: t("help_telegram_account"),
    email: t("help_email"),
    address: t("help_address"),
    greek_ancestor_relation: t("help_greek_ancestor_relation"),
    greek_ancestor_surname: t("help_greek_ancestor_surname"),
    about_yourself: t("help_about_yourself"),
    interested_activities: t("help_interested_activities"),
    your_contribution: t("help_your_contribution"),
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.full_name.trim()) newErrors.full_name = t("error_required");
    if (!formData.birth_date) newErrors.birth_date = t("error_required");
    if (!formData.phone_number.match(/^\+?\d{10,14}$/))
      newErrors.phone_number = t("error_phone_number");
    if (!formData.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/))
      newErrors.email = t("error_email");
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccess(false);

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const csrf = document.cookie
        .split("; ")
        .find((row) => row.startsWith("csrftoken="))
        ?.split("=")[1];

      await axios.post(
        "http://127.0.0.1:8000/api/v1/social-works/be-member/",
        formData,
        {
          headers: {
            "X-CSRFToken": csrf,
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess(true);
      setErrors({});
      setFormData({
        full_name: "",
        birth_date: "",
        phone_number: "",
        telegram_account: "",
        email: "",
        address: "",
        greek_ancestor_relation: "",
        greek_ancestor_surname: "",
        about_yourself: "",
        interested_activities: "",
        your_contribution: "",
      });
    } catch (err) {
      if (err.response?.data) {
        setErrors(err.response.data);
      } else {
        setErrors({ general: t("error_general") });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const fields = [
    ["full_name", t("full_name"), "text"],
    ["birth_date", t("birth_date"), "date"],
    ["phone_number", t("phone_number"), "tel"],
    ["telegram_account", t("telegram_account"), "text"],
    ["email", t("email"), "email"],
    ["address", t("address"), "textarea"],
    ["greek_ancestor_relation", t("greek_ancestor_relation"), "text"],
    ["greek_ancestor_surname", t("greek_ancestor_surname"), "text"],
    ["about_yourself", t("about_yourself"), "textarea"],
    ["interested_activities", t("interested_activities"), "textarea"],
    ["your_contribution", t("your_contribution"), "textarea"],
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <motion.div
        ref={formRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          {t("title")}
        </h2>

        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg flex items-center gap-2"
            >
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {t("success_message")}
            </motion.div>
          )}

          {errors.general && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg"
            >
              {errors.general}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-6">
          {fields.map(([name, label, type]) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-2"
            >
              <label className="block text-sm font-medium text-gray-700">
                {label}
              </label>
              {type === "textarea" ? (
                <textarea
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors[name] ? "border-red-500" : "border-gray-300"
                  }`}
                  rows="4"
                />
              ) : (
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors[name] ? "border-red-500" : "border-gray-300"
                  }`}
                />
              )}
              <AnimatePresence>
                {errors[name] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-sm text-red-600"
                  >
                    {errors[name]}
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="text-sm text-gray-500">{helpTexts[name]}</div>
            </motion.div>
          ))}

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full bg-blue-600 text-white p-3 rounded-lg font-medium transition-colors ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? t("submitting") : t("submit")}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
