// ** MUI Imports
import Grid from '@mui/material/Grid'

import { ChangeEvent, useEffect, useState } from 'react'
import { useAuth } from '../../../../hooks/useAuth'
import axios from 'axios'
import Button from '@mui/material/Button'
import { Box, Card, CardContent, CardHeader, FormHelperText, TextField } from '@mui/material'
import { useRouter } from 'next/router'
import { putMethod } from 'src/hooks/fetch'

const UpdateLembaga = () => {
  const auth = useAuth()
  const router = useRouter()
  const { id } = router.query
  const [error, setError] = useState<boolean | string>()
  const [form, setForm] = useState({
    code: '',
    name: ''
  })

  useEffect(() => {
    const getOneLembaga = async (id: any) => {
      const res = await axios.get(`/api/lembaga/${id}`, {
        headers: {
          Authorization: auth.token
        }
      })
      if (!res) {
        setError('Data Lembaga Tidak Ditemukan')
      } else {
        setForm({ ...form, name: res.data.data.name, code: res.data.data.code })
      }
    }

    getOneLembaga(id)
  }, [])

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      const response: any = await putMethod(`/api/lembaga/edit/${id}`, form, auth.token)
      router.push({
        pathname: '/satker/lembaga/list',
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
      <CardHeader title='Ubah Lembaga' />
      <CardContent>
        <form>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Kode Lembaga'
                type='text'
                name='code'
                value={form.code}
                onChange={handleChange}
              />
              {error && <FormHelperText sx={{ color: 'error.main' }}>{error}</FormHelperText>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Nama Lembaga'
                type='text'
                name='name'
                value={form.name}
                onChange={handleChange}
              />
              {error && <FormHelperText sx={{ color: 'error.main' }}>{error}</FormHelperText>}
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

export default UpdateLembaga
