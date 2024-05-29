import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography
} from '@mui/material'
import { Box } from '@mui/system'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { deleteMethod } from 'src/hooks/fetch'
import { useAuth } from 'src/hooks/useAuth'

const DataColumnComponent = () => {
  //delete confirmation
  const [open, setOpen] = useState<boolean>(false)
  const auth = useAuth()
  const router = useRouter()
  //delete confirmation
  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleDelete = async (id: any) => {
    try {
      await deleteMethod(`/api/lembaga/delete/${id}`, auth.token)
      router.reload()
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const defaultColumns = [
    {
      flex: 0.15,
      field: 'code',
      minWidth: 240,
      headerName: 'Kode Lembaga',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.code}
        </Typography>
      )
    },
    {
      flex: 0.25,
      minWidth: 280,
      field: 'name',
      headerName: 'Nama Lembaga',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.name}
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
          <Tooltip title='Edit Lembaga'>
            <IconButton size='small' component={Link} sx={{ mr: 0.5 }} href={`/satker/lembaga/edit/${row.id}`}>
              <Icon icon='mdi:pencil-outline' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Delete Lembaga'>
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
                <DialogTitle id='alert-dialog-title'>Hapus "{row.name}" ?</DialogTitle>
                <DialogContent>
                  <DialogContentText id='alert-dialog-description'>pilih Hapus jika anda yakin !!!</DialogContentText>
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
  ]
}

export default DataColumnComponent
