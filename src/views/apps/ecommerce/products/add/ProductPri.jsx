'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Checkbox from '@mui/material/Checkbox'
import Divider from '@mui/material/Divider'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'

// Component Imports
import Form from '@components/Form'
import CustomTextField from '@core/components/mui/TextField'


const ProductPricing = () => {

  const [currency,  setCurrency] = useState('AED')

  return (
    <Card>
      <CardHeader title='Pricing' />
      <CardContent>
        <Form>
          <CustomTextField fullWidth label='Price' placeholder='Enter Base Price' className='mbe-6' />
       
          <CustomTextField select fullWidth label='Currency' value={currency} onChange={e => setCurrency(e.target.value)}>
          <MenuItem value={`AED`}>AED</MenuItem>
<MenuItem value={`USD`}>USD</MenuItem>
          </CustomTextField>
          <FormControlLabel control={<Checkbox defaultChecked />} label='Convert Price to USD' />
          <Divider className='mlb-2' />
          <div className='flex items-center justify-between'>
            <Typography>Negotiable</Typography>
            <Switch defaultChecked />
          </div>
        </Form>
      </CardContent>
    </Card>
  )
}

export default ProductPricing
