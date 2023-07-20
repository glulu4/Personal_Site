import { motion } from 'framer-motion';
import React, { useEffect, useState, useRef } from 'react';
import projectCards from '../Slider/Cards'


import './MySlider.css'





function MySlider() {

    // eslint-disable-next-line
    const [width, setWidth] = useState(0);
    const carousel = useRef();


    useEffect( () => {



        setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
    }, [])






    
    

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