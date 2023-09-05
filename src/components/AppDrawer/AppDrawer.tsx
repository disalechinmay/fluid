import React from 'react';
import Drawer from '@mui/material/Drawer';
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Toolbar,
  Tooltip,
  Typography,
  styled,
} from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useRecoilState } from 'recoil';
import {
  chatsMetadataAtom,
  isAppDrawerVisibleAtom,
  selectedChatAtom,
  userAtom,
  userPictureAtom,
} from '../../state';
import UserIcon from '@mui/icons-material/AccountCircle';
import AddIcon from '@mui/icons-material/Add';
import NewChatDialog from '../NewChatDialog/NewChatDialog';
import { theme } from '../../assets/theme';

export const DRAWER_WIDTH = window.innerWidth > 600 ? '300px' : '100vw';

export const MainContent = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open',
})<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: '0px',
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: DRAWER_WIDTH,
    display: window.innerWidth > 600 ? `inherit` : 'none',
  }),
  height: '85vh',
}));

const AppDrawer = () => {
  const [isAppDrawerVisible, setIsAppDrawerVisible] = useRecoilState(
    isAppDrawerVisibleAtom
  );
  const [chatsMetadata, setChatsMetadata] = useRecoilState(chatsMetadataAtom);
  const [currentUser, setCurrentUser] = useRecoilState(userAtom);
  const [selectedChat, setSelectedChat] = useRecoilState(selectedChatAtom);
  const [newChatDialogOpen, setNewChatDialogOpen] = React.useState(false);
  const [userPicture, setUserPicture] = useRecoilState(userPictureAtom);

  return (
    <Box>
      <Drawer
        open={isAppDrawerVisible}
        variant="persistent"
        PaperProps={{
          sx: {
            background:
              'linear-gradient(-45deg, #ee76520f, #e73c7e14, #23a5d516, #23d5ab16)',
            backgroundSize: ' 400% 400%',
            animation: 'gradient 15s ease infinite',
            boxShadow: '-15px 50px 10px -14px lightgray inset',
          },
        }}
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />

        <Box
          sx={{
            marginTop: '2rem',
          }}
        >
          <Box>
            <Avatar
              src={userPicture as string}
              sx={{ width: 100, height: 100, margin: 'auto' }}
            />
          </Box>
          <Box>
            <Tooltip title={currentUser?.email}>
              <Typography
                variant="h6"
                sx={{
                  maxWidth: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  padding: '1rem',
                }}
              >
                {currentUser?.email}
              </Typography>
            </Tooltip>
          </Box>
        </Box>
        <Divider />

        <Box sx={{ overflow: 'auto' }}>
          <List
            subheader={
              <ListSubheader
                sx={{
                  display: 'flex',
                  marginTop: '1rem',
                  backgroundColor: 'transparent',
                }}
              >
                <Box sx={{ flex: 1 }}>Personal Chats</Box>
                <IconButton onClick={() => setNewChatDialogOpen(true)}>
                  <AddIcon />
                </IconButton>
              </ListSubheader>
            }
          >
            {chatsMetadata.map((chatMetadata) => {
              let oppositePartyName = '';
              chatMetadata.participants.forEach((participant) => {
                if (participant.uid !== currentUser?.uid) {
                  oppositePartyName = participant.email;
                }
              });

              return (
                <ListItem
                  key={chatMetadata.uid}
                  disablePadding
                  onClick={() => {
                    setSelectedChat(chatMetadata.uid);
                    if (window.innerWidth < 600) setIsAppDrawerVisible(false);
                  }}
                >
                  <ListItemButton selected={selectedChat === chatMetadata.uid}>
                    <ListItemIcon sx={{ minWidth: '30px' }}>
                      <Avatar
                        src={
                          chatMetadata.participants.find(
                            (p) => p.uid !== currentUser?.uid
                          )?.picture
                        }
                        sx={{ width: 24, height: 24 }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{ whiteSpace: 'normal' }}
                      primary={oppositePartyName}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>

      <NewChatDialog
        open={newChatDialogOpen}
        setOpen={(v) => setNewChatDialogOpen(v)}
      />
    </Box>
  );
};

export default AppDrawer;
