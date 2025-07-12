import express from "express";
import User from "../models/User.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Get current user's profile
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update current user's profile
router.put("/me", auth, async (req, res) => {
  try {
    const updates = req.body;
    console.log('PROFILE UPDATE FIELDS:', updates);
    // Prevent email/password changes here for security
    delete updates.email;
    delete updates.password;
    // Ensure bio and availability are always present
    if (typeof updates.bio === "undefined") updates.bio = "";
    if (typeof updates.availability === "undefined") updates.availability = "";
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");
    console.log('UPDATED USER:', user);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get public profile by user ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.privateAccount) return res.status(403).json({ message: "This profile is private" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get users for skill swap (match skillsWanted with skills)
router.get("/swap/match", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    // Find users who can teach any skill user wants
    const matches = await User.find({
      skills: { $in: user.skillsWanted },
      skillsWanted: { $in: user.skills },
      _id: { $ne: user._id },
      privateAccount: false
    }).select("-password");
    res.json(matches);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Rate a user (POST /api/profile/:id/rate)
router.post("/:id/rate", auth, async (req, res) => {
  try {
    const { rating } = req.body;
    const userId = req.params.id;
    // Prevent self-rating
    if (req.user.userId === userId) {
      return res.status(400).json({ message: "You cannot rate yourself." });
    }
    if (typeof rating !== "number" || rating < 0 || rating > 5) {
      return res.status(400).json({ message: "Rating must be a number between 0 and 5." });
    }
    // For simplicity, just set the rating (replace with averaging or more logic if needed)
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { rating } },
      { new: true, runValidators: true }
    ).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User rated successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
