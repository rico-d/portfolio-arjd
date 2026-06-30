import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Typography, Box, Container, Grid,
  Alert, Snackbar, Skeleton,
} from '@mui/material'
import './ECommerce.scss'

import {
  LoginDialog, CartDrawer, CheckoutDialog, ProductDialog,
  ProductCatalog, CustomerDashboard, AdminInventory, AdminOrders, AdminDeliveries,
  Navbar, HeroBanner, TabBar,
} from '../components/ECommerce'
import type { Product, SimulatedUser } from '../components/ECommerce/types'
import { DEMO_USERS } from '../components/ECommerce/types'
import {
  useAppDispatch, useAppSelector,
  fetchProducts, fetchOrders,
  saveProduct, deleteProduct,
  placeOrder, updateOrder,
  addToCart as addToCartAction,
  updateQty, removeFromCart as removeFromCartAction, clearCart,
} from '../components/ECommerce/services'
import {
  getCartCount, buildCheckoutPayload,
  filterProducts, computeAdminStats, computeCustomerStats, computeDeliveryStats,
} from '../components/ECommerce/utils/utils'
import {
  FOOTER_AUTHOR, FOOTER_TECH,
  SNACK_LOGGED_OUT, SNACK_ORDER_PLACED, SNACK_CHECKOUT_FAILED,
  SNACK_PRODUCT_DELETED, SNACK_PRODUCT_SAVE_FAIL, SNACK_PRODUCT_DELETE_FAIL,
  SNACK_ORDER_STATUS_UPDATED, SNACK_ORDER_STATUS_FAIL,
  SNACK_PAYMENT_STATUS_UPDATED, SNACK_PAYMENT_STATUS_FAIL,
  SNACK_DELIVERY_STATUS_UPDATED, SNACK_DELIVERY_STATUS_FAIL,
} from '../components/ECommerce/utils/constants'

// ═════════════════════════════════════════════════════════════════════════════
// ─── Main Page ──────────────────────────────────────────────────────────────
// ═════════════════════════════════════════════════════════════════════════════

