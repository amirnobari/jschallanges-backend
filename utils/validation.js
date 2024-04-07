const { check, validationResult } = require('express-validator')

exports.validateRegister = [
    check('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    check('email').isEmail().withMessage('Invalid email'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
]

exports.validateLogin = [
    check('username').notEmpty().withMessage('Username is required'),
    check('password').notEmpty().withMessage('Password is required')
]

exports.handleValidationErrors = (req, res, next) =>
{
    const errors = validationResult(req)
    if (!errors.isEmpty())
    {
        return res.status(400).json({ errors: errors.array() })
    }
    next()
}
