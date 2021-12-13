import React, { useState } from 'react';
import FreezbeForm from "../components/Forms/FreezbeForm";
import FreezbeCards from "../components/Cards/FreezbeCards";
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    addButton:{
        margin: '10px'
    }
}));

const Freezbe = () => {
    const classes = useStyles();
    const [openAdd, setOpenAdd] = useState(false);
    const FreezbeData = [
        {
          id: 1,
          Nom: 'Freezbe1',
          Desc: ['Du fer'],
          pUHT: 'pUHT',
          Gamme: 'Gamme 1',
          Ingredient: [],
          Grammage: 10,
        },
        {
          id: 2,
          Nom: 'Freezbe2',
          Desc: ['Du plastique'],
          pUHT: 'pUHT',
          Gamme: 'Gamme 2',
          Ingredient: [],
          Grammage: 10,
        },
    ];
    const handleOpenAdd = () => {
      setOpenAdd(true);
    };
  
    const handleCloseAdd = () => {
      setOpenAdd(false);
    };
    return (
        <Box>
            <Button variant="contained" color="#cddc39" className={classes.addButton} onClick={handleOpenAdd}>
                Ajouter
            </Button>
            <Dialog open={openAdd} onClose={handleCloseAdd}>
                <FreezbeForm handleClose={handleCloseAdd} item={''}/>
            </Dialog>
            <Box className={classes.root}>
                {
                    FreezbeData.map((item)=>{
                        return (
                            <FreezbeCards Freezbe={item}></FreezbeCards>
                        )
                    })
                }
            </Box>
        </Box>
    );
};

export default Freezbe;