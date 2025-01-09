const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Admin = require("../models/Admin");
dotenv.config();

const router = express.Router();


router.post('/signup', async (req, res) => {
  const { username, email, password} = req.body;
  
  try {
   
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ msg: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});


router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await Admin.findOne({ email });
    let role = "admin";

    if (!user) {
      user = await User.findOne({ email });
      role = "customer";
    }

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role },  process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ role, token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// router.get('/user/:id', async (req, res) => {
//   const { id } = req.params;

//   try {
//     const user = await User.findById(id);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.status(200).json({
//       name: user.name,
//       email: user.email,
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

module.exports = router;