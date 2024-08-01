import React, { useEffect } from 'react';
import { Box, Toolbar, AppBar, Typography } from '@mui/material';
import Sidebar from './components/Sidebar';

const App = () => {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      localStorage.clear();
      // Optional: Show confirmation dialog
      const confirmationMessage = 'Are you sure you want to leave?';
      (event || window.event).returnValue = confirmationMessage; // Cross-browser compatibility
      return confirmationMessage;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            My Application
          </Typography>
        </Toolbar>
      </AppBar>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
        <Toolbar />
        <Typography paragraph>
          This component will clear local storage when the browser tab or window is closed.
        </Typography>
      </Box>
    </Box>
  );
};

export default App;