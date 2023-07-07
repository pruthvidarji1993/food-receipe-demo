import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { profileEdit } from '../../redux/actions/auth';
import { toast } from 'react-toastify';
import { store } from '../../redux/storeConfig/store';
import {
  setLogInData,
  setLogInFlag,
} from '../../redux/actions/auth/authAction';
import { useRouter } from 'next/router';
import Avatar1 from '../../public/assets/images/custom/dummy.png';
import Link from 'next/link';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Container,
  FormGroup,
  Input,
  Label,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Spinner,
  Modal,
  ModalBody,
} from 'reactstrap';
import { FaRegEdit, FaRegUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const Profile1 = (props) => {
  const router = useRouter();
  const state = useSelector((state) => state.login);
  const [loginData, setLoginData] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [avatar, setAvatar] = useState(Avatar1.src);
  const [imgBase64, setImgBase64] = useState('');

  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 16 / 16 });
  const [completedCrop, setCompletedCrop] = useState(null);

  const [modal, setModal] = useState(false);
  const togglemodal = () => setModal(!modal);

  const formSchema = Yup.object().shape({
    password: Yup.string()
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
      .min(8, 'Minimum 8 characters required')
      .max(36, 'Maximum 36 characters are allowed'),
    email: Yup.string().email('Invalid email').required('Please enter email'),
  });

  function validatePassword(v) {
    let error;
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
  const cancel = ({ setFieldValue, setFieldTouched }) => {
    setIsSubmit(true);
    router.push('/');
    setFieldValue('email', loginData ? loginData.email : '');
    setFieldValue('password', '');
    setFieldValue('CPassword', '');
    setFieldTouched('password', false);
    setFieldTouched('CPassword', false);
    setAvatar(state.values.image ? state.values.image : Avatar1.src);
    setShowPassword(false);
    setShowCPassword(false);
    setIsSubmit(false);
  };
  const handleSubmit = async (value) => {
    setIsSubmit(true);
    let data = {
      email: value.email.toLowerCase(),
    };
    if (value.password) {
      data.password = value.password;
    }
    if (imgBase64) {
      (data.image = imgBase64), (data.is_image_update = imgBase64 ? true : '');
    }
    let res = await profileEdit(data);
    if (res && res.status === 200) {
      if (data.password) {
        router.push('/');
        localStorage.removeItem('food_recipe_user');
        store.dispatch({ type: 'LOGOUT' });
        store.dispatch(setLogInFlag(false));
        toast.success(`${res.data.message}`);
        setShowPassword(false);
        setShowCPassword(false);
      } else {
        setShowPassword(false);
        setShowCPassword(false);
        localStorage.setItem('food_recipe_user', JSON.stringify(res.data.data));
        store.dispatch(setLogInData(res.data.data));
        toast.success(`${res.data.message}`);
      }
    } else {
      toast.error(`${res.data.error}`);
    }
    setIsSubmit(false);
  };

  useEffect(() => {
    if (state && state.values) {
      setLoginData(state.values);
      if (state.values.image && state.values.image !== '') {
        setAvatar(state.values.image);
      } else {
        setAvatar(Avatar1.src);
      }
    } else {
      router.push('/');
    }
  }, [state, state.values, state.loginFlag]);

  const onChange = (e) => {
    if (e.target.files[0]) {
      let image = e.target.files[0];
      if (
        image.type === 'image/png' ||
        image.type === 'image/jpg' ||
        image.type === 'image/jpeg'
      ) {
        if (image.size > 7340032) {
          e.target.value = null;
          toast.error('Max size of image should be 7 mb');
        } else {
          const reader = new FileReader();
          reader.readAsDataURL(e.target.files[0]);
          reader.onload = () => setImgBase64(reader.result);
          reader.onerror = (error) => {};
          setAvatar(URL.createObjectURL(e.target.files[0]));
        }
      } else {
        toast.error('Only image is allowed');
      }
    }
  };

  const onSelectFile = (e) => {
    if (e.target.files[0]) {
      let image = e.target.files[0];
      if (
        image.type === 'image/png' ||
        image.type === 'image/jpg' ||
        image.type === 'image/jpeg'
      ) {
        if (image.size > 7340032) {
          e.target.value = null;
          toast.error('Max size of image should be 7 mb');
        } else {
          setModal(true);
          const reader = new FileReader();
          reader.addEventListener('load', () => setUpImg(reader.result));
          reader.readAsDataURL(e.target.files[0]);
          e.target.value = null;
        }
      } else {
        e.target.value = null;
        toast.error('Only image is allowed');
      }
    }
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
  }, [completedCrop]);

  function generateDownload(canvas, crop) {
    if (!crop || !canvas) {
      return;
    }

    canvas.toBlob((blob) => {
      var reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        var base64data = reader.result;
        setAvatar(base64data);
        setImgBase64(base64data);
        setModal(!modal);
      };
    });
  }
  return (
    <>
      <section className='profile-section-1'>
        <Container fluid='md'>
          <Card className='profile-card'>
            <CardBody>
              {loginData && Object.keys(loginData).length > 0 ? (
                <div className='left-data'>
                  <div className='image-data'>
                    <img
                      src={avatar}
                      className='img-fluid h-100'
                      alt='image'
                      style={{ height: '100%' }}
                    />
                    <Modal
                      size='sm'
                      isOpen={modal}
                      toggle={togglemodal}
                      className='modal-dialog-centered cropped-modal'
                    >
                      <Button
                        color='null'
                        className='close-modal'
                        onClick={togglemodal}
                      >
                        <img
                          src='/assets/images/close-modal.png'
                          width='15'
                          height='15'
                          className='img-fluid'
                        />
                      </Button>
                      <ModalBody>
                        <ReactCrop
                          src={upImg}
                          onImageLoaded={onLoad}
                          crop={crop}
                          onChange={(c) => setCrop(c)}
                          onComplete={(c) => setCompletedCrop(c)}
                        />
                        <div>
                          <canvas
                            ref={previewCanvasRef}
                            style={{
                              width: 0,
                              height: 0,
                            }}
                          />
                        </div>
                        <div className='text-center'>
                          <Button
                            className='btn btn-primary'
                            disabled={
                              !completedCrop?.width || !completedCrop?.height
                            }
                            onClick={() =>
                              generateDownload(
                                previewCanvasRef.current,
                                completedCrop
                              )
                            }
                          >
                            Set Image
                          </Button>
                        </div>
                      </ModalBody>
                    </Modal>
                    <Input
                      type='file'
                      id='file'
                      onChange={onSelectFile}
                      className='profile-btn'
                      accept='image/*'
                      // style={{ width: "100px", height: "100px" }}
                    />
                    <Label for='file'>
                      <FaRegEdit />
                    </Label>
                  </div>
                </div>
              ) : null}
              {loginData && Object.keys(loginData).length > 0 ? (
                <div className='right-data'>
                  <h6>{loginData.fullName}</h6>
                  <ul className='profile-list'>
                    <li>
                      <div className='list-data'>
                        <div className='list-one'>
                          <div className='bullets'>
                            <FaRegUser />
                          </div>
                        </div>
                        <div className='list-two'>
                          Member Since :
                          <span>
                            {loginData.createdAt
                              ? '  ' +
                                (
                                  '0' + new Date(loginData.createdAt).getDate()
                                ).slice(-2) +
                                '-' +
                                (
                                  '0' +
                                  (new Date(loginData.createdAt).getMonth() + 1)
                                ).slice(-2) +
                                '-' +
                                new Date(loginData.createdAt).getFullYear()
                              : ''}
                          </span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              ) : null}
            </CardBody>

            <CardHeader>
              {loginData && Object.keys(loginData).length > 0 ? (
                <CardTitle>Basic Information</CardTitle>
              ) : null}
            </CardHeader>
            {loginData && Object.keys(loginData).length > 0 ? (
              <Formik
                initialValues={{
                  id: loginData ? loginData.id : '',
                  name: loginData ? loginData.fullName : '',
                  userName: loginData ? loginData.userName : '',
                  email: loginData ? loginData.email : '',
                }}
                validationSchema={formSchema}
                onSubmit={handleSubmit}
              >
                {({
                  errors,
                  touched,
                  setFieldValue,
                  values,
                  setFieldTouched,
                }) => (
                  <Form className='form-common profile-form-common'>
                    <FormGroup className='mb-30'>
                      <div class='floating-label'>
                        <Field
                          type='text'
                          className='form-control floating-input'
                          autoComplete='off'
                          name='Username'
                          id='Username'
                          placeholder='Username'
                          value={loginData.userName}
                          disabled
                        />
                        <label>Username</label>
                      </div>
                    </FormGroup>
                    <FormGroup className='mb-30'>
                      <div class='floating-label'>
                        <Field
                          type='text'
                          className='form-control floating-input'
                          autoComplete='off'
                          name='Fullname'
                          id='Fullname'
                          placeholder='Fullname'
                          value={loginData.fullName}
                          disabled
                        />
                        <label>Fullname</label>
                      </div>
                    </FormGroup>
                    <FormGroup className='mb-30'>
                      <div class='floating-label'>
                        <Field
                          as='input'
                          type='email'
                          autoComplete='off'
                          name='email'
                          id='email'
                          placeholder='Email Address'
                          className={`form-control floating-input ${
                            errors.email && touched.email && 'is-invalid'
                          }`}
                        />
                        {errors.email && touched.email ? (
                          <div className='text-danger'>{errors.email}</div>
                        ) : null}
                        <label>Email Address</label>
                      </div>
                    </FormGroup>
                    <FormGroup className='mb-30'>
                      <div class='floating-label'>
                        <InputGroup>
                          <Field
                            as='input'
                            type={showPassword ? 'text' : 'password'}
                            name='password'
                            id='password'
                            validate={validatePassword}
                            placeholder='Change Password'
                            className={`pr-0 form-control floating-input border-right-0 ${
                              errors.password &&
                              touched.password &&
                              'is-invalid'
                            }`}
                          />
                          <InputGroupAddon addonType='append'>
                            <InputGroupText
                              className='bg-white '
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </InputGroupText>
                          </InputGroupAddon>

                          <label>Change Password</label>
                        </InputGroup>
                      </div>
                      {errors.password && touched.password ? (
                        <div className='text-danger'>{errors.password}</div>
                      ) : null}
                    </FormGroup>
                    <FormGroup className='mb-35'>
                      <div class='floating-label'>
                        <InputGroup>
                          <Field
                            as='input'
                            type={showCPassword ? 'text' : 'password'}
                            name='CPassword'
                            id='CPassword'
                            placeholder='Confirm Password'
                            className={`pr-0 form-control floating-input border-right-0 ${
                              errors.CPassword &&
                              touched.CPassword &&
                              'is-invalid'
                            }`}
                          />
                          <InputGroupAddon addonType='append'>
                            <InputGroupText
                              className='bg-white '
                              onClick={() => setShowCPassword(!showCPassword)}
                            >
                              {showCPassword ? <FaEye /> : <FaEyeSlash />}
                            </InputGroupText>
                          </InputGroupAddon>
                          <label>Confirm Password</label>
                        </InputGroup>
                      </div>
                      {errors.CPassword && touched.CPassword ? (
                        <div className='text-danger'>{errors.CPassword}</div>
                      ) : null}
                    </FormGroup>
                    <FormGroup className='mb-0'>
                      <Button
                        className={
                          isSubmit
                            ? 'btn btn-dark text-capitalize all-centers'
                            : 'btn btn-dark text-capitalize'
                        }
                        type='submit'
                        disabled={isSubmit ? true : false}
                      >
                        {isSubmit ? (
                          <Spinner className='inner-spinner' size='sm' />
                        ) : (
                          'save changes'
                        )}
                      </Button>
                      <Button
                        className='btn btn-transparent'
                        onClick={() =>
                          cancel({ setFieldValue, setFieldTouched })
                        }
                      >
                        Cancel
                      </Button>
                    </FormGroup>
                  </Form>
                )}
              </Formik>
            ) : null}
          </Card>
        </Container>
      </section>
    </>
  );
};

export default Profile1;
