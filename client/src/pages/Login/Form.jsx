import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '@emotion/react'
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import * as yup from 'yup'
import { Formik } from 'formik'
import Dropzone from 'react-dropzone'
import { FlexBetween } from 'components/StyledComponent'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { registerUser, userLogin } from 'state'

const registerSchema = yup.object().shape({
  firstName: yup.string().required('required'),
  lastName: yup.string().required('required'),
  email: yup.string().email('enter valid email').required('required'),
  password: yup.string().required('required'),
  location: yup.string().required('required'),
  occupation: yup.string().required('required'),
  picture: yup.string().required('required'),
})

const loginSchema = yup.object().shape({
  email: yup.string().required('required'),
  password: yup.string().required('required'),
})

const registerInitialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  location: '',
  occupation: '',
  picture: '',
}

const loginInitialValues = {
  email: '',
  password: '',
}

const Form = () => {
  const [pageType, setPageType] = useState('login')
  const [showPassword, setShowPassword] = useState(false)
  const { palette } = useTheme()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isLoginPage = pageType === 'login'
  const isRegisterPage = pageType === 'register'
  const isNonMobileScreens = useMediaQuery('(min-width:600px)')

  const { isSuccess, isLoading, token } = useSelector((state) => state)

  useEffect(() => {
    if (pageType === 'register' && isSuccess) {
      setPageType('login')
    }

    if (pageType === 'login' && isSuccess && token) {
      navigate('/home')
    }
  }, [isSuccess, pageType, navigate, token])

  const register = async (values, onSubmitProps) => {
    const formData = new FormData()
    for (let value in values) {
      formData.append(value, values[value])
    }
    formData.append('picturePath', values.picture.name)
    dispatch(registerUser(formData))
    onSubmitProps.resetForm()
  }

  const login = (values, onSubmitProps) => {
    dispatch(userLogin(values))
    onSubmitProps.resetForm()
  }

  const handleSubmit = (values, onSubmitProps) => {
    pageType === 'login'
      ? login(values, onSubmitProps)
      : register(values, onSubmitProps)
  }

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={isLoginPage ? loginInitialValues : registerInitialValues}
      validationSchema={isLoginPage ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="15px"
            gridTemplateColumns="repeat(4 , minmax(0, 1fr))"
            sx={{
              '&>div': {
                gridColumn: isNonMobileScreens ? undefined : 'span 4',
              },
            }}
          >
            {isRegisterPage && (
              <>
                <TextField
                  label="First Name"
                  name="firstName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{
                    gridColumn: 'span 2',
                  }}
                />
                <TextField
                  label="Last Name"
                  name="lastName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{
                    gridColumn: 'span 2',
                  }}
                />
                <TextField
                  label="Location"
                  name="location"
                  value={values.location}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{
                    gridColumn: 'span 2',
                  }}
                />
                <TextField
                  label="Occupation"
                  name="occupation"
                  value={values.occupation}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{
                    gridColumn: 'span 2',
                  }}
                />
                <Box
                  gridColumn="span 4"
                  p="1rem"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) => {
                      setFieldValue('picture', acceptedFiles[0])
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{
                          '&:hover': { cursor: 'pointer' },
                        }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add your profile picture</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}
            <TextField
              label="Email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{
                gridColumn: 'span 4',
              }}
            />
            <TextField
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              onPaste={(e) => e.preventDefault()}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{
                gridColumn: 'span 4',
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* BUTTON */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: '2rem 0',
                p: '1rem',
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                '&:hover': { color: palette.primary.main },
              }}
            >
              {isLoginPage ? 'Login' : 'Register'}
              {isLoading && <CircularProgress size="1.5rem" />}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLoginPage ? 'register' : 'login')
                resetForm()
              }}
              sx={{
                textDecoration: 'underline',
                color: palette.primary.main,
                '&:hover': {
                  cursor: 'pointer',
                  color: palette.neutral.dark,
                },
              }}
            >
              {isLoginPage
                ? "Didn't have account? Sign-up here."
                : 'Already have an account? Login here.'}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  )
}

export default Form
