'use client';

import React, { useMemo } from 'react';
import * as THREE from 'three';

interface PlateProps {
    color?: string;
    scale?: number;
    positionY?: number;
}

export function Plate({
    color = '#f4f1e9',
    scale = 1,
    positionY = 0,
}: PlateProps) {
    const profile = useMemo(
        () => [
            new THREE.Vector2(0.0, 0.055),

            // área central
            new THREE.Vector2(0.35, 0.055),
            new THREE.Vector2(0.6, 0.06),

            // início da curvatura
            new THREE.Vector2(0.78, 0.075),
            new THREE.Vector2(0.92, 0.105),

            // borda elevada
            new THREE.Vector2(1.02, 0.145),
            new THREE.Vector2(1.075, 0.17),
            new THREE.Vector2(1.095, 0.155),

            // parte inferior
            new THREE.Vector2(1.04, 0.1),
            new THREE.Vector2(0.92, 0.055),
            new THREE.Vector2(0.7, 0.025),
            new THREE.Vector2(0.4, 0.012),
            new THREE.Vector2(0.0, 0.012),
        ],
        []
    );

    return (
        <group
            position={[0, positionY, 0]}
            scale={scale}
        >
            <mesh castShadow receiveShadow>
                <latheGeometry args={[profile, 128]} />

                <meshPhysicalMaterial
                    color={color}
                    roughness={0.16}
                    metalness={0}
                    clearcoat={0.42}
                    clearcoatRoughness={0.18}
                    envMapIntensity={1.15}
                />
            </mesh>
        </group>
    );
}