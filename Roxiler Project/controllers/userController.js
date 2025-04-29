const bcrypt = require('bcryptjs')
const pool = require('../config/db')
const jwt = require('jsonwebtoken');
const { json } = require('express');

const registerUser = async (req, res) => {
    const { name, email, password, address } = req.body;
    
    if (!name || !email || !password || !address) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const [existingUser] = await pool.execute(`Select * from User where email = ?`, [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: "This email already exist" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Set default role as 'User'
        await pool.execute(
            `Insert Into User (name, email, user_password, address, user_role) values (?, ?, ?, ?, ?)`, 
            [name, email, hashedPassword, address, 'User']
        );

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while registering the user" });
    }
}

const loginUser = async (req, res) => {
    try {

        console.log("Req body : " , req.body)

        const { email, password } = req.body;

        const [userResult] = await pool.query(`Select * from User Where email = ?`, [email]);

        if (userResult.length === 0) {
            return res.status(400).json({ message: "Invalid Username or password" });
        }

        const user = userResult[0];

        const isMatched = await bcrypt.compare(password, user.user_password);
        if (!isMatched) {
            return res.status(400).json({ message: "Invalid Password Detected" });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.user_role },
            process.env.SECRET_KEY,
            { expiresIn: '3h' }
        );

        return res.status(200).json({
            message: "Logged In successfully",
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.user_role
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Server error while login" });
    }
}

const updatePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.user.id;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: "Current password and new password are required" });
        }

        // Validate new password
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
        if (!passwordRegex.test(newPassword)) {
            return res.status(400).json({ 
                message: "New password must be 8-16 characters, include at least one uppercase letter and one special character" 
            });
        }

        // Get user from database
        const [userResult] = await pool.execute(`SELECT * FROM User WHERE id = ?`, [userId]);
        if (userResult.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = userResult[0];

        // Verify current password
        const isMatched = await bcrypt.compare(currentPassword, user.user_password);
        if (!isMatched) {
            return res.status(400).json({ message: "Current password is incorrect" });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password in database
        await pool.execute(`UPDATE User SET user_password = ? WHERE id = ?`, [hashedPassword, userId]);

        return res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error("Error updating password:", error);
        return res.status(500).json({ message: "Error updating password" });
    }
}

const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        // Get user details
        const [userResult] = await pool.execute(
            `SELECT id, name, email, address, user_role FROM User WHERE id = ?`,
            [userId]
        );

        if (userResult.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = userResult[0];

        // If user is a store owner, get store details
        if (user.user_role === 'Owner') {
            const [storeResult] = await pool.execute(
                `SELECT * FROM Store WHERE owner_id = ?`,
                [userId]
            );

            if (storeResult.length > 0) {
                const storeId = storeResult[0].id;
                const [ratings] = await pool.execute(
                    `SELECT AVG(rating) as average_rating, COUNT(*) as total_ratings 
                    FROM Rating WHERE store_id = ?`,
                    [storeId]
                );

                user.store = storeResult[0];
                user.store.average_rating = ratings[0].average_rating || 0;
                user.store.total_ratings = ratings[0].total_ratings || 0;
            }
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return res.status(500).json({ message: "Error fetching user profile" });
    }
}

module.exports = {
    registerUser,
    loginUser,
    updatePassword,
    getUserProfile
}