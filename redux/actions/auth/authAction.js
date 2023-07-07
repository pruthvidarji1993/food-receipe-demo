export const setLogInData = (value) => {
  return {
    type: "USER_LOGIN",
    payload: value,
  };
};

export const setLogInFlag = (value) => {
  return {
    type: "SET_LOGIN_FLAG",
    payload: value,
  };
};
