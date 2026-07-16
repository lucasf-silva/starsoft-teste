import { selectCartItemsCount, toggleCart, useAppDispatch, useAppSelector } from '@/store';

type UseHeaderReturn = {
  itemsCount: number;
  handleToggleCart: () => void;
};

export const useHeader = (): UseHeaderReturn => {
  const dispatch = useAppDispatch();
  const itemsCount = useAppSelector(selectCartItemsCount);

  const handleToggleCart = () => {
    dispatch(toggleCart());
  };

  return {
    itemsCount,
    handleToggleCart,
  };
};
