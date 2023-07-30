import { Box } from "@mui/material";
import { styled } from "@mui/system";

export const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const FlexCenter = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const FlexStart = styled(Box)({
  display: "flex",
  alignItems: "center",
});

export const WidgetWrapper = styled(Box)(({ theme }) => ({
  padding: "1.5rem 1.5rem 0.75rem 1.5rem",
  backgroundColor: theme.palette.background.alt,
  borderRadius: "0.75rem",
}));
