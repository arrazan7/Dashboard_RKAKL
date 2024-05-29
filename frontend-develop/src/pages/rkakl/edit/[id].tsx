import { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import { useAuth } from 'src/hooks/useAuth'

// ** Fetch Data Imports
import { getMethod, putMethod } from 'src/hooks/fetch'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  useTheme
} from '@mui/material'

// ** Icon Imports
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

// ** Component
import PageHeader from 'src/@core/components/page-header'
import CustomInput from 'src/views/components/PickersCustomInput'
import Spinner from '../../../@core/components/spinner'
import TreeNode from '../../../@core/components/tree'

// ** Third Party Imports
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

import { RKAKLGenerateResponse } from '../../../@core/dto/document.dto'

// ** Type
type DataLembaga = []
type DataUnitOrganisasi = []
type DataUnitKerja = []
type DateType = Date | null | undefined

const EditRKAKL = () => {
  const auth = useAuth()
  const router = useRouter()

  // ** State Get Filter
  const [dataLembaga, setDataLembaga] = useState<DataLembaga>([])
  const [dataUnitOrganisasi, setDataUnitOrganisasi] = useState<DataUnitOrganisasi>([])
  const [dataUnitKerja, setDataUnitKerja] = useState<DataUnitKerja>([])
  // ** State Set Filter Data
  const [choosenLembagaCode, setChoosenLembagaCode] = useState<string>('')
  const [choosenUnitOrganisasiCode, setChoosenUnitOrganisasiCode] = useState<string>('')
  const [choosenUnitKerjaCode, setChoosenUnitKerjaCode] = useState<string>('')
  const [year, setYear] = useState<DateType>(new Date())

  // ** State Handle File
  const [excelFile, setExcelFile] = useState(null)
  const [fileName, setFileName] = useState('')

  // ** State Error
  const [typeError, setTypeError] = useState<any>()
  const [filterError, setFilterError] = useState<any>()
  // ** State Loading
  const [loading, setLoading] = useState(false)

  // ** State Handle Submit Import
  const [importResponse, setImportResponse] = useState<RKAKLGenerateResponse | null>(null)
  const [documentID, setDocumentID] = useState<number>()

  // ** Styling Select Year
  const theme = useTheme()
  const { direction } = theme
  const popperPlacement: ReactDatePickerProps['popperPlacement'] = direction === 'ltr' ? 'bottom-start' : 'bottom-end'

  const { id } = router.query

  // ** Styling Upload File
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1
  })

  // ** Fetch Filter Data
  useEffect(() => {
    const getLembaga = async () => {
      try {
        const res = await getMethod('/api/lembaga', '', auth.token)
        setDataLembaga(res.data.data.data)
      } catch (error) {
        console.log(error)
      }
    }

    const getUnitOrganisasi = async () => {
      try {
        const res = await getMethod('/api/unit-organisasi', '', auth.token)
        setDataUnitOrganisasi(res.data.data.data)
      } catch (error) {
        console.error(error)
      }
    }

    const getUnitKerja = async () => {
      try {
        const res = await getMethod('/api/unit-kerja', '', auth.token)
        setDataUnitKerja(res.data.data.data)
      } catch (error) {
        console.error(error)
      }
    }

    const getDocument = () => {
      setLoading(true)
      console.log('start get document')
      axios.get(`/api/rkakl/document/${id}`, {
        headers: {
          Authorization: auth.token,
        }
      }).then(res => {
        setImportResponse(res.data)
        setDocumentID(res.data.data.document.id)
        setLoading(false)
      }).catch((error : any) => {
        setLoading(false)
        console.log("error", error)
        setTypeError('Load file gagal')
      });
    }

    getDocument()
    getLembaga()
    getUnitOrganisasi()
    getUnitKerja()
  }, [])

  // ** Handle File
  const handleFile = (e: any) => {
    const fileTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']

    const selectedFile = e.target.files?.[0]

    if (selectedFile) {
      if (fileTypes.includes(selectedFile.type)) {
        setExcelFile(selectedFile)
        setFileName(selectedFile.name)
      } else {
        setTypeError('Silahkan Pilih File dengan ekstensi XLSX')
        setTimeout(() => {
          setExcelFile(null)
          setFileName('')
        }, 5000)
      }
    } else {
      setTypeError('Silahkan Pilih File Terlebih Dahulu')
    }
  }

  // ** Handle Submit Import
  const handleImportSubmit = async (event: any) => {
    event.preventDefault()
    if (excelFile === null) {
      setTypeError('Pilih file yang ingin diunggah')
    }
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('file', excelFile!)
      formData.append('lembagaCode', choosenLembagaCode)
      formData.append('unitOrganisasiCode', choosenUnitOrganisasiCode)
      formData.append('unitKerjaCode', choosenUnitKerjaCode)
      formData.append('year', `${year?.getFullYear()}`)

      const res: AxiosResponse<RKAKLGenerateResponse> = await axios.post(`/api/rkakl/document`, formData, {
        headers: {
          Authorization: auth.token,
          'Content-Type': 'multipart/form-data'
        }
      })
      setImportResponse(res.data)
      setDocumentID(res.data.data.document.id)
    } catch (error) {
      setTypeError('Submit File Gagal')
      console.log(error)
    }
    setLoading(false)
  }

  // ** Handle Activate File
  const handleActivateFile = async (e: any) => {
    e.preventDefault()
    try {
      const response = await axios.put(`/api/rkakl/document/${documentID}/activate`, '', {
        headers: {
          Authorization: auth.token
        }
      })
      router.push({
        pathname: '/rkakl',
      })
    } catch (error) {
      setTypeError('Aktivasi File Gagal')
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <PageHeader
          title={<Typography variant='h5'>Import RKAKL</Typography>}
          subtitle={<Typography variant='body2'>Data RKAKL sebagai master data RKAKP</Typography>}
        />
      </Grid>
      {/* Select Data */}
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Pilih Data' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
          <CardContent>
            <Grid container spacing={5}>
              <Grid item sm={3} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='lembaga-select'>Lembaga</InputLabel>
                  <Select
                    fullWidth
                    id='select-lembaga'
                    label='Lembaga'
                    labelId='lembaga-select'
                    onChange={(e: SelectChangeEvent) => {
                      setChoosenLembagaCode(e.target.value as string) // Ensure the value is of type string
                    }}
                    inputProps={{ placeholder: 'Lembaga' }}
                  >
                    {dataLembaga?.map((data: any) => (
                      <MenuItem key={data.code} value={data.code}>
                        {data.name}
                      </MenuItem>
                    )) ?? (
                      <MenuItem value='' disabled>
                        Data Lembaga Tidak Ada
                      </MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={3} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='unit-organisasi-select'>Unit Organisasi</InputLabel>
                  <Select
                    fullWidth
                    id='select-unit-organisasi'
                    label='Unit Organisasi'
                    labelId='unit-organisasi-select'
                    onChange={(e: SelectChangeEvent) => {
                      setChoosenUnitOrganisasiCode(e.target.value as string)
                    }}
                    inputProps={{ placeholder: 'Unit Organisasi' }}
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
                </FormControl>
              </Grid>
              <Grid item sm={3} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='unit-kerja-select'>Unit Kerja</InputLabel>
                  <Select
                    fullWidth
                    id='select-unit-kerja'
                    label='Unit Kerja'
                    labelId='unit-kerja-select'
                    onChange={(e: SelectChangeEvent) => {
                      setChoosenUnitKerjaCode(e.target.value as string)
                    }}
                    inputProps={{ placeholder: 'Unit Kerja' }}
                  >
                    {dataUnitKerja?.map((data: any) => (
                      <MenuItem key={data.code} value={data.code}>
                        {data.name}
                      </MenuItem>
                    )) ?? (
                      <MenuItem value='' disabled>
                        Data Unit Kerja Tidak Ada
                      </MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={3} xs={12}>
                <Box>
                  <DatePickerWrapper>
                    <DatePicker
                      showYearPicker
                      selected={year}
                      id='year-picker'
                      dateFormat='yyyy'
                      popperPlacement={popperPlacement}
                      onChange={(date: Date) => setYear(date)}
                      customInput={<CustomInput label='Tahun' />}
                    />
                  </DatePickerWrapper>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      {/* Show Error */}
      {typeError ? (
        <Grid item xs={12}>
          <Alert onClose={() => setTypeError(null)} severity='error'>
            {typeError}
          </Alert>
        </Grid>
      ) : null}
      {/* Upload File */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Box>
              {loading ? (
                <Spinner />
              ) : importResponse ? (
                <TreeNode index={0} node={importResponse.data.documentData} />
              ) : (
                <Typography>No FIle Uploaded</Typography>
              )}
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default EditRKAKL
