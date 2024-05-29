// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Demo Components Imports
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

import { useEffect, useState } from 'react'
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
import { useAuth } from 'src/hooks/useAuth'
import { useRouter } from 'next/router'
import TableHeader from 'src/views/components/TableHeader'
import DataGridComponent from 'src/views/components/DataGrid'

const ListUser = () => {
  const auth = useAuth()
  const router = useRouter()
  const [message, setMessage] = useState<any>('')
  const [paginationModel, setPaginationModel] = useState({
    isLoading: false,
    data: [],
    page: 1,
    pageSize: 10,
    total: 0
  })
  const [value, setValue] = useState<string>('')
  //delete confirmation
  const [open, setOpen] = useState<boolean>(false)
  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    const fetchData = async () => {
      setPaginationModel({
        ...paginationModel,
        isLoading: true
      })
      try {
        const response = await axios.get(`/api/user?page=${paginationModel.page}&perPage=${paginationModel.pageSize}`, {
          headers: {
            Authorization: auth.token
          }
        })
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
      await axios.delete(`/api/user/delete/${id}`, {
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
    createColumn('email', 'Email', 0.15, 240),
    createColumn('name', 'Nama User', 0.15, 280),
    createColumn('role', 'Role User', 0.15, 280)
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
          <IconButton size='small' component={Link} sx={{ mr: 0.5 }} href={`/user/edit/${row.id}`}>
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
                <Button onClick={() => handleDelete(row.id)}>Hapus</Button>
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
      window.history.replaceState(null, '', '/user/list')
    }, 5000)
  }, [router.query])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <PageHeader
          title={<Typography variant='h5'>Daftar User</Typography>}
          subtitle={<Typography variant='body2'>Data user sebagai master data RKAKP</Typography>}
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
          <TableHeader urlToAddPage='/user/add' addPageName='Tambah User' />
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

export default ListUser
