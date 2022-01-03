import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import EtapeForm from './EtapeForm';
import Cookies from 'js-cookie';
import Box from '@mui/material/Box';
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
  let validationTest = []
const ProcessForm = ({ handleClose, item, freezbeData }) => {
  const classes = useStyles();
  // create state variables for each input
  const [Nom, setNom] = useState(item.Process ? item.Process.nom :'');
  const [Description, setDescription] = useState(item.Process ? item.Process.description :'');
  const [Modele, setModele] = useState(item.Process ? item.Process.frisbee : []);
  const [Data] = useState(freezbeData ? freezbeData : []);
  const [OpenAdd, setOpenAdd] = useState(false);
  const [OpenEdit, setOpenEdit] = useState(false);
  const [List] = useState( item.Process ? item.Process.validationTest : null);
  useEffect(() => {
    if(validationTest.length === 0 && item.Process) {
      validationTest.push(List)
    }
  },[List])

  const handleSubmit = e => {
    e.preventDefault();
    if(item.Process) {
      http.put(`api/fabricationProcess/edit` + item.Process.id,
      {
        nom: Nom,
        description: Description,
        frisbee: Modele._id,
        validationTest: validationTest,
      })
      .then(response => {
        console.log("processFreezbe ajouté");
        console.log(Nom, Description);
      }).catch()       
    } else {
      http.post(`api/fabricationProcess/`,
      {
        nom: Nom,
        description: Description,
        frisbee: Modele._id,
        validationTest: validationTest,
      })
      .then(response => {
        console.log("processFreezbe ajouté");
        console.log(Nom, Description);
      }).catch() 
    }
      handleClose();
    };

  const handleOpenEdit = () => {
    console.log(validationTest)
    setOpenEdit(true);
  };
  const handleCloseEdit = (editEtape, etape, desc) => {
    if(etape && desc) {
      var index = validationTest.indexOf(editEtape);
      if (index > -1) {
        validationTest.splice(index, 1);
      }
      validationTest.push({'etape': etape, 'description': desc})
    }
    setOpenEdit(false);
  };
  const handleOpenAdd = () => {
    console.log(validationTest)
    setOpenAdd(true);
  };
  const handleCloseAdd = (etape, desc) => {
    console.log(etape)
    console.log(desc)
    if(etape && desc) {
      validationTest.push({'etape': etape, 'description': desc})
  }
    console.log(validationTest)
    setOpenAdd(false);
  };
  const renderEdit = (option) => {
    return (
    <Box key={option._id}>
      <Button variant="contained" color="primary" onClick={handleOpenEdit}>
        {option.description}
      </Button>
      <Dialog open={OpenEdit} onClose={handleCloseEdit(option._id)}>
        <EtapeForm handleClose={handleCloseEdit} item={option} />
      </Dialog>
    </Box>
    )
  }

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
          value={Modele._id}
          className={classes.formCase}
          input={<OutlinedInput label="Modele" />}
        >
          {Data.map((option) => (
          <MenuItem key={option._id} value={option._id}>
            {option.nom}
          </MenuItem>
        ))}
      </Select>
      {validationTest.length != 0 ? validationTest.map((option) => (
          renderEdit(option)
        )): null}
      <Button variant="contained" color="primary" onClick={handleOpenAdd}>
          Ajouter une étape
      </Button>
      <Dialog open={OpenAdd} onClose={handleCloseAdd}>
          <EtapeForm handleClose={handleCloseAdd} item={''} />
      </Dialog>
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