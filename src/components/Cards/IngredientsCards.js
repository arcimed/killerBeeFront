import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import {Dialog, CardActions, CardContent, Button, Typography, Card} from '@mui/material';
import http from '../../service/httpService';

import IngredientForm from "../Forms/IngredientForm";

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
      http.put(`api/ingredient/delete/` + props.Ingredient.id)
            .then((response) => {
              console.log('delete')
            }).catch()
    };
  return (
    <Card sx={{ minWidth: 275 }} className={classes.Card} key={props.Ingredient.id}>
      <CardContent>
        <Typography variant="h5" component="div">
            {props.Ingredient.Nom}
        </Typography>
        <Typography  color="text.secondary" gutterBottom>
            {props.Ingredient.Desc}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleOpenAdd} >Modifier</Button>
        <Button variant="contained" color="secondary"  onClick={handleDelete} >Supprimer</Button>
        <Dialog open={openAdd} onClose={handleCloseAdd}>
            <IngredientForm handleClose={handleCloseAdd} item={props}/>
        </Dialog>
      </CardActions>
    </Card>
  );
}