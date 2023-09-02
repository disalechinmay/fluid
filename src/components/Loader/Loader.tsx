import React from 'react';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useRecoilState } from 'recoil';
import { isAppDrawerVisibleAtom } from '../../state';
import { DRAWER_WIDTH } from '../AppDrawer/AppDrawer';

const Loader = () => {
  const [isAppDrawerVisible, setIsAppDrawerVisible] = useRecoilState(
    isAppDrawerVisibleAtom
  );

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '95vh',
        width: `calc(100% - ${isAppDrawerVisible ? DRAWER_WIDTH : 0}px)`,
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loader;
