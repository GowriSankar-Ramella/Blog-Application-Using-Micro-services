import { useEffect, useState } from "react";
import { blogService, userService } from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function CommentSection({ blogId }) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchComments();
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
      setComments(allComments);
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

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-4">Comments</h2>

      {/* Add Comment */}
      {user ? (
        <div className="flex items-start gap-2 mb-6">
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
              className="w-full border p-2 rounded"
              rows={3}
            />
            <button
              onClick={handlePost}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Post
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Login to post a comment.</p>
      )}

      {/* Comments List */}
      {loading ? (
        <p>Loading comments...</p>
      ) : comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul className="space-y-4">
          {comments.map((c) => (
            <li key={c._id} className="border p-3 rounded">
              <div className="flex gap-2 items-center mb-1">
                <img
                  src={c.user?.image}
                  alt={c.user?.name}
                  className="w-8 h-8 rounded-full"
                />
                <p className="font-medium">{c.user?.name}</p>
                <span className="text-sm text-gray-400 ml-auto">
                  {new Date(c.createdAt).toLocaleString()}
                </span>
              </div>
              <p>{c.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
