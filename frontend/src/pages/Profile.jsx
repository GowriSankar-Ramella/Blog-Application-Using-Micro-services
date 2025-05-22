import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { userService } from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function AuthorProfile() {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const res = await userService.get(`/${id}`); // Backend should return full public profile
        setAuthor(res.data.data);
      } catch (err) {
        console.error("Error fetching author:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthor();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;
  if (!author) return <p className="text-center mt-10 text-red-600">Author not found.</p>;

  const isOwnProfile = user && user._id === author._id;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded">
      {/* Profile Header */}
      <div className="text-center">
        {author.image && (
          <img
            src={author.image}
            alt={author.name}
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border"
          />
        )}
        <h2 className="text-2xl font-bold">{author.name}</h2>
        <p className="text-gray-600">{author.email}</p>
      </div>

      {/* Bio */}
      {author.bio && (
        <div className="mt-4 text-center">
          <p className="text-gray-700">{author.bio}</p>
        </div>
      )}

      {/* Social Links */}
      <div className="mt-6 flex justify-center gap-4">
        {author.facebook && (
          <a
            href={author.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Facebook
          </a>
        )}
        {author.instagram && (
          <a
            href={author.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:underline"
          >
            Instagram
          </a>
        )}
        {author.linkedin && (
          <a
            href={author.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-800 hover:underline"
          >
            LinkedIn
          </a>
        )}
      </div>

      {/* Own Profile Controls */}
      {isOwnProfile && (
        <div className="mt-6 flex justify-center gap-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => navigate("/profile/edit")}
          >
            Edit Profile
          </button>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={() => navigate("/add")}
          >
            Add Blog
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
