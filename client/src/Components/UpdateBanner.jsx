import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGlobe, FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";

const BRAND = "#0b148f";
const BRAND_DARK = "#090f6e";
const BRAND_LIGHT = "#eef0fd";
const BRAND_MID = "#1a2ba6";

const LiveStatsBanner = () => {
  const statItems = [
    { icon: <FaUserGraduate size={24} />, value: "30+", label: "Students" },
    { icon: <FaChalkboardTeacher size={24} />, value: "3+", label: "Teachers" },
    { icon: <FaGlobe size={24} />, value: "5+", label: "Countries" },
  ];

  return (
    <div className="py-16" style={{ backgroundColor: BRAND_LIGHT }}>
      <div className="lg:w-3/4 w-11/12 mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span
            className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-3"
            style={{ backgroundColor: "#fff", color: BRAND }}
          >
            🌍 Growing Worldwide
          </span>
          <h2
            className="text-2xl md:text-4xl font-extrabold"
            style={{ color: BRAND }}
          >
            Our Qira'at Community
          </h2>
          <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
            Connecting students across borders through the beauty of Quranic
            recitation
          </p>
        </motion.div>

        {/* Stats — Hero style pills */}
        <div className="flex flex-wrap justify-center gap-5">
          {statItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 px-6 py-4 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border bg-white"
              style={{ borderColor: "#dde2f8" }}
            >
              {/* Icon */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-white shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${BRAND_DARK}, ${BRAND_MID})`,
                }}
              >
                {item.icon}
              </div>

              {/* Text */}
              <div className="leading-tight">
                <p className="font-extrabold text-xl" style={{ color: BRAND }}>
                  {item.value}
                </p>
                <p className="text-xs text-gray-500">{item.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveStatsBanner;
