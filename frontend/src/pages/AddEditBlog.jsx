import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { blogService, authorService } from "../api/axios";
import JoditEditor from "jodit-react";

export default function AddEditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const editor = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    image: null,
  });

  const [blogContent, setBlogContent] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      fetchBlog();
    }
  }, [id]);

  const fetchBlog = async () => {
    try {
      const res = await blogService.get(`/blog/${id}`);
      const blog = res.data.data;
      setFormData({
        title: blog.title,
        description: blog.description,
        category: blog.category,
        image: null,
      });
      setBlogContent(blog.blogContent);
      setImagePreview(blog.image); // assuming imageUrl field from backend
    } catch (err) {
      console.error("Error fetching blog:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, image: file }));
      if (file) setImagePreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image && !isEditMode) {
      return alert("Image is required");
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("blogContent", blogContent);
    if (formData.image) data.append("file", formData.image);

    try {
      if (isEditMode) {
        await authorService.post(`/update/${id}`, data);
      } else {
        await authorService.post("/new", data);
      }
      navigate("/home");
    } catch (err) {
      console.error("Blog submission failed:", err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
        {isEditMode ? "Edit Blog" : "Create a New Blog"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter blog title"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Short Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter a short summary of your blog"
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          >
            <option value="" disabled>Select a category</option>
            <option value="Technology">Technology</option>
            <option value="Travel">Travel</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
            <option value="Lifestyle">Lifestyle</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            name="image"
            onChange={handleChange}
            className="w-full text-sm"
            required={!isEditMode}
          />
          {imagePreview && (
            <div className="mt-4 flex justify-center">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-h-60 w-auto object-contain rounded-md shadow-sm border p-1"
              />
            </div>
          )}
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Content</label>
          <div className="border rounded-md shadow-sm">
            <JoditEditor
              ref={editor}
              value={blogContent}
              onChange={(newContent) => setBlogContent(newContent)}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-md transition duration-200"
        >
          {isEditMode ? "Update Blog" : "Publish Blog"}
        </button>
      </form>
    </div>
  );
}