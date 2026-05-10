const express = require('express')
const router  = express.Router()
const Worker  = require('../models/Worker')

// GET all workers
router.get('/', async (req, res) => {
  try {
    const workers = await Worker.find().sort({ createdAt: -1 })
    res.json(workers)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// GET single worker
router.get('/:id', async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id)
    if (!worker) return res.status(404).json({ message: 'Worker not found' })
    res.json(worker)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// POST create worker
router.post('/', async (req, res) => {
  try {
    const worker = new Worker(req.body)
    const saved = await worker.save()
    res.status(201).json(saved)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// PUT update worker
router.put('/:id', async (req, res) => {
  try {
    const updated = await Worker.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: 'after', runValidators: true }
    )
    if (!updated) return res.status(404).json({ message: 'Worker not found' })
    res.json(updated)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// DELETE worker
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Worker.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ message: 'Worker not found' })
    res.json({ message: 'Worker deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
