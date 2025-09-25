import jwt from "jsonwebtoken";

import User from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";

export const protect =  expressAsyncHandler(async(req,res,next)=>{

    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {

            // Get token from headers
            token = req.headers.authorization.split(' ')[1]

// verify token

const decoded = jwt.verify( token , process.env.JWT_SECRET)


// Get user from the token

req.user = await User.findById(decoded.id).select('-password')

next()
        } 
        catch (error) {
            res.status(401)
            throw new Error('not Authorized')
        }
      
      } 
  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }

})