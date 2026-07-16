'use client';

import styles from './QuantitySelector.module.scss';
import { useQuantitySelector } from './hooks/useQuantitySelector';

type QuantitySelectorProps = {
  min?: number;
  max?: number;
  defaultValue?: number;
  ariaLabel?: string;
  onChange?: (value: number) => void;
};

export function QuantitySelector({
  min = 1,
  max = 100,
  defaultValue = 1,
  ariaLabel = 'Selecionar quantidade',
  onChange,
}: QuantitySelectorProps) {
  const { quantity, validationMessage, handleInputChange, decrementQuantity, incrementQuantity } =
    useQuantitySelector({
      min,
      max,
      defaultValue,
      onChange,
    });

  return (
    <div className={styles.wrapper}>
      <div className={styles.group} aria-label={ariaLabel}>
        <button
          type="button"
          className={styles.buttonLeft}
          onClick={decrementQuantity}
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
          aria-invalid={Boolean(validationMessage)}
          aria-describedby={validationMessage ? 'quantity-selector-error' : undefined}
        />
        <button
          type="button"
          className={styles.buttonRight}
          onClick={incrementQuantity}
          aria-label="Aumentar quantidade"
        >
          +
        </button>
      </div>
      {validationMessage ? (
        <p id="quantity-selector-error" className={styles.errorMessage} aria-live="polite">
          {validationMessage}
        </p>
      ) : null}
    </div>
  );
}
