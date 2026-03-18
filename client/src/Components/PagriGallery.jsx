import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import GalleryCard from "./GalleryCard";
import { motion } from "framer-motion";

const BRAND       = "#0b148f";
const BRAND_LIGHT = "#eef0fd";
const BRAND_MID   = "#1a2ba6";

const PagriGallery = () => {
  const [galleryData, setGalleryData] = useState([]);

  useEffect(() => {
    fetch("/Pagri.json")
      .then((res) => res.json())
      .then((data) => setGalleryData(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="py-16 relative overflow-hidden" style={{ backgroundColor: "#f8f9ff" }}>

      {/* BG blobs */}
      <div
        className="absolute top-0 left-0 w-72 h-72 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${BRAND}, transparent)` }}
      />
      <div
        className="absolute bottom-0 right-0 w-56 h-56 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${BRAND_MID}, transparent)` }}
      />

      <div className="lg:w-3/4 w-11/12 mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span
            className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-3"
            style={{ backgroundColor: BRAND_LIGHT, color: BRAND }}
          >
            🎓 Graduation Ceremony
          </span>
          <h2
            className="text-2xl md:text-4xl font-extrabold"
            style={{ color: BRAND }}
          >
            Faregin Gallery
          </h2>
          <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
            Celebrating our graduates and their journey of Quranic excellence
          </p>
        </motion.div>

        {/* Empty state */}
        {galleryData.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-12 text-gray-400">
            <span className="text-4xl">🎓</span>
            <p className="text-sm font-medium">No gallery images yet.</p>
          </div>
        )}

        {/* Swiper */}
        {galleryData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Swiper
              navigation={true}
              loop={galleryData.length >= 3}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              modules={[Navigation, Autoplay]}
              breakpoints={{
                640:  { slidesPerView: 1, spaceBetween: 20 },
                768:  { slidesPerView: 2, spaceBetween: 24 },
                1024: { slidesPerView: 3, spaceBetween: 32 },
              }}
              className="mySwiper"
            >
              {galleryData.map((item, index) => (
                <SwiperSlide key={index}>
                  <GalleryCard image={item.image} name={item.name} />
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        )}

        {/* Bottom accent */}
        <div
          className="w-14 h-1 rounded-full mx-auto mt-10"
          style={{ background: `linear-gradient(to right, ${BRAND}, #3b56d9)` }}
        />
      </div>
    </div>
  );
};

export default PagriGallery;