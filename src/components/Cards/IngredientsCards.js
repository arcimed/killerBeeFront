import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import {Dialog, CardActions, CardContent, Button, Typography, Card} from '@mui/material';
import http from '../../service/httpService';
import { toast } from 'react-toastify';

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
  const notifySuccess = () => {
    toast.success("Item supprimé !", {
      position: toast.POSITION.BOTTOM_CENTER
    });
  }
  const notifyError = () => {
    toast.error("Item non supprimé !", {
      position: toast.POSITION.BOTTOM_CENTER
    });
  }

    const handleOpenAdd = () => {
      setOpenAdd(true);
    };
    const handleCloseAdd = () => {
      setOpenAdd(false);
    };

    const handleDelete = () => {
      http.delete(`api/ingredient/` + props.Ingredient._id)
            .then((response) => {
              notifySuccess()
            }).catch(error => {
              notifyError()
            })
    };
  return (
    <Card sx={{ minWidth: 275 }} className={classes.Card} key={props.Ingredient.nom}>
      <CardContent>
        <Typography variant="h5" component="div">
            {props.Ingredient.nom}
        </Typography>
        <Typography  color="text.secondary" gutterBottom>
            {props.Ingredient.description}
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