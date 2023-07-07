import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { Container, Card, CardBody, CustomInput, Form } from 'reactstrap';
import { getHomePageData } from '../../redux/actions/apiActions/apiAction';
import Imags from '../../public/assets/images/big-cate1.png';
import style from '../../styles/common.module.scss';

export default function Home2() {
  const [categoryOptions, setCategoryOptions] = useState([]);

  // useEffect(async () => {
  //   let res = await getHomePageData();
  //   if (res && res.status === 200) {
  //     let homeData = res.data.data;
  //     let categoryArray = [];
  //     if (homeData.categoryList.length > 0) {
  //       let i;
  //       for (i = 0; i < homeData.categoryList.length; i++) {
  //         categoryArray.push({
  //           id: homeData.categoryList[i].id,
  //           categoryName: homeData.categoryList[i].name,
  //           categoryImage: homeData.categoryList[i].image,
  //         });
  //       }
  //     }
  //     setCategoryOptions(categoryArray);
  //   } else {
  //     toast.error("Something went wrong");
  //   }
  // }, []);

  const settings = {
    dots: false,
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          arrows: true,
        },
      },
    ],
  };
  return (
    <section className='home-section-2'>
      <Container fluid='md'>
        <div className='title'>
          <h2 className={style.h2}>What do you need help with</h2>
        </div>
        <Form>
          <Slider {...settings}>
            <div className='main-slider-click'>
              <Card>
                <div className='card-img-width'>
                  <img src={Imags} className='img-fluid' />
                </div>
                <CardBody className='bg-primary1'>
                  <h5 className='card-title'>Nidhi</h5>
                </CardBody>
              </Card>
            </div>
            <div className='main-slider-click'>
              <Card>
                <div className='card-img-width'>
                  <img src={Imags} className='img-fluid' />
                </div>
                <CardBody className='bg-primary1'>
                  <h5 className='card-title'>Nidhi</h5>
                </CardBody>
              </Card>
            </div>
            <div className='main-slider-click'>
              <Card>
                <div className='card-img-width'>
                  <img src={Imags} className='img-fluid' />
                </div>
                <CardBody className='bg-primary1'>
                  <h5 className='card-title'>Nidhi</h5>
                </CardBody>
              </Card>
            </div>

            <div className='main-slider-click'>
              <Card>
                <div className='card-img-width'>
                  <img src={Imags} className='img-fluid' />
                </div>
                <CardBody className='bg-primary1'>
                  <h5 className='card-title'>Nidhi</h5>
                </CardBody>
              </Card>
            </div>
            <div className='main-slider-click'>
              <Card>
                <div className='card-img-width'>
                  <img src={Imags} className='img-fluid' />
                </div>
                <CardBody className='bg-primary1'>
                  <h5 className='card-title'>Nidhi</h5>
                </CardBody>
              </Card>
            </div>
            <div className='main-slider-click'>
              <Card>
                <div className='card-img-width'>
                  <img src={Imags} className='img-fluid' />
                </div>
                <CardBody className='bg-primary1'>
                  <h5 className='card-title'>Nidhi</h5>
                </CardBody>
              </Card>
            </div>

            <div className='main-slider-click'>
              <Card>
                <div className='card-img-width'>
                  <img src={Imags} className='img-fluid' />
                </div>
                <CardBody className='bg-primary1'>
                  <h5 className='card-title'>Nidhi</h5>
                </CardBody>
              </Card>
            </div>
            <div className='main-slider-click'>
              <Card>
                <div className='card-img-width'>
                  <img src={Imags} className='img-fluid' />
                </div>
                <CardBody className='bg-primary1'>
                  <h5 className='card-title'>Nidhi</h5>
                </CardBody>
              </Card>
            </div>
            <div className='main-slider-click'>
              <Card>
                <div className='card-img-width'>
                  <img src={Imags} className='img-fluid' />
                </div>
                <CardBody className='bg-primary1'>
                  <h5 className='card-title'>Nidhi</h5>
                </CardBody>
              </Card>
            </div>
          </Slider>
          {/* <Slider {...settings}>
            {categoryOptions.map((item, i) => (
              <div className="main-slider-click">
                <Card>
                  <div className="card-img-width">
                    <img
                      src={item.categoryImage}
                      className="img-fluid"
                      alt={item.categoryName}
                    />
                  </div>
                  <CardBody className="bg-primary1">
                    <h5 className="card-title">{item.categoryName}</h5>
                  </CardBody>
                </Card>
              </div>
            ))}
          </Slider> */}
        </Form>
      </Container>
    </section>
  );
}
