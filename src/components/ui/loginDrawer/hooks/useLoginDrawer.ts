'use client';

import { type ChangeEvent, type FormEvent, useState } from 'react';
import {
  closeLoginDrawer,
  login,
  logout,
  selectAuthUser,
  selectIsAuthenticated,
  selectIsLoginDrawerOpen,
  useAppDispatch,
  useAppSelector,
} from '@/store';
import { loginSchema } from '@/types';

type LoginFieldErrors = {
  email?: string;
  password?: string;
};

const initialFormValues = {
  email: '',
  password: '',
};

export function useLoginDrawer() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsLoginDrawerOpen);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectAuthUser);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [fieldErrors, setFieldErrors] = useState<LoginFieldErrors>({});

  function resetForm() {
    setFormValues(initialFormValues);
    setFieldErrors({});
  }

  function handleCloseDrawer() {
    dispatch(closeLoginDrawer());
    resetForm();
  }

  function handleChange(field: keyof typeof initialFormValues) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      const nextValue = event.target.value;

      setFormValues((currentValues) => ({
        ...currentValues,
        [field]: nextValue,
      }));

      setFieldErrors((currentErrors) => ({
        ...currentErrors,
        [field]: undefined,
      }));
    };
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsed = loginSchema.safeParse(formValues);

    if (!parsed.success) {
      const flattenedErrors = parsed.error.flatten().fieldErrors;

      setFieldErrors({
        email: flattenedErrors.email?.[0],
        password: flattenedErrors.password?.[0],
      });

      return;
    }

    dispatch(
      login({
        email: parsed.data.email,
      }),
    );
    resetForm();
  }

  function handleLogout() {
    dispatch(logout());
    resetForm();
  }

  return {
    isOpen,
    isAuthenticated,
    user,
    formValues,
    fieldErrors,
    handleCloseDrawer,
    handleSubmit,
    handleEmailChange: handleChange('email'),
    handlePasswordChange: handleChange('password'),
    handleLogout,
  };
}
