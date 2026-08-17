'use client';

import React, { useMemo } from 'react';
import * as THREE from 'three';

interface GlassProps {
    color?: string;
}

export function Glass({
    color = '#ffffff',
}: GlassProps) {
    const bowlProfile = useMemo(
        () => [
            new THREE.Vector2(0.055, 0),
            new THREE.Vector2(0.13, 0.03),
            new THREE.Vector2(0.2, 0.1),
            new THREE.Vector2(0.245, 0.2),
            new THREE.Vector2(0.26, 0.32),
            new THREE.Vector2(0.245, 0.43),
            new THREE.Vector2(0.215, 0.52),
            new THREE.Vector2(0.195, 0.58),
        ],
        []
    );

    return (
        <group>
            {/* BASE */}
            <mesh
                position={[0, 0.015, 0]}
                castShadow
            >
                <cylinderGeometry args={[0.2, 0.22, 0.025, 64]} />

                <meshPhysicalMaterial
                    color="#ffffff"
                    transmission={0.97}
                    thickness={0.08}
                    roughness={0.03}
                    metalness={0}
                    ior={1.5}
                    transparent
                    opacity={1}
                    envMapIntensity={1.5}
                />
            </mesh>

            {/* HASTE */}
            <mesh
                position={[0, 0.18, 0]}
                castShadow
            >
                <cylinderGeometry args={[0.018, 0.018, 0.34, 32]} />

                <meshPhysicalMaterial
                    color="#ffffff"
                    transmission={0.98}
                    thickness={0.03}
                    roughness={0.01}
                    ior={1.5}
                    transparent
                />
            </mesh>

            {/* BOJO */}
            <mesh
                position={[0, 0.35, 0]}
                castShadow
            >
                <latheGeometry args={[bowlProfile, 96]} />

                <meshPhysicalMaterial
                    color={color}
                    transmission={0.96}
                    thickness={0.05}
                    roughness={0.04}
                    metalness={0}
                    ior={1.5}
                    transparent
                    opacity={1}
                    envMapIntensity={1.7}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* BORDA DA TAÇA */}
            <mesh
                position={[0, 0.93, 0]}
                rotation={[Math.PI / 2, 0, 0]}
            >
                <torusGeometry args={[0.195, 0.006, 16, 64]} />

                <meshPhysicalMaterial
                    color="#ffffff"
                    transmission={0.98}
                    roughness={0.02}
                    ior={1.5}
                    transparent
                />
            </mesh>
        </group>
    );
}