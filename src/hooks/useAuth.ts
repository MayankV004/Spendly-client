import { useAppSelector, useAppDispatch } from './redux';
import { useCallback } from 'react';
import {
  loginUser,
  signUpUser,
  logoutUser,
  refreshToken,
  forgotPassword,
  resetPassword,
  changePassword,
  verifyEmail,
  resendVerificationEmail,
  clearError,
  clearCredentials,
  type LoginFormData,
  type SignUpFormData,
  type ForgotPasswordFormData,
  type ResetPasswordFormData,
  type ChangePasswordFormData,
} from '../store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  const login = useCallback(
    async (formData: LoginFormData) => {
      return dispatch(loginUser(formData));
    },
    [dispatch]
  );

  const signUp = useCallback(
    async (formData: SignUpFormData) => {
      return dispatch(signUpUser(formData));
    },
    [dispatch]
  );

  const logout = useCallback(async () => {
    return dispatch(logoutUser());
  }, [dispatch]);

  const refresh = useCallback(async () => {
    return dispatch(refreshToken());
  }, [dispatch]);

  const forgotPass = useCallback(
    async (formData: ForgotPasswordFormData) => {
      return dispatch(forgotPassword(formData));
    },
    [dispatch]
  );

  const resetPass = useCallback(
    async (formData: ResetPasswordFormData) => {
      return dispatch(resetPassword(formData));
    },
    [dispatch]
  );

  const changePass = useCallback(
    async (formData: ChangePasswordFormData) => {
      return dispatch(changePassword(formData));
    },
    [dispatch]
  );

  const verifyUserEmail = useCallback(
    async (token: string) => {
      return dispatch(verifyEmail(token));
    },
    [dispatch]
  );

  const resendVerification = useCallback(
    async (email: string) => {
      return dispatch(resendVerificationEmail(email));
    },
    [dispatch]
  );

  const clearAuthError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  const clearAuth = useCallback(() => {
    dispatch(clearCredentials());
  }, [dispatch]);

  return {
    ...auth,
    login,
    signUp,
    logout,
    refresh,
    forgotPass,
    resetPass,
    changePass,
    verifyUserEmail,
    resendVerification,
    clearAuthError,
    clearAuth,
  };
};