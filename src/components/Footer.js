import React from 'react';
import {AppBar, Box, Typography, makeStyles  } from "@material-ui/core";
import killerBeeLogo from '../media/KillerBee.png'
import NinjattackLogo from '../media/Ninjattack.png'


const useStyles = makeStyles(theme => ({
  title: {
    textAlign: 'center'
  },
  box: {
    position:'sticky',
    bottom:'0',
    width:'100%',
  },
  app : {

  },
  imgBox: {
    position:'inherit',
    marginLeft:'30%',
    
  },
  img: {
    width:'100px',
    height:'100px',
    marginRight:'35%',
    },
}));

  

export default function Footer() {
    const classes = useStyles();
  return (
    <Box sx={{ flexShrink: 0 }} className={classes.box}>
      <AppBar position="relative" className={classes.app}>
          <Typography className={classes.title} variant="h6" color="inherit">
            KillerBee
          </Typography>
          <Box  className={classes.imgBox}>
            <img src={killerBeeLogo} className={classes.img} alt="KillerBee logo"></img>
            <img src={NinjattackLogo} className={classes.img} alt="Ninjattack Logo"></img>
          </Box>
      </AppBar>
    </Box>
  );
}