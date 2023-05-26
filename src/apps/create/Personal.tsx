import { Formik } from 'formik'
import SlideIn from '../../components/SlideIn'
import MainButton from '../../components/MainButton'
import { personalSchema, PersonalType } from './CreateHelpers'
import BackIcon from '../../components/backIcons/BackIconAction'
import { Typography, FormControl, TextField } from '@mui/material'

type Props = {
  personalData: PersonalType
  setStep: React.Dispatch<React.SetStateAction<number>>
  createParty: (values: PersonalType) => void
  setPersonalData: (personalData: PersonalType) => void
}

const CreateForm = ({
  personalData,
  setStep,
  createParty,
  setPersonalData,
}: Props) => {
  return (
    <>
      <BackIcon
        action={() => {
          setStep(3)
          setPersonalData(personalData)
        }}
      />
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
                Final Step
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
                  onChange={(e) => {
                    setPersonalData({ ...personalData, name: e.target.value })
                    handleChange(e)
                  }}
                  helperText={touched.name && errors.name}
                  error={Boolean(touched.name) && Boolean(errors.name)}
                />
                <TextField
                  name='email'
                  label='Email'
                  onBlur={handleBlur}
                  value={values.email}
                  onChange={(e) => {
                    setPersonalData({ ...personalData, email: e.target.value })
                    handleChange(e)
                  }}
                  helperText={
                    errors.email && touched.email
                      ? errors.email
                      : 'Used to handle a forgotten password or lost party link.'
                  }
                  error={Boolean(touched.email) && Boolean(errors.email)}
                />
                <TextField
                  label='Password'
                  type='password'
                  onBlur={handleBlur}
                  fullWidth
                  onChange={(e) => {
                    setPersonalData({
                      ...personalData,
                      password: e.target.value,
                    })
                    handleChange(e)
                  }}
                  value={values.password}
                  name='password'
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={
                    errors.password && touched.password
                      ? errors.password
                      : 'You can use this later to manage the party.'
                  }
                />
                <MainButton type='submit' text='Create Party' />
              </FormControl>
            </form>
          )}
        </Formik>
      </SlideIn>
    </>
  )
}

export default CreateForm
