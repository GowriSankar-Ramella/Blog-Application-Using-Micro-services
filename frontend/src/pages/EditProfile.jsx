import { useEffect, useState } from "react";
import { userService } from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaUser } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

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
  const [success, setSuccess] = useState("");

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
    setSuccess("");

    try {
      const res = await userService.post("/update", formData);
      setUser(res.data.data);
      setSuccess("Profile updated successfully.");
      setTimeout(() => navigate(`/profile/${res.data.data._id}`), 1500);
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
    setSuccess("");

    const form = new FormData();
    form.append("file", imageFile);

    try {
      const res = await userService.post("/update/pic", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUser(res.data.data);
      setSuccess("Image uploaded successfully.");
    } catch (err) {
      console.error(err);
      setError("Failed to upload image.");
    } finally {
      setImageUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-md border">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 flex items-center justify-center gap-2">
        <MdEdit className="text-blue-600" /> Edit Your Profile
      </h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {success && <p className="text-green-500 text-center mb-4">{success}</p>}

      {/* Image Upload Section */}
      <div className="mb-8 text-center">
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="w-24 h-24 mx-auto mb-2 rounded-full object-cover border"
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
          className={`bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition ${
            imageUploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {imageUploading ? "Uploading..." : "Upload Picture"}
        </button>
      </div>

      {/* Profile Details Form */}
      <form onSubmit={handleDetailsSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium text-gray-700 flex items-center gap-2">
            <FaUser /> Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700 flex items-center gap-2">
            <FaFacebookF className="text-blue-600" /> Facebook URL
          </label>
          <input
            type="text"
            name="facebook"
            value={formData.facebook}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700 flex items-center gap-2">
            <FaInstagram className="text-pink-500" /> Instagram URL
          </label>
          <input
            type="text"
            name="instagram"
            value={formData.instagram}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700 flex items-center gap-2">
            <FaLinkedinIn className="text-blue-800" /> LinkedIn URL
          </label>
          <input
            type="text"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Bio</label>
          <textarea
            name="bio"
            rows={4}
            value={formData.bio}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Saving..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}
