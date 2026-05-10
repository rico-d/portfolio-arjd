require('dotenv').config({ path: require('path').join(__dirname, '.env') })
const mongoose = require('mongoose')
const Worker   = require('./models/Worker')

const SEED_WORKERS = [
  { name: 'Alice Reyes',     role: 'Frontend Developer', department: 'Engineering', location: 'Manila',  status: 'Active',   salary: 80000, joinDate: '2022-03-14', email: 'alice@dev.com' },
  { name: 'Ben Cruz',        role: 'Backend Developer',  department: 'Engineering', location: 'Cebu',    status: 'Active',   salary: 85000, joinDate: '2021-07-01', email: 'ben@dev.com' },
  { name: 'Carla Santos',    role: 'UI/UX Designer',     department: 'Design',      location: 'Manila',  status: 'Inactive', salary: 70000, joinDate: '2023-01-20', email: 'carla@dev.com' },
  { name: 'Dan Lim',         role: 'DevOps Engineer',    department: 'Engineering', location: 'Remote',  status: 'Active',   salary: 90000, joinDate: '2020-11-05', email: 'dan@dev.com' },
  { name: 'Eva Torres',      role: 'QA Engineer',        department: 'QA',          location: 'Manila',  status: 'On Leave', salary: 65000, joinDate: '2022-06-18', email: 'eva@dev.com' },
  { name: 'Felix Morales',   role: 'Product Manager',    department: 'Product',     location: 'Davao',   status: 'Active',   salary: 95000, joinDate: '2019-09-12', email: 'felix@dev.com' },
  { name: 'Grace Aquino',    role: 'Data Analyst',       department: 'Analytics',   location: 'Remote',  status: 'Active',   salary: 75000, joinDate: '2023-04-03', email: 'grace@dev.com' },
  { name: 'Hank Villanueva', role: 'Scrum Master',       department: 'Product',     location: 'Cebu',    status: 'Inactive', salary: 80000, joinDate: '2021-02-28', email: 'hank@dev.com' },
  { name: 'Iris Dela Cruz',  role: 'Frontend Developer', department: 'Engineering', location: 'Manila',  status: 'Active',   salary: 78000, joinDate: '2022-10-17', email: 'iris@dev.com' },
  { name: 'Jake Ong',        role: 'Backend Developer',  department: 'Engineering', location: 'Remote',  status: 'On Leave', salary: 87000, joinDate: '2020-05-22', email: 'jake@dev.com' },
  { name: 'Karen Sy',        role: 'HR Specialist',      department: 'HR',          location: 'Manila',  status: 'Active',   salary: 60000, joinDate: '2021-12-01', email: 'karen@dev.com' },
  { name: 'Leo Bautista',    role: 'Security Engineer',  department: 'Engineering', location: 'Davao',   status: 'Active',   salary: 92000, joinDate: '2019-03-08', email: 'leo@dev.com' },
]

async function seed() {
  await mongoose.connect(process.env.MONGO_URI)
  console.log('Connected to MongoDB')
  await Worker.deleteMany({})
  await Worker.insertMany(SEED_WORKERS)
  console.log(`Seeded ${SEED_WORKERS.length} workers`)
  await mongoose.disconnect()
  console.log('Done')
}

seed().catch((err) => { console.error(err); process.exit(1) })
