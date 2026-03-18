import { useEffect, useState } from "react";
import useAuthContext from "../hooks/useAuthContext";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import BreakingNews from "../Components/Breakingnews.jsx";
import { motion } from "framer-motion";
import StudentGallery from "../Components/StudentGallery";
// import PagriGallery from "../Components/PagriGallery";
import PopularCourses from "../Components/PopularCourses.jsx";
import PagriGallery from "../Components/PagriGallery.jsx";

import UpdateBanner from "../Components/UpdateBanner.jsx";
import VideoSection from "../Components/VideoSection.jsx";
import VortiCholche from "../Components/VortiCholche.jsx";
import StudentReview from "../Components/StudentReview";
import { FaUserGraduate, FaChalkboardTeacher, FaGlobe } from "react-icons/fa";

const BRAND = "#0b148f";
const BRAND_DARK = "#090f6e";
const BRAND_LIGHT = "#eef0fd";

const stats = [
  { icon: <FaUserGraduate />, value: "300+", label: "Students" },
  { icon: <FaGlobe />, value: "5+", label: "Countries" },
];

const Home = () => {
  const { user } = useAuthContext();
  const baseUrl = import.meta.env.VITE_almasnad_baseUrl;
  const [visibility, setVisibility] = useState(null);

  useEffect(() => {
    fetch(`${baseUrl}/api/page-visibility`)
      .then((res) => res.json())
      .then((data) => setVisibility(data))
      .catch(() =>
        setVisibility({
          BreakingNews: true,
          UpdateBanner: true,
          VideoSection: true,
          StudentGallery: true,
          VortiCholche: true,
          StudentReview: false,
          PagriGallery: true,
        }),
      );
  }, []);

  const show = (key) => visibility?.[key] ?? true;

  return (
    <div>
      {show("VortiCholche") && <VortiCholche />}

      <div className="lg:w-3/4 w-11/12 mx-auto">
        {/* ── Hero ── */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-10 items-center py-10 lg:py-14">
          {/* ── Mobile image — shows ABOVE text on mobile ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative w-full flex items-center justify-center order-1 lg:order-2"
          >
            {/* Glow blob */}
            <div
              className="absolute w-48 h-48 md:w-72 md:h-72 rounded-full blur-3xl opacity-25 z-0"
              style={{ backgroundColor: BRAND }}
            />
            {/* Decorative ring */}
            <div
              className="absolute w-56 h-56 md:w-80 md:h-80 rounded-full border-2 opacity-10 z-0"
              style={{ borderColor: BRAND }}
            />

            {/* Mobile — circular crop, desktop — rounded rect */}
            <img
              src="/banner.png"
              alt="Banner"
              className="relative z-10 shadow-2xl object-cover
                w-52 h-52 rounded-full border-4
                md:w-64 md:h-64
                lg:w-full lg:h-auto lg:rounded-2xl lg:border-0"
              style={{ borderColor: BRAND_LIGHT }}
            />

            {/* Mobile floating badge */}

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 lg:hidden px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-lg whitespace-nowrap"
              style={{ backgroundColor: BRAND }}
            >
              🕌 Online & Offline
            </motion.div>
          </motion.div>

          {/* ── Text content ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col gap-4 lg:gap-5 order-2 lg:order-1 text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center justify-center lg:justify-start gap-2 px-4 py-1.5 rounded-full text-sm font-semibold w-fit mx-auto lg:mx-0 shadow-sm"
              style={{ backgroundColor: BRAND_LIGHT, color: BRAND }}
            >
              🏅 Trusted by 300+ Students Worldwide
            </motion.div>

            {/* Title */}
            <div>
              <h1
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight"
                style={{ color: BRAND }}
              >
                Best Platform For
                <br />
                <motion.span
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="px-2 py-0.5 rounded-md text-white font-extrabold inline-block mt-1"
                  style={{
                    background: `linear-gradient(90deg, ${BRAND}, #3b56d9, ${BRAND})`,
                    backgroundSize: "200% 200%",
                  }}
                >
                  Learning Quran
                </motion.span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-md mx-auto lg:mx-0">
              Learn Quran with proper Tajweed from experienced Hafiz and Qari
              teachers. Take classes both{" "}
              <span className="font-semibold" style={{ color: BRAND }}>
                Online
              </span>{" "}
              and{" "}
              <span className="font-semibold" style={{ color: BRAND }}>
                Offline
              </span>
              .
            </p>

            {/* CTAs */}
            <div className="flex items-center justify-center lg:justify-start gap-3 flex-wrap">
              <Link
                to={
                  user?.user
                    ? user.user.role === "admin"
                      ? "/dashboard/admin/adminHome"
                      : "/dashboard/user/userHome"
                    : "/login"
                }
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-white px-6 py-3 rounded-xl font-semibold shadow-md text-sm md:text-base"
                  style={{ backgroundColor: BRAND }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = BRAND_DARK)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = BRAND)
                  }
                >
                  Get Started →
                </motion.button>
              </Link>
              <Link to="/allCourses">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-xl font-semibold text-sm md:text-base border-2 transition-all duration-300"
                  style={{ borderColor: BRAND, color: BRAND }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = BRAND;
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = BRAND;
                  }}
                >
                  View Courses
                </motion.button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center lg:justify-start gap-4 mt-1 flex-wrap">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.15, duration: 0.5 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl shadow-sm border bg-white"
                  style={{ borderColor: BRAND_LIGHT }}
                >
                  <span className="text-lg" style={{ color: BRAND }}>
                    {stat.icon}
                  </span>
                  <div className="leading-tight">
                    <p
                      className="font-extrabold text-sm"
                      style={{ color: BRAND }}
                    >
                      {stat.value}
                    </p>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {show("BreakingNews") && <BreakingNews />}
      </div>

      {show("UpdateBanner") && <UpdateBanner />}
      {show("PopularCourses") && <PopularCourses />}
      {show("VideoSection") && <VideoSection />}
      {show("StudentGallery") && <StudentGallery />}
      {show("StudentReview") && <StudentReview />}
      {show("PagriGallery") && <PagriGallery />}
    </div>
  );
};

export default Home;
