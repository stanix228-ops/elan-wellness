import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-12 w-full rounded-xl border border-[#E5E0D5] bg-[#F7F4ED]/70 px-4 py-3 text-base text-[#292A23] placeholder:text-[#77776B]/80 transition-colors focus-visible:border-[#667052] focus-visible:bg-[#FFFCF6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#667052]/25 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-[#B44C3E] aria-[invalid=true]:focus-visible:ring-[#B44C3E]/25',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
