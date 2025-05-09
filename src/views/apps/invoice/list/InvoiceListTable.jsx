'use client'

// React Imports
import { useState, useEffect, useMemo } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import TablePagination from '@mui/material/TablePagination'

// Third-party Imports
import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'

// Component Imports
import OptionMenu from '@core/components/option-menu'
import CustomAvatar from '@core/components/mui/Avatar'
import TablePaginationComponent from '@components/TablePaginationComponent'
import CustomTextField from '@core/components/mui/TextField'

// Util Imports
import { getInitials } from '@/utils/getInitials'
import { getLocalizedUrl } from '@/utils/i18n'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://hcwqyddclmnusfuzioyj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhjd3F5ZGRjbG1udXNmdXppb3lqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk2OTA4MzksImV4cCI6MjA1NTI2NjgzOX0.uJSUIJTArrYt-dNBkL7v2WH7bh4Kd7AeQvYm53kc3bA';
const supabase = createClient(supabaseUrl, supabaseAnonKey);


const fuzzyFilter = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank
  })

  // Return if the item should be filtered in/out

  return itemRank.passed
}


const DebouncedInput = ({ value: initialValue, onChange, debounce = 500, ...props }) => {
  // States
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

// Vars
const invoiceStatusObj = {
  Sent: { color: 'secondary', icon: 'tabler-send-2' },
  Paid: { color: 'success', icon: 'tabler-check' },
  Draft: { color: 'primary', icon: 'tabler-mail' },
  'Partial Payment': { color: 'warning', icon: 'tabler-chart-pie-2' },
  'Past Due': { color: 'error', icon: 'tabler-alert-circle' },
  Downloaded: { color: 'info', icon: 'tabler-arrow-down' }
}

// Column Definitions
const columnHelper = createColumnHelper()

const InvoiceListTable = ({ invoiceData }) => {
  // States
  const [status, setStatus] = useState('')
  const [rowSelection, setRowSelection] = useState({})
  const [data, setData] = useState(...[invoiceData])
  const [filteredData, setFilteredData] = useState(data)
  const [globalFilter, setGlobalFilter] = useState('')

  const selectedIds = useMemo(() => {

    return Object.keys(rowSelection).filter(id => rowSelection[id]); // Extract selected IDs
  }, [rowSelection]);

  const handleDelete = async (id) => {
  // Delete selected rows from Supabase
  console.log('Deleting row with ID:', id);
  const { error } = await supabase
    .from('properties') // Replace with your table name
    .delete()
    .in('id', [id]); // Pass the ID as an array

  if (error) {
    console.error('Error deleting row:', error);

    return; // Handle error as needed
  }

  // Update local state to remove the deleted row
  setData(data?.filter(invoice => invoice.id !== id));
};

  // Hooks
  const { lang: locale } = useParams()

  const columns = useMemo(
    () => [
    
     columnHelper.accessor('id', {
      header: 'ID',
      cell: ({ row }) => (
        <Typography
          component={Link}
          href={getLocalizedUrl(`/apps/invoice/preview/${row.original.id}`, locale)}
          color='primary.main'
        >
           {row.original.custom_id}
        </Typography>
      )
    }) ,
    columnHelper.accessor('title', {
      header: 'title',
      cell: ({ row }) => <Typography  component={Link}
      href={getLocalizedUrl(`/apps/invoice/preview/${row.original.id}`, locale)}
     >{row.original.title}</Typography>
    }),
     
    // columnHelper.accessor('name', {
    //   header: 'Agent',
    //   cell: ({ row }) => (
    //     <div className='flex items-center gap-3'>
    //       {getAvatar({ avatar: row.original.Avatar, name: row.original.Agent_Name })}
    //       <div className='flex flex-col'>
    //         <Typography className='font-medium' color='text.primary'>
    //           {row.original.Agent_Name}
    //         </Typography>
    //         <Typography variant='body2'>{row.original.Agent_email}</Typography>
    //       </div>
    //     </div>
    //   )
    // }),
      columnHelper.accessor('price', {
        header: 'Price',
        cell: ({ row }) => {
          const price = row.original.price;
          const formattedPrice = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(price);

          return <Typography>{formattedPrice}</Typography>;
        },
      }),
      columnHelper.accessor('size', {
        header: 'size',
        cell: ({ row }) => <Typography>{`${row.original.size} ${row.original.size_unit}`}</Typography>
      }),
      columnHelper.accessor('propertyType', {
        header: 'Property Type',
        cell: ({ row }) => {
          const propertyTypes = [
            'Villa', 'Apartment', 'Office', 'Shop',
            'Warehouse', 'Factory', 'Labour Camp', 
            'Other Commercial', 'Commercial Building', 
            'Residential Floor', 'Commercial Floor', 
            'Residential Land', 'Commercial Land', 
            'Townhouse', 'Residential Building', 
            'Hotel Apartment', 'Loft Apartment', 
            'Duplex', 'Pent House'
          ];
      
          const typeLabel = propertyTypes.includes(row.original.property_type) 
            ? row.original.property_type 
            : 'Unknown';
      
          return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Chip label={typeLabel} size='small' variant='tonal' />
            </div>
          );
        }
      })
      ,
      columnHelper.accessor('furnished', {
        header: 'Furnished',
        cell: ({ row }) => {
          const chip = row.original.furnished ? (
            <Chip label='Yes' color='success' size='small' variant='tonal' />
          ) : (
            <Chip label='No' color='error' size='small' variant='tonal' />
          );
      
          return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              {chip}
            </div>
          );
        }
      })
      ,
      columnHelper.accessor('purpose', {
        header: 'Purpose',
        cell: ({ row }) => {
          const purposeChip = row.original.property_purpose === 'Rent' ? (
            <Chip label='Rent' color='info' size='small' variant='tonal' />
          ) : (
            <Chip label='Buy' color='warning' size='small' variant='tonal' />
          );
      
          return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              {purposeChip}
            </div>
          );
        }
      }), columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <IconButton onClick={() => handleDelete(row.original.id)}>
              <i className='tabler-trash text-textSecondary' />
            </IconButton>
            <IconButton>
              <Link href={getLocalizedUrl(`/apps/invoice/preview/${row.original.id}`, locale)} className='flex'>
                <i className='tabler-eye text-textSecondary' />
              </Link>
            </IconButton>
            <OptionMenu
              iconButtonProps={{ size: 'medium' }}
              iconClassName='text-textSecondary'
              options={[
                {
                  text: 'Download',
                  icon: 'tabler-download',
                  menuItemProps: { className: 'flex items-center gap-2 text-textSecondary' }
                },
                {
                  text: 'Edit',
                  icon: 'tabler-pencil',
                  href: getLocalizedUrl(`/apps/invoice/edit/${row.original.id}`, locale),
                  linkProps: {
                    className: 'flex items-center is-full plb-2 pli-4 gap-2 text-textSecondary'
                  }
                },
                {
                  text: 'Duplicate',
                  icon: 'tabler-copy',
                  menuItemProps: { className: 'flex items-center gap-2 text-textSecondary' }
                }
              ]}
            />
          </div>
        ),
        enableSorting: false
      }
    )
       /*,
      columnHelper.accessor('invoiceStatus', {
        header: 'Status',
        cell: ({ row }) => (
          <Tooltip
            title={
              <div>
                <Typography variant='body2' component='span' className='text-inherit'>
                  {row.original.invoiceStatus}
                </Typography>
                <br />
                <Typography variant='body2' component='span' className='text-inherit'>
                  Balance:
                </Typography>{' '}
                {row.original.balance}
                <br />
                <Typography variant='body2' component='span' className='text-inherit'>
                  Due Date:
                </Typography>{' '}
                {row.original.dueDate}
              </div>
            }
          >
            <CustomAvatar skin='light' color={invoiceStatusObj[row.original.invoiceStatus].color} size={28}>
              <i className={classnames('bs-4 is-4', invoiceStatusObj[row.original.invoiceStatus].icon)} />
            </CustomAvatar>
          </Tooltip>
        )
      }),
      columnHelper.accessor('name', {
        header: 'Client',
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            {getAvatar({ avatar: row.original.avatar, name: row.original.name })}
            <div className='flex flex-col'>
              <Typography className='font-medium' color='text.primary'>
                {row.original.name}
              </Typography>
              <Typography variant='body2'>{row.original.companyEmail}</Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('total', {
        header: 'Total',
        cell: ({ row }) => <Typography>{`$${row.original.total}`}</Typography>
      }),
      columnHelper.accessor('issuedDate', {
        header: 'Issued Date',
        cell: ({ row }) => <Typography>{row.original.issuedDate}</Typography>
      }),
      columnHelper.accessor('balance', {
        header: 'Balance',
        cell: ({ row }) => {
          return row.original.balance === 0 ? (
            <Chip label='Paid' color='success' size='small' variant='tonal' />
          ) : (
            <Typography color='text.primary'>{row.original.balance}</Typography>
          )
        }
      })
        ,
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <IconButton onClick={() => setData(data?.filter(invoice => invoice.id !== row.original.id))}>
              <i className='tabler-trash text-textSecondary' />
            </IconButton>
            <IconButton>
              <Link href={getLocalizedUrl(`/apps/invoice/preview/${row.original.id}`, locale)} className='flex'>
                <i className='tabler-eye text-textSecondary' />
              </Link>
            </IconButton>
            <OptionMenu
              iconButtonProps={{ size: 'medium' }}
              iconClassName='text-textSecondary'
              options={[
                {
                  text: 'Download',
                  icon: 'tabler-download',
                  menuItemProps: { className: 'flex items-center gap-2 text-textSecondary' }
                },
                {
                  text: 'Edit',
                  icon: 'tabler-pencil',
                  href: getLocalizedUrl(`/apps/invoice/edit/${row.original.id}`, locale),
                  linkProps: {
                    className: 'flex items-center is-full plb-2 pli-4 gap-2 text-textSecondary'
                  }
                },
                {
                  text: 'Duplicate',
                  icon: 'tabler-copy',
                  menuItemProps: { className: 'flex items-center gap-2 text-textSecondary' }
                }
              ]}
            />
          </div>
        ),
        enableSorting: false
      }
    )
    */
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, filteredData]
  )

  const table = useReactTable({
    data: filteredData,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      rowSelection,
      globalFilter
    },
    initialState: {
      pagination: {
        pageSize: 10
      }
    },
    enableRowSelection: true, //enable row selection for all rows
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  const getAvatar = params => {
    const { avatar, name } = params

    if (avatar) {

      return <CustomAvatar src={avatar} skin='light' size={34} />
    } else {

      return (
        <CustomAvatar skin='light' size={34}>
          {getInitials(name)}
        </CustomAvatar>
      )
    }
  }

  useEffect(() => {
  console.log('status', status)
    const filteredData = data?.filter(property => {

      if (status && property.property_type !== status) return false

      return true
    })
    
if (status === "All") {
  setFilteredData(data);
} else {
  setFilteredData(filteredData);
}
    console.log('finltered daa ',data)

  }, [status, data, setFilteredData])

  return (
    <Card>
      <CardContent className='flex justify-between flex-col items-start md:items-center md:flex-row gap-4'>
        <div className='flex flex-col sm:flex-row items-center justify-between gap-4 is-full sm:is-auto'>
          <div className='flex items-center gap-2 is-full sm:is-auto'>
            <Typography className='hidden sm:block'>Show</Typography>
            <CustomTextField
              select
              value={table.getState().pagination.pageSize}
              onChange={e => table.setPageSize(Number(e.target.value))}
              className='is-[70px] max-sm:is-full'
            >
              <MenuItem value='10'>10</MenuItem>
              <MenuItem value='25'>25</MenuItem>
              <MenuItem value='50'>50</MenuItem>
            </CustomTextField>
          </div>
          <Button
            variant='contained'
            component={Link}
            startIcon={<i className='tabler-plus' />}
            href={getLocalizedUrl('apps/properties/add', locale)}
            className='max-sm:is-full'
          >
            Create Property
          </Button>
        </div>
        <div className='flex max-sm:flex-col max-sm:is-full sm:items-center gap-4'>
          <DebouncedInput
            value={globalFilter ?? ''}
            onChange={value => setGlobalFilter(String(value))}
            placeholder='Search Properties...'
            className='max-sm:is-full sm:is-[250px]'
          />
          <CustomTextField
            select
            id='select-status'
            value={status}
            onChange={e => setStatus(e.target.value)}
            className='max-sm:is-full sm:is-[160px]'
            slotProps={{
              select: { displayEmpty: true }
            }}
          >
            <MenuItem value='All'>Select Type</MenuItem>
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
        </div>
      </CardContent>
      <div className='overflow-x-auto'>
        <table className={tableStyles.table}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : (
                      <>
                        <div
                          className={classnames({
                            'flex items-center': header.column.getIsSorted(),
                            'cursor-pointer select-none': header.column.getCanSort()
                          })}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{
                            asc: <i className='tabler-chevron-up text-xl' />,
                            desc: <i className='tabler-chevron-down text-xl' />
                          }[header.column.getIsSorted()] ?? null}
                        </div>
                      </>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {table.getFilteredRowModel().rows.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                  No data available
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {table
                .getRowModel()
                .rows.slice(0, table.getState().pagination.pageSize)
                .map(row => {
                  
                  return (
                    <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                      {row.getVisibleCells().map(cell => (
                        <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                      ))}
                    </tr>
                  )
                })}
            </tbody>
          )}
        </table>
      </div>
      <TablePagination
        component={() => <TablePaginationComponent table={table} />}
        count={table.getFilteredRowModel().rows.length}
        rowsPerPage={table.getState().pagination.pageSize}
        page={table.getState().pagination.pageIndex}
        onPageChange={(_, page) => {
          table.setPageIndex(page)
        }}
        onRowsPerPageChange={e => table.setPageSize(Number(e.target.value))}
      />
    </Card>
  )
}

export default InvoiceListTable
