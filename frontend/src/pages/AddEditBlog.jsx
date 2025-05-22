import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { blogService, authorService } from "../api/axios";
import JoditEditor from "jodit-react";

export default function AddEditBlog() {
  const { id } = useParams(); // blogId
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
    } catch (err) {
      console.error("Error fetching blog:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "image" ? files[0] : value,
    }));
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
    if (formData.image) data.append("file", formData.image); // must be 'file' for backend

    try {
      if (isEditMode) {
        await authorService.post(`/update/${id}`, data);
      } else {
        await authorService.post("/new", data);
      }
      navigate("/");
    } catch (err) {
      console.error("Blog submission failed:", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {isEditMode ? "Edit Blog" : "Create Blog"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Blog Title"
          className="w-full p-2 border rounded"
          required
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Short Description"
          className="w-full p-2 border rounded"
          required
        />

        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category (e.g. Tech, Travel)"
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="file"
          accept="image/*"
          name="image"
          onChange={handleChange}
          className="w-full"
          required={!isEditMode}
        />

        <div className="border rounded p-2">
          <JoditEditor
            ref={editor}
            value={blogContent}
            onChange={(newContent) => setBlogContent(newContent)}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isEditMode ? "Update Blog" : "Publish Blog"}
        </button>
      </form>
    </div>
  );
}
