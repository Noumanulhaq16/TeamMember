import { createContext, useEffect, useState, useReducer } from 'react';
import PropTypes from 'prop-types';
// utils
import axios from '../utils/axios';
import { isValidToken, setSession } from '../utils/jwt';
import useAuth from '../hooks/useAuth';

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  message: null,
  error: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
    };
  },
  // Global Methoed
  LOGIN: (state, action) => {
    console.log('payload received Login->', action.payload);
    const { user, message, error } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
      message,
      error
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
    message: null,
    error: null,
  }),
  REGISTER: (state, action) => {
    const { user, message, error } = action.payload;

    return {
      ...state,
      isAuthenticated: false,
      user,
      message,
      error
    };
  },
  RESETPASSWORD: (state, action) => {
    // console.log('payload received ->', action.payload);
    const { message } = action.payload;
    return {
      ...state,
      message
    };
  },
  VERIFYPASSWORD: (state, action) => {
    // console.log('payload received ->', action.payload);
    const { message } = action.payload;
    return {
      ...state,
      message
    };

  },
  // SuperAdmin Methods
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  // Global Api
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  ChangePath: () => Promise.resolve(),
  resetpassword: () => Promise.resolve(),
  verifypassword: () => Promise.resolve(),
  // Super Admin Api

});

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [pathname, setPathName] = useState('')
  const ChangePath = () => {
    setPathName(window.location.pathname)
    console.log(pathname, "Its Current Path")
  }
  useEffect(() => { ChangePath() }, [window.location.pathname])

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          const response = await axios.get(`/data`);
          const { user } = response.data;

          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user: null,

            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  // Global Apis
  const login = async (email, password) => {
    // console.log(pathname)
    if (pathname === '/superadmin/login') {
      // console.log('i Am SuperAdmin')
      const response = await axios.post('/api/superadmin/login', {
        email,
        password,
      });
      const { accessToken, user, status, error } = response.data;

      if (status === 'success') {
        // console.log('data==>', accessToken, user, status)
        setSession(accessToken);
        dispatch({
          type: 'LOGIN',
          payload: {
            user,
            error
          },
        });
      }
    }
    if (pathname === '/admin/login') {
      // console.log('i Am Admin')
      const response = await axios.post('/api/admin/login', {
        email,
        password,
      });
      const { accessToken, user, status, error } = response.data;

      if (status === 'success') {
        // console.log('data==>', accessToken, user, status)
        setSession(accessToken);
        dispatch({
          type: 'LOGIN',
          payload: {
            user,
            error
          },
        });
      }
    }
    if (pathname === '/agent/login') {
      const response = await axios.post('/api/agent/login', {
        email,
        password,
      });
      const { accessToken, user, status, error, message } = response.data;
      console.log(' response.data', response.data);
      // console.log('user', user);
      if (status === 'success') {
        localStorage.setItem('userID', user.id);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('userRole', user.role);
        setSession(accessToken);
        dispatch({
          type: 'LOGIN',
          payload: {
            user,
            message,
            error
          },
        });
      }
      if (status === 'failed') {
        dispatch({
          type: 'LOGIN',
          payload: {
            message,
            error
          },
        });
      }
    }
    if (pathname === '/salesman/login') {
      // console.log('i Am contractor')
      const response = await axios.post('/api/saleman/login', {
        email,
        password,
      });
      const { accessToken, user, status, message, error } = response.data;

      console.log('user', user);
      if (status === 'success') {
        localStorage.setItem('userID', user.id);
        setSession(accessToken);
        dispatch({
          type: 'LOGIN',
          payload: {
            user,
            message,
            error
          },
        });
      }
      if (status === 'failed') {
        dispatch({
          type: 'LOGIN',
          payload: {
            message,
            error
          },
        });
      }
    }
  };

  const register = async (email, password, firstname, lastname) => {
    if (pathname === '/salesman/register') {
      const response = await axios.post('/api/saleman/register', {
        email,
        password,
        firstname,
        lastname,
      });
      const { user, message, error } = response.data;
      // console.log(' response.data', response.data);  
      // window.localStorage.setItem('accessToken', accessToken);
      dispatch({
        type: 'REGISTER',
        payload: {
          user,
          message,
          error
        },
      });
    }
    if (pathname === '/agent/register') {
      const response = await axios.post('/api/agent/register', {
        email,
        password,
        firstname,
        lastname,
      });
      const { user, message, error } = response.data;
      // console.log(' response.data', response.data);  
      // window.localStorage.setItem('accessToken', accessToken);
      dispatch({
        type: 'REGISTER',
        payload: {
          user,
          message,
          error
        },
      });
    }

  };

  const logout = async () => {
    setSession(null);
    localStorage.clear();
    dispatch({ type: 'LOGOUT' });
  };

  const resetpassword = async (email) => {
    if (pathname === '/agent/reset-password') {
      const response = await axios.post(`api/agent/forgotpassword`, { email });
      const { message, error } = response.data;
      dispatch({
        type: 'RESETPASSWORD',
        payload: {
          message,
          error
        },
      });
    };
    if (pathname === '/salesman/reset-password') {
      const response = await axios.post(`api/saleman/forgotpassword`, { email });
      const { message, error } = response.data;
      dispatch({
        type: 'RESETPASSWORD',
        payload: {
          message,
          error
        },
      });
    };
  }

  const verifypassword = async (token, password, confirmpassword) => {
    if (pathname === '/agent/verify') {
      const response = await axios.post(`api/agent/resetpassword`, { token, password, confirmpassword });
      const { message, error } = response.data;
      dispatch({
        type: 'VERIFYPASSWORD',
        payload: {
          message,
          error
        },
      });
    }
    if (pathname === '/contractor/verify') {
      const response = await axios.post(`api/contractor/resetpassword`, { token, password, confirmpassword });
      const { message, error } = response.data;
      dispatch({
        type: 'VERIFYPASSWORD',
        payload: {
          message,
          error
        },
      });
    }
  }

  // Super Admin Api


  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        // Global Methods Call
        login,
        register,
        logout,
        ChangePath,
        resetpassword,
        verifypassword,
        // Super Admin Methods Call


      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
