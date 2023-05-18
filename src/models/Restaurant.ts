export type Restaurant = {
  id: string;
  alias: string;
  name: string;
  image_url: string;
  is_closed: boolean;
  url: string;
  review_count: number;
  categories: {
    alias: string;
    title: string;
  }[];
  rating: number;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  transactions: string[];
  price: string;
  location: {
    address1: string;
    address2: string;
    address3: string;
    city: string;
  };
  phone: string;
  display_phone: string;
  distance: number;
  checked: boolean;
  description: string;
  votes: number;
};
