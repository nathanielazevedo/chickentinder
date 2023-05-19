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
  hoursType,
  valueType,
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

  if (loading) return <CreateLoad />;
  if (party) return <NewPartyScreen party={party} />;

  if (restaurants) {
    return (
      <RestaurantsPreview
        restaurants={restaurants}
        moveAhead={moveAhead}
        setRestaurants={setRestaurants}
      />
    );
  }

  return (
    <CreateForm
      values={values}
      createParty={createParty}
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
