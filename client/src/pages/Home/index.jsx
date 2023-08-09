import { useSelector } from 'react-redux'
import { Box, useMediaQuery } from '@mui/material'
import Navbar from 'pages/Navbar'
import MyPostWidget from 'pages/Widget/MyPostWidget'
import UserWidget from 'pages/Widget/userWidget/UserWidget'
import PostsWidget from 'pages/Widget/PostsWidget'
import AdvertWidget from 'pages/Widget/advertWidget/AdvertWidget'
import FriendListWidget from 'pages/Widget/friendListWidget/FriendListWidget'

const Home = () => {
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)')
  const { _id, picturePath } = useSelector((state) => state.user)

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        p="2rem 6%"
        display={isNonMobileScreens ? 'flex' : 'block'}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? '42%' : undefined}
          mt={isNonMobileScreens ? undefined : '2rem'}
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
            <AdvertWidget />
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  )
}
export default Home
