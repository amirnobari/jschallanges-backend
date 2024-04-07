const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoutes = require('./routes/authRoutes')
const adminRoutes = require('./routes/adminRoutes')
const productRoutes = require('./routes/productRoutes')
const adminProductRoutes = require('./routes/adminRoutes') 

dotenv.config()
const app = express()

// Connect to MongoDB
mongoose.connect(process.env.DB_CONNECTION_STRING).then(() =>
    console.log('Connected!'))

// Middleware
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)
//فعلا موندتا بسازمش
// app.use('/api/products', productRoutes)
app.use('/api/admin', adminProductRoutes)


const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
