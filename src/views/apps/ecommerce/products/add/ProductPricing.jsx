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
import { useContext, useState } from 'react'

// Component Imports
import Form from '@components/Form'
import CustomTextField from '@core/components/mui/TextField'
import { PricingContext } from '@/app/[lang]/(dashboard)/(private)/apps/properties/add/page'


const ProductPricing = () => {
  const {Price, setPrice,negotiable,setNegotiable}=useContext(PricingContext)

  const handlechange = (event) => {
    setNegotiable(event.target.checked);
  };
  return (
    <Card>
      <CardHeader title='Pricing' />
      <CardContent>
        <Form>
          <CustomTextField fullWidth label='Price' placeholder='Enter Base Price' className='mbe-6' value={Price} onChange={(e)=> setPrice(e.target.value)} />
       
          {/* <CustomTextField select fullWidth label='Currency' value={currency} onChange={e => setCurrency(e.target.value)}>
          <MenuItem value={`AED`}>AED</MenuItem>
<MenuItem value={`USD`}>USD</MenuItem>
          </CustomTextField> */}
          {/* <FormControlLabel control={<Checkbox defaultChecked />} label='Convert Price to USD' /> */}
          <Divider className='mlb-2' />
          <div className='flex items-center justify-between' >
            <Typography>Negotiable</Typography>
            <Switch defaultChecked= {negotiable} onChange={handlechange}/>
          </div>
        </Form>
      </CardContent>
    </Card>
  )
}

export default ProductPricing
