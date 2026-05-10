import {
  AppBar, Toolbar, Typography, Button, Box, Stack,
  IconButton, Chip, Badge, Tooltip, Avatar,
  Menu, MenuItem, ListItemIcon, ListItemText,
} from '@mui/material'
import { ArrowBack, ShoppingCart, Login, Logout } from '@mui/icons-material'
import type { SimulatedUser } from './types'
import {
  BRAND_NAME, BRAND_TAG, BTN_SIGN_IN, BTN_LOGOUT, BTN_BACK_HOME, TOOLTIP_CART,
} from './utils/constants'

interface NavbarProps {
  user: SimulatedUser | null
  cartCount: number
  userMenuAnchor: HTMLElement | null
  onCartOpen: () => void
  onLoginOpen: () => void
  onLogout: () => void
  onUserMenuOpen: (e: React.MouseEvent<HTMLElement>) => void
  onUserMenuClose: () => void
  onNavigateHome: () => void
}

export default function Navbar({
  user, cartCount, userMenuAnchor,
  onCartOpen, onLoginOpen, onLogout,
  onUserMenuOpen, onUserMenuClose, onNavigateHome,
}: NavbarProps) {
  return (
    <AppBar position="sticky" className="ecom-navbar" elevation={0}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton onClick={onNavigateHome} sx={{ color: '#4f46e5' }}>
            <ArrowBack />
          </IconButton>
          <Typography className="navbar-brand" onClick={onNavigateHome}>
            {BRAND_NAME}
          </Typography>
          <Chip label={BRAND_TAG} size="small" className="navbar-tag" />
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          {(!user || user.role === 'customer') && (
            <Tooltip title={TOOLTIP_CART}>
              <IconButton className="navbar-badge" onClick={onCartOpen}>
                <Badge badgeContent={cartCount} color="error">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </Tooltip>
          )}

          {user ? (
            <>
              <Chip
                avatar={<Avatar sx={{ bgcolor: user.role === 'admin' ? '#f59e0b' : '#4f46e5', width: 28, height: 28, fontSize: 14 }}>{user.avatar}</Avatar>}
                label={user.name}
                onClick={onUserMenuOpen}
                className="user-chip"
                sx={{ fontWeight: 600, cursor: 'pointer', bgcolor: '#fff', border: '1.5px solid #e5e7eb',
                  '&:hover': { borderColor: '#4f46e5' } }}
              />
              <Menu
                anchorEl={userMenuAnchor}
                open={Boolean(userMenuAnchor)}
                onClose={onUserMenuClose}
                PaperProps={{ sx: { borderRadius: '12px', minWidth: 180, mt: 1, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' } }}
              >
                <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid #e5e7eb' }}>
                  <Typography variant="body2" fontWeight={700} sx={{ color: '#111827' }}>{user.name}</Typography>
                  <Typography variant="caption" sx={{ color: '#9ca3af' }}>{user.email}</Typography>
                  <Chip label={user.role} size="small" sx={{ ml: 1, fontWeight: 700, fontSize: 10,
                    bgcolor: user.role === 'admin' ? 'rgba(245,158,11,0.1)' : 'rgba(79,70,229,0.1)',
                    color: user.role === 'admin' ? '#d97706' : '#4f46e5' }} />
                </Box>
                <MenuItem onClick={onLogout} sx={{ py: 1.5 }}>
                  <ListItemIcon><Logout fontSize="small" sx={{ color: '#ef4444' }} /></ListItemIcon>
                  <ListItemText primaryTypographyProps={{ fontWeight: 600, fontSize: '0.88rem' }}>{BTN_LOGOUT}</ListItemText>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              variant="contained"
              startIcon={<Login />}
              onClick={onLoginOpen}
              className="login-btn"
            >
              {BTN_SIGN_IN}
            </Button>
          )}

          <Button variant="outlined" onClick={onNavigateHome}
            sx={{ borderColor: '#e5e7eb', color: '#4b5563', textTransform: 'none', borderRadius: '8px',
              '&:hover': { borderColor: '#4f46e5', color: '#4f46e5' } }}>
            {BTN_BACK_HOME}
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}
