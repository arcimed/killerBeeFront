import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import EtapeForm from './EtapeForm';
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
  const [Modele, setModele] = useState(item.Process ? item.Process.frisbee._id : []);
  const [Data] = useState(freezbeData ? freezbeData : []);
  const [OpenAdd, setOpenAdd] = useState(false);
  const [List, setList] = useState( item.Process ? item.Process.validationTest : null);
  useEffect(() => {
    console.log(List)
    if(validationTest.length === 0 && item.Process) {
      validationTest.push(List)
      console.log(validationTest)
    }
  },[List])

  useEffect(() => {
    console.log(validationTest)
    setList(validationTest)
    console.log(List)
  },[validationTest])

  const handleSubmit = e => {
    e.preventDefault();
    if(item.Process) {
      http.put(`api/fabricationProcess/edit` + item.Process.id,
      {
        nom: Nom,
        description: Description,
        frisbee: Modele,
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
        frisbee: Modele,
        validationTest: validationTest,
      })
      .then(response => {
        console.log("processFreezbe ajouté");
        console.log(Nom, Description);
      }).catch() 
    }
      handleClose();
    };
  const handleDeleteEtape = (editEtape) => {
    console.log(validationTest)
      var index = validationTest.indexOf(editEtape);
      if (index > -1) {
        validationTest.splice(index, 1);
      }
      console.log(validationTest)
  };
  const handleOpenAdd = () => {
    setOpenAdd(true);
  };
  const handleCloseAdd = (etape, desc) => {
    if(etape && desc) {
      validationTest.push({'etape': etape, 'description': desc})
  }
    setOpenAdd(false);
  };
  const renderEdit = (option) => {
    return (
    <Box key={option.description}>
      <Button variant="contained" color="primary" onClick={handleDeleteEtape(option)}>
        {option.description}
      </Button>
    </Box>
    )
  }
  const handleChange = (event) => {
    setModele(event.target.value);
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
          id="outlined-select-currency"
          select
          label="Select"
          value={Modele}
          onChange={handleChange}
          helperText="Please select your frisbee"
        >
          {Data.map((option) => (
          <MenuItem key={option._id} value={option._id}>
            {option.nom}
          </MenuItem>
        ))}
        </TextField>
      {validationTest.length !== 0 ? List.map((option) => (
          renderEdit(option)
        )): null}
      <div>
        <Button variant="contained" color="primary" onClick={handleOpenAdd}>
            Ajouter une étape
        </Button>
        <Dialog open={OpenAdd} onClose={handleCloseAdd}>
            <EtapeForm handleClose={handleCloseAdd} />
        </Dialog>
      </div>
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