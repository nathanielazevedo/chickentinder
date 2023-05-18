import API from '../../api';
import { Formik } from 'formik';
import { useState } from 'react';
import { chick } from '../../assets';
import CreateLoad from './CreateLoad';
import { Party } from '../../models/Party';
import { globalStyles } from '../../styles';
import Navbar from '../../components/NavBar';
import NewPartyScreen from './NewPartyScreen';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import RestaurantsPreview from './RestaurantsPreview';
import { Restaurant } from '../../models/Restaurant';
import FormControlLabel from '@mui/material/FormControlLabel';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Slider,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import {
  hoursInitial,
  valueInitial,
  partySchema,
  toMeters,
  toMiles,
  hoursType,
  valueType,
} from './CreateHelpers';

const Create = () => {
  const [loading, setLoading] = useState(false);
  const [voteTime, setVoteTime] = useState(false);
  const [hours, setHours] = useState(hoursInitial);
  const [values, setValues] = useState(valueInitial);
  const [generalError, setGeneralError] = useState('');
  const [party, setParty] = useState<Party | undefined>(undefined);
  const [restaurants, setRestaurants] = useState<Restaurant[] | undefined>(
    undefined
  );

  const createParty = async (values: valueType) => {
    setValues(values);
    setLoading(true);
    try {
      const restaurants = await API.fetchRestaurants(values);
      if (restaurants?.error?.message) {
        setGeneralError(restaurants.error.message);
        setLoading(false);
        return;
      } else {
        const restaurantsWithChecks = restaurants.map((r: Restaurant) => {
          return { ...r, checked: true };
        });
        setRestaurants(restaurantsWithChecks);
        setLoading(false);
      }
    } catch {
      setLoading(false);
    }
  };

  const moveAhead = async () => {
    if (!restaurants) return;
    const officialRestaurants = restaurants.filter(
      (r: Restaurant) => r.checked === true
    );

    const officialHours = Object.keys(hours).filter(
      (h) => hours[h as keyof hoursType] === true
    );
    const hoursAsObject = officialHours.map((h) => {
      return { [h]: 0 };
    });

    const party = await API.createParty({
      ...values,
      restaurants: officialRestaurants,
      voteTime,
      hours: hoursAsObject,
    });

    setRestaurants(undefined);
    setParty(party);
  };

  const handleHours = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setHours({ ...hours, [name]: checked });
  };

  if (restaurants) {
    return (
      <RestaurantsPreview
        restaurants={restaurants}
        moveAhead={moveAhead}
        setRestaurants={setRestaurants}
      />
    );
  }

  if (loading) return <CreateLoad />;
  if (party) return <NewPartyScreen party={party} />;

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
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: { xs: 0, sm: '70px' },
              }}
            >
              <Box
                sx={{
                  padding: '40px',
                  borderRadius: { xs: 0, sm: '20px' },
                  width: { xs: '100%', sm: '500px' },
                  height: { xs: '100%', sm: 'auto' },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '20px',
                    gap: '5px',
                  }}
                >
                  <img src={chick} width='50px' />
                  <Typography
                    variant='h3'
                    sx={{
                      fontWeight: 'bold',
                    }}
                  >
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
                          setVoteTime(e.target.checked);
                        }}
                      />
                      <Typography>Vote on the best time to meet?</Typography>
                    </Box>
                    {voteTime && (
                      <>
                        <FormControl>
                          <FormLabel id='demo-radio-buttons-group-label'>
                            Choose the ranges of times you want to be voted on
                          </FormLabel>
                          <RadioGroup
                            aria-labelledby='demo-radio-buttons-group-label'
                            defaultValue='female'
                            name='radio-buttons-group'
                          >
                            <FormControlLabel
                              value='7-8 AM'
                              control={
                                <Checkbox
                                  onChange={(e) => {
                                    handleHours(e);
                                  }}
                                />
                              }
                              label='7-8 AM'
                            />
                            <FormControlLabel
                              value='male'
                              control={
                                <Checkbox
                                  onChange={(e) => {
                                    handleHours(e);
                                  }}
                                />
                              }
                              label='8-9 AM'
                            />
                            <FormControlLabel
                              value='other'
                              control={
                                <Checkbox
                                  onChange={(e) => {
                                    handleHours(e);
                                  }}
                                />
                              }
                              label='9-10 AM'
                            />
                            <FormControlLabel
                              value='other'
                              control={
                                <Checkbox
                                  onChange={(e) => {
                                    handleHours(e);
                                  }}
                                />
                              }
                              label='11-12 AM'
                            />
                            <FormControlLabel
                              value='other'
                              control={
                                <Checkbox
                                  onChange={(e) => {
                                    handleHours(e);
                                  }}
                                />
                              }
                              label='1-2 PM'
                            />
                            <FormControlLabel
                              value='other'
                              control={
                                <Checkbox
                                  onChange={(e) => {
                                    handleHours(e);
                                  }}
                                />
                              }
                              label='2-3 PM'
                            />
                            <FormControlLabel
                              value='other'
                              control={
                                <Checkbox
                                  onChange={(e) => {
                                    handleHours(e);
                                  }}
                                />
                              }
                              label='3-4 PM'
                            />
                            <FormControlLabel
                              value='other'
                              control={
                                <Checkbox
                                  onChange={(e) => {
                                    handleHours(e);
                                  }}
                                />
                              }
                              label='4-5 PM'
                            />
                            <FormControlLabel
                              value='other'
                              control={
                                <Checkbox
                                  onChange={(e) => {
                                    handleHours(e);
                                  }}
                                />
                              }
                              label='5-6 PM'
                            />
                            <FormControlLabel
                              value='other'
                              control={
                                <Checkbox
                                  onChange={(e) => {
                                    handleHours(e);
                                  }}
                                />
                              }
                              label='6-7 PM'
                            />
                            <FormControlLabel
                              value='other'
                              control={
                                <Checkbox
                                  onChange={(e) => {
                                    handleHours(e);
                                  }}
                                />
                              }
                              label='7-8 PM'
                            />
                            <FormControlLabel
                              value='other'
                              control={
                                <Checkbox
                                  onChange={(e) => {
                                    handleHours(e);
                                  }}
                                />
                              }
                              label='8-9 PM'
                            />
                            <FormControlLabel
                              value='other'
                              control={
                                <Checkbox
                                  onChange={(e) => {
                                    handleHours(e);
                                  }}
                                />
                              }
                              label='9-10 PM'
                            />
                            <FormControlLabel
                              value='other'
                              control={
                                <Checkbox
                                  onChange={(e) => {
                                    handleHours(e);
                                  }}
                                />
                              }
                              label='10-11 PM'
                            />
                            <FormControlLabel
                              value='other'
                              control={
                                <Checkbox
                                  onChange={(e) => {
                                    handleHours(e);
                                  }}
                                />
                              }
                              label='11-12 PM'
                            />
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
                        fontSize: '1rem',
                        color: 'white',
                        backgroundImage: globalStyles.gradientBg,
                      }}
                    >
                      Create Party
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
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Create;
