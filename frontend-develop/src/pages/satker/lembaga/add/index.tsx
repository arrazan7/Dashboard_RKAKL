// ** MUI Imports
import Grid from '@mui/material/Grid'

import { useAuth } from '../../../../hooks/useAuth'
import Button from '@mui/material/Button'
import { Box, Card, CardContent, CardHeader, FormControl, TextField } from '@mui/material'
import { useRouter } from 'next/router'
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import FormHelperText from '@mui/material/FormHelperText'
import { postMethod } from 'src/hooks/fetch'

const createLembagaSchema = yup.object().shape({
  name: yup.string().required('Nama Lembaga Harus Diisi'),
  code: yup.string().required('Kode Lembaga Harus Diisi')
})

interface FormData {
  code: string
  name: string
}

const defaultValues = {}

const CreateLembaga = () => {
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
    resolver: yupResolver(createLembagaSchema)
  })

  const onSubmit = async (form: FormData) => {
    try {
      const response: any = await postMethod('/api/lembaga/create', form, '', auth.token)
      router.push({
        pathname: '/satker/lembaga/list',
        query: {
          message: response.data.message
        }
      })
    } catch (error) {
      setError(`code`, {
        type: 'manual',
        message: 'error add ' + error
      })
    }
  }
  return (
    <Card>
      <CardHeader title='Tambah Lembaga' />
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
                      label='Kode Lembaga'
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
                      label='Nama Lembaga'
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

export default CreateLembaga
