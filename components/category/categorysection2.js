import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  getHomePageData,
  getTopRecipeDetail,
} from '../../redux/actions/apiActions/apiAction';
import { FaRegClock } from 'react-icons/fa';
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Label,
  Row,
  Card,
  CardBody,
} from 'reactstrap';
import { FaBars } from 'react-icons/fa';
import ReactStars from 'react-rating-stars-component';
import Link from 'next/link';
import Select from 'react-select';
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

// startdata
const stardata = {
  size: 16,
  count: 5,
  color: '#dce0e3',
  activeColor: '#ff8700',
  value: 3,
  a11y: true,
  emptyIcon: <i className='fa fa-star' />,
  filledIcon: <i className='fa fa-star' />,
  onChange: (newValue) => {
    console.log(`star ${newValue}`);
  },
};

export default function Category2(props) {
  const router = useRouter();
  let cId = router.query.id; // category ID
  const [show, setShow] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [sortList, setSortList] = useState('latestToOldest');
  const [categoryData, setCategoryData] = useState({});
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [constOption, setConstOption] = useState('');
  const [recipe, setRecipe] = useState([]);
  const [topRecipeOptions, setTopRecipeOptions] = useState([]);
  const [catId, setCatId] = useState();

  //scrolling states
  const [hasMore, setHasMore] = useState(false);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);

  const handleToggle = () => {
    setShow(!show);
  };

  const selectCategory = (id) => {
    setPage(1);
    setCatId(id);
    let search = '';
    let categoryFilter = id;
    categoeyRecipeListing(search, categoryFilter, sortList, 1);
    props.callBack(id);
  };

  const categoeyRecipeListing = async (search, categoryFilter, sortList) => {
    let res = await getHomePageData(search, categoryFilter, sortList, 1);
    setPage(1);
    if (res && res.status === 200) {
      let homeData = res.data.data;
      setCount(homeData.recipeCount);
      let totalData = homeData.recipeCount - page * 10;
      if (totalData <= 0) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
      let categoryArray = [];
      if (homeData.categoryList.length > 0) {
        let i;
        for (i = 0; i < homeData.categoryList.length; i++) {
          if (categoryFilter == homeData.categoryList[i].id.toString()) {
            setCategoryData({
              id: homeData.categoryList[i].id,
              categoryName: homeData.categoryList[i].name,
              categoryImage: homeData.categoryList[i].image,
            });
          }
          categoryArray.push({
            id: homeData.categoryList[i].id,
            categoryName: homeData.categoryList[i].name,
            categoryImage: homeData.categoryList[i].image,
          });
        }
      }
      setCategoryOptions(categoryArray);

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
  };

  useEffect(() => {
    setCatId(cId);
  }, [cId]);

  useEffect(() => {
    if (
      props.categoryFilter !== undefined &&
      props.categoryFilter !== null &&
      props.categoryFilter !== ''
    ) {
      setCatId(props.categoryFilter);
    }
  }, [props.categoryFilter]);

  useEffect(async () => {
    if (!router.isReady) return;
    let search = '';
    let categoryFilter = cId;
    if (props.categoryFilter) {
      categoryFilter = props.categoryFilter;
      if (constOption !== categoryFilter) {
        setSelectedOption(options[0]);
        setSortList('latestToOldest');
        setConstOption(categoryFilter);
      }
    }
    categoeyRecipeListing(search, categoryFilter, sortList);
  }, [router.isReady, sortList, props]);

  useEffect(async () => {
    let topRecipe = await getTopRecipeDetail();
    if (topRecipe && topRecipe.status === 200) {
      setTopRecipeOptions(topRecipe.data.data);
    } else {
      toast.error('Something went wrong');
    }
  }, []);

  const paginationApi = async () => {
    let search = '';
    let res = await getHomePageData(search, catId, sortList, page + 1);
    setPage(page + 1);
    if (res && res.status === 200) {
      let homeData = res.data.data;
      setCount(homeData.recipeCount);
      let totalData = homeData.recipeCount - page * 10;
      if (totalData <= 0) {
        setHasMore(false);
      } else {
        setHasMore(true);
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
      let array = [...recipe, ...recipeArray];
      setRecipe(array);
    } else {
      setHasMore(false);
      toast.error('Something went wrong');
    }
  };

  return (
    <section className='home-section-3'>
      <Container fluid='md'>
        <div className='home-section-3-data position-relative'>
          <div className={show ? 'sidebar-data show' : 'sidebar-data'}>
            <div className='sidebar-card'>
              <div className='sidebar-header justify-content-start align-items-center d-lg-none d-flex py-3'>
                <div>
                  <p className='navbar-brand-text-new-sidebar'>
                    Umami <span>Recipe</span>
                  </p>
                </div>
                <Button
                  onClick={handleToggle}
                  color='close-color'
                  className='ml-3'
                >
                  <img
                    src='/assets/images/close-modal.png'
                    width='20'
                    height='20'
                    className='img-fluid'
                  />
                </Button>
              </div>
              <div className='scrollbar-data'>
                <div className='sidebar-header'>
                  <div>
                    <h4 className={`${style.h4} fw700 mb-0`}>Rankings</h4>
                  </div>
                </div>
                <div className='sidebar-body one'>
                  {topRecipeOptions.map((item, i) => (
                    <div className='loop'>
                      <div className='digit'>
                        <span>{i + 1}</span>
                      </div>
                      <div className='ranking-data'>
                        <Link
                          href={{
                            pathname: '/recipedetail',
                            query: { id: item.id },
                          }}
                        >
                          {`${item.name} (${+item.averageRating.toFixed(1)})`}
                        </Link>
                      </div>
                      <div className='star'>
                        <ReactStars
                          {...{
                            size: 16,
                            count: 5,
                            color: '#dce0e3',
                            activeColor: '#96be2c',
                            value: item.averageRating || 0,
                            a11y: true,
                            emptyIcon: <i className='fa fa-star' />,
                            filledIcon: <i className='fa fa-star' />,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className='sidebar-header two'>
                  <h4 className={`${style.h4} fw700 mb-0`}>Categories</h4>
                </div>
                <div className='sidebar-body two'>
                  {categoryOptions.map((item) => (
                    <div
                      className='loop'
                      onClick={() => {
                        document
                          .getElementById('myDiv')
                          .scrollIntoView({ behavior: 'smooth' });
                        selectCategory(item.id);
                        setSelectedOption(options[0]);
                        setSortList('latestToOldest');
                      }}
                    >
                      <div className='icon-data'>
                        <img
                          src={item.categoryImage}
                          className='img-fluid'
                          alt=''
                        />
                      </div>

                      <div className='categary-data'>
                        <h5>{item.categoryName}</h5>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className='content-right-data common-categary' id='myDiv'>
            <Row className='mb-40 align-items-center'>
              <Col xl={6} lg={12}>
                <div className='title d-flex align-items-center xl-mb-4'>
                  <Button
                    onClick={handleToggle}
                    color='primary'
                    className='d-lg-none d-flex mr-3'
                  >
                    <FaBars size='20' />
                  </Button>
                  <h2 className={`${style.h2} mb-0 lh-40`}>
                    {categoryData.categoryName}
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
                  <Col xl={4} lg={6} md={4} sm={6} className='set-padding'>
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
