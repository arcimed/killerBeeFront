import React from 'react';
import {AppBar, Box, Typography, makeStyles  } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  title: {
    textAlign: 'center'
  },
  box: {
    position:'absolute',
    bottom:'0',
    width:'100%',
  }
  
}));

  

export default function Footer() {
    const classes = useStyles();
  return (
    <Box sx={{ flexShrink: 0 }} className={classes.box}>
      <AppBar position="flex">
          <Typography className={classes.title} variant="h6" color="inherit">
            KillerBee
          </Typography>
      </AppBar>
    </Box>
  );
}