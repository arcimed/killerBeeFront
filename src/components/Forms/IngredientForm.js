import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import http from '../../service/httpService';
import { toast } from 'react-toastify';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
}));

const IngredientForm = ({ handleClose, item }) => {
  const classes = useStyles();
    var TexteRegex = /^[A-Za-z0-9]*$/
  // create state variables for each input
    const [Nom, setNom] = useState(item.Ingredient ? item.Ingredient.nom :'');
    const [Description, setDescription] = useState(item.Ingredient ? item.Ingredient.description : '');
    const [Grammage, setGrammage] = useState(item.Ingredient ? item.Ingredient.gramme : '');
    const notifySuccess = () => {
      toast.success("Action réalisé !", {
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
    const notifyError = () => {
      toast.error("Action non réalisé !", {
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
    const notifyErrorChamps = () => {
      toast.error("Champs non valide !", {
        position: toast.POSITION.BOTTOM_CENTER
      });
    }


  const handleSubmit = e => {
    e.preventDefault();
    if (TexteRegex.test(Nom) && TexteRegex.test(Description) && TexteRegex.test(Grammage)) {
      if(item.Ingredient) {
      http.put(`api/ingredient/` + item.Ingredient._id,
        {
          nom: Nom,
          description: Description,
          gramme: Grammage
        })
        .then(response => {
          notifySuccess()
          window.location.reload(false)
        }).catch(error => {notifyError()})     
      } else {
        http.post(`api/ingredient/`,
        {
          nom: Nom,
          description: Description,
          gramme: Grammage
        })
        .then(response => {
          notifySuccess()
        }).catch(error => {notifyError()})  
      }
    } else {
      notifyErrorChamps()
    }
    handleClose()
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <TextField
        label="Nom"
        variant="filled"
        required
        value={Nom}
        onChange={e => setNom(e.target.value)}
      />
      <TextField
        label="Description"
        variant="filled"
        required
        value={Description}
        onChange={e => setDescription(e.target.value)}
      />
      <TextField
        label="Grammage"
        type="number"
        value={Grammage}
        onChange={e => setGrammage(e.target.value)}
      />
      <div>
        <Button variant="contained" onClick={handleClose}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
          Ajouter
        </Button>
      </div>
    </form>
  );
};

export default IngredientForm;