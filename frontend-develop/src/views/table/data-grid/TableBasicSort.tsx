// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import { useRouter } from 'next/router'

interface StatusObj {
  [key: number]: {
    title: string
    color: ThemeColor
  }
}

export type TableSortProps = {
  columnConfig: GridColDef[]
  rows: []
}

const TableSort = (props: TableSortProps) => {
  const { columnConfig, rows } = props
  const route = useRouter()
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })

  return (
    <Card>
      <CardHeader
        action={
          <div>
            <Button size='small' variant='contained' onClick={() => route.push('/lembaga/create')}>
              Tambah Data
            </Button>
          </div>
        }
      />
      <DataGrid
        autoHeight
        rows={rows}
        columns={columnConfig}
        pageSizeOptions={[7, 10, 25, 50]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
      />
    </Card>
  )
}

export default TableSort
