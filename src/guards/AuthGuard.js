/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// hooks
import useAuth from '../hooks/useAuth';
import Login from '../pages/auth/login';
// components
import LoadingScreen from '../components/LoadingScreen';
import { PATH_AUTH, PATH_DASHBOARD, PATH_PAGE } from '../routes/paths';

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node,
};

const whiteList = [
  PATH_DASHBOARD.root,
  PATH_DASHBOARD.root + '/app',
  PATH_AUTH.login,
  PATH_PAGE.page404,
  PATH_PAGE.page500,
];
const ar = null;
export default function AuthGuard({ children }) {
  const { isAuthenticated, isLoading, roles } = useAuth();
  const { pathname, push } = useRouter();
  const [requestedLocation, setRequestedLocation] = useState(null);

  useEffect(() => {
    if (!whiteList.includes(pathname)) {
      if (roles.find((r) => PATH_DASHBOARD.root + r.ROUTE === pathname) === undefined) {
        push(PATH_DASHBOARD.permissionDenied);
      }
    }
  }, [pathname]);

  useEffect(() => {
    if (requestedLocation && pathname !== requestedLocation) {
      push(requestedLocation);
    }
    if (isAuthenticated) {
      setRequestedLocation(null);
    }
  }, [isAuthenticated, pathname, push, requestedLocation]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Login />;
  }

  return <>{children}</>;
}
