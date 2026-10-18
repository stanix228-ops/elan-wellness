import * as React from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WellnessImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  containerClassName?: string;
  fallbackLabel?: string;
}

export const WellnessImage: React.FC<WellnessImageProps> = ({
  src,
  alt,
  className,
  containerClassName,
  fallbackLabel,
  loading = 'lazy',
  ...props
}) => {
  const [hasError, setHasError] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-[#EAE4D7]',
        containerClassName
      )}
    >
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          loading={loading}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={cn(
            'h-full w-full object-cover transition-opacity duration-500',
            isLoaded ? 'opacity-100' : 'opacity-90',
            className
          )}
          {...props}
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#EFECE4] via-[#E5E0D5] to-[#D8D0C0] p-6 text-center text-[#5E5E53]"
        >
          <Sparkles className="mb-2 h-6 w-6 text-[#667052]" aria-hidden="true" />
          <span className="font-serif text-lg text-[#292A23]">
            {fallbackLabel || 'ÉLAN Wellness · Интерьер студии'}
          </span>
          <span className="mt-1 max-w-xs text-xs text-[#77776B]">{alt}</span>
        </div>
      )}
    </div>
  );
};
