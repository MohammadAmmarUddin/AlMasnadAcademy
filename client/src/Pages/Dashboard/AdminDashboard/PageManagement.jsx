import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaNewspaper,
  FaBullhorn,
  FaVideo,
  FaImages,
  FaHatWizard,
  FaBell,
  FaStar,
  FaBookOpen,
} from "react-icons/fa";

const BRAND = "#0b148f";
const BRAND_DARK = "#090f6e";
const BRAND_LIGHT = "#eef0fd";

const baseUrl = import.meta.env.VITE_almasnad_baseUrl;
const SECTION_META = {
  BreakingNews: {
    label: "Breaking News",
    icon: <FaNewspaper />,
    desc: "Marquee news bar at top",
  },
  UpdateBanner: {
    label: "Update Banner",
    icon: <FaBullhorn />,
    desc: "Full-width announcement banner",
  },
  VideoSection: {
    label: "Video Section",
    icon: <FaVideo />,
    desc: "Featured videos on home page",
  },
  PopularCourses: {
    label: "Courses Section",
    icon: <FaBookOpen />,
    desc: "Course cards on home page",
  }, // ✅ নতুন
  StudentGallery: {
    label: "Student Gallery",
    icon: <FaImages />,
    desc: "Student photos gallery",
  },
  PagriGallery: {
    label: "Pagri Gallery",
    icon: <FaHatWizard />,
    desc: "Pagri ceremony gallery",
  },
  VortiCholche: {
    label: "Vorti Popup",
    icon: <FaBell />,
    desc: "Floating admission popup",
  },
  StudentReview: {
    label: "Student Reviews",
    icon: <FaStar />,
    desc: "Student review section",
  },
};
const PageManagement = () => {
  const [sections, setSections] = useState(null);
  const [saving, setSaving] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetch(`${baseUrl}/api/page-visibility`)
      .then((res) => res.json())
      .then((data) => setSections(data))
      .catch((err) => console.error(err));
  }, []);

  const handleToggle = async (section, currentValue) => {
    const newValue = !currentValue;
    setSaving(section);

    // Optimistic update
    setSections((prev) => ({ ...prev, [section]: newValue }));

    try {
      const res = await fetch(`${baseUrl}/api/page-visibility`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, value: newValue }),
      });

      const data = await res.json();
      if (data.success) {
        setToast({
          type: "success",
          msg: `${SECTION_META[section].label} ${newValue ? "shown" : "hidden"}`,
        });
      }
    } catch (err) {
      // Revert on error
      setSections((prev) => ({ ...prev, [section]: currentValue }));
      setToast({ type: "error", msg: "Failed to update. Try again." });
    } finally {
      setSaving(null);
      setTimeout(() => setToast(null), 3000);
    }
  };

  if (!sections)
    return (
      <div className="flex items-center justify-center h-64">
        <div
          className="w-8 h-8 rounded-full border-4 border-t-transparent animate-spin"
          style={{ borderColor: BRAND, borderTopColor: "transparent" }}
        />
      </div>
    );

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold" style={{ color: BRAND }}>
          🗂️ Page Management
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Toggle which sections are visible on the home page for all users.
        </p>
      </div>

      {/* Toast */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className={`mb-4 px-4 py-2 rounded-lg text-sm font-medium ${
            toast.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {toast.type === "success" ? "✅" : "❌"} {toast.msg}
        </motion.div>
      )}

      {/* Section Cards */}
      <div className="flex flex-col gap-4">
        {Object.entries(SECTION_META).map(([key, meta], idx) => {
          const isVisible = sections[key];
          const isSaving = saving === key;

          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="flex items-center justify-between p-4 rounded-xl border shadow-sm transition-all duration-300"
              style={{
                borderColor: isVisible ? BRAND_LIGHT : "#e5e7eb",
                backgroundColor: isVisible ? BRAND_LIGHT : "#f9fafb",
              }}
            >
              {/* Left */}
              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                  style={{
                    backgroundColor: isVisible ? BRAND : "#e5e7eb",
                    color: isVisible ? "white" : "#9ca3af",
                  }}
                >
                  {meta.icon}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{meta.label}</p>
                  <p className="text-xs text-gray-400">{meta.desc}</p>
                </div>
              </div>

              {/* Right — Toggle */}
              <div className="flex items-center gap-3">
                <span
                  className={`text-xs font-semibold ${isVisible ? "text-green-600" : "text-gray-400"}`}
                >
                  {isVisible ? "Visible" : "Hidden"}
                </span>
                <button
                  onClick={() => handleToggle(key, isVisible)}
                  disabled={isSaving}
                  className="relative w-12 h-6 rounded-full transition-all duration-300 focus:outline-none"
                  style={{ backgroundColor: isVisible ? BRAND : "#d1d5db" }}
                >
                  <motion.div
                    animate={{ x: isVisible ? 24 : 2 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute top-1 w-4 h-4 bg-white rounded-full shadow"
                  />
                  {isSaving && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </span>
                  )}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer note */}
      <p className="text-xs text-gray-400 mt-6 text-center">
        Changes apply instantly for all visitors. No page refresh needed.
      </p>
    </div>
  );
};

export default PageManagement;
