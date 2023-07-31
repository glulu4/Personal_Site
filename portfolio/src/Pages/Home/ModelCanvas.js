 // eslint-disable-next-line
import React from 'react'
import Model from './Model.js'
import { Environment } from "@react-three/drei";
import { Canvas } from '@react-three/fiber';
// import { OrbitControls, Loader } from '@react-three/drei';
// import { Suspense } from "react";
// import { Stage, useGLTF } from "@react-three/drei";
// import * as THREE from 'three';

// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { Plane } from '@react-three/drei';
// import { SoftShadows } from "@react-three/drei"
// import { AccumulativeShadows } from '@react-three/drei';
// import { RandomizedLight } from '@react-three/drei';
// import { Preload } from '@react-three/drei';

// import { PlaneGeometry } from 'three';
 // eslint-disable-next-line
function ModelCanvas(){

 // eslint-disable-next-line
    return ( 
        <Canvas 
            style={{maxHeight:'100%'}}
            gl={{ preserveDrawingBuffer: true, toneMappingExposure: 0.5 }} 
            shadows dpr={[1, 1.5]} 
            // shadowMap
            
            camera={{ position: [120, 80, 200], fov: 40 }}
            ambientintensity={0.1}
            // shadow-intensity="1"
        >
            {/* the larger fov, the farther it is */}


            <ambientLight intensity={0.001} /> 
            <pointLight position={[10, 5, 70]} intensity={0.001} castShadow/> 
            <directionalLight position={[5, 5, 5]} intensity={0.1} castShadow />
                {/* // shadow-camera-near={100}
                // shadow-mapSize-width={1024}
                // shadow-mapSize-height={1024}
                // shadow-camera-far={50}
                // shadow-camera-left={-100}
                // shadow-camera-right={-10}
                // shadow-camera-top={10}
                // shadow-camera-bottom={10}
                // // shadow-camera="near" */}
            
                {/* <orthographicCamera attach="shadow-camera" args={[50, 25, 50, 15, 10, 500]} /> */}


            

                
            {/* <spotLight castShadow position={[-10, 0, -10]} intensity={0.8} angle={Math.PI / 6} penumbra={0.7} /> */}

            <Model />
{/* 
            <group>
                <mesh 
                
                rotation={[-Math.PI / 2, 0, 0]} 
                position={[-10,-10,0]}
                receiveShadow="true"
                >
                    <planeGeometry args={[100, 100]} />
                    <shadowMaterial attach="material" opacity={0.4} />
                </mesh>
            </group> */}

            

                {/* <group>

                    <mesh 
                    rotation={[-Math.PI / 2, 0, 0]} 
                    position={[0, 1, 0]} 
                    receiveShadow >
                    <sphereGeometry />
                        <planeGeometry args={[200, 200]} />
                        <shadowMaterial  opacity={0.4} />
                    </mesh>
                    
                </group> */}
                {/* <Preload all /> */}
            {/* <Model /> */}
            {/* <OrbitControls /> */}
            <Environment preset="sunset" /> 
            {/* {apartment, city, dawn, forest, lobby, night, park, studio, sunset, warehouse} */}
        </Canvas>
    )


}
 // eslint-disable-next-line
export default ModelCanvas;

