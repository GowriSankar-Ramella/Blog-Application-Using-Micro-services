import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { authorService, blogService, userService } from "../api/axios";
import { useAuth } from "../context/AuthContext";
import CommentSection from "../pages/CommentSection";
import axios from "axios";

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [author, setAuthor] = useState({});
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const res = await blogService.get(`/blog/${id}`);
        const blogData = res.data?.data;
        setBlog(blogData);

        const authorRes = await userService.get(`/${blogData.author}`);
        setAuthor(authorRes.data?.data);
      } catch (err) {
        console.error("Failed to load blog", err);
      } finally {
        setLoading(false);
      }
    };

    const checkIfSaved = async () => {
      try {
        const res = await blogService.get("/blog/saved/all");
        const savedList = res.data?.data || [];
        const isAlreadySaved = savedList.some((entry) => entry.blogid === id);
        setIsSaved(isAlreadySaved);
      } catch (err) {
        console.error("Failed to check saved status:", err);
      }
    };

    fetchBlogDetails();
    if (user) checkIfSaved();
  }, [id, user]);

  const handleSave = async () => {
    if (!user) {
      alert("You must be logged in to save blogs.");
      return;
    }

    try {
      setSaving(true);
      await blogService.post(`/save/${id}`);
      setIsSaved((prev) => !prev); // toggle saved status
    } catch (err) {
      console.error("Failed to save/unsave blog:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await authorService.delete(`/delete/${id}`);
        navigate("/");
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  if (loading) return <div className="text-center mt-10">Loading blog...</div>;
  if (!blog) return <div className="text-center mt-10">Blog not found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Blog Image */}
      <img
        src={blog.image}
        alt="Blog Cover"
        className="w-full h-64 object-cover rounded-lg mb-4"
      />

      {/* Blog Title */}
      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>

      {/* Blog Description */}
      <p className="text-gray-600 mb-4">{blog.description}</p>

      {/* Author Info */}
      <div
        className="flex items-center gap-3 mb-6 cursor-pointer"
        onClick={() => navigate(`/profile/${author._id}`)}
      >
        <img
          src={author.image}
          alt="Author"
          className="w-10 h-10 rounded-full object-cover"
        />
        <p className="font-medium hover:underline">{author.name}</p>
      </div>

      {/* Blog Content */}
      <div className="prose max-w-none mb-6">
        <div dangerouslySetInnerHTML={{ __html: blog.blogContent }} />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-6">
        {user && user._id === blog.author && (
          <>
            <button
              onClick={() => navigate(`/edit/${blog._id}`)}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </>
        )}
        <button
          onClick={handleSave}
          disabled={saving}
          className={`${
            isSaved ? "bg-gray-600 hover:bg-gray-700" : "bg-blue-600 hover:bg-blue-700"
          } text-white px-4 py-2 rounded`}
        >
          {saving ? "Processing..." : isSaved ? "Unsave" : "Save"}
        </button>
      </div>

      {/* Comment Section */}
      <CommentSection blogId={blog._id} />
    </div>
  );
}
