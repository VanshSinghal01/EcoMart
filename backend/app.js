const express = require('express');
const cors = require('cors');
const User = require('./data'); 
const connectbd = require('./database');
const productdata = require("./productsdata")
const app = express();
const TempUser = require('./tempdata'); 
const Send = require('./send');
const Schema = require('./schema');
app.use(cors());
app.use(express.json());

const OTP = () => {
  return Math.floor(1000 + Math.random() * 900000);
}
app.get('/get', async (req, res) => {
    try {
      const data = await productdata.find(); 
      // console.log(data)
      res.status(200).json(data);
    } catch (err) {
      console.error('Error in fetching data:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
app.post("/signup", async (req, res) => {
  const { Email } = req.body;

  console.log('Received data:', req.body);
  try {
    const user = await Schema.findOne({ Email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const existingTempUser = await TempUser.findOne({ Email });
    if (existingTempUser) {
      return res.status(400).json({ message: "OTP already sent. Please verify." });
    }

    const otp = OTP();
    const emailContent = `
      Dear Customer,
      
      Welcome to Eco Market!
      Please use the following OTP to confirm your registration: ${otp}.
      
      Thank you for choosing us!
      
      Best Regards,
      Eco Market Team..❤️
    `;

  
    await Send(Email, emailContent);

    const tempUser = new TempUser({ Email, otp });
    await tempUser.save();

    res.json({ message: "Verification email sent" });
  } catch (error) {
    console.error("Error in processing:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});


app.post("/verifyotp", async (req, res) => {
  const { Email, otp } = req.body;
  console.log('Received data:', req.body);

  try {
    const tempUser = await TempUser.findOne({ Email });
    if (!tempUser) {
      return res.status(400).json({ message: "Email not found or OTP expired" });
    }

    if (tempUser.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    console.log(`Generated OTP for ${tempUser.otp}: ${otp}`);
    const newUser = new Schema({ Email }); 
    await newUser.save();

    await TempUser.deleteOne({ Email });

    res.json({ message: "OTP verified successfully. User registered." });
  } catch (error) {
    console.error("Error in OTP verification:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});
connectbd()
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
      console.log('Server running on port 3000');
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });
