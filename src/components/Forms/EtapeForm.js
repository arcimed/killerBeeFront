import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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

const ProcessForm = ({ handleClose }) => {
  const classes = useStyles();
  // create state variables for each input
  const [Etape, setEtape] = useState('');
  const [Description, setDescription] = useState('');
  var TexteRegex = /^[A-Za-z0-9]*$/

  const notifyErrorChamps = () => {
    toast.error("Champs non valide !", {
      position: toast.POSITION.BOTTOM_CENTER
    });
  }

  const handleSubmit = e => {
        e.preventDefault();
        if (TexteRegex.test(Etape) && TexteRegex.test(Description)) {
          handleClose(Etape, Description);
        } else {
          notifyErrorChamps()
        }
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