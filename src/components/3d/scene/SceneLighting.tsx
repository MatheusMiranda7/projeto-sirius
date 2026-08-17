'use client';

import React from 'react';
import { Environment, Lightformer } from '@react-three/drei';

interface SceneLightingProps {
    intensity?: number;
}

export function SceneLighting({
    intensity = 1,
}: SceneLightingProps) {
    return (
        <>
            {/* Luz ambiente mínima.
          Não queremos achatar os volumes. */}
            <ambientLight intensity={0.08} />

            {/* KEY LIGHT
          Principal fonte responsável pela porcelana. */}
            <spotLight
                position={[3.8, 6, 4.5]}
                intensity={42 * intensity}
                angle={0.42}
                penumbra={1}
                distance={15}
                decay={2}
                color="#fff8ef"
                castShadow
                shadow-mapSize={[2048, 2048]}
                shadow-bias={-0.00008}
            />

            {/* FILL LIGHT
          Recupera suavemente o lado escuro. */}
            <pointLight
                position={[-4, 2.5, 2]}
                intensity={7 * intensity}
                distance={10}
                decay={2}
                color="#d8c4a8"
            />

            {/* RIM LIGHT
          Ajuda a desenhar as bordas da porcelana,
          vidro e metal contra o fundo preto. */}
            <spotLight
                position={[-2.5, 4, -4]}
                intensity={24 * intensity}
                angle={0.5}
                penumbra={1}
                distance={14}
                decay={2}
                color="#dfe8ff"
            />

            {/* Estúdio virtual para reflexos PBR */}
            <Environment resolution={256}>
                <Lightformer
                    form="rect"
                    intensity={3}
                    position={[0, 5, -4]}
                    scale={[6, 3, 1]}
                    target={[0, 0, 0]}
                />

                <Lightformer
                    form="rect"
                    intensity={2.5}
                    position={[-5, 2, 1]}
                    scale={[2, 5, 1]}
                    target={[0, 0, 0]}
                />

                <Lightformer
                    form="rect"
                    intensity={2}
                    position={[5, 1.5, 1]}
                    scale={[2, 3, 1]}
                    target={[0, 0, 0]}
                />

                <Lightformer
                    form="ring"
                    intensity={1.5}
                    position={[0, 4, 5]}
                    scale={[2, 2, 1]}
                    target={[0, 0, 0]}
                />
            </Environment>
        </>
    );
}