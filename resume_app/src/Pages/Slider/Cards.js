import React from 'react';
import { Card } from '@mui/material';
import './Cards.css'
import Button from '@mui/material/Button';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const projectCards = [];

// const navigate = useNavigate()
const cardStyle = {
    width:300,
    height:400,
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    // backgroundColor:'#edb5bf'
}
const underlineOnHoverStyle = {
    fontFamily: "'Carandache Office Sans', sans-serif",
    fontWeight:500,
    textAlign:'center',
    margin: 30,
    textDecoration: 'none',
    ':hover': {
        textDecoration: 'underline',
    },
};

const linkStyle = {
    textDecoration:'none',
    color:'inherit',
    ':hover' :{
        textDecoration: 'none',
    },
    fontFamily: "'Carandache Office Sans', sans-serif",
}





let projectNames = ["Sam's Monday Bagels", "Sorting Algorithms", "Airline System", "Virtual Memory Simulator", "Neighborhood Analysis", "This Site!", "TBD", "TBD", "TBD", "TBD",]

let projectDescriptions = [
    "Professional Bagel Webiste, designed for weekly orders", 
    "Various sorting algorithms, written in Java", 
    "An airline system that uses graphs and related algorithms", 
    "A virtual memory simulation", 
    "Python Program that determines the best Pittsburgh neighborhood", 
    "Simple yet elegant portfolio for Gabby Lulu",
    "...",
    "...",
    "...",
    "..."
]



// url paths, from App.js
const paths = [
    './bagels', 
    './sorting-algorithms',
    './airline',
    './vmsim',
    './neighborhood',
    './portfolio',
    './tbd',
    './tbd',
    './tbd',
    './tbd',

]

// const handleClick = (path) => {
//     navigate(path)
// }

projectNames.map((projectName, index) => {
    projectCards.push(
        <Card key={`${projectName}+${index}`} sx={cardStyle}>
            <div className='card-container'>
                
                <h1 style={underlineOnHoverStyle}>{projectName}</h1>

                <p className='project-description'> {projectDescriptions[index]} </p>

                <div className = 'buttonDiv'>
                    <Button variant="contained" className='buttonStyle' style={{ borderRadius: '50px', backgroundColor:'#E16F7C' }} > 
                        <a style ={linkStyle}href={paths[index]}>view</a>
                    </Button>
                </div>

            </div>
            
        </Card>
    );
    
})

    

export default projectCards;



