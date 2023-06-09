import React from 'react'
import { Formik } from 'formik'
import { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import MainButton from '../../components/MainButton'
import { RestaurantCreate } from '../../models/Restaurant'
import { TransitionProps } from '@mui/material/transitions'
import { restaurantSchema, rvaluesInitial } from './CreateHelpers'
import { FormControl, Slide, TextField, Typography } from '@mui/material'

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
  createRestaurant: (restaurant: RestaurantCreate) => void
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='down' ref={ref} {...props} />
})

const CustomDialog = ({ open, setOpen, createRestaurant }: Props) => {
  rvaluesInitial.id = Math.floor(Math.random() * 1000) as unknown as string
  const values = useState(rvaluesInitial)[0]

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      TransitionComponent={Transition}
      PaperProps={{
        style: {
          width: '450px',
          padding: '20px',
          backgroundImage: 'none',
        },
      }}
    >
      <Typography mb='20px' variant='h4'>
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
                gap: '20px',
                display: 'flex',
                flexDirection: 'column',
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
              <MainButton type='submit' text='Create' />
            </FormControl>
          </form>
        )}
      </Formik>
    </Dialog>
  )
}

export default CustomDialog
