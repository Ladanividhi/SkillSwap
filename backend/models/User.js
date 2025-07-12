import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: { type: String },
  role: { type: String, default: "user" },
  privateAccount: { type: Boolean, default: false },
  bio: { type: String, default: "" },               // User bio
  availability: { type: String, default: "" },      // User availability
  rating: { type: Number, default: 0 },              // User rating
  skills: { type: [String], default: [] },           // Skills user can teach
  skillsWanted: { type: [String], default: [] },     // Skills user wants to learn/swap
}, { timestamps: true });

export default mongoose.model("User", userSchema);
