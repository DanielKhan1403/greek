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
    transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
  }),
};

export default function PostsList() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const reduxPosts = useSelector((state) => state.posts.items);
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  const [cachedPosts, setCachedPosts] = useState(() => {
    const cached = localStorage.getItem("cachedPosts");
    return cached ? JSON.parse(cached) : null;
  });

  useEffect(() => {
    if (!cachedPosts && status === "idle") {
      dispatch(fetchPosts());
    }
  }, [status, dispatch, cachedPosts]);

  useEffect(() => {
    if (reduxPosts?.length) {
      setCachedPosts(reduxPosts);
      localStorage.setItem("cachedPosts", JSON.stringify(reduxPosts));
    }
  }, [reduxPosts]);

  const postsToRender = cachedPosts || [];

  if (!postsToRender.length && status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[50vh] bg-gray-50">
        <div className="text-xl font-semibold text-gray-700 animate-pulse">
          {t("loading")}
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
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden transition-all duration-300 border border-gray-100 flex flex-col"
            >
              {/* Image */}
              <div className="aspect-[4/3] bg-gray-100 overflow-hidden relative">
                <img
                  src={post.cover}
                  alt={post.title}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col justify-between flex-1 space-y-3">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {post.short_description}
                </p>
                <div className="text-xs text-gray-500 mt-2 space-y-1">
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

              {/* Button */}
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
