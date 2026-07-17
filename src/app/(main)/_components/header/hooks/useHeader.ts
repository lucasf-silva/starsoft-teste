import {
  openLoginDrawer,
  selectCartItemsCount,
  selectIsAuthenticated,
  toggleCart,
  useAppDispatch,
  useAppSelector,
} from '@/store';

type UseHeaderReturn = {
  itemsCount: number;
  isAuthenticated: boolean;
  handleToggleCart: () => void;
  handleOpenLoginDrawer: () => void;
};

export const useHeader = (): UseHeaderReturn => {
  const dispatch = useAppDispatch();
  const itemsCount = useAppSelector(selectCartItemsCount);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const handleToggleCart = () => {
    dispatch(toggleCart());
  };

  const handleOpenLoginDrawer = () => {
    dispatch(openLoginDrawer());
  };

  return {
    itemsCount,
    isAuthenticated,
    handleToggleCart,
    handleOpenLoginDrawer,
  };
};
