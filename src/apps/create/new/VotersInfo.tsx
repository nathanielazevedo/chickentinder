import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material'
import MainButton from '../../../components/MainButton'
import { useAppDispatch } from '../../../state/redux'
import { setSwipeTo } from '../../../state'
import { useEffect } from 'react'
import { Formik } from 'formik'
import SlideIn from '../../../components/SlideIn'
import { partySchema, votersInitial } from './CreateHelpers'

type Props = {
  completeVoteInfo: (voters: typeof votersInitial) => void
  setStep: React.Dispatch<React.SetStateAction<number>>
  voters: typeof votersInitial
  setVoters: React.Dispatch<React.SetStateAction<typeof votersInitial>>
}

const VotersInfo = ({
  completeVoteInfo,
  setStep,
  voters,
  setVoters,
}: Props) => {
  const handleYes = () => {
    console.log('yes')
  }

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setSwipeTo(() => setStep(2)))
  }, [dispatch, setStep])

  return (
    <SlideIn>
      <Formik
        initialValues={voters}
        onSubmit={handleYes}
        validationSchema={partySchema}
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
            <Typography mb='20px' variant='h3'>
              Let's Create a Party
            </Typography>
            <FormControl>
              <RadioGroup
                name='voters'
                value={values.voters}
                onChange={(e) => {
                  handleChange(e)
                  setVoters({
                    ...voters,
                    voters: e.target.value === 'true' ? true : false,
                  })
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
            </FormControl>
          </form>
        )}
      </Formik>
      {voters.voters && (
        <TextField
          label='How many voters?'
          name='votersNumber'
          value={voters.votersNumber}
          type='number'
          onChange={(e) => {
            setVoters({
              ...voters,
              votersNumber: Number(e.target.value),
            })
          }}
        />
      )}
      <MainButton text='Next' onClick={() => completeVoteInfo(voters)} />
    </SlideIn>
  )
}

export default VotersInfo
