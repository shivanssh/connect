import { useTheme } from '@emotion/react'
import { Box, Typography, useMediaQuery } from '@mui/material'
import Form from './Form'

const Login = () => {
  const theme = useTheme()
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)')
  return (
    <Box>
      <Box
        width="100%"
        padding="0.5rem 6%"
        background={theme.palette.background.alt}
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Login
        </Typography>
      </Box>
      <Box
        width={isNonMobileScreens ? '50%' : '93%'}
        background={theme.palette.background.alt}
        margin="0 auto"
        padding="1rem"
        borderRadius="1.5rem"
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: '1.5rem' }}>
          Welcome to Connect, social media app for connecting peoples.
        </Typography>
        <Form />
      </Box>
    </Box>
  )
}
export default Login
