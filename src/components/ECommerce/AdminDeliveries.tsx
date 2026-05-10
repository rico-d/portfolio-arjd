import {
  Box, Typography, Grid, Stack, Chip, MenuItem, Select, FormControl,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
} from '@mui/material'
import {
  LocalShipping, HourglassEmpty, DirectionsCar, CheckCircle,
} from '@mui/icons-material'
import type { Order } from './types'
import { DELIVERY_STATUSES } from './types'
import {
  SECTION_DELIVERIES, EMPTY_SHIPMENTS, DELIVERIES_TABLE_HEADERS,
  STAT_PENDING, STAT_IN_TRANSIT, STAT_DELIVERED, STAT_TOTAL_SHIPMENTS,
} from './utils/constants'

interface DeliveryStatsData {
  pending: number
  inTransit: number
  delivered: number
  totalShipments: number
}

interface Props {
  orders: Order[]
  deliveryStats: DeliveryStatsData
  onDeliveryStatusChange: (id: string, deliveryStatus: string) => void
}

export default function AdminDeliveries({ orders, deliveryStats, onDeliveryStatusChange }: Props) {
  return (
    <>
      <Box className="section-header" sx={{ mb: 3 }}>
        <Box className="section-title">
          <LocalShipping className="section-icon" />
          <h2>{SECTION_DELIVERIES}</h2>
        </Box>
      </Box>

      {/* Delivery Stats */}
      <Grid container spacing={3} mb={4}>
        {[
          { label: STAT_PENDING, value: deliveryStats.pending, icon: <HourglassEmpty />, cls: 'stat-icon--amber' },
          { label: STAT_IN_TRANSIT, value: deliveryStats.inTransit, icon: <DirectionsCar />, cls: 'stat-icon--blue' },
          { label: STAT_DELIVERED, value: deliveryStats.delivered, icon: <CheckCircle />, cls: 'stat-icon--green' },
          { label: STAT_TOTAL_SHIPMENTS, value: deliveryStats.totalShipments, icon: <LocalShipping />, cls: 'stat-icon--blue' },
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

      {orders.length === 0 ? (
        <Box className="empty-state">
          <LocalShipping className="empty-icon" />
          <Typography className="empty-text">{EMPTY_SHIPMENTS}</Typography>
        </Box>
      ) : (
        <TableContainer component={Paper} className="admin-table-wrap" elevation={0}>
          <Table className="admin-table">
            <TableHead>
              <TableRow>
                {DELIVERIES_TABLE_HEADERS.map((h) => (
                  <TableCell key={h}>{h}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((o) => (
                <TableRow key={o._id}>
                  <TableCell>
                    <span className="order-id">{o._id.slice(-8)}</span>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827' }}>{o.customerName}</Typography>
                    <Typography variant="caption" sx={{ color: '#9ca3af' }}>{o.customerEmail}</Typography>
                  </TableCell>
                  <TableCell>
                    <Stack spacing={0.3}>
                      {o.items.map((item, i) => (
                        <Typography key={i} variant="caption" sx={{ color: '#374151' }}>
                          {item.name} x{item.quantity}
                        </Typography>
                      ))}
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Chip label={o.status} size="small" className={`order-status-chip order-status-chip--${o.status.toLowerCase()}`} />
                  </TableCell>
                  <TableCell>
                    <FormControl size="small" className="order-select" sx={{ minWidth: 170 }}>
                      <Select value={o.deliveryStatus || 'Pending'}
                        onChange={(e) => onDeliveryStatusChange(o._id, e.target.value as string)}>
                        {DELIVERY_STATUSES.map((s) => (
                          <MenuItem key={s} value={s}>{s}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap', color: '#6b7280' }}>
                    {new Date(o.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  )
}
