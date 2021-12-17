import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import {Dialog, CardActions, CardContent, Button, Typography, Card} from '@mui/material';
import http from '../../service/httpService';

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

    const handleOpenAdd = () => {
      setOpenAdd(true);
    };
    const handleCloseAdd = () => {
      setOpenAdd(false);
    };

    const handleDelete = () => {
      http.put(`api/processFreezbe/delete/` + props.Process.id)
            .then((response) => {
              console.log('delete')
            }).catch()
    };
  return (
    <Card sx={{ minWidth: 275 }} className={classes.Card} key={props.Process.id}>
      <CardContent>
        <Typography variant="h5"  component="div">
            {props.Process.Nom}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
            {props.Process.Desc}
        </Typography>
        <Typography component="div">
            Freezbe : {props.Process.Modele}
        </Typography>
        <Typography component="div">
            Etape : {props.Process.Etape}
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