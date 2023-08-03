import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FavoriteBorderOutlined,
  FavoriteOutlined,
  MessageOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import { FlexBetween, WidgetWrapper } from "components/StyledComponent";
import { setPost } from "state";

const PostWidget = ({
  postId,
  postUserId,
  name,
  location,
  description,
  postPicturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const dispatch = useDispatch();
  const [showComment, setShowComment] = useState(false);

  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likesCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const handleShowComment = () => {
    setShowComment((showComment) => !showComment);
  };

  const handlePatchLike = async () => {
    const res = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });

    const data = await res.json();
    dispatch(setPost({ post: data }));
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        image={userPicturePath}
        name={name}
        subtitle={location}
        friendId={postUserId}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {postPicturePath && (
        <img
          src={`http://localhost:3001/assets/${postPicturePath}`}
          width="100%"
          height="auto"
          alt="post"
          style={{
            borderRadius: "0.5rem",
            marginTop: "0.5rem",
            objectFit: "cover",
          }}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={handlePatchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likesCount}</Typography>
          </FlexBetween>
          <FlexBetween gap="0.3rem">
            <IconButton onClick={handleShowComment}>
              <MessageOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>
        <ShareOutlined />
      </FlexBetween>
      {showComment && (
        <Box mt="0.5rem">
          {comments.map((comment, idx) => (
            <Box key={`${name}-${idx}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
