import {
  isListingAvailable,
  Listing,
  listings as staticListings,
} from '@/api/data/listings';
import ListingFilters from '@/components/ListingFilters';
import ListingList from '@/components/ListingList';
import { Separator } from '@/components/ui';
import { useState } from 'react';

type Filters = {
  dates?: { from: Date; to: Date };
  guests?: number;
  search?: string;
};

const HomePage = () => {
  const [listings, setListings] = useState<Listing[]>(staticListings);

  const handleFilters = ({ dates, guests, search }: Filters) => {
    // Resets filters by using static listings
    let filteredListings = staticListings;

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

    setListings(filteredListings);
  };
  return (
    <div className='container py-4'>
      <div>
        <ListingFilters onChange={handleFilters} />
        <Separator className='my-4' />
      </div>
      <ListingList listings={listings} />
    </div>
  );
};

export default HomePage;
