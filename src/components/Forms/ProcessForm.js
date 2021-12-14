import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

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

const ProcessForm = ({ handleClose, item, freezbeData }) => {
  const classes = useStyles();
  // create state variables for each input
  const [Nom, setNom] = useState(item.Process ? item.Process.Nom :'');
  const [Description, setDescription] = useState(item.Process ? item.Process.Desc :'');
  const [Modele, setModele] = useState(item.Process ? item.Process.Modele : []);
  const [Etape, setEtape] = useState(item.Process ? item.Process.Etape : '');
  const [Data] = useState(freezbeData ? freezbeData : []);

  const handleSubmit = e => {
    e.preventDefault();
    console.log(Nom, Description);
    handleClose();
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setModele(
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
        required
        value={Description}
        onChange={e => setDescription(e.target.value)}
      />
      <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={Modele}
          onChange={handleChange}
          className={classes.formCase}
          input={<OutlinedInput label="Modele" />}
        >
          {Data.map((option) => (
          <MenuItem key={option.Nom} value={option.Nom}>
            {option.Nom}
          </MenuItem>
        ))}
      </Select>
      <TextField
        label="Etapes"
        variant="filled"
        required
        value={Etape}
        onChange={e => setEtape(e.target.value)}
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

export default ProcessForm;