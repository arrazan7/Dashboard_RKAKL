// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'

import { useContext, useEffect, useState } from 'react'
import { useAuth } from '../../../../hooks/useAuth'
import axios from 'axios'
import Button from '@mui/material/Button'
import { Box, Card, CardContent, CardHeader, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useRouter } from 'next/router'
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import FormHelperText from '@mui/material/FormHelperText'

const createUnitKerjaSchema = yup.object().shape({
  unitOrganisasiCode: yup.string().required('Unit Organisasi Harus Diisi'),
  name: yup.string().required('Nama Unit Kerja Harus Diisi'),
  code: yup.string().required('Kode Unit Kerja Harus Diisi')
})

interface FormData {
  code: string
  name: string
  unitOrganisasiCode: string
}

const defaultValues = {}

const CreateUnitKerja = () => {
  const auth = useAuth()
  const router = useRouter()

  const [data, setData] = useState([])

  const getUnitOrganisasi = async () => {
    const res = await axios.get(`/api/unit-organisasi`, {
      headers: {
        Authorization: auth.token
      }
    })
    setData(res.data.data.data)
  }

  useEffect(() => {
    getUnitOrganisasi()
  }, [])

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(createUnitKerjaSchema)
  })

  const onSubmit = async (form: FormData) => {
    try {
      const response = await axios.post('/api/unit-kerja/create', form, {
        headers: {
          Authorization: auth.token,
          'Content-Type': 'application/json'
        }
      })
      router.push({
        pathname: '/satker/unit-kerja/list',
        query: {
          message: response.data.message
        }
      })
    } catch (error: any) {
      if (error.response.data.errorCode === 400) {
        setError(`code`, {
          type: 'manual',
          message: 'Kode Unit Kerja Sudah Terdaftar'
        })
      } else {
        setError(`unitOrganisasiCode`, {
          type: 'manual',
          message: 'error' + error
        })
      }
    }
  }
  return (
    <Grid item xs={12}>
      <Card sx={{ mt: 2 }}>
        <CardHeader title='Tambah Unit Kerja' />
        <CardContent>
          {/* <form onSubmit={e => e.preventDefault()}> */}
          <form>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <FormControl fullWidth sx={{ mb: 4 }}>
                  <Controller
                    name='unitOrganisasiCode'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <>
                        <InputLabel id='unit-organisasi-select-label'>Unit Organisasi</InputLabel>
                        <Select
                          value={value}
                          label='Unit Organisasi'
                          id='unit-organisasi-select'
                          onChange={onChange}
                          onBlur={onBlur}
                          error={Boolean(errors.unitOrganisasiCode)}
                          labelId='unit-organisasi-select-label'
                        >
                          {data.map(({ code, name }, index) => (
                            <MenuItem key={index} value={code}>
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                      </>
                    )}
                  />
                  {errors.unitOrganisasiCode && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.unitOrganisasiCode.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth sx={{ mb: 4 }}>
                  <Controller
                    name='code'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        label='Kode Unit Kerja'
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
                    name='name'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        label='Nama Unit Kerja'
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
    </Grid>
  )
}

export default CreateUnitKerja
