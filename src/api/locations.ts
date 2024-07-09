import { Location } from './data/locations';
import { getStorageValue } from './helpers';

export const getLocationById = (id: number) => {
  const locations: Location[] = getStorageValue('locations');
  if (!locations) {
    console.log('No locations table found');
    return;
  }

  return locations.find((location) => location.id === id);
};
