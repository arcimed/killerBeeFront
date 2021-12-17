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

const ProcessForm = ({ handleClose, item, freezbeData }) => {
  const classes = useStyles();
  // create state variables for each input
  const [Nom, setNom] = useState(item.Process ? item.Process.nom :'');
  const [Description, setDescription] = useState(item.Process ? item.Process.description :'');
  const [Modele, setModele] = useState(item.Process ? item.Process.modele : []);
  const [Data] = useState(freezbeData ? freezbeData : []);
  const [ListEtape, setListEtape] = useState( item.Process ? item.Process.validationTest : []);
  const [OpenAdd, setOpenAdd] = useState(false);
  const [OpenEdit, setOpenEdit] = useState(false);
  var validationTest = ListEtape



  const handleSubmit = e => {
    e.preventDefault();
    if(item.Process) {
      http.post(`api/processFreezbe/edit` + item.Process.id,
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
      http.post(`api/processFreezbe/add`,
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

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setModele(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const handleOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleCloseEdit = (editEtape) => {
    var index = validationTest.indexOf(editEtape);
    if (index > -1) {
      validationTest.splice(index, 1);
    }
    console.log(Cookies.get('etape'))
    validationTest.push({'etape': Cookies.get('Etape'), 'description': Cookies.get('Description')})
    Cookies.remove('Etape')
    Cookies.remove('Description')
    console.log(validationTest)
    setOpenEdit(false);
  };
  const handleOpenAdd = () => {
    setOpenAdd(true);
  };
  const handleCloseAdd = () => {
    console.log(Cookies.get('etape'))
    validationTest.push({'etape': Cookies.get('Etape'), 'description': Cookies.get('Description')})
    Cookies.remove('Etape')
    Cookies.remove('Description')
    console.log(validationTest)
    setOpenAdd(false);
  };
  useEffect(() => {
    setListEtape(validationTest)
  }, [validationTest])

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
      {ListEtape.map((option) => (
        <>
          <Button variant="contained" color="primary" key={option.etape} onClick={handleOpenEdit}>
            {option.etape}
          </Button>
          <Dialog open={OpenEdit} onClose={handleCloseEdit(option.etape)}>
            <EtapeForm handleClose={handleCloseEdit} item={option} />
          </Dialog>
        </>
        ))}
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