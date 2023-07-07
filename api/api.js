import { GlobalVariable } from '../constants/util/globleVariable';
import { store } from '../redux/storeConfig/store';
import { setLogInFlag } from '../redux/actions/auth/authAction';

const axios = require('axios');

const mainUrl = GlobalVariable.apiUrl.mainUrl;
export const api = async (endpoint, data, type) => {
  let tokenFromLocal = await JSON.parse(
    localStorage.getItem('food_recipe_user')
  );
  let res = {};
  let token = (await store.getState().login.values)
    ? store.getState().login.values.token
    : tokenFromLocal
    ? tokenFromLocal.token
    : '';

  try {
    let cancel;
    switch (type) {
      case 'post':
        res = await axios({
          data,
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'x-auth': token,
          },
          url: mainUrl + endpoint,
        });
        break;
      case 'postWithFormData':
        res = await axios({
          data,
          method: 'post',
          headers: {
            'Content-Type': 'multipart/form-data',
            'x-auth': token,
          },
          url: mainUrl + endpoint,
        });
        break;
      case 'get':
        res = await axios({
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            'x-auth': token,
          },
          url: mainUrl + endpoint,
          // cancelToken: new axios.CancelToken((c) => (cancel = c)),
        });
        break;
      case 'patch':
        res = await axios({
          method: 'patch',
          data,
          headers: {
            'Content-Type': 'application/json',
            'x-auth': token,
          },
          url: mainUrl + endpoint,
        });

        break;
      case 'delete':
        res = await axios({
          data,
          method: 'delete',
          headers: {
            'Content-Type': 'application/json',
            'x-auth': token,
          },
          url: mainUrl + endpoint,
        });
        break;
      case 'postWithoutToken':
        res = await axios({
          method: 'post',
          data,
          headers: {
            'Content-Type': 'application/json',
          },
          url: mainUrl + endpoint,
        });
        break;
      case 'getWithoutToken':
        res = await axios({
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
          },
          url: mainUrl + endpoint,
        });
        break;
      default:
        return true;
    }
  } catch (err) {
    if (err.response.status === 400) {
      res = err.response;
    }
    if (
      err.response.status === 401 ||
      err.response.status === 403 ||
      err.response.status === 503
    ) {
      localStorage.removeItem('food_recipe_user');
      store.dispatch({ type: 'LOGOUT' });
      store.dispatch(setLogInFlag(false));
      res = err.response;
    }
  }
  return res;
};
