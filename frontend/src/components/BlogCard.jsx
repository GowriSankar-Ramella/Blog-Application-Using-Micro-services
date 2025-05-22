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
    <div className="bg-white shadow rounded overflow-hidden flex flex-col">
      {image && (
        <img src={image} alt={title} className="h-48 w-full object-cover" />
      )}

      <div className="p-4 flex flex-col gap-2 flex-grow">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>

        <p className="text-sm text-gray-600 line-clamp-3">
          {category}
        </p>

        {author?.name && (
          <div className="flex items-center mt-2 gap-2">
            {author.image && (
              <img
                src={author.image}
                alt={author.name}
                className="w-8 h-8 rounded-full"
              />
            )}
            <span className="text-sm text-gray-700">{author.name}</span>
          </div>
        )}

        <div className="mt-auto">
          <Link
            to={`/blog/${_id}`}
            className="inline-block mt-4 text-blue-600 hover:underline text-sm font-medium"
          >
            Read More →
          </Link>
        </div>
      </div>
    </div>
  );
}
