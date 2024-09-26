import React from 'react';
import { Box } from '@mui/material';

function ImageComponent() {
  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  return (
    <Box>
      <img
        src="your-image-url.jpg"
        alt="example"
        onContextMenu={handleContextMenu} // Disables right-click
        style={{ width: '100%', height: 'auto' }}
      />
    </Box>
  );
}

export default ImageComponent;