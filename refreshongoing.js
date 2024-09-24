import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';

const RefreshMessage = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      flexDirection="column"
      sx={{
        backgroundColor: '#f5f5f5',
        padding: 3,
      }}
    >
      {/* Loading Spinner */}
      <CircularProgress 
        sx={{ marginBottom: 2, color: '#1976d2' }} 
      />
      
      {/* Message */}
      <Typography
        variant="h6"
        sx={{
          color: '#1976d2',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        Refresh is ongoing
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: '#555',
          textAlign: 'center',
          marginTop: 1,
        }}
      >
        Data will be available once it is completed.
      </Typography>
    </Box>
  );
};

export default RefreshMessage;