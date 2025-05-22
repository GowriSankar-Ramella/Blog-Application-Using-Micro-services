import { useEffect, useState } from "react";
import { blogService} from "../api/axios";
import BlogCard from "../components/BlogCard"; // Adjust the path if different

 const SavedBlogs= () =>{
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
        setBlogs(fullBlogs.filter(Boolean)); // Remove any nulls
      } catch (err) {
        console.error("Failed to load saved blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedBlogs();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      {loading ? (
        <div className="text-center mt-10 text-lg">Loading blogs...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {blogs.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">No blogs found.</p>
          ) : (
            blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
          )}
        </div>
      )}
    </div>
  );
}

export default SavedBlogs