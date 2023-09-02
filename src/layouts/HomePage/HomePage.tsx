import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { accessTokenAtom, chatsMetadataAtom, userAtom } from '../../state';
import { backendServerUrl, fetchUserInformation } from '../../utils/api';
import AppHeader from '../../components/AppHeader/AppHeader';
import AppDrawer from '../../components/AppDrawer/AppDrawer';
import Loader from '../../components/Loader/Loader';
import ChatCanvas from '../../components/ChatCanvas/ChatCanvas';

const HomePage = () => {
  // Auth0
  const {
    user: userFromAuth0,
    isAuthenticated,
    isLoading: isAuth0Loading,
    getAccessTokenSilently,
    getAccessTokenWithPopup,
  } = useAuth0();

  // Recoil State
  const [accessToken, setAccessToken] = useRecoilState(accessTokenAtom);
  const [user, setUser] = useRecoilState(userAtom);
  const [chatsMetadata, setChatsMetadata] = useRecoilState(chatsMetadataAtom);

  // Local State
  const [isLoading, setIsLoading] = React.useState(true);

  // Effects
  useEffect(() => {
    if (!isAuth0Loading && accessToken && isLoading) {
      initializeHomePage();
    }
  }, [accessToken]);

  useEffect(() => {
    if (!isAuth0Loading) {
      if (!isAuthenticated) window.location.href = '/login';
      else initializeAccessToken();
    }
  }, [isAuth0Loading]);

  const initializeAccessToken = async () => {
    if (!accessToken) {
      let token = null;
      try {
        token = (await getAccessTokenSilently({
          authorizationParams: {
            audience: backendServerUrl,
            scope: 'read:profile',
          },
        })) as string;
      } catch (ignored) {}

      if (token) setAccessToken(token);
      else {
        token = (await getAccessTokenWithPopup({
          authorizationParams: {
            audience: backendServerUrl,
            scope: 'read:profile',
          },
        })) as string;
        setAccessToken(token);
      }
    }
  };

  const initializeHomePage = async () => {
    const userInformation = await fetchUserInformation(
      accessToken as string,
      userFromAuth0?.sub as string,
      userFromAuth0?.email as string
    );
    setUser(userInformation);
    setChatsMetadata(userInformation?.chats || []);
    setIsLoading(false);
  };

  if (isLoading) return <Loader />;
  return (
    <div>
      <AppHeader />
      <AppDrawer />
      <ChatCanvas />
    </div>
  );
};

export default HomePage;
