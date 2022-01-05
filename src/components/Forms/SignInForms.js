import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Cookies from 'js-cookie';
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

const Form = ({ handleClose }) => {
  var expressionReguliere = /^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
  const classes = useStyles();
  // create state variables for each input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const handleSubmit = e => {
    e.preventDefault();
    http.post(`api/auth/`,
      {
          email: email,
          password: password,
      })
      .then(response => {
        Cookies.set('user', response.data.token)
        notifySuccess()
        window.location.reload(false)
      }).catch(error => {
        notifyError()
      })
    handleClose();
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <TextField
        label="Email"
        variant="filled"
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        variant="filled"
        type="password"
        required
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <div>
        <Button variant="contained" onClick={handleClose}>
          Cancel
        </Button>
        {expressionReguliere.test(email) ? (
        <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
            Login
        </Button>
        ) : null}
      </div>
    </form>
  );
};

export default Form;