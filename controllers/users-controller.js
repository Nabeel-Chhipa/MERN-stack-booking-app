import User from "../models/User";
import bcrypt from 'bcryptjs'

export const getAllUsers = async (req,res,next) => {
    let users
    try {
        users = await User.find()
    } catch (error) {
        return console.log(error)
    }

    if(!users) {
        return res.status(500).json({ message: 'Unexpected Error Occured' })
    }

    return res.status(200).json({ users })
}

export const signup = async (req, res, next) => {
    const {name, email, password} = req.body
    if(!name && name.trim()==='' && !email && email.trim()==='' && !password && password.trim()==='') {
        return res.status(422).json({message: 'invalid inputs'})
    }
    const hashedPassword = bcrypt.hashSync(password)

    let user
    try {
        user = new User({ name, email, password:hashedPassword })
        user = await user.save()
    } catch (error) {
        return console.log(error)
    }

    if(!user) {
        return res.status(500).json({ message: 'Unexpected Error Occured' })
    }
    return res.status(201).json({ user })
}

export const updateUser = async (req, res, next) => {
    const id = req.params.id;
    const {name, email, password} = req.body;
    if(!name && name.trim()==='', !email && email.trim()==='', !password && password.trim()==='') {
        return res.status(422).json({ message: 'Invalid Inputs' })
    }

    const hashedPassword = bcrypt.hashSync(password);
    let user;
    try {
        user = await User.findByIdAndUpdate(id, {
            name,
            email,
            password: hashedPassword
        })
    } catch (error) {
        return console.log(error)
    }

    if(!user) {
        return res.status(5000).json({message: 'Something went wrong'})
    }
    return res.status(200).json({message: 'Updated Successfully'})
}

export const deleteUser = async (req, res, next) => {
    const id = req.params.id;
    let user;
    try {
        user = await User.findByIdAndRemove(id);
    } catch (error) {
        return console.log(error)
    }

    if(!user) {
        return res.status(5000).json({message: 'Something went wrong'})
    }
    return res.status(200).json({message: 'Deleted Successfully'})
}