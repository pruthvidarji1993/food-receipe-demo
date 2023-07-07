import React from 'react';
import { Container, Label, Progress, Row, Col } from 'reactstrap';
import style from '../../styles/common.module.scss';

// startdata
const stardata = {
  size: 19,
  count: 5,
  color: '#cbcbcb',
  activeColor: '#96be2c',
  value: 0,
  a11y: true,
  emptyIcon: <i className='fa fa-star' />,
  filledIcon: <i className='fa fa-star' />,
  onChange: (newValue) => {
    console.log(`star ${newValue}`);
  },
};
export default class Recipe4 extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        {this.props.recipeDetail !== '' && this.props.starData !== '' ? (
          <section className='recipe-details-section-4'>
            <Container fluid='md'>
              <div className='title'>
                <h2 className={`${style.h2} text-left`}>Ratings</h2>
              </div>
              <div className='recipe-details-section-4-data'>
                <Row>
                  <Col xl={12} lg={12}>
                    <div className='one'>
                      <div className='one-data'>
                        <div className='one-star-data'>
                          <div className='big-star'>
                            <div className='digits'>
                              {(
                                this.props.recipeDetail.totalRating /
                                  this.props.recipeDetail.noOfComments || 0
                              ).toFixed(1)}
                            </div>
                            <i className='fa fa-star'></i>
                          </div>
                          <p className='mb-0'>
                            Average Rating Based on{' '}
                            {this.props.recipeDetail.noOfComments} rating(s)
                          </p>
                        </div>
                        <div className='one-progress-data'>
                          <div className='d-flex mb-9 xxl-d-block'>
                            <Label>
                              <span className='digits'>5</span> star
                            </Label>
                            <Progress
                              color='success'
                              value={
                                (this.props.starData[4].count * 100) /
                                this.props.recipeDetail.noOfComments
                              }
                            >
                              {this.props.starData[4].count}
                            </Progress>
                          </div>
                          <div className='d-flex mb-9 xxl-d-block'>
                            <Label>
                              <span className='digits'>4</span> star
                            </Label>
                            <Progress
                              value={
                                (this.props.starData[3].count * 100) /
                                this.props.recipeDetail.noOfComments
                              }
                              color='success'
                            >
                              {this.props.starData[3].count}
                            </Progress>
                          </div>
                          <div className='d-flex mb-9 xxl-d-block'>
                            <Label>
                              <span className='digits'>3</span> star
                            </Label>
                            <Progress
                              color='success'
                              value={
                                (this.props.starData[2].count * 100) /
                                this.props.recipeDetail.noOfComments
                              }
                            >
                              {this.props.starData[2].count}
                            </Progress>
                          </div>
                          <div className='d-flex mb-9 xxl-d-block'>
                            <Label>
                              <span className='digits'>2</span> star
                            </Label>
                            <Progress
                              color='success'
                              value={
                                (this.props.starData[1].count * 100) /
                                this.props.recipeDetail.noOfComments
                              }
                            >
                              {this.props.starData[1].count}
                            </Progress>
                          </div>
                          <div className='d-flex mb-9 xxl-d-block'>
                            <Label>
                              <span className='digits'>1</span> star
                            </Label>
                            <Progress
                              color='success'
                              value={
                                (this.props.starData[0].count * 100) /
                                this.props.recipeDetail.noOfComments
                              }
                            >
                              {this.props.starData[0].count}
                            </Progress>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                  {/* <Col xl={6} lg={12}>
                    <div className='two'>
                      <h6 className='fw400'>Refine Reviews</h6>
                      <p className='fw300 mb-0'>
                        4 and 5 star rated certified buyer reviews 1 and 2 star
                        rated certified buyers reviews certified buyers reviews
                      </p>
                    </div>
                  </Col> */}
                </Row>
              </div>
            </Container>
          </section>
        ) : null}
      </div>
    );
  }
}
