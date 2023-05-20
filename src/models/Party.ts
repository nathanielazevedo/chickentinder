import { Restaurant } from './Restaurant';

export type Party = {
  _id: string;
  name: string;
  location: string;
  max_distance: number;
  number_of_restaurants: number;
  max_voters: number;
  times_to_vote_on: {
    id: string;
  }[];
  vote_on_time: boolean;
  password: string;
  restaurants: Restaurant[];
  r_votes: {
    [id: string]: string;
  } | null;
  t_votes: {
    [id: string]: string;
  } | null;
  r_winner: Restaurant | null;
  t_winner: string | null;
  createdAt: string;
  updatedAt: string;
  voters: number;
  _v: number;
};

export type CreateParty = {
  name: string;
  location: string;
  max_distance: number;
  number_of_restaurants: number;
  max_voters: number;
  times_to_vote_on: {
    id: string;
  }[];
  vote_on_time: boolean;
  password: string;
  restaurants: Restaurant[];
};
