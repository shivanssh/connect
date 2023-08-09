import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box, IconButton, Typography, useTheme } from '@mui/material'
import { FlexBetween } from '../StyledComponent'
import UserImage from '../userImage/UserImage'
import { PersonAddOutlined, PersonRemoveOutlined } from '@mui/icons-material'
import { setFriends } from 'state'

const Friend = ({ image, name, subtitle, friendId }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { _id, friends } = useSelector((state) => state.user)
  const token = useSelector((state) => state.token)

  const sameUser = _id === friendId
  const isFriend = friends?.find((friend) => friend._id === friendId)

  const { palette } = useTheme()
  const primaryLight = palette.primary.light
  const primaryDark = palette.primary.dark
  const main = palette.neutral?.main
  const medium = palette.neutral?.medium

  const handlePatchFriend = async () => {
    const res = await fetch(`http://localhost:3001/users/${_id}/${friendId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    const data = await res.json()
    dispatch(setFriends({ friends: data }))
  }

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={image} size="55px" />
        <Box
          data-testid="user-profile-btn"
          onClick={() => {
            navigate(`/profile/${friendId}`)
            navigate(0)
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              '&:hover': {
                color: palette.primary.light,
                cursor: 'pointer',
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      {!sameUser && (
        <IconButton
          onClick={handlePatchFriend}
          sx={{ backgroundColor: primaryLight, p: '0.6rem' }}
        >
          {isFriend ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
      )}
    </FlexBetween>
  )
}

export default Friend
