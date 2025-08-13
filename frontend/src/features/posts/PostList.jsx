import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "./postsSlice";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" },
  }),
};

export default function PostsList() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const reduxPosts = useSelector((state) => state.posts.items);
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  const [cachedPosts, setCachedPosts] = useState(() => {
    const cached = localStorage.getItem("posts_cache");
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (parsed.data && Array.isArray(parsed.data)) {
          const cacheDuration = 1000 * 60 * 60; // 1 час
          if (Date.now() - parsed.timestamp < cacheDuration) {
            return parsed.data;
          }
        }
      } catch (e) {
        console.error("Error parsing cached posts:", e);
      }
    }
    return null;
  });

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (reduxPosts?.length) {
      const cacheData = {
        data: reduxPosts,
        timestamp: Date.now(),
      };
      setCachedPosts(reduxPosts);
      localStorage.setItem("posts_cache", JSON.stringify(cacheData));
    }
  }, [reduxPosts]);

  const postsToRender = cachedPosts || reduxPosts || [];

  if (!postsToRender.length && status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[50vh] bg-gray-50">
        <div className="text-lg sm:text-xl font-semibold text-gray-700 animate-pulse">
          {t("loading")}
        </div>
      </div>
    );
  }

  if (status === "failed" && !postsToRender.length) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] bg-gray-50">
        <div className="text-lg sm:text-xl font-semibold text-red-600 text-center px-4">
          {t("error")}: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-3 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-10">
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
        {postsToRender.map((post, i) => (
          <motion.article
            key={post.id}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={cardVariant}
          >
            <Link
              to={`/posts/${post.id}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.12)] transition-all duration-300 border border-gray-100 flex flex-col"
            >
              <div className="aspect-[4/3] bg-gray-100 overflow-hidden relative">
                <img
                  src={post.cover}
                  alt={post.title}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 space-y-3">
                <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 text-sm sm:text-base line-clamp-3">
                  {post.short_description}
                </p>
                <div className="text-xs sm:text-sm text-gray-500 mt-2 space-y-1">
                  <p>
                    🗓️ {t("created")}:{" "}
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
                      🔄 {t("updated")}:{" "}
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
              <div className="px-4 sm:px-5 pb-4 sm:pb-5">
                <span className="inline-block text-sm sm:text-base font-medium text-blue-600 group-hover:underline transition">
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