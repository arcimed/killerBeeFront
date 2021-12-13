import React, { useState } from 'react';
import { AppBar, Box, Toolbar, Typography, IconButton  } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Dialog from '@mui/material/Dialog';
import SignUpForm from './SignUpForms';
import SignInForm from './SignInForms';
import { makeStyles } from '@material-ui/core';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';

const useStyles = makeStyles(theme => ({
  BoxButton: {
    position: 'absolute',
    right: '3%'
  },
  Button: {
    marginRight: '10px',
  },
}));

  

export default function Navbar() {

    const classes = useStyles();
    const [openSignIn, setOpenSignIn] = useState(false);
    const [openSignUp, setOpenSignUp] = useState(false);
    const [openSide, setOpenSide] = useState(false);

    const handleOpenSide = () => {
      setOpenSide(true);
    };
  
    const handleCloseSide = () => {
      setOpenSide(false);
    };

    const handleOpenSignUp = () => {
      setOpenSignUp(true);
    };
  
    const handleCloseSignUp = () => {
      setOpenSignUp(false);
    };
    

    const handleOpenSignIn = () => {
      setOpenSignIn(true);
    };
  
    const handleCloseSignIn = () => {
      setOpenSignIn(false);
    };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={handleOpenSide}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            KillerBee
          </Typography>
          <Box className="App" className={classes.BoxButton}>
                <Button variant="contained" color="#cddc39" className={classes.Button} onClick={handleOpenSignIn}>
                    Login
                </Button>
                <Dialog open={openSignIn} onClose={handleCloseSignIn}>
                  <SignInForm handleClose={handleCloseSignIn} />
                </Dialog>
                <Button variant="contained" color="primary" onClick={handleOpenSignUp}>
                    Signup
                </Button>
                <Dialog open={openSignUp} onClose={handleCloseSignUp}>
                  <SignUpForm handleClose={handleCloseSignUp} />
                </Dialog>
            </Box>
        </Toolbar>
      </AppBar>
      <Drawer open={openSide}>
          <IconButton onClick={handleCloseSide}>
             <ChevronLeftIcon />
          </IconButton>
        <List>
          <ListItem button key={"home"}>
            <ListItemIcon>
              <HomeIcon></HomeIcon>
            </ListItemIcon>
            <ListItemText primary={"Accueil"} />
          </ListItem>
          <ListItem button key={"Card1"}>
            <ListItemIcon>
              <SportsBaseballIcon></SportsBaseballIcon>
            </ListItemIcon>
            <ListItemText primary={"Card1"} />
          </ListItem>
          <ListItem button key={"Card2"}>
            <ListItemIcon>
              <SportsBaseballIcon></SportsBaseballIcon>
            </ListItemIcon>
            <ListItemText primary={"Card2"} />
          </ListItem>
          <ListItem button key={"Card3"}>
            <ListItemIcon>
              <SportsBaseballIcon></SportsBaseballIcon>
            </ListItemIcon>
            <ListItemText primary={"Card3"} />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}