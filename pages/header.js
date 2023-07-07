import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Avatar1 from '../public/assets/images/custom/dummy.png';
import { useRouter } from 'next/router';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  UncontrolledDropdown,
  Nav,
  NavItem,
  Container,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from 'reactstrap';
import { FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import Router from 'next/router';
import { handleLogout } from '../redux/actions/auth';
import {
  getAllNotification,
  deleteNotification,
  readNotification,
  getNewNotification,
} from '../redux/actions/apiActions/apiAction';
import { toast } from 'react-toastify';
import { GlobalVariable } from '../constants/util/globleVariable';

const Header = ({ togglemodal }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.login);
  const [isAuthenticate, setIsAuthenticate] = useState(false);
  const [loginData, setLoginData] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [avatar, setAvatar] = useState(Avatar1.src);
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);
  const [notificationArray, setNotificationArray] = useState([]);
  const [timeStamp, setTimeStamp] = useState(0);
  const toggle = () => setIsOpen(!isOpen);

  const clickEventHandler2 = (link) => {
    Router.push(link);
  };
  const clickEventHandler = (link) => {
    toggle();
    Router.push(link);
  };

  const logOutHandler = async () => {
    setIsAuthenticate(false);
    setLoginData('');
    await dispatch(handleLogout());
    setAvatar(Avatar1.src);
    clickEventHandler2('/');
  };

  // dropdown

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggledropdown = () => setDropdownOpen((prevState) => !prevState);
  //update user data
  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem('food_recipe_user'));
    if (userData) {
      setLoginData(userData.userName);
    }
    if (userData && userData.image !== '') {
      setAvatar(userData.image);
    } else {
      setAvatar(Avatar1.src);
    }
    if (state && state.loginFlag && state.loginFlag.data) {
      setIsAuthenticate(state.loginFlag.data);
    }
  }, [state, isAuthenticate, state.loginFlag, loginData, avatar]);

  //get all notification first time
  useEffect(async () => {
    let userData = JSON.parse(localStorage.getItem('food_recipe_user'));
    if (userData) {
      let res = await getAllNotification(userData.id);
      if (res && res.status === 200) {
        setNotificationArray(res.data.data.notifications);
        setUnreadNotificationCount(res.data.data.unreadNotificationCount);
        setTimeStamp(res.data.data.timeStamp);
      } else {
        toast.error('Something went wrong');
      }
    }
  }, []);

  //get new notification data
  const newNotificationFunc = async () => {
    let userData = JSON.parse(localStorage.getItem('food_recipe_user'));
    if (userData) {
      let data = {
        timeStamp: timeStamp,
      };
      let res = await getNewNotification(data);
      if (res && res.status === 200) {
        setTimeStamp(res.data.data.timeStamp);
        setUnreadNotificationCount(res.data.data.unreadNotificationCount);
        if (res.data.data.notifications.length > 0) {
          let newData = res.data.data.notifications;
          let oldNotificationArray = [...notificationArray];
          let newNotificationArray = newData.concat(oldNotificationArray);
          setNotificationArray(newNotificationArray);
        }
      } else {
        toast.error('Something went wrong');
      }
    }
  };
  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      let id = setInterval(() => {
        savedCallback.current();
      }, delay);
      return () => clearInterval(id);
    }, [delay]);
  }

  useInterval(() => {
    newNotificationFunc();
  }, GlobalVariable.timeStampForNewNotificationCall);

  const deleteSingleNotification = async (e, item, i) => {
    let userData = JSON.parse(localStorage.getItem('food_recipe_user'));
    if (userData) {
      let data = {
        isAll: false,
        id: item.id,
      };
      let res = await deleteNotification(data);
      if (res && res.status === 200) {
        let oldNotificationArray = [...notificationArray];
        oldNotificationArray.splice(i, 1);
        setNotificationArray(oldNotificationArray);
        if (item.isRead === false) {
          setUnreadNotificationCount(unreadNotificationCount - 1);
        }
        toast.success('Notification deleted successfully');
      } else {
        toast.error('Something went wrong');
      }
    }
  };

  const deleteAllNotification = async () => {
    let userData = JSON.parse(localStorage.getItem('food_recipe_user'));
    if (userData) {
      let data = {
        isAll: true,
      };
      let res = await deleteNotification(data);
      if (res && res.status === 200) {
        setNotificationArray([]);
        setUnreadNotificationCount(0);
        toast.success('All notifications deleted successfully');
      } else {
        toast.error('Something went wrong');
      }
    }
  };

  const markReadNotification = async (e, item, i) => {
    let id = e.target.id;
    if (id === 'outer-div') {
      if (item.isRead === false) {
        let userData = JSON.parse(localStorage.getItem('food_recipe_user'));
        if (userData) {
          let data = {
            id: item.id,
            userId: userData.id,
          };
          let res = await readNotification(data);
          if (res && res.status === 200) {
            let oldNotificationArray = [...notificationArray];
            let getIndexOfData = oldNotificationArray[i];
            getIndexOfData['isRead'] = true;
            oldNotificationArray[i] = getIndexOfData;
            setNotificationArray(oldNotificationArray);
            setUnreadNotificationCount(unreadNotificationCount - 1);
            setDropdownOpen(false);
            setIsOpen(false);
            router.push({
              pathname: '/recipedetail',
              query: { id: item.recipeId },
            });
          } else {
            toast.error('Something went wrong');
          }
        }
      } else {
        setDropdownOpen(false);
        setIsOpen(false);
        router.push({
          pathname: '/recipedetail',
          query: { id: item.recipeId },
        });
      }
    }
  };
  return (
    <>
      <header onMouseLeave={() => setDropdownOpen(false)}>
        <Navbar color='white' light expand='lg'>
          <Container fluid='md' className='d-block'>
            <div className='d-flex justify-content-between align-items-center'>
              <NavbarToggler onClick={toggle} />
              <NavbarBrand
                className='cursor-pointer'
                onClick={() => clickEventHandler2('/')}
              >
                {/* <img
                  src='/assets/images/logo.svg'
                  width='322'
                  height='76'
                  className='img-fluid'
                /> */}
                <p className='navbar-brand-text-new'>
                  Umami <span>Recipe</span>
                </p>
              </NavbarBrand>

              <div className='d-flex align-items-center'>
                {state && state.loginFlag && state.loginFlag.data ? (
                  <div className='coms small-coms d-lg-none d-inline mr-2'>
                    <UncontrolledDropdown inNavbar>
                      <DropdownToggle
                        tag='button'
                        className='btn btn-secondary'
                        nav
                      >
                        <img
                          src={avatar}
                          className='user-drop-image img-fluid'
                          alt=''
                        />
                        <div className='caret'>
                          <img
                            src='assets/images/white-caret.png'
                            className='img-fluid'
                            alt=''
                          />
                        </div>
                        {unreadNotificationCount !== undefined &&
                        unreadNotificationCount !== null &&
                        unreadNotificationCount > 0 ? (
                          <div className='small-dots online'></div>
                        ) : null}
                      </DropdownToggle>
                      <DropdownMenu>
                        <div className='arrows'></div>
                        <DropdownItem>
                          <Link href='/profile' className=''>
                            Settings
                          </Link>
                        </DropdownItem>
                        <DropdownItem>
                          <Link href='/savedrecipe' className=''>
                            Saved Recipes
                          </Link>
                        </DropdownItem>
                        {notificationArray.map((item, i) => (
                          <div>
                            <DropdownItem divider />
                            <div className='dropdown-item hover-none'>
                              <p
                                className={
                                  item.isRead === false
                                    ? 'not_arrow active'
                                    : 'not_arrow'
                                }
                                id='outer-div'
                              >
                                <div
                                  id='outer-div'
                                  onClick={(e) =>
                                    markReadNotification(e, item, i)
                                  }
                                >
                                  Check out our new recipe:
                                  <span id='outer-div'>{item.message}</span>
                                </div>
                                <div
                                  className='remove-item-drop'
                                  id='inner-div'
                                >
                                  <img
                                    src='assets/images/notification-remove.svg'
                                    width='16'
                                    height='16'
                                    className='img-fluid'
                                    id='inner-div'
                                    alt=''
                                    onClick={(e) =>
                                      deleteSingleNotification(e, item, i)
                                    }
                                  />
                                </div>
                              </p>
                            </div>
                          </div>
                        ))}
                        {notificationArray.length > 0 ? (
                          <div>
                            <DropdownItem divider />
                            <div className='dropdown-item hover-none mt-0'>
                              <p
                                className='not_arrow fs18'
                                onClick={() => deleteAllNotification()}
                              >
                                Delete all notifications
                              </p>
                            </div>
                          </div>
                        ) : null}
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                ) : null}
                <Collapse isOpen={isOpen} navbar className='web-colapse'>
                  <Nav className='ml-auto ' navbar>
                    <NavItem className='text-capitalize'>
                      <Link href='/' className='nav-link'>
                        <a
                          className={
                            router.pathname == '/' ? 'active-class' : ''
                          }
                        >
                          Home
                        </a>
                      </Link>
                    </NavItem>
                    <NavItem>
                      <Link href='/about' className='nav-link'>
                        <a
                          className={
                            router.pathname == '/about' ? 'active-class' : ''
                          }
                        >
                          About us
                        </a>
                      </Link>
                    </NavItem>
                    {state && state.loginFlag && state.loginFlag.data ? null : (
                      <NavItem>
                        <p
                          onClick={togglemodal}
                          className='nav-link mb-0 text-capitalize'
                        >
                          Login
                        </p>
                      </NavItem>
                    )}
                    {state && state.loginFlag && state.loginFlag.data ? (
                      <NavItem className='name small-mr d-lg-inline-block d-none'>
                        <span className='nav-link none'>{loginData}</span>
                      </NavItem>
                    ) : null}

                    {state && state.loginFlag && state.loginFlag.data ? (
                      <NavItem className='drops small-mr coms d-lg-inline-block d-none'>
                        <UncontrolledDropdown
                          inNavbar
                          isOpen={dropdownOpen}
                          onMouseEnter={() => setDropdownOpen(true)}
                        >
                          <DropdownToggle
                            tag='button'
                            className='btn btn-secondary'
                            nav
                          >
                            <img
                              src={avatar}
                              className='user-drop-image img-fluid'
                              alt=''
                            />
                            <div className='caret'>
                              <img
                                src='assets/images/white-caret.png'
                                className='img-fluid'
                                alt=''
                              />
                            </div>
                            {unreadNotificationCount !== 0 ? (
                              <div className='small-dots online'></div>
                            ) : null}
                          </DropdownToggle>
                          <DropdownMenu
                            onMouseLeave={() => setDropdownOpen(false)}
                          >
                            <div className='arrows'></div>
                            <DropdownItem>
                              <Link href='/profile' className=''>
                                Settings
                              </Link>
                            </DropdownItem>
                            <DropdownItem>
                              <Link href='/savedrecipe' className=''>
                                Saved Recipes
                              </Link>
                            </DropdownItem>
                            {notificationArray.map((item, i) => (
                              <div>
                                <DropdownItem divider />
                                <div className='dropdown-item hover-none'>
                                  <p
                                    className={
                                      item.isRead === false
                                        ? 'not_arrow active'
                                        : 'not_arrow'
                                    }
                                    id='outer-div'
                                    onClick={(e) =>
                                      markReadNotification(e, item, i)
                                    }
                                  >
                                    Check out our new recipe:
                                    <span id='outer-div'>{item.message}</span>
                                    <div
                                      className='remove-item-drop'
                                      id='inner-div'
                                    >
                                      <img
                                        src='assets/images/notification-remove.svg'
                                        width='16'
                                        height='16'
                                        className='img-fluid'
                                        alt=''
                                        id='inner-div'
                                        onClick={(e) =>
                                          deleteSingleNotification(e, item, i)
                                        }
                                      />
                                    </div>
                                  </p>
                                </div>
                              </div>
                            ))}
                            {notificationArray.length > 0 ? (
                              <div>
                                <DropdownItem divider />
                                <div className='dropdown-item hover-none mt-0'>
                                  <p
                                    className='not_arrow fs18'
                                    onClick={() => deleteAllNotification()}
                                  >
                                    Delete all notifications
                                  </p>
                                </div>
                              </div>
                            ) : null}
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </NavItem>
                    ) : null}
                    {state && state.loginFlag && state.loginFlag.data ? (
                      <NavItem>
                        <p className='nav-link mb-0' onClick={logOutHandler}>
                          Logout
                          <img
                            src='/assets/images/logout-icon.png'
                            width='25'
                            height='25'
                            className='logout-icon img-fluid'
                            alt=''
                          />
                        </p>
                      </NavItem>
                    ) : null}
                  </Nav>
                </Collapse>
              </div>
            </div>

            <Collapse isOpen={isOpen} navbar className='mobile-colapse'>
              <Nav className='ml-auto text-capitalize' navbar>
                <NavItem className='btn-item'>
                  <div className='d-flex w-100 justify-content-between align-items-center'>
                    <div>
                      {/* <img
                        src='/assets/images/logo.svg'
                        width=''
                        height=''
                        className='main-logo img-fluid'
                      /> */}
                      <p className='navbar-brand-text-new-sidebar'>
                        Umami <span>Recipe</span>
                      </p>
                    </div>
                    <div>
                      <Button
                        color='null'
                        onClick={toggle}
                        className='sidebar-close-color'
                      >
                        <FaTimes />
                      </Button>
                    </div>
                  </div>
                </NavItem>
                <NavItem>
                  <p
                    className='nav-link mb-0'
                    onClick={() => clickEventHandler('/')}
                  >
                    <a className={router.pathname == '/' ? 'active-class' : ''}>
                      Home
                    </a>
                  </p>
                </NavItem>
                <NavItem>
                  <p
                    className='nav-link mb-0'
                    onClick={() => clickEventHandler('/about')}
                  >
                    <a
                      className={
                        router.pathname == '/about' ? 'active-class' : ''
                      }
                    >
                      About us
                    </a>
                  </p>
                </NavItem>
                {state && state.loginFlag && state.loginFlag.data ? null : (
                  <NavItem>
                    <p
                      onClick={() => {
                        toggle();
                        togglemodal();
                      }}
                      className='nav-link mb-0'
                    >
                      Login
                    </p>
                  </NavItem>
                )}
                {state && state.loginFlag && state.loginFlag.data ? (
                  <NavItem>
                    <p className='nav-link mb-0' onClick={logOutHandler}>
                      Logout
                    </p>
                  </NavItem>
                ) : null}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default Header;
