import Admin from "../models/Admin";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

export const addAdmin = async (req, res, next) => {
    const { email, password } = req.body;
    if(!email && email.trim()==='' && !password && password.trim()==='') {
        return res.status(422).json({message: 'invalid inputs'})
    }
    let existingUser;
    try {
        existingUser = await Admin.findOne({ email })
    } catch (error) {
        return console.log(error)
    }

    if(existingUser) {
        return res.status(400).json({ message: 'Admin already exists' })
    }

    let admin
    const hashedPassword = bcrypt.hashSync(password)
    try {
        admin = new Admin({ email, password: hashedPassword })
        admin = await admin.save()
    } catch (error) {
        return console.log(error)
    }

    if(!admin) {
        return res.status(500).json({ message: 'Unable to find admin' })
    }
    return res.status(201).json({ admin })
}

export const adminLogin = async (req, res, next) => {
    const { email, password } = req.body;
    if(!email && email.trim()==='' && !password && password.trim()==='') {
        return res.status(422).json({message: 'invalid inputs'})
    }
    let existingUser;
    try {
        existingUser = await Admin.findOne({ email })
    } catch (error) {
        return console.log(error)
    }
    if(!existingUser) {
        return res.status(400).json({message: 'Admin not found'})
    }
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password)
    if(!isPasswordCorrect) {
        return res.status(400).json({message:'Incorrect password'})
    }
    const token = jwt.sign({id:existingUser._id}, process.env.SECRET_KEY, {
        expiresIn: '7d'
    })
    return res.status(200).json({message:'Authentication completed', token, id: existingUser._id})
}