import React, { useEffect, useState } from 'react'
import { useAuth } from 'src/hooks/useAuth'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { deleteMethod, getMethod } from 'src/hooks/fetch'

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
  Grid,
  IconButton,
  Tooltip,
  Typography
} from '@mui/material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import PageHeader from 'src/@core/components/page-header'
import TableHeader from 'src/views/components/TableHeader'
import DataGridComponent from 'src/views/components/DataGrid'
import { minWidth } from '@mui/system'

const KodeBelanja = () => {
  const auth = useAuth()
  const router = useRouter()
  const [message, setMessage] = useState<any>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  //delete confirmation
  const [open, setOpen] = useState<boolean>(false)
  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  // ** State Get Kode Belanja
  const [kodeBelanja, setKodeBelanja] = useState({
    isLoading: false,
    data: [],
    page: 1,
    pageSize: 10,
    total: 0
  })

  useEffect(() => {
    const fetchData = async () => {
      setKodeBelanja({
        ...kodeBelanja,
        isLoading: true
      })
      try {
        const response = await getMethod(`/api/rkakl/component`, '', auth.token)
        setKodeBelanja({
          isLoading: false,
          data: response.data.data.data,
          page: response.data.data.current_page,
          pageSize: response.data.data.per_page,
          total: response.data.data.total
        })
      } catch (error) {
        console.error('Error fetching data:', error)
      }
      setIsLoading(false)
    }

    fetchData()
  }, [])

  const handleDelete = async (id: any) => {
    try {
      await deleteMethod(`/api/rkakl/component/delete/${id}`, auth.token)
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
    createColumn('unit_kerja_code', 'Kode Unit Kerja', 1, 200),
    createColumn('kegiatan_code', 'Kode Kegiatan', 1, 200),
    createColumn('kegiatan_name', 'Nama Kegiatan', 1, 300),
    createColumn('komponen_code', 'Kode Komponen', 1, 200),
    createColumn('komponen_name', 'Nama Komponen', 1, 200),
    createColumn('kro_code', 'Kode KRO', 1, 200),
    createColumn('kro_name', 'Nama KRO', 1, 200),
    createColumn('program_code', 'Kode Program', 1, 200),
    createColumn('program_name', 'Nama Program', 1, 200),
    createColumn('ro_code', 'Kode RO', 1, 200),
    createColumn('ro_name', 'Nama RO', 1, 200)
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
    const timer = setTimeout(() => {
      window.history.replaceState(null, '', '/kode-belanja/list')
    }, 5000)
  }, [router.query])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <PageHeader
          title={<Typography variant='h5'>Daftar Kode Belanja</Typography>}
          subtitle={<Typography variant='body2'>Data Kode Belanja sebagai master data RKAKP</Typography>}
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
          <TableHeader urlToAddPage='/kode-belanja/add' addPageName='Tambah Kode Belanja' />
          <DataGridComponent
            data={kodeBelanja.data}
            isLoading={kodeBelanja.isLoading}
            totalData={kodeBelanja.total}
            columns={columns}
            page={kodeBelanja.page}
            pageSize={kodeBelanja.pageSize}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

export default KodeBelanja
