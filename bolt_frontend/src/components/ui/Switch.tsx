import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, checked, onChange, ...props }, ref) => {
    return (
      <label className={cn('flex cursor-pointer items-center gap-3', className)}>
        <div className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center">
          <input
            type="checkbox"
            ref={ref}
            checked={checked}
            onChange={onChange}
            className="peer sr-only"
            {...props}
          />
          <span
            className={cn(
              'h-6 w-11 rounded-full bg-muted transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2',
              checked && 'bg-primary'
            )}
          />
          <span
            className={cn(
              'absolute left-0.5 h-5 w-5 rounded-full bg-background shadow transition-transform',
              checked && 'translate-x-5'
            )}
          />
        </div>
        {label && <span className="text-sm text-foreground">{label}</span>}
      </label>
    );
  }
);

Switch.displayName = 'Switch';

export { Switch };
