import React from 'react';
import {Col, Row,Card, CardBody, CardTitle } from 'reactstrap';
import ReactStars from "react-rating-stars-component";
import { FaRegClock } from "react-icons/fa";
import Link from 'next/link'

const stardata = {
    size: 19,
    count: 5,
    color: "#dce0e3",
    activeColor:"#ff8700",
    value: 3,
    a11y: true,
    emptyIcon: <i className="fa fa-star" />,
    filledIcon: <i className="fa fa-star" />,
    onChange: newValue => {
      console.log(`star ${newValue}`);
    }
  };
export default class FormComponent extends React.Component {

    ratingChanged = (newRating) => {
        console.log(newRating);
    }
    render() { 

      return (
          <>
        <Row className="recipe-row">
            <Col xl={4} lg={6} md={4} sm={6} className="set-padding">
                <Card className="recipe-card">
                    <Link href="/recipedetail" className="cursor-pointer">
                        <img top src="/assets/images/Dummy-card.png" className="set-img-height img-fluid cursor-pointer" alt="cap" />
                    </Link>
                    <CardBody>
                        <Link href="/recipedetail" className="card-title">Recipe Name Here</Link>
                        <ul className="first">
                            <li>
                                <FaRegClock className="time-icon"/>  
                                <span>0.5H</span>
                            </li>   
                            <li>|</li>
                            <li>
                                <FaRegClock className="time-icon"/>  
                                <span>1.5H</span>
                            </li>
                        </ul>
                        <ul className="second">
                            <li>
                                <span>(Prep Time)</span>
                            </li>
                            <li>
                                <span>(Cook Time)</span>
                            </li>
                        </ul>
                        <div className="star-data">
                            <ReactStars {...stardata} />
                        </div>
                    </CardBody>
                </Card>
            </Col>
            <Col xl={4} lg={6} md={4} sm={6} className="set-padding">
                <Card className="recipe-card">
                    <Link href="/recipedetail" className="cursor-pointer">
                        <img top src="/assets/images/Dummy-card.png" className="set-img-height img-fluid cursor-pointer" alt="cap" />
                    </Link>
                    <CardBody>
                        <Link href="/recipedetail" className="card-title">Recipe Name Here</Link>
                        <ul className="first">
                            <li>
                                <FaRegClock className="time-icon"/>  
                                <span>0.5H</span>
                            </li>   
                            <li>|</li>
                            <li>
                                <FaRegClock className="time-icon"/>  
                                <span>1.5H</span>
                            </li>
                        </ul>
                        <ul className="second">
                            <li>
                                <span>(Prep Time)</span>
                            </li>
                            <li>
                                <span>(Cook Time)</span>
                            </li>
                        </ul>
                        <div className="star-data">
                            <ReactStars {...stardata} />
                        </div>
                    </CardBody>
                </Card>
            </Col>
            <Col xl={4} lg={6} md={4} sm={6} className="set-padding">
                <Card className="recipe-card">
                    <Link href="/recipedetail" className="cursor-pointer">
                        <img top src="/assets/images/Dummy-card.png" className="set-img-height img-fluid cursor-pointer" alt="cap" />
                    </Link>
                    <CardBody>
                        <Link href="/recipedetail" className="card-title">Recipe Name Here</Link>
                        <ul className="first">
                            <li>
                                <FaRegClock className="time-icon"/>  
                                <span>0.5H</span>
                            </li>   
                            <li>|</li>
                            <li>
                                <FaRegClock className="time-icon"/>  
                                <span>1.5H</span>
                            </li>
                        </ul>
                        <ul className="second">
                            <li>
                                <span>(Prep Time)</span>
                            </li>
                            <li>
                                <span>(Cook Time)</span>
                            </li>
                        </ul>
                        <div className="star-data">
                            <ReactStars {...stardata} />
                        </div>
                    </CardBody>
                </Card>
            </Col>
            <Col xl={4} lg={6} md={4} sm={6} className="set-padding">
                <Card className="recipe-card">
                    <Link href="/recipedetail" className="cursor-pointer">
                        <img top src="/assets/images/Dummy-card.png" className="set-img-height img-fluid cursor-pointer" alt="cap" />
                    </Link>
                    <CardBody>
                        <Link href="/recipedetail" className="card-title">Recipe Name Here</Link>
                        <ul className="first">
                            <li>
                                <FaRegClock className="time-icon"/>  
                                <span>0.5H</span>
                            </li>   
                            <li>|</li>
                            <li>
                                <FaRegClock className="time-icon"/>  
                                <span>1.5H</span>
                            </li>
                        </ul>
                        <ul className="second">
                            <li>
                                <span>(Prep Time)</span>
                            </li>
                            <li>
                                <span>(Cook Time)</span>
                            </li>
                        </ul>
                        <div className="star-data">
                            <ReactStars {...stardata} />
                        </div>
                    </CardBody>
                </Card>
            </Col>
            <Col xl={4} lg={6} md={4} sm={6} className="set-padding">
                <Card className="recipe-card">
                    <Link href="/recipedetail" className="cursor-pointer">
                        <img top src="/assets/images/Dummy-card.png" className="set-img-height img-fluid cursor-pointer" alt="cap" />
                    </Link>
                    <CardBody>
                        <Link href="/recipedetail" className="card-title">Recipe Name Here</Link>
                        <ul className="first">
                            <li>
                                <FaRegClock className="time-icon"/>  
                                <span>0.5H</span>
                            </li>   
                            <li>|</li>
                            <li>
                                <FaRegClock className="time-icon"/>  
                                <span>1.5H</span>
                            </li>
                        </ul>
                        <ul className="second">
                            <li>
                                <span>(Prep Time)</span>
                            </li>
                            <li>
                                <span>(Cook Time)</span>
                            </li>
                        </ul>
                        <div className="star-data">
                            <ReactStars {...stardata} />
                        </div>
                    </CardBody>
                </Card>
            </Col>
            <Col xl={4} lg={6} md={4} sm={6} className="set-padding">
                <Card className="recipe-card">
                    <Link href="/recipedetail" className="cursor-pointer">
                        <img top src="/assets/images/Dummy-card.png" className="set-img-height img-fluid cursor-pointer" alt="cap" />
                    </Link>
                    <CardBody>
                        <Link href="/recipedetail" className="card-title">Recipe Name Here</Link>
                        <ul className="first">
                            <li>
                                <FaRegClock className="time-icon"/>  
                                <span>0.5H</span>
                            </li>   
                            <li>|</li>
                            <li>
                                <FaRegClock className="time-icon"/>  
                                <span>1.5H</span>
                            </li>
                        </ul>
                        <ul className="second">
                            <li>
                                <span>(Prep Time)</span>
                            </li>
                            <li>
                                <span>(Cook Time)</span>
                            </li>
                        </ul>
                        <div className="star-data">
                            <ReactStars {...stardata} />
                        </div>
                    </CardBody>
                </Card>
            </Col>
            <Col xl={4} lg={6} md={4} sm={6} className="set-padding">
                <Card className="recipe-card">
                    <Link href="/recipedetail" className="cursor-pointer">
                        <img top src="/assets/images/Dummy-card.png" className="set-img-height img-fluid cursor-pointer" alt="cap" />
                    </Link>
                    <CardBody>
                        <Link href="/recipedetail" className="card-title">Recipe Name Here</Link>
                        <ul className="first">
                            <li>
                                <FaRegClock className="time-icon"/>  
                                <span>0.5H</span>
                            </li>   
                            <li>|</li>
                            <li>
                                <FaRegClock className="time-icon"/>  
                                <span>1.5H</span>
                            </li>
                        </ul>
                        <ul className="second">
                            <li>
                                <span>(Prep Time)</span>
                            </li>
                            <li>
                                <span>(Cook Time)</span>
                            </li>
                        </ul>
                        <div className="star-data">
                            <ReactStars {...stardata} />
                        </div>
                    </CardBody>
                </Card>
            </Col>
            <Col xl={4} lg={6} md={4} sm={6} className="set-padding">
                <Card className="recipe-card">
                    <Link href="/recipedetail" className="cursor-pointer">
                        <img top src="/assets/images/Dummy-card.png" className="set-img-height img-fluid cursor-pointer" alt="cap" />
                    </Link>
                    <CardBody>
                        <Link href="/recipedetail" className="card-title">Recipe Name Here</Link>
                        <ul className="first">
                            <li>
                                <FaRegClock className="time-icon"/>  
                                <span>0.5H</span>
                            </li>   
                            <li>|</li>
                            <li>
                                <FaRegClock className="time-icon"/>  
                                <span>1.5H</span>
                            </li>
                        </ul>
                        <ul className="second">
                            <li>
                                <span>(Prep Time)</span>
                            </li>
                            <li>
                                <span>(Cook Time)</span>
                            </li>
                        </ul>
                        <div className="star-data">
                            <ReactStars {...stardata} />
                        </div>
                    </CardBody>
                </Card>
            </Col>
            <Col xl={4} lg={6} md={4} sm={6} className="set-padding">
                <Card className="recipe-card">
                    <Link href="/recipedetail" className="cursor-pointer">
                        <img top src="/assets/images/Dummy-card.png" className="set-img-height img-fluid cursor-pointer" alt="cap" />
                    </Link>
                    <CardBody>
                        <Link href="/recipedetail" className="card-title">Recipe Name Here</Link>
                        <ul className="first">
                            <li>
                                <FaRegClock className="time-icon"/>  
                                <span>0.5H</span>
                            </li>   
                            <li>|</li>
                            <li>
                                <FaRegClock className="time-icon"/>  
                                <span>1.5H</span>
                            </li>
                        </ul>
                        <ul className="second">
                            <li>
                                <span>(Prep Time)</span>
                            </li>
                            <li>
                                <span>(Cook Time)</span>
                            </li>
                        </ul>
                        <div className="star-data">
                            <ReactStars {...stardata} />
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </Row>

        <Row>
            <Col xl={12} className="text-center mt-4">
                <img src="/assets/images/loader.svg" width="32" height="32" className="img-fluid rotate-img" alt="cap" />  
            </Col>
        </Row>
        </>
      );
  
    }
  
  }