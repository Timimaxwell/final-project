const express = require("express")
const router = express.Router()
const { verifyToken } = require("../middleware/auth")
const Provider = require("../models/Provider")

router.get("/", async (req, res) => {
  try {
    const providers = await Provider.find()
    res.json(providers)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const provider = await Provider.findById(id)

    if (!provider) {
      return res.status(404).json({ error: "Provider not found" })
    }

    res.json(provider)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post("/", verifyToken, async (req, res) => {
  try {
    const { name, email, phone, businessType, description, location } = req.body

    const provider = new Provider({
      name,
      email,
      phone,
      businessType,
      description,
      location,
    })

    const savedProvider = await provider.save()
    res.status(201).json(savedProvider)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params
    const { name, email, phone, businessType, description, location, rating, verified } = req.body

    const provider = await Provider.findByIdAndUpdate(
      id,
      { name, email, phone, businessType, description, location, rating, verified },
      { new: true, runValidators: true },
    )

    if (!provider) {
      return res.status(404).json({ error: "Provider not found" })
    }

    res.json(provider)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params

    const provider = await Provider.findByIdAndDelete(id)

    if (!provider) {
      return res.status(404).json({ error: "Provider not found" })
    }

    res.json({ message: "Provider deleted successfully", provider })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
