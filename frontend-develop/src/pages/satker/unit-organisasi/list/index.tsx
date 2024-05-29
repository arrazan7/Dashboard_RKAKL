// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Demo Components Imports
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

import { useEffect, useState } from 'react'
import { useAuth } from '../../../../hooks/useAuth'
import {
  Alert,
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip
} from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router'
import TableHeader from 'src/views/components/TableHeader'
import DataGridComponent from 'src/views/components/DataGrid'
import { getMethod } from 'src/hooks/fetch'

const ListUnitOrganisasi = () => {
  const auth = useAuth()
  const router = useRouter()
  const [message, setMessage] = useState<any>()
  //delete confirmation
  const [open, setOpen] = useState<boolean>(false)
  const [value, setValue] = useState<string>('')
  const [paginationModel, setPaginationModel] = useState({
    isLoading: false,
    data: [],
    page: 1,
    pageSize: 10,
    total: 0
  })
  //delete confirmation
  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    const fetchData = async () => {
      setPaginationModel({
        ...paginationModel,
        isLoading: true
      })
      try {
        const response = await getMethod(`/api/unit-organisasi`, '', auth.token)
        setPaginationModel({
          isLoading: false,
          data: response.data.data.data,
          page: response.data.data.current_page,
          pageSize: response.data.data.per_page,
          total: response.data.data.total
        })
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const handleDelete = async (id: any) => {
    try {
      console.log(id)
      await axios.delete(`/api/unit-organisasi/delete/${id}`, {
        headers: {
          Authorization: auth.token,
          'Content-Type': 'application/json'
        }
      })
      router.reload()
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const renderTypographyCell = (field: string, params: GridRenderCellParams) => (
    <Typography variant='body2' sx={{ color: 'text.primary' }}>
      {params.row[field]}
    </Typography>
  )

  const createColumn = (field: string, headerName: string, flex: number, minWidth: number) => ({
    flex,
    field,
    minWidth,
    headerName,
    renderCell: (params: GridRenderCellParams) => renderTypographyCell(field, params)
  })

  const defaultColumns = [
    // ** createColumn(field, headerName,Flex,minWidth)
    createColumn('lembaga_code', 'Kode Lembaga', 1, 240),
    createColumn('code', 'Kode Unit Organisasi', 1, 280),
    createColumn('name', 'Nama Unit Organisasi', 1, 280)
  ]

  const actionsColumn = {
    flex: 0.1,
    minWidth: 130,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }: GridRenderCellParams) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Tooltip title='Edit User'>
          <IconButton size='small' component={Link} sx={{ mr: 0.5 }} href={`/satker/unit-organisasi/edit/${row.id}`}>
            <Icon icon='mdi:pencil-outline' />
          </IconButton>
        </Tooltip>
        <Tooltip title='Delete User'>
          <>
            <IconButton size='small' sx={{ mr: 0.5 }} onClick={handleClickOpen}>
              <Icon icon='mdi:delete-outline' />
            </IconButton>
            <Dialog
              open={open}
              disableEscapeKeyDown
              aria-labelledby='alert-dialog-title'
              aria-describedby='alert-dialog-description'
              onClose={(event, reason) => {
                if (reason !== 'backdropClick') {
                  handleClose()
                }
              }}
            >
              <DialogTitle id='alert-dialog-title'>Hapus User ?</DialogTitle>
              <DialogContent>
                <DialogContentText id='alert-dialog-description'>pilih Hapus jika anda yakin!!!</DialogContentText>
              </DialogContent>
              <DialogActions className='dialog-actions-dense'>
                <Button onClick={handleClose}>Batal</Button>
                <Button variant='contained' color='error' onClick={() => handleDelete(row.id)}>
                  Hapus
                </Button>
              </DialogActions>
            </Dialog>
          </>
        </Tooltip>
      </Box>
    )
  }

  const columns: GridColDef[] = [...defaultColumns, actionsColumn]

  useEffect(() => {
    setMessage(router.query.message)
    setTimeout(() => {
      window.history.replaceState(null, '', '/satker/unit-organisasi/list')
    }, 5000)
  }, [router.query])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <PageHeader
          title={<Typography variant='h5'>Daftar UnitOrganisasi</Typography>}
          subtitle={<Typography variant='body2'>Data unitorganisasi sebagai master data RKAKP</Typography>}
        />
      </Grid>
      <Grid item xs={12}>
        {message === 'success' ? <Alert onClose={() => setMessage('')}>Data Berhasil Ditambahkan</Alert> : null}
        {message === 'success update data' ? (
          <Alert onClose={() => setMessage('')}>Data Berhasil Diperbarui</Alert>
        ) : null}
      </Grid>
      <Grid item xs={12}>
        <Card>
          <TableHeader urlToAddPage='/satker/unit-organisasi/add' addPageName='Tambah Unit Organisasi' />
          <DataGridComponent
            data={paginationModel.data}
            isLoading={paginationModel.isLoading}
            totalData={paginationModel.total}
            columns={columns}
            page={paginationModel.page}
            pageSize={paginationModel.pageSize}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

export default ListUnitOrganisasi
