import { Box, useMediaQuery } from '@mui/material'
import Navbar from 'pages/Navbar'
import FriendListWidget from 'pages/Widget/friendListWidget/FriendListWidget'
import MyPostWidget from 'pages/Widget/myPostWidget/MyPostWidget'
import PostsWidget from 'pages/Widget/PostsWidget'
import UserWidget from 'pages/Widget/userWidget/UserWidget'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const Profile = () => {
  const [user, setUser] = useState(null)
  const { userId } = useParams()
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)')

  const token = useSelector((state) => state.token)

  const getUser = async () => {
    try {
      const res = await fetch(`http://localhost:3001/users/${userId}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      })
      const user = await res.json()
      setUser(user)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getUser()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null
  }

  return (
    <Box>
      <Navbar />
      <Box
        display={isNonMobileScreens ? 'flex' : 'block'}
        justifyContent="center"
        width="100%"
        padding="2rem 12%"
        gap="2rem"
      >
        <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
          <UserWidget picturePath={user.picturePath} userId={userId} />
          <FriendListWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? '42%' : undefined}
          mt={!isNonMobileScreens ? '2rem' : undefined}
        >
          <MyPostWidget picturePath={user.picturePath} />
          <PostsWidget userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  )
}
export default Profile
