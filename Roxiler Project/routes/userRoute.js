const express = require('express');
const userController = require('../controllers/userController');
const authenticationToken = require('../middleware/userMiddleware');
const router = express.Router();

// Public routes
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

// Protected routes
router.put("/update-password", authenticationToken, userController.updatePassword);
router.get("/profile", authenticationToken, userController.getUserProfile);

module.exports = router;