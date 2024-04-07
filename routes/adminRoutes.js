const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')
const isAdminMiddleware = require('../middlewares/isAdminMiddleware')
const adminProductController = require('../controllers/adminProductController') // اضافه کردن کنترلر محصولات ادمین
const adminUserController = require('../controllers/adminUserController') // ایمپورت کردن کنترلر adminUserController

// Route for creating admin, accessible only by admins
router.post('/create', isAdminMiddleware, adminController.createAdmin)

// Admin login
router.post('/login', adminController.loginAdmin)

// Routes for managing products by admin
router.post('/products', isAdminMiddleware, adminProductController.createProduct)
router.delete('/products/:id', isAdminMiddleware, adminProductController.deleteProduct)

// Route for listing users by admin
router.get('/users', isAdminMiddleware, adminController.listUsers)

// Route for updating user information by admin
router.put('/users/:userId', isAdminMiddleware, adminUserController.editUser)

// Route for editing products by admin
router.put('/products/:productId', isAdminMiddleware, adminProductController.editProduct);

module.exports = router
