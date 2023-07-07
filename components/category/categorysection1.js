import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Slider from 'react-slick';
import { Container, Card, CardBody, Form } from 'reactstrap';
import { getHomePageData } from '../../redux/actions/apiActions/apiAction';
import Category2 from './categorysection2';
import style from '../../styles/common.module.scss';

export default function Category1() {
  const router = useRouter();
  let cId = router.query.id; // category ID
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [categoryId, setCategoryId] = useState(cId);

  if (cId) {
    localStorage.setItem('web_category_id', JSON.stringify(cId));
  }

  const callBack = (id) => {
    setCategoryFilter(id);
    setCategoryId(id);
    // let activeCategoryId = categoryOptions.filter((item) => item.id == id);

    // let inActiveCategoryId = categoryOptions.filter((item) => item.id != id);
    // let newCategoeyArray = [...activeCategoryId, ...inActiveCategoryId];
    // setCategoryOptions(newCategoeyArray);
  };
  const selectCategory = (id) => {
    setCategoryFilter(id);
    setCategoryId(id);
    // let activeCategoryId = categoryOptions.filter((item) => item.id == id);

    // let inActiveCategoryId = categoryOptions.filter((item) => item.id != id);
    // let newCategoeyArray = [...activeCategoryId, ...inActiveCategoryId];
    // setCategoryOptions(newCategoeyArray);
  };
  const categoryRecipeListing = async (categorySelectId) => {
    let res = await getHomePageData();
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
      // let activeCategoryId = categoryArray.filter(
      //   (item) => item.id == categorySelectId
      // );

      // let inActiveCategoryId = categoryArray.filter(
      //   (item) => item.id != categorySelectId
      // );
      // let newCategoeyArray = [...activeCategoryId, ...inActiveCategoryId];
      setCategoryOptions(categoryArray);
    } else {
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    let categorySelectId = JSON.parse(localStorage.getItem('web_category_id'));
    setCategoryId(categorySelectId);

    categoryRecipeListing(categorySelectId);
  }, []);

  const settings = {
    dots: false,
    arrows: true,
    infinite: categoryOptions.length > 6 ? true : true,
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

  return (
    <>
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
            <div id='myDiv'></div>
          </Form>
        </Container>
      </section>

      <Category2 categoryFilter={categoryFilter} callBack={callBack} />
    </>
  );
}
