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
  const whitelist = [
    PATH_DASHBOARD.root,
    PATH_DASHBOARD.root + '/app',
    PATH_AUTH.login,
    PATH_PAGE.page404,
    PATH_PAGE.page500,
    PATH_DASHBOARD.user,
  ];
  if (roles) {
    for (const rol of roles) {
      whitelist.push(PATH_DASHBOARD.root + rol.ROUTE);
    }
  }
  const { pathname, push, replace } = useRouter();

  const [requestedLocation, setRequestedLocation] = useState(null);

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
  if (roles !== undefined) {
    if (roles.length > 0) {
      if (whitelist.indexOf(location.pathname) < 0) {
        replace(PATH_PAGE.page404);
      }
    }
  }

  return <>{children}</>;
}
