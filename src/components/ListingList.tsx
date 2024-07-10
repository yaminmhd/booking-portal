import { Listing } from '@/api/data/listings';
import ListingCard from './ListingCard';

type ListingListProps = {
  listings: Listing[];
};

const ListingList = ({ listings }: ListingListProps) => {
  return (
    <div className='grid-col-1 grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
      {listings.length > 0 ? (
        listings.map((listing) => <ListingCard key={listing.id} {...listing} />)
      ) : (
        <p>No listings found.</p>
      )}
    </div>
  );
};

export default ListingList;
