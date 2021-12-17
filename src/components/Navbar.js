import React, { useState, useEffect } from 'react';
import {NavLink} from 'react-router-dom'
import {AppBar, Box, Toolbar, Typography, IconButton, Button, makeStyles  } from "@material-ui/core";
import {Dialog, Drawer, List, ListItem, ListItemIcon, ListItemText} from '@mui/material';
import {Home, Menu, ChevronLeft, SportsBaseball, Memory, Category} from '@mui/icons-material';
import Cookies from 'js-cookie'

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
    const [openSide, setOpenSide] = useState(false);
    const [User, setUser] = useState(Cookies.get('user') ? Cookies.get('user') : false);

    const toggleDrawer = (open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      setOpenSide(open);
    };
    const handleDisconect = () => {
      Cookies.remove('user', { path: '' })
      setUser(false)
    };
    const handleOpenSignIn = () => {
      setOpenSignIn(true);
    };
  
    const handleCloseSignIn = () => {
      setOpenSignIn(false);
    };

    useEffect(() => {
      if(Cookies.get('user')) {
        setUser(Cookies.get('user'))
      }
    }, [openSignIn])

    const renderConnect = () => {
      return (
        <Box>
          <Button variant="contained" color="default" className={classes.Button} onClick={handleOpenSignIn}>
          Login
          </Button>
          <Dialog open={openSignIn} onClose={handleCloseSignIn}>
            <SignInForm handleClose={handleCloseSignIn}/>
          </Dialog>
        </Box>
      )
    }
    const renderDisConnect = () => {
      return (
        <Box>
          <Button variant="contained" color="secondary" className={classes.Button} onClick={handleDisconect}>
          Deconnecter
          </Button>
        </Box>
      )
    }
    const renderList = () => {
      return (
        <List>
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
                <Category></Category>
              </ListItemIcon>
            </NavLink>
            <NavLink exact to="/Ingredients" className={classes.link}>
              <ListItemText primary={"Ingredients"} />
            </NavLink>
          </ListItem>
          <ListItem button key={"Process"}>
            <NavLink exact to="/Process" className={classes.link}>
              <ListItemIcon>
                <Memory></Memory>
              </ListItemIcon>
            </NavLink>
            <NavLink exact to="/Process" className={classes.link}>
              <ListItemText primary={"Process"} />
            </NavLink>
          </ListItem>
        </List>
      )
    }
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
            {User === false ? renderConnect() : renderDisConnect() }
            {User === true ? renderDisConnect() : null }       
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
        </List>
        {User ? renderList() : null}
      </Drawer>
    </Box>
  );
}