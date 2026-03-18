import Bkash from "./Bkash";

const BRAND = "#0b148f";
const BRAND_BG = "#eef0fd";
const BRAND_BORDER = "#0b148f";

const AdmissionHelp = () => {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 text-center">
      {/* Main Title */}
      <h2 className="text-3xl md:text-4xl font-extrabold mb-8 leading-snug" style={{ color: BRAND }}>
        📌 <span>ভর্তি প্রক্রিয়া</span>
      </h2>

      {/* Instructions Section */}
      <div className="space-y-6 text-gray-700">
        {/* Step 1 */}
        <div>
          <h3 className="text-xl font-semibold mb-2" style={{ color: BRAND }}>
            ✅ কিভাবে ফি প্রদান করবেন?
          </h3>
          <p className="text-base md:text-lg leading-relaxed">
            ভর্তি হতে চাইলে আগে নির্ধারিত পেমেন্ট মাধ্যমের মাধ্যমে ফি প্রদান
            করতে হবে।
          </p>
        </div>

        {/* Bangladesh */}
        <div
          className="p-4 rounded text-left md:text-center border-l-4"
          style={{ backgroundColor: BRAND_BG, borderColor: BRAND_BORDER }}
        >
          <p className="text-lg font-bold mb-2" style={{ color: BRAND }}>
            🇧🇩 বাংলাদেশের শিক্ষার্থীদের জন্য
          </p>
          <p className="text-base">
            বিকাশ / নগদ এর মাধ্যমে পেমেন্ট করে, পেমেন্টের পর নিচের নাম্বারে তথ্য
            পাঠাতে হবে।
          </p>
        </div>

        {/* India */}
        <div
          className="p-4 rounded text-left md:text-center border-l-4"
          style={{ backgroundColor: "#f0f4ff", borderColor: "#3b56d9" }}
        >
          <p className="text-lg font-bold mb-2" style={{ color: "#3b56d9" }}>
            🇮🇳 ভারতের শিক্ষার্থীদের জন্য
          </p>
          <p className="text-base">
            গুগল পে / ফোন পে এর মাধ্যমে পেমেন্ট করে, পেমেন্টের পর একইভাবে তথ্য
            পাঠাতে হবে।
          </p>
        </div>

        {/* Info after payment */}
        <div>
          <h3 className="text-xl font-semibold mb-3" style={{ color: BRAND }}>
            📲 পেমেন্টের পর যে তথ্যগুলো পাঠাতে হবে
          </h3>
          <ul className="list-decimal list-inside space-y-1 text-left md:text-center mx-auto inline-block text-base">
            <li>যে নাম্বার থেকে টাকা পাঠিয়েছেন সেটি</li>
            <li>পেমেন্ট আইডি / ট্রান্সেকশন নাম্বার</li>
            <li>বাঙ্গালদেশিদের জন্য ১৫০০ টাকা</li>
            <li>ভারতীয়দের জন্য ১২০০ রুপি</li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-10" style={{ borderColor: BRAND_BG }} />

      {/* Payment Form */}
      <Bkash />
    </div>
  );
};

export default AdmissionHelp;