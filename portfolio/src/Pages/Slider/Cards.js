import React from 'react';
import { Card } from '@mui/material';
import './Cards.css'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';



const baseUrl = window.location.origin;
let cardStyle = {}

isMobile ? cardStyle = {
    // if we are on mobile
    width: 300,
    height: 400,
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
} : cardStyle = {
    width: 300,
    height: 400,
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
}


const underlineOnHoverStyle = {
    // fontFamily: "'Carandache Office Sans', sans-serif",
    fontFamily: "Manrope",

    fontWeight: 700,
    textAlign: 'center',
    margin: 30,
    textDecoration: 'none',
    ':hover': {
        textDecoration: 'underline',
    },
};

const linkStyle = {
    textDecoration: 'none',
    color: 'black',

    ':hover': {
        textDecoration: 'none',
    },
    fontFamily: "Manrope",
    fontWeight:500,
}



const projectCards = []

let projectNames = ["Sam's Monday Bagels", "Sorting Algorithms", "Airline System", "Virtual Memory Simulator", "Neighborhood Analysis", "This Site!", "Database Manager", "TBD", "TBD", "TBD", "TBD", "TBD"]

let projectDescriptions = [
    "Professional Bagel Webiste, designed for weekly orders",
    "Various sorting algorithms, written in Java",
    "An airline system that uses graphs and related algorithms",
    "A virtual memory simulation",
    "Python Program that determines the best Pittsburgh neighborhood",
    "Simple yet elegant portfolio for Gabby Lulu",
    "Database manager for Sam's Bagels",
    "...",
    "...",
    "...", 
    "...", 
    "..."
]



// url paths, from App.js

const paths = [
    `${baseUrl}/bagels`,
    `${baseUrl}/sorting-algorithms`,
    `${baseUrl}/airline`,
    `${baseUrl}/vmsim`,
    `${baseUrl}/neighborhood`,
    `${baseUrl}/portfolio`,
    `${baseUrl}/DatabaseManager`,
    `${baseUrl}/tbd`,
    `${baseUrl}/tbd`,
    `${baseUrl}/tbd`,
    `${baseUrl}/tbd`,
    `${baseUrl}/tbd`,
];


// eslint-disable-next-line
projectNames.map((projectName, index) => {
    projectCards.push(
        <Link to={paths[index]} style={linkStyle}>
        <Card key={`${projectName}+${index}`} sx={cardStyle}>
            <div className='card-container'>

                <h1 style={underlineOnHoverStyle}>{projectName}</h1>

                <p className='project-description'> {projectDescriptions[index]} </p>

                <div className='buttonDiv'>
                <Button variant="contained" className='buttonStyle' style={{ borderRadius: '50px', backgroundColor: '#EEF8FF', color:'black' }} >
                        view
                </Button>

                </div>

            </div>

        </Card>
        </Link >  
    );

})



export default projectCards;
