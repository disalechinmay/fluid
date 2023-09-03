import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  accessTokenAtom,
  isAppDrawerVisibleAtom,
  messagesAtom,
  selectedChatAtom,
  userAtom,
  userPictureAtom,
} from '../../state';
import {
  Box,
  TextField,
  Typography,
  IconButton,
  Divider,
  Avatar,
  Button,
} from '@mui/material';
import { MainContent } from '../AppDrawer/AppDrawer';
import Loader from '../Loader/Loader';
import { fetchChatMessages } from '../../utils/api';
import ChatMessage from '../ChatMessage/ChatMessage';
import SendIcon from '@mui/icons-material/Send';
import { socket } from '../../utils/sockets';
import { IBroadcastMessage } from '../../types';
import { HorizontalRule } from '@mui/icons-material';
const EmptyIllustration = require('../../assets/emptyillustration.svg');

const ChatCanvas = () => {
  const [selectedChat, setSelectedChat] = useRecoilState(selectedChatAtom);
  const [isAppDrawerVisible, setIsAppDrawerVisible] = useRecoilState(
    isAppDrawerVisibleAtom
  );
  const [messages, setMessages] = useRecoilState(messagesAtom);
  const [accessToken, setAccessToken] = useRecoilState(accessTokenAtom);
  const [currentUser, setCurrentUser] = useRecoilState(userAtom);
  const [message, setMessage] = useState('');
  const chatCanvasRef = useRef<HTMLDivElement>(null);
  const [userPicture, setUserPicture] = useRecoilState(userPictureAtom);
  const [loadingPreviousMessages, setLoadingPreviousMessages] = useState(false);
  const [initialScrollToBottomDone, setInitialScrollToBottomDone] =
    useState(false);

  useEffect(() => {
    if (selectedChat) {
      fetchMessages();
    }
  }, [selectedChat]);

  useEffect(() => {
    if (!initialScrollToBottomDone && messages) {
      scrollToBottom();
      setInitialScrollToBottomDone(true);
    }
  }, [messages]);

  const fetchMessages = async () => {
    const messages = await fetchChatMessages(
      accessToken as string,
      selectedChat as string,
      'latest'
    );
    setMessages(messages);
  };

  const sendMessage = async () => {
    const messageToBeBroadcasted: IBroadcastMessage = {
      chatId: selectedChat as string,
      senderId: currentUser?.uid as string,
      text: message,
      timestamp: new Date(),
      participants:
        currentUser?.chats.find((c) => c.uid === selectedChat)?.participants ||
        [],
    };
    socket?.emit('msg', messageToBeBroadcasted);
    setMessages([
      ...(messages || []),
      {
        chatId: selectedChat as string,
        text: message,
        timestamp: new Date(),
        sender: {
          email: currentUser?.email || '',
          uid: currentUser?.uid || '',
          picture: currentUser?.picture || '',
        },
      },
    ]);
    setMessage('');
  };

  const scrollToBottom = () => {
    chatCanvasRef.current?.scrollTo(0, chatCanvasRef.current?.scrollHeight);
  };

  const loadPreviousMessages = async () => {
    if (!messages) return;
    setLoadingPreviousMessages(true);
    let oldMessages = await fetchChatMessages(
      accessToken as string,
      selectedChat as string,
      messages[0].timestamp.toString()
    );
    setMessages([...(oldMessages || []), ...messages]);
    setLoadingPreviousMessages(false);
  };

  if (!selectedChat)
    return (
      <MainContent open={isAppDrawerVisible}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <Typography
            variant="h5"
            color="initial"
            sx={{
              marginTop: '3rem',
              textAlign: 'center',
            }}
          >
            Select a chat to start messaging
          </Typography>
          <img
            src={EmptyIllustration.default}
            alt="Empty Chat"
            height={window.innerWidth > 500 ? '70%' : '50%'}
          />
        </Box>
      </MainContent>
    );
  else {
    if (messages == null) {
      return <Loader />;
    }
  }
  return (
    <MainContent open={isAppDrawerVisible}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <Box
          sx={{
            marginBottom: '0.5rem',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Avatar
            src={
              currentUser?.chats
                .find((c) => c.uid === selectedChat)
                ?.participants.find((p) => p.uid !== currentUser?.uid)
                ?.picture as string
            }
            sx={{ width: 35, height: 35, marginRight: '0.5rem' }}
          />
          <Typography variant="h6" color="initial">
            {currentUser?.chats.find((c) => c.uid === selectedChat)
              ?.participants.length === 2 &&
              currentUser?.chats
                .find((c) => c.uid === selectedChat)
                ?.participants.find((p) => p.uid !== currentUser?.uid)?.email}
          </Typography>
        </Box>
        <Divider
          sx={{
            marginBottom: '0.5rem',
          }}
        />

        {messages.length && messages.length >= 5 && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '0.5rem',
            }}
          >
            <Button
              onClick={() => loadPreviousMessages()}
              disabled={loadingPreviousMessages}
            >
              Load Previous Messages
            </Button>
          </Box>
        )}

        <Box
          sx={{
            flex: 1,
            overflowY: 'scroll',
          }}
          ref={chatCanvasRef}
          onChange={scrollToBottom}
        >
          {messages.map((message) => (
            <ChatMessage
              key={message.text + message.timestamp + message.sender.email}
              message={message.text}
              timestamp={new Date(message.timestamp)}
              sender={message.sender.email}
              isMessageSentByMe={message.sender.email === currentUser?.email}
            />
          ))}
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '1rem',
          }}
        >
          <TextField
            id="outlined-basic"
            label="Type a message to send"
            variant="outlined"
            size="small"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(ev) => {
              if (ev.key === 'Enter') {
                sendMessage();
              }
            }}
          />
          <IconButton
            aria-label="Send"
            sx={{
              marginLeft: '1rem',
            }}
            size="large"
            onClick={() => sendMessage()}
            disabled={message === ''}
            color="primary"
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </MainContent>
  );
};

export default ChatCanvas;
