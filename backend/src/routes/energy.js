const express = require("express")
const router = express.Router()
const { verifyToken } = require("../middleware/auth")
const EnergyReading = require("../models/EnergyReading")

// Get all energy readings for a user
router.get("/user/:userId", verifyToken, async (req, res) => {
  try {
    const { userId } = req.params
    const readings = await EnergyReading.find({ userId }).sort({ timestamp: -1 })
    res.json(readings)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get single energy reading
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const reading = await EnergyReading.findById(req.params.id)
    if (!reading) {
      return res.status(404).json({ error: "Energy reading not found" })
    }
    res.json(reading)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create new energy reading
router.post("/", verifyToken, async (req, res) => {
  try {
    const { usage, source, cost, carbonFootprint } = req.body

    if (!usage || usage <= 0) {
      return res.status(400).json({ error: "Usage must be greater than 0" })
    }

    const reading = new EnergyReading({
      userId: req.user._id,
      usage,
      source: source || "manual",
      cost: cost || 0,
      carbonFootprint: carbonFootprint || usage * 0.233,
    })

    const savedReading = await reading.save()
    res.status(201).json(savedReading)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update energy reading
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const { usage, source, cost, carbonFootprint } = req.body

    const reading = await EnergyReading.findByIdAndUpdate(
      req.params.id,
      { usage, source, cost, carbonFootprint },
      { new: true, runValidators: true },
    )

    if (!reading) {
      return res.status(404).json({ error: "Energy reading not found" })
    }

    res.json(reading)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Delete energy reading
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const reading = await EnergyReading.findByIdAndDelete(req.params.id)

    if (!reading) {
      return res.status(404).json({ error: "Energy reading not found" })
    }

    res.json({ message: "Energy reading deleted successfully", reading })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
