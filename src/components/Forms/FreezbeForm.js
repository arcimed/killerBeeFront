import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import http from '../../service/httpService';

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
  // create state variables for each input
  const [Nom, setNom] = useState(item.Freezbe ? item.Freezbe.Nom :'');
  const [Description, setDescription] = useState(item.Freezbe ? item.Freezbe.Desc :'');
  const [pUHT, setpUHT] = useState(item.Freezbe ? item.Freezbe.pUHT: '');
  const [Gamme, setGamme] = useState(item.Freezbe ? item.Freezbe.Gamme: '');
  const [Ingredients, setIngredients] = useState(item.Freezbe ? item.Freezbe.Ingredient : []);
  const [Grammage, setGrammage] = useState(item.Freezbe ? item.Freezbe.Grammage : '');
  const [Data] = useState(ingredientsData ? ingredientsData : []);
  
  const handleSubmit = e => {
    e.preventDefault();
    if(item.Freezbe) {
      http.put(`api/freezbe/edit` + item.Freezbe.id,
      {
        nom: Nom,
        description: Description,
        pUHT : pUHT,
        gamme : Gamme,
        ingredients : Ingredients,
        gramme : Grammage,
      })
      .then(response => {
        console.log("freezbe ajouté");
        console.log(Nom, Description, pUHT, Gamme, Ingredients, Grammage);
      }).catch()
    } else {
      http.post(`api/freezbe/add`,
      {
        nom: Nom,
        description: Description,
        pUHT : pUHT,
        gamme : Gamme,
        ingredients : Ingredients,
        gramme : Grammage,
      })
      .then(response => {
        console.log("freezbe ajouté");
        console.log(Nom, Description, pUHT, Gamme, Ingredients, Grammage);
      }).catch()
    }
   
    handleClose();
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
          value={Ingredients}
          onChange={handleChange}
          className={classes.formCase}
          input={<OutlinedInput label="Ingredient" />}
        >
          {Data.map((option) => (
          <MenuItem key={option.Nom} value={option.Nom}>
            {option.Nom}
          </MenuItem>
        ))}
      </Select>
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