const express = require("express")
const router = express.Router()
const { verifyToken } = require("../middleware/auth")
const Job = require("../models/Job")

router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 }).populate("postedBy", "name email")
    res.json(jobs)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const job = await Job.findById(id).populate("postedBy", "name email company")

    if (!job) {
      return res.status(404).json({ error: "Job not found" })
    }

    res.json(job)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post("/", verifyToken, async (req, res) => {
  try {
    const { title, description, company, location, salary, type, category } = req.body

    const job = new Job({
      title,
      description,
      company,
      location,
      salary,
      type: type || "full-time",
      category,
      postedBy: req.user._id,
      status: "open",
    })

    const savedJob = await job.save()
    await savedJob.populate("postedBy", "name email")
    res.status(201).json(savedJob)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params
    const { title, description, company, location, salary, type, category, status } = req.body

    const job = await Job.findByIdAndUpdate(
      id,
      { title, description, company, location, salary, type, category, status },
      { new: true, runValidators: true },
    ).populate("postedBy", "name email")

    if (!job) {
      return res.status(404).json({ error: "Job not found" })
    }

    res.json(job)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params

    const job = await Job.findByIdAndDelete(id)

    if (!job) {
      return res.status(404).json({ error: "Job not found" })
    }

    res.json({ message: "Job deleted successfully", job })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
