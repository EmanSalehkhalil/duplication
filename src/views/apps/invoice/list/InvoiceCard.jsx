'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

// Third-party Imports
import classnames from 'classnames'
import {getPropertCount,getPropertCount_Rent,getPropertCount_Buy,getPropertCount_Price}  from '@/app/server/actions'

// Vars
const data = [
  {
    title: getPropertCount(),
    subtitle: 'Properties',
    icon: 'tabler-user'
  },
  {
    title: getPropertCount_Rent(),
    subtitle: 'Rent',
    icon: 'tabler-file-invoice'
  },
  {
    title: getPropertCount_Buy(),
    subtitle: 'Buy',
    icon: 'tabler-checks'
  }
  ,
  {
    title:  formatAED(await getPropertCount_Price()),
    subtitle: 'Price',
    icon: 'tabler-circle-off'
  }
]
function formatAED(amount) {
  
  return new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency: 'AED',
    notation: 'compact', // shows 1.3B, 15.2M, etc.
    maximumFractionDigits: 2
  }).format(amount)
}
const InvoiceCard = () => {

  // Hooks
  const isBelowMdScreen = useMediaQuery(theme => theme.breakpoints.down('md'))
  const isBelowSmScreen = useMediaQuery(theme => theme.breakpoints.down('sm'))

  return (
    <Card>
      <CardContent>
        <Grid container spacing={6}>
          {data.map((item, index) => (
            <Grid
              size={{ xs: 12, sm: 6, md: 3 }}
              key={index}
              className={classnames({
                '[&:nth-of-type(odd)>div]:pie-6 [&:nth-of-type(odd)>div]:border-ie':
                  isBelowMdScreen && !isBelowSmScreen,
                '[&:not(:last-child)>div]:pie-6 [&:not(:last-child)>div]:border-ie': !isBelowMdScreen
              })}
            >
              <div className='flex justify-between items-center'>
                <div className='flex flex-col'>
                  <Typography variant='h4'>{item.title}</Typography>
                  <Typography>{item.subtitle}</Typography>
                </div>
                <Avatar variant='rounded' className='is-[42px] bs-[42px]'>
                  <i className={classnames(item.icon, 'text-[26px]')} />
                </Avatar>
              </div>
              {isBelowMdScreen && !isBelowSmScreen && index < data.length - 2 && (
                <Divider
                  className={classnames('mbs-6', {
                    'mie-6': index % 2 === 0
                  })}
                />
              )}
              {isBelowSmScreen && index < data.length - 1 && <Divider className='mbs-6' />}
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default InvoiceCard
