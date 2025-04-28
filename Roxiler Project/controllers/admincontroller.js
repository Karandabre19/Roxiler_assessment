const express = require('express')
const pool = require('../config/db')
const bcrypt = require('bcryptjs')

const adminDashboard = async(req, res) => {
    try {
        const [users] = await pool.execute(`Select Count(*) AS userCount from User`);
        const [stores] = await pool.execute(`Select Count(*) AS storeCount from Store`);
        const [rating] = await pool.execute(`Select Count(*) AS ratingCount from Rating`);

        return res.status(200).json({
            totalUser: users[0].userCount,
            totalStore: stores[0].storeCount,
            totalRating: rating[0].ratingCount
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Error fetching the dashboard data'})
    }
}

const getAllUsers = async (req, res) => {
    try {
        const [users] = await pool.execute(`SELECT id, name, email, address, user_role FROM User`);
        return res.status(200).json({ users });
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ message: "Error fetching users" });
    }
}

const getAllStores = async (req, res) => {
    try {
        const [stores] = await pool.execute(`
            SELECT s.*, 
                COALESCE(AVG(r.rating), 0) as average_rating,
                COUNT(r.id) as total_ratings
            FROM Store s
            LEFT JOIN Rating r ON s.id = r.store_id
            GROUP BY s.id
        `);
        return res.status(200).json({ stores });
    } catch (error) {
        console.error("Error fetching stores:", error);
        return res.status(500).json({ message: "Error fetching stores" });
    }
}


const getUserDetails = async (req, res) => {
    try {
        const { userId } = req.params;

        // Fetch user details
        const [userDetails] = await pool.execute(
            `SELECT id, name, email, address, user_role FROM User WHERE id = ?`,
            [userId]
        );

        if (userDetails.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = userDetails[0];

        // If user is a store owner, fetch their store details and ratings
        if (user.user_role.toLowerCase() === 'owner') {
            const [storeDetails] = await pool.execute(
                `SELECT * FROM Store WHERE owner_id = ?`,
                [userId]
            );

            if (storeDetails.length > 0) {
                const storeId = storeDetails[0].id;
                const [ratings] = await pool.execute(
                    `SELECT AVG(rating) as average_rating, COUNT(*) as total_ratings
                    FROM Rating WHERE store_id = ?`,
                    [storeId]
                );

                user.store = storeDetails[0];
                user.store.average_rating = ratings[0].average_rating || 0;
                user.store.total_ratings = ratings[0].total_ratings || 0;
            }
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user details:", error);
        return res.status(500).json({ message: "Error fetching user details" });
    }
}

const getStoreDetails = async (req, res) => {
    try {
        const { storeId } = req.params;
        const [storeDetails] = await pool.execute(`SELECT * FROM Store WHERE id = ?`, [storeId]);
        
        if (storeDetails.length === 0) {
            return res.status(404).json({ message: 'Store not found' });
        }

        return res.status(200).json({ storeDetails });
    } catch (error) {
        console.error("Error fetching store details:", error);
        return res.status(500).json({ message: "Error fetching store details" });
    }
}


const filterStores = async (req, res) => {
    try {
        const { name, email, address } = req.query;
        const userRole = req.user.role;

        if (userRole !== 'Admin') {
            return res.status(403).json({ message: 'Permission denied' });
        }

        let query = 'SELECT * FROM Store WHERE 1=1';
        let queryParams = [];

        if (name) {
            query += ' AND name LIKE ?';
            queryParams.push(`%${name}%`);
        }
        if (email) {
            query += ' AND email LIKE ?';
            queryParams.push(`%${email}%`);
        }
        if (address) {
            query += ' AND address LIKE ?';
            queryParams.push(`%${address}%`);
        }

        const [stores] = await pool.execute(query, queryParams);

        return res.status(200).json(stores);
    } catch (error) {
        console.error('Error filtering stores:', error);
        return res.status(500).json({ message: 'Error filtering stores' });
    }
};



module.exports = {
    adminDashboard,
    getAllUsers,
    getAllStores,
    getUserDetails,
    getStoreDetails,
    filterStores
}