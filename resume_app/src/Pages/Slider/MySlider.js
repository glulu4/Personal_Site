import { motion } from 'framer-motion';
import React, { useEffect, useState, useRef } from 'react';
import projectCards from '../Slider/Cards'
import { isMobile } from 'mobile-device-detect';
// import { isMobile } from 'react-device-detect';


import './MySlider.css'





function MySlider() {

    const [width, setWidth] = useState(0);
    const carousel = useRef();

    const _width = window.innerWidth

    useEffect( () => {



        setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
    }, [])


    const dragConstraints = !isMobile ? {
        right: (width + 1200),
        left: -(width + 1200),
    } 
    : 
    {
            right: (width + 1700),
            left: -(width + 1700),
    }



    
    

    return (
        <div className='slider'>
            {/* drag='x' add to second div with the numbers ans shit */}
            <motion.div ref={carousel} whileTap={{ cursor: 'grabbing' }} className='carousel' >
                <motion.div  className='inner-carousel' style={{ touchAction: 'pan-x' }}> 
                    {projectCards.map((card, index) => {
                        return (
                            <motion.div key={index} className='item'>
                                {card}
                            </motion.div>
                        )
                    })}
                </motion.div>
            </motion.div>
        </div>
    );

}
export default MySlider;