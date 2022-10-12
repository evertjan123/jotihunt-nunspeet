export type Clubhouse = {
  name: string;
  accomodation: string;
  street: string;
  housenumber: number;
  housenumber_addition: string | undefined;
  postcode: string;
  city: string;
  lat: number;
  long: number;
  photo_assignment_points: number | undefined;
};

export type Article = {
  title: string;
  type: string;
  published_at: string;
  message: string;
};

export type UserLocation = {
  lat: number;
  long: number;
  accuracy: number;
};

export type Area = {
  id: number;
  name: string;
  status: string;
  updated_at: string;
};

export type Sighting = {
  id: number;
  description: string;
  lat: number;
  long: number;
  optional_name: string | undefined;
  hunter_id: number | undefined;
  area_id: number;
  area: Area;
  created_at: string;
};
