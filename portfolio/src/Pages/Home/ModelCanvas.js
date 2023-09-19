 // eslint-disable-next-line
import React from 'react'
import Model from './Model.js'
import { Environment } from "@react-three/drei";
import { Canvas } from '@react-three/fiber';


function ModelCanvas(){

    return ( 
        <Canvas 
            style={{maxHeight:'100%'}}
            gl={{ preserveDrawingBuffer: false, toneMappingExposure: 0.5 }} 
            camera={{ position: [120, 80, 200], fov: 40 }}
            ambientintensity={0.001}
            antialias='false'
        >
            {/* the larger fov, the farther it is */}


            {/* <ambientLight intensity={0.0001} />  */}
            {/* <pointLight position={[10, 5, 70]} intensity={0.001} castShadow/>  */}
            <directionalLight position={[5, 5, 5]} intensity={0.1}  />

        
                <Model />

            

            <Environment preset="sunset" /> 
            {/* {apartment, city, dawn, forest, lobby, night, park, studio, sunset, warehouse} */}
        </Canvas>
    )


}
 // eslint-disable-next-line
export default ModelCanvas;

