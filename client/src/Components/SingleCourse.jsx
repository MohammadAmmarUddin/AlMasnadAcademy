import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import { IoMdDownload } from "react-icons/io";
import {
  FaChevronLeft,
  FaChevronRight,
  FaLock,
  FaRegStar,
  FaStar,
  FaStarHalfAlt,
  FaWhatsapp,
  FaMobileAlt,
  FaCheckCircle,
  FaCopy,
  FaBitcoin,
} from "react-icons/fa";
import { PiExam } from "react-icons/pi";
import Navbar from "./Navbar";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import { GoNote } from "react-icons/go";
import { TbCurrencyTaka, TbLivePhoto } from "react-icons/tb";
import Footer from "./Footer";
import { FaRegCirclePlay } from "react-icons/fa6";
import useAuthContext from "../hooks/useAuthContext";
import Swal from "sweetalert2";
import parse from "html-react-parser";
import { motion, AnimatePresence } from "framer-motion";

const BRAND = "#0b148f";
const BRAND_DARK = "#090f6e";
const BRAND_LIGHT = "#eef0fd";
const BRAND_MID = "#1a2ba6";
const WHATSAPP_BD = "8801883128299";
const WHATSAPP_IN = "919365262648";
const BKASH_NUMBER = "01883128299";
const NAGAD_NUMBER = "01883128299";

