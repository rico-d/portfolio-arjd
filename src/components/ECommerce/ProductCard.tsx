import {
  Card, CardContent, CardMedia, CardActions, Typography, Button, Box,
  Stack, Chip, Rating,
} from '@mui/material'
import { ShoppingCart } from '@mui/icons-material'
import type { Product } from './types'

export default function ProductCard({ product, onAdd }: { product: Product; onAdd: (p: Product) => void }) {
  return (
    <Card className="product-card" elevation={0}>
      <Box className="product-image-wrap">
        <Chip label={product.category} size="small" className="product-badge"
          sx={{ bgcolor: '#4f46e5', color: '#fff', fontWeight: 600, fontSize: 11 }} />
        <CardMedia
          component="img"
          className="product-image"
          image={product.image || 'https://via.placeholder.com/400x220?text=No+Image'}
          alt={product.name}
        />
      </Box>
      <CardContent className="product-body">
        <Typography className="product-name">{product.name}</Typography>
        <Typography className="product-desc">{product.description}</Typography>
        <Stack direction="row" alignItems="center" spacing={0.5} mb={1}>
          <Rating value={product.rating} precision={0.5} size="small" readOnly />
          <Typography variant="caption" sx={{ color: '#9ca3af' }}>({product.numReviews})</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography className="product-price">${product.price.toFixed(2)}</Typography>
          <Chip
            label={product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            size="small"
            className={`stock-chip ${product.stock > 10 ? 'stock-chip--ok' : product.stock > 0 ? 'stock-chip--low' : 'stock-chip--out'}`}
          />
        </Stack>
      </CardContent>
      <CardActions className="product-actions">
        <Button
          fullWidth
          variant="contained"
          className="add-cart-btn"
          startIcon={<ShoppingCart />}
          disabled={product.stock === 0}
          onClick={() => onAdd(product)}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  )
}
