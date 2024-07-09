import { isListingAvailable, Listing } from './data/listings';
import { getStorageValue } from './helpers';

export type SearchListingsParams = {
  dates?: { from: Date; to: Date };
  guests?: number;
  search?: string;
};

export const getListings = ({
  dates,
  guests,
  search,
}: SearchListingsParams) => {
  const listings: Listing[] = getStorageValue('listings');
  if (!listings) {
    console.log('No listings table found');
    return;
  }

  // Sets a new variable for the filtered listings
  let filteredListings = listings;

  // Handles date range
  if (dates) {
    filteredListings = filteredListings.filter((listing) =>
      isListingAvailable(listing, dates),
    );
  }

  // Handles guests
  if (guests) {
    filteredListings = filteredListings.filter(
      (listing) => guests <= listing.maxGuests,
    );
  }

  // Handles search
  if (search) {
    filteredListings = filteredListings.filter((listing) =>
      listing.name.toLowerCase().includes(search.toLowerCase()),
    );
  }

  return filteredListings;
};

export const getListingById = (id: number) => {
  const listings: Listing[] = getStorageValue('listings');
  if (!listings) {
    console.log('No listings table found');
    return;
  }

  return listings.find((listing) => listing.id === id);
};
