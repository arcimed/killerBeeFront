import React, { useState } from 'react';
import IngredientForm from "../components/IngredientForm";
import Button from '@material-ui/core/Button';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';

const Ingredients = () => {
    const [openAdd, setOpenAdd] = useState(false);

    const handleOpenAdd = () => {
      setOpenAdd(true);
    };
  
    const handleCloseAdd = () => {
      setOpenAdd(false);
    };
    return (
        <Box>
            <Button variant="contained" color="#cddc39" onClick={handleOpenAdd}>
                Ajouter
            </Button>
            <Dialog open={openAdd} onClose={handleCloseAdd}>
                <IngredientForm handleClose={handleCloseAdd} />
            </Dialog>
        </Box>
    );
};

export default Ingredients;