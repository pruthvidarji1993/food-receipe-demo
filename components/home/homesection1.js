import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Button,
  Form,
  FormGroup,
  Input,
  Col,
  Container,
  Row,
  Card,
  CardBody,
  Spinner,
} from 'reactstrap';
import Select from 'react-select';
import {
  getHomePageData,
  suggestionApi,
} from '../../redux/actions/apiActions/apiAction';
import { toast } from 'react-toastify';
import Slider from 'react-slick';
import Home3 from './homesection3';
import style from '../../styles/common.module.scss';

const Home1 = (props) => {
  const [isSubmit, setIsSubmit] = useState(false);
  const router = useRouter();
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [bannerImage, setBannerImage] = useState('');
  const [bannerHeading, setBannerHeading] = useState('');
  const [bannerSubHeading, setBannerSubHeading] = useState('');

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState(categoryOptions[0]);
  const [homeData, setHomeData] = useState('');
  const [recipeSerach, setRecipeSearch] = useState('');
  const [click, setClick] = useState(false);
  const [catFilter, setCatFilter] = useState(categoryOptions[0]);
  const [suggestionList, setSuggestionList] = useState([]);

  useEffect(async () => {
    let res = await getHomePageData();
    if (res && res.status === 200) {
      let homeData = res.data.data;
      setHomeData(homeData);
      setBannerImage(homeData.bannerList[0].bannerImage);
      setBannerHeading(homeData.bannerList[0].mainHeaderText);
      setBannerSubHeading(homeData.bannerList[0].subHeaderText);
      let categoryArray = [];
      let categoryList = [];
      if (homeData.categoryList.length > 0) {
        categoryArray.push({
          id: '',
          value: '',
          label: 'All Categories',
          categoryName: 'All Recipes',
          categoryImage: '',
        });
        let i;
        for (i = 0; i < homeData.categoryList.length; i++) {
          categoryArray.push({
            id: homeData.categoryList[i].id,
            value: homeData.categoryList[i].name,
            label: homeData.categoryList[i].name,
            categoryName: homeData.categoryList[i].name,
            categoryImage: homeData.categoryList[i].image,
          });
          categoryList.push({
            id: homeData.categoryList[i].id,
            value: homeData.categoryList[i].name,
            label: homeData.categoryList[i].name,
            categoryName: homeData.categoryList[i].name,
            categoryImage: homeData.categoryList[i].image,
          });
        }
      }
      setCategoryOptions(categoryArray);
      setCategoryList(categoryList);
    } else {
      toast.error('Something went wrong');
    }
  }, [recipeSerach, catFilter]);

  useEffect(() => {
    setRecipeSearch('');
    setSearch('');
    setCatFilter(categoryOptions[0]);
    setCategoryFilter(categoryOptions[0]);
  }, [router]);

  //Home2 Component
  const settings = {
    dots: false,
    arrows: true,
    infinite: categoryList.length > 6 ? true : true,
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

  const searchFunction = (e) => {
    e.preventDefault();
    setRecipeSearch(search);
    setCatFilter(categoryFilter);
    setClick(true);
    setIsSubmit(true);
  };

  const categoryOnChange = (categoryFilter) => {
    setCategoryFilter(categoryFilter);
  };

  const callBack = () => {
    // setRecipeSearch("");
    // setCatFilter("");
    setClick(false);
    setIsSubmit(false);
  };

  const searchFunc = async (e) => {
    let searchData = e.target.value;
    setSearch(searchData);
    setRecipeSearch(searchData);
    if (searchData.length > 2) {
      let data = {
        search: searchData,
        categoryId: categoryFilter ? categoryFilter.id : '',
      };
      let res = await suggestionApi(data);
      if (res && res.status === 200) {
        setSuggestionList(res.data.data.search);
      } else {
        setSuggestionList([]);
      }
    }
  };

  const suggestionApply = (item) => {
    setSuggestionList([]);
    setSearch(item);
    setRecipeSearch(item);
    let element = document.getElementById('myDiv');
    element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <section className='home-section-1'>
        <img
          // src='assets/images/home-section-1-bg.png'
          src={bannerImage || ''}
          className='img-fluid bg-image'
        />
        <div className='home-section-1-data title'>
          <Container fluid='md'>
            <Row className='justify-content-center text-center'>
              <Col xl={10} lg={10}>
                <h1
                  className={`${style.h1} mb-40 text-capitalize`}
                  style={{ whiteSpace: 'pre-wrap' }}
                >
                  {bannerHeading}
                </h1>
                <h3
                  className={`${style.h3} fw400 mb-45`}
                  style={{ whiteSpace: 'pre-wrap' }}
                >
                  {bannerSubHeading}
                </h3>
              </Col>
            </Row>
            <Form inline className='justify-content-center banner-form'>
              <FormGroup className='position-relative'>
                <Input
                  type='text'
                  autoComplete='off'
                  className='form-control'
                  name='name'
                  id='name'
                  value={search}
                  placeholder='Enter Keyword'
                  // ref={refSearch}
                  onChange={(e) => {
                    // setSearch(e.target.value);
                    searchFunc(e);
                  }}
                />
                {search.length > 2 ? (
                  suggestionList.length > 0 ? (
                    <div className='search-history'>
                      <ul>
                        {suggestionList.map((item) => (
                          <>
                            <li
                              onClick={() => {
                                suggestionApply(item.name);
                              }}
                            >
                              {item.name}
                            </li>
                          </>
                        ))}
                        {/* {suggestionList.length === 0 ? (
                        <li>No suggestion available</li>
                      ) : null} */}
                      </ul>
                    </div>
                  ) : null
                ) : null}
              </FormGroup>
              <FormGroup className='select-grp select-group'>
                <div className='min-215'>
                  <Select
                    placeholder='All Categories'
                    options={categoryOptions}
                    name='category'
                    value={categoryFilter}
                    onChange={categoryOnChange}
                    defaultValue={categoryOptions[0]}
                  />
                </div>
              </FormGroup>

              <div className='sm-text-center'>
                <Button
                  type='submit'
                  onClick={searchFunction}
                  disabled={isSubmit ? true : false}
                >
                  {isSubmit ? (
                    <Spinner className='inner-spinner' size='sm' />
                  ) : (
                    ' Search'
                  )}
                </Button>
              </div>
            </Form>
          </Container>
        </div>
      </section>
      {/* Start Home2 component */}
      <section className='home-section-2'>
        <Container fluid='md'>
          <div className='title'>
            <h2 className={style.h2}>What do you need help with</h2>
          </div>
          <Form>
            <Slider {...settings}>
              {categoryList.map((item) => (
                <div
                  className='main-slider-click'
                  onClick={() => {
                    router.push({
                      pathname: '/category',
                      query: { id: item.id },
                    });
                  }}
                >
                  <Card>
                    <div className='card-img-width'>
                      <img
                        src={item.categoryImage}
                        className='img-fluid'
                        alt={item.categoryName}
                      />
                    </div>
                    <CardBody className='bg-primary1'>
                      <h5 className='card-title'>{item.categoryName}</h5>
                    </CardBody>
                  </Card>
                </div>
              ))}
            </Slider>
          </Form>
        </Container>
      </section>
      {/* End Home2 component */}
      <Home3
        search={recipeSerach}
        categoryFilter={catFilter}
        callBack={callBack}
        click={click}
      />
    </>
  );
};

export default Home1;
