import { motion } from "framer-motion";
import { FaCertificate, FaDownload, FaMedal } from "react-icons/fa";

const BRAND = "#0b148f";
const BRAND_DARK = "#090f6e";
const BRAND_LIGHT = "#eef0fd";
const BRAND_MID = "#1a2ba6";

const Certificate = () => {
  return (
    <div className="min-h-screen p-6 md:p-10">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h2
          className="text-2xl md:text-3xl font-extrabold flex items-center gap-2"
          style={{ color: BRAND }}
        >
          <FaCertificate /> Certificate
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Your earned certificate is available below
        </p>
        <div
          className="h-px mt-4"
          style={{
            background: `linear-gradient(to right, ${BRAND}, transparent)`,
          }}
        />
      </motion.div>

      {/* Certificate Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-white rounded-2xl border shadow-md overflow-hidden max-w-2xl"
        style={{ borderColor: BRAND_LIGHT }}
      >
        {/* Card top accent */}
        <div
          className="h-1.5 w-full"
          style={{
            background: `linear-gradient(to right, ${BRAND_DARK}, #3b56d9)`,
          }}
        />

        <div className="p-8 flex flex-col items-center gap-6">

          {/* Icon / Badge */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${BRAND_DARK}, ${BRAND_MID})`,
            }}
          >
            <FaMedal className="text-yellow-300 text-4xl" />
          </motion.div>

          {/* Certificate image */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="w-full rounded-xl overflow-hidden border shadow-sm"
            style={{ borderColor: BRAND_LIGHT }}
          >
            <img
              src="/certificate_icon.png"
              alt="Certificate"
              className="w-full h-auto object-contain"
            />
          </motion.div>

          {/* Info text */}
          <p className="text-sm text-gray-400 text-center">
            Congratulations on completing your course at AL MASNAD Academy 🎉
          </p>

          {/* Download button */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-3 text-white px-8 py-3 rounded-xl font-semibold shadow-md transition-all duration-300"
            style={{ backgroundColor: BRAND }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = BRAND_DARK)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = BRAND)
            }
          >
            <FaDownload />
            Download Certificate
          </motion.button>

        </div>
      </motion.div>
    </div>
  );
};

export default Certificate;