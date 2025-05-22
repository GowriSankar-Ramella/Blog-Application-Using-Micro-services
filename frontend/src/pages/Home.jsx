import { useEffect, useState } from "react";
import { blogService, userService } from "../api/axios";
import BlogCard from "../components/BlogCard";
import { FiSearch, FiFilter } from "react-icons/fi";

const categoriesList = ["Technology", "Travel", "Education", "Food", "Lifestyle", "Business"];

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (search) queryParams.append("search", search);
        if (selectedCategories.length > 0) {
          queryParams.append("category", selectedCategories.join(","));
        }

        const blogRes = await blogService.get(`/blog/all?${queryParams.toString()}`);
        const blogList = blogRes.data?.data || [];

        const enrichedBlogs = await Promise.all(
          blogList.map(async (blog) => {
            try {
              const userRes = await userService.get(`/${blog.author}`);
              const author = userRes.data?.data || {};
              return { ...blog, author };
            } catch {
              return { ...blog, author: {} };
            }
          })
        );

        setBlogs(enrichedBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [search, selectedCategories]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex gap-6">
      {/* Sidebar Filter */}
      {showFilters && (
        <aside className="w-64 shrink-0 border border-gray-200 rounded-xl p-4 shadow-sm bg-white">
          {/* Search */}
          <div className="relative mb-6">
            <FiSearch className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search blogs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

          {/* Categories */}
          <h3 className="font-semibold mb-3 text-gray-700">Categories</h3>
          <div className="space-y-2">
            {categoriesList.map((category) => (
              <label
                key={category}
                className="flex items-center gap-2 cursor-pointer hover:text-blue-600"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="accent-blue-500"
                />
                {category}
              </label>
            ))}
          </div>
        </aside>
      )}

      {/* Main Blog Grid Section */}
      <main className={`flex-1 transition-all duration-300 ${showFilters ? "" : "max-w-6xl mx-auto"}`}>
        {/* Toggle Filters Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-sm px-3 py-2 border rounded hover:bg-gray-100 transition"
          >
            <FiFilter />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {/* Blog Cards */}
        {loading ? (
          <p className="text-center text-gray-500 mt-10 text-lg">Loading blogs...</p>
        ) : blogs.length === 0 ? (
          <p className="text-center text-gray-400 mt-10">No blogs found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
