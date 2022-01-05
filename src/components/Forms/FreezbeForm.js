import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
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
  formBox: {
    display: 'flex'
  },
  formCase: {
    width: 300,
  }
}));

const IngredientForm = ({ handleClose, item, ingredientsData }) => {
  const classes = useStyles();
  var TexteRegex = /^[A-Za-z0-9]*$/
  // create state variables for each input
  const [Nom, setNom] = useState(item.Freezbe ? item.Freezbe.nom :'');
  const [Description, setDescription] = useState(item.Freezbe ? item.Freezbe.description :'');
  const [pUHT, setpUHT] = useState(item.Freezbe ? item.Freezbe.pUHT: '');
  const [Gamme, setGamme] = useState(item.Freezbe ? item.Freezbe.gamme: '');
  const [Ingredients, setIngredients] = useState(item.Freezbe ? item.Freezbe.ingredients : []);
  const [Grammage, setGrammage] = useState(item.Freezbe ? item.Freezbe.gramme : '');
  const [Data] = useState(ingredientsData ? ingredientsData : []);
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
    if (TexteRegex.test(Nom) && TexteRegex.test(Description) && TexteRegex.test(pUHT) && TexteRegex.test(Gamme) && TexteRegex.test(Grammage)) {
      if(item.Freezbe) {
        http.put(`api/frisbee/` + item.Freezbe._id,
        {
          nom: Nom,
          description: Description,
          puht : pUHT,
          gamme : Gamme,
          ingredients : Ingredients,
          gramme : Grammage,
        })
        .then(response => {
          notifySuccess()
          handleClose(true);
        }).catch( error => {
          notifyError()
          handleClose(false)} )
      } else {
        http.post(`api/frisbee/`,
        {
          nom: Nom,
          description: Description,
          puht : pUHT,
          gamme : Gamme,
          ingredients : Ingredients,
          gramme : Grammage,
        })
        .then(response => {
          notifySuccess()
          handleClose(true);
        }).catch( error => {
          notifyError()
          handleClose(false)} )
      }
    }
    else {
      notifyErrorChamps()
    }
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setIngredients(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
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
        value={Description}
        onChange={e => setDescription(e.target.value)}
      />
      <TextField
        label="pUHT"
        variant="filled"
        required
        type="number"
        value={pUHT}
        onChange={e => setpUHT(e.target.value)}
      />
      <TextField
        label="Gamme"
        variant="filled"
        required
        value={Gamme}
        onChange={e => setGamme(e.target.value)}
      />
      <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          required
          value={Ingredients}
          onChange={handleChange}
          className={classes.formCase}
          input={<OutlinedInput label="Ingredient" />}
        >
          {Data.map((option) => (
          <MenuItem key={option._id} value={option._id}>
            {option.nom}
          </MenuItem>
        ))}
      </Select>
      <TextField
        label="Grammage"
        variant="filled"
        type="number"
        required
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