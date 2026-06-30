import { useNavigate } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Avatar,
  Chip,
  Grid,
  IconButton,
  Divider,
  Stack,
  Paper,
} from '@mui/material'
import {
  GitHub,
  LinkedIn,
  Email,
  Code,
  Work,
  Person,
  People,
  OpenInNew,
  ShoppingCart,
} from '@mui/icons-material'
import Bio from '../components/Bio'

const skills = [
  'React', 'TypeScript', 'JavaScript', 'Node.js',
  'HTML5', 'CSS3', 'Material UI', 'Git',
  'REST APIs', 'SQL', 'Python', 'Vite', '.NET Core', 'MongoDB', 'Express.js', 'Next.js',
  'C#', 'Azure', 'Docker', 'Kubernetes', 'Jest', 'Redux', 'Sass',
]

const portfolioSamples = [
  {
    id: 'worker-management',
    title: 'Worker Management System',
    description: 'A full CRUD application built with React, Node.js, Express, and MongoDB. Manage workers with sorting, filtering, pagination, and real-time updates.',
    icon: 'People',
    tags: ['Table', 'CRUD', 'REST API', 'MongoDB'],
    route: '/tables',
    buttonLabel: 'Open Sample',
  },
  {
    id: 'ecommerce',
    title: 'Full-Stack E-Commerce Platform',
    description: 'Product catalog, shopping cart, checkout with payment integration (Stripe/PayPal), and an admin dashboard for managing inventory and orders.',
    icon: 'ShoppingCart',
    tags: ['User Roles', 'Payment APIs', 'Complex Data Modeling', 'CRUD', 'REST API', 'MongoDB'],
    route: '/ecommerce',
    buttonLabel: 'Open E-Commerce Platform',
  },
]

