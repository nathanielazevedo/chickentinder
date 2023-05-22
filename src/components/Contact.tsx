import { Formik } from 'formik'
import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { contactSchema } from '../apps/createParty/CreateHelpers'
import { FormControl, TextField, Button, Typography } from '@mui/material'

const Contact = () => {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setErr] = useState('')
  const values = useState({
    name: '',
    email: '',
    message: '',
  })[0]

  const handleSubmit = (vals: typeof values) => {
    setLoading(true)
    emailjs
      .send(
        'service_kn43mje',
        'template_ljk6583',
        {
          from_name: vals.name,
          to_name: 'Chicken Tinder',
          from_email: vals.email,
          to_email: 'contactchickentinder@gmail.com',
          message: vals.message,
        },
        'lPSlidbfd6LVykhVh'
      )
      .then(
        () => {
          setLoading(false)
          setSubmitted(true)
        },
        (error) => {
          setLoading(false)
          console.log(error)
          setErr(error)
        }
      )
  }

  if (submitted) {
    return (
      <>
        <Typography variant='h3'>Thank you for contacting us!</Typography>
        <Typography variant='h5'>
          We will get back to you as soon as possible.
        </Typography>
      </>
    )
  }

  return (
    <Formik
      initialValues={values}
      onSubmit={handleSubmit}
      validationSchema={contactSchema}
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
            <Typography variant='h3'>Contact Us</Typography>
            <TextField
              name='name'
              label='Your Name'
              onBlur={handleBlur}
              value={values.name}
              onChange={handleChange}
              helperText={touched.name && errors.name}
              error={Boolean(touched.name) && Boolean(errors.name)}
            />
            <TextField
              name='email'
              label='Your Email'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
            <TextField
              multiline
              name='message'
              label='Message'
              error={Boolean(touched.message) && Boolean(errors.message)}
              onBlur={handleBlur}
              helperText={touched.email && errors.email}
              onChange={handleChange}
              value={values.message}
              rows={10}
              maxRows='infinity'
            />
            <Button
              type='submit'
              disabled={loading}
              variant='outlined'
              sx={{
                height: '50px',
                border: 'none',
                backgroundColor: 'rgb(0, 213, 250, 15%)',
              }}
            >
              <Typography>{loading ? 'Sending' : 'Submit'}</Typography>
            </Button>
            {error && <Typography color='error'>{error}</Typography>}
          </FormControl>
        </form>
      )}
    </Formik>
  )
}

export default Contact
