import { Link, useLocation } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import logo from "../../public/logo.png";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { HiMenu, HiX } from "react-icons/hi";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BRAND = "#0b148f";
const BRAND_DARK = "#090f6e";
const BRAND_LIGHT = "#eef0fd";

const Navbar = () => {
  const { user } = useAuthContext();
  const [userData, setUserData] = useState(null);
  const { logout } = useLogout();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const baseUrl = import.meta.env.VITE_almasnad_baseUrl;

  useEffect(() => {
    if (user?.user?._id) {
      fetch(`${baseUrl}/api/user/singleUser/${user?.user?._id}`)
        .then((res) => res.json())
        .then((data) => setUserData(data))
        .catch((error) => console.log(error));
    }
  }, [user?.user?._id]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { to: "/", label: "Home" },
    {
      to:
        user?.user?.role === "admin"
          ? "/dashboard/admin/adminHome"
          : user?.user?.role === "user"
            ? "/dashboard/user/userHome"
            : null,
      label: "Dashboard",
    },
    { to: "/allCourses", label: "Courses" },
    { to: "/certificate-checker", label: "Certificate Checker" },
    { to: "/Admission-help", label: "Admission Help" },
  ].filter((link) => link.to);

  const isActive = (path) => location.pathname === path;

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 bg-white shadow-md"
    >
      <div className="lg:w-3/4 w-11/12 mx-auto py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div
              className="w-11 h-11 rounded-full overflow-hidden border-2 shadow-md transition-shadow duration-300"
              style={{ borderColor: BRAND }}
            >
              <img
                src={logo}
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span
              className="hidden sm:block font-bold text-lg leading-tight tracking-tight"
              style={{ color: BRAND }}
            >
              AL MASNAD
              <br />
              <span className="text-sm font-semibold opacity-70">Academy</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link, idx) => (
              <Link
                key={idx}
                to={link.to}
                className="relative px-4 py-2 rounded-md font-medium text-sm transition-all duration-300"
                style={{
                  backgroundColor: isActive(link.to) ? BRAND : "transparent",
                  color: isActive(link.to) ? "#ffffff" : BRAND,
                }}
                onMouseEnter={(e) => {
                  if (!isActive(link.to)) {
                    e.currentTarget.style.backgroundColor = BRAND_LIGHT;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive(link.to)) {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >
                {link.label}
                {isActive(link.to) && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                    style={{ backgroundColor: "#ffffff" }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Profile / Auth */}
          <div className="flex items-center gap-3">
            {/* Mobile Toggle */}
            <button
              onClick={toggleMenu}
              className="lg:hidden text-2xl transition-colors duration-200"
              style={{ color: BRAND }}
            >
              {isMenuOpen ? <HiX /> : <HiMenu />}
            </button>

            {/* Desktop Auth */}
            {user ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hidden lg:flex items-center rounded-full px-3 py-1"
                style={{ backgroundColor: BRAND }}
              >
                <p className="text-white font-medium hidden sm:block text-sm">
                  {userData?.firstname} {userData?.lastname}
                </p>
                <div className="dropdown dropdown-end ml-3">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-9 rounded-full border-2 border-white">
                      <img
                        src={userData?.img}
                        alt="User"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 p-2 shadow border rounded-md bg-white w-52 z-[999]"
                  >
                    <li>
                      <Link to="/profile" className="flex items-center gap-2">
                        <CgProfile /> Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/settings" className="flex items-center gap-2">
                        <IoSettingsOutline /> Settings
                      </Link>
                    </li>
                    <li onClick={logout}>
                      <span className="flex items-center gap-2 cursor-pointer text-red-500">
                        <MdLogout /> Logout
                      </span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            ) : (
              <div className="hidden lg:flex items-center gap-3 font-semibold">
                <Link
                  to="/login"
                  className="text-sm font-medium hover:underline transition"
                  style={{ color: BRAND }}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-white text-sm px-4 py-1.5 rounded-md transition-all duration-300"
                  style={{ backgroundColor: BRAND }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = BRAND_DARK)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = BRAND)
                  }
                >
                  Signup
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -8 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="lg:hidden mt-3 flex flex-col overflow-hidden rounded-md shadow-md border"
              style={{ borderColor: BRAND_LIGHT }}
            >
              <div className="flex flex-col p-3 gap-1">
                {navLinks.map((link, idx) => (
                  <Link
                    key={idx}
                    to={link.to}
                    onClick={toggleMenu}
                    className="px-4 py-2 rounded-md font-medium text-sm transition-all duration-200"
                    style={{
                      backgroundColor: isActive(link.to)
                        ? BRAND
                        : "transparent",
                      color: isActive(link.to) ? "#ffffff" : BRAND,
                    }}
                  >
                    {link.label}
                  </Link>
                ))}

                {!user && (
                  <div
                    className="flex flex-col gap-2 mt-3 pt-3 border-t"
                    style={{ borderColor: BRAND_LIGHT }}
                  >
                    <Link
                      to="/login"
                      onClick={toggleMenu}
                      className="px-4 py-2 rounded-md font-medium text-sm text-center hover:underline"
                      style={{ color: BRAND }}
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={toggleMenu}
                      className="px-4 py-2 rounded-md font-semibold text-sm text-center text-white transition"
                      style={{ backgroundColor: BRAND }}
                    >
                      Signup
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Navbar;
