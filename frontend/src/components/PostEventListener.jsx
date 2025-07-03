import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, fetchEvents } from "../features/contentSlice";

export default function PostEventList() {
  const dispatch = useDispatch();
  const { loading, posts, events, error } = useSelector((state) => state.content);

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchEvents());
  }, [dispatch]);

  if (loading) return <p className="text-center mt-16 text-gray-500 text-lg font-medium animate-pulse">Loading...</p>;
  if (error) return <p className="text-center mt-16 text-red-500 text-lg font-medium">Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Posts Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            📰 Latest Posts
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden transform hover:-translate-y-1"
              >
                <img
                  src={post.cover}
                  alt="Post cover"
                  className="w-full h-56 object-cover"
                  onError={(e) => (e.target.src = "/media/defaults/default_cover.jpg")}
                />
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {post.short_description}
                  </p>
                  <p className="text-xs text-gray-400">
                    Posted: {new Date(post.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Events Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            📅 Upcoming Events
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden transform hover:-translate-y-1"
              >
                <img
                  src={event.cover}
                  alt="Event cover"
                  className="w-full h-56 object-cover"
                  onError={(e) => (e.target.src = "/media/defaults/default_cover.jpg")}
                />
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {event.short_description}
                  </p>
                  {event.event_date_time && !isNaN(new Date(event.event_date_time)) ? (
                    <p className="text-sm text-blue-600 font-medium">
                      🕒 Happening: {new Date(event.event_date_time).toLocaleString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      })}
                    </p>
                  ) : (
                    <p className="text-sm text-red-500">⛔ Invalid date</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}