export default function Home() {
  const navigate = useNavigate()

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const iconMap: { [key: string]: React.ReactNode } = {
    People: <People sx={{ fontSize: 48, color: '#1565c0' }} />,
    ShoppingCart: <ShoppingCart sx={{ fontSize: 48, color: '#1565c0' }} />,
  }

  return (
    <Box sx={{ bgcolor: '#0a0a0a', minHeight: '100vh', color: '#fff' }}>

      {/* Navbar */}
      <AppBar position="sticky" sx={{ bgcolor: '#111', boxShadow: 'none', borderBottom: '1px solid #222' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" fontWeight={700} sx={{ color: '#90caf9' }}>
            Rico.dev
          </Typography>
          <Stack direction="row" spacing={1}>
            {['about', 'bio', 'skills', 'portfolio', 'contact'].map((section) => (
              <Button key={section} sx={{ color: '#ccc', textTransform: 'capitalize' }}
                onClick={() => scrollTo(section)}>
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Button>
            ))}
            <Button
              sx={{ color: '#90caf9', textTransform: 'capitalize', fontWeight: 700 }}
              onClick={() => navigate('/tables')}
            >
              Tables
            </Button>
            <Button
              sx={{ color: '#90caf9', textTransform: 'capitalize', fontWeight: 700 }}
              onClick={() => navigate('/ecommerce')}
            >
              E-Commerce
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Hero / Profile */}
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #0a0a0a 60%, #0d1b2a 100%)',
        }}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 3, lg: 8 } }}>
          <Grid container spacing={6} alignItems="center" justifyContent="center">
            <Grid size={{ xs: 12, lg: 'auto' }} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Avatar
                sx={{
                  width: { xs: 140, lg: 180 },
                  height: { xs: 140, lg: 180 },
                  bgcolor: '#1565c0',
                  fontSize: { xs: 56, lg: 72 },
                  border: '4px solid #90caf9',
                  boxShadow: '0 0 32px #1565c088',
                }}
              >
                R
              </Avatar>
            </Grid>
            <Grid size={{ xs: 12, lg: 'grow' }}>
              <Stack spacing={3} alignItems={{ xs: 'center', lg: 'flex-start' }} textAlign={{ xs: 'center', lg: 'left' }}>
                <Box>
                  <Typography variant="h3" fontWeight={800} gutterBottom sx={{ fontSize: { xs: '2rem', md: '2.5rem', xl: '3.5rem' } }}>
                    Hi, I'm <Box component="span" sx={{ color: '#90caf9' }}>Rico</Box>
                  </Typography>
                  <Typography variant="h5" sx={{ color: '#aaa', fontSize: { xs: '1.1rem', xl: '1.5rem' } }} gutterBottom>
                    Full-Stack Developer
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#888', maxWidth: 560, mt: 1, fontSize: { xl: '1.1rem' } }}>
                    I build clean, performant, and user-friendly web applications.
                    Passionate about modern technologies and great user experiences.
                  </Typography>
                </Box>
                <Stack direction="row" spacing={2}>
                  <IconButton href="https://github.com/rico-d" target="_blank" sx={{ color: '#fff', border: '1px solid #333' }}>
                    <GitHub />
                  </IconButton>
                  <IconButton href="https://www.linkedin.com/in/alberto-rico-desalisa-4a154a84/" target="_blank" sx={{ color: '#0a66c2', border: '1px solid #333' }}>
                    <LinkedIn />
                  </IconButton>
                  <IconButton href="mailto:ricodesalisa@gmail.com" sx={{ color: '#ea4335', border: '1px solid #333' }}>
                    <Email />
                  </IconButton>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Button variant="contained" sx={{ bgcolor: '#1565c0', borderRadius: 2, px: 4 }}
                    onClick={() => scrollTo('portfolio')}>
                    View Portfolio
                  </Button>
                  <Button variant="outlined" sx={{ borderColor: '#444', color: '#ccc', borderRadius: 2, px: 4 }}
                    onClick={() => scrollTo('contact')}>
                    Contact Me
                  </Button>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* About */}
      <Box id="about" sx={{ py: 10, bgcolor: '#111' }}>
        <Container maxWidth="xl" sx={{ px: { xs: 3, lg: 8 } }}>
          <Stack direction="row" alignItems="center" spacing={1} mb={4}>
            <Person sx={{ color: '#90caf9' }} />
            <Typography variant="h4" fontWeight={700}>About Me</Typography>
          </Stack>
          <Divider sx={{ borderColor: '#222', mb: 4 }} />
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 7, xl: 8 }}>
              <Typography variant="body1" sx={{ color: '#bbb', lineHeight: 1.9, fontSize: { xl: '1.1rem' } }}>
                I'm a passionate full-stack developer with experience building modern web applications.
                I enjoy turning complex problems into simple, beautiful, and intuitive designs.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 5, xl: 4 }}>
              <Stack spacing={2}>
                {[
                  { label: 'Name', value: 'Rico' },
                  { label: 'Role', value: 'Full-Stack Developer' },
                  { label: 'Location', value: 'Pasig City, Philippines' },
                  { label: 'Email', value: 'ricodesalisa@gmail.com' },
                ].map(({ label, value }) => (
                  <Paper key={label} sx={{ p: 2, bgcolor: '#1a1a1a', border: '1px solid #222', borderRadius: 2 }}>
                    <Typography variant="caption" sx={{ color: '#90caf9' }}>{label}</Typography>
                    <Typography variant="body1" sx={{ color: '#fff' }}>{value}</Typography>
                  </Paper>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Bio / CV */}
      <Bio />

      {/* Skills */}
      <Box id="skills" sx={{ py: 10, bgcolor: '#0a0a0a' }}>
        <Container maxWidth="xl" sx={{ px: { xs: 3, lg: 8 } }}>
          <Stack direction="row" alignItems="center" spacing={1} mb={4}>
            <Code sx={{ color: '#90caf9' }} />
            <Typography variant="h4" fontWeight={700}>Skills</Typography>
          </Stack>
          <Divider sx={{ borderColor: '#222', mb: 4 }} />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
            {skills.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                sx={{
                  bgcolor: '#1a237e22',
                  color: '#90caf9',
                  border: '1px solid #1565c0',
                  fontWeight: 600,
                  fontSize: 14,
                  px: 1,
                }}
              />
            ))}
          </Box>
        </Container>
      </Box>

    

      {/* Portfolio Samples */}
      <Box id="portfolio" sx={{ py: 10, bgcolor: '#0a0a0a' }}>
        <Container maxWidth="xl" sx={{ px: { xs: 3, lg: 8 } }}>
          <Stack direction="row" alignItems="center" spacing={1} mb={4}>
            <Work sx={{ color: '#90caf9' }} />
            <Typography variant="h4" fontWeight={700}>Portfolio Samples</Typography>
          </Stack>
          <Divider sx={{ borderColor: '#222', mb: 4 }} />
          <Grid container spacing={4}>
            {portfolioSamples.map((sample) => (
              <Grid key={sample.id} size={{ xs: 12, md: 6 }}>
                <Paper sx={{ p: 4, bgcolor: '#1a1a1a', border: '1px solid #222', borderRadius: 3, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ mb: 2, alignSelf: 'center' }}>
                    {iconMap[sample.icon]}
                  </Box>
                  <Typography variant="h6" fontWeight={700} gutterBottom color="#90caf9">
                    {sample.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#999', mb: 3, flex: 1 }}>
                    {sample.description}
                  </Typography>
                  {sample.tags.length > 0 && (
                    <Stack direction="row" spacing={1} justifyContent="center" mb={3} flexWrap="wrap" useFlexGap>
                      {sample.tags.map((tag) => (
                        <Chip key={tag} label={tag} size="small" sx={{ bgcolor: '#0d1b2a', color: '#90caf9', border: '1px solid #1565c0' }} />
                      ))}
                    </Stack>
                  )}
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<OpenInNew />}
                    onClick={() => navigate(sample.route)}
                    sx={{
                      bgcolor: '#1565c0',
                      textTransform: 'none',
                      borderRadius: 2,
                      px: 5,
                      py: 1.5,
                      fontSize: 16,
                      fontWeight: 600,
                      '&:hover': { bgcolor: '#1976d2' },
                    }}
                  >
                    {sample.buttonLabel}
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Contact */}
      <Box id="contact" sx={{ py: 10, bgcolor: '#111' }}>
        <Container maxWidth="md" sx={{ px: { xs: 3 } }}>
          <Stack direction="row" alignItems="center" spacing={1} mb={4}>
            <Email sx={{ color: '#90caf9' }} />
            <Typography variant="h4" fontWeight={700}>Contact</Typography>
          </Stack>
          <Divider sx={{ borderColor: '#222', mb: 4 }} />
          <Paper sx={{ p: 4, bgcolor: '#1a1a1a', border: '1px solid #222', borderRadius: 3, textAlign: 'center' }}>
            <Typography variant="body1" sx={{ color: '#aaa', mb: 3 }}>
              I'm currently open to new opportunities. Whether you have a question or just want to say hi, feel free to reach out!
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button
                variant="contained"
                startIcon={<Email />}
                href="mailto:ricodesalisa@gmail.com"
                sx={{ bgcolor: '#1565c0', borderRadius: 2, px: 4, textTransform: 'none' }}
              >
                Send Email
              </Button>
              <Button
                variant="outlined"
                startIcon={<LinkedIn />}
                href="https://www.linkedin.com/in/alberto-rico-desalisa-4a154a84/"
                target="_blank"
                sx={{ borderColor: '#0a66c2', color: '#0a66c2', borderRadius: 2, px: 4, textTransform: 'none' }}
              >
                LinkedIn
              </Button>
            </Stack>
          </Paper>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ py: 3, bgcolor: '#111', borderTop: '1px solid #222', textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: '#555' }}>
          © {new Date().getFullYear()} Rico. Built with React + TypeScript + Material UI.
        </Typography>
      </Box>

    </Box>
  )
}
