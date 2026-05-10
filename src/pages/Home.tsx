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
  Card,
  CardContent,
  CardActions,
  IconButton,
  Divider,
  Stack,
  Paper,
  Link,
} from '@mui/material'
import {
  GitHub,
  LinkedIn,
  Email,
  Code,
  Work,
  Person,
  Launch,
  People,
  OpenInNew,
  ShoppingCart,
} from '@mui/icons-material'
import Bio from '../components/Bio'

const skills = [
  'React', 'TypeScript', 'JavaScript', 'Node.js',
  'HTML5', 'CSS3', 'Material UI', 'Git',
  'REST APIs', 'SQL', 'Python', 'Vite',
]

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with product management, shopping cart, and payment integration.',
    tags: ['React', 'Node.js', 'MongoDB'],
    github: '#',
    live: '#',
  },
]

export default function Home() {
  const navigate = useNavigate()

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
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
            {['about', 'bio', 'skills', 'projects', 'contact'].map((section) => (
              <Button key={section} sx={{ color: '#ccc', textTransform: 'capitalize' }}
                onClick={() => scrollTo(section)}>
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Button>
            ))}
            <Button
              sx={{ color: '#90caf9', textTransform: 'capitalize', fontWeight: 700 }}
              onClick={() => navigate('/portfolio')}
            >
              Portfolio
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
                  <IconButton href="https://github.com" target="_blank" sx={{ color: '#fff', border: '1px solid #333' }}>
                    <GitHub />
                  </IconButton>
                  <IconButton href="https://linkedin.com" target="_blank" sx={{ color: '#0a66c2', border: '1px solid #333' }}>
                    <LinkedIn />
                  </IconButton>
                  <IconButton href="mailto:rico@email.com" sx={{ color: '#ea4335', border: '1px solid #333' }}>
                    <Email />
                  </IconButton>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Button variant="contained" sx={{ bgcolor: '#1565c0', borderRadius: 2, px: 4 }}
                    onClick={() => scrollTo('projects')}>
                    View Projects
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

      {/* Projects */}
      <Box id="projects" sx={{ py: 10, bgcolor: '#111' }}>
        <Container maxWidth="xl" sx={{ px: { xs: 3, lg: 8 } }}>
          <Stack direction="row" alignItems="center" spacing={1} mb={4}>
            <Work sx={{ color: '#90caf9' }} />
            <Typography variant="h4" fontWeight={700}>Projects</Typography>
          </Stack>
          <Divider sx={{ borderColor: '#222', mb: 4 }} />
          <Grid container spacing={3}>
            {projects.map((project) => (
              <Grid key={project.title} size={{ xs: 12, sm: 6, md: 4, xl: 3 }}>
                <Card sx={{
                  bgcolor: '#1a1a1a',
                  border: '1px solid #222',
                  borderRadius: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'border-color 0.2s',
                  '&:hover': { borderColor: '#1565c0' },
                }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" fontWeight={700} gutterBottom sx={{ color: '#fff' }}>
                      {project.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#999', mb: 2 }}>
                      {project.description}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
                      {project.tags.map((tag) => (
                        <Chip key={tag} label={tag} size="small" sx={{ bgcolor: '#0d1b2a', color: '#90caf9', fontSize: 11 }} />
                      ))}
                    </Box>
                  </CardContent>
                  <CardActions sx={{ px: 2, pb: 2, gap: 1 }}>
                    <Link href={project.github} target="_blank" underline="none">
                      <Button startIcon={<GitHub />} size="small" sx={{ color: '#ccc', textTransform: 'none' }}>Code</Button>
                    </Link>
                    <Link href={project.live} target="_blank" underline="none">
                      <Button startIcon={<Launch />} size="small" sx={{ color: '#90caf9', textTransform: 'none' }}>Live</Button>
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Portfolio – Link to separate page */}
      <Box id="portfolio" sx={{ py: 10, bgcolor: '#0a0a0a' }}>
        <Container maxWidth="xl" sx={{ px: { xs: 3, lg: 8 } }}>
          <Stack direction="row" alignItems="center" spacing={1} mb={4}>
            <People sx={{ color: '#90caf9' }} />
            <Typography variant="h4" fontWeight={700}>Portfolio</Typography>
          </Stack>
          <Divider sx={{ borderColor: '#222', mb: 4 }} />
          <Paper sx={{ p: 4, bgcolor: '#1a1a1a', border: '1px solid #222', borderRadius: 3, textAlign: 'center' }}>
            <People sx={{ fontSize: 48, color: '#1565c0', mb: 2 }} />
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Worker Management System
            </Typography>
            <Typography variant="body1" sx={{ color: '#999', mb: 3, maxWidth: 480, mx: 'auto' }}>
              A full CRUD application built with React, Node.js, Express, and MongoDB.
              Manage workers with sorting, filtering, pagination, and real-time updates.
            </Typography>
            <Button
              variant="contained"
              size="large"
              endIcon={<OpenInNew />}
              onClick={() => navigate('/portfolio')}
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
              Open Portfolio Dashboard
            </Button>
          </Paper>
        </Container>
      </Box>

      {/* E-Commerce Platform – Link to separate page */}
      <Box id="ecommerce" sx={{ py: 10, bgcolor: '#111' }}>
        <Container maxWidth="xl" sx={{ px: { xs: 3, lg: 8 } }}>
          <Stack direction="row" alignItems="center" spacing={1} mb={4}>
            <ShoppingCart sx={{ color: '#90caf9' }} />
            <Typography variant="h4" fontWeight={700}>E-Commerce Platform</Typography>
          </Stack>
          <Divider sx={{ borderColor: '#222', mb: 4 }} />
          <Paper sx={{ p: 4, bgcolor: '#1a1a1a', border: '1px solid #222', borderRadius: 3, textAlign: 'center' }}>
            <ShoppingCart sx={{ fontSize: 48, color: '#1565c0', mb: 2 }} />
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Full-Stack E-Commerce Platform
            </Typography>
            <Typography variant="body1" sx={{ color: '#999', mb: 2, maxWidth: 560, mx: 'auto' }}>
              Product catalog, shopping cart, checkout with payment integration (Stripe/PayPal),
              and an admin dashboard for managing inventory and orders.
            </Typography>
            <Stack direction="row" spacing={1} justifyContent="center" mb={3} flexWrap="wrap" useFlexGap>
              {['User Roles', 'Payment APIs', 'Complex Data Modeling', 'CRUD', 'REST API', 'MongoDB'].map((tag) => (
                <Chip key={tag} label={tag} size="small" sx={{ bgcolor: '#0d1b2a', color: '#90caf9', border: '1px solid #1565c0' }} />
              ))}
            </Stack>
            <Button
              variant="contained"
              size="large"
              endIcon={<OpenInNew />}
              onClick={() => navigate('/ecommerce')}
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
              Open E-Commerce Platform
            </Button>
          </Paper>
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
                href="mailto:rico@email.com"
                sx={{ bgcolor: '#1565c0', borderRadius: 2, px: 4, textTransform: 'none' }}
              >
                Send Email
              </Button>
              <Button
                variant="outlined"
                startIcon={<LinkedIn />}
                href="https://linkedin.com"
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
