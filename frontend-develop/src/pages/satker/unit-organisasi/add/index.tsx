// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'

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
import { postMethod } from 'src/hooks/fetch'

const createUnitOrganisasiSchema = yup.object().shape({
  lembagaCode: yup.string().required(),
  name: yup.string().required(),
  code: yup.string().required()
})

interface FormData {
  code: string
  name: string
  lembagaCode: string
}

const defaultValues = {}

const CreateUnitOrganisasi = () => {
  const auth = useAuth()
  const router = useRouter()
  const [data, setData] = useState([])
  const [total, setTotal] = useState([])

  const getLembaga = async () => {
    console.log(total)
    const res = await axios.get(`/api/lembaga?perPage=${total}`, {
      headers: {
        Authorization: auth.token
      }
    })
    setTotal(res.data.data.total)

    setData(res.data.data.data)
  }

  useEffect(() => {
    getLembaga()
  }, [])

  // const handleChange = (e: any) => {
  //   setForm({ ...form, [e.target.name]: e.target.value })
  //   console.log('change', form)
  // }

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(createUnitOrganisasiSchema)
  })
  const onSubmit = async (form: FormData) => {
    try {
      const response: any = await postMethod('/api/unit-organisasi/create', form, '', auth.token)
      router.push({
        pathname: '/satker/unit-organisasi/list',
        query: {
          message: response.data.message
        }
      })
    } catch (error) {
      setError(`lembagaCode`, {
        type: 'manual',
        message: 'error add ' + error
      })
    }
  }
  return (
    <Card>
      <CardHeader title='Tambah Unit Organisasi' />
      <CardContent>
        <form>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='lembagaCode'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <>
                      <InputLabel id='lembaga-select-label'>Lembaga</InputLabel>
                      <Select
                        value={value}
                        label='Lembaga'
                        id='lembaga-select'
                        onChange={onChange}
                        onBlur={onBlur}
                        error={Boolean(errors.lembagaCode)}
                        labelId='lembaga-select-label'
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
                {errors.lembagaCode && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.lembagaCode.message}</FormHelperText>
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
                      label='Kode Unit Organisasi'
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
                      label='Nama Unit Organisasi'
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
  )
}

export default CreateUnitOrganisasi
