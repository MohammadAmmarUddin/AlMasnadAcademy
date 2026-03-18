import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBookOpen, FaStar, FaWifi, FaFire } from "react-icons/fa";

const BRAND = "#0b148f";
const BRAND_DARK = "#090f6e";
const BRAND_LIGHT = "#eef0fd";
const BRAND_MID = "#1a2ba6";

const PopularCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("সব");

  const categories = ["সব", "হিফজ", "মাকামাত", "তাজউইদ", "কিডস"];

  useEffect(() => {
    fetch("/courses.json")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered =
    active === "সব" ? courses : courses.filter((c) => c.title.includes(active));

  return (
    <div
      className="py-20 relative overflow-hidden"
      style={{ backgroundColor: "#fafbff" }}
    >
      {/* BG decoration */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-5 pointer-events-none"
        style={{ backgroundColor: BRAND }}
      />
      <div
        className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-3xl opacity-5 pointer-events-none"
        style={{ backgroundColor: BRAND_MID }}
      />

      <div className="lg:w-3/4 w-11/12 mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
            style={{ backgroundColor: BRAND_LIGHT, color: BRAND }}
          >
            <FaFire className="text-orange-500" />
            জনপ্রিয় কোর্সসমূহ
          </span>
          <h2
            className="text-2xl md:text-4xl font-extrabold"
            style={{ color: BRAND }}
          >
            আমাদের সেরা কোর্সগুলো
          </h2>
          <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
            অভিজ্ঞ কারী উস্তাদদের কাছ থেকে কুরআনের সেরা কোর্সগুলো শিখুন
          </p>
        </motion.div>

        {/* Category filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2 flex-wrap mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200"
              style={{
                backgroundColor: active === cat ? BRAND : "#fff",
                color: active === cat ? "#fff" : BRAND,
                border: `2px solid ${active === cat ? BRAND : BRAND_LIGHT}`,
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-16">
            <div
              className="w-10 h-10 rounded-full border-4 border-t-transparent animate-spin"
              style={{ borderColor: BRAND, borderTopColor: "transparent" }}
            />
          </div>
        )}

        {/* Empty */}
        {!loading && filtered.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-16 text-gray-400">
            <FaBookOpen className="text-5xl" style={{ color: BRAND_LIGHT }} />
            <p className="font-medium">এই বিভাগে কোনো কোর্স নেই।</p>
          </div>
        )}

        {/* Grid */}
        {!loading && filtered.length > 0 && (
          <>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
              {filtered.slice(0, 6).map((course, idx) => (
                <motion.div
                  key={course._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -6 }}
                  transition={{ delay: idx * 0.07, duration: 0.4 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl overflow-hidden transition-all duration-300 group"
                  style={{
                    boxShadow: "0 2px 20px rgba(11,20,143,0.06)",
                    border: "1px solid #f0f0f8",
                  }}
                >
                  <Link to={`/singleCourse/${course._id}`}>
                    {/* Image */}
                    <div className="relative overflow-hidden h-48">
                      <img
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        src={course?.banner}
                        alt={course?.title}
                      />

                      {/* Dark overlay on hover */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />

                      {/* Online badge */}
                      {course?.type && (
                        <div
                          className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white shadow-md"
                          style={{ color: "#16a34a" }}
                        >
                          <FaWifi size={10} />
                          {course.type}
                        </div>
                      )}

                      {/* Popular tag — top rated */}
                      {course?.rating >= 4.8 && (
                        <div
                          className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold text-white"
                          style={{ backgroundColor: "#f97316" }}
                        >
                          <FaFire size={9} /> জনপ্রিয়
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col gap-2.5">
                      {/* Title */}
                      <h3
                        className="text-sm font-bold leading-snug line-clamp-2 text-gray-800 group-hover:transition-colors duration-200"
                        style={{ color: "inherit" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = BRAND)
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "inherit")
                        }
                      >
                        {course?.title}
                      </h3>

                      {/* Description */}
                      {course?.description && (
                        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                          {course.description}
                        </p>
                      )}

                      {/* Divider */}
                      <div className="h-px bg-gray-100 my-1" />

                      {/* Rating */}
                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                              key={star}
                              size={11}
                              style={{
                                color:
                                  star <= Math.round(course?.rating || 0)
                                    ? "#f59e0b"
                                    : "#e5e7eb",
                              }}
                            />
                          ))}
                        </div>
                        <span className="text-xs font-bold text-gray-700">
                          {course?.rating
                            ? Number(course.rating).toFixed(1)
                            : "০.০"}
                        </span>
                        <span className="text-xs text-gray-400">
                          ({course?.totalRatings || 0} জন)
                        </span>
                      </div>

                      {/* Price + CTA */}
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex flex-col">
                          <span
                            className="text-lg font-extrabold"
                            style={{ color: "#e53e3e" }}
                          >
                            ৳{course?.price?.toLocaleString("bn-BD")}
                          </span>
                          {course?.discountPrice && (
                            <span className="text-xs text-gray-400 line-through">
                              ৳{course?.discountPrice?.toLocaleString("bn-BD")}
                            </span>
                          )}
                        </div>

                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-base shadow-md transition-all duration-200"
                          style={{ backgroundColor: BRAND_LIGHT, color: BRAND }}
                        >
                          →
                        </motion.div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* View All */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Link to="/allCourses">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-white px-10 py-3.5 rounded-xl font-semibold shadow-lg text-sm"
                  style={{
                    background: `linear-gradient(135deg, ${BRAND_DARK}, ${BRAND_MID})`,
                  }}
                >
                  সব কোর্স দেখুন →
                </motion.button>
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default PopularCourses;
