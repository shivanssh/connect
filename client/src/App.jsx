import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from 'pages/Home'
import Profile from 'pages/Profile'
import Login from 'pages/Login'
import FourOFour from 'pages/FourOFour'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline, createTheme } from '@mui/material'
import { themeSettings } from 'theme'

const App = () => {
  const mode = useSelector((state) => state.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

  const isAuth = Boolean(useSelector((state) => state.token))

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={isAuth ? <Home /> : <Navigate to="/" />} />
        <Route
          path="/profile/:userId"
          element={isAuth ? <Profile /> : <Navigate to="/" />}
        />
        <Route path="*" element={<FourOFour />} />
      </Routes>
    </ThemeProvider>
  )
}
export default App
