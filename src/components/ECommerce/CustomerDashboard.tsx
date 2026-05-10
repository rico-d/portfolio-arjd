import {
  Box, Typography, Grid, Stack, Chip, Paper,
} from '@mui/material'
import {
  AccountCircle, ShoppingBag, LocalShipping, Receipt,
  AttachMoney, CreditCard, Payment, HourglassEmpty,
  Inventory, Warehouse, DirectionsCar, CheckCircle,
} from '@mui/icons-material'
import type { Order, SimulatedUser } from './types'
import { DELIVERY_STATUSES } from './types'
import {
  SECTION_MY_DASHBOARD, SECTION_ORDER_HISTORY, SECTION_DELIVERY_STATUS,
  EMPTY_CUSTOMER_ORDERS,
  STAT_MY_ORDERS, STAT_DELIVERED, STAT_IN_PROGRESS, STAT_TOTAL_SPENT,
} from './utils/constants'

interface CustomerStatsData {
  myOrders: number
  delivered: number
  inProgress: number
  totalSpent: number
}

interface Props {
  user: SimulatedUser
  orders: Order[]
  customerStats: CustomerStatsData
}

export default function CustomerDashboard({ user, orders, customerStats }: Props) {
  const myOrders = orders.filter((o) => o.customerEmail === user.email)

  return (
    <>
      <Box className="section-header" sx={{ mb: 3 }}>
        <Box className="section-title">
          <AccountCircle className="section-icon" />
          <h2>{SECTION_MY_DASHBOARD}</h2>
        </Box>
      </Box>

      {/* Customer Stats */}
      <Grid container spacing={3} mb={4}>
        {[
          { label: STAT_MY_ORDERS, value: customerStats.myOrders, icon: <ShoppingBag />, cls: 'stat-icon--blue' },
          { label: STAT_DELIVERED, value: customerStats.delivered, icon: <LocalShipping />, cls: 'stat-icon--green' },
          { label: STAT_IN_PROGRESS, value: customerStats.inProgress, icon: <Receipt />, cls: 'stat-icon--amber' },
          { label: STAT_TOTAL_SPENT, value: `$${customerStats.totalSpent.toFixed(2)}`, icon: <AttachMoney />, cls: 'stat-icon--green' },
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

      {/* Customer Order History */}
      <Box className="section-header" sx={{ mb: 2 }}>
        <Box className="section-title">
          <Receipt className="section-icon" />
          <h2>{SECTION_ORDER_HISTORY}</h2>
        </Box>
      </Box>

      {myOrders.length === 0 ? (
        <Box className="empty-state">
          <ShoppingBag className="empty-icon" />
          <Typography className="empty-text">{EMPTY_CUSTOMER_ORDERS}</Typography>
        </Box>
      ) : (
        <Stack spacing={3}>
          {myOrders.map((o) => (
            <Paper key={o._id} className="customer-order-card" elevation={0}>
              <Box className="customer-order-header">
                <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1}>
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <span className="order-id">{o._id.slice(-8)}</span>
                    <Chip label={o.status} size="small" className={`order-status-chip order-status-chip--${o.status.toLowerCase()}`} />
                    <Chip label={o.paymentMethod} size="small"
                      icon={o.paymentMethod === 'Stripe' ? <CreditCard /> : o.paymentMethod === 'PayPal' ? <Payment /> : <AttachMoney />}
                      sx={{ bgcolor: 'rgba(79,70,229,0.08)', color: '#4f46e5', fontWeight: 600,
                        '& .MuiChip-icon': { color: '#4f46e5', fontSize: 16 } }} />
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography variant="body2" sx={{ color: '#6b7280' }}>
                      {new Date(o.createdAt).toLocaleDateString()}
                    </Typography>
                    <Typography className="table-price" sx={{ fontWeight: 800, fontSize: '1rem' }}>
                      ${o.totalAmount.toFixed(2)}
                    </Typography>
                  </Stack>
                </Stack>
              </Box>

              {/* Order Items */}
              <Box sx={{ px: 3, py: 1.5 }}>
                <Stack direction="row" flexWrap="wrap" gap={1}>
                  {o.items.map((item, i) => (
                    <Chip key={i} label={`${item.name} x${item.quantity}`} size="small"
                      sx={{ bgcolor: '#f3f4f6', color: '#374151', fontWeight: 500, fontSize: 12 }} />
                  ))}
                </Stack>
              </Box>

              {/* Delivery Tracker */}
              <Box className="delivery-tracker">
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: 0.5, mb: 2, display: 'block' }}>
                  {SECTION_DELIVERY_STATUS}
                </Typography>
                <Box className="delivery-steps">
                  {DELIVERY_STATUSES.map((step, idx) => {
                    const currentIdx = DELIVERY_STATUSES.indexOf(o.deliveryStatus || 'Pending')
                    const isCompleted = idx < currentIdx
                    const isCurrent = idx === currentIdx
                    const stepIcons = [<HourglassEmpty key="p" />, <Receipt key="ip" />, <Inventory key="so" />, <Warehouse key="lc" />, <DirectionsCar key="od" />, <CheckCircle key="d" />]
                    return (
                      <Box key={step} className={`delivery-step ${isCompleted ? 'delivery-step--done' : ''} ${isCurrent ? 'delivery-step--current' : ''}`}>
                        <Box className="delivery-step-icon">
                          {stepIcons[idx]}
                        </Box>
                        <Typography className="delivery-step-label">{step}</Typography>
                        {idx < DELIVERY_STATUSES.length - 1 && (
                          <Box className={`delivery-step-line ${isCompleted ? 'delivery-step-line--done' : ''}`} />
                        )}
                      </Box>
                    )
                  })}
                </Box>
              </Box>
            </Paper>
          ))}
        </Stack>
      )}
    </>
  )
}
