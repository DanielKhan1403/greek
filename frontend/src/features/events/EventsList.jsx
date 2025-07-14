import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "./eventsSlice";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
  }),
};

export default function EventsList() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const reduxEvents = useSelector((state) => state.events.items);
  const status = useSelector((state) => state.events.status);
  const error = useSelector((state) => state.events.error);

  const [cachedEvents, setCachedEvents] = useState(() => {
    const cached = localStorage.getItem("cachedEvents");
    return cached ? JSON.parse(cached) : null;
  });

  useEffect(() => {
    if (!cachedEvents && status === "idle") {
      dispatch(fetchEvents());
    }
  }, [status, dispatch, cachedEvents]);

  useEffect(() => {
    if (reduxEvents?.length) {
      setCachedEvents(reduxEvents);
      localStorage.setItem("cachedEvents", JSON.stringify(reduxEvents));
    }
  }, [reduxEvents]);

  const eventsToRender = cachedEvents || [];

  if (!eventsToRender.length && status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[50vh] bg-gray-50">
        <div className="text-xl font-semibold text-gray-700 animate-pulse">
          {t("loading_events")}
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="flex items-center justify-center min-h-[50vh] bg-gray-50">
        <div className="text-xl font-semibold text-red-600">
          {t("error")}: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {eventsToRender.map((event, i) => (
          <motion.article
            key={event.id}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={cardVariant}
          >
            <Link
              to={`/events/${event.id}`}
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden transition-all duration-300 border border-gray-100 flex flex-col"
            >
              <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                <img
                  src={event.cover}
                  alt={event.title || "Изображение события"}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5 flex flex-col justify-between flex-1 space-y-3">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {event.title}
                </h2>
                <p className="text-sm text-gray-500 font-medium">
                  📅{" "}
                  {new Date(event.event_date_time).toLocaleString("ru-RU", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {event.short_description}
                </p>
              </div>
              <div className="px-5 pb-5">
                <span className="inline-block text-sm font-medium text-blue-600 group-hover:underline transition">
                  {t("read_more")}
                </span>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
