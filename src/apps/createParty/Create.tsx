import API from '../../api';
import { useState } from 'react';
import CreateLoad from './CreateLoad';
import CreateForm from './CreateForm';
import { Party } from '../../models/Party';
import NewPartyScreen from './NewPartyScreen';
import RestaurantsPreview from './RestaurantsPreview';
import { Restaurant } from '../../models/Restaurant';
import {
  hoursInitial,
  valueInitial,
  valueType,
  getLikedHours,
  hashLikedHours,
  addChecks,
} from './CreateHelpers';

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

  const fetchRestaurants = async (values: valueType) => {
    // Check if voteTime is true and if there are at least 2 hours selected
    if (voteTime) {
      const likedHours = getLikedHours(hours);
      if (likedHours.length < 2) return setTimeError(true);
    }
    // Set values in case of return to create screen
    setValues(values);
    setLoading(true);
    try {
      const restaurants = await API.fetchRestaurants(values);
      if (restaurants?.error?.message) {
        // Case of fetch error
        setGeneralError(restaurants.error.message);
        setLoading(false);
        return;
      } else if (restaurants.length === 0) {
        // Case of no restaurants found
        setGeneralError('No restaurants found. Please try again.');
        setLoading(false);
        return;
      } else {
        // Case of everything good
        setRestaurants(addChecks(restaurants));
        setLoading(false);
      }
    } catch {
      // Error: user will remain on create screen
      setLoading(false);
    }
  };

  const createParty = async () => {
    if (!restaurants) return;
    const officialRestaurants = restaurants.filter(
      (r: Restaurant) => r.checked === true
    );

    const likedHoursArray = getLikedHours(hours);
    const hoursHash = hashLikedHours(likedHoursArray);

    const party = await API.createParty({
      ...values,
      restaurants: officialRestaurants,
      voteTime,
      hours: hoursHash,
    });
    setRestaurants(undefined);
    setParty(party);
  };

  if (loading) return <CreateLoad />;

  // New Party Confirmation Screen
  if (party) return <NewPartyScreen party={party} />;

  // Preview Restaurants Screen
  if (restaurants) {
    return (
      <RestaurantsPreview
        restaurants={restaurants}
        createParty={createParty}
        setRestaurants={setRestaurants}
      />
    );
  }

  // Create Form Screen
  return (
    <CreateForm
      values={values}
      fetchRestaurants={fetchRestaurants}
      voteTime={voteTime}
      setVoteTime={setVoteTime}
      hours={hours}
      setHours={setHours}
      timeError={timeError}
      generalError={generalError}
      setTimeError={setTimeError}
    />
  );
};

export default Create;
