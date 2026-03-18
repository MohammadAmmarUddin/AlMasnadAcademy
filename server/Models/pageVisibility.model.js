// models/pageVisibility.model.js
const mongoose = require("mongoose");

const pageVisibilitySchema = new mongoose.Schema(
  {
    sections: {
      BreakingNews: { type: Boolean, default: true },
      UpdateBanner: { type: Boolean, default: true },
      VideoSection: { type: Boolean, default: true },
      PopularCourses: { type: Boolean, default: true },
      StudentGallery: { type: Boolean, default: true },
      PagriGallery: { type: Boolean, default: true },
      VortiCholche: { type: Boolean, default: true },
      StudentReview: { type: Boolean, default: true },
    },
  },
  { timestamps: true },
);
const PageVisibility = mongoose.model("PageVisibility", pageVisibilitySchema);
module.exports = PageVisibility;
