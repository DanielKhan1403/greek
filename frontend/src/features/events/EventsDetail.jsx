import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/events/${id}/`).then(res => {
      setEvent(res.data);
    });
  }, [id]);

  if (!event) return <div className="text-center mt-10">Загрузка...</div>;

  return (
    <div className="p-4">
      <img src={event.cover_url} alt="" className="rounded mb-4 w-full" />
      <h1 className="text-2xl font-bold mb-1">{event.title}</h1>
      <p className="text-gray-500">{new Date(event.event_date_time).toLocaleString()}</p>
      <p className="mt-3">{event.description}</p>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
        {event.images.map(image => (
          <div key={image.id}>
            <img src={image.image_url} alt={image.caption} className="rounded" />
            {image.caption && <p className="text-xs text-gray-600 mt-1">{image.caption}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
