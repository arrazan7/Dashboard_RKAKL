// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'

import { useContext, useEffect, useState } from 'react'
import { useAuth } from '../../../../hooks/useAuth'
import axios from 'axios'
import Button from '@mui/material/Button'
import { Box, Card, CardContent, CardHeader, FormControl, TextField } from '@mui/material'
import { useRouter } from 'next/router'
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import FormHelperText from '@mui/material/FormHelperText'
import { putMethod } from 'src/hooks/fetch'

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const updateUnitOrganisasiSchema = yup.object().shape({
  lembaga_code: yup.string().required(),
  name: yup.string().required(),
  code: yup.string().required()
})

interface FormData {
  code: string
  name: string
}

type errorType = {
  code: Error
  name: Error
}

const defaultValues = {}

const UpdateUnitOrganisasi = () => {
  const auth = useAuth()
  const router = useRouter()
  const { id } = router.query
  // const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    lembagaCode: '',
    code: '',
    name: ''
  })

  const getOneUnitOrganisasi = async (id: any) => {
    const res = await axios.get(`/api/unit-organisasi/${id}`, {
      headers: {
        Authorization: auth.token
      }
    })
    setForm({ ...form, lembagaCode: res.data.data.lembaga_code, name: res.data.data.name, code: res.data.data.code })
  }

  useEffect(() => {
    getOneUnitOrganisasi(id)
  }, [])

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      const response: any = await putMethod(`/api/unit-organisasi/edit/${id}`, form, auth.token)
      router.push({
        pathname: '/satker/unit-organisasi/list',
        query: {
          message: response.data.message + ' update data'
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Card>
      <CardHeader title='Ubah Unit Organisasi' />
      <CardContent>
        <form>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Kode Lembaga'
                type='text'
                name='lembagaCode'
                value={form.lembagaCode}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Kode Unit Organisasi'
                type='text'
                name='code'
                value={form.code}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Nama Unit Organisasi'
                type='text'
                name='name'
                value={form.name}
                // onBlur={onBlur}
                onChange={handleChange}
                // error={Boolean(errors.name)}
              />
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
                <Button type='submit' variant='contained' size='large' onClick={handleSubmit}>
                  Ubah
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default UpdateUnitOrganisasi
