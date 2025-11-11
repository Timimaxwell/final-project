const mongoose = require("mongoose")

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    company: { type: String, required: true },
    location: String,
    salary: Number,
    type: {
      type: String,
      enum: ["full-time", "part-time", "contract", "freelance"],
      default: "full-time",
    },
    category: {
      type: String,
      enum: ["solar-technician", "engineer", "installer", "consultant", "other"],
    },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: { type: String, enum: ["open", "closed"], default: "open" },
  },
  { timestamps: true }
)

// Combined & efficient indexes
jobSchema.index({ postedBy: 1, category: 1, status: 1, createdAt: -1 })
jobSchema.index({ title: "text", description: "text" }) // full-text search

module.exports = mongoose.model("Job", jobSchema)
