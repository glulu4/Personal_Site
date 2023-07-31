import React, { useState } from 'react';
import '../ProjStyle.css'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';







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

    const HomeDotJs = `

import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { FaGithub } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import MySlider from '../Slider/MySlider';
import { motion, useAnimation } from 'framer-motion';
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/joy/Button';
import FormHelperText from '@mui/joy/FormHelperText';


import resume from './Lulu_Gabriel_Resume.pdf';
import emailjs from 'emailjs-com';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


import './Home.css'
import { isMobile } from 'react-device-detect';
// import { json } from 'react-router-dom';

import ModelCanvas from './ModelCanvas';







function Home() {
    emailjs.init('eaIxS2B0R7VcLlCLf')
    const controls = useAnimation();

    const IconButtonStyle = {
        borderRadius: '8px', // Adjust the border radius as needed
        backgroundColor: 'inherit',
        width: 45,
        height: 45,
    }

    const linkStyles = {
        textDecoration: 'none',
        color: 'inherit',
        width: 'fit-content'
    }

    const fontSize = isMobile ? '70px' : '100px'


    const [name, setName] = useState("")
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('')

    const [nameColor, setNameColor] = useState("neutral")
    const [emailColor, setEmailColor] = useState("neutral")
    const [msgColor, setMsgColor] = useState("neutral")
    const [nameError, setNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [msgError, setMsgError] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const [open, setOpen] = React.useState(false);


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



    function sendEmail() {

        var templateParams = {
            name: name,
            email: email,
            message: message,
            reply_to: email,
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



        if (!email || !(email.includes("@") && email.includes("."))) {
            setEmailColor("danger")
            setEmailError("Enter your email")

            // render a message to input email
            // change email box to red

        }
        else {
            setEmailColor("success")
            setEmailError("")
        }

        // if name is empty
        if (!name) {
            // render a message to input name
            // change name box to red
            setNameError("Enter your name")
            setNameColor("danger")
        }
        else {
            setNameColor("success")
            setNameError("")
        }

        if (!message) {
            setMsgColor("danger")
            setMsgError("You can't leave this blank!")

            // render a message to put message in
            // change message box to red

        }
        else {
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
            rotate: [-15, 5, -15], // More keyframes for a smoother rotation
            transition: {
                duration: 1,
                ease: 'easeInOut', // easeOut, easeIn
                repeat: Infinity,
                repeatType: 'reverse',
            },
            // transformOrigin: "50%", // Set the transform-origin to left side
        });
    };

    const handleClickOpen = (event) => {
        event.preventDefault();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    // useEffect with the empty [] runs when it mounts, without runs it every render
    useEffect(() => {
        startSwingAnimation();

    });

    const descriptionElementRef = React.useRef(null);
    useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <div className='home-container'>
            <div className='scroll-page-one'>

          



                <div className='name-page-container'>
                        <div className='name-div'>
                            <h1 style={{ fontSize: fontSize }} className="name">
                                Gabb<motion.div
                                    animate={controls}
                                    style={{textDecoration:'none'}}

                                >y </motion.div> <br />Lulu
                            </h1>
                        </div>


                    <div>

                    </div>
                    <div style={{display:'flex', flexDirection:'row', width:'100%'}}>
                        <div className='model-container'>
                             {/* // eslint-disable-next-line */}
                           <ModelCanvas />
                        </div>
                        <div className='empty-space'>
                            {/* <h1>ihjnw</h1> */}
                        </div>
                    </div>



                </div>





            </div>

            <div className='project-section'>
                {isMobile && <><br /><br /> </>}

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
                    <p style={{ fontSize: 'larger', lineHeight: '1.5' }}>
                        Hi, my name is Gabriel (Gabby) Lulu. I'm a student at the University of
                        Pittsburgh, studying Computer Science & Economics, and I will be
                        graduating in 2024. I'm very passionate about coding and expanding my
                        programming capabilities. I've been experimenting with web development
                        and frontend design. However, I'm always willing to pivot and learn
                        something new. Outside of programming, I'm interested in economics,
                        finance, reading, tennis, and recently chess. Please feel free to
                        contact me with project ideas (big or small), business proposals, or
                        anything of the like.
                    </p>

                    <div className='other-links'>

                        <a style={linkStyles} href={resume} target="_blank" rel="noreferrer">
                            <p className="link hover">Resume</p>
                        </a>

                        <div>
                            <a style={linkStyles} onClick={handleClickOpen} href="/">
                                <p className="link hover">Job history</p>
                            </a>
                            <Dialog
                                open={open}
                                onClose={handleClose}
                                scroll={'paper'}
                                aria-labelledby="scroll-dialog-title"
                                aria-describedby="scroll-dialog-description"
                            >
                                <DialogTitle id="scroll-dialog-title">Jobs</DialogTitle>
                                <DialogContent>
                                    <DialogContentText
                                        id="scroll-dialog-description"
                                        ref={descriptionElementRef}
                                        tabIndex={-1}
                                    >
                                        <div>
                                            <table>


                                                <tbody>
                                                    <tr>
                                                        <td className='job-title'>Tutor</td>

                                                        <td>2017 - 2021</td>
                                                    </tr>
                                                    <tr>
                                                        <ul>
                                                            <li>Tutored math, science, and CS</li>
                                                        </ul>

                                                    </tr>

                                                    <tr>
                                                        <td className='job-title'>House of Kosher: Stocker</td>

                                                        <td>May 2018 - Aug 2018</td>
                                                    </tr>
                                                    <tr>
                                                        <ul>
                                                            <li>Performed essential stocker duties</li>
                                                            <li>Prepared the new warehouse for loading produce</li>
                                                            <li>Confirmed precise records of delivery receipts</li>
                                                        </ul>


                                                    </tr>

                                                    <tr>
                                                        <td className='job-title'>BestBuyFurniture: Sales Associate</td>

                                                        <td>May 2019 - Aug 2019</td>
                                                    </tr>
                                                    <tr>
                                                        <ul>
                                                            <li>Assisted customers with furniture needs</li>
                                                            <li>Created a filing system to organize previous years invoices</li>
                                                        </ul>


                                                    </tr>
                                                    <tr>
                                                        <td className='job-title'>Farmers Insurance: Customer Service / Telemarketer</td>

                                                        <td>Nov 2020 - Mar 2021</td>
                                                    </tr>
                                                    <tr>
                                                        <ul>
                                                            <li>Incrreased client count by making 100+ cold calls daily</li>
                                                            <li>Performed clerical duties on a daily basis</li>
                                                            <li>Assisted customers on the phone and in-person</li>
                                                        </ul>


                                                    </tr>

                                                    <tr>
                                                        <td className='job-title'>Allstate Insurance: Sales Associate / Marketing Intern</td>

                                                        <td>Jun 2021 - Aug 2021 | Nov 2021 - Jan 2022</td>
                                                    </tr>
                                                    <tr>
                                                        <ul>
                                                            <li>Generated quotes by cold calling 100+ prospective clients weekly</li>
                                                            <li>Cross sold insurance to 50+ clients weekly</li>
                                                            <li>Performed clerical duties on a daily basis</li>
                                                        </ul>


                                                    </tr>




                                                    <tr>
                                                        <td className='job-title'>Fluent Concepts: Backend Engineering Intern</td>

                                                        <td>Jun 2021 - Aug 2021 & Nov 2021 - Jan 2022</td>
                                                    </tr>
                                                    <tr>
                                                        <ul>
                                                            <li>Improved and condensed PHP legacy source code</li>
                                                            <li>Optimized MySQL query functions for faster search results</li>
                                                            <li>Participated and collaborated in weekly development meetings</li>
                                                        </ul>


                                                    </tr>


                                                    <tr>
                                                        <td className='job-title'>Murray Ave Kosher: Stocker</td>

                                                        <td>Jan 2022 - May 2022</td>
                                                    </tr>
                                                    <tr>
                                                        <ul>
                                                            <li>Performed essential stocker duties</li>
                                                        </ul>
                                                    </tr>


                                                    <tr>
                                                        <td className='job-title'>Philmont Country Club: Assistant to the director</td>

                                                        <td>Jun 2022 - Aug 2022</td>
                                                    </tr>
                                                    <tr>
                                                        <ul>
                                                            <li>Planned events for members such as tournaments & club breakfasts</li>
                                                            <li>Implemented ideas to cut cost and increase member retention</li>
                                                            <li>Maintained club facilities and enhanced club aesthetics</li>
                                                        </ul>
                                                    </tr>

                                                    <tr>
                                                        <td className='job-title'>Avanade: Cloud Engineering Intern</td>

                                                        <td>Jun 2022 - Aug 2022</td>
                                                    </tr>
                                                    <tr>
                                                        <ul>
                                                            <li>Developed and implemented cloud-based solutions in Microsoft Power BI to analyze and visualize retail KPIs</li>
                                                            <li>Collaborated with cross-functional teams to gather requirements, design data models, and create interactive dashboards for retail analytics using Power BI</li>
                                                        </ul>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>



                                    </DialogContentText>
                                </DialogContent>

                            </Dialog>
                        </div>

                        <a style={linkStyles} href="https://www.chess.com/" target="_blank" rel="noreferrer">
                            <p className="link hover">Etc</p>
                        </a>
                    </div>
                </div>


                <div className='contact'>
                    <h1 className='about'>Contact</h1>
                    <div className='contact-form-div'>
                        <div className='name-email-div'>
                            <div className='name-textarea' >
                                <Textarea color={nameColor} onChange={handleNameChange} value={name} placeholder="Name"></Textarea>
                                <FormHelperText style={{ color: '#d32f2f', paddingLeft: '2%' }}>{nameError}</FormHelperText>
                            </div>

                            <div className='email-textarea'>
                                <Textarea color={emailColor} value={email} onChange={handleEmailChange} placeholder="Email"></Textarea>
                                <FormHelperText style={{ color: '#d32f2f', paddingLeft: '2%' }} >{emailError}</FormHelperText>

                            </div>
                        </div>


                    </div>

                    <Textarea color={msgColor} value={message} onChange={handleMessageChange} style={{ height: '400px' }} placeholder="Message"></Textarea>
                    <FormHelperText style={{ color: '#d32f2f', paddingLeft: '2%' }} >{msgError}</FormHelperText>

                    <Button
                        style={{ marginTop: '2%' }}
                        color="primary"
                        disabled={false}
                        onClick={handleSubmit}
                        size="md"
                        variant="soft"

                    >Submit</Button>


                    <p className='email-success' style={{ float: 'right', fontFamily: 'Manrope', color: '#4caf50' }}>{successMsg}</p>
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

    const ModelDotJs = `
