import { Link } from "react-router-dom";
import logo from "/logo.png";
import {
  FaTelegramPlane,
  FaWhatsapp,
  FaFacebookF,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { motion } from "framer-motion";

const BRAND = "#0b148f";
const BRAND_DARK = "#090f6e";
const BRAND_MID = "#1a2ba6";
const BRAND_LIGHT = "#eef0fd";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.6, ease: "easeOut" },
  }),
};

const Footer = () => {
  const socialLinks = [
    {
      icon: <FaTelegramPlane />,
      href: "https://t.me/+8801883128299",
      label: "Telegram",
    },
    {
      icon: <FaWhatsapp />,
      href: "https://api.whatsapp.com/send?phone=8801883128299",
      label: "WhatsApp",
    },
    {
      icon: <FaFacebookF />,
      href: "https://www.facebook.com/profile.php?id=61582112353298",
      label: "Facebook",
    },
  ];

  const services = [
    "Quran Course",
    "Maqamat",
    "Rewayat",
    "Higher Qira'at Course",
    "Kids Program",
  ];
  const academy = [
    "About Us",
    "Contact",
    "Certificate Checker",
    "Admission Help",
  ];

  return (
    <footer
      className="mt-20 pt-16 pb-6 px-6 relative overflow-hidden"
      style={{
        background: `linear-gradient(160deg, ${BRAND_DARK} 0%, ${BRAND_MID} 100%)`,
      }}
    >
      {/* BG decorations */}
      <div
        className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ backgroundColor: "#fff" }}
      />
      <div
        className="absolute bottom-0 left-0 w-60 h-60 rounded-full blur-3xl opacity-5 pointer-events-none"
        style={{ backgroundColor: "#fff" }}
      />

      <div className="lg:w-3/4 w-11/12 mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Logo & About */}
          <motion.div
            custom={0.1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/30 shrink-0">
                <img
                  src={logo}
                  alt="Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-white font-extrabold text-base leading-tight">
                  AL MASNAD
                </p>
                <p className="text-white/50 text-xs">Academy</p>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              A premier Quranic institution connecting students across 5+
              countries with Bangladesh's finest Qaris. Est. 2024.
            </p>

            {/* Contact info */}
            <div className="space-y-2">
              {[
                { icon: <FaPhone size={11} />, text: "+8801883128299" },
                { icon: <MdEmail size={11} />, text: "almasnadacademy@gmail.com" },
                {
                  icon: <FaMapMarkerAlt size={11} />,
                  text: "Chittagong, Bangladesh",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-white/60 text-xs"
                >
                  <span className="text-white/40">{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            custom={0.2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="space-y-4"
          >
            <h4 className="text-white font-bold text-base tracking-wide">
              Services
            </h4>
            <div
              className="w-8 h-0.5 rounded-full"
              style={{ backgroundColor: BRAND_LIGHT }}
            />
            <ul className="space-y-2.5">
              {services.map((s, i) => (
                <li key={i}>
                  <Link
                    to="#"
                    className="text-white/60 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/30 shrink-0" />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Academy */}
          <motion.div
            custom={0.3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="space-y-4"
          >
            <h4 className="text-white font-bold text-base tracking-wide">
              Our Academy
            </h4>
            <div
              className="w-8 h-0.5 rounded-full"
              style={{ backgroundColor: BRAND_LIGHT }}
            />
            <ul className="space-y-2.5">
              {academy.map((a, i) => (
                <li key={i}>
                  <Link
                    to="#"
                    className="text-white/60 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/30 shrink-0" />
                    {a}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social & Subscribe */}
          <motion.div
            custom={0.4}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="space-y-4"
          >
            <h4 className="text-white font-bold text-base tracking-wide">
              Stay Connected
            </h4>
            <div
              className="w-8 h-0.5 rounded-full"
              style={{ backgroundColor: BRAND_LIGHT }}
            />
            <p className="text-white/60 text-sm">
              Follow us for updates on Qira'at programs and events.
            </p>

            {/* Social icons */}
            <div className="flex gap-3">
              {socialLinks.map(({ icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white transition-all duration-200"
                  style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      "rgba(255,255,255,0.25)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      "rgba(255,255,255,0.1)")
                  }
                  aria-label={label}
                >
                  {icon}
                </motion.a>
              ))}
            </div>

            {/* Subscribe */}
            <div className="flex flex-col sm:flex-row gap-2 mt-2">
              <input
                type="email"
                placeholder="Your Email"
                className="flex-1 px-3 py-2 rounded-lg text-sm bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/50 transition"
              />
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-200 shrink-0"
                style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "rgba(255,255,255,0.25)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "rgba(255,255,255,0.15)")
                }
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between gap-3 pt-8 border-t border-white/10 text-xs text-white/40"
        >
          <p>
            © {new Date().getFullYear()} AL MASNAD Academy. All rights reserved.
          </p>
          <p>Made with ❤️ for Quranic Education</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
