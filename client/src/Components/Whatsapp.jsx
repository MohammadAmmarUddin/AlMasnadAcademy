import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp, FaTimes } from "react-icons/fa";

const BRAND = "#0b148f";
const BRAND_LIGHT = "#eef0fd";
const WA_NUMBER = "8801883128299";
const WA_NUMBER_IN = "919365262648";

const Whatsapp = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openWhatsApp = (number, msg = "") => {
    const url = `https://wa.me/${number}${msg ? `?text=${encodeURIComponent(msg)}` : ""}`;
    window.open(url, "_blank");
  };

  const contacts = [
    {
      label: "🇧🇩 বাংলাদেশ",
      sub: "+880 1883-128299",
      number: WA_NUMBER,
      msg: "আসসালামু আলাইকুম! AL MASNAD Academy সম্পর্কে জানতে চাই।",
      color: "#25d366",
    },
  ];

  return (
    <div className="fixed z-50 bottom-8 right-6">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="mb-4 bg-white rounded-2xl shadow-2xl overflow-hidden w-72 border"
            style={{ borderColor: BRAND_LIGHT }}
          >
            {/* Header */}
            <div
              className="px-5 py-4 flex items-center justify-between"
              style={{ backgroundColor: "#25d366" }}
            >
              <div className="flex items-center gap-2">
                <FaWhatsapp className="text-white text-xl" />
                <div>
                  <p className="text-white font-bold text-sm">AL MASNAD</p>
                  <p className="text-white/70 text-xs">
                    সাধারণত সাথে সাথে reply করি
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition"
              >
                <FaTimes size={14} />
              </button>
            </div>

            {/* Chat bubble */}
            <div className="p-4" style={{ backgroundColor: "#f0fdf4" }}>
              <div className="bg-white rounded-xl rounded-tl-none p-3 shadow-sm text-sm text-gray-700 max-w-[90%]">
                আসসালামু আলাইকুম! 👋
                <br />
                কোন দেশ থেকে যোগাযোগ করছেন?
                <p className="text-xs text-gray-400 mt-1 text-right">
                  AL MASNAD ✓✓
                </p>
              </div>
            </div>

            {/* Contact buttons */}
            <div className="p-4 flex flex-col gap-3">
              {contacts.map((c) => (
                <motion.button
                  key={c.number}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => openWhatsApp(c.number, c.msg)}
                  className="flex items-center gap-3 p-3 rounded-xl text-left w-full transition-all border hover:shadow-md"
                  style={{ borderColor: BRAND_LIGHT, backgroundColor: "#fff" }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: c.color }}
                  >
                    <FaWhatsapp className="text-white text-lg" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-800">{c.label}</p>
                    <p className="text-xs text-gray-400">{c.sub}</p>
                  </div>
                  <span className="ml-auto text-gray-400 text-sm">→</span>
                </motion.button>
              ))}

              {/* QR code */}
              <div className="mt-1 text-center">
                <p className="text-xs text-gray-400 mb-2">অথবা QR scan করুন</p>
                <img
                  src="./qr-code.png"
                  alt="WhatsApp QR"
                  className="w-24 h-24 mx-auto rounded-lg border object-cover"
                  style={{ borderColor: BRAND_LIGHT }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl relative"
        style={{ backgroundColor: "#25d366" }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FaTimes className="text-white text-xl" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FaWhatsapp className="text-white text-2xl" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ping animation */}
        {!isOpen && (
          <span
            className="absolute inset-0 rounded-full animate-ping opacity-20"
            style={{ backgroundColor: "#25d366" }}
          />
        )}
      </motion.button>
    </div>
  );
};

export default Whatsapp;
