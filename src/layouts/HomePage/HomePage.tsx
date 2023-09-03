import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import {
  accessTokenAtom,
  chatsMetadataAtom,
  messagesAtom,
  preloadChatAtom,
  selectedChatAtom,
  userAtom,
  userPictureAtom,
} from '../../state';
import { backendServerUrl, fetchUserInformation } from '../../utils/api';
import AppHeader from '../../components/AppHeader/AppHeader';
import AppDrawer from '../../components/AppDrawer/AppDrawer';
import Loader from '../../components/Loader/Loader';
import ChatCanvas from '../../components/ChatCanvas/ChatCanvas';
import { io } from 'socket.io-client';
import { socket } from '../../utils/sockets';
import { IBroadcastMessage } from '../../types';

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
  const [selectedChat, setSelectedChat] = useRecoilState(selectedChatAtom);
  const [messages, setMessages] = useRecoilState(messagesAtom);
  const [userPicture, setUserPicture] = useRecoilState(userPictureAtom);
  const [preloadChat, setPreloadChat] = useRecoilState(preloadChatAtom);

  // Local State
  const [isLoading, setIsLoading] = React.useState(true);

  // Effects
  useEffect(() => {
    if (!isAuth0Loading && accessToken && isLoading) {
      initializeHomePage();
    }

    if (accessToken) {
      socket.auth = { token: accessToken };
      socket.connect();
    }

    return () => {
      socket?.disconnect();
    };
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
        token = await getAccessTokenSilently({
          authorizationParams: {
            audience: backendServerUrl,
            scope: 'read:profile',
          },
        });
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
      userFromAuth0?.email as string,
      userFromAuth0?.picture as string
    );
    setUserPicture(userFromAuth0?.picture as string);
    setUser(userInformation);
    setChatsMetadata(userInformation?.chats || []);
    // Check if there is query param for preload
    const urlParams = new URLSearchParams(window.location.search);
    const preloadChatId = urlParams.get('preload');
    if (preloadChatId) {
      setPreloadChat(preloadChatId);
      setSelectedChat(preloadChatId);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    socket.on('brdcst-' + user?.uid, (data: IBroadcastMessage) => {
      if (data && data.chatId && selectedChat) {
        if (data.chatId === selectedChat) {
          setMessages((messages) => [
            ...(messages || []),
            {
              chatId: selectedChat as string,
              text: data.text,
              timestamp: new Date(),
              sender: {
                email: data.participants.find((p) => p.uid === data.senderId)
                  ?.email as string,
                uid: data.senderId,
                picture: data.participants.find((p) => p.uid === data.senderId)
                  ?.picture as string,
              },
            },
          ]);
        }
      }
    });

    return () => {
      socket.off('brdcst-' + user?.uid);
    };
  }, [selectedChat]);

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
