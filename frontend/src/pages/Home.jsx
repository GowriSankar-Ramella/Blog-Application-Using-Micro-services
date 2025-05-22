import { useEffect, useState } from "react";
import { blogService, userService } from "../api/axios";
import BlogCard from "../components/BlogCard";

const categoriesList = ["Technology", "Travel", "Education", "Food", "Lifestyle", "Business"]; // Add your categories here

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(true);

  // 🔁 Re-fetch blogs when search or selectedCategories changes
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
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="flex max-w-7xl mx-auto px-4 py-6">
      {/* Left Side Filter Section */}
      {showFilters && (
        <div className="w-1/5 pr-4 border-r border-gray-200">
          {/* Search Input */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search blogs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none"
            />
          </div>

          {/* Categories */}
          <div>
            <h2 className="font-semibold mb-2">Categories</h2>
            {categoriesList.map((category) => (
              <label key={category} className="block mb-1">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="mr-2"
                />
                {category}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Right Side Blog Grid */}
      <div className="w-full md:w-4/5 pl-4 relative">
        <button
          className="absolute top-0 right-0 mb-4 px-3 py-1 text-sm border rounded"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>

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
    </div>
  );
}
