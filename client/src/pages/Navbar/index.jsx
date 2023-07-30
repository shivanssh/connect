import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@emotion/react";
import {
  Box,
  FormControl,
  IconButton,
  InputBase,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { FlexBetween } from "components/StyledComponent";
import {
  Close,
  DarkMode,
  Help,
  LightMode,
  Message,
  Notifications,
  Search,
  Menu,
} from "@mui/icons-material";
// import MenuIcon from "@mui/icons-material/Menu";
import { setLogout, setMode } from "../../state";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const theme = useTheme();
  const primaryLight = theme.palette.primary.light;
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const alt = theme.palette.background.alt;

  const fullName = user ? `${user.firstName} ${user.lastName}` : "Dummy User";

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1.25rem,2rem,2.25rem)"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          Connect
        </Typography>
        {isNonMobileScreens && (
          <FlexBetween
            gap="3rem"
            borderRadius="9px"
            backgroundColor={neutralLight}
            padding="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search...." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
          <Message sx={{ fontSize: "25px" }} />
          <Notifications sx={{ fontSize: "25px" }} />
          <Help sx={{ fontSize: "25px" }} />
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                padding: ".25rem 1rem",
                width: "150px",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  dispatch(setLogout());
                  navigate("/");
                }}
              >
                Logout
              </MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled((prevState) => !prevState)}
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          minWidth="300px"
          maxWidth="500px"
          backgroundColor={background}
          zIndex="10"
        >
          <Box display="flex" justifyContent="flex-end" padding="1rem">
            {/* CLOSE ICON */}
            <IconButton
              onClick={() => setIsMobileMenuToggled((prevState) => !prevState)}
            >
              <Close />
            </IconButton>
          </Box>
          {/* MENU ITEMS */}
          <Box>
            <FlexBetween
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="3rem"
            >
              <IconButton onClick={() => dispatch(setMode())}>
                {theme.palette.mode === "dark" ? (
                  <DarkMode sx={{ fontSize: "25px" }} />
                ) : (
                  <LightMode sx={{ color: dark, fontSize: "25px" }} />
                )}
              </IconButton>
              <Message sx={{ fontSize: "25px" }} />
              <Notifications sx={{ fontSize: "25px" }} />
              <Help sx={{ fontSize: "25px" }} />
              <FormControl variant="standard" value={fullName}>
                <Select
                  value={fullName}
                  sx={{
                    backgroundColor: neutralLight,
                    padding: ".25rem 1rem",
                    width: "150px",
                    "& .MuiSvgIcon-root": {
                      pr: "0.25rem",
                      width: "3rem",
                    },
                    "& .MuiSelect-select:focus": {
                      backgroundColor: neutralLight,
                    },
                  }}
                  input={<InputBase />}
                >
                  <MenuItem value={fullName}>
                    <Typography>{fullName}</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => dispatch(setLogout())}>
                    Logout
                  </MenuItem>
                </Select>
              </FormControl>
            </FlexBetween>
          </Box>
        </Box>
      )}
    </FlexBetween>
  );
};
export default Navbar;
