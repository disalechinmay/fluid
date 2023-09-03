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
} from '../../state';
import UserIcon from '@mui/icons-material/AccountCircle';
import AddIcon from '@mui/icons-material/Add';
import NewChatDialog from '../NewChatDialog/NewChatDialog';

export const DRAWER_WIDTH = '300px';

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

  return (
    <div>
      <Drawer
        open={isAppDrawerVisible}
        variant="persistent"
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
        <Box sx={{ overflow: 'auto' }}>
          <List
            subheader={
              <ListSubheader
                sx={{
                  display: 'flex',
                  marginTop: '2rem',
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
                  onClick={() => setSelectedChat(chatMetadata.uid)}
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
          <Divider />
        </Box>
      </Drawer>

      <NewChatDialog
        open={newChatDialogOpen}
        setOpen={(v) => setNewChatDialogOpen(v)}
      />
    </div>
  );
};

export default AppDrawer;