import Admin from "../models/Admin";
import bcrypt from 'bcryptjs';

export const addAdmin = async (req, res, next) => {
    const { email, password } = req.body;
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