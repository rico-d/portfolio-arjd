import { useState, useMemo, useEffect, useCallback } from 'react'
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
  Typography,
  Stack,
  InputAdornment,
  TablePagination,
  Avatar,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  CircularProgress,
  Alert,
  Snackbar,
  Divider,
} from '@mui/material'
import { Search, FilterList, Add, Edit, Delete, PersonAdd, Close } from '@mui/icons-material'

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Worker {
  _id?: string
  name: string
  role: string
  department: string
  location: string
  status: 'Active' | 'Inactive' | 'On Leave'
  salary: number
  joinDate: string
  email: string
}

type SortKey = keyof Omit<Worker, '_id'>
type SortDir = 'asc' | 'desc'

const BLANK_WORKER: Omit<Worker, '_id'> = {
  name: '', role: '', department: '', location: '',
  status: 'Active', salary: 0, joinDate: '', email: '',
}

const STATUS_COLOR: Record<Worker['status'], 'success' | 'error' | 'warning'> = {
  Active: 'success',
  Inactive: 'error',
  'On Leave': 'warning',
}

const STATUSES: Array<'All' | Worker['status']> = ['All', 'Active', 'Inactive', 'On Leave']

// ─── Helpers ─────────────────────────────────────────────────────────────────

// Build API URL intelligently handling both local and deployed environments
// Supports URLs like:
//   - https://portfolio-arjd.onrender.com/api (base has /api)
//   - http://localhost:5000 (base without /api)
// Endpoints can be: /workers, /api/workers, workers
const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')

function buildUrl(endpoint: string): string {
  if (!API_BASE) return endpoint
  
  // Normalize endpoint
  let normalized = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  
  // If base already ends with /api and endpoint starts with /api, remove the /api from endpoint to avoid duplication
  if (API_BASE.endsWith('/api') && normalized.startsWith('/api')) {
    normalized = normalized.slice(4) // Remove /api prefix from endpoint
  }
  
  return `${API_BASE}${normalized}`
}

interface SortCellProps {
  label: string
  field: SortKey
  sortKey: SortKey
  sortDir: SortDir
  onSort: (field: SortKey) => void
}

function SortCell({ label, field, sortKey, sortDir, onSort }: SortCellProps) {
  return (
    <TableCell
      sx={{ color: '#90caf9', fontWeight: 700, whiteSpace: 'nowrap', bgcolor: '#0d1b2a' }}
      sortDirection={sortKey === field ? sortDir : false}
    >
      <TableSortLabel
        active={sortKey === field}
        direction={sortKey === field ? sortDir : 'asc'}
        onClick={() => onSort(field)}
        sx={{
          color: '#90caf9 !important',
          '& .MuiTableSortLabel-icon': { color: '#90caf9 !important' },
        }}
      >
        {label}
      </TableSortLabel>
    </TableCell>
  )
}

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
}

function avatarColor(name: string) {
  const colors = ['#1565c0', '#6a1b9a', '#2e7d32', '#c62828', '#e65100', '#00838f']
  return colors[name.charCodeAt(0) % colors.length]
}

// ─── Worker Form Dialog ───────────────────────────────────────────────────────

interface WorkerDialogProps {
  open: boolean
  mode: 'add' | 'edit'
  initial: Omit<Worker, '_id'>
  saving: boolean
  onClose: () => void
  onSave: (data: Omit<Worker, '_id'>) => void
}

const DEPARTMENTS_OPTIONS = [
  'Engineering', 'Design', 'QA', 'Product', 'Analytics', 'HR', 'Other',
]

