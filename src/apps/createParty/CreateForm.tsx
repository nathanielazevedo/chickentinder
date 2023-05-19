import { Formik } from 'formik';
import Navbar from '../../components/Navbar';
import { globalStyles } from '../../styles';
import {
  partySchema,
  toMiles,
  toMeters,
  valueType,
  hoursType,
  hoursInitial,
} from './CreateHelpers';
import {
  Box,
  Typography,
  FormControl,
  TextField,
  Slider,
  Switch,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  Button,
} from '@mui/material';
import Container from '../../components/Container';

type Props = {
  values: valueType;
  createParty: (values: valueType) => void;
  setHours: (hours: hoursType) => void;
  hours: hoursType;
  voteTime: boolean;
  setTimeError: (error: boolean) => void;
  timeError: boolean;
  setVoteTime: (voteTime: boolean) => void;
  generalError: string;
};

const CreateForm = ({
  values,
  createParty,
  hours,
  voteTime,
  setTimeError,
  timeError,
  setVoteTime,
  generalError,
  setHours,
}: Props) => {
  const isChecked = (value: string) => {
    return hours[value as keyof hoursType];
  };
  const handleHours = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeError(false);
    const { value, checked } = e.target;
    setHours({ ...hours, [value]: checked });
  };
  return (
    <>
      <Navbar showButton={false} />
      <Formik
        initialValues={values}
        onSubmit={createParty}
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
            <Container>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '20px',
                  gap: '5px',
                }}
              >
                <Typography variant='h3' fontWeight='bold'>
                  Let's Create a Party
                </Typography>
              </Box>
              <Box>
                <FormControl
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '20px',
                  }}
                >
                  <TextField
                    label='Party Name'
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    name='name'
                    error={Boolean(touched.name) && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                  <TextField
                    label='City Name or Zip Code'
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.location}
                    name='location'
                    error={
                      Boolean(touched.location) && Boolean(errors.location)
                    }
                    helperText={touched.location && errors.location}
                  />
                  <Box
                    sx={{
                      width: '100%',
                    }}
                  >
                    <Typography id='slider' gutterBottom>
                      Max Distance From Location (miles)
                    </Typography>
                    <Slider
                      value={toMiles(values.max_distance)}
                      aria-label='slider'
                      valueLabelDisplay='auto'
                      min={1}
                      step={1}
                      max={24}
                      onChange={(_e, value) => {
                        const inKm = toMeters(value as number);
                        setFieldValue('max_distance', inKm);
                      }}
                    />
                  </Box>
                  <TextField
                    label='Number of Voters'
                    fullWidth
                    autoComplete='off'
                    type='number'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.maxVoters}
                    name='maxVoters'
                    error={
                      Boolean(touched.maxVoters) && Boolean(errors.maxVoters)
                    }
                    helperText={
                      errors.maxVoters && touched.maxVoters
                        ? errors.maxVoters
                        : 'Voting will end when this many people have voted.'
                    }
                  />
                  <TextField
                    label='How many restaurants to vote on?'
                    fullWidth
                    autoComplete='off'
                    type='number'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.number_of_restaurants}
                    name='number_of_restaurants'
                    error={
                      Boolean(touched.number_of_restaurants) &&
                      Boolean(errors.number_of_restaurants)
                    }
                    helperText={
                      errors.number_of_restaurants &&
                      touched.number_of_restaurants
                        ? errors.number_of_restaurants
                        : 'This is the number of restaurants that will be voted on.'
                    }
                  />
                  <Box
                    sx={{
                      display: 'flex',
                      alignSelf: 'flex-start',
                      alignItems: 'center',
                    }}
                  >
                    <Switch
                      inputProps={{ 'aria-label': 'Switch demo' }}
                      onChange={(e) => {
                        setTimeError(false);
                        setVoteTime(e.target.checked);
                      }}
                    />
                    <Box>
                      <Typography>Vote on the best time to meet?</Typography>
                      {timeError && voteTime && (
                        <Typography color='error'>
                          You must choose at least 2 times
                        </Typography>
                      )}
                    </Box>
                  </Box>
                  {voteTime && (
                    <>
                      <FormControl>
                        <FormLabel id='demo-radio-buttons-group-label'>
                          Choose the time ranges you want to be voted on
                        </FormLabel>
                        <RadioGroup>
                          <Box>
                            {Object.keys(hoursInitial).map((hour) => (
                              <FormControlLabel
                                value={hour}
                                control={
                                  <Checkbox
                                    checked={isChecked(hour)}
                                    onChange={(e) => {
                                      handleHours(e);
                                    }}
                                  />
                                }
                                label={hour}
                              />
                            ))}
                          </Box>
                        </RadioGroup>
                      </FormControl>
                    </>
                  )}
                  <Box
                    sx={{
                      width: '100%',
                    }}
                  >
                    <TextField
                      label='Password'
                      type='password'
                      onBlur={handleBlur}
                      fullWidth
                      onChange={handleChange}
                      value={values.password}
                      name='password'
                      error={
                        Boolean(touched.password) && Boolean(errors.password)
                      }
                      helperText={
                        errors.password && touched.password
                          ? errors.password
                          : 'You can use this later to manage the party.'
                      }
                    />
                  </Box>
                  <Button
                    type='submit'
                    variant='contained'
                    fullWidth
                    sx={{
                      height: '50px',
                      color: 'black',
                      backgroundImage: globalStyles.gradientBg,
                      border: '1px solid black',
                    }}
                  >
                    <Typography>Create Party</Typography>
                  </Button>
                </FormControl>
                {generalError && (
                  <Typography
                    color='error'
                    sx={{
                      marginTop: '20px',
                    }}
                  >
                    {generalError}
                  </Typography>
                )}
              </Box>
            </Container>
          </form>
        )}
      </Formik>
    </>
  );
};

export default CreateForm;
