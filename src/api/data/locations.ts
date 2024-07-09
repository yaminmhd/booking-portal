export type Location = {
  id: number;
  country: string;
  name: string;
  createdAt: Date;
  modifiedAt: Date;
};

type LocationInput = Omit<Location, 'createdAt' | 'modifiedAt'>;

export const createLocation = ({ id, name, country }: LocationInput) => {
  return {
    id,
    country,
    name,
    createdAt: new Date(),
    modifiedAt: new Date(),
  };
};

export const locations: Location[] = [
  createLocation({
    id: 1,
    name: 'London',
    country: 'United Kingdom',
  }),
  createLocation({
    id: 2,
    name: 'Paris',
    country: 'France',
  }),
];
