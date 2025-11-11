const mongoose = require("mongoose")

const energyReadingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    usage: {
      type: Number,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    source: {
      type: String,
      enum: ["manual", "meter", "api"],
      default: "manual",
    },
    cost: Number,
    carbonFootprint: Number,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
)

// Add an index (compound index)
energyReadingSchema.index({ userId: 1, createdAt: -1 })

module.exports = mongoose.model("EnergyReading", energyReadingSchema)
