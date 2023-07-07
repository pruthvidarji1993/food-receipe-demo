import React from 'react';
import { Container, Modal, ModalBody, Button } from 'reactstrap';
import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';
import ReactStars from 'react-rating-stars-component';
import { markAsHelpFulOrNot } from '../../redux/actions/apiActions/apiAction';
import { store } from '../../redux/storeConfig/store';
import { toast } from 'react-toastify';
import style from '../../styles/common.module.scss';

export default class Recipe5 extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    isSubmit: false,
    commentsArray: [],
    openModal: false,
    commentImage: '/assets/images/comment-image.png',
  };
  onClickButton = (url) => {
    if (url) {
      this.setState({ commentImage: url });
    }
    this.setState({ openModal: true });
  };
  onCloseModal = () => {
    this.setState({ openModal: false });
  };

  helpfulNotHelpful = async (item, type) => {
    let loginUser = store.getState().login.loginFlag
      ? store.getState().login.loginFlag.data
      : false;
    if (loginUser === true) {
      this.setState({ isSubmit: true, bookmark: !this.state.bookmark });
      let data = {
        id: item.id,
        isHelpful:
          item.isHelpful === 1
            ? false
            : item.isHelpful === 0
            ? true
            : type === 0
            ? false
            : true,
      };
      let res = await markAsHelpFulOrNot(data);
      if (res && res.status === 200) {
        this.props.callback();
      } else {
        toast.error('Something went wrong');
      }
      this.setState({ isSubmit: false });
    } else {
      toast.error('Please login first for liking / disliking the review');
    }
  };
  sameClick = () => {};

  render() {
    return (
      <div>
        {this.props.recipeDetail !== '' && this.props.commentData !== '' ? (
          <section className='recipe-details-section-5'>
            <Container fluid='md'>
              <div className='title'>
                <h2 className={`${style.h2} text-center`}>Comments</h2>
              </div>
              <ul className='recipe-details-section-5-data'>
                {this.props.commentData.map((item, i) => (
                  <li>
                    <div className='comment-data'>
                      <div className='comment-left'>
                        <div className='star'>
                          <ReactStars
                            {...{
                              size: 18,
                              count: 5,
                              color: '#cbcbcb',
                              activeColor: '#96be2c',
                              value: item.rating,
                              a11y: true,
                              emptyIcon: <i className='fa fa-star' />,
                              filledIcon: <i className='fa fa-star' />,
                            }}
                          />
                        </div>
                        <p className='user-title'>{item.fullName}</p>
                        <p className='user-date'>
                          {new Date(item.createdAt).toLocaleString('default', {
                            month: 'long',
                          })}{' '}
                          {('0' + new Date(item.createdAt).getDate()).slice(-2)}
                          , {new Date(item.createdAt).getFullYear()}
                        </p>
                      </div>
                      <div className='comment-right'>
                        {/* <p className='comment-title'>{item.comment}</p> */}
                        <p className='comment-description'>{item.comment}</p>

                        <ul className='comment-image-ul'>
                          {item.attachments.length > 0
                            ? item.attachments.map((url, i) => (
                                <li>
                                  <img
                                    onClick={() => this.onClickButton(url)}
                                    src={url}
                                    className='img-fluid'
                                    alt='attachment'
                                  />
                                </li>
                              ))
                            : null}
                        </ul>
                        <p className='comment-description dis'>
                          Was this review helpful?
                          <span className='view'>
                            <button
                              type='button'
                              className={
                                item.isHelpful === 1 || item.isHelpful === true
                                  ? 'yes active'
                                  : 'yes'
                              }
                              onClick={
                                item.isHelpful === 1 || item.isHelpful === true
                                  ? () => {
                                      this.sameClick();
                                    }
                                  : () => {
                                      this.helpfulNotHelpful(item, 1);
                                    }
                              }
                            >
                              <FaRegThumbsUp />
                              Yes
                            </button>
                            <button
                              type='button'
                              className={
                                item.isHelpful === 0 || item.isHelpful === false
                                  ? 'no active'
                                  : 'no'
                              }
                              onClick={
                                item.isHelpful === 0 || item.isHelpful === false
                                  ? () => {
                                      this.sameClick();
                                    }
                                  : () => {
                                      this.helpfulNotHelpful(item, 0);
                                    }
                              }
                            >
                              <FaRegThumbsDown />
                              No
                            </button>
                          </span>
                        </p>
                        {item.helpFul !== 0 && item.helpFul !== 1 ? (
                          <p className='comment-help'>
                            <span className='counts'>{item.helpFul}</span> users
                            found this review useful.
                          </p>
                        ) : item.helpFul === 0 ? (
                          <p className='comment-help'>
                            No user find this review useful yet.
                          </p>
                        ) : (
                          <p className='comment-help'>
                            <span className='counts'>{item.helpFul}</span> user
                            found this review useful.
                          </p>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
                {this.props.commentData.length === 0 ? (
                  <div className='text-center'>No Comments Available</div>
                ) : null}
              </ul>
            </Container>
            <Modal
              size='lg'
              isOpen={this.state.openModal}
              toggle={this.onCloseModal}
              className='modal-dialog-centered view-comment-img-modal cropped-modal'
            >
              <Button
                color='null'
                className='close-modal'
                onClick={this.onCloseModal}
              >
                <img
                  src='/assets/images/close-modal.png'
                  width='15'
                  height='15'
                  className='img-fluid'
                />
              </Button>
              <ModalBody>
                <img
                  src={this.state.commentImage}
                  onClick={() => this.onClickButton()}
                  className='img-fluid'
                  alt=''
                />
              </ModalBody>
            </Modal>
          </section>
        ) : null}
      </div>
    );
  }
}
