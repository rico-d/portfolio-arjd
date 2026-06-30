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
const path = require('path')

// Middleware - Configure CORS for both local development and Azure deployment
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  process.env.FRONTEND_URL, // Azure deployed frontend URL
].filter(Boolean)

app.use(cors({ 
  origin: (origin, callback) => {
    // Allow requests from allowed origins or if no origin (same-origin requests from Azure)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}))
app.use(express.json())

// Routes
app.use('/api/workers', workerRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.get('/api/health', (_req, res) => {
  try {
    res.json({ status: 'ok', timestamp: new Date().toISOString() })
  } catch (err) {
    console.error('Health check error:', err)
    res.status(500).json({ status: 'error', message: err.message })
  }
})

// Serve static files from dist folder (production build)
app.use(express.static(path.join(__dirname, '../dist')))

// SPA fallback – serve index.html for all non-API routes
app.use((req, res) => {
  // Only serve index.html for non-API routes
  if (!req.path.startsWith('/api/')) {
    res.sendFile(path.join(__dirname, '../dist/index.html'))
  }
})

// Global error handler
app.use((err, req, res, next) => {
  console.error('Middleware error:', err)
  res.status(500).json({ 
    status: 'error', 
    message: err.message,
    path: req.path,
    method: req.method
  })
})

// Connect to MongoDB (uses MongoMemoryServer if no local instance is available)
async function startServer() {
  let mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI

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
