'use client';

import React from 'react';
import {
    OrbitControls,
    ContactShadows,
    Environment,
} from '@react-three/drei';

import { TableComposition } from '@/types/sirius';
import { TableCompositionScene } from '../objects/TableCompositionScene';

interface SiriusSceneProps {
    composition: TableComposition;
    lightIntensity?: number;
    interactive?: boolean;
}

export function SiriusScene({
    composition,
    lightIntensity = 1,
    interactive = true,
}: SiriusSceneProps) {
    return (
        <>
            {/* FUNDO */}
            <color attach="background" args={['#050505']} />

            {/* ILUMINAÇÃO BASE SEGURA */}
            <ambientLight intensity={0.7} />

            <directionalLight
                position={[4, 6, 5]}
                intensity={3 * lightIntensity}
                color="#fff4e6"
                castShadow
                shadow-mapSize={[2048, 2048]}
            />

            <directionalLight
                position={[-4, 3, 2]}
                intensity={1.5 * lightIntensity}
                color="#d6e2ff"
            />

            <pointLight
                position={[0, 4, -3]}
                intensity={8 * lightIntensity}
                distance={12}
                color="#ffffff"
            />

            {/* AMBIENTE DE ESTÚDIO */}
            <Environment
                preset="studio"
                environmentIntensity={0.8}
            />

            {/* OBJETOS */}
            <group position={[0, 0, 0]}>
                <mesh position={[0, 1.5, 0]}>
                    <sphereGeometry args={[0.25, 32, 32]} />
                    <meshBasicMaterial color="#ff0000" />
                </mesh>
                <TableCompositionScene
                    composition={composition}
                />
            </group>

            {/* SOMBRA */}
            <ContactShadows
                position={[0, -0.28, 0]}
                opacity={0.55}
                scale={6}
                blur={2.8}
                far={3}
            />

            {/* CÂMERA INTERATIVA */}
            {interactive && (
                <OrbitControls
                    makeDefault
                    enablePan={false}
                    enableZoom
                    enableDamping
                    dampingFactor={0.06}
                    rotateSpeed={0.4}
                    zoomSpeed={0.6}
                    minDistance={3}
                    maxDistance={7}
                    minPolarAngle={Math.PI / 5}
                    maxPolarAngle={Math.PI / 2.25}
                    target={[0, 0, 0]}
                />
            )}
        </>
    );
}