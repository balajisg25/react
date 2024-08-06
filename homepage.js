import React from 'react';
import { Box } from '@mui/material';
import backgroundImage from './assets/background.jpg'; // Adjust the path as necessary

const BackgroundImageComponent = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        backgroundImage: `url(${backgroundImage})`, // Use the imported image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Your content here */}
    </Box>
  );
};

export default BackgroundImageComponent;