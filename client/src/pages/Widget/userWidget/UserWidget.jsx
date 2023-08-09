import { useTheme } from '@emotion/react'
import {
  EditOutlined,
  LocationOnOutlined,
  ManageAccountsOutlined,
  WorkOutlineOutlined,
} from '@mui/icons-material'
import { Box, Divider, Typography } from '@mui/material'
import {
  FlexBetween,
  FlexStart,
  WidgetWrapper,
} from 'components/StyledComponent'
import UserImage from 'components/userImage/UserImage'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const UserWidget = ({ picturePath, userId }) => {
  const navigate = useNavigate()
  const { palette } = useTheme()

  const dark = palette.neutral.dark
  const main = palette.neutral.main
  const medium = palette.neutral.medium

  const user = useSelector((state) => state.user)
  if (!user) {
    return null
  }
  const {
    firstName,
    lastName,
    location,
    occupation,
    friends,
    viewedProfile,
    impressions,
  } = user
  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween gap="0.5rem" pb="1.1rem">
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              onClick={() => navigate(`/profile/${userId}`)}
              sx={{
                '&:hover': { cursor: 'pointer', color: palette.primary.light },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography>{friends.length} friends</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <FlexStart gap="1rem" mb="0.5rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography variant="h5" fontWeight="500" color={medium}>
            {occupation}
          </Typography>
        </FlexStart>
        <FlexStart gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography variant="h5" fontWeight="500" color={medium}>
            {location}
          </Typography>
        </FlexStart>
      </Box>

      <Divider />

      {/* THIRD ROW */}
      <Box p="1rem 0">
        <FlexBetween>
          <Typography color={main}>Who's viewed your profile</Typography>
          <Typography color={medium} fontWeight="500">
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={main}>Impressions of your post</Typography>
          <Typography color={medium} fontWeight="500">
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />

      {/* FOURTH ROW */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" fontWeight="500" color={main} mb="1rem">
          Social Profiles
        </Typography>
        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="../assets/twitter.png" alt="twitter" />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="../assets/linkedin.png" alt="linkedin" />
            <Box>
              <Typography color={main} fontWeight="500">
                LinkedIn
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  )
}

export default UserWidget
