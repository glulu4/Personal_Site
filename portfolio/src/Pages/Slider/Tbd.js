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
                // eslint-disable-next-line
                w = window.innerWidth;
                // eslint-disable-next-line
                h = window.innerHeight;
                // eslint-disable-next-line
                // eslint-disable-next-line
                p.createCanvas(w, h);
                // eslint-disable-next-line
                x = 400;
                // eslint-disable-next-line
                y = 300;
                // eslint-disable-next-line
                xspeed = 4;
                // eslint-disable-next-line
                yspeed = 4;
                // eslint-disable-next-line
                pickColor();
            };

            const pickColor = () => {
                // eslint-disable-next-line
                r = p.random(256);
                // eslint-disable-next-line
                g = p.random(256);
                // eslint-disable-next-line
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

        return () => {
            sketch.remove();
        };
    });

    return (
        <div id="logo">
        </div>
    );
};

export default Tbd;
