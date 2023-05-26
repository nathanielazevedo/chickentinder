import { Formik } from 'formik'
import SlideIn from '../../components/SlideIn'
import MainButton from '../../components/MainButton'
import BackIcon from '../../components/backIcons/BackIconTo'
import { toMiles, toMeters, rFormSchema, RFormType } from './CreateHelpers'
import {
  Box,
  Typography,
  FormControl,
  TextField,
  Slider,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material'

type Props = {
  rError: string | null
  formData: RFormType
  fetchRestaurants: (formData: RFormType) => void
}

const RForm = ({ rError, formData, fetchRestaurants }: Props) => {
  return (
    <>
      <BackIcon to='/' />
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
                <RadioGroup
                  name='type'
                  value={values.type}
                  onChange={handleChange}
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
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
                <TextField
                  name='location'
                  label='City Name or Zip Code'
                  variant='outlined'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                />
                <Box
                  width='100%'
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
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
                <MainButton type='submit' text='Next' />
                {rError && (
                  <Typography color='error' mt='px'>
                    {rError}
                  </Typography>
                )}
              </FormControl>
            </form>
          )}
        </Formik>
      </SlideIn>
    </>
  )
}

export default RForm
