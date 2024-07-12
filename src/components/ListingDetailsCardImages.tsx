import { useState } from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui';
import { getImageUrl } from '@/lib/images';

type ListingDetailsCardImagesProps = {
  images: string[];
  name: string;
};

const ListingDetailsCardImages = ({
  images,
  name,
}: ListingDetailsCardImagesProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <>
      <img
        className='mb-4 h-[500px] w-full rounded-md object-cover'
        src={getImageUrl(images[currentImageIndex])}
        alt={name}
      />
      <Carousel className='mx-auto mb-4 w-[90%]'>
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem
              key={image}
              className='basis-1/3 cursor-pointer'
              onClick={() => setCurrentImageIndex(index)}
              isActive={index === currentImageIndex}
            >
              <img
                className='h-52 w-full object-cover shadow-sm'
                src={getImageUrl(image)}
                alt={name}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
};

export default ListingDetailsCardImages;
