import React, { useEffect } from 'react';
import './LoginPage.scss';
import { useAuth0 } from '@auth0/auth0-react';
import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import WarningIcon from '@mui/icons-material/Warning';

function LoginPage() {
  const {
    loginWithRedirect,
    isAuthenticated,
    isLoading: isAuth0Loading,
  } = useAuth0();
  const [isPopupBlocked, setIsPopupBlocked] = React.useState(false);
  const [popupBlockCheckDone, setPopupBlockCheckDone] = React.useState(false);
  const doPopupCheck = process.env.REACT_APP_DO_POPUP_CHECK === 'true';

  useEffect(() => {
    if (!doPopupCheck) return;
    if (popupBlockCheckDone) return;

    // Check if popups are blocked
    const newWindow = window.open('');
    if (!newWindow) setIsPopupBlocked(true);
    else newWindow.close();
    setPopupBlockCheckDone(true);
  }, []);

  if (isAuth0Loading) return <div>Loading...</div>;
  if (isAuthenticated) window.location.href = '/';
  return (
    <>
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
          disabled={isPopupBlocked}
        >
          Jump Right In
        </Button>

        {doPopupCheck && popupBlockCheckDone && isPopupBlocked && (
          <Box className="warning-banner">
            <WarningIcon fontSize="small" />
            <Box>
              &nbsp; Please allow pop-ups when prompted. This site depends on a
              3rd party authentication service&nbsp;
              <a
                style={{
                  display: 'inline-block',
                }}
                href="https://auth0.com/"
              >
                Auth0
              </a>
              &nbsp;that requires pop-ups to function appropriately.
            </Box>
          </Box>
        )}

        <br />
        <br />
        {/* Copyright */}
        <Box className="copyright-footer">
          <Typography variant="caption">
            © {new Date().getFullYear()} Fluid Communications
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default LoginPage;
