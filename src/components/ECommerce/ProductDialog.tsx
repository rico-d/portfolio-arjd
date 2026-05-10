import { useState, useEffect } from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button,
  Stack, Divider, TextField, MenuItem, Select, FormControl, InputLabel,
  IconButton, CircularProgress,
} from '@mui/material'
import { Close } from '@mui/icons-material'
import type { Product } from './types'
import { lightFieldSx, CATEGORIES } from './types'

export default function ProductDialog({ open, mode, initial, saving, onClose, onSave }:
  { open: boolean; mode: 'add' | 'edit'; initial: Partial<Product>; saving: boolean; onClose: () => void; onSave: (data: Partial<Product>) => void }) {
  const [form, setForm] = useState(initial)
  const set = (f: string, v: string | number) => setForm((p) => ({ ...p, [f]: v }))

  useEffect(() => { setForm(initial) }, [initial])

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth className="product-dialog"
      PaperProps={{ sx: { borderRadius: '16px' } }}>
      <DialogTitle sx={{ pb: 1 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography fontWeight={700} sx={{ color: '#111827' }}>
            {mode === 'add' ? 'Add Product' : 'Edit Product'}
          </Typography>
          <IconButton onClick={onClose} size="small" sx={{ color: '#9ca3af' }}><Close fontSize="small" /></IconButton>
        </Stack>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ pt: 3 }}>
        <Stack spacing={2}>
          <TextField fullWidth label="Name" value={form.name || ''} onChange={(e) => set('name', e.target.value)} sx={lightFieldSx} />
          <TextField fullWidth label="Description" multiline rows={2} value={form.description || ''}
            onChange={(e) => set('description', e.target.value)} sx={lightFieldSx} />
          <Stack direction="row" spacing={2}>
            <TextField fullWidth label="Price" type="number" value={form.price ?? ''}
              onChange={(e) => set('price', +e.target.value)} sx={lightFieldSx} />
            <TextField fullWidth label="Stock" type="number" value={form.stock ?? ''}
              onChange={(e) => set('stock', +e.target.value)} sx={lightFieldSx} />
          </Stack>
          <Stack direction="row" spacing={2}>
            <FormControl fullWidth sx={lightFieldSx}>
              <InputLabel>Category</InputLabel>
              <Select value={form.category || ''} label="Category" onChange={(e) => set('category', e.target.value)}>
                {CATEGORIES.filter((c) => c !== 'All').map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
              </Select>
            </FormControl>
            <TextField fullWidth label="Image URL" value={form.image || ''}
              onChange={(e) => set('image', e.target.value)} sx={lightFieldSx} />
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} sx={{ color: '#6b7280', textTransform: 'none' }}>Cancel</Button>
        <Button variant="contained" onClick={() => onSave(form)} disabled={saving}
          startIcon={saving ? <CircularProgress size={18} /> : undefined}
          className="add-product-btn">
          {saving ? 'Saving…' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
