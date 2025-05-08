'use client'

// MUI Imports
import Grid from '@mui/material/Grid2'

// Component Imports

import LeadCard from './LeadsCard'
import LeadsListTable from './LeadsListTable'

const LeadsList = ({ orderData }) => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <LeadCard />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <LeadsListTable orderData={orderData} />
      </Grid>
    </Grid>
  )
}

export default LeadsList
