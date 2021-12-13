import React, { useState } from 'react';
import {NavLink} from 'react-router-dom'
import {AppBar, Box, Toolbar, Typography, IconButton, Button, makeStyles  } from "@material-ui/core";
import {Dialog, Drawer, List, ListItem, ListItemIcon, ListItemText} from '@mui/material';
import {Home, Menu, ChevronLeft, SportsBaseball} from '@mui/icons-material';

import SignUpForm from './Forms/SignUpForms';
import SignInForm from './Forms/SignInForms';


const useStyles = makeStyles(theme => ({
  BoxButton: {
    position: 'absolute',
    right: '3%'
  },
  Button: {
    marginRight: '10px',
  },
  link:{
    textDecoration: 'none',
  },
}));

  

export default function Navbar() {

    const classes = useStyles();
    const [openSignIn, setOpenSignIn] = useState(false);
    const [openSignUp, setOpenSignUp] = useState(false);
    const [openSide, setOpenSide] = useState(false);

    const toggleDrawer = (open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      setOpenSide(open);
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
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={toggleDrawer(true)}>
            <Menu />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            KillerBee
          </Typography>
          <Box className={classes.BoxButton}>
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
      <Drawer open={openSide} onClose={toggleDrawer(false)}>
          <IconButton onClick={toggleDrawer(false)}>
             <ChevronLeft />
          </IconButton>
        <List>
            <ListItem button key={"home"} >
              <ListItemIcon>
                <NavLink exact to="/" className={classes.link}>
                  <Home></Home>
                </NavLink>
              </ListItemIcon>
              <NavLink exact to="/" className={classes.link}>
                <ListItemText primary={"Accueil"} />
              </NavLink>
            </ListItem>
            <ListItem button key={"Freezbe"}>
              <NavLink exact to="/Freezbe" className={classes.link}>
                <ListItemIcon>
                  <SportsBaseball></SportsBaseball>
                </ListItemIcon>
              </NavLink>
              <NavLink exact to="/Freezbe" className={classes.link}>
                <ListItemText primary={"Freezbe"} />
              </NavLink>
            </ListItem>
            <ListItem button key={"Ingredients"}>
              <NavLink exact to="/Ingredients" className={classes.link}>
                <ListItemIcon>
                  <SportsBaseball></SportsBaseball>
                </ListItemIcon>
              </NavLink>
              <NavLink exact to="/Ingredients" className={classes.link}>
                <ListItemText primary={"Ingredients"} />
              </NavLink>
            </ListItem>
            <ListItem button key={"Process"}>
              <NavLink exact to="/Process" className={classes.link}>
                <ListItemIcon>
                  <SportsBaseball></SportsBaseball>
                </ListItemIcon>
              </NavLink>
              <NavLink exact to="/Process" className={classes.link}>
                <ListItemText primary={"Process"} />
              </NavLink>
            </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}