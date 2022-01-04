import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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

const ProcessForm = ({ handleClose }) => {
  const classes = useStyles();
  // create state variables for each input
  const [Etape, setEtape] = useState('');
  const [Description, setDescription] = useState('');

  const handleSubmit = e => {
        e.preventDefault();
        handleClose(Etape, Description);
    };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <TextField
        label="Etape"
        variant="filled"
        required
        value={Etape}
        onChange={e => setEtape(e.target.value)}
      />
      <TextField
        label="Description"
        variant="filled"
        required
        value={Description}
        onChange={e => setDescription(e.target.value)}
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