// ** React Imports
import { FormEvent, useState } from 'react'

// ** DataGrid Imports
import {
  DataGrid,
  GridPagination,
  GridToolbarContainer,
  GridToolbarExport,
  gridPageCountSelector,
  useGridApiContext,
  useGridSelector
} from '@mui/x-data-grid'
import { TablePaginationProps } from '@mui/material'
import MuiPagination from '@mui/material/Pagination'

// ** MUI Imports

interface DatGridComponentProps {
  data: any
  isLoading: boolean
  totalData: number
  columns: any
  page: number
  pageSize: number
}

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  )
}
const DataGridComponent = (props: DatGridComponentProps) => {
  // ** Props
  const { data, totalData, isLoading, columns, page, pageSize } = props

  function Pagination({
    page = 2,
    onPageChange,
    className
  }: Pick<TablePaginationProps, 'page' | 'onPageChange' | 'className'>) {
    const apiRef = useGridApiContext()
    const pageCount = useGridSelector(apiRef, gridPageCountSelector)
    console.log('pageCount:', pageCount)
    console.log('page: ', page)

    return (
      <MuiPagination
        color='primary'
        size='small'
        className={className}
        count={pageCount}
        page={page + 1}
        onChange={(event, newPage) => {
          onPageChange(event as any, newPage - 1)
        }}
      />
    )
  }

  function CustomPagination(props: any) {
    return <GridPagination ActionsComponent={Pagination} {...props} />
  }

  return (
    <DataGrid
      autoHeight
      slots={{
        toolbar: CustomToolbar,
        pagination: CustomPagination
      }}
      rows={data}
      loading={isLoading}
      pageSizeOptions={[5, 10, 25, 50, 100]}
      columns={columns}
      // paginationModel={{
      //   page: page,
      //   pageSize: pageSize
      // }}
      // onPaginationModelChange={newPagination =>
      //   setPaginationModel(old => ({
      //     ...old,
      //     page: newPagination.page + 1,
      //     pageSize: newPagination.pageSize
      //   }))
      // }
    />
  )
}

export default DataGridComponent
