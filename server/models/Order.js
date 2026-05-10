const mongoose = require('mongoose')

const orderItemSchema = new mongoose.Schema(
  {
    product:  { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name:     { type: String, required: true },
    price:    { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
    image:    { type: String, default: '' },
  },
  { _id: false }
)

const orderSchema = new mongoose.Schema(
  {
    customerName:  { type: String, required: true, trim: true },
    customerEmail: { type: String, required: true, trim: true, lowercase: true },
    items:         { type: [orderItemSchema], required: true },
    totalAmount:   { type: Number, required: true, min: 0 },
    status:        { type: String, enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending' },
    deliveryStatus: { type: String, enum: ['Pending', 'In Progress', 'Shipped Out', 'In Logistics Center', 'Out for Delivery', 'Delivered'], default: 'Pending' },
    paymentMethod: { type: String, enum: ['Stripe', 'PayPal', 'COD'], default: 'Stripe' },
    paymentStatus: { type: String, enum: ['Unpaid', 'Paid', 'Refunded'], default: 'Unpaid' },
    shippingAddress: {
      street:  { type: String, default: '' },
      city:    { type: String, default: '' },
      state:   { type: String, default: '' },
      zip:     { type: String, default: '' },
      country: { type: String, default: '' },
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Order', orderSchema)
