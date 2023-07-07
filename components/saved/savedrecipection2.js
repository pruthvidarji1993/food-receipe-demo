import React, { useState, useEffect } from 'react';
import {
  Form,
  Col,
  Container,
  FormGroup,
  Label,
  Row,
  Card,
  CardBody,
} from 'reactstrap';
import Link from 'next/link';
import Select from 'react-select';
import { getAllBookMarked } from '../../redux/actions/apiActions/apiAction';
import { FaRegClock } from 'react-icons/fa';
import Rating from 'react-rating';
import { Star } from 'react-feather';
import InfiniteScroll from 'react-infinite-scroll-component';
import style from '../../styles/common.module.scss';

const options = [
  { value: 'latestToOldest', label: 'Latest to Oldest' },
  { value: 'oldestToLatest', label: 'Oldest to Latest' },
  {
    value: 'highestToLowestTime',
    label: 'Highest to Lowest Total Time',
  },
  {
    value: 'lowestToHighestTime',
    label: 'Lowest to Highest Total Time',
  },
  { value: 'highestToLowestRating', label: 'Highest to Lowest Rating' },
  { value: 'lowestToHighestRating', label: 'Lowest to Highest Rating' },
];

export default function SavedRecipe2(props) {
  const [recipe, setRecipe] = useState([]);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [sortList, setSortList] = useState('latestToOldest');

  //scrolling states
  const [hasMore, setHasMore] = useState(false);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(async () => {
    setPage(1);
    setSortList('latestToOldest');
    setSelectedOption(options[0]);
    let res = await getAllBookMarked('latestToOldest', props.categoryFilter, 1);
    if (res && res.status === 200) {
      let homeData = res.data.data;
      setCount(homeData.recipeCount);
      if (homeData.recipeCount > 10) {
        setHasMore(true);
      } else {
        setHasMore(false);
      }
      let recipeArray = [];
      if (homeData.recipe.length > 0) {
        let j;
        for (j = 0; j < homeData.recipe.length; j++) {
          recipeArray.push({
            id: homeData.recipe[j].id,
            recipeImage: homeData.recipe[j].image,
            recipeName: homeData.recipe[j].name,
            recipeCookTime: homeData.recipe[j].cookTime,
            recipePreparationTime: homeData.recipe[j].preparationTime,
            averageRating: homeData.recipe[j].averageRating,
          });
        }
      }
      setRecipe(recipeArray);
    } else {
      toast.error('Something went wrong');
    }
  }, [props.categoryFilter]);

  useEffect(async () => {
    setPage(1);
    let res = await getAllBookMarked(sortList, props.categoryFilter, 1);
    if (res && res.status === 200) {
      let homeData = res.data.data;
      setCount(homeData.recipeCount);
      if (homeData.recipeCount > 10) {
        setHasMore(true);
      } else {
        setHasMore(false);
      }
      let recipeArray = [];
      if (homeData.recipe.length > 0) {
        let j;
        for (j = 0; j < homeData.recipe.length; j++) {
          recipeArray.push({
            id: homeData.recipe[j].id,
            recipeImage: homeData.recipe[j].image,
            recipeName: homeData.recipe[j].name,
            recipeCookTime: homeData.recipe[j].cookTime,
            recipePreparationTime: homeData.recipe[j].preparationTime,
            averageRating: homeData.recipe[j].averageRating,
          });
        }
      }
      setRecipe(recipeArray);
    } else {
      toast.error('Something went wrong');
    }
  }, [sortList]);

  const paginationApi = async () => {
    let res = await getAllBookMarked(sortList, props.categoryFilter, page + 1);
    setPage(page + 1);
    if (res && res.status === 200) {
      let homeData = res.data.data;
      let totalData = homeData.recipeCount - page * 10;
      if (totalData <= 0) {
        setHasMore(false);
      }
      setCount(homeData.recipeCount);
      let recipeArray = [];
      if (homeData.recipe.length > 0) {
        let j;
        for (j = 0; j < homeData.recipe.length; j++) {
          recipeArray.push({
            id: homeData.recipe[j].id,
            recipeImage: homeData.recipe[j].image,
            recipeName: homeData.recipe[j].name,
            recipeCookTime: homeData.recipe[j].cookTime,
            recipePreparationTime: homeData.recipe[j].preparationTime,
            averageRating: homeData.recipe[j].averageRating,
          });
        }
      }
      let array = [...recipe, ...recipeArray];
      setRecipe(array);
    } else {
      toast.error('Something went wrong');
    }
  };

  return (
    <section className='home-section-3'>
      <Container fluid='md'>
        <div className='home-section-3-data position-relative'>
          <div className='content-right-data for-saved-recipe common-categary'>
            <Row className='mb-40 align-items-center'>
              <Col xl={6} lg={12}>
                <div className='title d-flex align-items-center xl-mb-4'>
                  <h2 className={`${style.h2} mb-0 lh-40`}>
                    {props.categoryName === ''
                      ? 'All Saved Recipes'
                      : `Saved Recipes - ${props.categoryName}`}
                  </h2>
                </div>
              </Col>
              <Col xl={6} lg={12}>
                <Form inline className='justify-content-end small-start'>
                  <FormGroup className='mb-0 sort-bar'>
                    <Label className='mr-3 pr-0 mb-0 label-text'>
                      Sort By :
                    </Label>
                    <div className='min-215'>
                      <Select
                        value={selectedOption}
                        options={options}
                        defaultValue={[options[0]]}
                        onChange={(val) => {
                          setSortList(val.value);
                          setSelectedOption(val);
                        }}
                      />
                    </div>
                  </FormGroup>
                </Form>
              </Col>
            </Row>
            {/* <RightDatabar /> */}
            <InfiniteScroll
              dataLength={recipe.length}
              next={paginationApi}
              hasMore={hasMore}
              style={{ overflow: 'none' }}
              loader={
                <Row>
                  <Col xl={12} className='text-center mt-4'>
                    <img
                      src='/assets/images/loader.svg'
                      width='32'
                      height='32'
                      className='img-fluid rotate-img'
                      alt='cap'
                    />
                  </Col>
                </Row>
              }
              // endMessage={<h4>Nothing more to show</h4>}
            >
              <Row className='recipe-row'>
                {recipe.map((item, i) => (
                  <Col xl={3} lg={4} md={6} sm={6} className='set-padding'>
                    <Card className='recipe-card'>
                      <Link
                        href={{
                          pathname: '/recipedetail',
                          query: { id: item.id },
                        }}
                        className='cursor-pointer'
                      >
                        <img
                          top
                          src={
                            item.recipeImage || '/assets/images/Dummy-card.png'
                          }
                          className='img-fluid cursor-pointer set-img-height '
                          alt={item.recipeName}
                        />
                      </Link>
                      <CardBody>
                        <Link
                          href={{
                            pathname: '/recipedetail',
                            query: { id: item.id },
                          }}
                          className='card-title'
                        >
                          {item.recipeName}
                        </Link>
                        <ul className='first'>
                          <li>
                            <FaRegClock className='time-icon' />
                            <span>{item.recipePreparationTime}M</span>
                          </li>
                          <li>|</li>
                          <li>
                            <FaRegClock className='time-icon' />
                            <span>{item.recipeCookTime}M</span>
                          </li>
                        </ul>
                        <ul className='second'>
                          <li>
                            <span>(Prep Time)</span>
                          </li>
                          <li>
                            <span>(Cook Time)</span>
                          </li>
                        </ul>
                        <div className='star-data'>
                          <Rating
                            className='mt-25'
                            emptySymbol={
                              <Star size={15} fill='#cbcbcb' stroke='#cbcbcb' />
                            }
                            fullSymbol={
                              <Star
                                size={15}
                                fill={'#96be2c'}
                                stroke={'#96be2c'}
                              />
                            }
                            initialRating={item.averageRating}
                            direction='ltr'
                          />
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
              </Row>
            </InfiniteScroll>
            {recipe.length === 0
              ? 'Recipe not available in this category'
              : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
