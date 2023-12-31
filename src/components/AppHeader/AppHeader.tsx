import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRecoilState } from 'recoil';
import { isAppDrawerVisibleAtom } from '../../state';
import { useAuth0 } from '@auth0/auth0-react';
const GraffitiBackground = require('../../assets/graffiti.svg');

const AppHeader = () => {
  const [isAppDrawerVisible, setIsAppDrawerVisible] = useRecoilState(
    isAppDrawerVisibleAtom
  );

  const { logout } = useAuth0();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="sticky"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          boxShadow:
            '1px 1px 5px 0px -webkit-linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
        }}
      >
        <Toolbar
          sx={{
            background: `url(${GraffitiBackground.default})`,
            color: 'white',
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setIsAppDrawerVisible(!isAppDrawerVisible)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Fluid
          </Typography>
          <Button
            color="inherit"
            endIcon={<LogoutIcon />}
            onClick={() => logout()}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppHeader;
