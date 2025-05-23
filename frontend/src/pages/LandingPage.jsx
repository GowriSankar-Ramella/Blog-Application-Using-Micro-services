import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaRegLightbulb, FaUsers, FaFileAlt } from "react-icons/fa";

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="font-sans text-gray-800">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-20 text-center px-4">
                <motion.h1
                    className="text-4xl sm:text-5xl font-bold mb-4"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                >
                    Welcome to BlogSpace
                </motion.h1>
                <motion.p
                    className="text-lg sm:text-xl mb-8"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Where every thought finds a voice.
                </motion.p>
                <motion.div
                    className="flex justify-center gap-4"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <button
                        className="bg-white text-indigo-700 font-semibold px-6 py-2 rounded hover:bg-gray-100"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </button>
                    <button
                        className="bg-yellow-400 text-gray-900 font-semibold px-6 py-2 rounded hover:bg-yellow-500"
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </button>
                </motion.div>
            </div>

            {/* About Section */}
            <section className="text-center py-16 px-4 bg-gray-50">
                <h2 className="text-3xl font-semibold mb-4">Why BlogSpace?</h2>
                <p className="max-w-xl mx-auto text-gray-600">
                    BlogSpace is a creative platform that empowers authors, readers, and thinkers
                    to connect through meaningful content. Join a community that values creativity and expression.
                </p>
            </section>

            {/* Feature Section */}
            <section className="py-16 px-4 bg-white grid sm:grid-cols-3 gap-10 max-w-6xl mx-auto text-center">
                <motion.div
                    className="p-6 rounded-lg shadow hover:shadow-lg transition"
                    whileHover={{ scale: 1.05 }}
                >
                    <FaRegLightbulb className="text-4xl text-purple-600 mb-4 mx-auto" />
                    <h3 className="text-xl font-bold mb-2">Express Yourself</h3>
                    <p className="text-gray-600">Write blogs and share your ideas freely.</p>
                </motion.div>
                <motion.div
                    className="p-6 rounded-lg shadow hover:shadow-lg transition"
                    whileHover={{ scale: 1.05 }}
                >
                    <FaUsers className="text-4xl text-purple-600 mb-4 mx-auto" />
                    <h3 className="text-xl font-bold mb-2">Grow Community</h3>
                    <p className="text-gray-600">Follow authors and discover inspiration.</p>
                </motion.div>
                <motion.div
                    className="p-6 rounded-lg shadow hover:shadow-lg transition"
                    whileHover={{ scale: 1.05 }}
                >
                    <FaFileAlt className="text-4xl text-purple-600 mb-4 mx-auto" />
                    <h3 className="text-xl font-bold mb-2">Easy Publishing</h3>
                    <p className="text-gray-600">Use our editor to create and edit with ease.</p>
                </motion.div>
            </section>

            {/* Screenshots Section */}
            {/* Screenshots Section */}
            <section className="py-16 px-4 bg-gray-100 text-center">
                <h2 className="text-3xl font-semibold mb-10">Explore the Experience</h2>
                <div className="grid sm:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    <motion.img
                        src="/assets/screenshots/editor.jpg"
                        alt="Blog Editor"
                        className="rounded-lg shadow-md w-full h-64 object-cover"
                        whileHover={{ scale: 1.03 }}
                    />
                    <motion.img
                        src="/assets/screenshots/discover.jpg"
                        alt="Discover Blogs"
                        className="rounded-lg shadow-md w-full h-64 object-cover"
                        whileHover={{ scale: 1.03 }}
                    />
                    <motion.img
                        src="/assets/screenshots/responsive.jpg"
                        alt="Responsive Design"
                        className="rounded-lg shadow-md w-full h-64 object-cover"
                        whileHover={{ scale: 1.03 }}
                    />
                </div>
            </section>



            {/* Testimonials Section */}
            <section className="py-16 px-4 bg-white text-center">
                <h2 className="text-3xl font-semibold mb-10">What Our Users Say</h2>
                <div className="grid sm:grid-cols-3 gap-10 max-w-6xl mx-auto">
                    {[
                        {
                            name: "Ayesha R.",
                            feedback: "BlogSpace is my go-to platform to write freely and connect with thoughtful people!",
                        },
                        {
                            name: "Daniel T.",
                            feedback: "The blog editor is intuitive and the community is amazing!",
                        },
                        {
                            name: "Kriti V.",
                            feedback: "Love how easy it is to discover interesting blogs!",
                        },
                    ].map((user, index) => (
                        <motion.div
                            key={index}
                            className="bg-gray-50 p-6 rounded-lg shadow"
                            whileHover={{ scale: 1.02 }}
                        >
                            <img
                                src={`https://randomuser.me/api/portraits/${index % 2 === 0 ? "women" : "men"}/${index + 40}.jpg`}
                                alt={user.name}
                                className="w-16 h-16 rounded-full mx-auto mb-4"
                            />
                            <p className="italic text-gray-700 mb-2">"{user.feedback}"</p>
                            <h4 className="font-semibold text-gray-800">{user.name}</h4>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-200 text-center text-sm py-6">
                &copy; {new Date().getFullYear()} BlogSpace. All rights reserved.
            </footer>
        </div>
    );
}
