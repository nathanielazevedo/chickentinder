import API from '../../api';
import { Formik } from 'formik';
import { useState } from 'react';
import { chick } from '../../assets';
import { globalStyles } from '../../styles';
import { object, string, number } from 'yup';
import Navbar from '../../components/Navbar';
import NewPartyScreen from './NewPartyScreen';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import RestaurantsPreview from './RestaurantsPreview';
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

const partySchema = object({
  name: string().required('Required'),
  location: string().required('Required'),
  max_distance: number()
    .required('Required')
    .positive()
    .integer('Must be an integer'),
  maxVoters: number().required('Required').positive().integer(),
  password: string().required('Required'),
  number_of_restaurants: number().required('Required').positive().integer(),
});

const Create = () => {
  const [party, setParty] = useState<any>(undefined);
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const [voteTime, setVoteTime] = useState(false);
  const [restaurants, setRestaurants] = useState<any>(undefined);
  const [values, setValues] = useState({
    name: '',
    location: '',
    max_distance: 15000,
    maxVoters: '',
    password: '',
    number_of_restaurants: '',
  });

  const [hours, setHours] = useState({
    '7-8 AM': false,
    '8-9 AM': false,
    '9-10 AM': false,
    '10-11 AM': false,
    '11-12 PM': false,
    '12-1 PM': false,
    '1-2 PM': false,
    '2-3 PM': false,
    '3-4 PM': false,
    '4-5 PM': false,
    '5-6 PM': false,
    '6-7 PM': false,
    '7-8 PM': false,
    '8-9 PM': false,
    '9-10 PM': false,
    '10-11 PM': false,
    '11-12 AM': false,
  });

  const toMeters = (miles: number) => {
    const meters = miles * 1609.34;
    return Math.floor(meters);
  };

  const toMiles = (km: number) => {
    const miles = km / 1609.34;
    return Math.floor(miles);
  };

  const createParty = async (values: any) => {
    setValues(values);
    setLoading(true);
    try {
      const restaurants = await API.fetchRestaurants(values);
      if (restaurants?.error?.message) {
        setGeneralError(restaurants.error.message);
        setLoading(false);
        return;
      } else {
        const restaurantsWithChecks = restaurants.map((r: any) => {
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
    const officialRestaurants = restaurants.filter(
      (r: any) => r.checked === true
    );

    const officialHours = Object.keys(hours).filter((h) => hours[h] === true);
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

  const handleHours = (e: any) => {
    const { name, checked } = e.target;
    setHours({ ...hours, [name]: checked });
  };

  if (restaurants) {
    return (
      <>
        <Navbar showButton={false} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              padding: '40px 0',
              borderRadius: '20px',
              width: { xs: '98%', sm: '500px' },
            }}
          >
            <RestaurantsPreview
              restaurants={restaurants}
              moveAhead={moveAhead}
              setRestaurants={setRestaurants}
            />
          </Box>
        </Box>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <Navbar showButton={false} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: { xs: 'flex-start', sm: 'center' },
            height: 'calc(100vh - 70px)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              marginTop: { xs: '100px', sm: 0 },
            }}
          >
            <img src={chick} width='250px' />
            <Typography variant='h5'>
              I'm looking for the best restaurants for you...
            </Typography>
          </Box>
        </Box>
      </>
    );
  }

  if (party) {
    return (
      <>
        <Navbar showButton={false} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: 'calc(100vh - 70px)',
          }}
        >
          <Box
            sx={{
              padding: '40px',
              borderRadius: '20px',
              width: { xs: '100%', sm: '500px' },
            }}
          >
            <NewPartyScreen party={party} />
          </Box>
        </Box>
      </>
    );
  }

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
          resetForm,
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
                          // setFormData({
                          //   ...formData,
                          //   maxDistance: inKm as number,
                          // });
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
                                    handleHours(e.target);
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
                                    handleHours(e.target);
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
                                    handleHours(e.target);
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
                                    handleHours(e.target);
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
                                    handleHours(e.target);
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
                                    handleHours(e.target);
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
                                    handleHours(e.target);
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
                                    handleHours(e.target);
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
                                    handleHours(e.target);
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
                                    handleHours(e.target);
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
                                    handleHours(e.target);
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
                                    handleHours(e.target);
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
                                    handleHours(e.target);
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
                                    handleHours(e.target);
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
                                    handleHours(e.target);
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
