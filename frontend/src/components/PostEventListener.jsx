import PostsList from "../features/posts/PostsList";
import EventsList from "../features/events/EventsList";

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12 space-y-16">
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-800 tracking-tight">
              Latest Posts
            </h2>
            <p className="mt-2 text-gray-600 text-lg">
              Discover the most recent updates and stories
            </p>
          </div>
          <PostsList />
        </section>

        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-800 tracking-tight">
              Upcoming Events
            </h2>
            <p className="mt-2 text-gray-600 text-lg">
              Join us for exciting events and activities
            </p>
          </div>
          <EventsList />
        </section>
      </div>
    </div>
  );
}