'use client'

// MUI Imports
import Grid from '@mui/material/Grid2'
import { useState, createContext, useContext } from 'react'
// Component Imports
import ProductAddHeader from '@views/apps/ecommerce/products/add/ProductAddHeader'
import ProductInformation from '@views/apps/ecommerce/products/add/ProductInformation'
import ProductImage from '@views/apps/ecommerce/products/add/ProductImage'
import ProductVariants from '@views/apps/ecommerce/products/add/ProductVariants'
import ProductInventory from '@views/apps/ecommerce/products/add/ProductInventory'
import ProductPricing from '@views/apps/ecommerce/products/add/ProductPricing'
import ProductOrganize from '@views/apps/ecommerce/products/add/ProductOrganize'
import ProductSpace from '@views/apps/ecommerce/products/add/ProductSpace'
import ProductInformationArabic from '@/views/apps/ecommerce/products/add/ProductInformation(Arabic)'
import ProductLocation from '@/views/apps/ecommerce/products/add/ProductLoction'

  // Define contexts locally
const ImageContext = createContext()
const LocationContext = createContext()
const SpaceContext = createContext()
const PricingContext = createContext()
const OrganizeContext = createContext()
const InformationContext = createContext()

const eCommerceProductsAdd = () => {

  const [files, setFiles] = useState([])
  const [city, setCity] = useState('')
  const [locality, setLocality] = useState('')
  const [subLocality, setSubLocality] = useState('')
  const [towerName, setTowerName] = useState('')
  const [sizeunit, setSizeunit] = useState('sqm')
  const [plotarea, setPlotarea] = useState(0)
  const [propertysize, setPropertysize] = useState(0)
  const [offplan,setOffplan] = useState(false)
  const [Price,  setPrice] = useState(0)
  const [negotiable,setNegotiable] = useState(false)
  const [purpose, setPurpose] = useState('Rent')
  const [bedrooms, setBedrooms] = useState(0)
  const [bathrooms, setBathrooms] = useState(0)
  const [type, setType] = useState('Apartment')
  const [features, setFeatures] = useState('')
  const [rentfrequency, setRentfrequency] = useState('Daily')
const[furnished,setFurnished]=useState('Yes')
 const [description, setDescription] = useState('')
 const [descriptionArabic, setDescriptionArabic] = useState('')
 const [title, setTitle] = useState('')
  const [titleArabic, setTitleArabic] = useState('')  




// const InformationContext = createContext()
// const ArabicInformationContext = createContext()



  return (
// Information 
<ImageContext.Provider value={{ files, setFiles }}>
<LocationContext.Provider value={{ city, setCity,locality, setLocality,subLocality, setSubLocality ,towerName, setTowerName}}>
  <SpaceContext.Provider value={{sizeunit, setSizeunit , plotarea, setPlotarea , propertysize, setPropertysize,offplan,setOffplan}}>
    <PricingContext.Provider value={{Price, setPrice,negotiable,setNegotiable}}>
    <OrganizeContext.Provider value={{purpose, setPurpose,bedrooms, setBedrooms,bathrooms, setBathrooms,type, setType,features, setFeatures,rentfrequency, setRentfrequency,furnished,setFurnished}}>
    <InformationContext.Provider value={{description, setDescription,descriptionArabic, setDescriptionArabic,title, setTitle ,titleArabic, setTitleArabic}}> 
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <ProductAddHeader />
      </Grid>
      <Grid size={{ xs: 12, md: 8 }}>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12 }}>
            <ProductInformation />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <ProductInformationArabic />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <ProductImage />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <ProductLocation />
          </Grid>
          {/* <Grid size={{ xs: 12 }}>
            <ProductVariants />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <ProductInventory />
          </Grid> */}
        </Grid>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Grid container spacing={6}>
        <Grid size={{ xs: 12 }}>
            <ProductSpace />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <ProductPricing />
          </Grid>
          
          <Grid size={{ xs: 12 }}>
            <ProductOrganize />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    </InformationContext.Provider>
    </OrganizeContext.Provider>
    </PricingContext.Provider>
    </SpaceContext.Provider>
    </LocationContext.Provider>
       </ImageContext.Provider>
  )
}

export default eCommerceProductsAdd
export { ImageContext,LocationContext ,SpaceContext , PricingContext,OrganizeContext,InformationContext}




