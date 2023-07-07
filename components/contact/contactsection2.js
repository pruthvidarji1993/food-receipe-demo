import React from 'react';
import {
  Button,
  Form,
  FormGroup,
  Input,
  Col,
  Container,
  Row,
} from 'reactstrap';
import style from '../../styles/common.module.scss';

const Contact1 = (props) => {
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
            <div className='contact-section-1-data contact-section-2-data'>
              <div className='title'>
                <h2 className={`${style.h2} mb-35`}>Submitted successfully!</h2>
              </div>

              <ul className='submit-list'>
                <li>We value your opinion greatly.</li>
                <li>
                  Thank you for taking time and sharing your thoughts with us!
                </li>
              </ul>
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
