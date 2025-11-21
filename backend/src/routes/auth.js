const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')

// helper to create token
const createToken = (user) => {
  const secret = process.env.JWT_SECRET || 'dev_jwt_secret'
  return jwt.sign({ _id: user._id, email: user.email }, secret, { expiresIn: '7d' })
}

// Register user
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Name, email and password are required' })
    }

    const existingUser = await User.findOne({ email: email.toLowerCase().trim() })
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' })
    }

    const user = new User({ email, password, name })
    await user.save()

    const token = createToken(user)

    // set httpOnly cookie (frontend must use axios withCredentials:true)
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    return res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { _id: user._id, name: user.name, email: user.email },
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() })
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' })
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' })
    }

    const token = createToken(user)
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    return res.json({
      message: 'Login successful',
      token,
      user: { _id: user._id, name: user.name, email: user.email },
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

// Get and update profile (unchanged except simple validation)
router.get('/profile/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password')
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.put('/profile/:userId', async (req, res) => {
  try {
    const updates = { ...req.body }
    if (updates.password) delete updates.password // avoid direct password updates here
    const user = await User.findByIdAndUpdate(req.params.userId, updates, { new: true }).select('-password')
    res.json({ message: 'Profile updated', user })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
