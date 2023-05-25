import { Formik } from 'formik'
import SlideIn from '../../../components/SlideIn'
import { votersSchema, votersInitial } from './CreateHelpers'
import BackIconAction from '../../../components/backIcons/BackIconAction'
import {
  Button,
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
  setVoters: React.Dispatch<React.SetStateAction<typeof votersInitial>>
}

const VotersInfo = ({
  voters,
  setStep,
  setVoters,
  completeVoteInfo,
}: Props) => {
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
            <form onSubmit={handleSubmit}>
              <Typography mb='20px' variant='h3'>
                Let's Create a Party
              </Typography>
              <FormControl>
                <RadioGroup
                  name='voters'
                  value={values.voters}
                  onChange={(e) => {
                    const val = e.target.value === 'true' ? true : false
                    if (!val) setFieldValue('max_voters', 100)
                    setFieldValue('voters', val as boolean)
                  }}
                  sx={{ display: 'flex', flexDirection: 'row' }}
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
                    label='How many voters?'
                    name='max_voters'
                    value={values.max_voters}
                    type='number'
                    onChange={handleChange}
                    error={
                      Boolean(touched.max_voters) && Boolean(errors.max_voters)
                    }
                    helperText={touched.max_voters && errors.max_voters}
                  />
                )}
              </FormControl>
              <Button type='submit'>Next</Button>
            </form>
          )}
        </Formik>
      </SlideIn>
    </>
  )
}

export default VotersInfo
