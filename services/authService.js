const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.register = async (username, email, password) =>
{
    try
    {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] })
        if (existingUser)
        {
            throw new Error('Username or email is already taken')
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })
        await newUser.save()

        return { success: true, message: 'User registered successfully' }
    } catch (error)
    {
        return { success: false, message: error.message }
    }
}

exports.login = async (username, password) =>
{
    try
    {
        const user = await User.findOne({ username })
        if (!user)
        {
            throw new Error('User not found')
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid)
        {
            throw new Error('Invalid password')
        }

        // لاگ مقدار isAdmin را نمایش می‌دهد
        console.log('isAdmin:', user.isAdmin)

        // بررسی معتبر بودن isAdmin از دیتابیس
        const isAdmin = user.isAdmin || false

        // ایجاد توکن با اطلاعات کاربر و فیلد isAdmin
        const token = jwt.sign({ userId: user._id, isAdmin }, process.env.JWT_SECRET)

        return { success: true, token }
    } catch (error)
    {
        return { success: false, message: error.message }
    }
}
