import { useEffect, useState } from "react";
import { blogService } from "../api/axios";
import BlogCard from "../components/BlogCard";

const SavedBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedBlogs = async () => {
      try {
        const res = await blogService.get("/blog/saved/all");
        const saved = res.data?.data || [];

        const blogFetchPromises = saved.map((entry) =>
          blogService.get(`/blog/${entry.blogid}`).then((res) => res.data?.data)
        );

        const fullBlogs = await Promise.all(blogFetchPromises);
        setBlogs(fullBlogs.filter(Boolean));
      } catch (err) {
        console.error("Failed to load saved blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedBlogs();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Your Saved Blogs
      </h2>

      {loading ? (
        <div className="text-center text-blue-500 text-lg font-medium py-10">
          Loading your saved blogs...
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center text-gray-500 py-10 text-lg">
          You haven't saved any blogs yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedBlogs;
