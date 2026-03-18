import { useEffect, useState } from "react";
import {
  FaUsers,
  FaBookOpen,
  FaUserGraduate,
  FaChartLine,
  FaStar,
  FaCheckCircle,
} from "react-icons/fa";
import { TbCurrencyTaka } from "react-icons/tb";
import { motion } from "framer-motion";

const BRAND = "#0b148f";
const BRAND_DARK = "#090f6e";
const BRAND_LIGHT = "#eef0fd";
const BRAND_MID = "#1a2ba6";

const AdminDashboard = () => {
  const [countUsers, setCountUsers] = useState([]);
  const [enrolledUsers, setEnrolledUsers] = useState([]);
  const [courseCount, setCourseCount] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState([]);
  const [totalAvgRating, setTotalAvgRating] = useState([]);
  const [courseCategories, setCoursesCategories] = useState([]);
  const [completedCoursesCount, setCompletedCoursesCount] = useState(0);

  const baseUrl = import.meta.env.VITE_almasnad_baseUrl;

  useEffect(() => {
    const endpoints = [
      { url: "/api/user/allUsersCount", setter: setCountUsers },
      { url: "/api/course/getCourseCount", setter: setCourseCount },
      { url: "/api/course/enrolledUsersCourses", setter: setEnrolledUsers },
      {
        url: "/api/course/getCourseCategories",
        setter: (d) => setCoursesCategories(d.categories),
      },
      {
        url: "/api/course/getAvgRating",
        setter: (d) => setTotalAvgRating(d.avgRating),
      },
      {
        url: "/api/course/getCompletedCoursesCount",
        setter: (d) => setCompletedCoursesCount(d.totalCompletedCourses),
      },
      {
        url: "/api/course/getTotalPayment",
        setter: (d) => setTotalRevenue(d.totalPayment),
      },
    ];

    endpoints.forEach(({ url, setter }) => {
      fetch(`${baseUrl}${url}`)
        .then((res) => res.json())
        .then(setter)
        .catch((err) => console.log(err));
    });
  }, []);

  const stats = [
    {
      icon: <FaUsers />,
      title: "Total Users",
      value: countUsers.usersCount,
      change: "+5.2%",
    },
    {
      icon: <FaBookOpen />,
      title: "Total Courses",
      value: courseCount.courseCount,
      change: "+2.1%",
    },
    {
      icon: <FaUserGraduate />,
      title: "Enrolled Users",
      value: enrolledUsers.totalEnrolledStudents,
      change: "+3.7%",
    },
    {
      icon: <FaChartLine />,
      title: "Revenue",
      value: (
        <span className="flex items-center gap-0.5">
          {totalRevenue} <TbCurrencyTaka />
        </span>
      ),
      change: "+7.8%",
    },
  ];

  return (
    <div className="min-h-screen lg:p-8 pt-5 p-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1
          className="text-2xl md:text-3xl font-extrabold"
          style={{ color: BRAND }}
        >
          🗂️ Admin Dashboard
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Overview of your platform's performance
        </p>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid gap-5 md:grid-cols-4 mb-8">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08, duration: 0.4 }}
            className="bg-white rounded-2xl border p-5 shadow-sm hover:shadow-md transition-all duration-300"
            style={{ borderColor: BRAND_LIGHT }}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                  {stat.title}
                </p>
                <p
                  className="text-2xl font-extrabold mt-1"
                  style={{ color: BRAND }}
                >
                  {stat.value ?? "—"}
                </p>
              </div>
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-lg text-white shadow-sm"
                style={{ backgroundColor: BRAND }}
              >
                {stat.icon}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xs font-semibold text-green-500">
                {stat.change}
              </span>
              <span className="text-xs text-gray-400">vs last month</span>
            </div>
            {/* Bottom accent */}
            <div
              className="h-1 rounded-full mt-3"
              style={{
                background: `linear-gradient(to right, ${BRAND}, #3b56d9)`,
                opacity: 0.3,
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Course Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="bg-white rounded-2xl border p-6 shadow-sm"
          style={{ borderColor: BRAND_LIGHT }}
        >
          <h2 className="text-base font-bold mb-5" style={{ color: BRAND }}>
            📚 Course Categories
          </h2>
          <div className="space-y-3">
            {courseCategories?.length > 0 ? (
              courseCategories.map((category, idx) => {
                const total = courseCategories.reduce(
                  (a, c) => a + (c.count || 0),
                  0,
                );
                const pct = total
                  ? Math.round(((category.count || 0) / total) * 100)
                  : 0;

                return (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 font-medium">
                        {category.name || category.category}
                      </span>
                      <span className="font-bold" style={{ color: BRAND }}>
                        {category.count || 0}
                      </span>
                    </div>
                    {/* Progress bar */}
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, delay: idx * 0.1 }}
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(to right, ${BRAND}, #3b56d9)`,
                        }}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-400 text-sm text-center py-4">
                No categories found
              </p>
            )}
          </div>
        </motion.div>

        {/* Platform Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="bg-white rounded-2xl border p-6 shadow-sm"
          style={{ borderColor: BRAND_LIGHT }}
        >
          <h2 className="text-base font-bold mb-5" style={{ color: BRAND }}>
            📊 Platform Overview
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <MetricCard
              icon={<FaStar className="text-yellow-400 text-xl" />}
              title="Average Rating"
              value={
                totalAvgRating ? `${Number(totalAvgRating).toFixed(1)} ⭐` : "—"
              }
            />
            <MetricCard
              icon={<FaCheckCircle className="text-green-400 text-xl" />}
              title="Completed Courses"
              value={completedCoursesCount || "—"}
            />
            <MetricCard
              icon={
                <FaUserGraduate className="text-xl" style={{ color: BRAND }} />
              }
              title="Total Enrolled"
              value={enrolledUsers.totalEnrolledStudents || "—"}
            />
            <MetricCard
              icon={<FaBookOpen className="text-xl" style={{ color: BRAND }} />}
              title="Active Courses"
              value={courseCount.courseCount || "—"}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// StatCard — now inlined above
const MetricCard = ({ icon, title, value }) => (
  <div
    className="rounded-xl p-4 flex flex-col gap-2 border"
    style={{ backgroundColor: BRAND_LIGHT, borderColor: "#dde2f8" }}
  >
    <div className="flex items-center gap-2">
      {icon}
      <span className="text-xs font-medium text-gray-500">{title}</span>
    </div>
    <p className="text-xl font-extrabold" style={{ color: BRAND }}>
      {value}
    </p>
  </div>
);

export default AdminDashboard;
