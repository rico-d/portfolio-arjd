import {
  Box, Typography, Grid, Stack, Chip, Button, Avatar,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Rating, IconButton, Tooltip,
} from '@mui/material'
import {
  Inventory, Receipt, FilterList, AttachMoney, Dashboard,
  Add, Edit, Delete,
} from '@mui/icons-material'
import type { Product } from './types'
import {
  STAT_TOTAL_PRODUCTS, STAT_LOW_STOCK, STAT_TOTAL_ORDERS, STAT_REVENUE,
  SECTION_INVENTORY, BTN_ADD_PRODUCT,
  INVENTORY_TABLE_HEADERS, TOOLTIP_EDIT, TOOLTIP_DELETE,
} from './utils/constants'

interface AdminStatsData {
  totalProducts: number
  lowStock: number
  totalOrders: number
  totalRevenue: number
}

interface Props {
  adminStats: AdminStatsData
  products: Product[]
  onAddProduct: () => void
  onEditProduct: (product: Product) => void
  onDeleteProduct: (id: string) => void
}

export default function AdminInventory({ adminStats, products, onAddProduct, onEditProduct, onDeleteProduct }: Props) {
  return (
    <>
      <Grid container spacing={3} mb={4}>
        {[
          { label: STAT_TOTAL_PRODUCTS, value: adminStats.totalProducts, icon: <Inventory />, cls: 'stat-icon--blue' },
          { label: STAT_LOW_STOCK, value: adminStats.lowStock, icon: <FilterList />, cls: 'stat-icon--red' },
          { label: STAT_TOTAL_ORDERS, value: adminStats.totalOrders, icon: <Receipt />, cls: 'stat-icon--amber' },
          { label: STAT_REVENUE, value: `$${adminStats.totalRevenue.toFixed(2)}`, icon: <AttachMoney />, cls: 'stat-icon--green' },
        ].map((stat) => (
          <Grid key={stat.label} size={{ xs: 12, sm: 6, md: 3 }}>
            <Box className="stat-card">
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box className={`stat-icon ${stat.cls}`}>{stat.icon}</Box>
                <Box>
                  <Typography className="stat-label">{stat.label}</Typography>
                  <Typography className="stat-value">{stat.value}</Typography>
                </Box>
              </Stack>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Box className="section-header">
        <Box className="section-title">
          <Dashboard className="section-icon" />
          <h2>{SECTION_INVENTORY}</h2>
        </Box>
        <Button variant="contained" startIcon={<Add />} className="add-product-btn" onClick={onAddProduct}>
          {BTN_ADD_PRODUCT}
        </Button>
      </Box>

      <TableContainer component={Paper} className="admin-table-wrap" elevation={0}>
        <Table className="admin-table">
          <TableHead>
            <TableRow>
              {INVENTORY_TABLE_HEADERS.map((h) => (
                <TableCell key={h}>{h}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p._id}>
                <TableCell>
                  <Avatar variant="rounded" src={p.image} sx={{ width: 48, height: 48, borderRadius: '8px' }} />
                </TableCell>
                <TableCell className="table-product-name">{p.name}</TableCell>
                <TableCell>
                  <Chip label={p.category} size="small"
                    sx={{ bgcolor: 'rgba(79,70,229,0.08)', color: '#4f46e5', fontWeight: 600, fontSize: 12 }} />
                </TableCell>
                <TableCell className="table-price">${p.price.toFixed(2)}</TableCell>
                <TableCell>
                  <Chip label={p.stock} size="small"
                    className={`stock-chip ${p.stock < 10 ? 'stock-chip--low' : 'stock-chip--ok'}`} />
                </TableCell>
                <TableCell>
                  <Rating value={p.rating} precision={0.5} size="small" readOnly />
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={0.5}>
                    <Tooltip title={TOOLTIP_EDIT}>
                      <IconButton size="small" className="table-action-btn table-action-btn--edit"
                        onClick={() => onEditProduct(p)}>
                        <Edit fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={TOOLTIP_DELETE}>
                      <IconButton size="small" className="table-action-btn table-action-btn--delete"
                        onClick={() => onDeleteProduct(p._id)}>
                        <Delete fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
