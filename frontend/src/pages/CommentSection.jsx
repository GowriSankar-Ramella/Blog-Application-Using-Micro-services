import { useEffect, useRef, useState } from "react";
import { blogService, userService } from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function CommentSection({ blogId }) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const commentRef = useRef();

  useEffect(() => {
    fetchComments();
    // Optional: Scroll to comment section when mounted
    commentRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [blogId]);

  const fetchComments = async () => {
    try {
      const res = await blogService.get(`/comment/${blogId}`);
      const allComments = await Promise.all(
        res.data?.data?.map(async (comment) => {
          const authorRes = await userService.get(`/${comment.userid}`);
          return {
            ...comment,
            user: authorRes.data?.data,
          };
        })
      );
      setComments(allComments.reverse()); // Latest on top
    } catch (err) {
      console.error("Error loading comments", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePost = async () => {
    if (!commentText.trim()) return;

    try {
      await blogService.post(`/comment/${blogId}`, {
        comment: commentText
      });
      setCommentText("");
      fetchComments();
    } catch (err) {
      console.error("Failed to post comment:", err);
    }
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    try {
      await blogService.delete(`/comment/${commentId}`);
      fetchComments();
    } catch (err) {
      console.error("Failed to delete comment:", err);
    }
  };

  return (
    <div ref={commentRef} className="mt-10">
      <h2 className="text-xl font-semibold mb-4">Comments</h2>

      {/* Add Comment */}
      {user ? (
        <div className="flex items-start gap-3 mb-6">
          <img
            src={user.image}
            alt="You"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write your comment..."
              className="w-full border border-gray-300 p-2 rounded resize-none focus:outline-none focus:ring focus:border-blue-400"
              rows={3}
            />
            <button
              onClick={handlePost}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Post
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 mb-6">Login to post a comment.</p>
      )}

      {/* Comment List */}
      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse flex gap-3 items-start">
              <div className="w-10 h-10 bg-gray-300 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-gray-300 rounded w-1/4"></div>
                <div className="h-3 bg-gray-300 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : comments.length === 0 ? (
        <p className="text-gray-500">No comments yet.</p>
      ) : (
        <ul className="space-y-4">
          {comments.map((c) => (
            <li key={c._id} className="border p-4 rounded shadow-sm bg-white">
              <div className="flex gap-2 items-center mb-2">
                <img
                  src={c.user?.image}
                  alt={c.user?.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <p className="font-medium text-sm">{c.user?.name}</p>
                <span className="text-xs text-gray-400 ml-auto">
                  {new Date(c.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-gray-700">{c.comment}</p>

              {user?._id === c.userid && (
                <button
                  onClick={() => handleDelete(c._id)}
                  className="text-xs mt-2 text-red-500 hover:underline"
                >
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
