import React from 'react';

import '../ProjStyle.css'
import './AirlineSystem.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';

function AirlineSystem() {
    return (
        <div className='pageDiv airline-page-div'>
            <IconButton style={{ position: 'absolute', top: '0', left: '0', margin: '1%', color: "white" }}
                onClick={() => { window.history.back(); }}
            >
                <ArrowBackIcon></ArrowBackIcon>
            </IconButton>



            <div className='airline-desc-div'>
                <h1 style={{fontSize:'60px'}} className='airline-title'>Airline System</h1>
                <p className='sort-desc'>
                    For silly University reasons, I cannot display the code for this project due to the possibility of 
                    other students discovering and copying the project. However, it's available upon request.
                </p>

            </div>




        </div>
    );

}

export default AirlineSystem;