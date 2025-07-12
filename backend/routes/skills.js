import express from "express";
import User from "../models/User.js";

const router = express.Router();

// GET /skills - Fetch all unique skills from all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, "skills");
    // Flatten all skills into a single array
    const allSkills = users.flatMap(user => user.skills || []);
    // Get unique skills
    const uniqueSkills = [...new Set(allSkills)];
    res.json({ skills: uniqueSkills });
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
});

export default router;
