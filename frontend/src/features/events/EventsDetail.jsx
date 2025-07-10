import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { BASE_URL } from "../../BaseUrl";

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/v1/main/events/${id}/`)
      .then((res) => setEvent(res.data))
      .catch((err) => console.error("Error fetching event:", err));
  }, [id]);

  const openImageViewer = (image, index) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
  };

  const closeImageViewer = () => {
    setSelectedImage(null);
  };

  const goToPreviousImage = () => {
    const newIndex = (currentImageIndex - 1 + event.images.length) % event.images.length;
    setSelectedImage(event.images[newIndex]);
    setCurrentImageIndex(newIndex);
  };

  const goToNextImage = () => {
    const newIndex = (currentImageIndex + 1) % event.images.length;
    setSelectedImage(event.images[newIndex]);
    setCurrentImageIndex(newIndex);
  };

  if (!event)
    return (
      <div className="flex items-center justify-center min-h-screen text-xl text-gray-400 font-['Inter'] animate-pulse">
        Загрузка...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6 md:p-10 lg:p-16 max-w-7xl mx-auto font-['Inter']">
      {/* Cover Image with Parallax Effect */}
      <motion.div
        className="relative overflow-hidden rounded-3xl shadow-2xl mb-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.img
          src={`${BASE_URL}${event.cover_url}`}
          alt="Обложка события"
          className="w-full max-h-[600px] object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </motion.div>

      {/* Event Title */}
      <motion.h1
        className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
      >
        {event.title}
      </motion.h1>

      {/* Event Date and Time */}
      <motion.p
        className="text-lg text-gray-500 mb-8 italic text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
      >
        {new Date(event.event_date_time).toLocaleString("ru-RU", {
          dateStyle: "long",
          timeStyle: "short",
        })}
      </motion.p>

      {/* Event Description */}
      <motion.p
        className="text-gray-700 text-lg leading-relaxed mb-12 max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
      >
        {event.description}
      </motion.p>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {event.images.map((image, index) => (
          <motion.div
            key={image.id}
            className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 bg-white cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 * index, ease: "easeOut" }}
            whileHover={{ scale: 1.03 }}
            onClick={() => openImageViewer(image, index)}
          >
            <img
              src={`${BASE_URL}${image.image_url || image.image}`}
              alt={image.caption || `Изображение ${index + 1}`}
              className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {image.caption && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white text-sm font-medium p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0, y: 0 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {image.caption}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Image Viewer Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative w-full max-w-4xl">
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 text-white text-2xl font-bold bg-gray-900/50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-900/70 transition"
                onClick={closeImageViewer}
              >
                ×
              </button>

              {/* Previous Button */}
              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl bg-gray-900/50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-900/70 transition"
                onClick={goToPreviousImage}
              >
                ‹
              </button>

              {/* Next Button */}
              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl bg-gray-900/50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-900/70 transition"
                onClick={goToNextImage}
              >
                ›
              </button>

              {/* Image */}
              <motion.img
                src={`${BASE_URL}${selectedImage.image_url || selectedImage.image}`}
                alt={selectedImage.caption || "Изображение события"}
                className="w-full max-h-[80vh] object-contain rounded-lg"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />

              {/* Caption */}
              {selectedImage.caption && (
                <motion.p
                  className="text-white text-center mt-4 text-lg font-medium"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  {selectedImage.caption}
                </motion.p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}