import React, { useState, useEffect } from 'react';
import FreezbeForm from "../components/Forms/FreezbeForm";
import FreezbeCards from "../components/Cards/FreezbeCards";
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
        marginBottom:'10%',
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

const Freezbe = () => {

    const [IngredientsData, setIngredientsData] = useState([]);
    const classes = useStyles();
    const [openAdd, setOpenAdd] = useState(false);
    const [query, setQuery] = useState('');
    const [Data, setData] = useState([]);
   
    const handleOpenAdd = () => {
      setOpenAdd(true);
    };
  
    const handleCloseAdd = (response) => {
        if(response){
            http.get(`api/frisbee/`)
            .then((response) => {
                setData(response.data)
            }).catch()
        }
      setOpenAdd(false);
    };

    useEffect(() => {
        http.get(`api/frisbee/`)
            .then((response) => {
                setData(response.data)
            }).catch()
        http.get(`api/ingredient/`)
        .then((response) => {
            setIngredientsData(response.data)
        }).catch()

    }, [])
    var tempData = Data
    useEffect(() => {
        //Change initialvalues only if article has been change after scrapping
            const filter = tempData.filter(freezbe => {
                if (query !== '') {
                    return freezbe.nom.toLowerCase().includes(query.toLowerCase())
                }
                return null
            })
          setData(filter)
          if (query === '') {
            http.get(`api/frisbee/`)
            .then((response) => {
                setData(response.data)
            }).catch()
          }
        // eslint-disable-next-line 
      }, [query])

    return (
        <Box>
            <h1  className={classes.title} >Freezbe</h1>
            <p className={classes.text}>Nos freezbe ont ??t?? con??us avec les meilleurs ingr??dients disponibles sur le march?? actuel, vous pouvez retrouver ici la description, composition et poids de chaque freezbe.</p>
            <form>
                <input className={classes.search} variant="filled" type="text" id="filter" placeholder="Search for..." value={query} onChange={e => setQuery(e.target.value)}/>
            </form>
            <h2 className={classes.title}>Vous retrouverez ici tous nos Freezbe</h2>
            <Button variant="contained" color="default" className={classes.addButton} onClick={handleOpenAdd}>
                Ajouter
            </Button>
            <Dialog open={openAdd} onClose={handleCloseAdd}>
                <FreezbeForm handleClose={handleCloseAdd} item={''} ingredientsData={IngredientsData}/>
            </Dialog>
            <Box className={classes.root}>
                {
                    Data.map((item)=>{
                        return (
                            <FreezbeCards Freezbe={item} ingredientsData={IngredientsData}></FreezbeCards>
                        )
                    })
                }
            </Box>
        </Box>
    );
};

export default Freezbe;