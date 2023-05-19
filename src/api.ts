import { CreateParty } from './models/Party';

const localUrl = 'http://localhost:6001/';
const prodUrl = 'https://shy-red-boa-suit.cyclic.app/';

export const baseUrl =
  process.env.NODE_ENV === 'production' ? prodUrl : localUrl;

const getParty = async (id: string): Promise<any> => {
  return fetch(baseUrl + 'party/' + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(async (res) => {
      if (res.status !== 200) throw new Error('Error getting party');
      return res.json().then((data) => {
        return data;
      });
    })
    .catch((err) => {
      throw new Error(err);
    });
};

const createParty = async (formData: CreateParty): Promise<any> => {
  return fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(formData),
  })
    .then(async (res) => {
      if (res.status === 200) {
        return res.json().then((data) => {
          return data;
        });
      } else {
        return res.json().then((data) => {
          return { error: data };
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const fetchRestaurants = async (formData: any): Promise<any> => {
  return fetch(baseUrl + 'restaurants', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      location: formData.location,
      max_distance: formData.max_distance,
      number_of_restaurants: formData.number_of_restaurants,
    }),
  })
    .then(async (res) => {
      if (res.status === 200) {
        return res.json().then((data) => {
          return data;
        });
      } else {
        return res.json().then((data) => {
          return { error: data };
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const vote = async (
  id: string,
  rLikes: string[],
  tLikes: { [key: string]: number } | null
): Promise<any> => {
  return fetch(baseUrl + 'party/' + id + '/vote', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ rLikes, tLikes }),
  })
    .then((res) => {
      if (res.status !== 200) throw new Error('Error voting');
      return res.json().then((data) => {
        return data;
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const validatePassword = async (id: string, password: string): Promise<any> => {
  return fetch(baseUrl + 'party/' + id + '/password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password: password }),
  }).then((res) => {
    if (res.status === 200) {
      return true;
    } else {
      return false;
    }
  });
};

const endParty = async (id: string): Promise<any> => {
  return fetch(baseUrl + 'party/' + id + '/end', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    if (res.status === 200) {
      return res.json().then((data) => {
        return data.winner;
      });
    } else {
      return false;
    }
  });
};

export default {
  getParty,
  vote,
  validatePassword,
  createParty,
  endParty,
  fetchRestaurants,
};
