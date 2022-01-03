import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import {Dialog, CardActions, CardContent, Button, Typography, Card} from '@mui/material';
import http from '../../service/httpService';

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
      http.delete(`api/frisbee/` + props.Freezbe._id)
            .then((response) => {
              console.log('delete')
            }).catch()
    };
  return (
    <Card sx={{ minWidth: 275 }} className={classes.Card} key={props.Freezbe._id}>
      <CardContent>
        <Typography variant="h5" component="div" >
            {props.Freezbe.nom}
        </Typography>
        <Typography color="text.secondary" gutterBottom >
            {props.Freezbe.description}
        </Typography>
        <Typography  component="div">
            pUHT : {props.Freezbe.puht}
        </Typography>
        <Typography  component="div">
            Gamme : {props.Freezbe.gamme}
        </Typography>
        <Typography  component="div">
            Ingredients : 
              {props.Freezbe.ingredients.map((option) => (
                  option.nom +', '
              ))}
        </Typography>
        <Typography  component="div">
            {props.Freezbe.gramme} g
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleOpenAdd} >Modifier</Button>
        <Button variant="contained" color="secondary"  onClick={handleDelete} >Supprimer</Button>
        <Dialog open={openAdd} onClose={handleCloseAdd}>
            <FreezbeForm handleClose={handleCloseAdd} item={props} ingredientsData={props.ingredientsData}/>
        </Dialog>
      </CardActions>
    </Card>
  );
}