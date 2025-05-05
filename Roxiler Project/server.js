// this is the Skeleton of the Node Api
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const userRouter = require('./routes/userRoute')
const adminRoute = require('./routes/adminRoute')
const storeRouter = require('./routes/storeRoutes')
const { createDatabaseSchema, initializeAdminUser } = require('./models/userModel')

dotenv.config(); // Load all the end variable and build all the config all the config into the app
// if it doesnt get the .env file we will
// if (!process.env.PORT)
// {
//     console.log("Fatal error : Port number is not defined")
//     process.exit(true)

const app = express(); // Here we are intializing new Instance of the App.

app.use(express.json()); // when ever the data is being is sent from the client side is should be parsed into the express readable format

app.use(cors()); // when the server is being called then the Cors will welcome as the gate keeper and keep that safe and secure

app.use('/api/user' , userRouter)

app.use('/api/store' , storeRouter)

app.use("/admin" , adminRoute )

app.get("/",(req, res) => {
    res.send("API is running has been started ......")
}) // this define where ever the get req is done then the res will be send as the API is running

const PORT = process.env.PORT || 5000 // this takes the Port or set the on which the Server should be learn

app.listen(PORT , () => console.log(`server is listening at the Port ${PORT}`)) // this will tell to listen all the Request which is held that port which is being Intialized