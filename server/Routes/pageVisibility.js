// routes/pageVisibility.route.js
const express = require("express");
const PageVisibility = require("../Models/pageVisibility.model.js");

const router = express.Router();

// GET — fetch current visibility
router.get("/", async (req, res) => {
  try {
    let config = await PageVisibility.findOne();
    if (!config) {
      config = await PageVisibility.create({});
    }
    res.json(config.sections);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH — update one section toggle
router.patch("/", async (req, res) => {
  try {
    const { section, value } = req.body;
    let config = await PageVisibility.findOne();
    if (!config) config = await PageVisibility.create({});

    config.sections[section] = value;
    config.markModified("sections");
    await config.save();

    res.json({ success: true, sections: config.sections });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
