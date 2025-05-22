import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { userService } from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function AuthorProfile() {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const res = await userService.get(`/${id}`);
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
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      {/* Profile Header */}
      <div className="text-center">
        {author.image && (
          <img
            src={author.image}
            alt={author.name}
            className="w-28 h-28 rounded-full mx-auto mb-4 object-cover border-4 border-blue-200"
          />
        )}
        <h2 className="text-3xl font-bold text-gray-800">{author.name}</h2>
        <p className="text-gray-500 text-sm">{author.email}</p>
      </div>

      {/* Bio */}
      {author.bio && (
        <div className="mt-4 text-center">
          <p className="text-gray-700 italic">{`"${author.bio}"`}</p>
        </div>
      )}

      {/* Social Links */}
      <div className="mt-6 flex justify-center gap-6">
        {author.facebook && (
          <a
            href={author.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-xl"
            title="Facebook"
          >
            <FaFacebook />
          </a>
        )}
        {author.instagram && (
          <a
            href={author.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-700 text-xl"
            title="Instagram"
          >
            <FaInstagram />
          </a>
        )}
        {author.linkedin && (
          <a
            href={author.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-800 hover:text-blue-900 text-xl"
            title="LinkedIn"
          >
            <FaLinkedin />
          </a>
        )}
      </div>

      {/* Own Profile Controls */}
      {isOwnProfile && (
        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
          <button
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 w-full sm:w-auto"
            onClick={() => navigate("/profile/edit")}
          >
            Edit Profile
          </button>
          <button
            className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 w-full sm:w-auto"
            onClick={() => navigate("/add")}
          >
            Add Blog
          </button>

        </div>
      )}
    </div>
  );
}
