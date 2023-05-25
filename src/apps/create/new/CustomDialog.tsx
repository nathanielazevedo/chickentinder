import { Formik } from 'formik'
import { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import { RestaurantCreate } from '../../../models/Restaurant'
import { restaurantSchema, rvaluesInitial } from './CreateHelpers'
import { Button, FormControl, TextField, Typography } from '@mui/material'

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
  createRestaurant: (restaurant: RestaurantCreate) => void
}

const CustomDialog = ({ open, setOpen, createRestaurant }: Props) => {
  rvaluesInitial.id = Math.floor(Math.random() * 1000) as unknown as string
  const values = useState(rvaluesInitial)[0]

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      PaperProps={{
        style: {
          padding: '20px',
          backgroundImage: 'none',
          width: '450px',
        },
      }}
    >
      <Typography mb='20px' variant='h3'>
        Custom Place
      </Typography>
      <Formik
        initialValues={values}
        onSubmit={createRestaurant}
        validationSchema={restaurantSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <FormControl
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              <TextField
                name='name'
                label='Name'
                onBlur={handleBlur}
                value={values.name}
                onChange={handleChange}
                helperText={touched.name && errors.name}
                error={Boolean(touched.name) && Boolean(errors.name)}
              />
              <TextField
                name='location'
                label='Location'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.location}
                error={Boolean(touched.location) && Boolean(errors.location)}
                helperText={touched.location && errors.location}
              />
              <Button
                type='submit'
                variant='outlined'
                sx={{
                  height: '50px',
                  border: 'none',
                  backgroundColor: 'rgb(0, 213, 250, 15%)',
                }}
              >
                <Typography>Create</Typography>
              </Button>
            </FormControl>
          </form>
        )}
      </Formik>
    </Dialog>
  )
}

export default CustomDialog
