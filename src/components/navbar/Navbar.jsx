import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

const pages = ['Home', 'Contact', 'About', 'Free Trial'];

function Navbar() {
  const buttonStyles = {
    display: { xs: 'none', md: 'flex' },
    width: '110.586px',
    height: '42.162px',
    flexShrink: 0,
    borderRadius: '62px',
    border: '1px solid #F1870C',
    color: '#312783',
    marginRight: '8px',
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'white' }}>
      <Container maxWidth="xl">
        <Toolbar 
          disableGutters 
          sx={{
            width: '1424px',
            height: '69px',
            flexShrink: 0,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: '#312783',
                textDecoration: 'none',
                ml: 2,
                position: 'relative', // Add relative positioning
              }}
            >
                <img src="/airexam.svg" alt="" />
              <span
                style={{
                  position: 'absolute', // Positioned within the Typography
                  width: '100%',
                  height: '2px',
                  background: '#F1870C', // Line color
                  bottom: '-4px', // Position it below the text
                  left: 0,
                  opacity: 1,
                  transition: 'opacity 0.2s',
                }}
              />
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
            {pages.map((page, index) => (
              <Button
                key={page}
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  mx: 2,
                  color: '#312783',
                  borderBottom: index === 0 ? '2px solid #F1870C' : 'none', // Add the line under the first page
                  paddingBottom: '2px', // Add some spacing below the text
                }}
              >
                {page}
              </Button>
            ))}
            <Button sx={{ ...buttonStyles, border: '1px solid #F1870C' }}>
              Login
            </Button>
            <Button sx={{ ...buttonStyles, border: '1px solid #F1870C' }}>
              Sign Up
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
