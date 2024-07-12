import { Separator } from '@radix-ui/react-dropdown-menu';
import { DollarSign, Pin, Users } from 'lucide-react';
import { Card } from './ui';
import { ListingsWithLocation } from '@/pages/HomePage';
import ListingDetailsCardImages from './ListingDetailsCardImages';

type ListingDetailsCardProps = ListingsWithLocation;

const ListingDetailsCard = ({
  name,
  price,
  maxGuests,
  images,
  location: { name: locationName },
  description,
}: ListingDetailsCardProps) => {
  return (
    <Card className='mx-auto p-4'>
      <ListingDetailsCardImages images={images} name={name} />
      <Separator className='mb-4' />
      <div className='flex flex-col gap-2'>
        <h1 className='mb-2 text-2xl font-bold'>{name}</h1>
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
      </div>
      <Separator className='my-4' />
      <div className='whitespace-pre-line'>{description}</div>
    </Card>
  );
};

export default ListingDetailsCard;
