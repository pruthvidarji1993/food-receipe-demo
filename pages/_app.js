import React, { useState, useEffect } from 'react';
import '../styles/globals.scss';
import Head from 'next/head';
import Header from './header';
import Footer from './footer';
import Loginpopup from '../ui/loginPopup';
import { store } from '../redux/storeConfig/store';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { setLogInData, setLogInFlag } from '../redux/actions/auth/authAction';
import { profileData } from '../redux/actions/auth';
function MyApp({ Component, pageProps }) {
  // modal
  const [modal, setModal] = useState(false);
  const togglemodal = () => setModal(!modal);

  // tabs

  const [activeTab, setActiveTab] = useState('1');
  const toggletab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(async () => {
    let userData = localStorage.getItem('food_recipe_user');
    if (userData) {
      let userDataObject = JSON.parse(userData);
      await store.dispatch(setLogInData(userDataObject));
      await store.dispatch(setLogInFlag({ data: true }));
      const loginData = await profileData();
      if (loginData && loginData.status === 200) {
        await store.dispatch(setLogInData(loginData.data.data));

        localStorage.setItem(
          'food_recipe_user',
          JSON.stringify(loginData.data.data)
        );
      } else {
        await store.dispatch(setLogInData());
        await store.dispatch(setLogInFlag({ data: false }));
        localStorage.removeItem('food_recipe_user');
      }
    } else {
      await store.dispatch(setLogInData());
      await store.dispatch(setLogInFlag({ data: false }));
      localStorage.removeItem('food_recipe_user');
    }
  });

  useEffect(() => {
    if (localStorage) {
      toggletab();
    }
  }, []);

  return (
    <div>
      <Head>
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css'
        />
      </Head>
      <Provider store={store}>
        <ToastContainer
          position='top-right'
          transition={Slide}
          autoClose={4000}
        />
        <Header togglemodal={togglemodal} />
        <Component {...pageProps} />
        <Footer togglemodal={togglemodal} />
        <Loginpopup
          togglemodal={togglemodal}
          activeTab={activeTab}
          toggletab={toggletab}
          modal={modal}
          callBack={() => setActiveTab('1')}
        />
      </Provider>
    </div>
  );
}

export default MyApp;
