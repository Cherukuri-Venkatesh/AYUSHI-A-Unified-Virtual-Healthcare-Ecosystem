import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'

// user authentication middleware
const authUser = async (req, res, next) => {
    const { token } = req.headers
    if (!token) {
        return res.status(401).json({ success: false, message: 'Not Authorized Login Again' })
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        
        // Find the user to ensure they exist
        const user = await userModel.findById(token_decode.id)
        if (!user) {
            return res.status(401).json({ success: false, message: 'User not found' })
        }
        
        // Add user to request object for controllers to use
        req.user = user
        req.body.userId = token_decode.id
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({ success: false, message: 'Authentication failed' })
    }
}

export default authUser;