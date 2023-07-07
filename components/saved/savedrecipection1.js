import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { Container, Card, CardBody, Form } from 'reactstrap';
import { getAllBookMarked } from '../../redux/actions/apiActions/apiAction';
import { toast } from 'react-toastify';
import Saved2 from './savedrecipection2';
import Loader from '../../ui/loadercustom';
import { useRouter } from 'next/router';
import style from '../../styles/common.module.scss';

export default function SavedRecipe1() {
  //states
  const router = useRouter();
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [categoryName, setCategoryName] = useState('');

  const settings = {
    dots: false,
    infinite: true,
    arrows: true,
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
          arrows: true,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          arrows: true,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
          arrows: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          arrows: true,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          arrows: true,
        },
      },
    ],
  };

  //selected category shows first
  const selectCategory = (id) => {
    setCategoryId(id);
    let activeCategoryId = categoryOptions.filter((item) => item.id == id);

    // let inActiveCategoryId = categoryOptions.filter((item) => item.id != id);
    // let newCategoeyArray = [...activeCategoryId, ...inActiveCategoryId];
    // setCategoryOptions(newCategoeyArray);
    setCategoryName(activeCategoryId[0].categoryName);
  };

  useEffect(async () => {
    setCategoryId('');
    setCategoryName('');
    let res = await getAllBookMarked('', '', 1);
    if (res && res.status === 200) {
      let homeData = res.data.data;
      let categoryArray = [];
      if (homeData.categoryList.length > 0) {
        let i;
        for (i = 0; i < homeData.categoryList.length; i++) {
          categoryArray.push({
            id: homeData.categoryList[i].id,
            value: homeData.categoryList[i].name,
            label: homeData.categoryList[i].name,
            categoryName: homeData.categoryList[i].name,
            categoryImage: homeData.categoryList[i].image,
          });
        }
      }
      setCategoryOptions(categoryArray);
      // setCategoryId(categoryArray[0].id);
      // setCategoryName(categoryArray[0].categoryName);
    } else {
      toast.error('Something went wrong');
    }
  }, [router]);
  return (
    <div>
      {/* {categoryId !== '' ? ( */}
      <div>
        <section className='home-section-2 categary-section-1'>
          <Container fluid='md'>
            <div className='title'>
              <h2 className={style.h2}>
                Select The Category Below To View Recipes
              </h2>
            </div>
            <Form>
              <Slider {...settings}>
                {categoryOptions.map((item) => (
                  <div className='main-slider-click'>
                    <Card
                      className={categoryId == item.id ? 'active' : ''}
                      onClick={() => selectCategory(item.id)}
                    >
                      <div className='card-img-width'>
                        <img
                          src={item.categoryImage}
                          className='img-fluid'
                          alt={item.categoryName}
                        />
                      </div>
                      <CardBody>
                        <h5 className='card-title'>{item.categoryName}</h5>
                      </CardBody>
                    </Card>
                  </div>
                ))}
              </Slider>
            </Form>
          </Container>
        </section>
        <Saved2 categoryFilter={categoryId} categoryName={categoryName} />
      </div>
      {/* // ) : ( // <Loader />
      // )} */}
    </div>
  );
}
