import {
  Box, Typography, Stack, Chip, MenuItem, Select, FormControl,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TablePagination, Paper,
} from '@mui/material'
import {
  Receipt, CreditCard, Payment, AttachMoney,
} from '@mui/icons-material'
import type { Order } from './types'
import {
  SECTION_ORDERS, EMPTY_ORDERS, ORDERS_TABLE_HEADERS,
  PAYMENT_STATUS_OPTIONS, ORDER_STATUS_OPTIONS,
} from './utils/constants'

interface Props {
  orders: Order[]
  orderPage: number
  orderRowsPerPage: number
  onPageChange: (page: number) => void
  onRowsPerPageChange: (rowsPerPage: number) => void
  onOrderStatusChange: (id: string, status: string) => void
  onPaymentStatusChange: (id: string, paymentStatus: string) => void
}

export default function AdminOrders({
  orders, orderPage, orderRowsPerPage,
  onPageChange, onRowsPerPageChange,
  onOrderStatusChange, onPaymentStatusChange,
}: Props) {
  return (
    <>
      <Box className="section-header" sx={{ mb: 3 }}>
        <Box className="section-title">
          <Receipt className="section-icon" />
          <h2>{SECTION_ORDERS}</h2>
        </Box>
      </Box>

      {orders.length === 0 ? (
        <Box className="empty-state">
          <Receipt className="empty-icon" />
          <Typography className="empty-text">{EMPTY_ORDERS}</Typography>
        </Box>
      ) : (
        <TableContainer component={Paper} className="admin-table-wrap" elevation={0}>
          <Table className="admin-table">
            <TableHead>
              <TableRow>
                {ORDERS_TABLE_HEADERS.map((h) => (
                  <TableCell key={h}>{h}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.slice(orderPage * orderRowsPerPage, orderPage * orderRowsPerPage + orderRowsPerPage).map((o) => (
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
                  <TableCell className="table-price">${o.totalAmount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Chip label={o.paymentMethod} size="small"
                      icon={o.paymentMethod === 'Stripe' ? <CreditCard /> : o.paymentMethod === 'PayPal' ? <Payment /> : <AttachMoney />}
                      sx={{ bgcolor: 'rgba(79,70,229,0.08)', color: '#4f46e5', fontWeight: 600,
                        '& .MuiChip-icon': { color: '#4f46e5' } }} />
                  </TableCell>
                  <TableCell>
                    <FormControl size="small" className="order-select" sx={{ minWidth: 100 }}>
                      <Select value={o.paymentStatus}
                        onChange={(e) => onPaymentStatusChange(o._id, e.target.value as string)}>
                        {PAYMENT_STATUS_OPTIONS.map((s) => (
                          <MenuItem key={s} value={s}>{s}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <FormControl size="small" className="order-select" sx={{ minWidth: 120 }}>
                      <Select value={o.status}
                        onChange={(e) => onOrderStatusChange(o._id, e.target.value as string)}>
                        {ORDER_STATUS_OPTIONS.map((s) => (
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
          <TablePagination
            component="div"
            count={orders.length}
            page={orderPage}
            onPageChange={(_, p) => onPageChange(p)}
            rowsPerPage={orderRowsPerPage}
            onRowsPerPageChange={(e) => onRowsPerPageChange(+e.target.value)}
            sx={{ borderTop: '1px solid #e5e7eb' }}
          />
        </TableContainer>
      )}
    </>
  )
}
