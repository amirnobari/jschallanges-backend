const authService = require('../services/authService')
const { validationResult } = require('express-validator')

exports.register = async (req, res) =>
{
    try
    {
        const errors = validationResult(req)
        if (!errors.isEmpty())
        {
            return res.status(400).json({ errors: errors.array() })
        }
        const { username, email, password } = req.body
        const response = await authService.register(username, email, password)
        if (response.success)
        {
            res.status(201).json({ message: response.message })
        } else
        {
            res.status(400).json({ error: response.message })
        }
    } catch (error)
    {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

exports.login = async (req, res) =>
{
    try
    {
        const errors = validationResult(req)
        if (!errors.isEmpty())
        {
            return res.status(400).json({ errors: errors.array() })
        }
        const { username, password } = req.body
        const response = await authService.login(username, password)
        if (response.success)
        {
            res.status(200).json({ message: response.message, token: response.token });
        } else
        {
            res.status(401).json({ error: response.message })
        }
    } catch (error)
    {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' })
    }
}
