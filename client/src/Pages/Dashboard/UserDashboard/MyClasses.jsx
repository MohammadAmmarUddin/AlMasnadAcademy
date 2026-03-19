import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useAuthContext from "../../../hooks/useAuthContext";
import { motion } from "framer-motion";
import { FaBookOpen } from "react-icons/fa";

const BRAND = "#0b148f";
const BRAND_LIGHT = "#eef0fd";

const MyClasses = () => {
  const { user } = useAuthContext();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseUrl = import.meta.env.VITE_almasnad_baseUrl;

  useEffect(() => {
    if (!user?.user?._id) return;

    setLoading(true);
    fetch(`${baseUrl}/api/course/getAllEnrolledCourse/${user?.user?._id}`)
      .then((res) => res.json())
      .then((data) => {
        setCourses(data.courses || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setCourses([]);
        setLoading(false);
      });
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div
          className="w-10 h-10 rounded-full border-4 border-t-transparent animate-spin"
          style={{ borderColor: BRAND, borderTopColor: "transparent" }}
        />
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3">
        <FaBookOpen className="text-5xl" style={{ color: BRAND_LIGHT }} />
        <p className="text-gray-400 font-medium">
          You haven't enrolled in any courses yet.
        </p>
        <Link
          to="/allCourses"
          className="text-sm font-semibold px-4 py-2 rounded-lg text-white transition"
          style={{ backgroundColor: BRAND }}
        >
          Explore Courses →
        </Link>
      </div>
    );
  }

  return (
    <div className="lg:p-6 pt-10 p-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-extrabold" style={{ color: BRAND }}>
          My Classes
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          {courses.length} course{courses.length !== 1 ? "s" : ""} enrolled
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
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
              <div className="relative overflow-hidden h-44">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  src={course?.banner}
                  alt={course?.title}
                />
                {/* Enrolled badge */}
                <div
                  className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-semibold text-white"
                  style={{ backgroundColor: BRAND }}
                >
                  ✅ Enrolled
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3
                  className="text-sm font-bold leading-snug mb-3 line-clamp-2"
                  style={{ color: BRAND }}
                >
                  {course?.title}
                </h3>

                {/* CTA */}
                <div
                  className="flex items-center gap-1 text-xs font-semibold"
                  style={{ color: BRAND }}
                >
                  <span>Continue Learning</span>
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    →
                  </motion.span>
                </div>
              </div>

              {/* Bottom accent */}
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

export default MyClasses;
