import React, { useState } from 'react';
import { Button, FormGroup, Spinner, Col, Container, Row } from 'reactstrap';
import { Formik, Field, Form, isInteger } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { contactUs } from '../../redux/actions/apiActions/apiAction';
import style from '../../styles/common.module.scss';

const Contact1 = () => {
  const router = useRouter();
  const [isSubmit, setIsSubmit] = useState(false);

  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .required('Please enter username')
      .min(3, 'Minimum 3 characters required')
      .max(40, 'Maximum 40 characters allowed'),

    email: Yup.string().required('Please enter email'),
    comment: Yup.string()
      .required('Please enter comment')
      .min(3, 'Minimum 3 characters required')
      .max(250, 'Maximum 250 characters allowed'),
  });

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

  function validateEmail(v) {
    let error;
    if (!v) {
      error = 'Please enter email address';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(v)) {
      error = 'Invalid email address';
    }
    return error;
  }
  const handleSubmit = async (value) => {
    setIsSubmit(true);
    let data = {
      fullName: value.fullName,
      email: value.email.toLowerCase(),
      message: value.comment,
    };
    let res = await contactUs(data);
    if (res && res.status === 200) {
      router.push('/contactsubmitted');
    } else {
      toast.error(`${res.data.error}`);
    }
    setIsSubmit(false);
  };
  return (
    <section className='contact-section-1'>
      <Container fluid='md'>
        <Row>
          <Col
            xl={6}
            lg={6}
            md={6}
            className='order-md-1 order-sm-2 order-2 md-mt-30'
          >
            <div className='contact-section-1-data'>
              <div className='title'>
                <h2 className={`${style.h2} mb-35`}>Tell Us Your Thought </h2>
              </div>
              <Formik
                initialValues={{
                  fullName: '',
                  email: '',
                  comment: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched }) => (
                  <Form className='form-common contact-textarea'>
                    <FormGroup className='mb-30 with-mr'>
                      <div class='floating-label'>
                        <Field
                          as='input'
                          type='text'
                          autoComplete='off'
                          name='fullName'
                          id='fullName'
                          validate={validateName}
                          placeholder='Fullname'
                          className={`form-control floating-input ${
                            errors.fullName && touched.fullName && 'is-invalid'
                          }`}
                        />
                        <label>Fullname</label>
                        {errors.fullName && touched.fullName ? (
                          <div className='text-danger'>{errors.fullName}</div>
                        ) : null}
                      </div>
                    </FormGroup>
                    <FormGroup className='mb-30 with-mr'>
                      <div class='floating-label'>
                        <Field
                          as='input'
                          type='email'
                          className={`form-control floating-input ${
                            errors.email && touched.email && 'is-invalid'
                          }`}
                          autoComplete='off'
                          name='email'
                          validate={validateEmail}
                          id='email'
                          placeholder='Email Address'
                        />
                        <label>Email Address</label>
                        {errors.email && touched.email ? (
                          <div className='text-danger'>{errors.email}</div>
                        ) : null}
                      </div>
                    </FormGroup>
                    <FormGroup className='mb-40'>
                      <div class='floating-label'>
                        <Field
                          as='textarea'
                          name='comment'
                          autoComplete='off'
                          id='comment'
                          className={`form-control floating-textarea ${
                            errors.comment && touched.comment && 'is-invalid'
                          }`}
                          placeholder='Comments'
                        />
                        <label>Comments</label>
                        {errors.comment && touched.comment ? (
                          <div className='text-danger'>{errors.comment}</div>
                        ) : null}
                      </div>
                    </FormGroup>
                    <FormGroup className='mb-0'>
                      <Button className='btn btn-dark mb-1' type='submit'>
                        {isSubmit ? (
                          <Spinner className='inner-spinner' size='sm' />
                        ) : (
                          'Submit'
                        )}
                      </Button>
                      <Button
                        className='btn btn-dark btn-transparent mb-1'
                        type='reset'
                      >
                        Cancel
                      </Button>
                    </FormGroup>
                  </Form>
                )}
              </Formik>
            </div>
          </Col>
          <Col xl={6} lg={6} md={6} className='order-md-2 order-sm-1 order-1'>
            <div className='text-center mt-20'>
              <img
                src='/assets/images/contact-right.svg'
                className='contact-banner img-fluid'
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact1;
