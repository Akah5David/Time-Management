import { useState } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { cn } from '../../utils/cn';

interface DatePickerProps {
  value?: string;
  onChange: (value: string | undefined) => void;
  label?: string;
  placeholder?: string;
  className?: string;
}

export function DatePicker({ value, onChange, label, placeholder = 'Pick a date', className }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const displayValue = value ? format(parseISO(value), 'PPP') : '';

  return (
    <div className={cn('relative', className)}>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-foreground">{label}</label>
      )}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          !value && 'text-muted-foreground'
        )}
      >
        <span className="flex items-center gap-2">
          <CalendarIcon className="h-4 w-4" />
          {displayValue || placeholder}
        </span>
      </button>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute z-50 mt-2 w-full rounded-md border bg-popover p-4 shadow-md">
            <input
              type="date"
              value={value || ''}
              onChange={(e) => {
                onChange(e.target.value || undefined);
                setIsOpen(false);
              }}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
        </>
      )}
    </div>
  );
}
