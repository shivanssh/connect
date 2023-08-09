import React from 'react'
import { render } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import authReducer from '../../state'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@emotion/react'
import { createTheme } from '@mui/material'
import { themeSettings } from 'theme'

export const mockInitialState = {
  mode: 'light',
  user: {
    _id: '64ca039c8e7e787e68241aaa',
    firstName: 'Test',
    lastName: 'Person',
    email: 'testperson@gmail.com',
    picturePath: 'p10.jpeg',
    friends: [
      {
        _id: '64ca039c8e7e787e68241aaa',
        firstName: 'Test',
        lastName: 'Person',
        email: 'testperson@gmail.com',
        picturePath: 'p10.jpeg',
        location: 'Test Location',
      },
    ],
    location: 'Test Location',
    occupation: 'Test Occupation',
    impressions: 5693,
    viewedProfile: 2113,
  },
  token: 'dummyToken',
  posts: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: null,
}

export const renderWithProviders = (
  ui,
  {
    preloadedState = mockInitialState,
    store = configureStore({ reducer: authReducer, preloadedState }),
    ...renderOptions
  } = {},
) => {
  const Wrapper = ({ children }) => {
    return (
      <Provider store={store}>
        <ThemeProvider
          theme={createTheme(themeSettings(mockInitialState.mode))}
        >
          <BrowserRouter>{children}</BrowserRouter>
        </ThemeProvider>
      </Provider>
    )
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

export * from '@testing-library/react'
