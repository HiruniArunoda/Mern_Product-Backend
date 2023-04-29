// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../model/userModel");

// const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Check if user already exists
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Hash password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Create user
//     const user = new User({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     // Save user
//     const createdUser = await user.save();

//     // Generate JWT token
//     const token = jwt.sign({ id: createdUser._id }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     // Send token and user data
//     res
//       .status(201)
//       .json({
//         token,
//         user: {
//           _id: createdUser._id,
//           name: createdUser.name,
//           email: createdUser.email,
//         },
//       });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find user
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     // Check password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     // Send token and user data
//     res.json({
//       token,
//       user: { _id: user._id, name: user.name, email: user.email },
//     });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// const getUserProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select("-password");
//     res.json(user);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// module.exports = { registerUser, loginUser, getUserProfile };
