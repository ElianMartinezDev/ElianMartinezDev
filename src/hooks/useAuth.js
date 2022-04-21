import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

// redux
import { errorlogin, login, logout } from '../redux/slices/authJwt';

// ----------------------------------------------------------------------
useAuth.propTypes = {
  method: PropTypes.oneOf(['jwt', 'firebase']),
};
export default function useAuth() {
  // JWT Auth
  const dispatch = useDispatch();
  const { user, roles, isLoading, isAuthenticated, isError } = useSelector((state) => state.authJwt);
  // JWT Auth
  return {
    method: 'jwt',
    user,
    isLoading,
    isAuthenticated,
    isError,
    roles,
    login: (data) => {
      dispatch(
        login({
          data,
        })
      );
    },
    errorLogin: (value) => {
      dispatch(errorlogin(value));
    },
    logout: () => dispatch(logout()),
    resetPassword: () => {},
    updateProfile: () => {},
  };
}
