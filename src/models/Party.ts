import { Restaurant } from './Restaurant';

export type Party = {
  _id: string;
  name: string;
  votes: {
    [id: string]: string;
  };
  createdAt: string;
  updatedAt: string;
  password: string;
  winner: Restaurant | null;
  maxVoters: number;
  voters: number;
  restaurants: Restaurant[];
  voteTime: boolean;
  hours: {
    [time: string]: number;
  };
  location: string;
  max_distance: number;
  number_of_restaurants: number;
  _v: number;
};

export type CreateParty = {
  name: string;
  password: string;
  maxVoters: number;
  restaurants: Restaurant[];
  voteTime: boolean;
  hours: {
    [time: string]: number;
  };
  location: string;
  max_distance: number;
  number_of_restaurants: number;
};
