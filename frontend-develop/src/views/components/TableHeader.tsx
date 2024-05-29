// ** React Imports
import { FormEvent, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Link from 'next/link'

interface TableHeaderProps {
  urlToAddPage: string
  addPageName: string
}

const TableHeader = (props: TableHeaderProps) => {
  const { urlToAddPage, addPageName } = props

  return (
    <Box
      sx={{
        p: 5,
        pb: 3,
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'end'
      }}
    >
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <Button sx={{ mb: 2 }} component={Link} variant='contained' href={urlToAddPage}>
          {addPageName}
        </Button>
      </Box>
    </Box>
  )
}

export default TableHeader
