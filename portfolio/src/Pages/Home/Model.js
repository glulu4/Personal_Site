
import React from "react";
import { useGLTF } from "@react-three/drei";

export default function Statue(props) {
    const { nodes, materials } = useGLTF("/statue.glb", "", (progress )=> {
        // hasnt loaded yet
        if (progress !== 1){
            return <div>Loading...</div>
        }
        else{
            return <div>LOADED</div>
        }
    });
    
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

useGLTF.preload("/statue.glb");