export default function ECommerce() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  // ── Redux State ────────────────────────────────────────────────────────────
  const products = useAppSelector((s) => s.products.items)
  const productsLoading = useAppSelector((s) => s.products.loading)
  const orders = useAppSelector((s) => s.orders.items)
  const ordersLoading = useAppSelector((s) => s.orders.loading)
  const cart = useAppSelector((s) => s.cart.items)
  const loading = productsLoading || ordersLoading

  // ── Auth State ─────────────────────────────────────────────────────────────
  const [user, setUser] = useState<SimulatedUser | null>(null)
  const [loginOpen, setLoginOpen] = useState(false)
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null)

  const handleLogin = (role: 'customer' | 'admin') => {
    setUser(DEMO_USERS[role])
    setLoginOpen(false)
    setTab(0)
    showSnack(`Logged in as ${DEMO_USERS[role].name}`, 'success')
  }

  const handleLogout = () => {
    setUser(null)
    setUserMenuAnchor(null)
    setTab(0)
    dispatch(clearCart())
    showSnack(SNACK_LOGGED_OUT, 'info')
  }

  // ── Local UI State ─────────────────────────────────────────────────────────
  const [tab, setTab] = useState(0)
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [checkoutKey, setCheckoutKey] = useState(0)
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [snack, setSnack] = useState<{ open: boolean; message: string; severity: 'success' | 'error' | 'info' }>({ open: false, message: '', severity: 'success' })

  const [productDialog, setProductDialog] = useState(false)
  const [productMode, setProductMode] = useState<'add' | 'edit'>('add')
  const [productInitial, setProductInitial] = useState<Partial<Product>>({})
  const [productSaving, setProductSaving] = useState(false)
  const [editingProductId, setEditingProductId] = useState<string | null>(null)

  const [orderPage, setOrderPage] = useState(0)
  const [orderRowsPerPage, setOrderRowsPerPage] = useState(5)

  // ── Fetching (dispatch thunks) ─────────────────────────────────────────────
  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchOrders())
  }, [dispatch])

  const showSnack = (message: string, severity: 'success' | 'error' | 'info' = 'success') =>
    setSnack({ open: true, message, severity })

  // ── Cart ───────────────────────────────────────────────────────────────────
  const addToCart = (product: Product) => {
    dispatch(addToCartAction(product))
    showSnack(`${product.name} added to cart`, 'info')
  }

  const updateCartQty = (id: string, qty: number) => dispatch(updateQty({ id, qty }))

  const removeFromCart = (id: string) => dispatch(removeFromCartAction(id))

  const cartCount = getCartCount(cart)

  // ── Checkout ───────────────────────────────────────────────────────────────
  const handleCheckout = async (data: { customerName: string; customerEmail: string; paymentMethod: string; shippingAddress: { street: string; city: string; state: string; zip: string; country: string } }) => {
    setCheckoutLoading(true)
    try {
      await dispatch(placeOrder(buildCheckoutPayload(data, cart))).unwrap()
      showSnack(SNACK_ORDER_PLACED, 'success')
      dispatch(clearCart())
      setCheckoutOpen(false)
      setCartOpen(false)
      dispatch(fetchProducts())
    } catch (err: unknown) {
      showSnack(err instanceof Error ? err.message : SNACK_CHECKOUT_FAILED, 'error')
    } finally {
      setCheckoutLoading(false)
    }
  }

  // ── Admin: Product CRUD ────────────────────────────────────────────────────
  const handleSaveProduct = async (data: Partial<Product>) => {
    setProductSaving(true)
    try {
      await dispatch(saveProduct({ mode: productMode, id: editingProductId, data })).unwrap()
      showSnack(`Product ${productMode === 'edit' ? 'updated' : 'created'}`)
      setProductDialog(false)
      dispatch(fetchProducts())
    } catch { showSnack(SNACK_PRODUCT_SAVE_FAIL, 'error') }
    finally { setProductSaving(false) }
  }

  const handleDeleteProduct = async (id: string) => {
    try {
      await dispatch(deleteProduct(id)).unwrap()
      showSnack(SNACK_PRODUCT_DELETED)
    } catch { showSnack(SNACK_PRODUCT_DELETE_FAIL, 'error') }
  }

  // ── Admin: Order status update ─────────────────────────────────────────────
  const handleOrderStatusChange = async (id: string, status: string) => {
    try {
      await dispatch(updateOrder({ id, data: { status } })).unwrap()
      showSnack(SNACK_ORDER_STATUS_UPDATED)
    } catch { showSnack(SNACK_ORDER_STATUS_FAIL, 'error') }
  }

  const handlePaymentStatusChange = async (id: string, paymentStatus: string) => {
    try {
      await dispatch(updateOrder({ id, data: { paymentStatus } })).unwrap()
      showSnack(SNACK_PAYMENT_STATUS_UPDATED)
    } catch { showSnack(SNACK_PAYMENT_STATUS_FAIL, 'error') }
  }

  const handleDeliveryStatusChange = async (id: string, deliveryStatus: string) => {
    try {
      await dispatch(updateOrder({ id, data: { deliveryStatus } })).unwrap()
      showSnack(SNACK_DELIVERY_STATUS_UPDATED)
    } catch { showSnack(SNACK_DELIVERY_STATUS_FAIL, 'error') }
  }

  // ── Filtered Products ──────────────────────────────────────────────────────
  const filtered = useMemo(() => filterProducts(products, search, category), [products, search, category])

  // ── Dashboard stats ────────────────────────────────────────────────────────
  const adminStats = useMemo(() => computeAdminStats(orders, products), [orders, products])
  const customerStats = useMemo(
    () => (user?.role === 'customer' ? computeCustomerStats(orders, user.email) : null),
    [orders, user],
  )
  const deliveryStats = useMemo(() => computeDeliveryStats(orders), [orders])

  // ═════════════════════════════════════════════════════════════════════════════
  // ─── Render ───────────────────────────────────────────────────────────────
  // ═════════════════════════════════════════════════════════════════════════════

  return (
    <Box className="ecom">

      {/* Navbar */}
      <Navbar
        user={user}
        cartCount={cartCount}
        userMenuAnchor={userMenuAnchor}
        onCartOpen={() => setCartOpen(true)}
        onLoginOpen={() => setLoginOpen(true)}
        onLogout={handleLogout}
        onUserMenuOpen={(e) => setUserMenuAnchor(e.currentTarget)}
        onUserMenuClose={() => setUserMenuAnchor(null)}
        onNavigateHome={() => navigate('/')}
      />

      {/* Hero Banner */}
      <HeroBanner />

      {/* Tabs */}
      <TabBar tab={tab} onTabChange={setTab} userRole={user?.role} />

      {loading ? (
        <Box sx={{ py: 4 }}>
          <Container maxWidth="xl" sx={{ px: { xs: 3, lg: 8 } }}>
            <Grid container spacing={3}>
              {Array.from({ length: 12 }).map((_, i) => (
                <Grid key={i} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <Box className="product-card" sx={{ p: 2 }}>
                    <Skeleton variant="rectangular" width="100%" height={200} sx={{ borderRadius: 1, mb: 2 }} />
                    <Skeleton variant="text" width="80%" height={24} sx={{ mb: 1 }} />
                    <Skeleton variant="text" width="100%" height={16} sx={{ mb: 2 }} />
                    <Skeleton variant="text" width="60%" height={20} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      ) : (
        <Box sx={{ py: 4 }}>
          <Container maxWidth="xl" sx={{ px: { xs: 3, lg: 8 } }}>

            {/* ─── TAB 0: Product Catalog ──────────────────────────────── */}
            {tab === 0 && (
              <ProductCatalog
                search={search}
                onSearchChange={setSearch}
                category={category}
                onCategoryChange={setCategory}
                filtered={filtered}
                onAddToCart={addToCart}
              />
            )}

            {/* ─── TAB: Customer Dashboard ─────────────────────────── */}
            {tab === 1 && user?.role === 'customer' && customerStats && (
              <CustomerDashboard
                user={user}
                orders={orders}
                customerStats={customerStats}
              />
            )}

            {/* ─── TAB 1: Admin Inventory ──────────────────────────────── */}
            {tab === 1 && user?.role === 'admin' && (
              <AdminInventory
                adminStats={adminStats}
                products={products}
                onAddProduct={() => { setProductMode('add'); setProductInitial({}); setProductDialog(true) }}
                onEditProduct={(p) => { setProductMode('edit'); setEditingProductId(p._id); setProductInitial(p); setProductDialog(true) }}
                onDeleteProduct={handleDeleteProduct}
              />
            )}

            {/* ─── TAB 2: Admin Orders ─────────────────────────────────── */}
            {tab === 2 && user?.role === 'admin' && (
              <AdminOrders
                orders={orders}
                orderPage={orderPage}
                orderRowsPerPage={orderRowsPerPage}
                onPageChange={setOrderPage}
                onRowsPerPageChange={(v) => { setOrderRowsPerPage(v); setOrderPage(0) }}
                onOrderStatusChange={handleOrderStatusChange}
                onPaymentStatusChange={handlePaymentStatusChange}
              />
            )}

            {/* ─── TAB 3: Admin Deliveries ──────────────────────────────── */}
            {tab === 3 && user?.role === 'admin' && (
              <AdminDeliveries
                orders={orders}
                deliveryStats={deliveryStats}
                onDeliveryStatusChange={handleDeliveryStatusChange}
              />
            )}

          </Container>
        </Box>
      )}

      {/* Cart Drawer */}
      <CartDrawer
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onUpdate={updateCartQty}
        onRemove={removeFromCart}
        onCheckout={() => { setCartOpen(false); setCheckoutKey(k => k + 1); setCheckoutOpen(true) }}
      />

      {/* Checkout Dialog */}
      <CheckoutDialog
        key={checkoutKey}
        open={checkoutOpen}
        items={cart}
        loading={checkoutLoading}
        user={user}
        onClose={() => setCheckoutOpen(false)}
        onSubmit={handleCheckout}
      />

      {/* Admin Product Dialog */}
      <ProductDialog
        open={productDialog}
        mode={productMode}
        initial={productInitial}
        saving={productSaving}
        onClose={() => setProductDialog(false)}
        onSave={handleSaveProduct}
      />

      {/* Login Dialog */}
      <LoginDialog open={loginOpen} onClose={() => setLoginOpen(false)} onLogin={handleLogin} />

      {/* Snackbar */}
      <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} className="ecom-snackbar">
        <Alert severity={snack.severity} variant="filled" onClose={() => setSnack((s) => ({ ...s, open: false }))}
          sx={{ borderRadius: '8px' }}>
          {snack.message}
        </Alert>
      </Snackbar>

      {/* Footer */}
      <Box className="ecom-footer">
        <Typography variant="body2">
          © {new Date().getFullYear()} <span>{FOOTER_AUTHOR}</span>. {FOOTER_TECH}
        </Typography>
      </Box>
    </Box>
  )
}
