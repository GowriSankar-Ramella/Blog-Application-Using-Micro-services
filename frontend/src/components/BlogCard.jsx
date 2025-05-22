import { Link } from "react-router-dom";

export default function BlogCard({ blog }) {
  const {
    _id,
    title,
    category,
    image,
    author = {},
  } = blog;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transition-transform hover:scale-[1.02] hover:shadow-lg duration-300">
      {image && (
        <div className="h-56 w-full bg-gray-100 flex items-center justify-center overflow-hidden">
          <img
            src={image}
            alt={title}
            className="max-h-full max-w-full object-contain"
          />
        </div>
      )}


      <div className="p-4 flex flex-col gap-3 flex-grow">
        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800 leading-tight">
          {title}
        </h2>

        {/* Category */}
        <span className="inline-block bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-medium">
          {category}
        </span>


        {/* Author Info */}
        {author?.name && (
          <div className="flex items-center gap-2 mt-2">
            {author.image && (
              <img
                src={author.image}
                alt={author.name}
                className="w-8 h-8 rounded-full object-cover"
              />
            )}
            <span className="text-sm text-gray-700">{author.name}</span>
          </div>
        )}

        {/* Read More */}
        <div className="mt-auto">
          <Link
            to={`/blog/${_id}`}
            className="inline-block text-sm text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Read More →
          </Link>
        </div>
      </div>
    </div>
  );
}
