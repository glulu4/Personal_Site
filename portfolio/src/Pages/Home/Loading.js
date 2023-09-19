import React from 'react'


export default function Loading(){


    const gradientStyle = {
        background: 'linear-gradient(45deg, #ff00cc, #3333ff)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
        textAlign: 'center',
        paddingTop: '30%',


    };
    return(
        <>
            <h2 style={gradientStyle}>Loading something cool... </h2>
        </>
    )
}