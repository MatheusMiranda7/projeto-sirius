'use client';

import React, { useMemo } from 'react';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

import { TableComposition } from '@/types/sirius';
import { Table } from './Table';
import { Plate } from './Plate';
import { Glass } from './Glass';

interface TableCompositionSceneProps {
    composition: TableComposition;
}

export function TableCompositionScene({
    composition,
}: TableCompositionSceneProps) {
    const sousplatProfile = useMemo(
        () => [
            new THREE.Vector2(0, 0.025),
            new THREE.Vector2(0.55, 0.025),
            new THREE.Vector2(1.05, 0.035),
            new THREE.Vector2(1.25, 0.065),
            new THREE.Vector2(1.34, 0.09),
            new THREE.Vector2(1.37, 0.075),
            new THREE.Vector2(1.3, 0.035),
            new THREE.Vector2(0.8, 0.008),
            new THREE.Vector2(0, 0.008),
        ],
        []
    );

    return (
        <group>
            <Table />

            {/* SOUSPLAT */}
            {composition.sousplat && (
                <mesh
                    position={[0, -0.09, 0]}
                    castShadow
                    receiveShadow
                >
                    <latheGeometry args={[sousplatProfile, 128]} />

                    <meshPhysicalMaterial
                        color={composition.sousplat.hexColor || '#6f4a2f'}
                        roughness={
                            composition.sousplat.material.includes('Latão')
                                ? 0.2
                                : 0.55
                        }
                        metalness={
                            composition.sousplat.material.includes('Latão')
                                ? 0.85
                                : 0.05
                        }
                        clearcoat={0.2}
                        envMapIntensity={1}
                    />
                </mesh>
            )}

            {/* PRATO PRINCIPAL */}
            {composition.pratoPrincipal && (
                <Plate
                    color={
                        composition.pratoPrincipal.hexColor ||
                        '#f4f1e9'
                    }
                    positionY={-0.035}
                />
            )}

            {/* PRATO DE SOBREMESA */}
            {composition.pratoSobremesa && (
                <Plate
                    color={
                        composition.pratoSobremesa.hexColor ||
                        '#f4f1e9'
                    }
                    scale={0.7}
                    positionY={0.085}
                />
            )}

            {/* GUARDANAPO */}
            {composition.guardanapo && (
                <group
                    position={[0.08, 0.205, 0.02]}
                    rotation={[0.03, Math.PI / 14, -0.02]}
                >
                    <RoundedBox
                        args={[0.42, 0.035, 0.72]}
                        radius={0.025}
                        smoothness={6}
                        castShadow
                        receiveShadow
                    >
                        <meshStandardMaterial
                            color={
                                composition.guardanapo.hexColor ||
                                '#d6cdbd'
                            }
                            roughness={0.92}
                            metalness={0}
                        />
                    </RoundedBox>
                </group>
            )}

            {/* GARFO */}
            {composition.talherGarfo && (
                <group
                    position={[-1.28, -0.04, 0.02]}
                >
                    <RoundedBox
                        args={[0.055, 0.025, 0.78]}
                        radius={0.02}
                        smoothness={4}
                        castShadow
                    >
                        <meshPhysicalMaterial
                            color={
                                composition.talherGarfo.hexColor ||
                                '#c8a96c'
                            }
                            metalness={0.95}
                            roughness={0.16}
                            envMapIntensity={1.8}
                        />
                    </RoundedBox>

                    {[-0.045, -0.015, 0.015, 0.045].map(
                        (x) => (
                            <mesh
                                key={x}
                                position={[x, 0, -0.47]}
                                castShadow
                            >
                                <boxGeometry
                                    args={[0.012, 0.018, 0.18]}
                                />

                                <meshPhysicalMaterial
                                    color={
                                        composition.talherGarfo?.hexColor ||
                                        '#c8a96c'
                                    }
                                    metalness={0.95}
                                    roughness={0.16}
                                />
                            </mesh>
                        )
                    )}
                </group>
            )}

            {/* FACA */}
            {composition.talherFaca && (
                <group
                    position={[1.22, -0.04, 0]}
                >
                    <RoundedBox
                        args={[0.06, 0.025, 0.85]}
                        radius={0.018}
                        smoothness={4}
                        castShadow
                    >
                        <meshPhysicalMaterial
                            color={
                                composition.talherFaca.hexColor ||
                                '#c8a96c'
                            }
                            metalness={0.95}
                            roughness={0.14}
                            envMapIntensity={1.8}
                        />
                    </RoundedBox>

                    <mesh
                        position={[-0.025, 0.005, -0.34]}
                        rotation={[0, 0, 0.08]}
                        castShadow
                    >
                        <boxGeometry args={[0.035, 0.018, 0.33]} />

                        <meshPhysicalMaterial
                            color={
                                composition.talherFaca.hexColor ||
                                '#c8a96c'
                            }
                            metalness={0.95}
                            roughness={0.12}
                        />
                    </mesh>
                </group>
            )}

            {/* COLHER */}
            {composition.talherColher && (
                <group
                    position={[1.42, -0.04, 0.02]}
                >
                    <RoundedBox
                        args={[0.045, 0.022, 0.72]}
                        radius={0.018}
                        smoothness={4}
                        castShadow
                    >
                        <meshPhysicalMaterial
                            color={
                                composition.talherColher.hexColor ||
                                '#c8a96c'
                            }
                            metalness={0.95}
                            roughness={0.14}
                        />
                    </RoundedBox>

                    <mesh
                        position={[0, 0.01, -0.42]}
                        scale={[0.095, 0.025, 0.145]}
                        castShadow
                    >
                        <sphereGeometry args={[1, 32, 32]} />

                        <meshPhysicalMaterial
                            color={
                                composition.talherColher.hexColor ||
                                '#c8a96c'
                            }
                            metalness={0.95}
                            roughness={0.14}
                        />
                    </mesh>
                </group>
            )}

            {/* TAÇA */}
            {composition.taca && (
                <group
                    position={[1.1, -0.07, -0.92]}
                    scale={0.72}
                >
                    <Glass
                        color={
                            composition.taca.hexColor === '#7a7d85'
                                ? '#88909c'
                                : '#ffffff'
                        }
                    />
                </group>
            )}
        </group>
    );
}