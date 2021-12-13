import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import {Dialog, CardActions, CardContent, Button, Typography, Card} from '@mui/material';

import FreezbeForm from "../Forms/FreezbeForm";

const useStyles = makeStyles(theme => ({
  Card: {
      maxWidth: '15%',
      margin: '10px',
  },
}));

export default function Cards(props) {
  const classes = useStyles();
  const [openAdd, setOpenAdd] = useState(false);

    const handleOpenAdd = () => {
      setOpenAdd(true);
    };
    const handleCloseAdd = () => {
      setOpenAdd(false);
    };

    const handleDelete = () => {
      console.log('delete')
    };
  return (
    <Card sx={{ minWidth: 275 }} className={classes.Card}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {props.Freezbe.Nom}
        </Typography>
        <Typography variant="h5" component="div">
            {props.Freezbe.Desc}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleOpenAdd} >Modifier</Button>
        <Button variant="contained" color="secondary"  onClick={handleDelete} >Supprimer</Button>
        <Dialog open={openAdd} onClose={handleCloseAdd}>
            <FreezbeForm handleClose={handleCloseAdd} item={props}/>
        </Dialog>
      </CardActions>
    </Card>
  );
}