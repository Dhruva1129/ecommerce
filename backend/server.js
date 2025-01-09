const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
// const twilio = require('twilio');
const adddeleteRoutes=require('./routes/AddDelete');
const Product=require('./models/Product')
dotenv.config();

const app = express();

// Middleware
app.use(cors());



app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

  const userRoutes = require('./routes/UserRoutes'); // Adjust the path as needed
  app.use('/user', userRoutes);

// Routes
// app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/adddelete',adddeleteRoutes);
app.get("/products",  async (req, res) => {
  try {
      const products = await Product.find(); // Fetch products from the database
      res.status(200).json(products); // Send back the products
  } catch (error) {
      res.status(500).json({ message: "Error fetching products", error });
  }
});



// const accountSid = 'ACe509526f1066b1439f05accb07e937b1';
// const authToken = '57242d3c7c074e50c2ea96872eac1e56';
// const client = twilio(accountSid, authToken);

// const otpStorage = {};

// // Send OTP via WhatsApp
// app.post('/send-otp', (req, res) => {
//   const { phone } = req.body;
//   const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP

//   otpStorage[phone] = otp; // Save OTP (temporary)

//   client.messages
//     .create({
//       body: `Your OTP is ${otp}`,
//       from: 'whatsapp:+14155238886', // Twilio WhatsApp Sandbox Number
//       to: `whatsapp:+91${phone}`, // User's WhatsApp number
//     })
//     .then(() => {
//       res.status(200).json({ msg: 'OTP sent successfully!' });
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).json({ msg: 'Failed to send OTP' });
//     });
// });

// Verify OTP
// app.post('/verify-otp', (req, res) => {
//   const { phone, otp } = req.body;

//   if (otpStorage[phone] && otpStorage[phone] === parseInt(otp)) {
//     delete otpStorage[phone]; // Clear OTP after successful verification
//     res.status(200).json({ msg: 'OTP verified successfully!' });
//   } else {
//     res.status(400).json({ msg: 'Invalid OTP' });
//   }
// });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
