import React from 'react';
import classnames from 'classnames';
import {
  Button,
  FormGroup,
  Input,
  Col,
  Container,
  Row,
  Spinner,
} from 'reactstrap';
import { Formik, Field, Form, isInteger } from 'formik';
import * as Yup from 'yup';
import Rating from 'react-rating';
import { toast } from 'react-toastify';
import { Star } from 'react-feather';
import Drop1 from './dropzonerecipe';
import { store } from '../../redux/storeConfig/store';
import {
  submitReview,
  getImageUrlFromBase64,
  deleteImage,
} from '../../redux/actions/apiActions/apiAction';
import { Upload, Trash2 } from 'react-feather';
import style from '../../styles/common.module.scss';

const formSchema = Yup.object().shape({
  comment: Yup.string()
    .required('Please write few lines to submit your review!')
    .min(3, 'Minimum 3 characters required')
    .max(250, 'Maximum 250 characters allowed'),
});
export default class Recipe6 extends React.Component {
  constructor(props) {
    super(props);
    this.imageUpload = this.imageUpload.bind(this);
  }
  state = {
    rating: 1,
    isSubmit: false,
    imageArray: [],
  };
  ratingChanged = (newRating) => {
    console.log(newRating);
  };
  submitHandler = async (
    value,
    errors,
    setFieldValue,
    setFieldTouched,
    setErrors
  ) => {
    let loginUser = store.getState().login.loginFlag
      ? store.getState().login.loginFlag.data
      : false;
    if (loginUser === true) {
      if (errors && errors.comment) {
        setFieldTouched('comment', true);
        return false;
      }
      if (value && value.comment === '') {
        setFieldValue('comment', '');
        setFieldTouched('comment', true);
        return false;
      }
      this.setState({ isSubmit: true });
      let data = {
        recipeId: this.props.recipeDetail.id,
        rating: this.state.rating,
        comment: value.comment,
        attachments: this.state.imageArray,
      };
      let res = await submitReview(data);
      if (res && res.status === 200) {
        setFieldValue('comment', '');
        setFieldTouched('comment', false);
        toast.success(
          'Your review is submitted successfully for admin approval'
        );
        this.setState({ rating: 1, imageArray: [] });
      } else {
        toast.error('Something went wrong');
      }
      this.setState({ isSubmit: false });
    } else {
      setErrors({});
      setFieldTouched('comment', false);
      toast.error('Please login first for writing the review');
      return false;
    }
  };

  //for get image url from base64
  imageUpload = async (image, name, i) => {
    let data = {
      fileName: name.split('.')[0],
      source: image,
      folder: 'recipes',
    };
    if (data.fileName.length < 4) {
      data.fileName = data.fileName + '_review';
    }
    let res = await getImageUrlFromBase64(data);
    if (res && res.status === 201) {
      let imageUrl = res.data.data;
      let oldData = [...this.state.imageArray];
      oldData[i] = imageUrl;
      this.setState({ imageArray: oldData });
    } else {
      toast.error('Something went wrong while upload image');
    }
  };

  onSelectFile = (e) => {
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
          let array = this.state.imageArray;
          if (array.length === 0) {
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = (e) => {
              var base64data = e.target.result;
              this.imageUpload(base64data, image.name, 0);
            };
            e.target.value = null;
          } else if (array.length === 1) {
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = (e) => {
              var base64data = e.target.result;
              this.imageUpload(base64data, image.name, 1);
            };
            e.target.value = null;
          }
        }
      } else {
        e.target.value = null;
        toast.error('Only image is allowed');
      }
    }
  };
  //delete the image
  deleteImage = async (item, i) => {
    let oldArray = [...this.state.imageArray];
    oldArray.splice(i, 1);
    this.setState({ imageArray: oldArray });
    let data = {
      url: item,
    };
    await deleteImage(data);
  };

  render() {
    return (
      <div>
        {this.props.recipeDetail !== '' ? (
          <section className='recipe-details-section-6' id='ccc'>
            <Container fluid='md'>
              <div className='title'>
                <h2 className={`${style.h2} text-center`}>Write a Review</h2>
              </div>
              <div className='recipe-details-section-6-data'>
                <Formik
                  initialValues={{
                    comment: '',
                  }}
                  validationSchema={formSchema}
                  // onSubmit={this.submitHandler}
                >
                  {({
                    errors,
                    touched,
                    values,
                    setFieldValue,
                    setFieldTouched,
                    setErrors,
                  }) => (
                    <Form className='form-common review'>
                      <FormGroup className='mb-30'>
                        <Field
                          as='textarea'
                          name='comment'
                          autoComplete='off'
                          id='exampleText'
                          maxLength={250}
                          placeholder='Tell us your thoughts!'
                          className={`form-control ${
                            errors.comment && touched.comment && 'is-invalid'
                          }`}
                        />
                        <span
                          className={classnames(
                            'textarea-counter-value float-right',
                            {
                              'bg-danger1': values.comment.length > 250,
                            }
                          )}
                          style={{ color: '#96be2c' }}
                        >
                          {`${values.comment.length}/250`}
                        </span>
                        {errors.comment && touched.comment ? (
                          <div className='text-danger'>{errors.comment}</div>
                        ) : null}
                      </FormGroup>
                      <FormGroup className='mb-30'>
                        <h3
                          className={`${style.h3} title mb-0 d-small-block sm-mb-6`}
                        >
                          Rate Your Experience:
                          <span className='star-span d-small-block sm-ml-0'>
                            {' '}
                            <Rating
                              className='mt-25'
                              emptySymbol={
                                <Star
                                  size={28}
                                  fill='#cbcbcb'
                                  stroke='#cbcbcb'
                                />
                              }
                              fullSymbol={
                                <Star
                                  size={28}
                                  fill={'#96be2c'}
                                  stroke={'#96be2c'}
                                />
                              }
                              initialRating={this.state.rating}
                              direction='ltr'
                              onChange={(val) => this.setState({ rating: val })}
                            />
                          </span>
                        </h3>
                      </FormGroup>
                      <FormGroup>
                        <h3 className={`${style.h3} title mb-0`}>Attachment</h3>

                        {this.state.imageArray.map((item, i) => (
                          <div className='dropzone-customs'>
                            <div className='delete-icon'>
                              <Trash2
                                size='15'
                                onClick={() => this.deleteImage(item, i)}
                              />
                            </div>
                            <img src={item} className='img-fluid' alt='image' />
                          </div>
                        ))}
                        <label
                          for='file'
                          className='custom-dropzone w-100 mb-30 profile-btn'
                        >
                          <span>Add files</span> or add file here
                        </label>
                        <Input
                          type='file'
                          id='file'
                          onChange={this.onSelectFile}
                          className='d-none'
                          accept='image/*'
                          disabled={this.state.imageArray.length > 1}
                        />
                      </FormGroup>
                      <FormGroup className='mb-0'>
                        <Button
                          type='submit'
                          className='btn btn-block btn-primary'
                          onClick={() =>
                            this.submitHandler(
                              values,
                              errors,
                              setFieldValue,
                              setFieldTouched,
                              setErrors
                            )
                          }
                        >
                          <span className='justify-content-center align-items-center d-flex'>
                            {this.state.isSubmit ? (
                              <Spinner className='inner-spinner' size='sm' />
                            ) : (
                              'Submit'
                            )}
                          </span>
                        </Button>
                      </FormGroup>
                    </Form>
                  )}
                </Formik>
              </div>
            </Container>
          </section>
        ) : null}
      </div>
    );
  }
}
