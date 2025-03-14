// const express = require("express");
// const authenticateToken = require("../middleware/authMiddleware");
// const User = require("../models/User");

// const router = express.Router();

// // Dashboard Route - Get User Info
// router.get("/dashboard", authenticateToken, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.userId).select("password"); // Exclude password
//     if (!user) return res.status(404).json({ error: "User not found" });

//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ error: "Server error" });
//   }
// });

// module.exports = router;
