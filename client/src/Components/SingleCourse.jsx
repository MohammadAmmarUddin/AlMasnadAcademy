import { useState, useEffect, useRef } from "react";
import { IoMdDownload } from "react-icons/io";
import {
  FaChevronLeft,
  FaChevronRight,
  FaRegStar,
  FaStar,
  FaStarHalfAlt,
  FaWhatsapp,
  FaMobileAlt,
  FaCheckCircle,
  FaCopy,
  FaBitcoin,
  FaWifi,
  FaMicrophone,
  FaHeadphones,
} from "react-icons/fa";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { FaRegCirclePlay } from "react-icons/fa6";
import useAuthContext from "../hooks/useAuthContext";
import Swal from "sweetalert2";
import parse from "html-react-parser";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useParams } from "react-router-dom";
import { MdOutlineSlowMotionVideo, MdDevices } from "react-icons/md";
import { GoNote } from "react-icons/go";
import { TbLivePhoto } from "react-icons/tb";
import { PiExam } from "react-icons/pi";

const BRAND = "#0b148f";
const BRAND_DARK = "#090f6e";
const BRAND_LIGHT = "#eef0fd";
const BRAND_MID = "#1a2ba6";
const WHATSAPP_BD = "8801883128299";
const WHATSAPP_IN = "919365262648";
const BKASH_NUMBER = "01883128299";
const NAGAD_NUMBER = "01883128299";

