const mongoose = require('mongoose')

const workerSchema = new mongoose.Schema(
  {
    name:       { type: String, required: true, trim: true },
    role:       { type: String, required: true, trim: true },
    department: { type: String, required: true, trim: true },
    location:   { type: String, required: true, trim: true },
    status:     { type: String, enum: ['Active', 'Inactive', 'On Leave'], required: true },
    salary:     { type: Number, required: true, min: 0 },
    joinDate:   { type: String, required: true },
    email:      { type: String, required: true, trim: true, lowercase: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Worker', workerSchema)
