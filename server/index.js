require('dotenv').config({ path: require('path').join(__dirname, '.env') })
const express   = require('express')
const mongoose  = require('mongoose')
const cors      = require('cors')
const { MongoMemoryServer } = require('mongodb-memory-server')
const workerRoutes  = require('./routes/workers')
const productRoutes = require('./routes/products')
const orderRoutes   = require('./routes/orders')

const app  = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:5174'] }))
app.use(express.json())

// Routes
app.use('/api/workers', workerRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))

// Connect to MongoDB (uses MongoMemoryServer if no local instance is available)
async function startServer() {
  let mongoUri = process.env.MONGO_URI

  try {
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 3000 })
    console.log(`MongoDB connected → ${mongoUri}`)
  } catch {
    console.log('Local MongoDB not found — starting MongoMemoryServer…')
    const memServer = await MongoMemoryServer.create()
    mongoUri = memServer.getUri()
    await mongoose.connect(mongoUri)
    console.log(`MongoMemoryServer running → ${mongoUri}`)
    console.log('⚠  Data is in-memory and will reset on server restart.')
    console.log('   Set MONGO_URI in server/.env to use a persistent database.')

    // Seed initial data on first run with in-memory DB
    const Worker = require('./models/Worker')
    const count = await Worker.countDocuments()
    if (count === 0) {
      const SEED = require('./seed.data')
      await Worker.insertMany(SEED)
      console.log(`Seeded ${SEED.length} workers into memory DB`)
    }

    const Product = require('./models/Product')
    const productCount = await Product.countDocuments()
    if (productCount === 0) {
      const PRODUCT_SEED = require('./seed.products')
      await Product.insertMany(PRODUCT_SEED)
      console.log(`Seeded ${PRODUCT_SEED.length} products into memory DB`)
    }
  }

  app.listen(PORT, () => console.log(`Server running → http://localhost:${PORT}`))
}

startServer().catch((err) => { console.error(err); process.exit(1) })
