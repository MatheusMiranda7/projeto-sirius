'use client';

import React from 'react';

export function Table() {
    return (
        <group position={[0, -0.18, 0]}>
            {/* TAMPO */}
            <mesh receiveShadow>
                <cylinderGeometry args={[2.4, 2.4, 0.16, 128]} />

                <meshPhysicalMaterial
                    color="#17130f"
                    roughness={0.58}
                    metalness={0}
                    clearcoat={0.15}
                    clearcoatRoughness={0.72}
                    envMapIntensity={0.45}
                />
            </mesh>

            {/* ESPESSURA / CORPO INFERIOR */}
            <mesh position={[0, -0.1, 0]} receiveShadow>
                <cylinderGeometry args={[2.36, 2.38, 0.08, 128]} />

                <meshStandardMaterial
                    color="#0e0c0b"
                    roughness={0.8}
                    metalness={0}
                />
            </mesh>
        </group>
    );
}