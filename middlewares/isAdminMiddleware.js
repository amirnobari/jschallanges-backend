const jwt = require('jsonwebtoken')
const User = require('../models/User')

const isAdminMiddleware = async (req, res, next) =>
{
    try
    {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if (!token)
        {
            return res.status(401).json({ error: 'Authorization header is missing' })
        }

        try
        {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // بررسی معتبر بودن توکن
            const user = await User.findById(decoded.userId)
            if (!user)
            {
                return res.status(401).json({ error: 'Invalid token' })
            }

            // بررسی فیلد isAdmin از دیتابیس
            if (!user.isAdmin)
            {
                return res.status(403).json({ error: 'You do not have permission to access this route' })
            }
        } catch (error)
        {
            return res.status(401).json({ error: 'Invalid token signature' })
        }

        next()
    } catch (error)
    {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

module.exports = isAdminMiddleware
