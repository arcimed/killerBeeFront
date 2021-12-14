import React from 'react';
import {Box, makeStyles  } from "@material-ui/core";
import killerBeeLogo from '../media/KillerBee.png'
import NinjattackLogo from '../media/Ninjattack.png'


const useStyles = makeStyles(theme => ({
    title: {
      textAlign: 'center',
      position:'relative'
    },
    text: {
        textAlign:'center',
        marginLeft:"20%",
        marginRight:'20%',
        marginTop:"5%",
        position:'relative'
    },
    img: {
        width:'200px',
        height:'200px'
    }
    
  }));

  
const Home = () => {
    const classes = useStyles();
    return (
        <Box>
            <Box className={classes.text}>
                <h1>KillerBee</h1>
                <img className={classes.img} src={killerBeeLogo} alt="KillerBee logo"></img>
                <p>L'entreprise KillerBee, industrie qui conçoit, produit et commerciale des Frisbee en France depuis les années 1960. La grosse partie du chiffre d'affaire provient du marché du loisir et donc des ventes faites aux enseignes de la grande distribution. Néanmoins KillerBee tient à garder le marché du sport de haut niveau, certes moins intéressant financièrement, mais permet d'afficher son savoir-faire et son expertise. Environ 1000 salariés au total, 3 sites en France (50 personnes dans des bureaux commerciaux dans un immeuble sur Paris, environ 900 personnes sur un gros site de production sur Lille, et enfin 50 collaborateurs sur le site de R&D à Marseille).</p>
            </Box>
            <Box className={classes.text}>
                <h1>NinjaTTack</h1>
                <img className={classes.img} src={NinjattackLogo} alt="KillerBee logo"></img>
                <p> L'entreprise ninjaTTack. Jeune ESN française créé en 2010. Cette entreprise compte environ 30 salariés répartis sur 2 sites (5 personnes à la direction et 15 informaticiens sur Paris et une dizaine de spécialistes techniques sur le nouveau site qui vient d'ouvrir sur Bordeaux). Les équipes de ninjaTTack sont multidisciplinaires et l'entreprise possède des experts dans tous les domaines : programmation WEB, architecture logicielle, gestion des BDD, architecture réseaux et systèmes, etc.</p>
            </Box>
        </Box>
    );
};

export default Home;