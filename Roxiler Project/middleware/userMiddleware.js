const jwt = require('jsonwebtoken')

const authenticationToken = ( req , res  , next ) => {

    const token = req.header('authorization')?.split(' ')[1];

    if(!token) {
        return res.status(400).json({message:"No Token , authorization denied"})
    }

    try {
        const decodedUser = jwt.verify(token , process.env.SECRET_KEY)

        req.user = decodedUser

        next()
    } catch (error) {
        console.error("Invalid Token" , error)
        return res.status(401).json({message:"Invalid token"})
    }

}

module.exports = authenticationToken