import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { Col, Row, Container } from 'reactstrap';
import Link from 'next/link';
import Router from 'next/router';
import { FaFacebookF, FaInstagram, FaRegEnvelope } from 'react-icons/fa';
import { useRouter } from 'next/router';

const Footer = ({ togglemodal }) => {
  const router = useRouter();
  const state = useSelector((state) => state.login);

  const [isAuthenticate, setIsAuthenticate] = useState(false);

  const clickEventHandler2 = (link) => {
    Router.push(link);
  };

  useEffect(() => {
    if (state && state.loginFlag) {
      setIsAuthenticate(state.loginFlag.data);
    }
    if (state.loginFlag === false) {
      setIsAuthenticate(state.loginFlag);
    }
  }, [state, isAuthenticate, state.loginFlag]);
  return (
    <footer>
      <Container fluid='md'>
        <div className='top-footer'>
          <Row className='align-items-center'>
            <Col xl={4} lg={6} md={7}>
              <div className='social-icon'>
                <ul className='md-center'>
                  <li>
                    <a href='#' title='facebook' className='icon facebook'>
                      <FaFacebookF />
                    </a>
                  </li>
                  <li>
                    <a href='#' title='Instagram' className='icon common'>
                      <FaInstagram />
                    </a>
                  </li>
                  <li>
                    <a
                      href='mailto:umami.recipe@topeaseintl.com'
                      title='Email'
                      className='icon mail'
                    >
                      <FaRegEnvelope />
                    </a>
                  </li>
                </ul>
              </div>
            </Col>
            <Col xl={3} lg={6} md={5} className='md-mt-30 md-center'>
              <div className='logo-image'>
                  {/* <img
                    src='/assets/images/footer-logo.png'
                    width='322'
                    height='76'
                    className='img-fluid cursor-pointer'
                    onClick={() => clickEventHandler2('/')}
                  /> */}
                  <p className="navbar-brand-text-new-footer cursor-pointer" onClick={() => clickEventHandler2('/')}>Umami <span>Recipe</span></p>
              </div>
            </Col>
            <Col xl={5} lg={12} className='xl-mt-30 sm-mt-15'>
              <div className='menu-data'>
                <ul className='xl-center'>
                  <li>
                    <Link href='/' className='nav-link'>
                      <a
                        className={router.pathname == '/' ? 'active-class' : ''}
                      >
                        Home
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href='/about' className='nav-link'>
                      <a
                        className={
                          router.pathname == '/about' ? 'active-class' : ''
                        }
                      >
                        About us
                      </a>
                    </Link>
                  </li>
                  {state && state.loginFlag && state.loginFlag.data ? null : (
                    <li>
                      <p
                        onClick={togglemodal}
                        className='nav-link cursor-pointer'
                      >
                        Login
                      </p>
                    </li>
                  )}

                  <li>
                    <Link href='/contact' className='nav-link'>
                      <a
                        className={
                          router.pathname == '/contact' ? 'active-class' : ''
                        }
                      >
                        Contact Us
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </div>
        <div className='bottom-footer'>
          <Row>
            <Col xl={7} lg={12}>
              <div className=''>
                <ul className='xl-center'>
                  <li>
                    <Link href='/' className='nav-link'>
                      Copyright © 2021 Umami Recipe
                    </Link>
                  </li>
                  <li>
                    <p className='nav-link hover-none'>All Rights Reserved</p>
                  </li>
                </ul>
              </div>
            </Col>
            <Col xl={5} lg={12}>
              <div className='text-right'>
                <ul className='xl-center xl-mt-15'>
                  <li>
                    <Link href='/terms' className='nav-link'>
                      <a
                        className={
                          router.pathname == '/terms' ? 'active-class' : ''
                        }
                      >
                        Terms & Conditions
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href='/privacypolicy' className='nav-link'>
                      <a
                        className={
                          router.pathname == '/privacypolicy'
                            ? 'active-class'
                            : ''
                        }
                      >
                        Privacy Policy
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
