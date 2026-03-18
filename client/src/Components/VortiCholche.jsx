import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight, FaTimesCircle } from "react-icons/fa";

const BRAND = "#0b148f";
const BRAND_DARK = "#090f6e";
const BRAND_MID = "#1a2ba6";

const VortiCholche = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Show popup after 10 seconds — user gets time to see hero stats first
    const openTimer = setTimeout(() => {
      setIsOpen(true);
      setHasShown(true);
    }, 10000);

    return () => clearTimeout(openTimer);
  }, []);

  useEffect(() => {
    if (!isOpen || !hasShown) return;

    // Auto close after 8 seconds of being visible
    const closeTimer = setTimeout(() => {
      setIsOpen(false);
    }, 8000);

    return () => clearTimeout(closeTimer);
  }, [isOpen]);

  return (
    <div className="fixed z-50 bottom-10 left-6 hidden md:block">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -150, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -150, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-80 md:w-96 p-6 rounded-2xl shadow-xl text-white relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${BRAND_DARK}, ${BRAND_MID})`,
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-white/70 hover:text-white transition text-lg"
            >
              ✕
            </button>

            {/* Title */}
            <h3 className="text-lg font-bold mb-4 tracking-wide">
              📢 ভর্তি চলছে
            </h3>

            {/* Dates */}
            <div className="space-y-4 text-sm md:text-base">
              <div className="flex items-center gap-3">
                <FaArrowRight className="text-white/80 shrink-0" />
                <p>
                  এনরোলমেন্ট শুরু:{" "}
                  <span className="font-bold">১ ফেব্রুয়ারী, 2026</span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <FaTimesCircle className="text-white/80 shrink-0" />
                <p>
                  এনরোলমেন্ট শেষ:{" "}
                  <span className="font-bold">১০ রমাদান, 2026</span>
                </p>
              </div>
            </div>

            {/* Progress bar — 8s matches auto close timer */}
            <motion.div
              key={String(isOpen)}
              className="absolute bottom-0 left-0 h-1 rounded-b-2xl"
              style={{ backgroundColor: "rgba(255,255,255,0.4)" }}
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 8, ease: "linear" }}
            />

            {/* Decorative glow */}
            <div
              className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full blur-3xl"
              style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reopen button — only shows after popup has appeared at least once */}
      <AnimatePresence>
        {!isOpen && hasShown && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(true)}
            className="text-white px-4 py-2 rounded-full shadow-lg font-medium text-sm transition-all duration-300"
            style={{ backgroundColor: BRAND }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = BRAND_DARK)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = BRAND)
            }
          >
            📢 ভর্তি চলছে
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VortiCholche;
