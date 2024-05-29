import React, { SyntheticEvent, useState } from 'react'
import {
  Box,
  BoxProps,
  Button,
  CardContent,
  CardContentProps,
  Collapse,
  Grid,
  GridProps,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
  styled
} from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import Repeater from 'src/@core/components/repeater'

const RepeatingContent = styled(Grid)<GridProps>(({ theme }) => ({
  paddingRight: 0,
  display: 'flex',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  '& .col-title': {
    top: '-1.5rem',
    position: 'absolute'
  },
  '& .MuiInputBase-input': {
    color: theme.palette.text.secondary
  },
  [theme.breakpoints.down('lg')]: {
    '& .col-title': {
      top: '0',
      position: 'relative'
    }
  }
}))

const RepeaterWrapper = styled(CardContent)<CardContentProps>(({ theme }) => ({
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(5.5),
  '& .repeater-wrapper + .repeater-wrapper': {
    marginTop: theme.spacing(12)
  }
}))

const InvoiceAction = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  padding: theme.spacing(2, 1),
  borderLeft: `1px solid ${theme.palette.divider}`
}))

const FormAdd = () => {
  //state
  const [count, setCount] = useState<number>(1)

  // ** Deletes form
  const deleteForm = (e: SyntheticEvent) => {
    e.preventDefault()

    // @ts-ignore
    e.target.closest('.repeater-wrapper').remove()
  }

  return (
    <RepeaterWrapper>
      <Repeater count={count}>
        {(i: number) => {
          const Tag = i === 0 ? Box : Collapse

          return (
            <Tag key={i} className='repeater-wrapper' {...(i !== 0 ? { in: true } : {})}>
              <Grid container>
                <RepeatingContent item xs={12}>
                  <Grid container sx={{ py: 4, width: '100%', pr: { lg: 0, xs: 4 } }}>
                    <Grid item lg={6} md={5} xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
                      <Typography
                        variant='subtitle2'
                        className='col-title'
                        sx={{ mb: { md: 2, xs: 0 }, color: 'text.primary' }}
                      >
                        Item
                      </Typography>
                      <Select fullWidth size='small' defaultValue='App Design'>
                        <MenuItem value='App Design'>App Design</MenuItem>
                        <MenuItem value='App Customization'>App Customization</MenuItem>
                        <MenuItem value='ABC Template'>ABC Template</MenuItem>
                        <MenuItem value='App Development'>App Development</MenuItem>
                      </Select>
                      <TextField
                        rows={2}
                        fullWidth
                        multiline
                        size='small'
                        sx={{ mt: 3.5 }}
                        defaultValue='Customization & Bug Fixes'
                      />
                    </Grid>
                    <Grid item lg={2} md={3} xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
                      <Typography
                        variant='subtitle2'
                        className='col-title'
                        sx={{ mb: { md: 2, xs: 0 }, color: 'text.primary' }}
                      >
                        Cost
                      </Typography>
                      <TextField
                        size='small'
                        type='number'
                        placeholder='24'
                        defaultValue='24'
                        InputProps={{ inputProps: { min: 0 } }}
                      />
                      <Box sx={{ mt: 3.5 }}>
                        <Typography component='span' variant='body2' sx={{ lineHeight: 2 }}>
                          Discount:
                        </Typography>{' '}
                        <Typography component='span' variant='body2'>
                          0%
                        </Typography>
                        <Tooltip title='Tax 1' placement='top'>
                          <Typography component='span' variant='body2' sx={{ mx: 2 }}>
                            0%
                          </Typography>
                        </Tooltip>
                        <Tooltip title='Tax 2' placement='top'>
                          <Typography component='span' variant='body2'>
                            0%
                          </Typography>
                        </Tooltip>
                      </Box>
                    </Grid>
                    <Grid item lg={2} md={2} xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
                      <Typography
                        variant='subtitle2'
                        className='col-title'
                        sx={{ mb: { md: 2, xs: 0 }, color: 'text.primary' }}
                      >
                        Hours
                      </Typography>
                      <TextField
                        size='small'
                        type='number'
                        placeholder='1'
                        defaultValue='1'
                        InputProps={{ inputProps: { min: 0 } }}
                      />
                    </Grid>
                    <Grid item lg={2} md={1} xs={12} sx={{ px: 4, my: { lg: 0 }, mt: 2 }}>
                      <Typography
                        variant='subtitle2'
                        className='col-title'
                        sx={{ mb: { md: 2, xs: 0 }, color: 'text.primary' }}
                      >
                        Price
                      </Typography>
                      <Typography variant='body2'>$24.00</Typography>
                    </Grid>
                  </Grid>
                  <InvoiceAction>
                    <IconButton size='small' onClick={deleteForm}>
                      <Icon icon='mdi:close' fontSize={20} />
                    </IconButton>
                  </InvoiceAction>
                </RepeatingContent>
              </Grid>
            </Tag>
          )
        }}
      </Repeater>

      <Grid container sx={{ mt: 4.75 }}>
        <Grid item xs={12} sx={{ px: 0 }}>
          <Button
            // size='small'
            variant='contained'
            startIcon={<Icon icon='mdi:plus' />}
            onClick={() => setCount(count + 1)}
          >
            Tambah Data
          </Button>
        </Grid>
      </Grid>
    </RepeaterWrapper>
  )
}

export default FormAdd
