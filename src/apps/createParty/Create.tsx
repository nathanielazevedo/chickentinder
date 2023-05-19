import API from '../../api';
import { Formik } from 'formik';
import { useState } from 'react';
import { bg } from '../../assets';
import CreateLoad from './CreateLoad';
import { Party } from '../../models/Party';
// import { globalStyles } from '../../styles';
import Navbar from '../../components/Navbar';
import NewPartyScreen from './NewPartyScreen';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import RestaurantsPreview from './RestaurantsPreview';
import { Restaurant } from '../../models/Restaurant';
// import { restaurants as restaurantsM } from '../../mockData/mockR';
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
import { globalStyles } from '../../styles';

const Create = () => {
  const [loading, setLoading] = useState(false);
  const [voteTime, setVoteTime] = useState(false);
  const [hours, setHours] = useState(hoursInitial);
  const [values, setValues] = useState(valueInitial);
  const [timeError, setTimeError] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const [party, setParty] = useState<Party | undefined>(undefined);
  const [restaurants, setRestaurants] = useState<Restaurant[] | undefined>(
    undefined
  );

  const createParty = async (values: valueType) => {
    if (voteTime) {
      const officialHours = Object.keys(hours).filter(
        (h) => hours[h as keyof hoursType] === true
      );
      if (officialHours.length < 2) {
        setTimeError(true);
        return;
      }
    }
    setValues(values);
    setLoading(true);
    try {
      const restaurants = await API.fetchRestaurants(values);
      if (restaurants?.error?.message) {
        setGeneralError(restaurants.error.message);
        setLoading(false);
        return;
      } else if (restaurants.length === 0) {
        setGeneralError('No restaurants found. Please try again.');
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

    const hoursHash = officialHours.reduce((acc, h) => {
      return { ...acc, [h]: 0 };
    }, {});

    const party = await API.createParty({
      ...values,
      restaurants: officialRestaurants,
      voteTime,
      hours: hoursHash,
    });

    setRestaurants(undefined);
    setParty(party);
  };

  const isChecked = (value: string) => {
    return hours[value as keyof hoursType];
  };

  const handleHours = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeError(false);
    const { value, checked } = e.target;
    setHours({ ...hours, [value]: checked });
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
                height: { xs: '100%', sm: '100%' },
                minHeight: {
                  xs: 'calc(100vh - 56px)',
                  sm: 'calc(100vh - 64px)',
                },
                backgroundImage: `url(${bg})`,
                backgroundPosition: 'center',
                paddingBottom: { xs: '50px', sm: '50px' },
              }}
            >
              <Box
                sx={{
                  padding: { xs: '40px 30px', sm: '40px' },
                  borderRadius: { xs: '20px', sm: '20px' },
                  width: { xs: '90%', sm: '500px' },
                  height: { xs: '100%', sm: 'auto' },
                  backgroundColor: '#ffffff',
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
                          <RadioGroup
                            aria-labelledby='demo-radio-buttons-group-label'
                            defaultValue='female'
                            name='radio-buttons-group'
                          >
                            <Box>
                              <FormControlLabel
                                value='7-8 AM'
                                control={
                                  <Checkbox
                                    checked={isChecked('7-8 AM')}
                                    onChange={(e) => {
                                      handleHours(e);
                                    }}
                                  />
                                }
                                label='7-8 AM'
                              />
                              <FormControlLabel
                                value='8-9 AM'
                                control={
                                  <Checkbox
                                    checked={isChecked('8-9 AM')}
                                    onChange={(e) => {
                                      handleHours(e);
                                    }}
                                  />
                                }
                                label='8-9 AM'
                              />
                              <FormControlLabel
                                value='9-10 AM'
                                control={
                                  <Checkbox
                                    checked={isChecked('9-10 AM')}
                                    onChange={(e) => {
                                      handleHours(e);
                                    }}
                                  />
                                }
                                label='9-10 AM'
                              />
                              <FormControlLabel
                                value='10-11 AM'
                                control={
                                  <Checkbox
                                    checked={isChecked('10-11 AM')}
                                    onChange={(e) => {
                                      handleHours(e);
                                    }}
                                  />
                                }
                                label='10-11 AM'
                              />
                              <FormControlLabel
                                value='11-12 AM'
                                control={
                                  <Checkbox
                                    checked={isChecked('11-12 AM')}
                                    onChange={(e) => {
                                      handleHours(e);
                                    }}
                                  />
                                }
                                label='12-1 PM'
                              />
                              <FormControlLabel
                                value='1-2 PM'
                                control={
                                  <Checkbox
                                    checked={isChecked('1-2 PM')}
                                    onChange={(e) => {
                                      handleHours(e);
                                    }}
                                  />
                                }
                                label='1-2 PM'
                              />
                              <FormControlLabel
                                value='2-3 PM'
                                control={
                                  <Checkbox
                                    checked={isChecked('2-3 PM')}
                                    onChange={(e) => {
                                      handleHours(e);
                                    }}
                                  />
                                }
                                label='2-3 PM'
                              />
                              <FormControlLabel
                                value='3-4 PM'
                                control={
                                  <Checkbox
                                    checked={isChecked('3-4 PM')}
                                    onChange={(e) => {
                                      handleHours(e);
                                    }}
                                  />
                                }
                                label='3-4 PM'
                              />

                              <FormControlLabel
                                value='4-5 PM'
                                control={
                                  <Checkbox
                                    checked={isChecked('4-5 PM')}
                                    onChange={(e) => {
                                      handleHours(e);
                                    }}
                                  />
                                }
                                label='4-5 PM'
                              />
                              <FormControlLabel
                                value='5-6 PM'
                                control={
                                  <Checkbox
                                    checked={isChecked('5-6 PM')}
                                    onChange={(e) => {
                                      handleHours(e);
                                    }}
                                  />
                                }
                                label='5-6 PM'
                              />
                              <FormControlLabel
                                value='6-7 PM'
                                control={
                                  <Checkbox
                                    checked={isChecked('6-7 PM')}
                                    onChange={(e) => {
                                      handleHours(e);
                                    }}
                                  />
                                }
                                label='6-7 PM'
                              />
                              <FormControlLabel
                                value='7-8 PM'
                                control={
                                  <Checkbox
                                    checked={isChecked('7-8 PM')}
                                    onChange={(e) => {
                                      handleHours(e);
                                    }}
                                  />
                                }
                                label='7-8 PM'
                              />
                              <FormControlLabel
                                value='8-9 PM'
                                control={
                                  <Checkbox
                                    checked={isChecked('8-9 PM')}
                                    onChange={(e) => {
                                      handleHours(e);
                                    }}
                                  />
                                }
                                label='8-9 PM'
                              />
                              <FormControlLabel
                                value='9-10 PM'
                                control={
                                  <Checkbox
                                    checked={isChecked('9-10 PM')}
                                    onChange={(e) => {
                                      handleHours(e);
                                    }}
                                  />
                                }
                                label='9-10 PM'
                              />
                              <FormControlLabel
                                value='10-11 PM'
                                control={
                                  <Checkbox
                                    checked={isChecked('10-11 PM')}
                                    onChange={(e) => {
                                      handleHours(e);
                                    }}
                                  />
                                }
                                label='10-11 PM'
                              />
                              <FormControlLabel
                                value='11-12 PM'
                                control={
                                  <Checkbox
                                    checked={isChecked('11-12 PM')}
                                    onChange={(e) => {
                                      handleHours(e);
                                    }}
                                  />
                                }
                                label='11-12 PM'
                              />
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
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Create;
