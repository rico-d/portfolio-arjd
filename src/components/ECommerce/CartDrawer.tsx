import {
  Drawer, Typography, Button, Box, Stack, Chip, IconButton, Avatar,
} from '@mui/material'
import {
  ShoppingCart, Add, Remove, Delete, Close, Payment,
} from '@mui/icons-material'
import { LocalMallOutlined } from '@mui/icons-material'
import type { CartItem } from './types'

export default function CartDrawer({ open, items, onClose, onUpdate, onRemove, onCheckout }:
  { open: boolean; items: CartItem[]; onClose: () => void; onUpdate: (id: string, qty: number) => void; onRemove: (id: string) => void; onCheckout: () => void }) {
  const total = items.reduce((s, i) => s + i.product.price * i.quantity, 0)

  return (
    <Drawer anchor="right" open={open} onClose={onClose} className="cart-drawer"
      PaperProps={{ sx: { width: { xs: '100%', sm: 420 }, bgcolor: '#fff' } }}>
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box className="cart-header">
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" alignItems="center" spacing={1}>
              <ShoppingCart sx={{ color: '#4f46e5' }} />
              <Typography className="cart-title">Shopping Cart</Typography>
              <Chip label={items.length} size="small" sx={{ bgcolor: '#4f46e5', color: '#fff', fontWeight: 700, fontSize: 12 }} />
            </Stack>
            <IconButton onClick={onClose} sx={{ color: '#9ca3af' }}><Close /></IconButton>
          </Stack>
        </Box>

        {items.length === 0 ? (
          <Box className="cart-empty" sx={{ flex: 1 }}>
            <LocalMallOutlined sx={{ fontSize: 64, color: '#d1d5db' }} />
            <Typography sx={{ color: '#9ca3af', fontWeight: 500 }}>Your cart is empty</Typography>
          </Box>
        ) : (
          <>
            <Box className="cart-items">
              {items.map((item) => (
                <Box key={item.product._id} className="cart-item">
                  <Avatar variant="rounded" src={item.product.image} className="cart-item-image"
                    sx={{ width: 64, height: 64 }} />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography className="cart-item-name" noWrap>{item.product.name}</Typography>
                    <Typography className="cart-item-price">${item.product.price.toFixed(2)}</Typography>
                    <Stack direction="row" alignItems="center" spacing={1} mt={0.5}>
                      <IconButton size="small" className="qty-btn"
                        onClick={() => onUpdate(item.product._id, item.quantity - 1)}
                        disabled={item.quantity <= 1}>
                        <Remove sx={{ fontSize: 16 }} />
                      </IconButton>
                      <Typography variant="body2" sx={{ minWidth: 24, textAlign: 'center', fontWeight: 700 }}>
                        {item.quantity}
                      </Typography>
                      <IconButton size="small" className="qty-btn"
                        onClick={() => onUpdate(item.product._id, item.quantity + 1)}
                        disabled={item.quantity >= item.product.stock}>
                        <Add sx={{ fontSize: 16 }} />
                      </IconButton>
                      <Box sx={{ flex: 1 }} />
                      <IconButton size="small" onClick={() => onRemove(item.product._id)}
                        sx={{ color: '#ef4444', '&:hover': { bgcolor: 'rgba(239,68,68,0.08)' } }}>
                        <Delete sx={{ fontSize: 18 }} />
                      </IconButton>
                    </Stack>
                  </Box>
                </Box>
              ))}
            </Box>

            <Box className="cart-footer">
              <Stack direction="row" justifyContent="space-between" mb={2}>
                <Typography className="cart-total-label">Total</Typography>
                <Typography className="cart-total-value">${total.toFixed(2)}</Typography>
              </Stack>
              <Button fullWidth variant="contained" className="checkout-btn"
                startIcon={<Payment />} onClick={onCheckout}>
                Proceed to Checkout
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  )
}
