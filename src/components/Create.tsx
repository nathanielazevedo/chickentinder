import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  Slider,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import API from '../api';
import Navbar from './Navbar';
import dayjs from 'dayjs';
import NewPartyScreen from './NewPartyScreen';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

const Create = () => {
  const [party, setParty] = useState(undefined);
  const setOpen = useState(false)[1];
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const [voteTime, setVoteTime] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    maxDistance: 15000,
    expirationDate: dayjs('2023-05-15T15:30'),
    maxVoters: '',
    password: '',
    number_of_restaurants: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    location: '',
    maxDistance: '',
    expirationDate: '',
    maxVoters: '',
    password: '',
    number_of_restaurants: '',
  });

  const toMeters = (miles: number) => {
    const meters = miles * 1609.34;
    return Math.floor(meters);
  };

  const toMiles = (km: number) => {
    const miles = km / 1609.34;
    return Math.floor(miles);
  };

  const createParty = async () => {
    const validation = () => {
      let errorCount = 0;
      if (formData.name === '') {
        setErrors({ ...errors, name: 'Name is required.' });
        errorCount += 1;
      }
      if (formData.location === '') {
        setErrors({ ...errors, location: 'Location is required.' });
        errorCount += 1;
      }
      if (formData.maxVoters === '') {
        setErrors({ ...errors, maxVoters: 'Max Voters is required.' });
        errorCount += 1;
      }
      if (formData.password === '') {
        setErrors({ ...errors, password: 'Password is required.' });
        errorCount += 1;
      }
      if (errorCount > 0) {
        return false;
      } else {
        return true;
      }
    };
    const valid = validation();
    if (!valid) return;
    setLoading(true);
    try {
      const party = await API.fetchRestaurants(formData);
      if (party?.error?.message) {
        setGeneralError(party.error.message);
        setLoading(false);
        return;
      }
      setOpen(true);
      setParty(party);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
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
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CircularProgress color='success' />
            </Box>
          </Box>
        </Box>
      </>
    );
  }

  if (party) {
    return (
      <>
        <Navbar />
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
      <Navbar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: '70px',
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
          <Typography
            variant='h3'
            sx={{
              fontWeight: 'bold',
              marginBottom: '20px',
            }}
          >
            Create a Party
          </Typography>
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
                error={errors.name !== ''}
                fullWidth
                required
                value={formData.name}
                helperText={errors.name}
                onChange={(e) => {
                  setErrors({ ...errors, name: '' });
                  setFormData({ ...formData, name: e.target.value });
                }}
              />
              <TextField
                label='City Name or Zip Code'
                error={errors.location !== ''}
                helperText={errors.location}
                fullWidth
                required
                value={formData.location}
                onChange={(e) => {
                  setErrors({ ...errors, location: '' });
                  setFormData({ ...formData, location: e.target.value });
                }}
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
                  value={toMiles(formData.maxDistance)}
                  aria-label='slider'
                  valueLabelDisplay='auto'
                  min={1}
                  step={1}
                  max={24}
                  onChange={(_e, value) => {
                    const inKm = toMeters(value as number);
                    setFormData({ ...formData, maxDistance: inKm as number });
                  }}
                />
              </Box>
              <TextField
                label='Number of Voters'
                fullWidth
                autoComplete='off'
                error={errors.maxVoters !== ''}
                type='number'
                value={formData.maxVoters}
                onChange={(e) => {
                  setErrors({ ...errors, maxVoters: '' });
                  setFormData({ ...formData, maxVoters: e.target.value });
                }}
                helperText={
                  errors.maxVoters
                    ? errors.maxVoters
                    : 'Voting will end when this many people have voted.'
                }
              />
              <TextField
                label='How many restaurants to vote on?'
                fullWidth
                error={errors.number_of_restaurants !== ''}
                autoComplete='off'
                type='number'
                value={formData.number_of_restaurants}
                onChange={(e) => {
                  setErrors({ ...errors, number_of_restaurants: '' });
                  setFormData({
                    ...formData,
                    number_of_restaurants: e.target.value,
                  });
                }}
                helperText={
                  errors.number_of_restaurants
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
                  sx={{}}
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
                        value='female'
                        control={<Checkbox />}
                        label='7-8 AM'
                      />
                      <FormControlLabel
                        value='male'
                        control={<Checkbox />}
                        label='8-9 AM'
                      />
                      <FormControlLabel
                        value='other'
                        control={<Checkbox />}
                        label='9-10 AM'
                      />
                      <FormControlLabel
                        value='other'
                        control={<Checkbox />}
                        label='11-12 AM'
                      />
                      <FormControlLabel
                        value='other'
                        control={<Checkbox />}
                        label='1-2 PM'
                      />
                      <FormControlLabel
                        value='other'
                        control={<Checkbox />}
                        label='2-3 PM'
                      />
                      <FormControlLabel
                        value='other'
                        control={<Checkbox />}
                        label='3-4 PM'
                      />
                      <FormControlLabel
                        value='other'
                        control={<Checkbox />}
                        label='4-5 PM'
                      />
                      <FormControlLabel
                        value='other'
                        control={<Checkbox />}
                        label='5-6 PM'
                      />
                      <FormControlLabel
                        value='other'
                        control={<Checkbox />}
                        label='6-7 PM'
                      />
                      <FormControlLabel
                        value='other'
                        control={<Checkbox />}
                        label='7-8 PM'
                      />
                      <FormControlLabel
                        value='other'
                        control={<Checkbox />}
                        label='8-9 PM'
                      />
                      <FormControlLabel
                        value='other'
                        control={<Checkbox />}
                        label='9-10 PM'
                      />
                      <FormControlLabel
                        value='other'
                        control={<Checkbox />}
                        label='10-11 PM'
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
                  error={errors.password !== ''}
                  type='password'
                  value={formData.password}
                  fullWidth
                  onChange={(e) => {
                    setErrors({ ...errors, password: '' });
                    setFormData({ ...formData, password: e.target.value });
                  }}
                  helperText={
                    errors.password
                      ? errors.password
                      : 'You can use this later to manage the party.'
                  }
                />
              </Box>
              <Button
                onClick={createParty}
                variant='contained'
                fullWidth
                sx={{
                  height: '50px',
                  fontSize: '1rem',
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
    </>
  );
};

export default Create;
