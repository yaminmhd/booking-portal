import { Search, Filter } from 'lucide-react';
import { addDays, startOfDay } from 'date-fns';
import {
  Button,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetTrigger,
  Stepper,
  Sheet,
  DateRangePicker,
  Input,
} from './ui';
import { useState } from 'react';

export type DateRange = {
  to: Date;
  from: Date;
};

type ListingFilterProps = {
  onChange: (filters: {
    dates: DateRange;
    guests?: number;
    search?: string;
  }) => void;
};

const ListingFilters = ({ onChange }: ListingFilterProps) => {
  const [dates, setDates] = useState<DateRange>({
    from: startOfDay(new Date()),
    to: addDays(startOfDay(new Date()), 7),
  });
  const [guests, setGuests] = useState<number>(0);
  const [search, setSearch] = useState<string>('');

  const handleSubmit = () => {
    onChange({ dates, guests, search });
  };

  const renderFilterSheet = () => {
    return (
      <div className='md:hidden'>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant='outline'>
              <Filter />
            </Button>
          </SheetTrigger>
          <SheetContent className='md:hidden'>
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription className='flex flex-col gap-2'>
                <Input
                  placeholder='Search...'
                  className='min-w-[190px]'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <DateRangePicker
                  value={dates}
                  onChange={setDates}
                  minDate={new Date()}
                />
                <Stepper label='guest' value={guests} onChange={setGuests} />
                <SheetClose>
                  <Button onClick={handleSubmit}>
                    <Search className='h-4 w-4' />
                  </Button>
                </SheetClose>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    );
  };

  return (
    <>
      {renderFilterSheet()}
      <div className='hidden md:flex md:flex-row md:items-center md:justify-center md:gap-2'>
        <Input
          placeholder='Search...'
          className='w-[400px]'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <DateRangePicker
          value={dates}
          onChange={setDates}
          minDate={new Date()}
        />
        <Stepper label='guest' value={guests} onChange={setGuests} />
        <Button onClick={handleSubmit}>
          <Search className='h-4 w-4' />
        </Button>
      </div>
    </>
  );
};

export default ListingFilters;
