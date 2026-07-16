'use client';

import Image, { type ImageProps } from 'next/image';
import styles from './ProgressiveImage.module.scss';
import { useProgressiveImage } from './hooks/useProgressiveImage';

type ProgressiveImageProps = ImageProps & {
  wrapperClassName?: string;
};

function getClassName(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(' ');
}

export function ProgressiveImage({
  src,
  alt,
  className,
  wrapperClassName,
  onLoad,
  ...props
}: ProgressiveImageProps) {
  const { isLoaded, markAsLoaded } = useProgressiveImage({ src });

  return (
    <div
      className={getClassName(styles.container, wrapperClassName)}
      data-loaded={isLoaded}
      aria-busy={!isLoaded}
    >
      {!isLoaded ? (
        <span
          aria-hidden="true"
          className={getClassName(styles.skeleton, !isLoaded ? undefined : styles.skeletonHidden)}
        />
      ) : null}
      <Image
        {...props}
        src={src}
        alt={alt}
        className={getClassName(
          styles.image,
          isLoaded ? styles.imageLoaded : styles.imageHidden,
          className,
        )}
        onLoad={(event) => {
          markAsLoaded();
          onLoad?.(event);
        }}
      />
    </div>
  );
}
