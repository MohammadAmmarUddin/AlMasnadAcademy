import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCertificate } from "react-icons/fa";

const BRAND = "#0b148f";
const BRAND_DARK = "#090f6e";
const BRAND_LIGHT = "#eef0fd";
const BRAND_MID = "#1a2ba6";

const fields = [
  {
    name: "certificateId",
    label: "Certificate ID",
    type: "text",
    placeholder: "e.g. CERT-2024-001",
  },
  {
    name: "studentName",
    label: "Student Name",
    type: "text",
    placeholder: "Full name",
  },
  {
    name: "courseName",
    label: "Course Name",
    type: "text",
    placeholder: "e.g. Qira'at Saba",
  },
  { name: "issueDate", label: "Issue Date", type: "date", placeholder: "" },
];

const initialForm = {
  certificateId: "",
  studentName: "",
  courseName: "",
  issueDate: "",
};

const CertificateAdd = () => {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const baseUrl = import.meta.env.VITE_almasnad_baseUrl;

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch(`${baseUrl}/api/certificate/createCertificate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        if (data.exists) {
          setMessage({ type: "error", text: "Certificate ID already exists." });
        } else {
          setMessage({
            type: "success",
            text: "Certificate successfully created!",
          });
          setFormData(initialForm);
        }
      } else {
        setMessage({
          type: "error",
          text: data.message || "Something went wrong.",
        });
      }
    } catch {
      setMessage({ type: "error", text: "Server error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: `linear-gradient(135deg, ${BRAND_DARK}, ${BRAND_MID})`,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden"
      >
        {/* Header */}
        <div
          className="px-8 py-6 text-center"
          style={{
            background: `linear-gradient(135deg, ${BRAND_DARK}, ${BRAND_MID})`,
          }}
        >
          <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3">
            <FaCertificate className="text-white text-2xl" />
          </div>
          <h2 className="text-2xl font-extrabold text-white">
            Certificate Submission
          </h2>
          <p className="text-white/60 text-sm mt-1">
            Issue a new certificate for a student
          </p>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {fields.map(({ name, label, type, placeholder }) => (
              <div key={name}>
                <label
                  className="block mb-1.5 text-sm font-semibold"
                  style={{ color: BRAND }}
                >
                  {label}
                </label>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  required
                  className="w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all duration-300"
                  style={{
                    borderColor: formData[name] ? BRAND : "#e5e7eb",
                    boxShadow: formData[name]
                      ? `0 0 0 3px ${BRAND_LIGHT}`
                      : "none",
                  }}
                />
              </div>
            ))}

            {/* Submit */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              disabled={loading}
              className="w-full text-white py-3 rounded-xl font-semibold shadow-md transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              style={{ backgroundColor: BRAND }}
              onMouseEnter={(e) => {
                if (!loading)
                  e.currentTarget.style.backgroundColor = BRAND_DARK;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = BRAND;
              }}
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                "Issue Certificate →"
              )}
            </motion.button>
          </form>

          {/* Message */}
          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`mt-5 p-4 rounded-xl text-center text-sm font-semibold ${
                  message.type === "success"
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-600 border border-red-200"
                }`}
              >
                {message.type === "success" ? "✅" : "❌"} {message.text}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default CertificateAdd;
