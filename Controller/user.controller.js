import { response } from 'express';
import User from '../model/user.model.js'
import bcryptjs from 'bcryptjs'



export const signUp = async (req, res) => {
    console.log(req.body)
    try {
        const { fullname, email, password } = req.body;
        //user age theke register ki na seta find korbo
        const user =await User.findOne({ email })//User =database
        //age theke  email ta thakle
        if (user) {
            return res.status(400).json({message:"user already exists"})
        }
        //password secure
        const hashPassword = await bcryptjs.hash(password, 10);
        //na thakle data store hobe
        const createdUser = new User({
            fullname: fullname,
            email: email,
            password:hashPassword 
        })
        // data ashar por save korbo
      await  createdUser.save()
        res.status(201).json({
            message: "User Created Sucessfully",
            user: {
                _id: createdUser._id,
                fullname: createdUser.fullname,
                email: createdUser.email
                
            }
            })
        
    }

    catch (error) {
        console.log("error" + error.message)
           res.status(500).json({message: "Internal server error"})
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        const isMatch =await bcryptjs.compare(password, user.password)
        if (!user || !isMatch) {
                return res.status(400).json({message:"Invalid username and password"})
        }
        else {
            res.status(200).json({
                message: "Login sucessful", user: {
                    _id: user._id,
                    fullname: user.fullname,
                    email:user.email
            }})
        }
        }
    
    catch (error) {
        console.log("error" + error.message)
         res.status(500).json({message: "Internal server error"})
    }
}