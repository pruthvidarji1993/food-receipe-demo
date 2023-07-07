let initialState = {
  values: {},
  loginFlag: false,
};

export const login = (state = initialState, action) => {
  switch (action.type) {
    case "USER_LOGIN": {
      return { ...state, values: action.payload };
    }
    case "SET_LOGIN_FLAG": {
      return { ...state, loginFlag: action.payload };
    }
    case "LOGOUT": {
      return { ...state, values: action.payload };
    }
    default: {
      return state;
    }
  }
};
