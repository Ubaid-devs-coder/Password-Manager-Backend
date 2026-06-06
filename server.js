const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const connect = require('./db')
const User = require('./user.model')

const app = express()
const port = process.env.PORT || 3000

app.use(bodyparser.json())
app.use(cors())

connect()

// Get all passwords
app.get('/', async (req, res) => {
  try {
    const users = await User.find({})
    res.json(users)
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// Save a password
app.post('/', async (req, res) => {
  try {
    const user = new User(req.body)
    const result = await user.save()
    res.json({ success: true, result })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// Delete a password
app.delete('/', async (req, res) => {
  try {
    const result = await User.deleteOne({ _id: req.body.id })
    res.json({ success: true, result })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})