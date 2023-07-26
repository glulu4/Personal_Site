import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';


function Neighborhood() {
    const pageStyle = {
        backgroundColor: '#F4976C',
    }

    const titleStyle = {
        color: '#B4DFE5',
        // fontSize: '60px',
        borderBottom: '2px solid #00887A',
        width: 'fit-content'

    }

    const descriptionStyle = {
        color: '#303C6C'
    }
    return (
        <div style={pageStyle} className='pageDiv'>
            <IconButton style={{ position: 'absolute', top: '0', left: '0', margin: '1%', colo: "black" }}
                onClick={() => { window.history.back(); }}
            >
                <ArrowBackIcon></ArrowBackIcon>
            </IconButton>



            <div className='sort-desc-div'>
                <h1 style={titleStyle}  className='sort-title neighborhood-title'>Pittsburgh Neighborhood <br/> Analysis</h1>
                <p style={descriptionStyle} className='sort-desc'>
                    For silly University reasons, I cannot display the code for 
                    this project due to the possibility of
                    other students discovering and copying the project. 
                    However, it's available upon request.
                </p>

            </div>




        </div>
    )
}

export default Neighborhood;