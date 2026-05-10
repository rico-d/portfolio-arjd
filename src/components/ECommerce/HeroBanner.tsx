import { Box, Container, Typography } from '@mui/material'
import { StorefrontOutlined } from '@mui/icons-material'
import { HERO_TITLE, HERO_SUBTITLE } from './utils/constants'

export default function HeroBanner() {
  return (
    <Box className="ecom-hero">
      <Container maxWidth="xl">
        <StorefrontOutlined sx={{ fontSize: 48, opacity: 0.9, mb: 1, position: 'relative' }} />
        <Typography className="hero-title">{HERO_TITLE}</Typography>
        <Typography className="hero-subtitle">
          {HERO_SUBTITLE}
        </Typography>
      </Container>
    </Box>
  )
}
