import { useEffect, useState } from "react";
import { userService } from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function EditProfile() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    facebook: "",
    instagram: "",
    linkedin: "",
    bio: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        facebook: user.facebook || "",
        instagram: user.instagram || "",
        linkedin: user.linkedin || "",
        bio: user.bio || "",
      });
      setImagePreview(user.image || null);
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDetailsSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await userService.post("/update", formData);
      setUser(res.data.data);
      navigate(`/profile/${res.data.data._id}`);
    } catch (err) {
      console.error(err);
      setError("Failed to update profile details.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) return;

    setImageUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      const res = await userService.post("/update/pic", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUser(res.data.data);
    } catch (err) {
      console.error(err);
      setError("Failed to upload image.");
    } finally {
      setImageUploading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4 text-center">Edit Profile</h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Image Preview & Upload */}
      <div className="mb-6 text-center">
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="w-24 h-24 rounded-full object-cover mx-auto mb-2 border"
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-2"
        />
        <button
          type="button"
          onClick={handleImageUpload}
          disabled={imageUploading}
          className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
        >
          {imageUploading ? "Uploading..." : "Upload Picture"}
        </button>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleDetailsSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded"
        />

        <input
          type="text"
          name="facebook"
          placeholder="Facebook URL"
          value={formData.facebook}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        />

        <input
          type="text"
          name="instagram"
          placeholder="Instagram URL"
          value={formData.instagram}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        />

        <input
          type="text"
          name="linkedin"
          placeholder="LinkedIn URL"
          value={formData.linkedin}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        />

        <textarea
          name="bio"
          placeholder="Your bio..."
          rows={4}
          value={formData.bio}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        ></textarea>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Saving..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}
