const express = require("express")
const router = express.Router()
const { verifyToken } = require("../middleware/auth")
const EnergyReading = require("../models/EnergyReading")

// Get analytics dashboard data
router.get("/dashboard", verifyToken, async (req, res) => {
  try {
    const userId = req.user._id

    // Get all readings for user
    const readings = await EnergyReading.find({ userId })

    if (readings.length === 0) {
      return res.json({
        totalEnergyUsage: 0,
        carbonFootprint: 0,
        readingsCount: 0,
        averageDaily: 0,
        costSavings: 0,
        timestamp: new Date(),
      })
    }

    // Calculate metrics
    const totalUsage = readings.reduce((sum, item) => sum + (item.usage || 0), 0)
    const totalCost = readings.reduce((sum, item) => sum + (item.cost || 0), 0)
    const totalCarbonFootprint = readings.reduce((sum, item) => sum + (item.carbonFootprint || 0), 0)
    const averageDaily = (totalUsage / readings.length).toFixed(2)

    // Mock savings calculation (10% reduction with solar)
    const costSavings = (totalCost * 0.1).toFixed(2)

    res.json({
      totalEnergyUsage: totalUsage.toFixed(2),
      carbonFootprint: totalCarbonFootprint.toFixed(2),
      readingsCount: readings.length,
      averageDaily,
      costSavings,
      timestamp: new Date(),
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get monthly trends
router.get("/trends/monthly", verifyToken, async (req, res) => {
  try {
    const userId = req.user._id
    const currentDate = new Date()
    const thirtyDaysAgo = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000)

    const readings = await EnergyReading.find({
      userId,
      createdAt: { $gte: thirtyDaysAgo, $lte: currentDate },
    }).sort({ createdAt: 1 })

    // Group by date
    const trendData = {}
    readings.forEach((reading) => {
      const date = new Date(reading.createdAt).toISOString().split("T")[0]
      if (!trendData[date]) {
        trendData[date] = { usage: 0, cost: 0 }
      }
      trendData[date].usage += reading.usage
      trendData[date].cost += reading.cost || 0
    })

    const formattedData = Object.entries(trendData).map(([date, data]) => ({
      date,
      usage: data.usage.toFixed(2),
      cost: data.cost.toFixed(2),
    }))

    res.json(formattedData)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get recommendations
router.get("/recommendations", verifyToken, async (req, res) => {
  try {
    const userId = req.user._id
    const readings = await EnergyReading.find({ userId })

    const totalUsage = readings.reduce((sum, item) => sum + (item.usage || 0), 0)
    const averageUsage = totalUsage / (readings.length || 1)

    const recommendations = []

    if (averageUsage > 500) {
      recommendations.push({
        title: "High Energy Consumption",
        description: "Consider installing solar panels to reduce electricity costs",
        impact: "Could save up to 30% on energy bills",
      })
    }

    if (readings.length > 0) {
      const manualReadings = readings.filter((r) => r.source === "manual").length
      if (manualReadings > readings.length * 0.5) {
        recommendations.push({
          title: "Install Smart Meter",
          description: "Automate energy tracking with an IoT-enabled smart meter",
          impact: "Real-time monitoring and better insights",
        })
      }
    }

    recommendations.push({
      title: "Switch to Renewable Energy",
      description: "Check our provider directory for clean energy alternatives",
      impact: "Reduce carbon footprint and support sustainability",
    })

    res.json(recommendations)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
