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
  code: string
  type: string
  name: string
  parentCode: string
}

const defaultValues = {}

const CreateKodeBelanja = () => {
  const auth = useAuth()
  const router = useRouter()

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
      router.push({
        pathname: '/kode-belanja/list',
        query: {
          message: response.data.message
        }
      })
    } catch (error: any) {
      if (error.response.data.errorCode === 400) {
        setError(`code`, {
          type: 'manual',
          message: 'Kode Sudah Terdaftar'
        })
      } else {
        setError(`code`, {
          type: 'manual',
          message: 'error' + error
        })
      }
    }
  }
  return (
    <Card>
      <CardHeader title='Tambah Kode Belanja' />
      <CardContent>
        <form>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='code'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      autoFocus
                      label='Kode'
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.code)}
                    />
                  )}
                />
                {errors.code && <FormHelperText sx={{ color: 'error.main' }}>{errors.code.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='type'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      label='Tipe'
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.type)}
                    />
                  )}
                />
                {errors.type && <FormHelperText sx={{ color: 'error.main' }}>{errors.type.message}</FormHelperText>}
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
                  name='parentCode'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      label='Kode Parent'
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.parentCode)}
                    />
                  )}
                />
                {errors.parentCode && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.parentCode.message}</FormHelperText>
                )}
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

export default CreateKodeBelanja
