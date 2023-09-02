import React from 'react';
import './LoginPage.scss';
import { useAuth0 } from '@auth0/auth0-react';
import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';

function LoginPage() {
  const {
    loginWithRedirect,
    isAuthenticated,
    isLoading: isAuth0Loading,
  } = useAuth0();

  if (isAuth0Loading) return <div>Loading...</div>;
  if (isAuthenticated) window.location.href = '/';
  return (
    <Box className="login-page">
      <Typography variant="h1" color="initial" sx={{ fontWeight: 'bold' }}>
        Fluid
      </Typography>

      <Typography variant="h6" color="initial" sx={{ fontWeight: 'bold' }}>
        Communication. Simplified.
      </Typography>

      <Button
        variant="contained"
        endIcon={<ArrowForward />}
        disableElevation
        onClick={() => loginWithRedirect()}
        sx={{ marginTop: '1rem' }}
      >
        Jump Right In
      </Button>

      <br />
      <br />
      {/* Copyright */}
      <Box className="copyright-footer">
        <Typography variant="caption">
          © {new Date().getFullYear()} Fluid Communications
        </Typography>
      </Box>
    </Box>
  );
}

export default LoginPage;
