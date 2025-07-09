import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "./postsSlice";
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

export default function PostsList() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.items);
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[50vh] bg-gray-50">
        <div className="text-xl font-semibold text-gray-700 animate-pulse">
          Загрузка постов...
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
        {posts.map((post, i) => (
          <motion.div
            key={post.id}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariant}
          >
            <Link
              to={`/posts/${post.id}`}
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden transition-all duration-300 border border-gray-100"
            >
              <div className="w-full h-64 bg-gray-100 flex items-center justify-center overflow-hidden">
  <img
    src={post.cover}
    alt={post.title}
    className="max-h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
  />
</div>
              <div className="p-5 space-y-3">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {post.short_description}
                </p>
                <div className="text-xs text-gray-500 mt-2 space-y-1">
                  <p>
                    🗓️ Создано:{" "}
                    {new Date(post.created_at).toLocaleString("ru-RU", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  {post.updated_at && (
                    <p>
                      🔄 Обновлено:{" "}
                      {new Date(post.updated_at).toLocaleString("ru-RU", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  )}
                </div>
              </div>
              <div className="px-5 pb-5">
                <span className="inline-block text-sm font-medium text-blue-600 group-hover:underline transition">
                  Читать полностью →
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
