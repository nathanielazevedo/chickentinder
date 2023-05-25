import { Formik } from 'formik'
import { useEffect } from 'react'
import { setSwipeTo } from '../../../state'
import SlideIn from '../../../components/SlideIn'
import { useAppDispatch } from '../../../state/redux'
import { personalSchema, pInitial } from './CreateHelpers'
import { Typography, FormControl, TextField, Button } from '@mui/material'

type Props = {
  personalData: pInitial
  setStep: React.Dispatch<React.SetStateAction<number>>
  createParty: (values: pInitial) => void
  setPersonalData: (personalData: pInitial) => void
}

const CreateForm = ({
  personalData,
  setStep,
  setPersonalData,
  createParty,
}: Props) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(
      setSwipeTo(() => {
        setStep(3)
      })
    )
  }, [dispatch, setStep])

  return (
    <SlideIn>
      <Formik
        onSubmit={createParty}
        initialValues={personalData}
        validationSchema={personalSchema}
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
            <Typography mb='20px' variant='h3'>
              Let's Create a Party
            </Typography>
            <FormControl
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              <TextField
                name='name'
                label='Party Name'
                onBlur={handleBlur}
                value={values.name}
                onChange={handleChange}
                helperText={touched.name && errors.name}
                error={Boolean(touched.name) && Boolean(errors.name)}
              />
              <TextField
                name='email'
                label='Email'
                onBlur={handleBlur}
                value={values.email}
                onChange={handleChange}
                helperText={touched.email && errors.email}
                error={Boolean(touched.email) && Boolean(errors.email)}
              />
              <TextField
                label='Password'
                type='password'
                onBlur={handleBlur}
                fullWidth
                onChange={handleChange}
                value={values.password}
                name='password'
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={
                  errors.password && touched.password
                    ? errors.password
                    : 'You can use this later to manage the party.'
                }
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
                <Typography>Create Party</Typography>
              </Button>
              <Button
                onClick={() => {
                  setStep(3)
                  setPersonalData(values)
                }}
                variant='outlined'
                sx={{
                  height: '50px',
                  border: 'none',
                  backgroundColor: 'rgb(0, 213, 250, 15%)',
                }}
              >
                <Typography>Go Back</Typography>
              </Button>
            </FormControl>
          </form>
        )}
      </Formik>
    </SlideIn>
  )
}

export default CreateForm
