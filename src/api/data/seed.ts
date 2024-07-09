import { getItem, setItem } from '@/lib/localStorage';

import { listings } from './listings';
import { locations } from './locations';
import { users } from './users';

// Add all data to localstorage to simulate database
export const seedLocalDatabase = () => {
  const database = getItem(import.meta.env.VITE_STORAGE_KEY);

  // If a database already exists, do nothing
  if (database) {
    return;
  }

  // Creates the initial database with all data
  const initialDatabase = {
    listings,
    locations,
    users,
  };

  setItem(import.meta.env.VITE_STORAGE_KEY, initialDatabase);
};
