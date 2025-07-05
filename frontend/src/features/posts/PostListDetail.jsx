import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/v1/main/posts/${id}/`).then(res => setPost(res.data));
  }, [id]);

  if (!post) return <div>Загрузка...</div>;

  return (
    <div className="p-4">
      <img src={post.cover_url} alt="" className="w-full rounded mb-4" />
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="mt-2">{post.description}</p>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-2">
        {post.images.map(img => (
          <div key={img.id}>
            <img src={img.image_url} className="rounded" />
            {img.caption && <p className="text-sm text-gray-600">{img.caption}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
