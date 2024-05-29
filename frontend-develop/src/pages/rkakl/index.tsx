import { useEffect, useState } from 'react'
import { useAuth } from 'src/hooks/useAuth'

import { useRouter } from 'next/router'

// ** Fetch Data Imports
import { getMethod } from 'src/hooks/fetch'

// ** MUI Imports
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Component
import TableHeader from 'src/views/components/TableHeader'
import PageHeader from 'src/@core/components/page-header'
import CustomInput from 'src/views/components/PickersCustomInput'

// ** Third Party Imports
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

// ** Type
type DataUnitKerja = []
type DataRKAKLDocument = []

const ListRkakl = () => {
  const auth = useAuth()
  const router = useRouter()

  // ** State Get Filter
  const [dataUnitKerja, setDataUnitKerja] = useState<DataUnitKerja>([])
  const [rkaklData, setRkaklData] = useState<DataRKAKLDocument>([])
  // ** State Set Filter Data
  const [chosenUnitKerjaCode, setChosenUnitKerjaCode] = useState<string | null>()
  const [yearFilter, setYearFilter] = useState<number | null>()

  // ** State Notification Message
  const [message, setMessage] = useState<any>()

  // ** State Error
  const [typeError, setTypeError] = useState<any>()
  const [filterError, setFilterError] = useState<any>()
  // ** State Loading
  const [loading, setLoading] = useState(false)

  // ** Styling Select Year
  const theme = useTheme()
  const { direction } = theme
  const popperPlacement: ReactDatePickerProps['popperPlacement'] = direction === 'ltr' ? 'bottom-start' : 'bottom-end'

  // ** Fetch Filter Data
  useEffect(() => {
    const getRKAKLData = async () => {
      setLoading(true)
      try {
        const response = await getMethod('/api/rkakl/document', ``, auth.token)
        const filteredData = response.data.data.filter(
          (item: { unit_kerja_code: string; year: string }) =>
            (!chosenUnitKerjaCode || item.unit_kerja_code === chosenUnitKerjaCode) &&
            (!yearFilter || item.year === yearFilter)
        )
        console.log(filteredData)
        console.log(yearFilter)
        setRkaklData(filteredData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
      setLoading(false)
    }
    const getUnitKerja = async () => {
      try {
        const res = await getMethod('/api/unit-kerja', '', auth.token)
        setDataUnitKerja(res.data.data.data)
      } catch (error) {
        console.error(error)
      }
    }

    getRKAKLData()
    getUnitKerja()
  }, [chosenUnitKerjaCode, yearFilter])

  const defaultColumns = [
    {
      flex: 0.15,
      minWidth: 280,
      field: 'unit_kerja_code',
      headerName: 'Kode Unit Kerja',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.unit_kerja_code}
        </Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 280,
      field: 'year',
      headerName: 'Tahun',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.year}
        </Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 280,
      field: 'is_active',
      headerName: 'Teraktifasi',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.is_active === 0 ? 'Tidak Aktif' : 'Aktif'}
        </Typography>
      )
    }
  ]

  const columns: GridColDef[] = [
    ...defaultColumns,
    {
      flex: 0.1,
      minWidth: 130,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title='Delete Lembaga'>
            <IconButton size='small' sx={{ mr: 0.5 }} onClick={() => alert(`${row.id}`)}>
              <Icon icon='mdi:delete-outline' />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ]

  // ** notification alert
  useEffect(() => {
    setMessage(router.query.message)
    setTimeout(() => {
      window.history.replaceState(null, '', '/rkakl')
    }, 5000)
  }, [router.query])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <PageHeader
          title={<Typography variant='h5'>Daftar RKAKL</Typography>}
          subtitle={<Typography variant='body2'>Data RKAKL sebagai master data RKAKP</Typography>}
        />
      </Grid>
      {/* Select Data */}
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Filter Data' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
          <CardContent>
            <Grid container spacing={5}>
              <Grid item sm={6} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='unit-kerja-select'>Unit Kerja</InputLabel>
                  <Select
                    fullWidth
                    id='select-unit-kerja'
                    label='Unit Kerja'
                    labelId='unit-kerja-select'
                    onChange={(e: SelectChangeEvent) => {
                      setChosenUnitKerjaCode(e.target.value as string)
                    }}
                    inputProps={{ placeholder: 'Unit Kerja' }}
                    value={chosenUnitKerjaCode || ''}
                  >
                    <MenuItem value=''>
                      <em>None</em>
                    </MenuItem>
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
                      id='year-picker'
                      dateFormat='yyyy'
                      popperPlacement={popperPlacement}
                      value={yearFilter}
                      onChange={(date: Date | null) => setYearFilter(date ? date.getFullYear() : null)}
                      customInput={<CustomInput label='Tahun' />}
                    />
                  </DatePickerWrapper>
                </Box>
              </Grid>
              <Grid item sm={3} xs={12}>
                {(chosenUnitKerjaCode || yearFilter) && (
                  <Button
                    variant='outlined'
                    size='large'
                    onClick={() => {
                      setChosenUnitKerjaCode(null)
                      setYearFilter(null)
                    }}
                  >
                    Clear
                  </Button>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      {/* Notification Message */}
      <Grid item xs={12}>
        {message === 'success' ? <Alert onClose={() => setMessage('')}>Data Berhasil Ditambahkan</Alert> : null}
      </Grid>
      {/* Data Grid */}
      <Grid item xs={12}>
        <Card>
          <TableHeader urlToAddPage='/rkakl/import' addPageName='Import RKAKL' />
          {loading === true ? (
            <DataGrid
              autoHeight
              rows={rkaklData}
              pageSizeOptions={[5, 10, 25, 50, 100]}
              columns={columns}
              loading={true}
            />
          ) : (
            <DataGrid
              autoHeight
              rows={rkaklData}
              pageSizeOptions={[5, 10, 25, 50, 100]}
              columns={columns}
              loading={false}
            />
          )}
        </Card>
      </Grid>
    </Grid>
  )
}

export default ListRkakl
