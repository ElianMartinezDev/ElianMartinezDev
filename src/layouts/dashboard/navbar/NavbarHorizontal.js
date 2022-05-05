import { memo, useEffect, useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Container, AppBar } from '@mui/material';
// config
import { HEADER } from '../../../config';
// components
import { NavSectionHorizontal } from '../../../components/nav-section';
//
import navConfig from './NavConfig';
import useAuth from '../../../hooks/useAuth';
import { generateNavRoles } from '../../../utils/navUtils';

// ----------------------------------------------------------------------

const RootStyle = styled(AppBar)(({ theme }) => ({
  transition: theme.transitions.create('top', {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  width: '100%',
  position: 'fixed',
  zIndex: theme.zIndex.appBar,
  padding: theme.spacing(1, 0),
  boxShadow: theme.customShadows.z8,
  top: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

function NavbarHorizontal() {
  const { roles } = useAuth();
  const [allMenu, setAllMenu] = useState([]);
  useEffect(() => {
    if (roles) {
      const menuLinks = generateNavRoles(roles);
      setAllMenu(menuLinks);
    }
  }, [roles]);
  return (
    <RootStyle>
      <Container maxWidth={false}>
        <NavSectionHorizontal navConfig={allMenu} />
      </Container>
    </RootStyle>
  );
}

export default memo(NavbarHorizontal);
