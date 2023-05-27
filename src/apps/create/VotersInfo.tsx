import { Formik } from 'formik'
import SlideIn from '../../components/SlideIn'
import MainButton from '../../components/MainButton'
import { votersSchema, votersInitial } from './CreateHelpers'
import BackIconAction from '../../components/backIcons/BackIconAction'
import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material'

type Props = {
  voters: typeof votersInitial
  setStep: React.Dispatch<React.SetStateAction<number>>
  completeVoteInfo: (voters: typeof votersInitial) => void
}

const VotersInfo = ({ voters, setStep, completeVoteInfo }: Props) => {
  return (
    <>
      <BackIconAction action={() => setStep(2)} />
      <SlideIn>
        <Formik
          initialValues={voters}
          onSubmit={completeVoteInfo}
          validationSchema={votersSchema}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            touched,
            errors,
            setFieldValue,
          }) => (
            <form
              onSubmit={handleSubmit}
              style={{
                marginTop: '50px',
              }}
            >
              <Typography mb='10px' variant='h4'>
                Do you want a set number of voters?
              </Typography>
              <Typography mb='20px' color='secondary'>
                This is optional. If you do not want a set number of voters, you
                will need to manually end voting later.
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}
              >
                <FormControl>
                  <RadioGroup
                    name='voters'
                    value={values.voters}
                    onChange={(e) => {
                      const val = e.target.value === 'true' ? true : false
                      if (!val) setFieldValue('max_voters', 100)
                      setFieldValue('voters', val as boolean)
                    }}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '20px',
                      height: '70px',
                    }}
                  >
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label='Yes'
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label='No'
                    />
                  </RadioGroup>
                  {values.voters && (
                    <TextField
                      sx={{ marginTop: '5px', width: '150px' }}
                      label='How many voters?'
                      name='max_voters'
                      value={values.max_voters}
                      type='number'
                      onChange={handleChange}
                      error={
                        Boolean(touched.max_voters) &&
                        Boolean(errors.max_voters)
                      }
                      helperText={touched.max_voters && errors.max_voters}
                    />
                  )}
                </FormControl>
                <Box
                  sx={{
                    height: '50px',
                    width: '100px',
                    border: 'none',
                    alignSelf: 'flex-start',
                    marginTop: '10px',
                  }}
                >
                  <MainButton type='submit' text='Next' />
                </Box>
              </Box>
            </form>
          )}
        </Formik>
      </SlideIn>
    </>
  )
}

export default VotersInfo