import React, { useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { Html } from "@react-three/drei"


export default function Model(props) {
    const [modelLoaded, setModelLoaded] = useState(false);

    const { nodes, materials } = useGLTF("/statue.glb")
    const gradientStyle = {
        background: 'linear-gradient(45deg, #ff00cc, #3333ff)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent', 
        paddingBottom:'20%',
    };


    useEffect(() => {
        if (nodes && materials) {
            setModelLoaded(true);
        }
    }, [nodes, materials]);

    // Show a loading message if the model is not loaded yet !modelLoaded
    if (!modelLoaded ) {
        return <Html>
            <h1 style={gradientStyle}>Loading...</h1>
        </Html>
    }
    
    return (
        <group {...props} dispose={null}>
            <group rotation={[-Math.PI / 2, 0, 0]}>
                    <mesh
                        castShadow
                        receiveShadow
                        scale={0.5}
                        
                        geometry={nodes.Object_2.geometry}
                        material={materials["Scene_-_Root"]}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        scale={0.5}
                        
                        geometry={nodes.Object_3.geometry}
                        material={materials["Scene_-_Root"]}
                    />
                    <mesh
                        castShadow
                        scale={0.5}

                        receiveShadow
                        geometry={nodes.Object_4.geometry}
                        material={materials["Scene_-_Root"]}
                    />
                    <mesh
                        castShadow
                        scale={0.5}

                        receiveShadow
                        geometry={nodes.Object_5.geometry}
                        material={materials["Scene_-_Root"]}
                    />
                    <mesh
                        castShadow
                        scale={0.5}

                        receiveShadow
                        geometry={nodes.Object_6.geometry}
                        material={materials["Scene_-_Root"]}
                    />
                    <mesh
                        castShadow
                        scale={0.5}

                        receiveShadow
                        geometry={nodes.Object_7.geometry}
                        material={materials["Scene_-_Root"]}
                    />
                    <mesh
                        castShadow
                        scale={0.5}

                        receiveShadow
                        geometry={nodes.Object_8.geometry}
                        material={materials["Scene_-_Root"]}
                    />
                    <mesh
                        castShadow
                        scale={0.5}

                        receiveShadow
                        geometry={nodes.Object_9.geometry}
                        material={materials["Scene_-_Root"]}
                    />
                    <mesh
                        castShadow
                        scale={0.5}

                        receiveShadow
                        geometry={nodes.Object_10.geometry}
                        material={materials["Scene_-_Root"]}
                    />
                    <mesh
                        castShadow
                        scale={0.5}

                        receiveShadow
                        geometry={nodes.Object_11.geometry}
                        material={materials["Scene_-_Root"]}
                    />
                    <mesh
                        castShadow
                        scale={0.5}

                        receiveShadow
                        geometry={nodes.Object_12.geometry}
                        material={materials["Scene_-_Root"]}
                    />
                    <mesh
                        castShadow
                        scale={0.5}

                        receiveShadow
                        geometry={nodes.Object_13.geometry}
                        material={materials["Scene_-_Root"]}
                    />
                    <mesh
                        castShadow
                        scale={0.5}

                        receiveShadow
                        geometry={nodes.Object_14.geometry}
                        material={materials["Scene_-_Root"]}
                    />
                    <mesh
                        castShadow
                        scale={0.5}

                        receiveShadow
                        geometry={nodes.Object_15.geometry}
                        material={materials["Scene_-_Root"]}
                    />

            </group>
        </group>
    );
}

useGLTF.preload("/statue.glb");`
    const [selectedFile, setSelectedFile] = useState(appDotJs)


    const pageStyle = {
        backgroundColor:'#86b3d1',

    }

    const titleStyle = {
        color: '#ffffff',
        borderBottom: '2px solid black',
        maxWidth:'fit-content',
        fontSize:'50px',
    }

    const descriptionStyle = {
    }


    return (
        <div style={pageStyle} className='sortPageDiv'>
            <IconButton style={{ position: 'absolute', top: '0', left: '0', margin: '1%', colo: "black" }}
                onClick={() => { window.history.back(); }}
            >
                <ArrowBackIcon></ArrowBackIcon>
            </IconButton>



            <div className='sort-desc-div'>
                <h1 style={titleStyle} className='sort-title'>Portfolio Website</h1>
                <p style={descriptionStyle} className='sort-desc'>
                    Some code snippets from the site you are visiting 
                    (the rest is on my GitHub)! I wanted to make this portfolio 
                    for two main reasons. One, to showcase some of my projects in 
                    a different context from my resume. Two, to further develop my 
                    React knowledge and skills. All animations on this website were 
                    developed with the React Framer Motion library. I plan on adding 
                    a 3D model to the homepage soon (written on July 19, 2023).
                    <br/>
                    All the code can be found on my github, glulu4 ( linked on homepage ).
                </p>

            </div>

            <div className='code-container'>
                <div className='code-header'>
                    <div className='filename-box'>
                        <Button size="medium" class="button" onClick={() => { setSelectedFile(appDotJs) }}>App.js </Button>
                        <Button size="medium" class="button" onClick={() => { setSelectedFile(HomeDotJs) }}>Home.js </Button>
                        <Button size="medium" class="button" onClick={() => { setSelectedFile(MySliderDotJs) }}>MySlider.js </Button>
                        <Button size="medium" class="button" onClick={() => { setSelectedFile(vmSimDotJs) }}>VmSim.js </Button>
                        <Button size="medium" class="button" onClick={() => { setSelectedFile(ModelDotJs) }}>Model.js </Button>




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