// MUI Imports
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useContext } from 'react'
import { ImageContext, InformationContext, LocationContext, OrganizeContext, PricingContext, SpaceContext } from '@/app/[lang]/(dashboard)/(private)/apps/properties/add/page'
import { addProperty, createProperty } from '@/app/server/actions'

// api/leads/leadsController.js
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://hcwqyddclmnusfuzioyj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhjd3F5ZGRjbG1udXNmdXppb3lqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk2OTA4MzksImV4cCI6MjA1NTI2NjgzOX0.uJSUIJTArrYt-dNBkL7v2WH7bh4Kd7AeQvYm53kc3bA';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const ProductAddHeader = () => {



const { files, setFiles }= useContext(ImageContext);
const { city,locality,subLocality ,towerName} = useContext(LocationContext);
const {sizeunit , plotarea , propertysize,offplan}=  useContext(SpaceContext);
const {Price,negotiable} =  useContext(PricingContext);
const {purpose,bedrooms,bathrooms, setBathrooms,type,features,rentfrequency,furnished}=  useContext(OrganizeContext);
const {description,descriptionArabic,title ,titleArabic}  =  useContext(InformationContext);


  const handlesubmit = async () => {
    
    console.log("submit clicked");
    try {
      // Hardcoded data
      const hardcodedPropertyData = {
        city: city,
        locality: locality,
        sub_locality: subLocality,
        tower_name: towerName,
        
        size_unit: sizeunit,  
        plot_area: plotarea,
        property_size: propertysize,
        property_purpose: purpose,
        offplan: offplan,
        description: description,
        description_arabic: descriptionArabic,
        title: title,
        title_arabic: titleArabic,
Price: Price,
rent_frequency: rentfrequency,
furnished: furnished,
        negotiable: negotiable,
        bedrooms: bedrooms,
        bathrooms: bathrooms,
        property_type: type,
        property_features: features

      };

      const result = await addProperty(hardcodedPropertyData);

      if (result.error) {
        console.error("Error from addProperty:", result.error);
      } else {
        console.log("Property added successfully:", result.data);
      }
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };

  return (
    <div className='flex flex-wrap sm:items-center justify-between max-sm:flex-col gap-6'>
      <div>
        <Typography variant='h4' className='mbe-1'>
          Add a new property
        </Typography>
        <Typography>Properties placed across your website</Typography>
      </div>
      <div className='flex flex-wrap max-sm:flex-col gap-4'>
        <Button variant='tonal' color='secondary'>
          Discard
        </Button>
        <Button variant='tonal'>Save Draft</Button>
        <Button variant='contained' onClick={handlesubmit}>Publish Product</Button>
      </div>
    </div>
  )
}

export default ProductAddHeader