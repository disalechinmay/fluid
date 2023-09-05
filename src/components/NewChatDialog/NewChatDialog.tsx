import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  debounce,
} from '@mui/material';
import React, { useState } from 'react';
import { IUserBase } from '../../types';
import { createChat, searchUsers } from '../../utils/api';
import { useRecoilState } from 'recoil';
import { accessTokenAtom } from '../../state';

interface NewChatDialogProps {
  open: boolean;
  setOpen: (v: boolean) => void;
}

const NewChatDialog = ({ open, setOpen }: NewChatDialogProps) => {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenAtom);
  const [formDisabled, setFormDisabled] = useState<boolean>(false);
  const [userOptions, setUserOptions] = useState<IUserBase[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>('');

  const closeDialog = () => {
    setOpen(false);
  };

  const debouncedSearch = debounce(async (searchQuery: string) => {
    let users = await searchUsers(accessToken as string, searchQuery);
    setUserOptions(users);
  }, 1000);

  const handleSearchQueryChange = (searchQuery: string) => {
    debouncedSearch(searchQuery);
  };

  const handleCreateChat = async () => {
    if (!selectedUser) return;
    setFormDisabled(true);
    let chatId = await createChat(accessToken as string, selectedUser);
    window.location.href = '/?preload=' + chatId;
  };

  return (
    <Box>
      <Dialog
        open={open}
        onClose={() => closeDialog()}
        PaperProps={{
          sx: {
            width: '100%',
          },
        }}
      >
        <DialogTitle>New Chat</DialogTitle>
        <DialogContent>
          <DialogContentText>Search for a user to chat with</DialogContentText>

          <Box sx={{ mt: 2, mb: 1 }}>
            <Autocomplete
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search for a user"
                  variant="standard"
                  required
                  fullWidth
                />
              )}
              options={userOptions}
              onInputChange={(e, nv) => handleSearchQueryChange(nv)}
              onChange={(e, nv) => setSelectedUser(nv?.uid as string)}
              getOptionLabel={(option) => option.email}
              disabled={formDisabled}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            variant="outlined"
            size="small"
            onClick={() => handleCreateChat()}
            disabled={formDisabled}
          >
            Okay
          </Button>
          <Button onClick={() => closeDialog()} color="secondary" size="small">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NewChatDialog;
