// ** MUI Imports
import Grid from '@mui/material/Grid'

import { useContext, useEffect, useState } from 'react'
import { useAuth } from '../../../../hooks/useAuth'
import axios from 'axios'
import Button from '@mui/material/Button'
import { Box, Card, CardContent, CardHeader, FormControl, TextField } from '@mui/material'
import { useRouter } from 'next/router'

const UpdateUnitKerja = () => {
  const auth = useAuth()
  const router = useRouter()
  const { id } = router.query
  const [typeError, setTypeError] = useState<string | boolean>()
  const [form, setForm] = useState({
    unitOrganisasiCode: '',
    code: '',
    name: ''
  })

  const getOneUnitKerja = async (id: any) => {
    try {
      const res = await axios.get(`/api/unit-kerja/${id}`, {
        headers: {
          Authorization: auth.token
        }
      })
      setForm({
        ...form,
        unitOrganisasiCode: res.data.data.unit_organisasi_code,
        name: res.data.data.name,
        code: res.data.data.code
      })
    } catch (error) {
      setTypeError('Data Unit Kerja Tidak Ditemukan')
    }
  }

  useEffect(() => {
    getOneUnitKerja(id)
  }, [])

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    console.log('change', form)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      const response = await axios.put(`/api/unit-kerja/edit/${id}`, form, {
        headers: {
          Authorization: auth.token
        }
      })
      router.push({
        pathname: '/satker/unit-kerja/list',
        query: {
          message: response.data.message + ' update data'
        }
      })
    } catch (error) {
      setTypeError('')
    }
  }

  return (
    <Card>
      <CardHeader title='Ubah Unit Kerja' />
      <CardContent>
        {/* <form onSubmit={e => e.preventDefault()}> */}
        <form>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label='Kode Unit Organisasi'
                type='text'
                name='unitOrganisasiCode'
                value={form.unitOrganisasiCode}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label='Kode Unit Kerja'
                type='text'
                name='code'
                value={form.code}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label='Nama Unit Kerja'
                type='text'
                name='name'
                value={form.name}
                onChange={handleChange}
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

export default UpdateUnitKerja
