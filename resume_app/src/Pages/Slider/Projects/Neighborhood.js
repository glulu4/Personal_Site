import React from 'react';


function Neighborhood() {
    const pageStyle = {
        backgroundColor: '#F4976C',
    }

    const titleStyle = {
        color: '#B4DFE5',
        fontSize: '60px',
        borderBottom: '2px solid #00887A',
        width: 'fit-content'

    }

    const descriptionStyle = {
        color: '#303C6C'
    }
    return (
        <div style={pageStyle} className='pageDiv'>



            <div className='sort-desc-div'>
                <h1 style={titleStyle}  className='sort-title'>Pittsburgh Neighborhood <br/> Analysis</h1>
                <p style={descriptionStyle} className='sort-desc'>
                    For silly University reasons, I cannot display the code to this project due to the possibility of
                    other students discovering and copying the project. However, it's available upon request.
                </p>

            </div>




        </div>
    )
}

export default Neighborhood;