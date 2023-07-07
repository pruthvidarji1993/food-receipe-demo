import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import style from '../../styles/common.module.scss';

export default class Recipe3 extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        {this.props.recipeDetail !== '' ? (
          <section className='recipe-details-section-3'>
            <Container fluid='md'>
              <div className='title'>
                <h2 className={`${style.h2} text-center`}>How To Make It</h2>
              </div>
              <div className='recipe-details-section-data'>
                {this.props.recipeDetail.RecipeSteps.map((item, i) => (
                  <div>
                    {i % 2 == 0 ? (
                      <Row>
                        <Col
                          xl={6}
                          lg={6}
                          className='auto-width mb-68 order-12 order-lg-1'
                        >
                          <div className='bg-image'>
                            <img src={item.image} className='img-fluid' />
                          </div>
                        </Col>
                        <Col
                          xl={6}
                          lg={6}
                          className='auto-width mb-68 order-1 order-lg-12'
                        >
                          <div className='bg-data right'>
                            <div className='count'>
                              <span>{item.step}</span>
                            </div>
                            <div className='box'>
                              <h6>Step - {item.step}</h6>
                              <div className='para-data'>
                                <p className=''>{item.description}</p>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    ) : (
                      <Row>
                        <Col xl={6} lg={6} className='auto-width mb-68'>
                          <div className='bg-data left'>
                            <div className='count'>
                              <span>{item.step}</span>
                            </div>
                            <div className='box'>
                              <h6>Step - {item.step}</h6>
                              <div className='para-data'>
                                <p className=''>{item.description}</p>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col xl={6} lg={6} className='auto-width mb-68'>
                          <div className='bg-image'>
                            <img src={item.image} className='img-fluid' />
                          </div>
                        </Col>
                      </Row>
                    )}
                  </div>
                ))}
                {this.props.recipeDetail.RecipeSteps.length === 0
                  ? 'No Ingredients Available'
                  : null}
              </div>
            </Container>
          </section>
        ) : null}
      </div>
    );
  }
}
