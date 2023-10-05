import * as React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import app from '../../base';
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, updateDoc, doc } from "firebase/firestore";
import { useHistory } from "react-router-dom";

const pages = ['Profile', 'Dashboard', 'Chapters'];
const auth = getAuth(app);

function Navbar2() {
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
  const history = useHistory(); // Get the history object

  const handleSignOut = async () => {
    try {
      await updateUserStatus("logged-out");
      await signOut(auth);

      // After sign-out, redirect to the login page
      // history.push("/login"); // Replace "/login" with the actual path of your login page

    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const updateUserStatus = async (status) => {
    const firestore = getFirestore(app);
    const userDocRef = doc(firestore, "users", auth.currentUser.uid);
    console.log(firestore, userDocRef)
    await updateDoc(userDocRef, { userstatus: status });
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'white' }}>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <Container maxWidth="xl">
        <Toolbar 
          disableGutters 
          sx={{
            width: 'calc(100vw - 30px)',
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
              component={Link} // Use the Link component
              to="/" // Set the path for the home page
              sx={{
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: '#312783',
                textDecoration: 'none',
                ml: 2,
                position: 'relative',
              }}
            >
              <img src="/airexam.svg" alt="" />
              <span
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '2px',
                  background: '#F1870C',
                  bottom: '-4px',
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
                component={Link} // Use the Link component
                to={`/${page.toLowerCase().replace(' ', '-')}`} // Set the appropriate path
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  mx: 2,
                  color: '#312783',
                  borderBottom: index === 0 ? '2px solid #F1870C' : 'none',
                  paddingBottom: '2px',
                }}
              >
                {page}
              </Button>
            ))}
            <Button
              component={Link} // Use the Link component
              to="/signup" // Set the path for the sign up page
              sx={{ ...buttonStyles, border: '1px solid #F1870C' }}
              onClick={handleSignOut}
            >
              Sign out
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar2;
