'use client'

// React Imports
import { useState , useContext} from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import MenuItem from '@mui/material/MenuItem'

import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
// Component Imports
import CustomIconButton from '@core/components/mui/IconButton'
import CustomTextField from '@core/components/mui/TextField'
import { OrganizeContext } from '@/app/[lang]/(dashboard)/(private)/apps/properties/add/page'

const ProductOrganize = () => {
  // States
const {purpose, setPurpose,bedrooms, setBedrooms,bathrooms, setBathrooms,type, setType,features, setFeatures,rentfrequency, setRentfrequency,furnished,setFurnished} =  useContext(OrganizeContext);
  return (
    <Card>
      <CardHeader title='Organize' />
      <CardContent>
        <form onSubmit={e => e.preventDefault()} className='flex flex-col gap-6'>
          <CustomTextField select fullWidth label='Purpose' value={purpose} onChange={e => setPurpose(e.target.value)}>
            <MenuItem value={`Rent`}>Rent</MenuItem>
            <MenuItem value={`Buy`}>Buy</MenuItem>
          </CustomTextField>
         { purpose==="Rent" && (<CustomTextField select fullWidth label='Rent Frequency' value={rentfrequency} onChange={e => setRentfrequency(e.target.value)}>
            <MenuItem value={`Daily`}>Daily</MenuItem>
            <MenuItem value={`Weekly`}>Weekly</MenuItem>
            <MenuItem value={`Monthly`}>Monthly</MenuItem>
            <MenuItem value={`Yearly`}>Yearly</MenuItem>
          </CustomTextField>)}
          
          <div className='flex items-end gap-4'>
            <CustomTextField
              select
              fullWidth
              label='Type'
              value={type}
              onChange={e => setType(e.target.value)}
            >

           <MenuItem value='Villa'>Villa</MenuItem>
<MenuItem value='Apartment'>Apartment</MenuItem>
<MenuItem value='Office'>Office</MenuItem>
<MenuItem value='Shop'>Shop</MenuItem>
<MenuItem value='Warehouse'>Warehouse</MenuItem>
<MenuItem value='Factory'>Factory</MenuItem>
<MenuItem value='Labour Camp'>Labour Camp</MenuItem>
<MenuItem value='Other Commercial'>Other Commercial</MenuItem>
<MenuItem value='Commercial Building'>Commercial Building</MenuItem>
<MenuItem value='Residential Floor'>Residential Floor</MenuItem>
<MenuItem value='Commercial Floor'>Commercial Floor</MenuItem>
<MenuItem value='Residential Land'>Residential Land</MenuItem>
<MenuItem value='Commercial Land'>Commercial Land</MenuItem>
<MenuItem value='Townhouse'>Townhouse</MenuItem>
<MenuItem value='Residential Building'>Residential Building</MenuItem>
<MenuItem value='Hotel Apartment'>Hotel Apartment</MenuItem>
<MenuItem value='Loft Apartment'>Loft Apartment</MenuItem>
<MenuItem value='Duplex'>Duplex</MenuItem>
<MenuItem value='Pent House'>Pent House</MenuItem>
            </CustomTextField>
            <CustomIconButton variant='tonal' color='primary' className='min-is-fit'>
              <i className='tabler-plus' />
            </CustomIconButton>
          </div>
          <CustomTextField
            select
            fullWidth
            label='Furnished'
            value={furnished}
            onChange={e => setFurnished(e.target.value)}
          >
<MenuItem value={'Yes'}>Yes</MenuItem>
<MenuItem value={'No'}>No</MenuItem>
<MenuItem value={'Partly'}>Partly</MenuItem>
          </CustomTextField>
          <CustomTextField
            select
            fullWidth
            label='Bedrooms'
            value={bedrooms}
            onChange={e => setBedrooms(e.target.value)}
          >
       
       <MenuItem value={-1}>-1</MenuItem>
<MenuItem value={0}>0</MenuItem>
<MenuItem value={1}>1</MenuItem>
<MenuItem value={2}>2</MenuItem>
<MenuItem value={3}>3</MenuItem>
<MenuItem value={4}>4</MenuItem>
<MenuItem value={5}>5</MenuItem>
<MenuItem value={6}>6</MenuItem>
<MenuItem value={7}>7</MenuItem>
<MenuItem value={8}>8</MenuItem>
<MenuItem value={9}>9</MenuItem>
<MenuItem value={10}>10+</MenuItem>
          </CustomTextField>
          <CustomTextField select fullWidth label='Bathrooms' value={bathrooms} onChange={e => setBathrooms(e.target.value)}>
          <MenuItem value={0}>0</MenuItem>
<MenuItem value={1}>1</MenuItem>
<MenuItem value={2}>2</MenuItem>
<MenuItem value={3}>3</MenuItem>
<MenuItem value={4}>4</MenuItem>
<MenuItem value={5}>5</MenuItem>
<MenuItem value={6}>6</MenuItem>
<MenuItem value={7}>7</MenuItem>
<MenuItem value={8}>8</MenuItem>
<MenuItem value={9}>9</MenuItem>
<MenuItem value={10}>10</MenuItem>
          </CustomTextField>
          <CustomTextField fullWidth label='Enter Features' placeholder='Swimming Pool, Gym, Sauna' onChange={e => setFeatures(e.target.value)} />
        </form>
      </CardContent>
    </Card>
  )
}

export default ProductOrganize
