const mongoose = require("mongoose")

const providerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: String,
    businessType: {
      type: String,
      enum: ["solar", "wind", "biogas", "grid", "hybrid"],
    },
    description: String,
    rating: { type: Number, default: 0 },
    location: String,
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
)

// Combined & optimized indexes
providerSchema.index({ businessType: 1, verified: 1, rating: -1, createdAt: -1 })
providerSchema.index({ name: "text", description: "text", location: "text" })

module.exports = mongoose.model("Provider", providerSchema)
