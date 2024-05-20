const Product = require('../models/Product')
const mongoose = require('mongoose');


exports.createProduct = async (req, res) =>
{
    try
    {
        const { name, description, price } = req.body
        const product = new Product({ name, description, price })
        await product.save()
        res.status(201).json({ message: 'Product created successfully' })
    } catch (error)
    {
        res.status(400).json({ error: 'Invalid data' })
    }
}

exports.deleteProduct = async (req, res) =>
{
    try
    {
        const productId = req.params.id

        // بررسی صحت شناسه محصول
        if (!mongoose.isValidObjectId(productId))
        {
            return res.status(400).json({ error: 'Invalid product ID' })
        }

        // بررسی وجود محصول با این id
        const product = await Product.findById(productId)
        if (!product)
        {
            return res.status(404).json({ error: 'Product not found' })
        }

        // حذف محصول
        await Product.findByIdAndDelete(productId)
        res.json({ message: 'Product deleted successfully' })
    } catch (error)
    {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' })
    }
}


exports.editProduct = async (req, res) =>
{
    try
    {
        const { productId } = req.params
        const { name, description, price } = req.body

        const product = await Product.findById(productId)
        if (!product)
        {
            return res.status(404).json({ error: 'Product not found' })
        }

        await Product.findByIdAndUpdate(productId, { name, description, price })

        res.status(200).json({ message: 'Product information updated successfully' })
    } catch (error)
    {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' })
    }
}
