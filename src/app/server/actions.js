/**
 * ! The server actions below are used to fetch the static data from the fake-db. If you're using an ORM
 * ! (Object-Relational Mapping) or a database, you can swap the code below with your own database queries.
 */
'use server'

// Data Imports
import { db as eCommerceData } from '@/fake-db/apps/ecommerce'
import { db as academyData } from '@/fake-db/apps/academy'
import { db as vehicleData } from '@/fake-db/apps/logistics'
import { db as invoiceData } from '@/fake-db/apps/invoice'
import { db as userData } from '@/fake-db/apps/userList'
import { db as permissionData } from '@/fake-db/apps/permissions'
import { db as profileData } from '@/fake-db/pages/userProfile'
import { db as faqData } from '@/fake-db/pages/faq'
import { db as pricingData } from '@/fake-db/pages/pricing'
import { db as statisticsData } from '@/fake-db/pages/widgetExamples'
import { title } from 'valibot'

// Third-Party Imports
const { createClient } = require('@supabase/supabase-js');

// Supabase Setup
const supabaseUrl = 'https://hcwqyddclmnusfuzioyj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhjd3F5ZGRjbG1udXNmdXppb3lqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk2OTA4MzksImV4cCI6MjA1NTI2NjgzOX0.uJSUIJTArrYt-dNBkL7v2WH7bh4Kd7AeQvYm53kc3bA';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// export const createProperty = async () => {
//   const { city, locality, sub_locality, tower_name } = useContext(LocationContext)
//   const { data, error } = await supabase
//       .from('properties')
//       .insert([{
         
//         city, locality, sub_locality, tower_name
//       }]);

//   if (error) {
//       return res.status(400).json({ error: error.message });
//   }

//   res.status(201).json({ data });
// };

// Function to add data to a table (e.g., 'properties')
export async function addProperty(propertyData) {
  try {
    const { 
      city, locality, sub_locality, tower_name, size_unit, plot_area, property_size, property_purpose, offplan, description, description_arabic, title, title_arabic, Price, rent_frequency, furnished, negotiable, bedrooms, bathrooms, property_type, property_features


      
      } = propertyData; // Extract data from the input
console.log("action called ")
    const { data, error } = await supabase
      .from('properties') // Replace 'properties' with your table name
      .insert([
        {
          city: city,
          locality: locality,
          sub_locality: sub_locality,
          tower_name: tower_name,
          size_unit: size_unit,

          plot_area: plot_area,
          size: property_size,
          property_purpose: property_purpose,
          off_plan: offplan,
          description: description,
          description_arabic: description_arabic,
          title: title,
          title_arabic: title_arabic,
  price: Price,
  rent_frequency: rent_frequency,
  furnished: furnished,
          negotiable: negotiable,
          bedrooms: bedrooms,
          bathrooms: bathrooms,
          property_type: property_type,
          features: property_features
         
        },
      ])
      .select(); // Select the inserted data (optional, but good to have)

    if (error) {
      console.error('Error adding property:', error);
      return { error: error.message }; // Return an error object
    }

    return { data }; // Return the inserted data
  } catch (error) {
    console.error('Error during Supabase interaction:', error);
    return { error: 'Failed to add property' };
  }
}
export const getPropertyData = async () => {
  const { data, error } = await supabase
    .from('properties') // Replace with your table name
    .select('*');
  if (error) throw new Error(error.message);
  return data;
}

export const getLeadsData = async () => {
  const { data, error } = await supabase
    .from('leads') // Replace with your table name
    .select('*');
  if (error) throw new Error(error.message);
  return data;
}


export const getEcommerceData = async () => {
  return eCommerceData
}


export const getPropertCount= async () => {
  const { count, error } = await supabase
    .from('properties') // Replace with your table name
    .select('*',{count:'exact',head:true});
  if (error) throw new Error(error.message);
  return count;
}
export const getPropertCount_Buy= async () => {
  const { count, error } = await supabase
    .from('properties') // Replace with your table name
    .select('*',{count:'exact',head:true}).eq('property_purpose','Buy');
  if (error) throw new Error(error.message);
  return count;
}
export const getPropertCount_Rent= async () => {
 
  const { count, error } = await supabase
    .from('properties') // Replace with your table name
    .select('*',{count:'exact',head:true}).eq('property_purpose','Rent');
  if (error) throw new Error(error.message);
  return count;


}
export const getPropertCount_Price = async () => {
  const { data, error } = await supabase
    .from('properties') // Replace with your table name
    .select('price');

  if (error) throw new Error(error.message);
  const total = data.reduce((sum, item) => sum + item.price, 0);
  console.log("Total Price:", total);
  return total;
}

export const getAcademyData = async () => {
  return academyData
}

export const getLogisticsData = async () => {
  return vehicleData
}

export const getInvoiceData = async () => {
  return invoiceData
}

export const getUserData = async () => {
  return userData
}

export const getPermissionsData = async () => {
  return permissionData
}

export const getProfileData = async () => {
  return profileData
}

export const getFaqData = async () => {
  return faqData
}

export const getPricingData = async () => {
  return pricingData
}

export const getStatisticsData = async () => {
  return statisticsData
}
