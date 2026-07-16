'use client';

import type { ImageProps } from 'next/image';
import { useEffect, useMemo, useState } from 'react';

const loadedImagesCache = new Set<string>();

function getCacheKey(src: ImageProps['src']) {
  if (typeof src === 'string') {
    return src;
  }

  return src.src;
}

type UseProgressiveImageParams = {
  src: ImageProps['src'];
};

export function useProgressiveImage({ src }: UseProgressiveImageParams) {
  const cacheKey = useMemo(() => getCacheKey(src), [src]);
  const [isLoaded, setIsLoaded] = useState(() => loadedImagesCache.has(cacheKey));

  useEffect(() => {
    setIsLoaded(loadedImagesCache.has(cacheKey));
  }, [cacheKey]);

  const markAsLoaded = () => {
    loadedImagesCache.add(cacheKey);
    setIsLoaded(true);
  };

  return {
    isLoaded,
    markAsLoaded,
  };
}
