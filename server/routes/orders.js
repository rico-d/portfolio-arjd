const express = require('express')
const router  = express.Router()
const Order   = require('../models/Order')
const Product = require('../models/Product')

// GET all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 })
    res.json(orders)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// GET single order
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
    if (!order) return res.status(404).json({ message: 'Order not found' })
    res.json(order)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// POST create order (checkout) — decrements stock
router.post('/', async (req, res) => {
  try {
    const { customerName, customerEmail, items, paymentMethod, shippingAddress } = req.body

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Order must contain at least one item' })
    }

    // Validate stock & build order items
    const orderItems = []
    let totalAmount = 0

    for (const item of items) {
      const product = await Product.findById(item.product)
      if (!product) return res.status(404).json({ message: `Product ${item.product} not found` })
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product.name}` })
      }

      product.stock -= item.quantity
      await product.save()

      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        image: product.image,
      })
      totalAmount += product.price * item.quantity
    }

    const order = new Order({
      customerName,
      customerEmail,
      items: orderItems,
      totalAmount,
      paymentMethod: paymentMethod || 'Stripe',
      shippingAddress: shippingAddress || {},
    })

    const saved = await order.save()
    res.status(201).json(saved)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// PUT update order status
router.put('/:id', async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: 'after', runValidators: true }
    )
    if (!updated) return res.status(404).json({ message: 'Order not found' })
    res.json(updated)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// DELETE order
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ message: 'Order not found' })
    res.json({ message: 'Order deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
