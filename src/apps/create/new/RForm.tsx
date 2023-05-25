import { Formik } from 'formik'
import { useEffect } from 'react'
import SlideIn from '../../../components/SlideIn'
import { useAppDispatch } from '../../../state/redux'
import { setSwipeDirection, setSwipeTo } from '../../../state'
import { toMiles, toMeters, rFormSchema, rInitial } from './CreateHelpers'
import {
  Box,
  Typography,
  FormControl,
  TextField,
  Slider,
  RadioGroup,
  FormControlLabel,
  Button,
  Radio,
} from '@mui/material'

type Props = {
  formData: rInitial
  generalError: string
  fetchRestaurants: (formData: rInitial) => void
}

const RForm = ({ formData, generalError, fetchRestaurants }: Props) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setSwipeTo('/'))
  }, [dispatch])

  return (
    <SlideIn>
      <Formik
        initialValues={formData}
        onSubmit={fetchRestaurants}
        validationSchema={rFormSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Typography mb='5px' variant='h3'>
              Where's the Party?
            </Typography>
            <Typography mb='20px' color='secondary'>
              We'll find the best places near you!
            </Typography>
            <FormControl
              sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
            >
              <TextField
                name='location'
                label='City Name or Zip Code'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.location}
                error={Boolean(touched.location) && Boolean(errors.location)}
                helperText={touched.location && errors.location}
              />
              <Box width='100%'>
                <Typography gutterBottom>
                  Max Distance From Location (miles)
                </Typography>
                <Slider
                  min={1}
                  step={1}
                  max={24}
                  aria-label='slider'
                  valueLabelDisplay='auto'
                  value={toMiles(values.max_distance)}
                  onChange={(_e, value) =>
                    setFieldValue('max_distance', toMeters(value as number))
                  }
                />
              </Box>
              <RadioGroup
                name='type'
                value={values.type}
                onChange={handleChange}
                sx={{ display: 'flex', flexDirection: 'row' }}
              >
                <FormControlLabel
                  value='restaurants'
                  control={<Radio />}
                  label='Restaurants'
                />
                <FormControlLabel
                  value='bars'
                  control={<Radio />}
                  label='Bars'
                />
              </RadioGroup>
              <Button
                type='submit'
                onClick={() => dispatch(setSwipeDirection('left'))}
                variant='outlined'
                sx={{
                  height: '50px',
                  border: 'none',
                  backgroundColor: 'rgb(0, 213, 250, 15%)',
                }}
              >
                <Typography>Next</Typography>
              </Button>
            </FormControl>
            {generalError && (
              <Typography color='error' mt='10px'>
                {generalError}
              </Typography>
            )}
          </form>
        )}
      </Formik>
    </SlideIn>
  )
}

export default RForm
