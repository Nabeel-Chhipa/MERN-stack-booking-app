import User from "../models/User";

export const getAllUsers = async (req,res,next) => {
    let users
    try {
        users = await User.find()
    } catch (error) {
        return next(error)
    }

    if(!users) {
        return res.status(500).json({ message: 'Unexpected Error Occured' })
    }

    return res.status(200).json({ users })
}