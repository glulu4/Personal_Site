import React, { useEffect } from 'react';
import p5 from 'p5';

function Tbd(){
    let x;
    let y;
    let xspeed;
    let yspeed;
    let w, h;
    let r, g, b;


    useEffect(() => {
        const sketch = new p5(p => {
            p.setup = () => {
                w = window.innerWidth;
                h = window.innerHeight;
                p.createCanvas(w, h);
                x = 400;
                y = 300;
                xspeed = 4;
                yspeed = 4;
                pickColor();
            };

            const pickColor = () => {
                r = p.random(256);
                g = p.random(256);
                b = p.random(256);
            };

            p.draw = () => {
                p.background(0);
                p.fill(r, g, b);
                p.rect(x, y, 80, 60);

                x = x + xspeed;
                y = y + yspeed;

                if (x + 80 >= p.width || x <= 0) {
                    xspeed = -xspeed;
                    pickColor();
                }

                if (y + 60 >= p.height || y <= 0) {
                    yspeed = -yspeed;
                    pickColor();
                }
            };
        });

        // return () => {
        //     sketch.remove();
        // };
    }, []);

    return (
        <div id="logo">
        </div>
    );
};

export default Tbd;
