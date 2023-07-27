import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import Profile from "pages/Profile";
import Login from "pages/Login";
import FourOFour from "pages/FourOFOur";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material";
import { themeSettings } from "theme";

const App = () => {
  const { mode } = useSelector((state) => state);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="*" element={<FourOFour />} />
      </Routes>
    </ThemeProvider>
  );
};
export default App;
