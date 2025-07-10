import { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function BeMemberForm() {
  const { t } = useTranslation();
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

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    } catch (err) {
      if (err.response?.data) {
        setErrors(err.response.data);
      }
    }
  };

  const fields = [
    ["full_name", t("full_name")],
    ["birth_date", t("birth_date"), "date"],
    ["phone_number", t("phone_number")],
    ["telegram_account", t("telegram_account")],
    ["email", t("email"), "email"],
    ["address", t("address")],
    ["greek_ancestor_relation", t("greek_ancestor_relation")],
    ["greek_ancestor_surname", t("greek_ancestor_surname")],
    ["about_yourself", t("about_yourself")],
    ["interested_activities", t("interested_activities")],
    ["your_contribution", t("your_contribution")],
  ];

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">{t("title")}</h2>

      {success && (
        <div className="mb-4 text-green-600">{t("success_message")}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map(([name, label, type = "text"]) => (
          <div key={name}>
            <label className="block font-medium text-gray-700">{label}</label>
            {["address", "about_yourself", "interested_activities", "your_contribution"].includes(name) ? (
              <textarea
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded mt-1"
              />
            ) : (
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded mt-1"
              />
            )}
            {errors[name] && (
              <div className="text-sm text-red-600">{errors[name]}</div>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {t("submit")}
        </button>
      </form>
    </div>
  );
}
