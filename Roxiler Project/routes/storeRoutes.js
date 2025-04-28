const express = require('express')
const storeRoutes = require('../controllers/storeController')
const authenticationToken = require('../middleware/userMiddleware')
const router = express.Router()

router.post('/addStore' , authenticationToken ,  storeRoutes.addStore)
router.get("/fetchStore" , authenticationToken ,  storeRoutes.getAllStores)
router.post("/submitRating" , authenticationToken , storeRoutes.submitRating)
router.get('/getRating/:storeId' , storeRoutes.getStoreRating)
router.get("/getStoreDetails/:storeId" , authenticationToken , storeRoutes.getStoreDetails)




module.exports = router
