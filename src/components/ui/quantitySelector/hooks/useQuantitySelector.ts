'use client';

import { type ChangeEvent, useEffect, useState } from 'react';

type UseQuantitySelectorParams = {
  min: number;
  max: number;
  defaultValue: number;
  onChange?: (value: number) => void;
};

function clampValue(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function getValidationMessage(value: number, min: number, max: number): string | null {
  if (value < min) {
    return `Quantidade minima: ${min}.`;
  }

  if (value > max) {
    return `Quantidade maxima: ${max}.`;
  }

  return null;
}

export function useQuantitySelector({
  min,
  max,
  defaultValue,
  onChange,
}: UseQuantitySelectorParams) {
  const [quantity, setQuantity] = useState(() => clampValue(defaultValue, min, max));
  const [validationMessage, setValidationMessage] = useState<string | null>(null);

  useEffect(() => {
    setQuantity(clampValue(defaultValue, min, max));
    setValidationMessage(null);
  }, [defaultValue, max, min]);

  function updateQuantity(nextValue: number) {
    const clampedValue = clampValue(nextValue, min, max);
    const nextValidationMessage = getValidationMessage(nextValue, min, max);

    setQuantity(clampedValue);
    setValidationMessage(nextValidationMessage);
    onChange?.(clampedValue);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const nextValue = Number(event.target.value);

    if (Number.isNaN(nextValue)) {
      return;
    }

    updateQuantity(nextValue);
  }

  return {
    quantity,
    validationMessage,
    handleInputChange,
    decrementQuantity: () => updateQuantity(quantity - 1),
    incrementQuantity: () => updateQuantity(quantity + 1),
  };
}
