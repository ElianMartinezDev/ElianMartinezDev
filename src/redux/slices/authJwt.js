import jwtDecode from 'jwt-decode';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import configApp from '../../config';
// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  isError: false,
  user: {},
  roles: [],
};

const slice = createSlice({
  name: 'authJwt',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state, action) {
      state.isLoading = action.payload;
    },
    hasError(state) {
      state.isLoading = false;
      state.isError = true;
    },
    // INITIALISE
    getInitialize(state, action) {
      state.isLoading = false;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
      state.roles = action.payload.roles;
    },
    // LOGIN
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.roles = action.payload.roles;
    },
    // REGISTER
    registerSuccess(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.roles = action.payload.roles;
    },
    // LOGOUT
    logoutSuccess(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.roles = [];
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function setLoad(val) {
  return (dispatch) => {
    dispatch(slice.actions.startLoading(val));
  };
}

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;
  return decoded.exp > currentTime;
};

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

// ----------------------------------------------------------------------

export function errorlogin(val) {
  return (dispatch) => {
    dispatch(slice.actions.hasError(val));
  };
}

export function login(data) {
  return (dispatch) => {
    const { accessToken, user, roles } = data.data;
    setSession(accessToken);
    dispatch(slice.actions.loginSuccess({ user, roles }));
  };
}

export function logout() {
  return async (dispatch) => {
    setSession(null);
    dispatch(slice.actions.logoutSuccess());
  };
}

// ----------------------------------------------------------------------

export function getInitialize() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading(true));

    try {
      const accessToken = window.localStorage.getItem('accessToken');
      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);
        const url = `${configApp.baseUrl}/whome`;
        const response = await axios.get(url);
        dispatch(
          slice.actions.getInitialize({
            isAuthenticated: true,
            user: response.data.user,
            roles: response.data.roles,
          })
        );
      } else {
        dispatch(
          slice.actions.getInitialize({
            isAuthenticated: false,
            user: null,
          })
        );
      }
    } catch (error) {
      console.error(error);
      dispatch(
        slice.actions.getInitialize({
          isAuthenticated: false,
          user: null,
        })
      );
    }
  };
}
