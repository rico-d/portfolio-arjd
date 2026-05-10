import { Box, Container, Tabs, Tab } from '@mui/material'
import { Store, AccountCircle, Inventory, Receipt, LocalShipping } from '@mui/icons-material'
import type { UserRole } from './types'
import {
  TAB_PRODUCT_CATALOG, TAB_MY_DASHBOARD,
  TAB_ADMIN_INVENTORY, TAB_ADMIN_ORDERS, TAB_ADMIN_DELIVERIES,
} from './utils/constants'

interface TabBarProps {
  tab: number
  onTabChange: (value: number) => void
  userRole?: UserRole
}

export default function TabBar({ tab, onTabChange, userRole }: TabBarProps) {
  return (
    <Box className="ecom-tabs">
      <Container maxWidth="xl" sx={{ px: { xs: 3, lg: 8 } }}>
        <Tabs value={tab} onChange={(_, v) => onTabChange(v)}
          sx={{
            '& .MuiTab-root': { color: '#6b7280', textTransform: 'none', fontWeight: 600, fontSize: '0.9rem' },
            '& .Mui-selected': { color: '#4f46e5 !important' },
            '& .MuiTabs-indicator': { bgcolor: '#4f46e5', height: 3, borderRadius: '3px 3px 0 0' },
          }}>
          <Tab icon={<Store />} iconPosition="start" label={TAB_PRODUCT_CATALOG} />
          {userRole === 'customer' && (
            <Tab icon={<AccountCircle />} iconPosition="start" label={TAB_MY_DASHBOARD} />
          )}
          {userRole === 'admin' && (
            <Tab icon={<Inventory />} iconPosition="start" label={TAB_ADMIN_INVENTORY} />
          )}
          {userRole === 'admin' && (
            <Tab icon={<Receipt />} iconPosition="start" label={TAB_ADMIN_ORDERS} />
          )}
          {userRole === 'admin' && (
            <Tab icon={<LocalShipping />} iconPosition="start" label={TAB_ADMIN_DELIVERIES} />
          )}
        </Tabs>
      </Container>
    </Box>
  )
}
