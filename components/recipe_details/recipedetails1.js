import React from 'react';
import { Table, Container, Button } from 'reactstrap';
import {
  FaRegClock,
  FaUsers,
  FaRegBookmark,
  FaShare,
  FaBookmark,
} from 'react-icons/fa';
import Iframe from 'react-iframe';
import ReactStars from 'react-rating-stars-component';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../ui/loadercustom';
import { store } from '../../redux/storeConfig/store';
import { addRemoveBookMark } from '../../redux/actions/apiActions/apiAction';
import style from '../../styles/common.module.scss';
import DifficultyFull from '../../public/assets/images/DifficultyFull.svg';
import DifficultyEmpty from '../../public/assets/images/DifficultyEmpty.svg';
import TeloFull from '../../public/assets/images/teloFull.svg';
import TeloEmpty from '../../public/assets/images/teloEmpty.svg';
import Image from 'next/image';
export default class Recipe1 extends React.Component {
  state = {
    bookmark: this.props.recipeDetail.isBookMarked || false,
    isSubmit: false,
  };
  ratingChanged = (newRating) => {
    console.log(newRating);
  };

  copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link is copied to the clipboard!');
  };
  bookmark = async () => {
    let loginUser = store.getState().login.loginFlag
      ? store.getState().login.loginFlag.data
      : false;
    if (loginUser === true) {
      this.setState({ isSubmit: true, bookmark: !this.state.bookmark });
      let res = await addRemoveBookMark(this.props.recipeDetail.id);
      if (res && res.status === 200) {
        if (res.data.data.isBookmarked === true) {
          toast.success('Recipe bookmarked successfully');
        } else if (res.data.data.isBookmarked === false) {
          toast.success('Recipe bookmark removed successfully');
        }
      } else {
        toast.error('Something went wrong');
      }
      this.setState({ isSubmit: false });
    } else {
      toast.error('Please login first for bookmark the recipe');
    }
  };

  render() {
    const starValue = {
      value: this.props.recipeDetail.difficulty,
      size: 30,
      count: 5,
      color: '#dce0e3',
      activeColor: '#ff8700',
      a11y: true,
      emptyIcon: (
        <Image
          src={DifficultyEmpty}
          width={32}
          height={32}
          className='img-fluid mr-25'
        />
      ),
      filledIcon: (
        <Image
          src={DifficultyFull}
          width={32}
          height={32}
          className='img-fluid mr-25'
        />
      ),
      onChange: (newValue) => {
        console.log(`star ${newValue}`);
      },
    };
    const TelomeresValue = {
      value: this.props.recipeDetail.telomeres,
      size: 30,
      count: 5,
      color: '#dce0e3',
      activeColor: '#ff8700',
      a11y: true,
      emptyIcon: (
        <Image
          src={TeloEmpty}
          width={30}
          height={40}
          className='img-fluid mr-25'
        />
      ),
      filledIcon: (
        <Image
          src={TeloFull}
          width={30}
          height={40}
          className='img-fluid mr-25'
        />
      ),
      onChange: (newValue) => {
        console.log(`star ${newValue}`);
      },
    };
    return (
      <>
        {this.props.recipeDetail !== '' && this.props.stardata !== '' ? (
          <section className='recipe-details-section-1'>
            <Container fluid='md'>
              <div className='recipe-details-section-1-data'>
                <div className='recipe-one'>
                  <h1 className={style.h1}>{this.props.recipeDetail.name}</h1>
                  <h3 className={`${style.h3} title`}>
                    Difficulty:
                    <span className='star-span' style={{ marginTop: '4px' }}>
                      <ReactStars {...starValue} />
                    </span>
                  </h3>
                  <h3 className={`${style.h3} title last`}>
                    Telomeres:
                    <span className='star-span' style={{ marginTop: '4px' }}>
                      <ReactStars {...TelomeresValue} />
                    </span>
                  </h3>
                  <Table>
                    <tbody>
                      <tr>
                        <td>
                          <h3 className={style.h3}>Prep Time:</h3>
                        </td>
                        <td>
                          <h3 className={`${style.h3} f29`}>
                            <FaRegClock className='primary-icon' />
                            <span>
                              {this.props.recipeDetail.preparationTime} Min
                            </span>
                          </h3>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h3 className={style.h3}>Cook Time:</h3>
                        </td>
                        <td>
                          <h3 className={`${style.h3} f29`}>
                            <FaRegClock className='primary-icon' />
                            <span>{this.props.recipeDetail.cookTime} Min</span>
                          </h3>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h3 className={style.h3}>Serving:</h3>
                        </td>
                        <td>
                          <h3 className={`${style.h3} f29`}>
                            <FaUsers className='primary-icon' />
                            <span>2 Person</span>
                          </h3>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h3 className={`${style.h3} mb-0`}>Gluten:</h3>
                        </td>
                        <td>
                          <ul className='rank-ul'>
                            <li
                              className={`${
                                this.props.recipeDetail.gluten === 'zero' ||
                                !this.props.recipeDetail.gluten
                                  ? 'success'
                                  : ''
                              }`}
                            >
                              Zero
                            </li>
                            <li
                              className={`${
                                this.props.recipeDetail.gluten === 'low'
                                  ? 'warning'
                                  : ''
                              }`}
                            >
                              Low
                            </li>
                            <li
                              className={`${
                                this.props.recipeDetail.gluten === 'normal'
                                  ? 'danger'
                                  : ''
                              }`}
                            >
                              Normal
                            </li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h3 className={`${style.h3} mb-0`}>Casein:</h3>
                        </td>
                        <td>
                          <ul className='rank-ul'>
                            <li
                              className={`${
                                this.props.recipeDetail.casein === 'zero' ||
                                !this.props.recipeDetail.casein
                                  ? 'success'
                                  : ''
                              }`}
                            >
                              Zero
                            </li>
                            <li
                              className={`${
                                this.props.recipeDetail.casein === 'low'
                                  ? 'warning'
                                  : ''
                              }`}
                            >
                              Low
                            </li>
                            <li
                              className={`${
                                this.props.recipeDetail.casein === 'normal'
                                  ? 'danger'
                                  : ''
                              }`}
                            >
                              Normal
                            </li>
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                  <div className='share-buttons'>
                    <Button className='shape-btn share' onClick={this.copyLink}>
                      <div className='h-100 w-100 d-flex align-items-center justify-content-center'>
                        <FaShare />
                      </div>
                    </Button>
                    <Button
                      className='shape-btn bookmark'
                      onClick={this.bookmark}
                      disabled={this.state.isSubmit ? true : false}
                    >
                      <div className='h-100 w-100 d-flex align-items-center justify-content-center'>
                        {this.state.bookmark ? (
                          <FaBookmark className='text-primary1' />
                        ) : (
                          <FaRegBookmark />
                        )}
                      </div>
                    </Button>
                  </div>
                </div>
                <div className='recipe-two'>
                  <Iframe
                    url={this.props.recipeDetail.mediaURL}
                    width='100%'
                    height='537px'
                    rel='0'
                    allowFullScreen
                    id='iframecustom'
                    frameBorder='0'
                    className='iframe-custom'
                    display='initial'
                    position='relative'
                  />
                </div>
              </div>
            </Container>
          </section>
        ) : (
          <Loader />
        )}
      </>
    );
  }
}
