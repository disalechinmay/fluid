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
import ChatMessage, { REPLY_SEPARATOR } from '../ChatMessage/ChatMessage';
import SendIcon from '@mui/icons-material/Send';
import { socket } from '../../utils/sockets';
import { IBroadcastMessage } from '../../types';
import { HorizontalRule } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import EmojiIcon from '@mui/icons-material/EmojiEmotionsOutlined';
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
  const [isFromLoadPreviousButton, setIsFromLoadPreviousButton] =
    useState(false);
  const [replyingToMessage, setReplyingToMessage] = useState<string>('');
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);

  useEffect(() => {
    if (selectedChat) {
      fetchMessages();
    }
  }, [selectedChat]);

  useEffect(() => {
    if (messages && !isFromLoadPreviousButton) {
      scrollToBottom();
    }
    setIsFromLoadPreviousButton(false);
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
    let messageWithQuotes = message;
    if (replyingToMessage !== '') {
      messageWithQuotes = replyingToMessage + REPLY_SEPARATOR + message;
      setReplyingToMessage('');
    }

    const messageToBeBroadcasted: IBroadcastMessage = {
      chatId: selectedChat as string,
      senderId: currentUser?.uid as string,
      text: messageWithQuotes,
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
        text: messageWithQuotes,
        timestamp: new Date(),
        sender: {
          email: currentUser?.email || '',
          uid: currentUser?.uid || '',
          picture: currentUser?.picture || '',
        },
      },
    ]);
    setMessage('');
    scrollToBottom();
  };

  const scrollToBottom = () => {
    if (chatCanvasRef.current) {
      setTimeout(() => {
        chatCanvasRef.current?.scrollTo(0, chatCanvasRef.current.scrollHeight);
      }, 100);
      setTimeout(() => {
        chatCanvasRef.current?.scrollTo(0, chatCanvasRef.current.scrollHeight);
      }, 500);
    }
  };

  const scrollToTop = () => {
    if (chatCanvasRef.current) {
      setTimeout(() => {
        chatCanvasRef.current?.scrollTo(0, 1);
      }, 100);
      setTimeout(() => {
        chatCanvasRef.current?.scrollTo(0, 1);
      }, 500);
    }
  };

  const loadPreviousMessages = async () => {
    if (!messages) return;
    setIsFromLoadPreviousButton(true);
    setLoadingPreviousMessages(true);
    let oldMessages = await fetchChatMessages(
      accessToken as string,
      selectedChat as string,
      messages[0].timestamp.toString()
    );
    setMessages([...(oldMessages || []), ...messages]);
    setLoadingPreviousMessages(false);
    scrollToTop();
  };

  const emojiPicked = (emoji: EmojiClickData) => {
    setMessage((message) => message + emoji.emoji);
    setEmojiPickerVisible(false);
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
            Select or create a chat to start messaging
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
            scrollBehavior: 'smooth',
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
              setReplyingToMessage={setReplyingToMessage}
            />
          ))}
        </Box>

        <Box
          sx={{
            marginTop: '1rem',
          }}
        >
          {replyingToMessage !== '' && (
            <Box
              sx={{
                borderLeft: '4px solid #3f51b5',
                paddingLeft: '0.5rem',
                marginLeft: '0.5rem',
                marginBottom: '0.5rem',
              }}
            >
              <Typography variant="caption" color="initial">
                Replying to:
              </Typography>
              <Typography
                variant="caption"
                color="initial"
                sx={{
                  marginLeft: '0.5rem',
                  fontWeight: 'bold',
                }}
              >
                {replyingToMessage}
              </Typography>
              <IconButton
                aria-label="Close"
                sx={{
                  marginLeft: '0.5rem',
                }}
                size="small"
                onClick={() => setReplyingToMessage('')}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          )}
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {emojiPickerVisible && (
            <Box
              sx={{
                position: 'absolute',
                bottom: '11vh',
              }}
            >
              <EmojiPicker
                height={400}
                width={300}
                onEmojiClick={(e) => emojiPicked(e)}
              />
            </Box>
          )}
          <IconButton
            onClick={() => setEmojiPickerVisible(!emojiPickerVisible)}
          >
            <EmojiIcon />
          </IconButton>

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
            sx={{
              backgroundColor: 'white',
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
