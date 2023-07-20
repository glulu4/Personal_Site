import React, { useState } from 'react';
import '../ProjStyle.css'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Button } from '@mui/material';







function Portfolio() {

    const appDotJs = `import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home/Home.js'
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Pages/Sidebar/Sidebar';
import Bagels from './Pages/Slider/Projects/Bagels/Bagels';
import Neighborhood from './Pages/Slider/Projects/Neighborhood';
import Sorts from './Pages/Slider/Projects/Sorts/Sorts.js';
import VmSim from './Pages/Slider/Projects/VmSim';
import AirlineSystem from './Pages/Slider/Projects/Airline/AirlineSystem';
import Tbd from './Pages/Slider/Projects/Tbd.js'
import Portfolio from './Pages/Slider/Projects/Portfolio/Portfolio';


function App() {
  return (
  
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/airline" element={<AirlineSystem />} />
        <Route path="/vmsim" element={<VmSim />} />
        <Route path="/sorting-algorithms" element={<Sorts />} />
        <Route path="/neighborhood" element={<Neighborhood />} />
        <Route path="/bagels" element={<Bagels />} />

        <Route path="/tbd" element={<Tbd />} />
        <Route path="/portfolio" element={<Portfolio />} />


      </Routes>
    

  );
}

export default App;`

    const HomeDotJs = `import React, {useEffect, useState} from 'react';
import IconButton from '@mui/material/IconButton';
import { FaGithub } from 'react-icons/fa';  
import { FaLinkedin } from 'react-icons/fa';
import MySlider from '../Slider/MySlider';
import { motion, useAnimation } from 'framer-motion';
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/joy/Button';
import FormHelperText from '@mui/joy/FormHelperText';


import resume from './Lulu_Gabriel_Resume.pdf'
import emailjs from 'emailjs-com'









import './Home.css'


function Home(){
    emailjs.init('eaIxS2B0R7VcLlCLf')
    const controls = useAnimation();

    const IconButtonStyle = {
        borderRadius: '8px', // Adjust the border radius as needed
        backgroundColor: 'inherit',
        width: 45,
        height: 45,
    }

    const linkStyles = {
        textDecoration:'none',
        color:'inherit'
    }


    const [name,setName] = useState("")
    const [email, setEmail] = useState('');
    const [message,setMessage] = useState('')

    const [nameColor, setNameColor] = useState("neutral")
    const [emailColor, setEmailColor] = useState("neutral")
    const [msgColor, setMsgColor] = useState("neutral")
    const [nameError,setNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [msgError,setMsgError] = useState('')
    const [successMsg,setSuccessMsg] = useState('')


    const handleNameChange = (event) => {
        event.preventDefault();
        setName(event.target.value)
    }
    const handleEmailChange = (event) => {
        event.preventDefault();
        setEmail(event.target.value)
    }
    const handleMessageChange = (event) => {
        event.preventDefault();
        setMessage(event.target.value)
    }



    function sendEmail(){

        var templateParams = {
            name: name,
            email: email,
            message:  message ,
            reply_to:email,
        };

        emailjs.send('email_portfolio', 'template_l5y3xbi', templateParams)
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
            }, function (error) {
                console.log('FAILED...', error);
            });
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        

        if ( !email || !(email.includes("@") && email.includes(".")) ){
            setEmailColor("danger")
            setEmailError("Enter your email")
            
            // render a message to input email
            // change email box to red

        }
        else{
            setEmailColor("success")
            setEmailError("")
        }

        // if name is empty
        if ( !name ) {
            // render a message to input name
            // change name box to red
            setNameError("Enter your name")
            setNameColor("danger")
        }
        else{
            setNameColor("success")
            setNameError("")
        }

        if (!message) {
            setMsgColor("danger")
            setMsgError("You can't leave this blank!")

            // render a message to put message in
            // change message box to red

        }
        else{
            setMsgColor("success")
            setMsgError("")
            

        }

        // if one returns false, we enter the conditon, and return
        if (!(message && name && (email && email.includes("@") && email.includes(".")))) {
            return;
        }


        // reset everything and 
        setSuccessMsg("Your message was sent!")
        setEmailColor("neutral")
        setMsgColor("neutral")
        setNameColor("neutral")

        setName('')
        setEmail('')
        setMessage('')




        sendEmail()



    }
  

    const startSwingAnimation = () => {
        controls.start({
            // rotate: [-10, 20, 60], // Rotate back and forth between -10 and 10 degrees
            rotate: [-15,5,-15], // More keyframes for a smoother rotation
            transition: {
                duration: 1,
                ease: 'easeInOut', // easeOut, easeIn
                repeat: Infinity,
                repeatType: 'reverse',
            },
            // transformOrigin: "50%", // Set the transform-origin to left side
        });
    };


    // useEffect with the empty [] runs when it mounts, without runs it every render
    useEffect(() => {
        startSwingAnimation();

        // const timer = setInterval(() => {

        //     if (flicker){
        //         setProjectOpacity('1.7')
        //         setFlicker( (prev)=> !prev )
        //     }
        //     else{
        //         setProjectOpacity('0.4')
        //         setFlicker((prev) => !prev)
        //     }


            
        // }, 900);

        // return () => {
        //     clearInterval(timer);
        // };

    }, ); // Runs the animation when the component mounts


    return(
        <div className='home-container'>
            <div className='scroll-page-one'>

                <div style={{display:'flex', justifyContent:'center', flexDirection:'row', marginBottom:'2%'}}>
                    <h1 className="name">
                        Gabb<motion.div
                            animate={controls}
                            
                        >y </motion.div> <br/>Lulu
                    </h1>                
                </div>
                

            </div>
            <div className='project-section'>
                <h1 className='project-title-section'>Project   <motion.div
                    animate={{
                        x: 2,
                        y: 10,
                        scale: 1, // changes the size of the letter
                        rotate: 20,
                    }}
                >s</motion.div></h1>

                <div className='slider-container'>
                    <MySlider />
                </div>


                
            </div>
            <div className='content-section'>


                <div className='about-section'>
                    <h1 className='about'>About</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Fusce fermentum nibh a metus vulputate, vitae dictum turpis tincidunt. 
                        Sed dapibus semper tellus vitae rhoncus. Proin eu mauris quam. 
                        Vestibulum vestibulum tincidunt enim, non fermentum massa. 
                        Sed nec nisi non ligula luctus tincidunt. Quisque id lectus nisl. 
                        Sed mollis ultricies condimentum. 
                        Donec auctor augue eu augue ultrices, at efficitur ex pellentesque. 
                        Aenean luctus lorem id tellus tristique dignissim.</p>

                    <div className='other-links'>

                        <a style={linkStyles} href={resume} target="_blank">
                            <p className="link hover">Resume</p>
                        </a>
                        <a style={linkStyles} href="#" target="_blank">
                            <p className="link hover">Books</p>
                        </a>
                        <a style={linkStyles} href="#" target="_blank">
                            <p className="link hover">Job history</p>
                        </a>
                        <a style={linkStyles} href="#" target="_blank">
                            <p className="link hover">Etc</p>
                        </a>
                    </div>
                </div>


                <div className='contact'>
                    <h1 className='about'>Contact</h1>
                    <div style={{
                        width:'inherit',
                        display:'flex',
                        paddingBottom:'10%',
                        gap:'2px',
                    }}>
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <Textarea color={nameColor} onChange={handleNameChange} value={name} placeholder="Name"></Textarea>
                            <FormHelperText style={{ color: '#d32f2f', paddingLeft:'2%' }}>{nameError}</FormHelperText>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Textarea color={emailColor} value={email} onChange={handleEmailChange} placeholder="Email"></Textarea>
                            <FormHelperText style={{ color: '#d32f2f', paddingLeft: '2%' }} >{emailError}</FormHelperText>

                        </div>
                        
                    </div>
          
                    <Textarea color={msgColor} value={message} onChange={handleMessageChange} style={{height:'400px'}} placeholder="Message"></Textarea>
                    <FormHelperText style={{ color: '#d32f2f', paddingLeft: '2%' }} >{msgError}</FormHelperText>

                    <Button
                        style={{marginTop:'2%'}}
                        color="primary"
                        disabled={false}
                        onClick={handleSubmit}
                        size="md"
                        variant="soft"
                        
                    >Submit</Button>

                    
                    <p className='email-success'style={{ float: 'right', fontFamily: 'Manrope', color:'#4caf50'}}>{successMsg}</p>
                </div>
               

               

                <div className='button-container'>
                    <IconButton sx={IconButtonStyle} href='https://github.com/glulu4' target="_blank">
                        <FaGithub style={{ color: 'black' }} />
                    </IconButton>

                    <IconButton sx={IconButtonStyle} href='https://www.linkedin.com/in/gabriel-lulu/' target="_blank">
                        <FaLinkedin style={{ color: '#0072b1' }} />
                    </IconButton>


                </div>

            </div>




        </div>




    );

}

export default Home;
`
    const MySliderDotJs = `import { motion } from 'framer-motion';
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
export default MySlider;`

    const vmSimDotJs = `import React from 'react';


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
                    For silly University reasons, I cannot display the code to this project due to the possibility of
                    other students discovering and copying the project. However, it's available upon request.
                    <br/>
                </p>

            </div>




        </div>
    )
}

export default VmSim;`
    const [selectedFile, setSelectedFile] = useState(appDotJs)
    const [language, setLanguage] = useState("javascript")


    const pageStyle = {
        backgroundColor:'#86b3d1',

    }

    const titleStyle = {
        color: '#ffffff',
        borderBottom: '2px solid black',
    }

    const descriptionStyle = {
    }


    return (
        <div style={pageStyle} className='pageDiv'>



            <div className='sort-desc-div'>
                <h1 style={titleStyle} className='sort-title'>Porfolio Website</h1>
                <p style={descriptionStyle} className='sort-desc'>
                    Some code snippets from the site you're visiting ( the rest is on my github )! I wanted to make this portfolio for two main reasons. 
                    One, to  showcase some of my projects in another setting, other than my resume. Two, to further develop my React knowledge and skills.
                    All animations on this website were developed with the React Framer Motion library. I plan on adding a 3D model to the homepage soon (written on July 19th, 2023)
                </p>

            </div>

            <div className='code-container'>
                <div className='code-header'>
                    <div className='filename-box'>
                        <Button size="medium" class="button" onClick={() => { setSelectedFile(appDotJs) }}>App.js </Button>
                        <Button size="medium" class="button" onClick={() => { setSelectedFile(HomeDotJs) }}>Home.js </Button>
                        <Button size="medium" class="button" onClick={() => { setSelectedFile(MySliderDotJs) }}>MySlider.js </Button>
                        <Button size="medium" class="button" onClick={() => { setSelectedFile(vmSimDotJs) }}>VmSim.js </Button>




                    </div>

                </div>

                <br></br>
                <br></br>
                <br></br>
                <SyntaxHighlighter language="java" style={atomDark}>

                    {selectedFile}
                </SyntaxHighlighter>

                



            </div>


        </div>
    );
    
}

export default Portfolio