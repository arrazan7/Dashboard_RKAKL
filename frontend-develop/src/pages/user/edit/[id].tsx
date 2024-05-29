// ** MUI Imports
import Grid from '@mui/material/Grid'

import { useEffect, useState } from 'react'
import axios from 'axios'
import Button from '@mui/material/Button'
import { Box, Card, CardContent, CardHeader, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useRouter } from 'next/router'
import { useAuth } from 'src/hooks/useAuth'
import { putMethod } from 'src/hooks/fetch'

const UpdateUser = () => {
  const auth = useAuth()
  const router = useRouter()
  const { id } = router.query
  const [form, setForm] = useState({
    email: '',
    name: '',
    password: '',
    role: ''
  })

  const getOneUser = async (id: any) => {
    const res = await axios.get(`/api/user/${id}`, {
      headers: {
        Authorization: auth.token
      }
    })
    setForm({
      ...form,
      email: res.data.data.email,
      name: res.data.data.name,
      password: res.data.data.password,
      role: res.data.data.role
    })
  }

  useEffect(() => {
    getOneUser(id)
  }, [])

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      const response: any = await putMethod(`/api/user/edit/${id}`, form, auth.token)

      router.push({
        pathname: '/user/list',
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
      <CardHeader title='Ubah User' />
      <CardContent>
        {/* <form onSubmit={e => e.preventDefault()}> */}
        <form>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField fullWidth label='Email' type='email' name='email' value={form.email} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label='Nama' type='text' name='name' value={form.name} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Password'
                type='password'
                name='password'
                value={form.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id='role-select-label'>Role</InputLabel>
                <Select value={form.role} label='Role' id='role-select' labelId='role-select-label'>
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value='admin'>Admin</MenuItem>
                  <MenuItem value='user'>User</MenuItem>
                </Select>
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

export default UpdateUser