// ─── CoursePayment ────────────────────────────────────────
const CoursePayment = ({ course }) => {
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState(null);
  const [phone, setPhone] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [copied, setCopied] = useState(null);
  const [loading, setLoading] = useState(false);

  const copy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const buildMsg = () =>
    encodeURIComponent(
      `
🕌 *AL MASNAD Academy — ভর্তির আবেদন*
📚 *কোর্স:* ${course?.title}
💰 *মূল্য:* ৳${course?.price?.toLocaleString()}
💳 *মাধ্যম:* ${method === "bkash" ? "bKash" : "Nagad"}
📱 *নম্বর:* ${phone}
🔖 *ট্রানজেকশন:* ${transactionId}
✅ অনুগ্রহ করে আমার ভর্তি নিশ্চিত করুন।`.trim(),
    );

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const baseUrl = import.meta.env.VITE_MAHAD_baseUrl;
    fetch(`${baseUrl}/api/payment/manual`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        courseId: course?._id,
        courseTitle: course?.title,
        amount: course?.price,
        paymentMethod: method,
        phone,
        transactionId,
      }),
    }).catch(() => {});
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 800);
  };

  const methods = [
    {
      id: "bkash",
      label: "bKash",
      sub: `Send Money: ${BKASH_NUMBER}`,
      icon: <span className="text-white font-extrabold text-xl">b</span>,
      iconBg: "#e2136e",
      border: "#e2136e",
      bg: "#fff0f7",
      action: () => {
        setMethod("bkash");
        setStep(2);
      },
    },
    {
      id: "nagad",
      label: "Nagad",
      sub: `Send Money: ${NAGAD_NUMBER}`,
      icon: <span className="text-white font-extrabold text-xl">N</span>,
      iconBg: "#f7941d",
      border: "#f7941d",
      bg: "#fff8f0",
      action: () => {
        setMethod("nagad");
        setStep(2);
      },
    },
    {
      id: "india",
      label: "🇮🇳 ভারতীয় শিক্ষার্থী",
      sub: "Google Pay / PhonePe — WhatsApp এ যোগাযোগ করুন",
      icon: <FaWhatsapp size={20} className="text-white" />,
      iconBg: "#25d366",
      border: "#25d366",
      bg: "#f0fdf4",
      action: () =>
        window.open(
          `https://wa.me/${WHATSAPP_IN}?text=${encodeURIComponent(`আমি ${course?.title} কোর্সে ভর্তি হতে চাই। আমি ভারত থেকে পেমেন্ট করতে চাই।`)}`,
          "_blank",
        ),
    },
    {
      id: "binance",
      label: "Binance / Crypto",
      sub: "WhatsApp এ যোগাযোগ করুন পেমেন্টের জন্য",
      icon: <FaBitcoin size={20} className="text-white" />,
      iconBg: "#f0b90b",
      border: "#f0b90b",
      bg: "#fffdf0",
      action: () =>
        window.open(
          `https://wa.me/${WHATSAPP_BD}?text=${encodeURIComponent(`আমি ${course?.title} কোর্সে ভর্তি হতে চাই। Binance এ পেমেন্ট করতে চাই।`)}`,
          "_blank",
        ),
    },
  ];

  return (
    <div
      className="rounded-2xl overflow-hidden border shadow-lg"
      style={{ borderColor: BRAND_LIGHT }}
    >
      <div
        className="px-6 py-5"
        style={{
          background: `linear-gradient(135deg, ${BRAND_DARK}, ${BRAND_MID})`,
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-white/60 text-xs mb-1">কোর্স মূল্য</p>
            <p className="text-white text-3xl font-extrabold">
              ৳{course?.price?.toLocaleString()}
            </p>
            {course?.discountPrice && (
              <p className="text-white/40 text-xs line-through mt-0.5">
                ৳{course?.discountPrice?.toLocaleString()}
              </p>
            )}
          </div>
          <div
            className="px-3 py-1.5 rounded-full text-xs font-bold text-white border border-white/20"
            style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
          >
            ম্যানুয়াল পেমেন্ট
          </div>
        </div>
        <div className="flex items-center gap-2">
          {["মাধ্যম", "তথ্য", "সম্পন্ন"].map((label, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
                  style={{
                    backgroundColor:
                      step >= i + 1 ? "#fff" : "rgba(255,255,255,0.2)",
                    color: step >= i + 1 ? BRAND : "rgba(255,255,255,0.5)",
                  }}
                >
                  {step > i + 1 ? "✓" : i + 1}
                </div>
                <span className="text-white/50 text-xs hidden sm:block">
                  {label}
                </span>
              </div>
              {i < 2 && (
                <div
                  className="h-0.5 w-6 rounded-full"
                  style={{
                    backgroundColor:
                      step > i + 1 ? "#fff" : "rgba(255,255,255,0.2)",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="p-5">
        <AnimatePresence mode="wait" initial={false}>
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col gap-3"
            >
              <p className="text-sm font-bold mb-1" style={{ color: BRAND }}>
                পেমেন্ট মাধ্যম বেছে নিন
              </p>
              {methods.map((m) => (
                <motion.button
                  key={m.id}
                  whileHover={{ scale: 1.02, x: 3 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={m.action}
                  className="flex items-center gap-3 p-3.5 rounded-xl border-2 text-left w-full transition-all hover:shadow-md"
                  style={{ borderColor: m.border, backgroundColor: m.bg }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: m.iconBg }}
                  >
                    {m.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-800 text-sm">{m.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5 truncate">
                      {m.sub}
                    </p>
                  </div>
                  <span className="text-gray-400 shrink-0 text-sm">→</span>
                </motion.button>
              ))}
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col gap-4"
            >
              <div
                className="p-4 rounded-xl"
                style={{ backgroundColor: BRAND_LIGHT }}
              >
                <p className="font-bold text-sm mb-2" style={{ color: BRAND }}>
                  📋 পেমেন্ট নির্দেশনা
                </p>
                <p className="text-gray-600 text-xs leading-relaxed mb-3">
                  নিচের নম্বরে{" "}
                  <strong>{method === "bkash" ? "bKash" : "Nagad"}</strong> থেকে{" "}
                  <strong>৳{course?.price?.toLocaleString()}</strong> Send Money
                  করুন:
                </p>
                <div
                  className="flex items-center justify-between bg-white rounded-xl px-4 py-3 border"
                  style={{ borderColor: "#dde2f8" }}
                >
                  <div className="flex items-center gap-2">
                    <FaMobileAlt style={{ color: BRAND }} />
                    <span className="font-extrabold" style={{ color: BRAND }}>
                      {method === "bkash" ? BKASH_NUMBER : NAGAD_NUMBER}
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      copy(
                        method === "bkash" ? BKASH_NUMBER : NAGAD_NUMBER,
                        "num",
                      )
                    }
                    className="text-xs flex items-center gap-1 px-3 py-1.5 rounded-lg font-semibold"
                    style={{ color: BRAND, backgroundColor: BRAND_LIGHT }}
                  >
                    {copied === "num" ? (
                      <>
                        <FaCheckCircle /> Copied!
                      </>
                    ) : (
                      <>
                        <FaCopy /> Copy
                      </>
                    )}
                  </button>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                {[
                  {
                    label: "যে নম্বর থেকে টাকা পাঠিয়েছেন",
                    value: phone,
                    setter: setPhone,
                    placeholder: "01XXXXXXXXX",
                    type: "tel",
                  },
                  {
                    label: "ট্রানজেকশন আইডি",
                    value: transactionId,
                    setter: setTransactionId,
                    placeholder: "e.g. 8N7A6B5C4D",
                    type: "text",
                  },
                ].map(({ label, value, setter, placeholder, type }) => (
                  <div key={label}>
                    <label
                      className="block text-xs font-semibold mb-1.5"
                      style={{ color: BRAND }}
                    >
                      {label}
                    </label>
                    <input
                      type={type}
                      value={value}
                      onChange={(e) => setter(e.target.value)}
                      placeholder={placeholder}
                      required
                      className="w-full border-2 rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-all duration-300"
                      style={{
                        borderColor: value ? BRAND : "#e5e7eb",
                        boxShadow: value ? `0 0 0 3px ${BRAND_LIGHT}` : "none",
                      }}
                    />
                  </div>
                ))}
                <div className="flex gap-3 mt-1">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-2.5 rounded-xl text-sm font-semibold border-2"
                    style={{ borderColor: BRAND_LIGHT, color: BRAND }}
                  >
                    ← ফিরে
                  </button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    disabled={loading || !phone || !transactionId}
                    className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 disabled:opacity-50"
                    style={{
                      background: `linear-gradient(135deg, ${BRAND_DARK}, ${BRAND_MID})`,
                    }}
                  >
                    {loading ? (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      "নিশ্চিত করুন →"
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center gap-4 py-2 text-center"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ backgroundColor: BRAND_LIGHT }}
              >
                <FaCheckCircle style={{ color: BRAND }} className="text-4xl" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-gray-800">
                  তথ্য জমা হয়েছে! ✅
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  এখন WhatsApp এ যোগাযোগ করুন।
                </p>
              </div>
              <div
                className="w-full rounded-xl p-4 text-left text-xs space-y-2 border"
                style={{ backgroundColor: BRAND_LIGHT, borderColor: "#dde2f8" }}
              >
                {[
                  { label: "কোর্স", value: course?.title },
                  {
                    label: "মূল্য",
                    value: `৳${course?.price?.toLocaleString()}`,
                  },
                  {
                    label: "মাধ্যম",
                    value: method === "bkash" ? "bKash" : "Nagad",
                  },
                  { label: "নম্বর", value: phone },
                  { label: "ট্রানজেকশন", value: transactionId },
                ].map(({ label, value }) => (
                  <p key={label}>
                    <span className="text-gray-400">{label}: </span>
                    <span className="font-semibold" style={{ color: BRAND }}>
                      {value}
                    </span>
                  </p>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() =>
                  window.open(
                    `https://wa.me/${WHATSAPP_BD}?text=${buildMsg()}`,
                    "_blank",
                  )
                }
                className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg"
                style={{ backgroundColor: "#25d366" }}
              >
                <FaWhatsapp size={20} /> WhatsApp এ যোগাযোগ করুন
              </motion.button>
              <p className="text-xs text-gray-400">
                সাধারণত ২৪ ঘণ্টার মধ্যে ভর্তি নিশ্চিত করা হয়।
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// ─── Main SingleCourse ────────────────────────────────────
const SingleCourse = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const { user } = useAuthContext();

  const [courseData, setCourseData] = useState(state?.course || null);
  const [reletedCourses, setreletedCourses] = useState([]);
  const [rating, setRating] = useState(null);
  const [comments, setComments] = useState("");

  const reletedCoursesCarouselRef = useRef(null);
  const userId = user?.user?._id;
  const baseUrl = import.meta.env.VITE_MAHAD_baseUrl; // ✅ fixed

  // Fetch course if not passed via state
  useEffect(() => {
    if (state?.course) return;
    fetch(`${baseUrl}/api/course/getSingleCourse/${id}`)
      .then((r) => r.json())
      .then((data) => setCourseData(data))
      .catch(() => {});
  }, [id]);

  // Fetch related courses after courseData loads
  useEffect(() => {
    if (!courseData?.keywords?.length) return;
    fetch(`${baseUrl}/api/course/getAllCourses`)
      .then((r) => r.json())
      .then((data) => {
        const kw = courseData.keywords.map((k) => k?.toLowerCase().trim());
        setreletedCourses(
          data?.filter((c) =>
            c?.keywords?.some((k) => kw.includes(k?.toLowerCase().trim())),
          ),
        );
      })
      .catch(() => {});
  }, [courseData]);

  const downloadFiteAtURL = (url) => {
    if (!url) return;
    const a = document.createElement("a");
    a.href = url;
    a.setAttribute("download", url.split("/").pop().split("?")[0]);
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleSubmitRating = async () => {
    if (!rating) return;
    try {
      const res = await fetch(
        `${baseUrl}/api/course/giveRating/${courseData._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            reviewerId: userId,
            rating: rating.toString(),
            comments,
          }),
        },
      );
      const data = await res.json();
      if (!res.ok) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: data.message,
          confirmButtonColor: BRAND,
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Thank You",
          text: "Your review is submitted!",
          confirmButtonColor: BRAND,
        });
        setRating(null);
        setComments("");
      }
    } catch {}
  };

  const calculateAverageRating = () => {
    if (!courseData?.studentsOpinion?.length) return 0;
    return parseFloat(
      (
        courseData.studentsOpinion.reduce((a, o) => a + parseInt(o.rating), 0) /
        courseData.studentsOpinion.length
      ).toFixed(1),
    );
  };

  const renderStars = (avg) => {
    const full = Math.floor(avg);
    const half = avg % 1 >= 0.25 && avg % 1 < 0.75;
    return [
      ...Array(full)
        .fill(null)
        .map((_, i) => <FaStar key={`f${i}`} className="text-yellow-400" />),
      ...(half ? [<FaStarHalfAlt key="h" className="text-yellow-400" />] : []),
      ...Array(5 - Math.ceil(avg))
        .fill(null)
        .map((_, i) => <FaRegStar key={`e${i}`} className="text-yellow-400" />),
    ];
  };

  const scrollCarousel = (ref, dir) =>
    ref.current?.scrollBy({
      left: dir === "left" ? -200 : 200,
      behavior: "smooth",
    });

  // Online class requirements — static + dynamic
  const onlineRequirements = [
    { icon: <FaWifi />, text: "স্থিতিশীল ইন্টারনেট সংযোগ (ন্যূনতম ৫ Mbps)" },
    { icon: <MdDevices />, text: "স্মার্টফোন, ট্যাবলেট বা কম্পিউটার" },
    { icon: <FaHeadphones />, text: "হেডফোন বা ইয়ারফোন ব্যবহার করুন" },
    { icon: <FaMicrophone />, text: "মাইক্রোফোন (লাইভ ক্লাসের জন্য)" },
    { icon: <FaRegCirclePlay />, text: "Zoom বা Google Meet ইনস্টল করুন" },
  ];

  const commonSections = (
    <div className="space-y-10">
      {/* What we offer */}
      <div>
        <h3 className="text-xl font-extrabold mb-3" style={{ color: BRAND }}>
          What We Offer
        </h3>
        <div
          className="border rounded-xl p-4 space-y-3"
          style={{ borderColor: BRAND_LIGHT }}
        >
          {[
            {
              icon: <MdOutlineSlowMotionVideo />,
              text: `${courseData?.videos?.length || 0} Videos`,
            },
            { icon: <TbLivePhoto />, text: "Regular live classes" },
            { icon: <PiExam />, text: "Quiz after completing all lectures" },
            { icon: <GoNote />, text: "Free certificate after completing" },
          ].map(({ icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-3 text-sm text-gray-700"
            >
              <span style={{ color: BRAND }}>{icon}</span> {text}
            </div>
          ))}
        </div>
      </div>

      {/* Course Details */}
      {courseData?.details && (
        <div>
          <h3 className="text-xl font-extrabold mb-3" style={{ color: BRAND }}>
            Course Details
          </h3>
          <article
            className="border rounded-xl p-4 text-sm text-gray-700 leading-relaxed prose max-w-none"
            style={{ borderColor: BRAND_LIGHT }}
          >
            {parse(courseData.details)}
          </article>
        </div>
      )}

      {/* Course Contents */}
      {courseData?.videos?.length > 0 && (
        <div>
          <h3 className="text-xl font-extrabold mb-3" style={{ color: BRAND }}>
            Course Contents
          </h3>
          <div
            className="border rounded-xl p-4 max-h-64 overflow-y-auto space-y-2"
            style={{ borderColor: BRAND_LIGHT }}
          >
            {courseData.videos.map((video, i) => (
              <div
                key={video?._id || i}
                className="flex items-center gap-2 text-sm text-gray-700"
              >
                <FaRegCirclePlay style={{ color: BRAND }} size={13} />
                {video?.videoTitle}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Online Class Requirements */}
      <div>
        <h3 className="text-xl font-extrabold mb-3" style={{ color: BRAND }}>
          অনলাইন ক্লাসের প্রয়োজনীয়তা
        </h3>
        <div
          className="border rounded-xl p-4 space-y-3"
          style={{ borderColor: BRAND_LIGHT }}
        >
          {onlineRequirements.map(({ icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-3 text-sm text-gray-700"
            >
              <span style={{ color: BRAND }}>{icon}</span> {text}
            </div>
          ))}
          {/* Dynamic requirements from DB */}
          {courseData?.requirements && (
            <div
              className="mt-3 pt-3 border-t text-sm text-gray-600"
              style={{ borderColor: BRAND_LIGHT }}
            >
              {courseData.requirements}
            </div>
          )}
        </div>
      </div>

      {/* Student Opinions */}
      {courseData?.studentsOpinion?.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-extrabold" style={{ color: BRAND }}>
              Students Opinion
            </h3>
            <div className="flex gap-2">
              {["left", "right"].map((dir, i) => (
                <button
                  key={dir}
                  onClick={() =>
                    scrollCarousel(
                      { current: document.getElementById("opinionsRef") },
                      dir,
                    )
                  }
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                  style={{ backgroundColor: BRAND }}
                >
                  {i === 0 ? (
                    <FaChevronLeft size={12} />
                  ) : (
                    <FaChevronRight size={12} />
                  )}
                </button>
              ))}
            </div>
          </div>
          <div
            id="opinionsRef"
            className="flex gap-4 overflow-x-auto pb-2 scrollbar-hidden"
          >
            {courseData.studentsOpinion.map((opinion, index) => (
              <div
                key={index}
                className="border rounded-xl py-4 px-5 w-72 shrink-0"
                style={{ borderColor: BRAND_LIGHT }}
              >
                <div className="flex gap-0.5 mb-2">
                  {[...Array(5)].map((_, i) =>
                    i < opinion.rating ? (
                      <FaStar key={i} className="text-yellow-400" size={13} />
                    ) : (
                      <FaRegStar key={i} size={13} className="text-gray-300" />
                    ),
                  )}
                </div>
                <p className="text-sm text-gray-600">{opinion.comments}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Review */}
      <div>
        <h3 className="text-xl font-extrabold mb-3" style={{ color: BRAND }}>
          Your Opinion
        </h3>
        <div className="flex gap-1 cursor-pointer mb-3">
          {[1, 2, 3, 4, 5].map((s) => (
            <div key={s} onClick={() => setRating(s)}>
              {rating >= s ? (
                <FaStar className="text-yellow-400" />
              ) : (
                <FaRegStar className="text-gray-300" />
              )}
            </div>
          ))}
        </div>
        <textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          className="w-full border-2 rounded-xl p-3 text-sm h-24 focus:outline-none resize-none"
          style={{ borderColor: BRAND_LIGHT }}
          placeholder="Share your experience..."
        />
        <div className="text-right mt-2">
          <button
            onClick={handleSubmitRating}
            className="px-6 py-2 rounded-xl text-sm font-bold text-white"
            style={{ backgroundColor: BRAND }}
          >
            Submit
          </button>
        </div>
      </div>

      {/* Related Courses */}
      {reletedCourses?.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-extrabold" style={{ color: BRAND }}>
              Related Courses
            </h3>
            <div className="flex gap-2">
              {["left", "right"].map((dir) => (
                <button
                  key={dir}
                  onClick={() => scrollCarousel(reletedCoursesCarouselRef, dir)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                  style={{ backgroundColor: BRAND }}
                >
                  {dir === "left" ? (
                    <FaChevronLeft size={12} />
                  ) : (
                    <FaChevronRight size={12} />
                  )}
                </button>
              ))}
            </div>
          </div>
          <div
            ref={reletedCoursesCarouselRef}
            className="flex gap-4 overflow-x-auto pb-2 scrollbar-hidden"
          >
            {reletedCourses.map((c) => (
              <Link
                key={c._id}
                to={`/singleCourse/${c._id}`}
                state={{ course: c }}
                className="shrink-0"
              >
                <img
                  src={c?.banner}
                  alt={c?.title}
                  className="w-28 h-28 rounded-xl object-cover border"
                  style={{ borderColor: BRAND_LIGHT }}
                />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // Loading state
  if (!courseData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div
          className="w-12 h-12 rounded-full border-4 border-t-transparent animate-spin"
          style={{ borderColor: BRAND, borderTopColor: "transparent" }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fafbff" }}>
      <Navbar />
      <div className="pt-[73px] pb-20">
        {/* Hero Banner */}
        <div
          className="relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${BRAND_DARK}, ${BRAND_MID})`,
          }}
        >
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
            style={{ backgroundColor: "#fff" }}
          />

          <div className="lg:w-3/4 w-11/12 mx-auto py-10">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Left */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col gap-4"
              >
                {courseData?.category && (
                  <span
                    className="inline-flex w-fit px-3 py-1 rounded-full text-xs font-bold text-white border border-white/20"
                    style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                  >
                    📚 {courseData.category}
                  </span>
                )}
                <h1 className="text-2xl md:text-4xl font-extrabold text-white leading-tight">
                  {courseData?.title}
                </h1>
                {courseData?.magnetLine && (
                  <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-lg">
                    {courseData.magnetLine}
                  </p>
                )}
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {renderStars(calculateAverageRating())}
                  </div>
                  <span className="text-white font-bold text-sm">
                    {calculateAverageRating()}
                  </span>
                  <span className="text-white/50 text-xs">
                    ({courseData?.studentsOpinion?.length || 0} ratings)
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mt-1">
                  {[
                    `🎬 ${courseData?.videos?.length || 0} Videos`,
                    "📡 Live Classes",
                    "📝 Quiz",
                    "🏆 Certificate",
                  ].map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 rounded-full text-xs font-semibold text-white border border-white/20"
                      style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
                {courseData?.syllabus && (
                  <div className="flex gap-3 flex-wrap mt-1">
                    <button
                      onClick={() => downloadFiteAtURL(courseData.syllabus)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white border border-white/20 hover:bg-white/10 transition"
                    >
                      <IoMdDownload /> Syllabus
                    </button>
                  </div>
                )}
              </motion.div>

              {/* Right — Banner image */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="relative hidden lg:block"
              >
                <div
                  className="absolute inset-0 rounded-2xl blur-xl opacity-30"
                  style={{ backgroundColor: BRAND }}
                />
                <img
                  src={courseData?.banner}
                  alt={courseData?.title}
                  className="relative z-10 w-full rounded-2xl shadow-2xl object-cover"
                  style={{ maxHeight: 280 }}
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="lg:w-3/4 w-11/12 mx-auto mt-10">
          <div className="grid lg:grid-cols-7 grid-cols-1 gap-8">
            <div className="col-span-5">{commonSections}</div>
            <div className="lg:col-span-2 col-span-5 lg:sticky lg:top-24 h-fit">
              <CoursePayment course={courseData} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SingleCourse;