// ─── CoursePayment ───────────────────────────────────────
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
✅ অনুগ্রহ করে আমার ভর্তি নিশ্চিত করুন।
  `.trim(),
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
  const courseId = id;
  const { user } = useAuthContext();
  const [courseData, setCourseData] = useState(null);
  const [reletedCourses, setreletedCourses] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isAdminOrStudent, setIsAdminOrStudent] = useState(false);
  const [rating, setRating] = useState(null);
  const [comments, setComments] = useState("");
  const [unlockedVideos, setUnlockedVideos] = useState(1);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [courseComplete, setCourseComplete] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizzes, setQuizzes] = useState([]);
  const [quizComplete, setQuizComplete] = useState(false);
  const userId = user?.user?._id;

  const studentsOpinionCarouselRef = useRef(null);
  const reletedCoursesCarouselRef = useRef(null);

  const baseUrl = import.meta.env.VITE_MAHAD_baseUrl; // ✅ fixed

  const discountAmount =
    courseData?.price && courseData?.discount
      ? (parseInt(courseData.price) * parseInt(courseData.discount)) / 100
      : 0;
  const finalPrice = courseData?.price
    ? parseInt(courseData.price) - discountAmount
    : null;

  useEffect(() => {
    if (courseData && courseData.students && userId) {
      const currentStudent = courseData.students.find(
        (s) => s.studentsId === userId,
      );
      if (currentStudent) {
        setIsAdminOrStudent(true);
        setUnlockedVideos(currentStudent.unlockedVideo || 1);
        setCourseComplete(
          currentStudent.unlockedVideo === courseData.videos.length,
        );
      } else {
        setIsAdminOrStudent(false);
        setUnlockedVideos(1);
      }
    }
  }, [courseData, userId]);

  const courseCompleteAction = async () => {
    try {
      const res = await fetch(
        `${baseUrl}/api/course/completeCourse/${userId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ _id: courseData._id }),
        },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed");
      Swal.fire({
        title: "Congratulations!",
        text: "You have completed the course!",
        icon: "success",
        confirmButtonColor: BRAND,
      });
      setCourseComplete(true);
      fetchSingleCourse();
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        confirmButtonColor: BRAND,
      });
    }
  };

  const downloadFiteAtURL = (url) => {
    const aTag = document.createElement("a");
    aTag.href = url;
    aTag.setAttribute("download", url?.split("/").pop().split("?")[0]);
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
  };

  const unlockNextVideo = async () => {
    if (unlockedVideos < courseData.videos.length) {
      const res = await fetch(`${baseUrl}/api/course/unlockVideo/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: courseData._id }),
      });
      if (res.ok) {
        const next = unlockedVideos + 1;
        setUnlockedVideos(next);
        if (next === courseData.videos.length) setCourseComplete(true);
      }
    }
  };

  const handleSubmitRating = async () => {
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
      if (!res.ok) {
        const data = await res.json();
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
        fetchSingleCourse();
      }
    } catch {}
  };

  const fetchSingleCourse = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/course/getSingleCourse/${id}`);
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setCourseData(data);
      setSelectedVideo(data.videos[0]);
      setQuizzes(data.quiz?.map((q) => ({ ...q, selectedAnswer: null })) || []);
    } catch {}
  };

  const fetchreletedCourses = () => {
    fetch(`${baseUrl}/api/course/getAllCourses`)
      .then((r) => r.json())
      .then((data) => {
        const keywords = courseData?.keywords?.map((k) =>
          k?.toLowerCase().trim(),
        );
        setreletedCourses(
          data?.filter((c) =>
            c?.keywords?.some((k) =>
              keywords?.includes(k?.toLowerCase().trim()),
            ),
          ),
        );
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchSingleCourse();
    fetch(`${baseUrl}/api/user/allUsers`)
      .then((r) => r.json())
      .then(setAllUsers)
      .catch(() => {});
  }, [id]);
  useEffect(() => {
    if (courseData?.videos && !selectedVideo)
      setSelectedVideo(courseData.videos[0]);
    if (courseData?.keywords) fetchreletedCourses();
  }, [courseData]);

  const handleVideoSelect = (video, index) => {
    if (!showQuiz) {
      setSelectedVideo(video);
      setCurrentVideoIndex(index);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const scrollCarousel = (ref, dir) =>
    ref.current?.scrollBy({
      left: dir === "left" ? -200 : 200,
      behavior: "smooth",
    });

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

  const handleQuizChange = (qi, val) => {
    const updated = [...quizzes];
    updated[qi].selectedAnswer = val;
    setQuizzes(updated);
  };

  const handleQuizSubmit = () => {
    let s = 0;
    quizzes.forEach((q) => {
      if (q.selectedAnswer === q.ans.toString()) s++;
    });
    setScore(s);
    setQuizSubmitted(true);
    setUnlockedVideos(courseData.videos.length);
    const saved = [...quizzes];
    quizCompleteAction(s).then(() => setQuizzes(saved));
  };

  const quizCompleteAction = async (newScore) => {
    const pct = (newScore * 100) / quizzes.length;
    if (pct < 40) {
      Swal.fire({
        title: "Error",
        text: `You got ${pct}%. Need at least 40%.`,
        icon: "error",
        confirmButtonColor: BRAND,
      });
      return;
    }
    try {
      const res = await fetch(`${baseUrl}/api/course/completeQuiz/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: courseData._id,
          quizMarks: newScore,
          quizMarksPercentage: pct,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setQuizComplete(true);
      Swal.fire({
        title: "Congratulations!",
        text: `You got ${pct}%!`,
        icon: "success",
        confirmButtonColor: BRAND,
      });
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: err.message,
        icon: "error",
        confirmButtonColor: BRAND,
      });
    }
  };

  // ── Video list sidebar (reused in desktop + mobile)
  const VideoList = () => (
    <div
      className="border rounded-xl h-[600px] relative overflow-hidden"
      style={{ borderColor: BRAND_LIGHT }}
    >
      <div className="overflow-y-auto h-[calc(100%-60px)]">
        {courseData?.videos?.map((video, index) => (
          <p
            key={video?._id}
            onClick={() =>
              !showQuiz &&
              index < unlockedVideos &&
              handleVideoSelect(video, index)
            }
            className={`m-3 p-2 rounded-xl border text-sm flex items-center gap-2 transition-all duration-200 ${
              showQuiz
                ? "text-gray-400 cursor-not-allowed"
                : selectedVideo?._id === video._id
                  ? "text-white font-semibold cursor-pointer"
                  : index < unlockedVideos
                    ? "text-gray-700 cursor-pointer hover:bg-gray-50"
                    : "text-gray-400 cursor-not-allowed"
            }`}
            style={
              selectedVideo?._id === video._id
                ? { backgroundColor: BRAND, borderColor: BRAND }
                : { borderColor: "#f0f0f8" }
            }
          >
            {index < unlockedVideos ? (
              <span className="text-xs opacity-60">{index + 1}.</span>
            ) : (
              <FaLock size={10} />
            )}
            <span className="truncate">{video?.videoTitle}</span>
          </p>
        ))}
        {courseData?.videos?.length > 0 && (
          <div
            className="flex justify-between items-center m-3 p-2 rounded-xl border"
            style={{ borderColor: BRAND_LIGHT }}
          >
            <p
              className={`text-sm font-medium ${courseComplete ? "text-gray-700" : "text-gray-400"}`}
            >
              Quiz
            </p>
            <button
              onClick={
                courseComplete
                  ? () => {
                      setShowQuiz(true);
                      setSelectedVideo(null);
                    }
                  : undefined
              }
              disabled={!courseComplete}
              className="text-xs px-3 py-1 rounded-lg font-bold text-white disabled:opacity-40"
              style={{ backgroundColor: courseComplete ? BRAND : "#9ca3af" }}
            >
              Open
            </button>
          </div>
        )}
      </div>
      {/* Prev/Next */}
      <div
        className="absolute bottom-0 left-0 right-0 p-3 flex justify-between border-t"
        style={{ borderColor: BRAND_LIGHT }}
      >
        <button
          onClick={() =>
            currentVideoIndex > 0 &&
            handleVideoSelect(
              courseData.videos[currentVideoIndex - 1],
              currentVideoIndex - 1,
            )
          }
          disabled={currentVideoIndex === 0}
          className="px-4 py-1.5 rounded-lg text-sm font-semibold text-white disabled:opacity-40"
          style={{ backgroundColor: BRAND }}
        >
          ← Prev
        </button>
        <button
          onClick={() => {
            if (currentVideoIndex < courseData.videos.length - 1) {
              if (currentVideoIndex + 1 < unlockedVideos) {
                handleVideoSelect(
                  courseData.videos[currentVideoIndex + 1],
                  currentVideoIndex + 1,
                );
              } else {
                unlockNextVideo().then(() =>
                  handleVideoSelect(
                    courseData.videos[currentVideoIndex + 1],
                    currentVideoIndex + 1,
                  ),
                );
              }
            }
          }}
          disabled={currentVideoIndex === courseData?.videos?.length - 1}
          className="px-4 py-1.5 rounded-lg text-sm font-semibold text-white disabled:opacity-40"
          style={{ backgroundColor: BRAND }}
        >
          Next →
        </button>
      </div>
    </div>
  );

  const renderQuizContent = () => (
    <div
      className="rounded-2xl border p-6 w-full"
      style={{ borderColor: BRAND_LIGHT }}
    >
      <h1
        className="text-2xl font-extrabold mb-6 text-center"
        style={{ color: BRAND }}
      >
        📝 Quiz
      </h1>
      {quizzes.map((quiz, qi) => (
        <div
          key={quiz.id}
          className="mb-6 bg-white border rounded-xl p-5"
          style={{ borderColor: BRAND_LIGHT }}
        >
          <p className="font-bold text-sm mb-3" style={{ color: BRAND }}>
            {qi + 1}. {quiz.ques}
          </p>
          <div className="space-y-2">
            {quiz.options.map((opt, oi) => (
              <div key={oi} className="flex items-center gap-2">
                <input
                  type="radio"
                  id={`q${qi}-o${oi}`}
                  name={`q${qi}`}
                  value={oi.toString()}
                  checked={quiz.selectedAnswer === oi.toString()}
                  onChange={(e) => handleQuizChange(qi, e.target.value)}
                  disabled={quizSubmitted}
                  className="accent-[#0b148f]"
                />
                <label
                  htmlFor={`q${qi}-o${oi}`}
                  className={`text-sm ${
                    quizSubmitted
                      ? oi.toString() === quiz.ans.toString()
                        ? "text-green-600 font-bold"
                        : quiz.selectedAnswer === oi.toString()
                          ? "text-red-500 font-bold"
                          : "text-gray-600"
                      : "text-gray-700"
                  }`}
                >
                  {opt}
                </label>
                {quizSubmitted && oi.toString() === quiz.ans.toString() && (
                  <span className="text-green-600 text-xs">✓</span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      {!quizSubmitted ? (
        <button
          onClick={handleQuizSubmit}
          className="w-full py-3 rounded-xl font-bold text-white"
          style={{ backgroundColor: BRAND }}
        >
          Submit Quiz
        </button>
      ) : (
        <div className="text-center mt-4">
          <p className="text-xl font-extrabold" style={{ color: BRAND }}>
            Score: {score}/{quizzes.length}
          </p>
          <button
            onClick={() => {
              setShowQuiz(false);
              setSelectedVideo(courseData.videos[0]);
            }}
            className="mt-4 w-full py-3 rounded-xl font-bold text-white"
            style={{ backgroundColor: BRAND }}
          >
            ← Return to Videos
          </button>
        </div>
      )}
    </div>
  );

  const renderStudentOpinions = () => {
    if (!courseData?.studentsOpinion?.length)
      return (
        <div className="w-full h-40 flex items-center justify-center">
          <p className="text-gray-400">No review yet</p>
        </div>
      );
    return courseData.studentsOpinion.map((opinion, index) => {
      const reviewer = allUsers.find((u) => u._id === opinion.reviewerId);
      return (
        <div
          key={index}
          className="border rounded-xl py-4 px-5 w-[340px] shrink-0"
          style={{ borderColor: BRAND_LIGHT }}
        >
          <div className="flex gap-3 items-center mb-3">
            <img
              className="w-12 h-12 rounded-full object-cover border-2"
              src={reviewer?.img}
              alt=""
              style={{ borderColor: BRAND_LIGHT }}
            />
            <div>
              <p className="font-bold text-sm">
                {reviewer?.firstname} {reviewer?.lastname}
              </p>
              <p className="text-xs text-gray-400">Student</p>
            </div>
          </div>
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
      );
    });
  };

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
              text: `${courseData?.videos?.length} Videos`,
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

      {/* Instructors */}
      <div>
        <h3 className="text-xl font-extrabold mb-3" style={{ color: BRAND }}>
          Course Instructors
        </h3>
        <div
          className="border rounded-xl p-4 space-y-4"
          style={{ borderColor: BRAND_LIGHT }}
        >
          {courseData?.instructorsId?.map((instructorId, i) => {
            const inst = allUsers.find((u) => u._id === instructorId);
            return (
              <div key={i} className="flex gap-3 items-center">
                <img
                  className="w-14 h-14 rounded-full object-cover border-2"
                  src={inst?.img}
                  alt=""
                  style={{ borderColor: BRAND_LIGHT }}
                />
                <div>
                  <p className="font-bold text-sm">
                    {inst?.firstname} {inst?.lastname}
                  </p>
                  <p className="text-xs text-gray-400">
                    {inst?.profession?.[0]?.position || "Instructor"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Course Details */}
      <div>
        <h3 className="text-xl font-extrabold mb-3" style={{ color: BRAND }}>
          Course Details
        </h3>
        <article
          className="border rounded-xl p-4 text-sm text-gray-700 leading-relaxed prose max-w-none"
          style={{ borderColor: BRAND_LIGHT }}
        >
          {parse(courseData?.details || "No course details available.")}
        </article>
      </div>

      {/* Contents */}
      <div>
        <h3 className="text-xl font-extrabold mb-3" style={{ color: BRAND }}>
          Course Contents
        </h3>
        <div
          className="border rounded-xl p-4 max-h-64 overflow-y-auto space-y-2"
          style={{ borderColor: BRAND_LIGHT }}
        >
          {courseData?.videos?.map((video) => (
            <div
              key={video?._id}
              className="flex items-center gap-2 text-sm text-gray-700"
            >
              <FaRegCirclePlay style={{ color: BRAND }} size={13} />{" "}
              {video?.videoTitle}
            </div>
          ))}
        </div>
      </div>

      {/* Requirements */}
      <div>
        <h3 className="text-xl font-extrabold mb-3" style={{ color: BRAND }}>
          Course Requirements
        </h3>
        <div
          className="border rounded-xl p-4 text-sm text-gray-600"
          style={{ borderColor: BRAND_LIGHT }}
        >
          {courseData?.requirements}
        </div>
      </div>

      {/* Rating */}
      {isAdminOrStudent && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-extrabold" style={{ color: BRAND }}>
              Your Opinion
            </h3>
            <div className="flex gap-1 cursor-pointer">
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
          </div>
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="w-full border-2 rounded-xl p-3 text-sm h-28 focus:outline-none resize-none"
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
      )}

      {/* Student Opinions */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-extrabold" style={{ color: BRAND }}>
            Students Opinion
          </h3>
          <div className="flex gap-2">
            {[
              ["left", studentsOpinionCarouselRef],
              ["right", studentsOpinionCarouselRef],
            ].map(([dir, ref], i) => (
              <button
                key={i}
                onClick={() => scrollCarousel(ref, dir)}
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
          ref={studentsOpinionCarouselRef}
          className="flex gap-4 overflow-x-auto pb-2 scrollbar-hidden"
        >
          <>{renderStudentOpinions()}</>
        </div>
      </div>

      {/* Related Courses */}
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
          {reletedCourses?.map((c) => (
            <Link
              key={c._id}
              to={`/singleCourse/${c._id}`}
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
    </div>
  );

  // ── Header bar (shared)
  const HeaderBar = ({ showJoinGroup = false }) => (
    <div
      className="px-6 py-6 mb-8"
      style={{
        background: `linear-gradient(135deg, ${BRAND_DARK}, ${BRAND_MID})`,
      }}
    >
      <div className="lg:w-3/4 w-11/12 mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl md:text-3xl font-extrabold text-white">
            {courseData?.title}
          </h3>
          <div className="flex gap-1 mt-2 items-center">
            {renderStars(calculateAverageRating())}
            <p className="ml-2 text-white/60 text-sm">
              {courseData?.studentsOpinion?.length || 0} Ratings
            </p>
          </div>
          {courseData?.magnetLine && (
            <p className="text-white/70 text-sm mt-2 max-w-lg">
              {courseData.magnetLine}
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {(user?.user?.role === "admin" ||
            courseData?.instructorsId?.includes(userId)) && (
            <Link
              to={`/dashboard/admin/schedulemeet?${courseId}`}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm px-4 py-2 rounded-xl transition border border-white/20"
            >
              Create Meet
            </Link>
          )}
          <button
            onClick={() => downloadFiteAtURL(courseData?.syllabus)}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm px-4 py-2 rounded-xl transition border border-white/20"
          >
            <IoMdDownload /> Syllabus
          </button>
          {showJoinGroup && (
            <Link
              to={courseData?.whatsappGroupLink}
              target="_blank"
              className="flex items-center gap-2 bg-[#25d366] hover:bg-[#1fb855] text-white text-sm px-4 py-2 rounded-xl transition"
            >
              <FaWhatsapp /> Join Group
            </Link>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {/* ── Not enrolled ── */}
      {!isAdminOrStudent && (
        <div>
          <Navbar />
          <div className="pt-[73px] pb-20">
            <HeaderBar />
            <div className="lg:w-3/4 w-11/12 mx-auto">
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
      )}

      {/* ── Enrolled student / admin ── */}
      {isAdminOrStudent && (
        <div className="lg:flex block">
          <div className="lg:fixed top-0 z-10">
            <Sidebar />
          </div>
          <div className="lg:pl-72 pl-0 w-full">
            <HeaderBar showJoinGroup />
            <div className="lg:w-full w-11/12 mx-auto px-4 pb-20">
              <div className="grid lg:grid-cols-7 grid-cols-1 gap-6">
                <div className="col-span-5">
                  {showQuiz ? (
                    renderQuizContent()
                  ) : (
                    <video
                      className="w-full rounded-2xl border"
                      style={{ height: 480, borderColor: BRAND_LIGHT }}
                      src={selectedVideo?.videoLink}
                      controls
                    />
                  )}
                  {/* Mobile video list */}
                  <div className="lg:hidden mt-4">
                    <VideoList />
                  </div>
                  {courseComplete && quizComplete && (
                    <div className="mt-4">
                      <button
                        onClick={courseCompleteAction}
                        className="w-full py-3 rounded-xl font-bold text-white"
                        style={{ backgroundColor: BRAND }}
                      >
                        🎓 Complete Course
                      </button>
                    </div>
                  )}
                  <div className="mt-10">{commonSections}</div>
                </div>
                {/* Desktop video list */}
                <div className="col-span-2 hidden lg:block sticky top-6 h-fit">
                  <VideoList />
                  {courseComplete && quizComplete && (
                    <button
                      onClick={courseCompleteAction}
                      className="w-full py-3 rounded-xl font-bold text-white mt-4"
                      style={{ backgroundColor: BRAND }}
                    >
                      🎓 Complete Course
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleCourse;
