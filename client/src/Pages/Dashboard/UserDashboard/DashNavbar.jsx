import { IoIosNotifications } from "react-icons/io";
import useAuthContext from "../../../hooks/useAuthContext";
import { useLogout } from "../../../hooks/useLogout";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const BRAND = "#0b148f";
const BRAND_DARK = "#090f6e";
const BRAND_LIGHT = "#eef0fd";
const BRAND_MID = "#1a2ba6";

const DashNavbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full h-16 flex items-center justify-between px-6 shadow-md z-50"
      style={{
        background: `linear-gradient(90deg, ${BRAND_DARK}, ${BRAND_MID})`,
      }}
    >
      {/* Welcome */}
      <div className="flex items-center gap-2">
        <div
          className="w-1 h-6 rounded-full"
          style={{ backgroundColor: "rgba(255,255,255,0.4)" }}
        />
        <p className="text-sm font-bold text-white tracking-wide">
          Welcome,{" "}
          <span style={{ color: BRAND_LIGHT }}>
            {user?.user?.firstname} {user?.user?.lastname}
          </span>
        </p>
      </div>

      <div className="flex items-center gap-2">
        {/* Notifications */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle transition-all duration-200 hover:bg-white/10"
          >
            <div className="relative">
              <IoIosNotifications className="text-2xl text-white" />
              <span
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-white text-[10px] font-bold flex items-center justify-center"
                style={{ backgroundColor: "#f43f5e" }}
              >
                3
              </span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content mt-3 w-64 shadow-xl bg-white z-[999] rounded-xl border"
            style={{ borderColor: BRAND_LIGHT }}
          >
            <div className="card-body gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold" style={{ color: BRAND }}>
                  Notifications
                </span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-semibold"
                  style={{ backgroundColor: BRAND_LIGHT, color: BRAND }}
                >
                  3 new
                </span>
              </div>
              <p className="text-xs text-gray-400 text-center py-2">
                No new notifications
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-white/20 mx-1" />

        {/* Profile */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="flex items-center gap-2 px-2 py-1 rounded-full cursor-pointer transition-all duration-200 hover:bg-white/10"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white/40">
              <img
                alt="User"
                src={user?.user?.img}
                className="object-cover w-full h-full"
              />
            </div>
            <span className="text-white text-sm font-medium hidden sm:block">
              {user?.user?.firstname}
            </span>
            <span className="text-white/60 text-xs">▾</span>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 w-52 p-2 shadow-xl bg-white rounded-xl z-[999] border"
            style={{ borderColor: BRAND_LIGHT }}
          >
            {/* User info header */}
            <li className="mb-1">
              <div
                className="flex flex-col px-3 py-2 rounded-lg cursor-default hover:bg-transparent"
                style={{ backgroundColor: BRAND_LIGHT }}
              >
                <span className="font-bold text-sm" style={{ color: BRAND }}>
                  {user?.user?.firstname} {user?.user?.lastname}
                </span>
                <span className="text-xs text-gray-400 capitalize">
                  {user?.user?.role}
                </span>
              </div>
            </li>

            <div
              className="border-t my-1"
              style={{ borderColor: BRAND_LIGHT }}
            />

            <li>
              <Link
                to="/profile"
                className="flex justify-between items-center rounded-lg text-sm font-medium"
                style={{ color: BRAND }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = BRAND_LIGHT)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                Profile
                <span
                  className="text-[10px] px-1.5 py-0.5 rounded-full text-white font-semibold"
                  style={{ backgroundColor: BRAND }}
                >
                  New
                </span>
              </Link>
            </li>
            <li
              className="text-sm font-medium rounded-lg"
              style={{ color: BRAND }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = BRAND_LIGHT)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              Settings
            </li>

            <div
              className="border-t my-1"
              style={{ borderColor: BRAND_LIGHT }}
            />

            <li
              onClick={logout}
              className="text-sm font-medium rounded-lg text-red-500 cursor-pointer hover:bg-red-50"
            >
              Logout
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default DashNavbar;
