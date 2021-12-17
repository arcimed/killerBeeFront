import React, { useState, useEffect } from 'react';
import ProcessForm from "../components/Forms/ProcessForm";
import ProcessCards from "../components/Cards/ProcessCards";
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
        marginLeft: "47%",
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

const Process = () => {
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
    const ProcessData = [
        {
          id: 1,
          Nom: 'Process1',
          Desc: ['Du fer'],
          Modele: [],
          Etape: 'Etape 1',
        },
        {
          id: 2,
          Nom: 'Process2',
          Desc: ['Du plastique'],
          Modele: [],
          Etape: 'Etape 2',
        },
    ];
    const classes = useStyles();
    const [openAdd, setOpenAdd] = useState(false);
    const [query, setQuery] = useState('');
    const [Data, setData] = useState(ProcessData);
    const handleOpenAdd = () => {
      setOpenAdd(true);
    };
  
    const handleCloseAdd = () => {
      setOpenAdd(false);
    };
    useEffect(() => {
        http.get(`api/freezbeProcess/`)
            .then((response) => {
                setData(response.data.data)
            }).catch()
      
    }, [])
    useEffect(() => {
        //Change initialvalues only if article has been change after scrapping
            const filter = ProcessData.filter(process => {
                return process.Nom.toLowerCase().includes(query.toLowerCase())
               })
          setData(filter)
          if (query === '') {
            setData(ProcessData)
          }
      }, [query])
    return (
        <Box>
            <h1  className={classes.title} >Processus</h1>
            <p className={classes.text}>Nos processus ont été conçus pour les meilleurs freezbe disponibles sur le marché actuel, vous pouvez retrouver ici la description et les étapes de chaque processus.</p>
            <form>
                <input className={classes.search} variant="filled" type="text" id="filter" placeholder="Search for..." value={query} onChange={e => setQuery(e.target.value)}/>
            </form>
            <h2 className={classes.title}>Vous retrouverez ici tous nos processus</h2>
            <Button variant="contained" color="default" className={classes.addButton} onClick={handleOpenAdd}>
                Ajouter
            </Button>
            <Dialog open={openAdd} onClose={handleCloseAdd}>
                <ProcessForm handleClose={handleCloseAdd} item={''} freezbeData={FreezbeData}/>
            </Dialog>
            <Box className={classes.root}>
                {
                    Data.map((item)=>{
                        return (
                            <ProcessCards Process={item} freezbeData={FreezbeData}></ProcessCards>
                        )
                    })
                }
            </Box>
        </Box>
    );
};

export default Process;