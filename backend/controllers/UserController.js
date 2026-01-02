import User from '../models/User.js'
import { generateToken } from '../utils/JwtMiddleware.js';
import bcrypt from 'bcryptjs'

export async function registerUser(req, res) {
    try {
        const {fullName, email, password} = req.body;
        if(!fullName || !email || !password) {
            return res.status(400).json({msg: "fullName, email & password are required field"});
        }
        //check user already exists 
        const existingUser = await User.findOne().where("email").equals(email);
        if(existingUser) {
            return res.status(409).json({msg: "user with given email already exists"});
        }
        // encrypt password
        const hashedPassword = await bcrypt.hash(password, 10);
        const createdUser = await User.create({fullName, email, password: hashedPassword});
        const token = generateToken({id: createdUser.id, email});
        createdUser.password = "";
        return res.status(201).json({token, createdUser});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error.message});
    }
} 

export async function loginUser(req, res) {
    try {
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(400).json({msg: "email & password are required field"});
        }
        //check user already exists 
        const existingUser = await User.findOne().where("email").equals(email).select("password");
        if(!existingUser) {
            return res.status(400).json({msg: "Email & Password not exists"});
        }
        //compare password
        console.log(password + " " + existingUser.password);
        if(bcrypt.compare(password, existingUser.password)) {
            // user succesfful login generate token & send
            const token = generateToken({id: existingUser.id, email});
            return res.status(200).json({token});
        }
        else {
            return res.status(400).json({msg: "Email & Password not exists"});
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error.message});
    }
} 

export function dashboard(req, res) {
    return res.status(200).json({msg: "user authenticated", user: req.user});
}