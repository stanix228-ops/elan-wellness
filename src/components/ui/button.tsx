import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-200 ease-calm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#667052] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F4ED] disabled:pointer-events-none disabled:opacity-45 select-none',
  {
    variants: {
      variant: {
        default:
          'bg-[#667052] text-[#FFFCF6] hover:bg-[#4F5B3E] active:bg-[#434D34] shadow-sm',
        outline:
          'border border-[#292A23]/25 bg-transparent text-[#292A23] hover:border-[#667052] hover:bg-[#667052]/8',
        secondary:
          'bg-[#EFECE4] text-[#292A23] border border-[#E5E0D5] hover:bg-[#E5E0D5]',
        ghost:
          'text-[#292A23] hover:bg-[#292A23]/5',
        link:
          'text-[#292A23] underline-offset-8 hover:underline hover:text-[#667052] p-0 h-auto',
      },
      size: {
        default: 'h-12 px-6 py-3 rounded-full',
        sm: 'h-10 px-4 py-2 text-xs tracking-wide rounded-full',
        lg: 'h-14 px-8 py-4 text-base rounded-full',
        icon: 'h-11 w-11 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
