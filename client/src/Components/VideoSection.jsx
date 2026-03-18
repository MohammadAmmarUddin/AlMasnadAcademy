import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BRAND      = "#0b148f";
const BRAND_DARK = "#090f6e";
const BRAND_MID  = "#1a2ba6";
const BRAND_LIGHT = "#eef0fd";
const BASE_URL   = import.meta.env.VITE_almasnad_baseUrl || "";

const VideoSection = () => {
  const [videos, setVideos]   = useState([]);
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");

  useEffect(() => {
    fetch(`${BASE_URL}/api/videos`)
      .then((res) => { if (!res.ok) throw new Error(); return res.json(); })
      .then((data) => { setVideos(data); setLoading(false); })
      .catch(() => { setError("ভিডিও লোড করতে সমস্যা হয়েছে।"); setLoading(false); });
  }, []);

  const goTo = (idx) => { setCurrent(idx); setPlaying(false); };
  const prev = () => goTo((current - 1 + videos.length) % videos.length);
  const next = () => goTo((current + 1) % videos.length);
  const v = videos[current];

  // Arrow button
  const ArrowBtn = ({ onClick, direction }) => (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="w-11 h-11 rounded-full flex items-center justify-center border-2 transition-all duration-200 shrink-0"
      style={{ borderColor: BRAND, color: BRAND, backgroundColor: "#fff" }}
      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = BRAND; e.currentTarget.style.color = "#fff"; }}
      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#fff"; e.currentTarget.style.color = BRAND; }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {direction === "left"
          ? <polyline points="15 18 9 12 15 6" />
          : <polyline points="9 18 15 12 9 6" />}
      </svg>
    </motion.button>
  );

  return (
    <div className="py-16 relative overflow-hidden" style={{ backgroundColor: BRAND_LIGHT }}>

      {/* BG blobs */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${BRAND}, transparent)` }} />
      <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${BRAND_MID}, transparent)` }} />

      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1"
        style={{ background: `linear-gradient(90deg, ${BRAND_DARK}, #3b56d9, ${BRAND_DARK})` }} />

      <div className="lg:w-3/4 w-11/12 mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
            style={{ backgroundColor: "#fff", color: BRAND, border: `1px solid ${BRAND_LIGHT}` }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: BRAND }} />
            ভিডিও গ্যালারি
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: BRAND }} />
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold" style={{ color: BRAND }}>
            আমাদের ভিডিও সংগ্রহ
          </h2>
          <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
            কিরা'আতের সৌন্দর্য উপভোগ করুন আমাদের বিশেষ ভিডিও সংকলনে
          </p>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center gap-4 py-16">
            <div className="w-12 h-12 rounded-full border-4 border-t-transparent animate-spin"
              style={{ borderColor: BRAND, borderTopColor: "transparent" }} />
            <p className="text-sm font-medium" style={{ color: BRAND }}>ভিডিও লোড হচ্ছে...</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center text-red-600 font-semibold text-sm">
            ⚠️ {error}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && videos.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-16 text-gray-400">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <path d="M8 21h8M12 17v4" />
            </svg>
            <p className="font-semibold">কোনো ভিডিও পাওয়া যায়নি</p>
            <p className="text-sm">অ্যাডমিন ড্যাশবোর্ড থেকে ভিডিও যোগ করুন।</p>
          </div>
        )}

        {/* Player */}
        {!loading && !error && videos.length > 0 && v && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            {/* Player row */}
            <div className="w-full flex items-center gap-4">

              {/* Left arrow — hidden on mobile */}
              <div className="hidden md:block">
                <ArrowBtn onClick={prev} direction="left" />
              </div>

              {/* Video box */}
              <div
                className="flex-1 relative rounded-2xl overflow-hidden cursor-pointer"
                style={{
                  paddingTop: "56.25%",
                  background: BRAND_DARK,
                  boxShadow: `0 20px 60px rgba(11,20,143,0.2), 0 4px 20px rgba(0,0,0,0.15)`,
                  border: `2px solid rgba(11,20,143,0.15)`,
                }}
                onClick={() => !playing && setPlaying(true)}
              >
                <iframe
                  key={`${v._id}-${playing}`}
                  className="absolute inset-0 w-full h-full border-none"
                  style={{ pointerEvents: playing ? "all" : "none" }}
                  src={playing
                    ? `${v.embedUrl}?autoplay=1&rel=0&modestbranding=1`
                    : `${v.embedUrl}?rel=0&modestbranding=1`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={v.title}
                />

                {/* Play overlay */}
                <AnimatePresence>
                  {!playing && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10"
                      style={{ background: `linear-gradient(160deg, rgba(9,15,110,0.6), rgba(26,43,166,0.4))` }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${BRAND_DARK}, #3b56d9)`,
                          boxShadow: `0 0 0 14px rgba(11,20,143,0.2), 0 8px 32px rgba(11,20,143,0.5)`,
                        }}
                      >
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
                          <polygon points="6,3 20,12 6,21" />
                        </svg>
                      </motion.div>
                      <span className="text-xs font-semibold text-white/90 bg-black/20 px-4 py-1.5 rounded-full">
                        ক্লিক করে দেখুন
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Right arrow — hidden on mobile */}
              <div className="hidden md:block">
                <ArrowBtn onClick={next} direction="right" />
              </div>
            </div>

            {/* Meta + dots */}
            <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mt-5">

              {/* Title + tag */}
              <div className="flex items-center gap-3 min-w-0">
                {v.tag && (
                  <span className="shrink-0 text-xs font-bold uppercase tracking-wide text-white px-3 py-1 rounded-md"
                    style={{ backgroundColor: BRAND }}>
                    {v.tag}
                  </span>
                )}
                <div className="min-w-0">
                  <p className="font-bold text-sm md:text-base truncate" style={{ color: BRAND_DARK }}>
                    {v.title}
                  </p>
                  {v.desc && <p className="text-xs text-gray-500 mt-0.5">{v.desc}</p>}
                </div>
              </div>

              {/* Dots + counter */}
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs font-semibold text-gray-400">
                  {current + 1} / {videos.length}
                </span>
                <div className="flex items-center gap-1.5">
                  {videos.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      className="h-2 rounded-full border-none cursor-pointer transition-all duration-300"
                      style={{
                        width: i === current ? 22 : 7,
                        backgroundColor: i === current ? BRAND : "rgba(11,20,143,0.2)",
                      }}
                    />
                  ))}
                </div>

                {/* Mobile arrows */}
                <div className="flex md:hidden items-center gap-2 ml-2">
                  <ArrowBtn onClick={prev} direction="left" />
                  <ArrowBtn onClick={next} direction="right" />
                </div>
              </div>
            </div>

            {/* Bottom accent */}
            <div className="mt-8 w-14 h-1 rounded-full"
              style={{ background: `linear-gradient(90deg, ${BRAND}, #3b56d9)` }} />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default VideoSection;