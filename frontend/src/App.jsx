import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { store } from "./app/store";

import Preloader from "./components/preloaders/Preloader";
import Header from "./components/smallcomponents/Header";
import Footer from "./components/smallcomponents/Footer";
import Home from './components/PostEventListener'

import PostDetail from "./features/posts/PostListDetail";
import EventsList from "./features/events/EventsList";
import EventDetail from "./features/events/EventsDetail";
import BeMemberForm from "./components/BeMemberForm";
import PostsList from "./features/posts/PostList";
import AboutUs from "./components/AboutUs";
import NotFound from "./components/NotFound";

function AppContent() {
  const [loading, setLoading] = useState(true);
  const { status: postsStatus } = useSelector((state) => state.posts);
  const { status: eventsStatus } = useSelector((state) => state.events);

  const MINIMUM_LOADER_TIME = 2000;

  useEffect(() => {
    const startTime = Date.now();

    const waitForImages = () => {
      const images = document.getElementsByTagName("img");
      const promises = Array.from(images).map(
        (img) =>
          new Promise((resolve) => {
            if (img.complete) resolve();
            else {
              img.onload = resolve;
              img.onerror = resolve;
            }
          })
      );
      return Promise.all(promises);
    };

    waitForImages().then(() => {
      const elapsed = Date.now() - startTime;
      const delay = MINIMUM_LOADER_TIME - elapsed;
      if (delay > 0) {
        setTimeout(() => setLoading(false), delay);
      } else {
        setLoading(false);
      }
    });
  }, []);

  const globalLoading =
    loading || postsStatus === "loading" || eventsStatus === "loading";

  if (globalLoading) return <Preloader />;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <main className="pt-16 flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bemember" element={<BeMemberForm />} />
          <Route path='/posts' element={<PostsList /> } />
          <Route path='/aboutus' element={<AboutUs /> } />


          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/events" element={<EventsList />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="*" element={<NotFound />} /> {/* Этот должен быть последним */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
}

export default App;
