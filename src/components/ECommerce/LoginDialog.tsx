import {
  Dialog, DialogContent, Typography, Box, Stack, Paper, Avatar, IconButton,
} from '@mui/material'
import { Login, Close, Person, AdminPanelSettings } from '@mui/icons-material'

export default function LoginDialog({ open, onClose, onLogin }: { open: boolean; onClose: () => void; onLogin: (role: 'customer' | 'admin') => void }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth className="login-dialog"
      PaperProps={{ sx: { borderRadius: '16px', overflow: 'hidden' } }}>
      <Box className="login-header">
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" alignItems="center" spacing={1}>
            <Login />
            <Typography fontWeight={700} fontSize="1.1rem">Sign In</Typography>
          </Stack>
          <IconButton onClick={onClose} size="small" sx={{ color: 'rgba(255,255,255,0.7)' }}>
            <Close fontSize="small" />
          </IconButton>
        </Stack>
      </Box>
      <DialogContent sx={{ pt: 3, pb: 3 }}>
        <Typography variant="body2" sx={{ color: '#6b7280', mb: 3, textAlign: 'center' }}>
          Choose a role to simulate the login experience
        </Typography>
        <Stack spacing={2}>
          <Paper
            className="login-role-card login-role-card--customer"
            elevation={0}
            onClick={() => onLogin('customer')}
            sx={{ cursor: 'pointer' }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar sx={{ bgcolor: '#4f46e5', width: 48, height: 48 }}>
                <Person />
              </Avatar>
              <Box>
                <Typography fontWeight={700} sx={{ color: '#111827' }}>Customer</Typography>
                <Typography variant="caption" sx={{ color: '#6b7280' }}>
                  Browse products, manage cart &amp; view your orders
                </Typography>
              </Box>
            </Stack>
          </Paper>
          <Paper
            className="login-role-card login-role-card--admin"
            elevation={0}
            onClick={() => onLogin('admin')}
            sx={{ cursor: 'pointer' }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar sx={{ bgcolor: '#f59e0b', width: 48, height: 48 }}>
                <AdminPanelSettings />
              </Avatar>
              <Box>
                <Typography fontWeight={700} sx={{ color: '#111827' }}>Admin</Typography>
                <Typography variant="caption" sx={{ color: '#6b7280' }}>
                  Manage inventory, orders &amp; view dashboard
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}
