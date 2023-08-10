import { Box, Typography } from '@mui/material'
import { FlexCenter } from 'components/StyledComponent'
import { useNavigate } from 'react-router-dom'

const FourOFour = () => {
  const navigate = useNavigate()
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignContent="center"
      justifyContent="center"
      max-width="100%"
      height="100%"
    >
      <FlexCenter flexDirection="column" gap="1rem">
        <Typography
          fontSize="6rem"
          fontWeight="700"
          sx={{ fontStyle: 'italic' }}
        >
          404
        </Typography>
        <Typography variant="h1" color="red" fontWeight="700">
          Page Didn't Found!
        </Typography>
        <Typography variant="h3">
          Navigate to{' '}
          <Typography
            onClick={() => navigate('/')}
            sx={{
              '&:hover': {
                cursor: 'pointer',
                fontWeight: '600',
                color: 'grey',
              },
            }}
            variant="paragraph"
            style={{ textDecoration: 'underline' }}
          >
            Home Page
          </Typography>
        </Typography>
      </FlexCenter>
    </Box>
  )
}

export default FourOFour
