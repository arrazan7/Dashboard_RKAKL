// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'

import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Button from '@mui/material/Button'
import { Box, Card, CardContent, CardHeader, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useRouter } from 'next/router'
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import FormHelperText from '@mui/material/FormHelperText'
import { useAuth } from 'src/hooks/useAuth'

const createUserSchema = yup.object().shape({
  email: yup.string().email().required('Email Harus Diisi'),
  password: yup.string().min(5).required('Password Harus Diisi'),
  name: yup.string().required('Nama Harus Diisi'),
  role: yup.string().required('Role Harus Diisi')
})

interface FormData {
  email: string
  password: string
  name: string
  role: string
}

type errorType = {
  code: Error
  name: Error
}

const defaultValues = {}

const CreateUser = () => {
  const auth = useAuth()
  const router = useRouter()
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [resMessage, setResMessage] = useState<string>()

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(createUserSchema)
  })

  const onSubmit = async (form: FormData) => {
    try {
      const response = await axios.post('/api/user/create', form, {
        headers: {
          Authorization: auth.token,
          'Content-Type': 'application/json'
        }
      })
      setResMessage(response.data.message)
      router.push({
        pathname: '/user/list',
        query: {
          message: response.data.message
        }
      })
    } catch (error: any) {
      if (error.response.data.errorCode === 400) {
        setError(`email`, {
          type: 'manual',
          message: 'Email Sudah Terdaftar'
        })
      } else {
        setError(`email`, {
          type: 'manual',
          message: 'error' + error
        })
      }
    }
  }
  return (
    <Card>
      <CardHeader title='Tambah User' />
      <CardContent>
        <form>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='email'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      autoFocus
                      label='Email'
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.email)}
                    />
                  )}
                />
                {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='password'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      label='Password'
                      type='password'
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.password)}
                    />
                  )}
                />
                {errors.password && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.password.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='name'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      label='Nama'
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.name)}
                    />
                  )}
                />
                {errors.name && <FormHelperText sx={{ color: 'error.main' }}>{errors.name.message}</FormHelperText>}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='role'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <>
                      <InputLabel id='role-select-label'>Role</InputLabel>
                      <Select
                        value={value}
                        label='Role'
                        id='role-select'
                        onChange={onChange}
                        onBlur={onBlur}
                        error={Boolean(errors.role)}
                        labelId='role-select-label'
                      >
                        <MenuItem value='admin'>Admin</MenuItem>
                        <MenuItem value='user'>User</MenuItem>
                      </Select>
                    </>
                  )}
                />
                {errors.role && <FormHelperText sx={{ color: 'error.main' }}>{errors.role.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  gap: 5,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'end'
                }}
              >
                <Button type='submit' variant='contained' size='large' onClick={handleSubmit(onSubmit)}>
                  Tambah
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default CreateUser
