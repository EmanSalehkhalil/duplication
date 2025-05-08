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
import { useContext, useState } from 'react'
import MenuItem from '@mui/material/MenuItem'
// Component Imports
import Form from '@components/Form'
import CustomTextField from '@core/components/mui/TextField'
import { SpaceContext } from '@/app/[lang]/(dashboard)/(private)/apps/properties/add/page'

const ProductSpace = () => {
  const {sizeunit, setSizeunit , plotarea, setPlotarea , propertysize, setPropertysize ,offplan,setOffplan} =  useContext(SpaceContext)
  const handleChange = (event) => {
    setOffplan(event.target.checked);
    console.log(offplan);
  };
  return (
    <Card>
      <CardHeader title='Space' />
      <CardContent>
        <Form>
          <CustomTextField fullWidth label='Property Size' value={propertysize} placeholder='Numeric value of the area' className='mbe-6' onChange={(e)=> setPropertysize(e.target.value)}/>
          <CustomTextField fullWidth label='Plot Area'  value={plotarea} placeholder='Numeric value of the plot area of the propert' className='mbe-6' onChange={(e)=> setPlotarea(e.target.value)} />


          <CustomTextField select fullWidth label='Size Unit' value={sizeunit} onChange={e => setSizeunit(e.target.value)}>
          <MenuItem value={`sqm`}>sqm</MenuItem>
<MenuItem value={`sqft`}>sqft</MenuItem>
          </CustomTextField>

          <Divider className='mlb-2' />
          <FormControlLabel
      control={<Checkbox checked={offplan} onChange={handleChange} />}
      label="The Property is Off Plan"
    />
          {/* <div className='flex items-center justify-between'>
            <Typography>Negotiable</Typography>
            <Switch defaultChecked />
          </div> */}
        </Form>
      </CardContent>
    </Card>
  )
}

export default ProductSpace
