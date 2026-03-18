import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCertificate, FaSearch } from "react-icons/fa";

const BRAND = "#0b148f";
const BRAND_DARK = "#090f6e";
const BRAND_LIGHT = "#eef0fd";
const BRAND_MID = "#1a2ba6";

const CertificateChecker = () => {
  const [certificateId, setCertificateId] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const baseUrl = import.meta.env.VITE_almasnad_baseUrl;

  const handleCheck = async () => {
    if (!certificateId.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(`${baseUrl}/api/certificate/check/${certificateId}`);
      const data = await res.json();

      if (res.ok) {
        if (data.valid) {
          setResult({
            status: "valid",
            message: "Certificate is Authentic",
            certificate: data.certificate,
          });
        } else {
          setResult({ status: "invalid", message: "Certificate is Invalid" });
        }
      } else {
        setResult({ status: "error", message: data.message || "Certificate not found" });
      }
    } catch {
      setResult({ status: "error", message: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleCheck();
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: `linear-gradient(135deg, ${BRAND_DARK}, ${BRAND_MID}, #3b56d9)`,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 overflow-hidden"
      >

        {/* Left — Input */}
        <div className="p-8 flex flex-col justify-center gap-6">

          {/* Header */}
          <div className="flex flex-col items-center gap-2 text-center">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-2xl text-white shadow-md"
              style={{ backgroundColor: BRAND }}
            >
              <FaCertificate />
            </div>
            <h2 className="text-2xl font-extrabold" style={{ color: BRAND }}>
              Certificate Authentication
            </h2>
            <p className="text-sm text-gray-400">
              Enter a certificate ID to verify its authenticity
            </p>
          </div>

          {/* Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Enter Certificate ID / UID"
              value={certificateId}
              onChange={(e) => setCertificateId(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full border-2 rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none transition-all duration-300"
              style={{
                borderColor: certificateId ? BRAND : "#e5e7eb",
                boxShadow: certificateId ? `0 0 0 3px ${BRAND_LIGHT}` : "none",
              }}
            />
            <FaSearch
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 text-sm"
            />
          </div>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleCheck}
            disabled={loading || !certificateId.trim()}
            className="w-full text-white py-3 rounded-xl font-semibold shadow-md transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: BRAND }}
            onMouseEnter={(e) => { if (!loading) e.currentTarget.style.backgroundColor = BRAND_DARK; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = BRAND; }}
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Checking...
              </>
            ) : (
              <>
                <FaSearch /> Check Certificate
              </>
            )}
          </motion.button>
        </div>

        {/* Right — Result */}
        <div
          className="flex flex-col justify-center items-center p-8 min-h-[280px]"
          style={{ backgroundColor: BRAND_LIGHT }}
        >
          <AnimatePresence mode="wait">
            {!result && !loading && (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-3 text-center"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-3xl opacity-20"
                  style={{ backgroundColor: BRAND, color: "white" }}
                >
                  <FaCertificate />
                </div>
                <p className="text-gray-400 text-sm">
                  Result will appear here after verification
                </p>
              </motion.div>
            )}

            {loading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-3"
              >
                <div
                  className="w-10 h-10 rounded-full border-4 border-t-transparent animate-spin"
                  style={{ borderColor: BRAND, borderTopColor: "transparent" }}
                />
                <p className="text-sm font-medium" style={{ color: BRAND }}>
                  Verifying certificate...
                </p>
              </motion.div>
            )}

            {result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full rounded-xl p-5 text-center"
                style={{
                  backgroundColor:
                    result.status === "valid" ? "#f0fdf4"
                    : result.status === "invalid" ? "#fef2f2"
                    : "#fffbeb",
                  border: `1px solid ${
                    result.status === "valid" ? "#bbf7d0"
                    : result.status === "invalid" ? "#fecaca"
                    : "#fde68a"
                  }`,
                }}
              >
                {/* Status icon */}
                <p className="text-3xl mb-2">
                  {result.status === "valid" ? "✅"
                  : result.status === "invalid" ? "❌"
                  : "⚠️"}
                </p>

                <p className={`text-lg font-bold mb-3 ${
                  result.status === "valid" ? "text-green-700"
                  : result.status === "invalid" ? "text-red-600"
                  : "text-yellow-700"
                }`}>
                  {result.message}
                </p>

                {/* Certificate details */}
                {result.status === "valid" && result.certificate && (
                  <div className="text-left text-sm text-gray-700 space-y-2 mt-3 pt-3 border-t border-green-200">
                    {[
                      { label: "Student", value: result.certificate.studentName },
                      { label: "Course",  value: result.certificate.courseName  },
                      { label: "Issued",  value: new Date(result.certificate.issueDate).toLocaleDateString("en-BD", { year: "numeric", month: "long", day: "numeric" }) },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex items-start gap-2">
                        <span className="font-semibold text-gray-500 w-16 shrink-0">{label}:</span>
                        <span className="font-medium" style={{ color: BRAND }}>{value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default CertificateChecker;