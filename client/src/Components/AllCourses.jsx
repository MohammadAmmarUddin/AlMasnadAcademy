import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBookOpen } from "react-icons/fa";

const BRAND = "#0b148f";
const BRAND_DARK = "#090f6e";
const BRAND_LIGHT = "#eef0fd";

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseUrl = import.meta.env.VITE_almasnad_baseUrl;

  useEffect(() => {
    fetch(`${baseUrl}/api/course/getAllCourses`)
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div
          className="w-12 h-12 rounded-full border-4 border-t-transparent animate-spin"
          style={{ borderColor: BRAND, borderTopColor: "transparent" }}
        />
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3 text-gray-400">
        <FaBookOpen className="text-5xl" style={{ color: BRAND_LIGHT }} />
        <p className="text-lg font-medium">No courses available yet.</p>
      </div>
    );
  }

  return (
    <div className="w-11/12 lg:w-3/4 mx-auto pb-20 mt-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <span
          className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-3"
          style={{ backgroundColor: BRAND_LIGHT, color: BRAND }}
        >
          📚 Explore Our Programs
        </span>
        <h2
          className="text-3xl md:text-4xl font-extrabold"
          style={{ color: BRAND }}
        >
          All Courses
        </h2>
        <p className="text-gray-500 mt-2 text-sm md:text-base max-w-md mx-auto">
          Choose from our curated Quranic programs taught by expert Qaris
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {courses.map((course, idx) => (
          <motion.div
            key={course._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.07, duration: 0.4 }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border"
            style={{ borderColor: BRAND_LIGHT }}
          >
            <Link to={`/singleCourse/${course._id}`} state={{ course }}>
              {/* Image */}
              <div className="relative overflow-hidden h-48">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  src={course?.banner}
                  alt={course?.title}
                />
                {/* Overlay badge */}
                <div
                  className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-semibold text-white"
                  style={{ backgroundColor: BRAND }}
                >
                  Course
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3
                  className="text-base font-bold leading-snug mb-3 line-clamp-2"
                  style={{ color: BRAND }}
                >
                  {course?.title}
                </h3>

                {/* CTA */}
                <div
                  className="flex items-center gap-1 text-sm font-semibold transition-all duration-200"
                  style={{ color: BRAND }}
                >
                  <span>View Details</span>
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    →
                  </motion.span>
                </div>
              </div>

              {/* Bottom accent bar */}
              <div
                className="h-1 w-full"
                style={{
                  background: `linear-gradient(to right, ${BRAND}, #3b56d9)`,
                }}
              />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AllCourses;
