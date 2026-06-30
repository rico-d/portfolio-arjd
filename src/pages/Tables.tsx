import { useNavigate } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Divider,
  Stack,
  IconButton,
} from '@mui/material'
import { ArrowBack, People } from '@mui/icons-material'
import WorkerTable from '../components/WorkerTable'

export default function Tables() {
  const navigate = useNavigate()

  return (
    <Box sx={{ bgcolor: '#0a0a0a', minHeight: '100vh', color: '#fff' }}>

      {/* Navbar */}
      <AppBar position="sticky" sx={{ bgcolor: '#111', boxShadow: 'none', borderBottom: '1px solid #222' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton onClick={() => navigate('/')} sx={{ color: '#90caf9' }}>
              <ArrowBack />
            </IconButton>
            <Typography variant="h6" fontWeight={700} sx={{ color: '#90caf9', cursor: 'pointer' }}
              onClick={() => navigate('/')}>
              Rico.dev
            </Typography>
          </Stack>
          <Button
            variant="outlined"
            onClick={() => navigate('/')}
            sx={{ borderColor: '#333', color: '#ccc', textTransform: 'none', borderRadius: 2 }}
          >
            Back to Home
          </Button>
        </Toolbar>
      </AppBar>

      {/* Workers Content */}
      <Box sx={{ py: 6 }}>
        <Container maxWidth="xl" sx={{ px: { xs: 3, lg: 8 } }}>
          <Stack direction="row" alignItems="center" spacing={1} mb={4}>
            <People sx={{ color: '#90caf9' }} />
            <Typography variant="h4" fontWeight={700}>Portfolio</Typography>
          </Stack>
          <Divider sx={{ borderColor: '#222', mb: 4 }} />
          <WorkerTable />
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
