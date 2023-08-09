import { useTheme } from '@emotion/react'
import { Typography, Box } from '@mui/material'
import Friend from 'components/friends/Friend'
import { WidgetWrapper } from 'components/StyledComponent'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFriends } from 'state'

const FriendListWidget = ({ userId }) => {
  const { palette } = useTheme()
  const dispatch = useDispatch()
  const friends = useSelector((state) => state.user.friends)
  const token = useSelector((state) => state.token)

  const getFriends = async () => {
    try {
      const res = await fetch(`http://localhost:3001/users/friends/${userId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      const data = await res.json()
      dispatch(setFriends({ friends: data }))
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getFriends()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper mt="1rem">
      <Typography color={palette.neutral.dark} variant="h5" mb="1rem">
        Friend List
      </Typography>
      {!!friends.length &&
        friends.map(({ _id, firstName, lastName, occupation, picturePath }) => {
          return (
            <Box key={_id} m="0.5rem 0">
              <Friend
                key={_id}
                image={picturePath}
                name={`${firstName} ${lastName}`}
                friendId={_id}
                subtitle={occupation}
              />
            </Box>
          )
        })}
    </WidgetWrapper>
  )
}

export default FriendListWidget
