import { useEffect, useState } from "react";
import {
  FaHome,
  FaBookOpen,
  FaTachometerAlt,
  FaBars,
  FaUser,
  FaCertificate,
  FaVideo,
  FaTimes,
} from "react-icons/fa";
import {
  MdLibraryBooks,
  MdPayment,
  MdSchool,
  MdStar,
  MdDashboardCustomize,
} from "react-icons/md";
import { GrUserManager, GrAddCircle } from "react-icons/gr";
import { NavLink, useLocation } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import { motion, AnimatePresence } from "framer-motion";

const BRAND_DARK = "#090f6e";
const BRAND_MID = "#1a2ba6";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuthContext();
  const [currentUser, setCurrentUser] = useState({});
  const location = useLocation();
  const baseUrl = import.meta.env.VITE_almasnad_baseUrl;

  useEffect(() => {
    if (user?.user?._id) {
      fetch(`${baseUrl}/api/user/allUsers`)
        .then((res) => res.json())
        .then((data) => {
          const userData = data.find((u) => u._id === user?.user?._id);
          setCurrentUser(userData || {});
        })
        .catch((error) => console.log(error));
    }
  }, [user?.user?._id]);

  const singleCourseRegex = /^\/singleCourse\/[^/]+$/;

  const navLinkStyle = ({ isActive }, path) => {
    const isSingleCoursePage = singleCourseRegex.test(location.pathname);
    const active =
      isActive ||
      (isSingleCoursePage && path === "/dashboard/admin/manageCourses");

    return {
      backgroundColor: active ? "rgba(255, 255, 255, 0.18)" : "transparent",
      borderRadius: "8px",
      fontSize: "14px",
      fontWeight: "600",
      color: "white",
      padding: "10px 12px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      transition: "background-color 0.2s",
    };
  };

  const SectionLabel = ({ label }) => (
    <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 px-3 pt-4 pb-1">
      {label}
    </p>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 text-white p-2 rounded-full shadow-lg"
        style={{ backgroundColor: BRAND_DARK }}
      >
        <FaBars size={18} />
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -280 }}
        animate={{ x: isOpen || window.innerWidth >= 1024 ? 0 : -280 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="h-screen fixed left-0 top-0 w-64 z-40 shadow-2xl overflow-y-auto scrollbar-hidden flex flex-col"
        style={{
          background: `linear-gradient(160deg, ${BRAND_DARK} 0%, ${BRAND_MID} 100%)`,
          boxShadow: "inset 0 0 40px rgba(0,0,0,0.3)",
        }}
      >
        {/* Close button — mobile only */}
        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden absolute top-4 right-4 text-white/60 hover:text-white transition"
        >
          <FaTimes size={16} />
        </button>

        {/* Profile section */}
        <div className="flex flex-col items-center pt-8 pb-4 px-4">
          <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-white/30 shadow-lg mb-3">
            <img
              src={user?.user?.img || "/default-profile.png"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-white font-bold text-sm">
            {currentUser?.firstname} {currentUser?.lastname}
          </p>
          <span className="text-white/50 text-xs capitalize mt-0.5">
            {currentUser?.role || "Loading..."}
          </span>
        </div>

        {/* Divider */}
        <div className="mx-4 h-px bg-white/10 mb-2" />

        {/* Nav links */}
        <ul className="menu px-3 space-y-0.5 flex-1">
          {/* Admin links */}
          {currentUser?.role === "admin" && (
            <>
              <SectionLabel label="Admin" />
              {[
                {
                  to: "/dashboard/admin/adminHome",
                  icon: <FaTachometerAlt />,
                  label: "Admin Home",
                },
                {
                  to: "/dashboard/admin/addCourses",
                  icon: <GrAddCircle />,
                  label: "Add Course",
                },
                {
                  to: "/dashboard/admin/manageCourses",
                  icon: <MdLibraryBooks />,
                  label: "Manage Courses",
                  customPath: true,
                },
                {
                  to: "/dashboard/admin/transactionHistory",
                  icon: <MdPayment />,
                  label: "Transactions",
                },
                {
                  to: "/dashboard/admin/allUsers",
                  icon: <GrUserManager />,
                  label: "All Users",
                },
                {
                  to: "/dashboard/admin/addCertificate",
                  icon: <FaCertificate />,
                  label: "Add Certificate",
                },
                {
                  to: "/dashboard/admin/manageVideos",
                  icon: <FaVideo />,
                  label: "Manage Videos",
                },
                {
                  to: "/dashboard/admin/pageManagement",
                  icon: <MdDashboardCustomize />,
                  label: "Page Management",
                },
              ].map(({ to, icon, label, customPath }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    style={(navData) =>
                      navLinkStyle(navData, customPath ? to : undefined)
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    {icon} {label}
                  </NavLink>
                </li>
              ))}
            </>
          )}

          {/* User links */}
          {currentUser?.role === "user" && (
            <>
              <SectionLabel label="Student" />
              {[
                {
                  to: "/dashboard/user/userHome",
                  icon: <FaTachometerAlt />,
                  label: "User Home",
                },
                {
                  to: "/dashboard/user/userPaymentHistory",
                  icon: <MdPayment />,
                  label: "Transactions",
                },
                {
                  to: "/dashboard/user/userCourses",
                  icon: <MdSchool />,
                  label: "My Classes",
                },
                {
                  to: "/dashboard/user/userReview",
                  icon: <MdStar />,
                  label: "Add Review",
                },
              ].map(({ to, icon, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    style={navLinkStyle}
                    onClick={() => setIsOpen(false)}
                  >
                    {icon} {label}
                  </NavLink>
                </li>
              ))}
            </>
          )}

          {/* Divider */}
          <div className="mx-1 h-px bg-white/10 my-3" />

          {/* General links */}
          <SectionLabel label="General" />
          {[
            { to: "/", icon: <FaHome />, label: "Home" },
            { to: "/AllCourses", icon: <FaBookOpen />, label: "Courses" },
            { to: "/profile", icon: <FaUser />, label: "Profile" },
          ].map(({ to, icon, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                style={navLinkStyle}
                onClick={() => setIsOpen(false)}
              >
                {icon} {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="p-4 text-center">
          <p className="text-white/20 text-[10px]">AL MASNAD Academy © 2024</p>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
