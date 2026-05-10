import {
  Box, Typography, TextField, InputAdornment, Chip, Grid,
} from '@mui/material'
import { Search } from '@mui/icons-material'
import type { Product } from './types'
import { CATEGORIES, lightFieldSx } from './types'
import {
  SEARCH_PLACEHOLDER, EMPTY_PRODUCTS,
} from './utils/constants'
import ProductCard from './ProductCard'

interface Props {
  search: string
  onSearchChange: (value: string) => void
  category: string
  onCategoryChange: (value: string) => void
  filtered: Product[]
  onAddToCart: (product: Product) => void
}

export default function ProductCatalog({ search, onSearchChange, category, onCategoryChange, filtered, onAddToCart }: Props) {
  return (
    <>
      <Box className="ecom-filters">
        <TextField
          placeholder={SEARCH_PLACEHOLDER}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          size="small"
          className="ecom-search"
          sx={lightFieldSx}
          InputProps={{
            startAdornment: <InputAdornment position="start"><Search sx={{ color: '#9ca3af' }} /></InputAdornment>,
          }}
        />
        <Box className="ecom-category-chips">
          {CATEGORIES.map((c) => (
            <Chip key={c} label={c} clickable onClick={() => onCategoryChange(c)}
              className={`category-chip ${category === c ? 'category-chip--active' : ''}`} />
          ))}
        </Box>
      </Box>

      {filtered.length === 0 ? (
        <Box className="empty-state">
          <Search className="empty-icon" />
          <Typography className="empty-text">{EMPTY_PRODUCTS}</Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filtered.map((p) => (
            <Grid key={p._id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <ProductCard product={p} onAdd={onAddToCart} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  )
}
