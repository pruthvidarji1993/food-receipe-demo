import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Field, Form, isInteger } from 'formik';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import OTPInput from 'otp-input-react';
import { store } from '../redux/storeConfig/store';
import { setLogInData, setLogInFlag } from '../redux/actions/auth/authAction';
import validator from 'validator';

import * as Yup from 'yup';

import {
  Nav,
  NavItem,
  NavLink,
  Button,
  Modal,
  ModalBody,
  TabContent,
  TabPane,
  Form as Reactform,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Spinner,
} from 'reactstrap';
import classnames from 'classnames';
import Link from 'next/link';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import {
  signUp,
  logIn,
  otpValidate,
  resendOTP,
  forgetPassword,
  resetPass,
} from '../redux/actions/auth';

const Loginp = ({ modal, togglemodal, activeTab, toggletab, ...props }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isSubmit, setIsSubmit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [OTP, setOTP] = useState('');
  const [isSubmitLink, setIsSubmitLink] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const registerFormSchema = Yup.object().shape({
    name: Yup.string()
      .required('Please enter fullname')
      .min(3, 'Minimum 3 characters required')
      .max(40, 'Maximum 40 characters allowed'),
    userName: Yup.string()
      .required('Please enter username')
      .min(3, 'Minimum 3 characters required')
      .max(40, 'Maximum 40 characters allowed'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Please enter email address'),
    password: Yup.string()
      .required('Please enter password')
      .min(8, 'Minimum 8 characters required')
      .max(36, 'Maximum 36 characters are allowed')
      .matches(
        /(?=^.{8,}$)(?=.*\d)(?=.*[~()_+='":;?/|.><,`}{!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        'Password must contain at least one uppercase, one lowercase, one number and one special character'
      ),
    CPassword: Yup.string()
      .oneOf(
        [Yup.ref('password'), null],
        'Password and confirm password do not match'
      )
      .required('Please enter confirm password')
      .min(8, 'Minimum 8 characters required')
      .max(36, 'Maximum 36 characters are allowed'),
  });

  const logInFormSchema = Yup.object().shape({
    userName: Yup.string()
      .required('Please enter username')
      .min(3, 'Minimum 3 characters required')
      .max(40, 'Maximum 40 characters allowed'),

    password: Yup.string()
      .required('Please enter password')
      .min(8, 'Minimum 8 characters required')
      .max(36, 'Maximum 36 characters are allowed'),
  });

  function validateEmail(value) {
    let error;
    if (!value) {
      error = 'Please enter email address';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = 'Invalid email address';
    }
    return error;
  }

  function validateUserName(v) {
    let error;
    if (!v) {
      error = 'Please enter username';
    }
    if (v) {
      var i;
      for (i = 0; i < v.length; i++) {
        if (v[i] === ' ') {
          error = 'Space is not allowed';
        }
      }
    }

    return error;
  }

  function validatePassword(v) {
    let error;
    if (!v) {
      error = 'Please enter password';
    }
    if (v) {
      var i;
      for (i = 0; i < v.length; i++) {
        if (v[i] === ' ') {
          error = 'Space is not allowed';
        }
      }
    }

    return error;
  }

  function validateName(v) {
    let error;
    if (!v) {
      error = 'Please enter fullname';
    }
    if (v) {
      var i;
      for (i = 0; i < v.length; i++) {
        if (v[0] === ' ') {
          error = 'Invalid fullname';
        }
        if (v[v.length - 1] === ' ') {
          error = 'Invalid fullname';
        }
        if (isInteger(v[i])) {
          error = 'Numbers and special characters are not allowed';
        }
      }
    }
    if (v) {
      var iChars = '!`@#$%^&*()+=-[]\\;,./{}|":<>?~_';
      for (var i = 0; i < v.length; i++) {
        if (iChars.indexOf(v.charAt(i)) != -1) {
          error = 'Numbers and special characters are not allowed';
        }
      }
    }
    return error;
  }
  const recoverPasswordFormSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Please enter email address'),
  });

  const changeName = (e, setFieldValue) => {
    let name = e.target.value;
    if (name.length > 0) {
      name = name.charAt(0).toUpperCase() + name.slice(1);
    }
    setFieldValue('name', name);
  };

  const handleSubmitReg = async (value, { resetForm }) => {
    setIsSubmit(true);
    let user = {
      fullName: value.name,
      userName: value.userName,
      email: value.email.toLowerCase(),
      password: value.password,
    };
    let res = await signUp(user);
    if (res && res.status === 200) {
      toast.success('User registered successfully');
      setEmail(res.data.data.email);
      setIsSubmit(false);
      setShowPassword(false);
      setShowCPassword(false);
      toggletab('6');
      resetForm({ values: '' });
    } else {
      toast.error(`${res.data.error}`);
    }
    setIsSubmit(false);
  };

  const handleLogInSubmit = async (value, { resetForm }) => {
    setIsSubmit(true);
    let user = {
      userName: value.userName,
      password: value.password,
    };
    let res = await dispatch(logIn(user));
    if (res && res.status === 200) {
      localStorage.setItem('food_recipe_user', JSON.stringify(res.data.data));
      store.dispatch(setLogInData(res.data.data));
      store.dispatch(setLogInFlag({ data: true }));
      toast.success(`${res.data.message}`);
      resetForm({ values: '' });
      setShowPassword(false);
      togglemodal();
    } else if (res && res.status === 400 && res.data.isEmailverify === false) {
      setEmail(res.data.data.email);
      toast.error(`${res.data.error}`);
      resetForm({ values: '' });
      toggletab('6');
    } else {
      toast.error(`${res.data.error}`);
    }
    setIsSubmit(false);
  };

  const handleVerifyEmailSubmit = async (e) => {
    setIsSubmit(true);
    e.preventDefault();
    let data = {
      email: email.toLowerCase(),
      otp: OTP,
      is_email_verification: true,
    };
    let res = await otpValidate(data);
    if (res && res.status === 200) {
      setEmail('');
      toast.success('OTP verified successfully');
      // localStorage.setItem('food_recipe_admin_forget_otp', JSON.stringify(otp));
      localStorage.setItem('food_recipe_user', JSON.stringify(res.data.data));
      store.dispatch(setLogInData(res.data.data));
      store.dispatch(setLogInFlag({ data: true }));
      togglemodal();
    } else {
      toast.error(`${res.data.error}`);
      toggletab('6');
    }
    setOTP('');

    setIsSubmit(false);
  };

  const handleOtpCheckSubmit = async (e) => {
    setIsSubmit(true);
    e.preventDefault();
    let data = {
      email: email.toLowerCase(),
      otp: OTP,
    };
    let res = await otpValidate(data);
    if (res && res.status === 200) {
      setEmail(res.data.data.email);
      toast.success('OTP verified successfully');
      localStorage.setItem('food_recipe_user_forget_otp', JSON.stringify(OTP));
      toggletab('5');
    } else {
      toast.error(`${res.data.error}`);
      toggletab('4');
    }
    setOTP('');
    setIsSubmit(false);
  };

  const handleResendVerifyEmail = async () => {
    setIsSubmitLink(true);
    let user = {
      email: email,
      isResendCodeForEmailVerify: true,
    };
    await resendOTP(user);
    setIsSubmitLink(false);
  };

  const handleResendOtp = async () => {
    setIsSubmitLink(true);
    let user = {
      email: email,
      isResendCode: true,
    };
    await resendOTP(user);
    setIsSubmitLink(false);
  };

  const handleForgotPwdSubmit = async (
    value,
    errors,
    setFieldValue,
    setFieldTouched
  ) => {
    if (errors && errors.email) {
      setFieldTouched('email', true);
      return false;
    }
    if (value && value.email === '') {
      setFieldValue('email', '');
      setFieldTouched('email', true);
      return false;
    }

    setIsSubmit(true);

    let data = {
      email: value.email.toLowerCase(),
    };
    setEmail(data.email);
    let res = await forgetPassword(data);
    if (res && res.status === 200) {
      toggletab('4');
      setEmailError('');
      setFieldValue('email', '');
      setFieldTouched('email', false);
      toast.success('OTP code sent to entered email address successfully');
    } else {
      toggletab('3');
      toast.error(`${res.data.error}`);
    }
    setIsSubmit(false);
  };

  const handleSubmitResetPwd = async (value, { resetForm }) => {
    let otp = JSON.parse(localStorage.getItem('food_recipe_user_forget_otp'));
    setIsSubmit(true);
    let data = {
      email: email.toLowerCase(),
      otp,
      password: value.newpass,
    };
    let res = await resetPass(data);
    if (res && res.status === 200) {
      setEmail('');
      toast.success('Password reset successfully');
      localStorage.removeItem('food_recipe_user_forget_otp');
      resetForm({ values: '' });
      setShowPassword(false);
      setShowCPassword(false);
      toggletab('1');
    } else {
      toggletab('5');
      toast.error(`${res.data.error}`);
    }
    setIsSubmit(false);
  };

  const validateEmailResetPwd = (e) => {
    let email = e.target.value;

    if (!email) {
      setEmailError('Please enter email address');
    }
    if (email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setEmailError('Invalid email address');
    }
    setEmail(e.target.value);
  };

  useEffect(() => {
    props.callBack();
  }, [modal]);
  return (
    <>
      <Modal
        size='xl'
        isOpen={modal}
        toggle={togglemodal}
        className='modal-dialog-centered login-modal'
      >
        <Button color='null' className='close-modal' onClick={togglemodal}>
          <img
            src='/assets/images/close-modal.png'
            width='22'
            height='22'
            className='img-fluid'
          />
        </Button>
        <ModalBody>
          {activeTab == '3' ||
          activeTab == '4' ||
          activeTab == '5' ||
          activeTab == '6' ? null : (
            <Nav tabs className='border-0'>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '1' })}
                  onClick={() => {
                    toggletab('1');
                  }}
                >
                  Login
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '2' })}
                  onClick={() => {
                    toggletab('2');
                  }}
                >
                  register
                </NavLink>
              </NavItem>
            </Nav>
          )}
          <TabContent activeTab={activeTab}>
            <TabPane tabId='1'>
              <Formik
                initialValues={{
                  userName: '',
                  password: '',
                }}
                validationSchema={logInFormSchema}
                onSubmit={handleLogInSubmit}
              >
                {({ errors, touched, setFieldError }) => (
                  <Form>
                    <FormGroup>
                      <Label for='Username'>Username</Label>
                      <Field
                        as='input'
                        type='text'
                        name='userName'
                        id='userName'
                        placeholder='Enter Username'
                        className={`form-control ${
                          errors.userName && touched.userName && 'is-invalid'
                        }`}
                      />
                      {errors.userName && touched.userName ? (
                        <div className='text-danger'>{errors.userName}</div>
                      ) : null}
                    </FormGroup>
                    <FormGroup>
                      <Label for='Password'>Password</Label>
                      <InputGroup>
                        <Field
                          as='input'
                          type={showPassword ? 'text' : 'password'}
                          name='password'
                          id='password'
                          placeholder='Enter Password'
                          className={`form-control ${
                            errors.password && touched.password && 'is-invalid'
                          }`}
                        />
                        <InputGroupAddon addonType='append'>
                          <InputGroupText
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                      {errors.password && touched.password ? (
                        <div className='text-danger'>{errors.password}</div>
                      ) : null}
                    </FormGroup>
                    <FormGroup>
                      <Button
                        className={
                          isSubmit
                            ? 'btn btn-orange btn-block all-centers'
                            : 'btn btn-orange btn-block'
                        }
                        type='submit'
                        disabled={isSubmit ? true : false}
                      >
                        {isSubmit ? (
                          <Spinner className='inner-spinner' size='sm' />
                        ) : (
                          'Login Now'
                        )}
                      </Button>
                    </FormGroup>
                    <FormGroup className='mb-0'>
                      <Label className='mb-0'>
                        Forgot Password?{' '}
                        <span
                          className='links'
                          onClick={() => {
                            setFieldError('userName', '');
                            setFieldError('password', '');
                            toggletab('3');
                          }}
                        >
                          Click Here
                        </span>
                      </Label>
                    </FormGroup>
                  </Form>
                )}
              </Formik>
            </TabPane>
            <TabPane tabId='2'>
              <Formik
                initialValues={{
                  name: '',
                  userName: '',
                  email: '',
                  password: '',
                  CPassword: '',
                }}
                validationSchema={registerFormSchema}
                onSubmit={handleSubmitReg}
              >
                {({ errors, touched, setFieldValue, values }) => (
                  <Form>
                    <FormGroup>
                      <Label for='UseFullnamername'>Fullname</Label>
                      <Field
                        as='input'
                        type='text'
                        name='name'
                        id='name'
                        validate={validateName}
                        value={values.name}
                        onChange={(value) => changeName(value, setFieldValue)}
                        placeholder='Enter Fullname'
                        className={`form-control ${
                          errors.name && touched.name && 'is-invalid'
                        }`}
                      />
                      {errors.name && touched.name ? (
                        <div className='text-danger'>{errors.name}</div>
                      ) : null}
                    </FormGroup>
                    <FormGroup>
                      <Label for='Username'>Username</Label>
                      <Field
                        as='input'
                        type='text'
                        name='userName'
                        validate={validateUserName}
                        id='userName'
                        placeholder='Enter Username'
                        className={`form-control ${
                          errors.userName && touched.userName && 'is-invalid'
                        }`}
                      />
                      {errors.userName && touched.userName ? (
                        <div className='text-danger'>{errors.userName}</div>
                      ) : null}
                    </FormGroup>
                    <FormGroup>
                      <Label for='Email'>Email Address</Label>
                      <Field
                        as='input'
                        type='email'
                        name='email'
                        validate={validateEmail}
                        id='email'
                        placeholder='Enter Email Address'
                        className={`form-control ${
                          errors.email && touched.email && 'is-invalid'
                        }`}
                      />
                      {errors.email && touched.email ? (
                        <div className='text-danger'>{errors.email}</div>
                      ) : null}
                    </FormGroup>
                    <FormGroup>
                      <Label for='Password'>Password</Label>
                      <InputGroup>
                        <Field
                          as='input'
                          type={showPassword ? 'text' : 'password'}
                          name='password'
                          id='password'
                          validate={validatePassword}
                          placeholder='Enter Password'
                          className={`form-control ${
                            errors.password && touched.password && 'is-invalid'
                          }`}
                        />
                        <InputGroupAddon addonType='append'>
                          <InputGroupText
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                      {errors.password && touched.password ? (
                        <div className='text-danger'>{errors.password}</div>
                      ) : null}
                    </FormGroup>
                    <FormGroup>
                      <Label for='CPassword'>Confirm Password</Label>
                      <InputGroup>
                        <Field
                          as='input'
                          type={showCPassword ? 'text' : 'password'}
                          name='CPassword'
                          id='CPassword'
                          placeholder='Enter Confirm Password'
                          className={`form-control ${
                            errors.CPassword &&
                            touched.CPassword &&
                            'is-invalid'
                          }`}
                        />
                        <InputGroupAddon addonType='append'>
                          <InputGroupText
                            onClick={() => setShowCPassword(!showCPassword)}
                          >
                            {showCPassword ? <FaEye /> : <FaEyeSlash />}
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                      {errors.CPassword && touched.CPassword ? (
                        <div className='text-danger'>{errors.CPassword}</div>
                      ) : null}
                    </FormGroup>
                    <FormGroup className='mb-0'>
                      <Button
                        className={
                          isSubmit
                            ? 'btn btn-orange btn-block all-centers'
                            : 'btn btn-orange btn-block'
                        }
                        type='submit'
                        disabled={isSubmit ? true : false}
                      >
                        {isSubmit ? (
                          <Spinner className='inner-spinner' size='sm' />
                        ) : (
                          'Register Now'
                        )}
                      </Button>
                    </FormGroup>
                  </Form>
                )}
              </Formik>
            </TabPane>

            <TabPane tabId='3'>
              <Formik
                initialValues={{
                  email: '',
                }}
                validationSchema={recoverPasswordFormSchema}
                // onSubmit={handleForgotPwdSubmit}
              >
                {({
                  errors,
                  touched,
                  setFieldValue,
                  values,
                  setFieldTouched,
                }) => (
                  <Form>
                    <div className='title'>
                      <h2 className='text-primary1 text-center billcorporate mb-30'>
                        Recover Your Password
                      </h2>
                    </div>
                    <FormGroup>
                      <Label for='emails'>Email Address</Label>
                      <Field
                        as='input'
                        type='email'
                        name='email'
                        validate={validateEmail}
                        id='email'
                        placeholder='Enter Email Address'
                        className={`form-control ${
                          errors.email && touched.email && 'is-invalid'
                        }`}
                      />
                      {errors.email && touched.email ? (
                        <div className='text-danger'>{errors.email}</div>
                      ) : null}
                    </FormGroup>
                    <FormGroup className='mb-0'>
                      <div className='d-flex align-items-center justify-content-center'>
                        <Button
                          className={
                            isSubmit
                              ? 'btn btn-orange smalls all-centers'
                              : 'btn btn-orange smalls'
                          }
                          //disabled={!email.length}
                          type='submit'
                          onClick={() =>
                            handleForgotPwdSubmit(
                              values,
                              errors,
                              setFieldValue,
                              setFieldTouched
                            )
                          }
                        >
                          {isSubmit ? <Spinner size='md' /> : 'Submit'}
                        </Button>
                        <Button
                          className='btn btn-dark ml-3 smalls'
                          onClick={() => {
                            toggletab('1');
                            setFieldValue('email', '');
                            setFieldTouched('email', false);
                            setEmail('');
                            setEmailError('');
                            setIsSubmit(false);
                          }}
                        >
                          Back
                        </Button>
                      </div>
                    </FormGroup>
                  </Form>
                )}
              </Formik>
            </TabPane>

            <TabPane tabId='4'>
              <Reactform onSubmit={(e) => handleOtpCheckSubmit(e)}>
                <div className='title'>
                  <h2 className='text-primary1 text-center billcorporate mb-30'>
                    Enter Code
                  </h2>
                </div>
                <FormGroup className='text-center'>
                  <Label for='q1'>
                    Enter the code sent to{' '}
                    <span className='text-primary1'>{email}</span>
                  </Label>
                  <div className='code-ul'>
                    <OTPInput
                      value={OTP}
                      onChange={setOTP}
                      autoFocus
                      OTPLength={6}
                      otpType='number'
                      className='code'
                      disabled={false}
                    />
                  </div>
                </FormGroup>
                <FormGroup className=''>
                  <div className='d-flex align-items-center justify-content-center'>
                    <Button
                      className={
                        isSubmit
                          ? 'btn btn-orange smalls all-centers'
                          : 'btn btn-orange smalls'
                      }
                      type='submit'
                      disabled={OTP.length !== 6 || isSubmitLink}
                      onClick={() => {
                        toggletab('4');
                      }}
                    >
                      {isSubmit ? <Spinner size='md' /> : 'Verify'}
                    </Button>
                    <Button
                      className='btn btn-dark ml-3 smalls'
                      onClick={() => {
                        toggletab('1');
                        setOTP('');
                        setEmail('');
                      }}
                    >
                      Back
                    </Button>
                  </div>
                </FormGroup>
                <FormGroup
                  className={
                    isSubmit
                      ? 'mb-0 text-center all-centers'
                      : 'mb-0 text-center'
                  }
                  onClick={handleResendOtp}
                >
                  <Label className='mb-0'>
                    <span className='links'>
                      {isSubmitLink ? <Spinner size='md' /> : 'Resend Code'}
                    </span>
                  </Label>
                </FormGroup>
              </Reactform>
            </TabPane>

            <TabPane tabId='5'>
              <Formik
                initialValues={{
                  email: email,
                  newpass: '',
                  confirmpass: '',
                }}
                validationSchema={Yup.object({
                  newpass: Yup.string()
                    .required('Please enter new password')
                    .min(8, 'Minimum 8 characters required')
                    .max(36, 'Maximum 36 characters are allowed')
                    .matches(
                      /(?=^.{8,}$)(?=.*\d)(?=.*[~()_+='":;?/|.><,`}{!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                      'Password must contain at least one uppercase, one lowercase, one number and one special character'
                    ),
                  confirmpass: Yup.string()
                    .oneOf(
                      [Yup.ref('newpass'), null],
                      'New password and confirm new password do not match'
                    )
                    .required('Please enter confirm new password')
                    .min(8, 'Minimum 8 characters required')
                    .max(36, 'Maximum 36 characters are allowed'),
                })}
                onSubmit={handleSubmitResetPwd}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div className='title'>
                      <h2 className='text-primary1 text-center billcorporate mb-30'>
                        Reset Your Password
                      </h2>
                    </div>
                    <FormGroup>
                      <Label for='p1'>New Password</Label>
                      <InputGroup>
                        <Field
                          name='newpass'
                          placeholder='Enter New Password'
                          validate={validatePassword}
                          type={showPassword ? 'text' : 'password'}
                          id='newpass'
                          className={`form-control passwordscroll ${
                            errors.newpass && touched.newpass && 'is-invalid'
                          }`}
                        />
                        <InputGroupAddon addonType='append'>
                          <InputGroupText
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                      {errors.newpass && touched.newpass ? (
                        <div className='text-danger'>{errors.newpass}</div>
                      ) : null}
                    </FormGroup>
                    <FormGroup>
                      <Label for='cp1'>Confirm New Password</Label>
                      <InputGroup>
                        <Field
                          name='confirmpass'
                          placeholder='Enter Confirm New Password'
                          id='confirmpass'
                          type={showCPassword ? 'text' : 'password'}
                          className={`form-control passwordscroll ${
                            errors.confirmpass &&
                            touched.confirmpass &&
                            'is-invalid'
                          }`}
                        />
                        <InputGroupAddon addonType='append'>
                          <InputGroupText
                            onClick={() => setShowCPassword(!showCPassword)}
                          >
                            {showCPassword ? <FaEye /> : <FaEyeSlash />}
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                      {errors.confirmpass && touched.confirmpass ? (
                        <div className='text-danger'>{errors.confirmpass}</div>
                      ) : null}
                    </FormGroup>
                    <FormGroup className='mb-0'>
                      <div className='d-flex align-items-center justify-content-center'>
                        <Button
                          className={
                            isSubmit
                              ? 'btn btn-orange smalls all-centers'
                              : 'btn btn-orange smalls'
                          }
                          type='submit'
                        >
                          {isSubmit ? <Spinner size='md' /> : 'Submit'}
                        </Button>
                        <Button
                          className='btn btn-dark ml-3 smalls'
                          onClick={() => {
                            toggletab('4');
                            setShowPassword(false);
                            setShowCPassword(false);
                          }}
                        >
                          Back
                        </Button>
                      </div>
                    </FormGroup>
                  </Form>
                )}
              </Formik>
            </TabPane>

            <TabPane tabId='6'>
              <Reactform onSubmit={(e) => handleVerifyEmailSubmit(e)}>
                <div className='title'>
                  <h2 className='text-primary1 text-center billcorporate mb-30'>
                    Enter Code
                  </h2>
                </div>
                <FormGroup className='text-center'>
                  <Label for='q1'>
                    Enter the code sent to{' '}
                    <span className='text-primary1'>{email}</span>
                  </Label>
                  <div className='code-ul'>
                    <OTPInput
                      value={OTP}
                      onChange={setOTP}
                      autoFocus
                      OTPLength={6}
                      otpType='number'
                      className='code'
                      disabled={false}
                    />
                  </div>
                </FormGroup>
                <FormGroup className=''>
                  <div className='d-flex align-items-center justify-content-center'>
                    <Button
                      className={
                        isSubmit
                          ? 'btn btn-orange smalls all-centers'
                          : 'btn btn-orange smalls'
                      }
                      type='submit'
                      disabled={OTP.length !== 6 || isSubmitLink}
                      onClick={() => {
                        toggletab('6');
                      }}
                    >
                      {isSubmit ? <Spinner size='md' /> : 'Verify'}
                    </Button>
                    <Button
                      className='btn btn-dark ml-3 smalls'
                      onClick={() => {
                        toggletab('1');
                        setOTP('');
                        setEmail('');
                      }}
                    >
                      Back
                    </Button>
                  </div>
                </FormGroup>
                <FormGroup
                  className='mb-0 text-center'
                  onClick={handleResendVerifyEmail}
                >
                  <Label className='mb-0'>
                    <span className='links'>
                      {isSubmitLink ? <Spinner size='md' /> : 'Resend Code'}
                    </span>
                  </Label>
                </FormGroup>
              </Reactform>
            </TabPane>
          </TabContent>
        </ModalBody>
      </Modal>
    </>
  );
};

export default Loginp;
