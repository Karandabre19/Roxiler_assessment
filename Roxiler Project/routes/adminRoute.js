const express = require('express')
const adminController = require('../controllers/admincontroller')
const authenticationToken = require('../middleware/userMiddleware')
const router = express.Router()

router.get("/dashboard" , authenticationToken , adminController.adminDashboard )
router.get("/users" , authenticationToken , adminController.getAllUsers)
router.get("/users/:userId" , authenticationToken , adminController.getUserDetails)
router.get("/stores" , authenticationToken , adminController.getAllStores)
router.get("/stores/:storeId" , authenticationToken , adminController.getStoreDetails)
router.get("/stores/filter" , authenticationToken , adminController.filterStores)


module.exports = router