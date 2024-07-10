import { DollarSign, Pin, Users } from 'lucide-react';
import { Card, CardContent } from './ui';

import { ListingsWithLocation } from '@/pages/HomePage';
import ListingCardImages from './ListingCardImages';

type ListingCardProps = ListingsWithLocation;

const ListingCard = ({
  name,
  images,
  price,
  maxGuests,
  location: { name: locationName },
}: ListingCardProps) => {
  return (
    <Card>
      <ListingCardImages name={name} images={images} />
      <CardContent className='flex flex-col gap-2 p-4'>
        <h2 className='mb-2 text-xl font-semibold'>{name}</h2>
        <div className='flex items-center gap-2'>
          <DollarSign className='h-4 w-4 text-primary' />
          <span className='text-muted-foreground'>
            <span className='font-bold text-foreground'>{price}</span> / night
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <Pin className='h-4 w-4 text-primary' />
          <span className='text-muted-foreground'>{locationName}</span>
        </div>
        <div className='flex items-center gap-2'>
          <Users className='h-4 w-4 text-primary' />
          <span className='text-muted-foreground'>{maxGuests} Guests</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ListingCard;
