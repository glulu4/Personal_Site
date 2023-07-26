import React from 'react';


function VmSim() {
    const pageStyle = {
        backgroundColor: '#77A6F7',
    }

    const titleStyle = {
        color:'#FFFFFF',
        fontSize:'60px',
        borderBottom: '2px solid #00887A',
        
    }

    const descriptionStyle = {
        color:''
    }


    return (
        <div style={pageStyle} className='pageDiv'>



            <div className='sort-desc-div'>
                <h1 style={titleStyle} className='sort-title'>Virtual Memory <br/>Simulator</h1>
                <p style={descriptionStyle} className='sort-desc'>
                    For silly University reasons, I cannot display the code for this project due to the possibility of
                    other students discovering and copying the project. However, it's available upon request.
                    <br/>
                </p>

            </div>




        </div>
    )
}

export default VmSim;