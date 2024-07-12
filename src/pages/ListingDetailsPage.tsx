import api from '@/api';
import { Listing } from '@/api/data/listings';
import { Location } from '@/api/data/locations';
import ListingDetailsCard from '@/components/ListingDetailsCard';
import { Skeleton } from '@/components/ui';
import axios from 'axios';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

export type ListingsWithLocation = Listing & {
  location: Location;
};

const ListingDetailsPage = () => {
  const { listingId } = useParams<{ listingId: string }>();
  const [listing, setListing] = useState<ListingsWithLocation>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const abortController = useRef<AbortController | null>(null);

  useEffect(() => {
    const fetchListings = async () => {
      setIsLoading(true);
      setError(null);

      abortController.current = new AbortController();

      try {
        const response = await api.get(`/api/listings/${listingId}`, {
          signal: abortController.current?.signal,
        });
        setListing(response.data);
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
  }, [listingId]);

  const renderListing = () => {
    if (isLoading) {
      return (
        <div className='space-y-2'>
          <Skeleton className='h-[200px] w-full rounded-md bg-slate-400 object-cover' />
          <div className='space-y-2'>
            <Skeleton className='h-4 w-[250px] bg-slate-300' />
            <Skeleton className='h-4 w-[200px] bg-slate-300' />
          </div>
        </div>
      );
    }

    if (error) {
      return <div className='text-center'>{error}</div>;
    }

    return listing && <ListingDetailsCard {...listing} />;
  };
  return <div className='container py-4'>{renderListing()}</div>;
};

export default ListingDetailsPage;
