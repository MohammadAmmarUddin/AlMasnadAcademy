import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const BRAND = "#0b148f";
const BRAND_LIGHT_RGB = [238, 240, 253];

const BreakingNews = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="relative mt-5 flex flex-col md:flex-row items-center gap-4 w-full">

        {/* Breaking News Badge */}
        <Link to="/form" className="shrink-0">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.85 }}
            className="relative inline-flex items-center justify-center px-4 py-1.5 rounded-full font-semibold text-sm text-white transition duration-300 shadow-md"
            style={{ backgroundColor: BRAND }}
          >
            <span
              className="absolute inset-0 rounded-full animate-ping opacity-20"
              style={{ backgroundColor: BRAND }}
            />
            <span className="relative z-10">📢 Breaking News</span>
          </motion.button>
        </Link>

        {/* Divider */}
        <div
          className="hidden md:block h-5 w-px opacity-30"
          style={{ backgroundColor: BRAND }}
        />

        {/* Marquee Content */}
        <Marquee
          pauseOnClick={true}
          speed={50}
          gradient={true}
          gradientColor={BRAND_LIGHT_RGB}
          gradientWidth={60}
          className="font-medium text-[15px] md:text-base tracking-wide"
          style={{ color: BRAND }}
        >
          <span className="mr-16">
            🎉 AL MASNAD Academy-তে ভর্তি চলছে &nbsp;|&nbsp; 🧒 Kids Program-এ ভর্তির সুযোগ সীমিত — এখনই যোগ দিন &nbsp;|&nbsp; 🎵 Maqamat Program-এ ভর্তি চলছে &nbsp;|&nbsp; যোগাযোগ : +8801883128299
          </span>
        </Marquee>

      </div>
    </motion.div>
  );
};

export default BreakingNews;