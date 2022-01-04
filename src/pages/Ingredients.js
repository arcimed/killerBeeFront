import React, { useState, useEffect } from 'react';
import IngredientForm from "../components/Forms/IngredientForm";
import IngredientsCards from "../components/Cards/IngredientsCards";
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import http from '../service/httpService';

const useStyles = makeStyles(theme => ({
    title: {
        textAlign:'center'
    },
    text: {
        textAlign:'center',
        marginLeft:"20%",
        marginRight:'20%'
    },
    root: {
        display: 'flex',
        marginTop:'3%',
        marginLeft: '10%',
        marginBottom:'15%',
        marginRight: '10%',
        flexWrap: 'wrap',
    },
    addButton:{
        marginTop:'3%',
        marginLeft: '47%',
        [theme.breakpoints.down('sm')]: {
            marginLeft: '35%',
          },
    },
    search: {
        marginTop:'3%',
        marginLeft: '20%',
        width: '60%'
    }
}));

const Ingredients = () => {
    const classes = useStyles();
    const [openAdd, setOpenAdd] = useState(false);
    const [query, setQuery] = useState('');
    const [Data, setData] = useState([]);
    const handleOpenAdd = () => {
      setOpenAdd(true);
    };
  
    const handleCloseAdd = () => {
        http.get(`api/ingredient/`)
        .then((response) => {
            setData(response.data)
        }).catch()
        setOpenAdd(false);
    };
    useEffect(() => {
        http.get(`api/ingredient/`)
            .then((response) => {
                setData(response.data)
            }).catch()
      
    }, [])

    var tempData = Data
    useEffect(() => {
        //Change initialvalues only if article has been change after scrapping
            const filter = tempData.filter(ingredient => {
                if (query !== '') {
                    return ingredient.nom.toLowerCase().includes(query.toLowerCase())
                }
                return null
            })
          setData(filter)
          if (query === '') {
            http.get(`api/ingredient/`)
            .then((response) => {
                setData(response.data)
            }).catch()
          }
      }, [query])

    return (
        <Box>
            <h1  className={classes.title} >Ingrédients</h1>
            <p className={classes.text}>Nos Ingrédients ont été séléctionné par les meilleurs experts disponibles sur le marché actuel, vous pouvez retrouver ici leur nom et descritpion.</p>
            <form>
                <input className={classes.search} variant="filled" type="text" id="filter" placeholder="Search for..." value={query} onChange={e => setQuery(e.target.value)}/>
            </form>
            <h2 className={classes.title}>Vous retrouverez ici tous nos ingrédients</h2>
            <Button variant="contained" color="default" className={classes.addButton} onClick={handleOpenAdd}>
                Ajouter
            </Button>
            <Dialog open={openAdd} onClose={handleCloseAdd}>
                <IngredientForm handleClose={handleCloseAdd} item={''}/>
            </Dialog>
            <Box className={classes.root}>
                {
                    Data.map((item)=>{
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