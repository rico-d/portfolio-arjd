import { useState } from 'react'
import {
  Dialog, DialogContent, DialogActions, Typography, Button, Box, Stack,
  Chip, Divider, TextField, IconButton, CircularProgress,
} from '@mui/material'
import { Payment, Close, CreditCard, AttachMoney, CheckCircle } from '@mui/icons-material'
import type { CartItem, SimulatedUser } from './types'
import { lightFieldSx } from './types'

interface CheckoutDialogProps {
  open: boolean
  items: CartItem[]
  loading: boolean
  user: SimulatedUser | null
  onClose: () => void
  onSubmit: (data: { customerName: string; customerEmail: string; paymentMethod: string; shippingAddress: { street: string; city: string; state: string; zip: string; country: string } }) => void
}

export default function CheckoutDialog({ open, items, loading, user, onClose, onSubmit }: CheckoutDialogProps) {
  const [name, setName] = useState(user?.name ?? '')
  const [email, setEmail] = useState(user?.email ?? '')
  const [paymentMethod, setPaymentMethod] = useState('Stripe')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')
  const [country, setCountry] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const total = items.reduce((s, i) => s + i.product.price * i.quantity, 0)

  const validate = () => {
    const e: Record<string, string> = {}
    if (!name.trim()) e.name = 'Required'
    if (!email.trim()) e.email = 'Required'
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Invalid email'
    if (!street.trim()) e.street = 'Required'
    if (!city.trim()) e.city = 'Required'
    if (!country.trim()) e.country = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = () => {
    if (validate()) {
      onSubmit({
        customerName: name, customerEmail: email, paymentMethod,
        shippingAddress: { street, city, state, zip, country },
      })
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth className="checkout-dialog"
      PaperProps={{ sx: { borderRadius: '16px', overflow: 'hidden' } }}>
      <Box className="checkout-header">
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" alignItems="center" spacing={1}>
            <Payment />
            <Typography fontWeight={700} fontSize="1.1rem">Checkout</Typography>
          </Stack>
          <IconButton onClick={onClose} size="small" sx={{ color: 'rgba(255,255,255,0.7)' }}>
            <Close fontSize="small" />
          </IconButton>
        </Stack>
      </Box>
      <DialogContent sx={{ pt: 3, pb: 1 }}>
        <Stack spacing={2.5}>
          <Typography className="checkout-section-title">Customer Info</Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField fullWidth label="Full Name" value={name} onChange={(e) => setName(e.target.value)}
              error={!!errors.name} helperText={errors.name} sx={lightFieldSx}
              disabled={!!user} />
            <TextField fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email} helperText={errors.email} sx={lightFieldSx}
              disabled={!!user} />
          </Stack>

          <Typography className="checkout-section-title">Shipping Address</Typography>
          <TextField fullWidth label="Street" value={street} onChange={(e) => setStreet(e.target.value)}
            error={!!errors.street} helperText={errors.street} sx={lightFieldSx} />
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField fullWidth label="City" value={city} onChange={(e) => setCity(e.target.value)}
              error={!!errors.city} helperText={errors.city} sx={lightFieldSx} />
            <TextField fullWidth label="State" value={state} onChange={(e) => setState(e.target.value)} sx={lightFieldSx} />
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField fullWidth label="ZIP Code" value={zip} onChange={(e) => setZip(e.target.value)} sx={lightFieldSx} />
            <TextField fullWidth label="Country" value={country} onChange={(e) => setCountry(e.target.value)}
              error={!!errors.country} helperText={errors.country} sx={lightFieldSx} />
          </Stack>

          <Typography className="checkout-section-title">Payment Method</Typography>
          <Stack direction="row" spacing={1}>
            {['Stripe', 'PayPal', 'COD'].map((m) => (
              <Chip key={m} label={m} clickable onClick={() => setPaymentMethod(m)}
                icon={m === 'Stripe' ? <CreditCard /> : m === 'PayPal' ? <Payment /> : <AttachMoney />}
                className={`payment-chip ${paymentMethod === m ? 'payment-chip--active' : ''}`} />
            ))}
          </Stack>

          <Divider />
          <Typography className="checkout-section-title">Order Summary</Typography>
          {items.map((item) => (
            <Box key={item.product._id} className="checkout-summary-item">
              <Typography variant="body2" sx={{ color: '#374151' }}>{item.product.name} x{item.quantity}</Typography>
              <Typography variant="body2" sx={{ color: '#4f46e5', fontWeight: 600 }}>
                ${(item.product.price * item.quantity).toFixed(2)}
              </Typography>
            </Box>
          ))}
          <Divider />
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" fontWeight={800} sx={{ color: '#111827' }}>Total</Typography>
            <Typography className="checkout-total">${total.toFixed(2)}</Typography>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} sx={{ color: '#6b7280', textTransform: 'none' }}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={loading}
          startIcon={loading ? <CircularProgress size={18} /> : <CheckCircle />}
          className="place-order-btn">
          {loading ? 'Processing…' : 'Place Order'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
