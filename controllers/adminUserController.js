const User = require('../models/User')
const mongoose = require('mongoose');


exports.editUser = async (req, res) =>
{
    try
    {
        const { userId } = req.params
        const { username, email, isAdmin } = req.body

        // بررسی صحت شناسه کاربر
        if (!mongoose.isValidObjectId(userId))
        {
            return res.status(400).json({ error: 'Invalid user ID' })
        }

        // بررسی وجود کاربر با شناسه داده شده
        const existingUser = await User.findById(userId)
        if (!existingUser)
        {
            return res.status(404).json({ error: 'User not found' })
        }

        // بروزرسانی اطلاعات کاربر
        await User.findByIdAndUpdate(userId, { username, email, isAdmin })

        res.status(200).json({ message: 'User information updated successfully' })
    } catch (error)
    {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' })
    }
}
