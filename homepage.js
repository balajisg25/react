// HomePage.js
import React from 'react';
import { Container, Box, Typography } from '@mui/material';

const HomePage = () => {
  return (
    <Container
      maxWidth="false"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        padding: 0,
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          background: 'url(/images/home-bg.jpg) no-repeat center center',
          backgroundSize: 'cover',
        }}
      >
        <Typography
          variant="h1"
          sx={{
            color: '#fff',
            textAlign: 'center',
            marginTop: '20px',
            fontSize: '3rem',
          }}
        >
          Welcome to Our Website
        </Typography>
      </Box>
    </Container>
  );
};

export default HomePage;