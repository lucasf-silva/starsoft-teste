'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import styles from './QuantitySelector.module.scss';

type QuantitySelectorProps = {
  min?: number;
  max?: number;
  defaultValue?: number;
  ariaLabel?: string;
  onChange?: (value: number) => void;
};

function clampValue(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function QuantitySelector({
  min = 1,
  max = 100,
  defaultValue = 1,
  ariaLabel = 'Selecionar quantidade',
  onChange,
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(() => clampValue(defaultValue, min, max));

  useEffect(() => {
    setQuantity(clampValue(defaultValue, min, max));
  }, [defaultValue, max, min]);

  function updateQuantity(nextValue: number) {
    const clampedValue = clampValue(nextValue, min, max);

    setQuantity(clampedValue);
    onChange?.(clampedValue);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const nextValue = Number(event.target.value);

    if (Number.isNaN(nextValue)) {
      return;
    }

    updateQuantity(nextValue);
  }

  return (
    <div className={styles.group} aria-label={ariaLabel}>
      <button
        type="button"
        className={styles.buttonLeft}
        onClick={() => updateQuantity(quantity - 1)}
        aria-label="Diminuir quantidade"
      >
        -
      </button>
      <input
        className={styles.input}
        type="number"
        min={min}
        max={max}
        value={quantity}
        onChange={handleInputChange}
        aria-label="Quantidade selecionada"
      />
      <button
        type="button"
        className={styles.buttonRight}
        onClick={() => updateQuantity(quantity + 1)}
        aria-label="Aumentar quantidade"
      >
        +
      </button>
    </div>
  );
}
