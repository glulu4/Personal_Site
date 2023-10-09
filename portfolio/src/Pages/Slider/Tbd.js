import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Tbd = () => {
    const [x, setX] = useState(50);
    const [y, setY] = useState(50);
    const [color, setColor] = useState("rgb(100,100,100")

    const [xspeed, setXSpeed] = useState(1)
    const [yspeed, setYSpeed] = useState(1)
    const width = window.innerWidth;

    const height = window.innerHeight;



    const pickColor = () => {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r},${g},${b})`;
    };

    const moveRectangle = () => {

        console.log("w: ", window.innerWidth);
        console.log("h: ", window.innerHeight);

        console.log("x: ", x);
        console.log("y: ", y);



        // if (x >= width - 170) {
        //     setXSpeed(-1)
        //     setColor(pickColor());
        // }

        // if (x <= -5) {
        //     setXSpeed(1)
        //     setColor(pickColor());
        // }

        // if (y >= height - 100) {
        //     setYSpeed(-1)
        //     setColor(pickColor());
        // }
        // if (y <= -20) {
        //     setYSpeed(1)
        //     setColor(pickColor());
        // }


        if (x >= width - 160) {
            setColor(pickColor());
            setXSpeed(-1)
            
        }

        if (x <= 0) {
            setColor(pickColor());
            setXSpeed(1)
        }

        if (y >= height - 120) {
            setColor(pickColor());
            setYSpeed(-1)
            
        }

        if (y <= -40) {
            setColor(pickColor());
            setYSpeed(1)
            
        }

        setX((prevX) => prevX + xspeed);
        setY((prevY) => prevY + yspeed);


    };


    // Call moveRectangle on every frame
    requestAnimationFrame(moveRectangle);

    return (
        <div style={{
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: "black",
            color: "pink",
            padding: 0,
            margin:0,


        }} >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="160px"
                height="160px"
                viewBox="0 0 210 107"
                fill={color}
                style={{
                    position: 'absolute',
                    top: `${y}px`,
                    left: `${x}px`,
                    padding: 0,
                    margin: 0,
                }}
            >
                <motion.path xmlns="http://www.w3.org/2000/svg" d="M118.895,20.346c0,0-13.743,16.922-13.04,18.001c0.975-1.079-4.934-18.186-4.934-18.186s-1.233-3.597-5.102-15.387H81.81H47.812H22.175l-2.56,11.068h19.299h4.579c12.415,0,19.995,5.132,17.878,14.225c-2.287,9.901-13.123,14.128-24.665,14.128H32.39l5.552-24.208H18.647l-8.192,35.368h27.398c20.612,0,40.166-11.067,43.692-25.288c0.617-2.614,0.53-9.185-1.054-13.053c0-0.093-0.091-0.271-0.178-0.537c-0.087-0.093-0.178-0.722,0.178-0.814c0.172-0.092,0.525,0.271,0.525,0.358c0,0,0.179,0.456,0.351,0.813l17.44,50.315l44.404-51.216l18.761-0.092h4.579c12.424,0,20.09,5.132,17.969,14.225c-2.29,9.901-13.205,14.128-24.75,14.128h-4.405L161,19.987h-19.287l-8.198,35.368h27.398c20.611,0,40.343-11.067,43.604-25.288c3.347-14.225-11.101-25.293-31.89-25.293h-18.143h-22.727C120.923,17.823,118.895,20.346,118.895,20.346L118.895,20.346z" />
                <motion.path xmlns="http://www.w3.org/2000/svg" d="M99.424,67.329C47.281,67.329,5,73.449,5,81.012c0,7.558,42.281,13.678,94.424,13.678c52.239,0,94.524-6.12,94.524-13.678C193.949,73.449,151.664,67.329,99.424,67.329z M96.078,85.873c-11.98,0-21.58-2.072-21.58-4.595c0-2.523,9.599-4.59,21.58-4.59c11.888,0,21.498,2.066,21.498,4.59C117.576,83.801,107.966,85.873,96.078,85.873z" />
            </svg>

        </div>
    );
};

export default Tbd;









// import React, { useEffect } from 'react';
// import p5 from 'p5';

// function Tbd(){
//     let x;
//     let y;
//     let xspeed;
//     let yspeed;
//     let w, h;
//     let r, g, b;


//     useEffect(() => {
//         const sketch = new p5(p => {
//             p.setup = () => {
//                 // eslint-disable-next-line
//                 w = window.innerWidth;
//                 // eslint-disable-next-line
//                 h = window.innerHeight;
//                 // eslint-disable-next-line
//                 // eslint-disable-next-line
//                 p.createCanvas(w, h);
//                 // eslint-disable-next-line
//                 x = 400;
//                 // eslint-disable-next-line
//                 y = 300;
//                 // eslint-disable-next-line
//                 xspeed = 4;
//                 // eslint-disable-next-line
//                 yspeed = 4;
//                 // eslint-disable-next-line
//                 pickColor();
//             };

//             const pickColor = () => {
//                 // eslint-disable-next-line
//                 r = p.random(256);
//                 // eslint-disable-next-line
//                 g = p.random(256);
//                 // eslint-disable-next-line
//                 b = p.random(256);
//             };

//             p.draw = () => {
//                 p.background(0);
//                 p.fill(r, g, b);
//                 p.rect(x, y, 80, 60);

//                 x = x + xspeed;
//                 y = y + yspeed;

//                 if (x + 80 >= p.width || x <= 0) {
//                     xspeed = -xspeed;
//                     pickColor();
//                 }

//                 if (y + 60 >= p.height || y <= 0) {
//                     yspeed = -yspeed;
//                     pickColor();
//                 }
//             };
//         });

//         return () => {
//             sketch.remove();
//         };
//     });

//     return (
//         <div id="logo">
//         </div>
//     );
// };

// export default Tbd;
