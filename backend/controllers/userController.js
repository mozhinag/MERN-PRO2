import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";

// @desc   Register a New User
// @route   POST /api/users
// @access  Public

export const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("please add all fields");
  }

  //check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(404);
    throw new Error(" User already exists");
  }

  // Hash password

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password,salt)

  //Create user

  const user = await User.create({
    name,
    email,
    password:hashedPassword
  })
if(user){
  res.status(200).json({
    _id:user.id,
    name:user.name,
    email:user.email,
    token: generateToken(user._id)

  })
}
else{
  res.status(400)
  throw new Error('INvalid User') //validation error,mongoose.connect wasnt successful and
  //  data doesn’t pass, Mongoose won’t create the user then this portion will execute.
}

 
});

// @desc   Authenticat
// @route   POST /api/users/login
// @access  Public

export const loginUser = expressAsyncHandler(async (req, res) => {

  const { email,password } = req.body

  //check for user email
  const user = await User.findOne({email})

  if(user && (await bcrypt.compare(password,user.password)))
  {
    res.json({
      _id:user.id,
      name: user.name,
      email: user.email ,
      token: generateToken(user._id)
    })
  }
  else{
    res.status(400).json({massage:"InValid Credentials"})
  }
  
});

// @desc   GetMe
// @route   POST /api/users/me
// @access  Public

export const getMe = expressAsyncHandler(async (req, res) => {
  const { _id,name,email} = await User.findById(req.user.id)

   res.json({
    id:_id,
    name,
    email

    });
});

//Generate JWT

const generateToken = (id) =>{
  return jwt.sign({id}, process.env.JWT_SECRET,{
    expiresIn:'30d'
  })
}
