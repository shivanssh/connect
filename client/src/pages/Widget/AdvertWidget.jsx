import { useTheme } from "@emotion/react";
import { Typography } from "@mui/material";
import { FlexBetween, WidgetWrapper } from "components/StyledComponent";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        src={`http://localhost:3001/assets/cosmetics.jpeg`}
        width="100%"
        alt="advert"
        style={{
          borderRadius: "0.5rem",
          margin: "0.2rem 0",
        }}
      />
      <FlexBetween>
        <Typography color={main}>TestCosmetics</Typography>
        <Typography color={medium}>testCosmetics.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Your pathway to stunning and immaculate beauty and made sure your skin
        is exfoliating skin and shining like light.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
