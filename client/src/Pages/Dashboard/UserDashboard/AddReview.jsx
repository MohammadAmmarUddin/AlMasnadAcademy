import Swal from "sweetalert2";
import useAuthContext from "../../../hooks/useAuthContext";
import { useState } from "react";
import axios from "axios";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const BRAND = "#0b148f";
const BRAND_DARK = "#090f6e";
const BRAND_LIGHT = "#eef0fd";
const BRAND_MID = "#1a2ba6";

const ratingLabel = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

const AddReview = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();
  const baseUrl = import.meta.env.VITE_almasnad_baseUrl;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      Swal.fire({
        icon: "warning",
        title: "Rating required",
        text: "Please select a star rating before submitting.",
        confirmButtonColor: BRAND,
      });
      return;
    }

    const name = user?.displayName || user?.user?.firstname || "Anonymous";
    const image = user?.photoURL || user?.user?.img || "";
    const data = { name, image, rating, comment };

    setLoading(true);
    try {
      const res = await axios.post(`${baseUrl}/api/review/create`, data);

      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Review submitted! ✅",
          showConfirmButton: false,
          timer: 1500,
        });
        setRating(0);
        setComment("");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to submit",
        text: "Something went wrong. Please try again.",
        confirmButtonColor: BRAND,
      });
      console.log(error);
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
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
      >
        {/* Header */}
        <div
          className="px-8 py-6 text-center"
          style={{
            background: `linear-gradient(135deg, ${BRAND_DARK}, ${BRAND_MID})`,
          }}
        >
          <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3">
            <FaStar className="text-yellow-400 text-2xl" />
          </div>
          <h2 className="text-2xl font-extrabold text-white">Rate Us!</h2>
          <p className="text-white/60 text-sm mt-1">
            Your feedback means everything to us
          </p>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Star Rating */}
            <div className="flex flex-col items-center gap-2">
              <Rating
                style={{ maxWidth: 220 }}
                value={rating}
                onChange={setRating}
              />
              {rating > 0 ? (
                <motion.span
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm font-semibold px-3 py-1 rounded-full"
                  style={{ backgroundColor: BRAND_LIGHT, color: BRAND }}
                >
                  {ratingLabel[rating]}
                </motion.span>
              ) : (
                <p className="text-xs text-gray-400">
                  Click to select a rating
                </p>
              )}
            </div>

            {/* Comment */}
            <div>
              <label
                className="block mb-2 text-sm font-semibold"
                style={{ color: BRAND }}
              >
                Comment{" "}
                <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience..."
                rows={4}
                className="w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all duration-300 resize-none"
                style={{
                  borderColor: comment ? BRAND : "#e5e7eb",
                  boxShadow: comment ? `0 0 0 3px ${BRAND_LIGHT}` : "none",
                }}
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: rating > 0 ? 1.02 : 1 }}
              whileTap={{ scale: rating > 0 ? 0.97 : 1 }}
              disabled={rating === 0 || loading}
              className="w-full text-white py-3 rounded-xl font-semibold shadow-md transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: BRAND }}
              onMouseEnter={(e) => {
                if (rating > 0)
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
              ) : rating === 0 ? (
                "⭐ Select a rating first"
              ) : (
                "Submit Review →"
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AddReview;
