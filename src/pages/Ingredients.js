import React, { useState } from 'react';
import IngredientForm from "../components/Forms/IngredientForm";
import IngredientsCards from "../components/Cards/IngredientsCards";
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

const Ingredients = () => {
    const classes = useStyles();
    const [openAdd, setOpenAdd] = useState(false);
    const IngredientsData = [
        {
          id: 1,
          Nom: 'Fer',
          Desc: ['Du fer'],
        },
        {
          id: 2,
          Nom: 'Plastique',
          Desc: ['Du plastique'],
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
                <IngredientForm handleClose={handleCloseAdd} item={''}/>
            </Dialog>
            <Box className={classes.root}>
                {
                    IngredientsData.map((item)=>{
                        return (
                            <IngredientsCards Ingredient={item}></IngredientsCards>
                        )
                    })
                }
            </Box>
        </Box>
    );
};

export default Ingredients;