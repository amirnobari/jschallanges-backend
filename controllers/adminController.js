const Admin = require('../models/Admin')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.createAdmin = async (req, res) =>
{
    try
    {
        const { username, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const admin = new Admin({ username, password: hashedPassword })
        await admin.save()
        console.log('Admin created successfully') // لاگ اضافه شده
        res.status(201).json({ message: 'Admin created successfully' })
    } catch (error)
    {
        console.log('Error creating admin:', error) // لاگ اضافه شده
        res.status(400).json({ error: 'Invalid data' })
    }
}

exports.loginAdmin = async (req, res) =>
{
    try
    {
        const { username, password } = req.body
        const admin = await Admin.findOne({ username })
        if (!admin)
        {
            console.log('Admin not found') // لاگ اضافه شده
            return res.status(401).json({ error: 'Invalid credentials' })
        }
        const isPasswordValid = await bcrypt.compare(password, admin.password)
        if (!isPasswordValid)
        {
            console.log('Invalid password') // لاگ اضافه شده
            return res.status(401).json({ error: 'Invalid credentials' })
        }
        const token = jwt.sign({ username: admin.username, isAdmin: true }, process.env.JWT_SECRET)
        console.log('Admin logged in successfully') // لاگ اضافه شده
        res.json({ token })
    } catch (error)
    {
        console.log('Error logging in admin:', error) // لاگ اضافه شده
        res.status(500).json({ error: 'Internal server error' })
    }
}

exports.listUsers = async (req, res) =>
{
    try
    {
        const users = await User.find({}, 'username email isAdmin')
        res.json(users)
    } catch (error)
    {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' })
    }
}
