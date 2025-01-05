const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer"); // Import multer for file upload
const path = require("path"); // Import path for file path handling
require("dotenv").config(); // Import dotenv to access environment variables
//const authRoutes = require('./routes/authRoutes'); // Assuming authRoutes.js is in the routes folder


const app = express(); // Initialize app first
const port = process.env.PORT || 3000; // Use environment port or default to 3000

// CORS setup
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  methods: ['GET', 'POST'],
  credentials: true, // Allow cookies if needed
}));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Serve static files from the "upload" directory
app.use('/upload', express.static(path.join(__dirname, 'upload')));

// Connect to MongoDB (Database name is Users and collection name is Information)
mongoose.connect("mongodb://localhost:27017/Users")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("MongoDB Connection Error:", err);
  });


// User Schema
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model("User", userSchema);

// Song Schema
const songSchema = new mongoose.Schema({
  songname: { type: String, required: true },
  singer: { type: String, required: true },
  albumname: { type: String, required: true },
  releaseyear: { type: Number, required: true },
  imagePath: { type: String, required: true },
  audioPath: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Song = mongoose.model("Song", songSchema);




// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the music player API!");
});

// POST API to register user (Sign Up)
app.post("/api/SignUpForm", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists!" });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  // Generate JWT token
  const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '1h' });

  // Send token in HttpOnly cookie
  res.cookie("authToken", token, {             
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Only set to true in production
    sameSite: "Strict",
    maxAge: 3600000, // 1 hour
  }).status(201).json({ success: true, message: "Sign up successful", token });
});

// POST API to login user
app.post("/api/Login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '1h' });

    // Send the token in a HttpOnly cookie
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Only true in production
      sameSite: "Strict",
      maxAge: 3600000, // 1 hour
    }).status(200).json({ success: true, message: "Login successful", token });

  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});


// GET API to fetch songs
app.get("/songs", async (req, res) => {
  try {
    const songs = await Song.find();
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch songs" });
  }
});


// POST API to upload song (image + audio) and store details in MongoDB
app.post("/upload", multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      if (file.fieldname === "songImage") {
        cb(null, 'upload/song');
      } else if (file.fieldname === "songaudio") {
        cb(null, 'upload/songaudio');
      } else {
        cb(new Error("Invalid fieldname"), false);
      }
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Add timestamp to avoid file conflicts
    },
  }),
}).fields([{ name: 'songImage' }, { name: 'songaudio' }]), async (req, res) => {
  if (!req.files || !req.files.songImage || !req.files.songaudio) {
    return res.status(400).json({ success: false, message: "Both image and audio files are required." });
  }

  console.log("Song Image:", req.files.songImage[0]);
  console.log("Song Audio:", req.files.songaudio[0]);

  // Extract song details from the request body
  const { songname, singer, albumname, releaseyear } = req.body;

  // Ensure all song details are present
  if (!songname || !singer || !albumname || !releaseyear) {
    return res.status(400).json({ success: false, message: "Missing required song details." });
  }

  // Get file paths for image and audio
  const imagePath = req.files.songImage[0].path;
  const audioPath = req.files.songaudio[0].path;

  // Create a new song document
  const newSong = new Song({
    songname,
    singer,
    albumname,
    releaseyear,
    imagePath,
    audioPath,
  });


  // Save the song to the database
  await newSong.save();

  res.status(201).json({ success: true, message: "Song uploaded and saved successfully", song: newSong });
});

//app.use('/', authRoutes);
//module.exports = { SignUpForm, Login };


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
