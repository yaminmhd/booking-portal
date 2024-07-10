import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import {
  Button,
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui';
import { cn } from '@/lib/utils';
import { DateRange } from '../ListingFilters';

type DateRangePickerProps = {
  className?: string;
  minDate: Date;
  maxDate?: Date;
  onChange: (dates: { from: Date; to: Date }) => void;
  placeholder?: string;
  value: DateRange | undefined;
};

export const DateRangePicker = ({
  className,
  minDate,
  maxDate,
  onChange,
  placeholder,
  value,
}: DateRangePickerProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDatesChange = (dates: any) => {
    onChange(dates);
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant='outline'
            className={cn(
              'w-[250px] justify-start text-left font-normal',
              !value && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            <span className='truncate'>
              {value?.from ? (
                value.to ? (
                  <>
                    {format(value.from, 'LLL dd, y')} -{' '}
                    {format(value.to, 'LLL dd, y')}
                  </>
                ) : (
                  format(value.from, 'LLL dd, y')
                )
              ) : (
                placeholder
              )}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto border-none p-0' align='start'>
          <Calendar
            initialFocus
            mode='range'
            defaultMonth={value?.from}
            selected={value}
            onSelect={handleDatesChange}
            numberOfMonths={2}
            fromDate={minDate}
            toDate={maxDate}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
