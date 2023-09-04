
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
        paddingBottom: '20%',
    };


    useEffect(() => {
        if (nodes && materials) {
            setModelLoaded(true);
        }
    }, [nodes, materials]);

    // Show a loading message if the model is not loaded yet !modelLoaded
    if (!modelLoaded) {
        return <Html>
            <h1 style={gradientStyle}>Loading...</h1>
        </Html>
    }

    return (
        <group {...props} dispose={null}>
            <group rotation={[-Math.PI / 2, 0, 0]}>
                {/* <mesh
                        scale={0.5}
                        
                        geometry={nodes.Object_2.geometry}
                        material={materials["Scene_-_Root"]}
                    /> */}
                {/* <mesh
                        scale={0.5}
                        
                        geometry={nodes.Object_3.geometry}
                        material={materials["Scene_-_Root"]}
                    /> */}
                {/* <mesh
                        scale={0.5}

                        geometry={nodes.Object_4.geometry}
                        material={materials["Scene_-_Root"]}
                    /> */}
                <mesh
                    scale={0.5}

                    geometry={nodes.Object_5.geometry}
                    material={materials["Scene_-_Root"]}
                />
                <mesh
                    scale={0.5}

                    geometry={nodes.Object_6.geometry}
                    material={materials["Scene_-_Root"]}
                />
                <mesh
                    scale={0.5}

                    geometry={nodes.Object_7.geometry}
                    material={materials["Scene_-_Root"]}
                />
                <mesh
                    scale={0.5}

                    geometry={nodes.Object_8.geometry}
                    material={materials["Scene_-_Root"]}
                />
                <mesh
                    scale={0.5}

                    geometry={nodes.Object_9.geometry}
                    material={materials["Scene_-_Root"]}
                />
                <mesh
                    scale={0.5}

                    geometry={nodes.Object_10.geometry}
                    material={materials["Scene_-_Root"]}
                />
                <mesh
                    scale={0.5}

                    geometry={nodes.Object_11.geometry}
                    material={materials["Scene_-_Root"]}
                />
                <mesh
                    scale={0.5}

                    geometry={nodes.Object_12.geometry}
                    material={materials["Scene_-_Root"]}
                />
                {/* <mesh
                        scale={0.5}

                        geometry={nodes.Object_13.geometry}
                        material={materials["Scene_-_Root"]}
                    /> */}
                {/* <mesh
                        scale={0.5}
                        geometry={nodes.Object_14.geometry}
                        material={materials["Scene_-_Root"]}
                    />
                    <mesh
                        scale={0.5}
                        geometry={nodes.Object_15.geometry}
                        material={materials["Scene_-_Root"]}
                    /> */}

            </group>
        </group>
    );
}

useGLTF.preload("/statue.glb");