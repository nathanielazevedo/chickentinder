import { Formik } from 'formik';
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

type Props = {
  values: valueType;
  fetchRestaurants: (values: valueType) => void;
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
  fetchRestaurants,
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
    const { value, checked } = e.target;
    setTimeError(false);
    setHours({ ...hours, [value]: checked });
  };
  return (
    <Formik
      initialValues={values}
      onSubmit={fetchRestaurants}
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
          <FormControl
            sx={{
              display: 'flex',
              flexDirection: 'column',
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
              error={Boolean(touched.location) && Boolean(errors.location)}
              helperText={touched.location && errors.location}
            />
            <Box width='100%'>
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
              value={values.max_voters}
              name='maxVoters'
              error={Boolean(touched.max_voters) && Boolean(errors.max_voters)}
              helperText={
                errors.max_voters && touched.max_voters
                  ? errors.max_voters
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
                errors.number_of_restaurants && touched.number_of_restaurants
                  ? errors.number_of_restaurants
                  : 'This is the number of restaurants that will be voted on.'
              }
            />
            <Box display='flex' alignSelf='flex-start' alignItems='center'>
              <Switch
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
              <FormControl>
                <FormLabel>
                  Choose the time ranges you want to be voted on
                </FormLabel>
                <RadioGroup>
                  <Box display='flex' flexWrap='wrap' justifyContent='center'>
                    {Object.keys(hoursInitial).map((hour) => (
                      <FormControlLabel
                        key={hour}
                        label={hour}
                        value={hour}
                        sx={{
                          width: '100px',
                          '& .MuiFormControlLabel-label': {
                            fontSize: '12px',
                          },
                        }}
                        control={
                          <Checkbox
                            checked={isChecked(hour)}
                            onChange={(e) => {
                              handleHours(e);
                            }}
                          />
                        }
                      />
                    ))}
                  </Box>
                </RadioGroup>
              </FormControl>
            )}
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
              fullWidth
              sx={{
                height: '50px',
              }}
            >
              <Typography>Create Party</Typography>
            </Button>
          </FormControl>
          {generalError && (
            <Typography color='error' mb='20px'>
              {generalError}
            </Typography>
          )}
        </form>
      )}
    </Formik>
  );
};

export default CreateForm;
