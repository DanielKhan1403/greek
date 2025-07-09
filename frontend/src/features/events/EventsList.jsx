import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "./eventsSlice";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
  }),
};

export default function EventsList() {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.items);
  const status = useSelector((state) => state.events.status);
  const error = useSelector((state) => state.events.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEvents());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[50vh] bg-gray-50">
        <div className="text-xl font-semibold text-gray-700 animate-pulse">
          Загрузка событий...
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="flex items-center justify-center min-h-[50vh] bg-gray-50">
        <div className="text-xl font-semibold text-red-600">
          Ошибка: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="px-2 sm:px-4 lg:px-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event, i) => (
          <motion.div
            key={event.id}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariant}
          >
            <Link
              to={`/events/${event.id}`}
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden transition-all duration-300 border border-gray-100"
            >
              <div className="w-full h-64 bg-gray-100 flex items-center justify-center overflow-hidden">
  <img
    src={event.cover}
    alt={event.title}
    className="max-h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
  />
</div>
              <div className="p-5 space-y-3">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
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
                  Подробнее →
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