function WorkerDialog({ open, mode, initial, saving, onClose, onSave }: WorkerDialogProps) {
  const [form, setForm] = useState<Omit<Worker, '_id'>>(initial)
  const [errors, setErrors] = useState<Partial<Record<keyof Omit<Worker, '_id'>, string>>>({})

  const set = (field: keyof Omit<Worker, '_id'>, value: string | number) =>
    setForm((f) => ({ ...f, [field]: value }))

  const validate = () => {
    const e: typeof errors = {}
    if (!form.name.trim())       e.name       = 'Name is required'
    if (!form.role.trim())       e.role       = 'Role is required'
    if (!form.department.trim()) e.department = 'Department is required'
    if (!form.location.trim())   e.location   = 'Location is required'
    if (!form.email.trim())      e.email      = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email'
    if (!form.joinDate)          e.joinDate   = 'Join date is required'
    if (form.salary < 0)         e.salary     = 'Salary must be ≥ 0'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = () => { if (validate()) onSave(form) }

  const fieldSx = {
    '& .MuiOutlinedInput-root': {
      color: '#fff',
      bgcolor: '#1a1a1a',
      '& fieldset': { borderColor: '#333' },
      '&:hover fieldset': { borderColor: '#555' },
      '&.Mui-focused fieldset': { borderColor: '#1565c0' },
    },
    '& .MuiInputLabel-root': { color: '#666' },
    '& .MuiInputLabel-root.Mui-focused': { color: '#90caf9' },
    '& .MuiFormHelperText-root': { color: '#f44336' },
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { bgcolor: '#111', border: '1px solid #222', borderRadius: 3, color: '#fff' } }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" alignItems="center" spacing={1}>
            <PersonAdd sx={{ color: '#90caf9' }} />
            <Typography fontWeight={700}>{mode === 'add' ? 'Add Worker' : 'Edit Worker'}</Typography>
          </Stack>
          <IconButton onClick={onClose} size="small" sx={{ color: '#666' }}>
            <Close fontSize="small" />
          </IconButton>
        </Stack>
      </DialogTitle>
      <Divider sx={{ borderColor: '#222' }} />
      <DialogContent sx={{ pt: 3 }}>
        <Stack spacing={2.5}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField fullWidth label="Full Name" value={form.name}
              onChange={(e) => set('name', e.target.value)}
              error={!!errors.name} helperText={errors.name} sx={fieldSx} />
            <TextField fullWidth label="Email" value={form.email}
              onChange={(e) => set('email', e.target.value)}
              error={!!errors.email} helperText={errors.email} sx={fieldSx} />
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField fullWidth label="Role" value={form.role}
              onChange={(e) => set('role', e.target.value)}
              error={!!errors.role} helperText={errors.role} sx={fieldSx} />
            <TextField fullWidth label="Location" value={form.location}
              onChange={(e) => set('location', e.target.value)}
              error={!!errors.location} helperText={errors.location} sx={fieldSx} />
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <FormControl fullWidth sx={fieldSx}>
              <InputLabel>Department</InputLabel>
              <Select value={form.department} label="Department"
                onChange={(e) => set('department', e.target.value)}
                error={!!errors.department}
                MenuProps={{ PaperProps: { sx: { bgcolor: '#1a1a1a', color: '#fff' } } }}>
                {DEPARTMENTS_OPTIONS.map((d) => (
                  <MenuItem key={d} value={d} sx={{ '&:hover': { bgcolor: '#1565c033' } }}>{d}</MenuItem>
                ))}
              </Select>
              {errors.department && (
                <Typography variant="caption" sx={{ color: '#f44336', ml: 1.5, mt: 0.5 }}>{errors.department}</Typography>
              )}
            </FormControl>
            <FormControl fullWidth sx={fieldSx}>
              <InputLabel>Status</InputLabel>
              <Select value={form.status} label="Status"
                onChange={(e) => set('status', e.target.value as Worker['status'])}
                MenuProps={{ PaperProps: { sx: { bgcolor: '#1a1a1a', color: '#fff' } } }}>
                {(['Active', 'Inactive', 'On Leave'] as Worker['status'][]).map((s) => (
                  <MenuItem key={s} value={s} sx={{ '&:hover': { bgcolor: '#1565c033' } }}>{s}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField fullWidth label="Salary (₱)" type="number" value={form.salary}
              onChange={(e) => set('salary', Number(e.target.value))}
              error={!!errors.salary} helperText={errors.salary}
              inputProps={{ min: 0 }} sx={fieldSx} />
            <TextField fullWidth label="Join Date" type="date" value={form.joinDate}
              onChange={(e) => set('joinDate', e.target.value)}
              error={!!errors.joinDate} helperText={errors.joinDate}
              InputLabelProps={{ shrink: true }} sx={fieldSx} />
          </Stack>
        </Stack>
      </DialogContent>
      <Divider sx={{ borderColor: '#222' }} />
      <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
        <Button onClick={onClose} sx={{ color: '#aaa', textTransform: 'none' }}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={saving}
          startIcon={saving ? <CircularProgress size={16} color="inherit" /> : undefined}
          sx={{ bgcolor: '#1565c0', textTransform: 'none', px: 3, borderRadius: 2 }}
        >
          {saving ? 'Saving…' : mode === 'add' ? 'Add Worker' : 'Save Changes'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

// ─── Delete Confirm Dialog ────────────────────────────────────────────────────

interface DeleteDialogProps {
  open: boolean
  worker: Worker | null
  deleting: boolean
  onClose: () => void
  onConfirm: () => void
}

function DeleteDialog({ open, worker, deleting, onClose, onConfirm }: DeleteDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth
      PaperProps={{ sx: { bgcolor: '#111', border: '1px solid #333', borderRadius: 3, color: '#fff' } }}>
      <DialogTitle>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Delete sx={{ color: '#f44336' }} />
          <Typography fontWeight={700}>Delete Worker</Typography>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Typography sx={{ color: '#bbb' }}>
          Are you sure you want to delete{' '}
          <Box component="span" sx={{ color: '#fff', fontWeight: 700 }}>{worker?.name}</Box>?
          This action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
        <Button onClick={onClose} sx={{ color: '#aaa', textTransform: 'none' }}>Cancel</Button>
        <Button variant="contained" color="error" onClick={onConfirm} disabled={deleting}
          startIcon={deleting ? <CircularProgress size={16} color="inherit" /> : <Delete />}
          sx={{ textTransform: 'none', px: 3, borderRadius: 2 }}>
          {deleting ? 'Deleting…' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

// ─── Main WorkerTable Component ───────────────────────────────────────────────

export default function WorkerTable() {
  const [workers, setWorkers]           = useState<Worker[]>([])
  const [loading, setLoading]           = useState(true)
  const [apiError, setApiError]         = useState<string | null>(null)

  // Table state
  const [search, setSearch]             = useState('')
  const [department, setDepartment]     = useState('All')
  const [status, setStatus]             = useState<'All' | Worker['status']>('All')
  const [sortKey, setSortKey]           = useState<SortKey>('name')
  const [sortDir, setSortDir]           = useState<SortDir>('asc')
  const [page, setPage]                 = useState(0)
  const [rowsPerPage, setRowsPerPage]   = useState(6)

  // Dialog state
  const [addOpen, setAddOpen]           = useState(false)
  const [editOpen, setEditOpen]         = useState(false)
  const [editTarget, setEditTarget]     = useState<Worker | null>(null)
  const [deleteOpen, setDeleteOpen]     = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Worker | null>(null)
  const [saving, setSaving]             = useState(false)
  const [deleting, setDeleting]         = useState(false)

  // Snackbar
  const [snack, setSnack] = useState<{ open: boolean; msg: string; severity: 'success' | 'error' }>({
    open: false, msg: '', severity: 'success',
  })
  const toast = (msg: string, severity: 'success' | 'error' = 'success') =>
    setSnack({ open: true, msg, severity })

  // ── Fetch ──────────────────────────────────────────────────────────────────

  const fetchWorkers = useCallback(async () => {
    setLoading(true)
    setApiError(null)
    try {
      const res = await fetch(buildUrl('/api/workers'))
      if (!res.ok) throw new Error(`Server error ${res.status}`)
      setWorkers(await res.json())
    } catch (err) {
      setApiError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchWorkers() }, [fetchWorkers])

  // ── CRUD ───────────────────────────────────────────────────────────────────

  const handleAdd = async (data: Omit<Worker, '_id'>) => {
    setSaving(true)
    try {
      const res = await fetch(buildUrl('/api/workers'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to add worker')
      const created: Worker = await res.json()
      setWorkers((prev) => [created, ...prev])
      setAddOpen(false)
      toast('Worker added successfully')
    } catch (err) { toast((err as Error).message, 'error') }
    finally { setSaving(false) }
  }

  const handleEdit = async (data: Omit<Worker, '_id'>) => {
    if (!editTarget?._id) return
    setSaving(true)
    try {
      const res = await fetch(buildUrl(`/api/workers/${editTarget._id}`), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to update worker')
      const updated: Worker = await res.json()
      setWorkers((prev) => prev.map((w) => w._id === updated._id ? updated : w))
      setEditOpen(false)
      toast('Worker updated successfully')
    } catch (err) { toast((err as Error).message, 'error') }
    finally { setSaving(false) }
  }

  const handleDelete = async () => {
    if (!deleteTarget?._id) return
    setDeleting(true)
    try {
      const res = await fetch(buildUrl(`/api/workers/${deleteTarget._id}`), { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete worker')
      setWorkers((prev) => prev.filter((w) => w._id !== deleteTarget._id))
      setDeleteOpen(false)
      toast('Worker deleted')
    } catch (err) { toast((err as Error).message, 'error') }
    finally { setDeleting(false) }
  }

  // ── Sort / filter ──────────────────────────────────────────────────────────

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    else { setSortKey(key); setSortDir('asc') }
    setPage(0)
  }

  const deptOptions = useMemo(
    () => ['All', ...Array.from(new Set(workers.map((w) => w.department))).sort()],
    [workers],
  )

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return workers.filter((w) =>
      (!q || w.name.toLowerCase().includes(q) || w.role.toLowerCase().includes(q) ||
       w.email.toLowerCase().includes(q) || w.location.toLowerCase().includes(q)) &&
      (department === 'All' || w.department === department) &&
      (status === 'All' || w.status === status)
    )
  }, [workers, search, department, status])

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const av = a[sortKey as keyof Worker]
      const bv = b[sortKey as keyof Worker]
      if (typeof av === 'number' && typeof bv === 'number')
        return sortDir === 'asc' ? av - bv : bv - av
      return sortDir === 'asc'
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av))
    })
  }, [filtered, sortKey, sortDir])

  const paginated = sorted.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  const selectSx = {
    bgcolor: '#1a1a1a', color: '#fff',
    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#333' },
    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#555' },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#1565c0' },
    '& .MuiSvgIcon-root': { color: '#aaa' },
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <Box>
      {/* Toolbar */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }}
        justifyContent="space-between" mb={3} flexWrap="wrap" gap={2}>

        <Stack direction="row" alignItems="center" spacing={1}>
          <FilterList sx={{ color: '#90caf9' }} />
          <Typography variant="h6" fontWeight={700} sx={{ color: '#fff' }}>Workers</Typography>
          <Chip label={`${filtered.length} result${filtered.length !== 1 ? 's' : ''}`} size="small"
            sx={{ bgcolor: '#1a237e44', color: '#90caf9', border: '1px solid #1565c0' }} />
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} flexWrap="wrap" alignItems="center">
          <TextField size="small" placeholder="Search name, role, email…" value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0) }}
            InputProps={{ startAdornment: <InputAdornment position="start"><Search sx={{ color: '#666', fontSize: 18 }} /></InputAdornment> }}
            sx={{
              width: { xs: '100%', sm: 240 },
              '& .MuiOutlinedInput-root': { bgcolor: '#1a1a1a', color: '#fff', '& fieldset': { borderColor: '#333' }, '&:hover fieldset': { borderColor: '#555' }, '&.Mui-focused fieldset': { borderColor: '#1565c0' } },
              '& input::placeholder': { color: '#555' },
            }} />

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel sx={{ color: '#666' }}>Department</InputLabel>
            <Select value={department} label="Department" onChange={(e) => { setDepartment(e.target.value); setPage(0) }}
              sx={selectSx} MenuProps={{ PaperProps: { sx: { bgcolor: '#1a1a1a', color: '#fff' } } }}>
              {deptOptions.map((d) => <MenuItem key={d} value={d} sx={{ '&:hover': { bgcolor: '#1565c033' } }}>{d}</MenuItem>)}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 130 }}>
            <InputLabel sx={{ color: '#666' }}>Status</InputLabel>
            <Select value={status} label="Status" onChange={(e) => { setStatus(e.target.value as typeof status); setPage(0) }}
              sx={selectSx} MenuProps={{ PaperProps: { sx: { bgcolor: '#1a1a1a', color: '#fff' } } }}>
              {STATUSES.map((s) => <MenuItem key={s} value={s} sx={{ '&:hover': { bgcolor: '#1565c033' } }}>{s}</MenuItem>)}
            </Select>
          </FormControl>

          <Button variant="contained" startIcon={<Add />} onClick={() => setAddOpen(true)}
            sx={{ bgcolor: '#1565c0', textTransform: 'none', borderRadius: 2, whiteSpace: 'nowrap', px: 3 }}>
            Add Worker
          </Button>
        </Stack>
      </Stack>

      {/* Loading */}
      {loading && (
        <Stack alignItems="center" py={6}>
          <CircularProgress sx={{ color: '#90caf9' }} />
          <Typography sx={{ color: '#666', mt: 2 }}>Loading workers…</Typography>
        </Stack>
      )}

      {/* API Error */}
      {apiError && !loading && (
        <Alert severity="error"
          sx={{ bgcolor: '#1a1a1a', color: '#f44336', border: '1px solid #333', mb: 3 }}
          action={<Button size="small" sx={{ color: '#90caf9', textTransform: 'none' }} onClick={fetchWorkers}>Retry</Button>}>
          Could not reach the server: {apiError}. Ensure the backend is running on port 5000.
        </Alert>
      )}

      {/* Table */}
      {!loading && (
        <TableContainer component={Paper}
          sx={{ bgcolor: '#1a1a1a', border: '1px solid #222', borderRadius: 2, overflowX: 'auto' }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <SortCell label="Name"       field="name"       sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
                <SortCell label="Role"       field="role"       sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
                <SortCell label="Department" field="department" sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
                <SortCell label="Location"   field="location"   sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
                <SortCell label="Status"     field="status"     sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
                <SortCell label="Salary (₱)" field="salary"     sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
                <SortCell label="Join Date"  field="joinDate"   sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
                <TableCell sx={{ color: '#90caf9', fontWeight: 700, bgcolor: '#0d1b2a', textAlign: 'center' }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginated.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ color: '#555', py: 6 }}>
                    {workers.length === 0
                      ? 'No workers yet. Click "Add Worker" to get started.'
                      : 'No workers match your filters.'}
                  </TableCell>
                </TableRow>
              ) : (
                paginated.map((worker, idx) => (
                  <TableRow key={worker._id}
                    sx={{ bgcolor: idx % 2 === 0 ? '#1a1a1a' : '#161616', '&:hover': { bgcolor: '#0d1b2a' }, transition: 'background-color 0.15s' }}>

                    <TableCell sx={{ borderColor: '#222' }}>
                      <Stack direction="row" alignItems="center" spacing={1.5}>
                        <Avatar sx={{ width: 32, height: 32, fontSize: 12, bgcolor: avatarColor(worker.name) }}>
                          {getInitials(worker.name)}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight={600} sx={{ color: '#fff', lineHeight: 1.2 }}>{worker.name}</Typography>
                          <Typography variant="caption" sx={{ color: '#666' }}>{worker.email}</Typography>
                        </Box>
                      </Stack>
                    </TableCell>

                    <TableCell sx={{ color: '#bbb', borderColor: '#222', whiteSpace: 'nowrap' }}>{worker.role}</TableCell>

                    <TableCell sx={{ borderColor: '#222' }}>
                      <Chip label={worker.department} size="small"
                        sx={{ bgcolor: '#0d1b2a', color: '#90caf9', fontSize: 11, border: '1px solid #1565c033' }} />
                    </TableCell>

                    <TableCell sx={{ color: '#bbb', borderColor: '#222' }}>{worker.location}</TableCell>

                    <TableCell sx={{ borderColor: '#222' }}>
                      <Chip label={worker.status} size="small" color={STATUS_COLOR[worker.status]}
                        variant="outlined" sx={{ fontSize: 11, fontWeight: 600 }} />
                    </TableCell>

                    <TableCell sx={{ color: '#bbb', borderColor: '#222', whiteSpace: 'nowrap' }}>
                      ₱{worker.salary.toLocaleString()}
                    </TableCell>

                    <TableCell sx={{ color: '#bbb', borderColor: '#222', whiteSpace: 'nowrap' }}>
                      {new Date(worker.joinDate).toLocaleDateString('en-PH', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </TableCell>

                    <TableCell sx={{ borderColor: '#222', textAlign: 'center', whiteSpace: 'nowrap' }}>
                      <Tooltip title="Edit">
                        <IconButton size="small"
                          onClick={() => { setEditTarget(worker); setEditOpen(true) }}
                          sx={{ color: '#90caf9', '&:hover': { bgcolor: '#1565c022' } }}>
                          <Edit fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton size="small"
                          onClick={() => { setDeleteTarget(worker); setDeleteOpen(true) }}
                          sx={{ color: '#f44336', '&:hover': { bgcolor: '#f4433622' } }}>
                          <Delete fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          <TablePagination component="div" count={sorted.length} page={page} rowsPerPage={rowsPerPage}
            onPageChange={(_, p) => setPage(p)}
            onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value)); setPage(0) }}
            rowsPerPageOptions={[6, 10, 25]}
            sx={{
              color: '#888', borderTop: '1px solid #222',
              '& .MuiTablePagination-selectIcon': { color: '#888' },
              '& .MuiIconButton-root': { color: '#888' },
              '& .MuiIconButton-root.Mui-disabled': { color: '#444' },
            }} />
        </TableContainer>
      )}

      {/* Add Dialog */}
      <WorkerDialog key={addOpen ? 'add-open' : 'add-closed'}
        open={addOpen} mode="add" initial={BLANK_WORKER} saving={saving}
        onClose={() => setAddOpen(false)} onSave={handleAdd} />

      {/* Edit Dialog */}
      <WorkerDialog key={editTarget?._id ?? 'edit-closed'}
        open={editOpen} mode="edit" saving={saving}
        initial={editTarget
          ? { name: editTarget.name, role: editTarget.role, department: editTarget.department,
              location: editTarget.location, status: editTarget.status, salary: editTarget.salary,
              joinDate: editTarget.joinDate, email: editTarget.email }
          : BLANK_WORKER}
        onClose={() => setEditOpen(false)} onSave={handleEdit} />

      {/* Delete Dialog */}
      <DeleteDialog open={deleteOpen} worker={deleteTarget} deleting={deleting}
        onClose={() => setDeleteOpen(false)} onConfirm={handleDelete} />

      {/* Snackbar */}
      <Snackbar open={snack.open} autoHideDuration={3500}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert severity={snack.severity} onClose={() => setSnack((s) => ({ ...s, open: false }))}
          sx={{ bgcolor: snack.severity === 'success' ? '#1b5e20' : '#b71c1c', color: '#fff' }}>
          {snack.msg}
        </Alert>
      </Snackbar>
    </Box>
  )
}
