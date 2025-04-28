const { json } = require('express');
const pool = require('../config/db');

const addStore = async (req, res) => {
    try {
        const { name, email, address } = req.body;

        const userID = req.user.id
        const userRole = req.user.role

        if( userRole != "Owner" && userRole !="Admin") {
            return res.status(403).json({message:"Permission denied to create the store"})
        }

        if (!name || !email || !address) {
            return res.status(400).json({ message: "All the fields are necessary" });
        }

        const [existingStore] = await pool.execute('SELECT * FROM Store WHERE email = ?', [email]);

        if (existingStore.length > 0) {
            return res.status(400).json({ message: "Store already exists with this email" });
        }

        await pool.execute('INSERT INTO Store (name, email, address , owner_id) VALUES (?, ?, ? , ?)', [name, email, address , userID]);

        await pool.execute(" Update User Set user_role = ? Where id = ? " , ['Owner' , userID])

        return res.status(201).json({ message: "Store added successfully" });

    } catch (error) {
        console.error("Error in adding store:", error);
        return res.status(500).json({ message: "Error adding the store" });
    }
};

const getAllStores = async (req, res) => {
    try {
        const [stores] = await pool.execute('SELECT * FROM Store');
        return res.status(200).json({ stores });

    } catch (error) {
        console.error("Error in fetching stores:", error);
        return res.status(500).json({ message: "Error fetching stores" });
    }
};


const submitRating = async (req, res) => {
        const { storeID, rating } = req.body;
        const userID = req.user.id;
    
        if (!storeID || !userID || rating < 1 || rating > 5) {
        return res.status(400).json({ message: "Invalid rating" });
        }
    
        try {
        const [existingRating] = await pool.execute(
            `SELECT * FROM Rating WHERE user_id = ? AND store_id = ?`,
            [userID, storeID]
        );
    
        if (existingRating.length > 0) {
            await pool.execute(
            `UPDATE Rating SET rating = ? WHERE store_id = ? AND user_id = ?`,
            [rating, storeID, userID]
            );
        } else {
            await pool.execute(
            `INSERT INTO Rating (store_id, user_id, rating) VALUES (?, ?, ?)`,
            [storeID, userID, rating]
            );
        }
    
        return res.status(200).json({ message: "Rating submitted successfully" });
        } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error in submitting the rating" });
        }
        };

    const getStoreRating = async (req , res ) => {

        console.log(req.params)

            const { storeId } = req.params;

            console.log("Received store ID " , storeId)

            if(!storeId) {
                return res.status(400).json({message:"Store ID is required"})
            }

            try {
                const [ratings] = await pool.execute(`Select * from Rating Where store_id = ?` , [storeId])

                return res.status(200).json({  ratings  , message:"Rating fetched successfully"})
            }
            catch (error) {
                console.error("caught error while fetching rating :" , error)
                return res.status(500).json({message:"Error while fetching the ratings of your store"})
            }
    }

const getStoreDetails = async (req, res) => {
    try {
        const storeId = req.params.storeId;

        // Admin authorization check
        const userRole = req.user.role;
        if (userRole !== 'Admin') {
            return res.status(403).json({ message: 'Permission denied' });
        }

        // Fetch store details from the database
        const [storeDetails] = await pool.execute('SELECT * FROM Store WHERE id = ?', [storeId]);

        if (storeDetails.length === 0) {
            return res.status(404).json({ message: 'Store not found' });
        }

        return res.status(200).json(storeDetails[0]);
    } catch (error) {
        console.error('Error fetching store details:', error);
        return res.status(500).json({ message: 'Error fetching store details' });
    }
};



module.exports = { addStore, getAllStores , submitRating  , getStoreRating  , getStoreDetails};
