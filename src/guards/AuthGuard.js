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

export default function AuthGuard({ children }) {
  const { isAuthenticated, isLoading, roles } = useAuth();
  const { pathname, push } = useRouter();
  const [requestedLocation, setRequestedLocation] = useState(null);
  var whiteList = [
    PATH_DASHBOARD.root,
    PATH_DASHBOARD.root + '/app',
    PATH_AUTH.login,
    PATH_PAGE.page404,
    PATH_PAGE.page500,
  ];
  useEffect(() => {
    if (roles) {
      whiteList = [...whiteList, ...roles.map((r) => PATH_DASHBOARD.root + r.ROUTE)];
    }
  }, [roles]);

  useEffect(() => {
    if (!whiteList.includes(pathname)) {
      push(PATH_DASHBOARD.permissionDenied);
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
  //+1 829-341-6111

  return <>{children}</>;
}
