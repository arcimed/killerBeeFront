import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import {Dialog, CardActions, CardContent, Button, Typography, Card} from '@mui/material';
import http from '../../service/httpService';
import { toast } from 'react-toastify';

import ProcessForm from "../Forms/ProcessForm";

const useStyles = makeStyles(theme => ({
  Card: {
      maxWidth: '15%',
      margin: '10px',
  },
}));

export default function ProcessCards(props) {
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
      http.delete(`api/fabricationProcess/` + props.Process._id)
            .then((response) => {
              notifySuccess()
            }).catch(error => {
              notifyError()
            })
    };
  return (
    <Card sx={{ minWidth: 275 }} className={classes.Card} key={props.Process.nom}>
      <CardContent>
        <Typography variant="h5"  component="div">
            {props.Process.nom}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
            {props.Process.description}
        </Typography>
        <Typography component="div">
            Freezbe : {props.Process.frisbee.nom}
        </Typography>
        <Typography component="div">
            Etape :
            {props.Process.validationTest.map((option) => (
                  option.description +', '
              ))}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleOpenAdd} >Modifier</Button>
        <Button variant="contained" color="secondary"  onClick={handleDelete} >Supprimer</Button>
        <Dialog open={openAdd} onClose={handleCloseAdd}>
            <ProcessForm handleClose={handleCloseAdd} item={props} freezbeData={props.freezbeData}/>
        </Dialog>
      </CardActions>
    </Card>
  );
}