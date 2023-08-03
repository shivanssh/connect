import { useState } from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { FlexBetween, WidgetWrapper } from "components/StyledComponent";
import UserImage from "components/UserImage";
import { useTheme } from "@emotion/react";
import { useSelector, useDispatch } from "react-redux";
import {
  AttachFileOutlined,
  DeleteOutline,
  EditOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import Dropzone from "react-dropzone";
import { setPosts } from "state";

const MyPostWidget = ({ picturePath }) => {
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [postDesc, setPostDesc] = useState("");
  const { palette } = useTheme();

  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", postDesc);
    if (image) {
      formData.append("picture", image);
      formData.append("postPicturePath", image.name);
    }

    const res = await fetch("http://localhost:3001/posts/createPost", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await res.json();

    if (posts) {
      dispatch(setPosts({ posts }));
      setImage(null);
      setPostDesc("");
      setIsImage(false);
    }
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What's on your mind"
          onChange={(e) => setPostDesc(e.target.value)}
          value={postDesc}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            padding: "1rem 2rem",
            borderRadius: "2rem",
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          p="1rem"
          mt="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => {
              setImage(acceptedFiles[0]);
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p=".5rem"
                  width="100%"
                  sx={{
                    "&:hover": { cursor: "pointer" },
                  }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image here.</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "10%" }}
                  >
                    <DeleteOutline />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}
      <Divider sx={{ margin: "1.25rem 0" }} />

      {/* BUTTON AND ICONS */}
      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage((prev) => !prev)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Image
          </Typography>
        </FlexBetween>
        {isNonMobileScreens ? (
          <>
            <FlexBetween gap="0.25rem">
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Clip</Typography>
            </FlexBetween>
            <FlexBetween gap="0.25rem">
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attach</Typography>
            </FlexBetween>
            <FlexBetween gap="0.25rem">
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Audio</Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}

        <Button
          disabled={!postDesc}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
            "&:disabled": {
              cursor: "not-allowed",
            },
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
