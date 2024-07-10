import api from '@/api';
import { Listing } from '@/api/data/listings';
import { Location } from '@/api/data/locations';
import ListingFilters from '@/components/ListingFilters';
import ListingList from '@/components/ListingList';
import { Separator, Skeleton } from '@/components/ui';
import axios from 'axios';

import { useEffect, useRef, useState } from 'react';

type Filters = {
  dates?: { from: Date; to: Date };
  guests?: number;
  search?: string;
};

export type ListingsWithLocation = Listing & {
  location: Location;
};

const HomePage = () => {
  const [listings, setListings] = useState<ListingsWithLocation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({
    dates: undefined,
    guests: 0,
    search: '',
  });

  const abortController = useRef<AbortController | null>(null);

  useEffect(() => {
    const fetchListings = async () => {
      setIsLoading(true);
      setError(null);

      abortController.current = new AbortController();

      try {
        const response = await api.get('/api/listings', {
          params: filters,
          signal: abortController.current?.signal,
        });
        setListings(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        }
        setError(
          'An error occurred while fetching the listings. Please try again later.',
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();

    return () => {
      abortController.current?.abort();
    };
  }, [filters]);

  const handleFilters = (filters: Filters) => {
    setFilters(filters);
  };

  const renderListingList = () => {
    if (isLoading) {
      return (
        <div className='grid-col-1 grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {Array.from({ length: 9 }, (_, index) => index + 1).map((_, i) => (
            <div key={i} className='space-y-2'>
              <Skeleton className='h-[200px] w-full rounded-md bg-slate-400 object-cover' />
              <div className='space-y-2'>
                <Skeleton className='h-4 w-[250px] bg-slate-300' />
                <Skeleton className='h-4 w-[200px] bg-slate-300' />
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (error) {
      return <div className='text-center'>{error}</div>;
    }

    return <ListingList listings={listings} />;
  };
  return (
    <div className='container py-4'>
      <div>
        <ListingFilters onChange={handleFilters} />
        <Separator className='my-4' />
      </div>
      {renderListingList()}
    </div>
  );
};

export default HomePage;
