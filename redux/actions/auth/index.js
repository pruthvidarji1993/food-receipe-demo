import { api } from '../../../api/api';
import { toast, Slide } from 'react-toastify';
import { store } from '../../storeConfig/store';
import { setLogInFlag, setLogInData } from './authAction';

export const signUp = async (data) => {
  const result = await api('v1/registerUser', data, 'post');
  return result;
};

export const logIn = (data) => {
  return async (dispatch) => {
    const result = await api('v1/auth/user/login', data, 'post');
    return result;
  };
};

export const otpValidate = async (user) => {
  let email = user.email;
  let otp = user.otp;
  let formData = { email, otp };

  let result = await api(
    `v1/auth/checkOTP?is_email_verification=${
      user.is_email_verification ? true : ''
    }`,
    formData,
    'post'
  );
  return result;
};

export const resendOTP = async (user) => {
  let email = user.email;
  let formData = { email };
  let res = await api(
    `v1/auth/forgotPassword?isResendCodeForEmailVerify=${
      user.isResendCodeForEmailVerify ? true : ''
    }&isResendCode=${user.isResendCode ? true : ''}`,
    formData,
    'post'
  );
  if (res && res.status === 200) {
    toast.success('OTP code resent to email address successfully');
  } else {
    toast.error(`${res.data.error}`);
  }
};

export const forgetPassword = async (user) => {
  let email = user.email;
  let formData = { email };

  let res = await api('v1/auth/forgotPassword', formData, 'post');
  return res;
};

export const resetPass = async (user) => {
  let email = user.email;
  let password = user.password;
  let otp = user.otp;
  let formData = { email, password, otp };
  let res = await api('v1/auth/user/resetPassword', formData, 'post');
  return res;
};

export const profileEdit = async (user) => {
  let res;
  if (user.is_image_update === true) {
    res = await api(
      `v1/profileEdit?is_image_update=${user.is_image_update}`,
      user,
      'post'
    );
  } else {
    res = await api('v1/profileEdit', user, 'post');
  }
  return res;
};

export const profileData = async () => {
  let res;
  res = await api('v1/user/profile', {}, 'get');
  return res;
};

export const handleLogout = () => {
  return (dispatch) => {
    dispatch({ type: 'LOGOUT' });
    dispatch(setLogInFlag(false));

    // ** Remove user from localStorage
    localStorage.removeItem('food_recipe_user');
    toast.success('Logged out successfully');
  };
};
