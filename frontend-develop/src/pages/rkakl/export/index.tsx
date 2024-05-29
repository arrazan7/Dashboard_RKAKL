import { useEffect, useState } from 'react'
import { useAuth } from 'src/hooks/useAuth'

// ** Fetch Data Import
import { getMethod, postMethod } from 'src/hooks/fetch'
import axios from 'axios'

// ** MUI Imports
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  useTheme
} from '@mui/material'

// ** Component
import PageHeader from 'src/@core/components/page-header'
import Spinner from 'src/@core/components/spinner'
import CustomInput from 'src/views/components/PickersCustomInput'

// ** Third Party Imports
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Type
type DataUnitOrganisasi = []

const ListRkakl = () => {
  const auth = useAuth()

  // ** State Get Filter
  const [dataUnitOrganisasi, setDataUnitOrganisasi] = useState<DataUnitOrganisasi>([])

  // ** State Set Filter Data
  const [form, setForm] = useState({
    unitOrganisasiCode: '',
    year: ''
  })

  // ** State Export Data
  const [dataExport, setDataExport] = useState<any>(null)
  const [downloadFileName, setDownloadFileName] = useState<string>('')

  // ** State Error
  const [fromError, setFormError] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // ** State Loading
  const [loading, setLoading] = useState(false)

  // ** Styling Select Year
  const theme = useTheme()
  const { direction } = theme
  const popperPlacement: ReactDatePickerProps['popperPlacement'] = direction === 'ltr' ? 'bottom-start' : 'bottom-end'

  // ** Fetch Filter Data
  useEffect(() => {
    const getUnitOrganisasi = async () => {
      try {
        const res = await getMethod('/api/unit-organisasi', '', auth.token)
        setDataUnitOrganisasi(res.data.data.data)
      } catch (error) {
        console.error(error)
      }
    }

    getUnitOrganisasi()
  }, [])

  const generateSummary = async (e: any) => {
    e.preventDefault()
    if (!form.unitOrganisasiCode || !form.year) {
      setFormError('Wajib Diisi')
    }
    try {
      setLoading(true)
      console.log('Form:', form)
      const resGenerate: any = await postMethod('/api/rkakl/document/generate-summary', form, '', auth.token)
      setDataExport(resGenerate.data.data.URL)
      const fileName = `generated-rkakl-data-${form.unitOrganisasiCode}-${form.year}.xlsx`
      setDownloadFileName(fileName)
    } catch (error) {
      setError('Gagal Generate Data')
    }
    setLoading(false)
  }

  useEffect(() => {
    console.log(form)
  }, [])

  const downloadSummary = async (e: any) => {
    e.preventDefault()
    try {
      const res = await axios.get(`/api${dataExport}`, {
        headers: {
          Authorization: auth.token,
          Accept: 'application/file'
        },
        responseType: 'blob'
      })
      const binaryData = []
      binaryData.push(res.data)
      const downloadLink = document.createElement('a')
      downloadLink.href = window.URL.createObjectURL(new Blob(binaryData))
      const fileName = downloadFileName
      setDownloadFileName(fileName)
      if (fileName) {
        downloadLink.setAttribute('download', fileName)
      }
      document.body.appendChild(downloadLink)
      downloadLink.click()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <PageHeader
          title={<Typography variant='h5'>Export RKAKL</Typography>}
          subtitle={<Typography variant='body2'>Data RKAKL sebagai master data RKAKP</Typography>}
        />
      </Grid>

      {/* Select Data */}
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Pilih Data' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
          <CardContent>
            <Grid container spacing={5}>
              <Grid item sm={8} xs={12}>
                <FormControl fullWidth required>
                  <InputLabel id='unit-organisasi-select'>Unit Organisasi</InputLabel>
                  <Select
                    fullWidth
                    id='select-unit-organisasi'
                    label='Unit Organisasi'
                    labelId='unit-organisasi-select'
                    onChange={(e: SelectChangeEvent) => {
                      setForm({ ...form, unitOrganisasiCode: e.target.value as string })
                      setFormError('')
                    }}
                    inputProps={{ placeholder: 'Unit Organisasi' }}
                    value={form.unitOrganisasiCode}
                  >
                    {dataUnitOrganisasi?.map((data: any) => (
                      <MenuItem key={data.code} value={data.code}>
                        {data.name}
                      </MenuItem>
                    )) ?? (
                      <MenuItem value='' disabled>
                        Data Unit Organisasi Tidak Ada
                      </MenuItem>
                    )}
                  </Select>
                  {!form.unitOrganisasiCode && (
                    <FormHelperText sx={{ color: 'error.main' }}>{fromError}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item sm={3} xs={5}>
                <Box>
                  <DatePickerWrapper>
                    <DatePicker
                      required
                      showYearPicker
                      id='year-picker'
                      dateFormat='yyyy'
                      popperPlacement={popperPlacement}
                      value={form.year}
                      onChange={(date: Date) => {
                        setForm({ ...form, year: `${date.getFullYear()}` })
                        setFormError('')
                      }}
                      customInput={<CustomInput label='Tahun' />}
                    />
                  </DatePickerWrapper>
                  {!form.year && <FormHelperText sx={{ color: 'error.main' }}>{fromError}</FormHelperText>}
                </Box>
              </Grid>
            </Grid>
            <Grid item sm={3} xs={5} sx={{ mt: 5 }}>
              {!form.unitOrganisasiCode || !form.year ? (
                <Button type='submit' variant='contained' disabled>
                  Ringkas Data
                </Button>
              ) : (
                <Button type='submit' variant='outlined' onClick={generateSummary}>
                  Ringkas Data
                </Button>
              )}
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* Error Message */}
      <Grid item xs={12}>
        {error && (
          <Alert severity='error' onClose={() => setError(null)}>
            {error}
          </Alert>
        )}
      </Grid>
      {/* Export File */}
      {!dataExport ? null : loading ? (
        <Grid item xs={12}>
          <Card>
            <Spinner />
          </Card>
        </Grid>
      ) : (
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <form>
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  {downloadFileName ? <Typography>Download File : {downloadFileName}</Typography> : null}
                  <Button type='submit' variant='outlined' onClick={downloadSummary}>
                    Export Data
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Grid>
      )}
    </Grid>
  )
}

export default ListRkakl
