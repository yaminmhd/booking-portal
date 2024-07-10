import { Listing } from '@/api/data/listings';
import { Card, CardContent } from './ui';
import { getImageUrl } from '@/lib/images';

const ListingCard = ({ name, images }: Listing) => {
  return (
    <Card>
      <img
        src={getImageUrl(images[0])}
        alt={name}
        className='h-[200px] w-full rounded-md object-cover'
      />
      <CardContent className='p-4'>
        <h2 className='mb-0 text-xl font-semibold'>{name}</h2>
      </CardContent>
    </Card>
  );
};

export default ListingCard;
