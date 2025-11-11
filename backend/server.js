const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const { connectDB } = require("./src/config/database")

dotenv.config()

const app = express()

// Connect to MongoDB
connectDB()

// Middleware
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN || "http://localhost:5173",
    credentials: true,
  }),
)
app.use(express.json())

// Routes
app.use("/api/auth", require("./src/routes/auth"))
app.use("/api/energy", require("./src/routes/energy"))
app.use("/api/providers", require("./src/routes/providers"))
app.use("/api/jobs", require("./src/routes/jobs"))
app.use("/api/analytics", require("./src/routes/analytics"))

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "SEMS Backend Running" })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: "Internal Server Error" })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`SEMS Backend running on port ${PORT}`)
})
