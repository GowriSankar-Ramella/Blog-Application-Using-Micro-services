import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { authorService, blogService, userService } from "../api/axios";
import { useAuth } from "../context/AuthContext";
import CommentSection from "../pages/CommentSection";

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [author, setAuthor] = useState({});
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  const commentRef = useRef(null);

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

    // Show back-to-top button after scrolling down 300px
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [id, user]);

  const handleSave = async () => {
    if (!user) {
      alert("You must be logged in to save blogs.");
      return;
    }
    try {
      setSaving(true);
      await blogService.post(`/save/${id}`);
      setIsSaved((prev) => !prev);
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

  // Scroll smoothly to comments
  const scrollToComments = () => {
    if (commentRef.current) {
      commentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Scroll smoothly back to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Loading skeletons (simplified version)
  if (loading)
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10 animate-pulse">
        <div className="w-full h-72 bg-gray-300 rounded-lg mb-6"></div>
        <div className="h-10 bg-gray-300 rounded mb-4"></div>
        <div className="h-6 bg-gray-300 rounded mb-8"></div>
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-full bg-gray-300"></div>
          <div className="h-6 w-32 bg-gray-300 rounded"></div>
        </div>
        <div className="space-y-4">
          <div className="h-5 bg-gray-300 rounded"></div>
          <div className="h-5 bg-gray-300 rounded"></div>
          <div className="h-5 bg-gray-300 rounded"></div>
          <div className="h-5 bg-gray-300 rounded"></div>
          <div className="h-5 bg-gray-300 rounded"></div>
        </div>
      </div>
    );

  if (!blog)
    return (
      <div className="text-center mt-10 text-red-600">Blog not found.</div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      {/* Blog Image */}
      <img
        src={blog.image}
        alt="Blog Cover"
        className="w-full h-72 object-contain rounded-lg border border-gray-200 shadow-sm mb-6 bg-gray-50"
      />

      {/* Blog Title */}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
        {blog.title}
      </h1>

      {/* Blog Description */}
      <p className="text-lg text-gray-700 mb-8 italic">{blog.description}</p>

      {/* Author Info */}
      <div
        className="flex items-center gap-4 mb-8 cursor-pointer hover:underline"
        onClick={() => navigate(`/profile/${author._id}`)}
      >
        <img
          src={author.image || "/default-avatar.png"}
          alt="Author"
          className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
        />
        <p className="font-semibold text-blue-700 text-lg">{author.name}</p>
      </div>

      {/* Scroll to Comments Button */}
      <button
        onClick={scrollToComments}
        className="mb-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition"
      >
        Jump to Comments
      </button>

      {/* Blog Content */}
      <article className="prose prose-lg max-w-none mb-10 text-gray-800">
        <div dangerouslySetInnerHTML={{ __html: blog.blogContent }} />
      </article>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mb-10">
        {user && user._id === blog.author && (
          <>
            <button
              onClick={() => navigate(`/edit/${blog._id}`)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg shadow-md transition"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg shadow-md transition"
            >
              Delete
            </button>
          </>
        )}
        <button
          onClick={handleSave}
          disabled={saving}
          className={`${
            isSaved ? "bg-gray-700 hover:bg-gray-800" : "bg-blue-600 hover:bg-blue-700"
          } text-white px-5 py-2 rounded-lg shadow-md transition`}
        >
          {saving ? "Processing..." : isSaved ? "Unsave" : "Save"}
        </button>
      </div>

      {/* Comment Section */}
      <div ref={commentRef}>
        <CommentSection blogId={blog._id} />
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition"
          aria-label="Back to top"
          title="Back to top"
        >
          ↑
        </button>
      )}
    </div>
  );
}
