const Admin = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// exports.register = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await Admin.findOne({ email });
//     if (user) {
//       return res.status(400).json({ message: "User already exists" });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new Admin({ email, password: hashedPassword });
//     await newUser.save();
//     res.status(200).json({ message: "User registered successfully" });
//   } catch (error) {
//     console.error("Error registering:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Admin.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const tokenPayload = {
      _id: user._id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "5d",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.changePassword = async (req, res) => {
  const userId = req.user._id;
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await Admin.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
