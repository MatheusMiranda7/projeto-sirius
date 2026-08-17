'use client';

import React, { useRef } from 'react';
import * as THREE from 'three';
import { TableComposition } from '@/types/sirius';

interface TableObjectsProps {
  composition: TableComposition;
}

export function TableObjects({
  composition,
}: TableObjectsProps) {
  const groupRef = useRef<THREE.Group>(null);

  return (
    <group ref={groupRef} position={[0, -0.6, 0]}>
      {/* MESA DE NOGUEIRA / SUPERFÍCIE */}
      <mesh receiveShadow position={[0, -0.05, 0]}>
        <cylinderGeometry args={[2.15, 2.15, 0.12, 96]} />
        <meshStandardMaterial
          color="#171412"
          roughness={0.72}
          metalness={0}
          envMapIntensity={0.35}
        />
      </mesh>

      {/* 1. SOUSPLAT */}
      {composition.sousplat && (
        <group position={[0, 0.01, 0]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[1.35, 1.35, 0.03, 64]} />
            <meshStandardMaterial
              color={composition.sousplat.hexColor || '#3d2516'}
              roughness={composition.sousplat.material.includes('Latão') ? 0.25 : 0.6}
              metalness={composition.sousplat.material.includes('Latão') ? 0.8 : 0.1}
              envMapIntensity={1.5}
            />
          </mesh>
        </group>
      )}

      {/* 2. PRATO PRINCIPAL */}
      {composition.pratoPrincipal && (
        <group position={[0, 0.04, 0]}>
          {/* Base do prato */}
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[1.05, 0.85, 0.035, 64]} />
            <meshStandardMaterial
              color={composition.pratoPrincipal.hexColor || '#f4f2eb'}
              roughness={composition.pratoPrincipal.hexColor === '#141416' ? 0.35 : 0.2}
              metalness={0.05}
              envMapIntensity={1.2}
            />
          </mesh>
          {/* Borda elevada */}
          <mesh position={[0, 0.02, 0]} castShadow>
            <torusGeometry args={[0.95, 0.06, 16, 64]} />
            <meshStandardMaterial
              color={composition.pratoPrincipal.hexColor || '#f4f2eb'}
              roughness={0.25}
            />
          </mesh>
        </group>
      )}

      {/* 3. PRATO DE SOBREMESA */}
      {composition.pratoSobremesa && (
        <group position={[0, 0.08, 0]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.75, 0.6, 0.03, 64]} />
            <meshStandardMaterial
              color={composition.pratoSobremesa.hexColor || '#f4f2eb'}
              roughness={0.2}
              metalness={0.05}
            />
          </mesh>
        </group>
      )}

      {/* 4. GUARDANAPO DE LINHO */}
      {composition.guardanapo && (
        <group position={[0, 0.11, 0.05]} rotation={[0, Math.PI / 12, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.35, 0.035, 0.6]} />
            <meshStandardMaterial
              color={composition.guardanapo.hexColor || '#d6cdbd'}
              roughness={0.85}
              metalness={0.0}
            />
          </mesh>
        </group>
      )}

      {/* 5. GARFO (Lado Esquerdo) */}
      {composition.talherGarfo && (
        <group position={[-1.25, 0.03, 0]} rotation={[0, 0, 0]}>
          {/* Cabo do Garfo */}
          <mesh castShadow>
            <boxGeometry args={[0.06, 0.02, 0.8]} />
            <meshStandardMaterial
              color={composition.talherGarfo.hexColor || '#c6a56a'}
              roughness={0.2}
              metalness={0.9}
            />
          </mesh>
          {/* Dentes do Garfo */}
          <mesh position={[0, 0.01, -0.42]} castShadow>
            <boxGeometry args={[0.08, 0.015, 0.18]} />
            <meshStandardMaterial
              color={composition.talherGarfo.hexColor || '#c6a56a'}
              roughness={0.2}
              metalness={0.9}
            />
          </mesh>
        </group>
      )}

      {/* 6. FACA (Lado Direito) */}
      {composition.talherFaca && (
        <group position={[1.25, 0.03, 0]}>
          {/* Lâmina e Cabo */}
          <mesh castShadow>
            <boxGeometry args={[0.05, 0.02, 0.85]} />
            <meshStandardMaterial
              color={composition.talherFaca.hexColor || '#c6a56a'}
              roughness={0.2}
              metalness={0.9}
            />
          </mesh>
        </group>
      )}

      {/* 7. COLHER (Ao lado da faca) */}
      {composition.talherColher && (
        <group position={[1.42, 0.03, 0.05]}>
          <mesh castShadow>
            <boxGeometry args={[0.05, 0.02, 0.75]} />
            <meshStandardMaterial
              color={composition.talherColher.hexColor || '#c6a56a'}
              roughness={0.2}
              metalness={0.9}
            />
          </mesh>
          {/* Bojo da colher */}
          <mesh position={[0, 0.01, -0.4]} castShadow>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial
              color={composition.talherColher.hexColor || '#c6a56a'}
              roughness={0.2}
              metalness={0.9}
            />
          </mesh>
        </group>
      )}

      {/* 8. TAÇA DE CRISTAL (Superior Direito) */}
      {composition.taca && (
        <group position={[1.1, 0.35, -0.9]}>
          {/* Base da Taça */}
          <mesh castShadow position={[0, -0.32, 0]}>
            <cylinderGeometry args={[0.25, 0.25, 0.02, 32]} />
            <meshPhysicalMaterial
              color="#ffffff"
              transmission={0.95}
              opacity={1}
              transparent
              roughness={0.05}
              ior={1.52}
            />
          </mesh>
          {/* Haste da Taça */}
          <mesh castShadow position={[0, -0.15, 0]}>
            <cylinderGeometry args={[0.025, 0.025, 0.32, 16]} />
            <meshPhysicalMaterial
              color="#ffffff"
              transmission={0.95}
              transparent
              roughness={0.05}
              ior={1.52}
            />
          </mesh>
          {/* Bojo da Taça */}
          <mesh castShadow position={[0, 0.1, 0]}>
            <cylinderGeometry args={[0.22, 0.12, 0.35, 32, 1, true]} />
            <meshPhysicalMaterial
              color={composition.taca.hexColor === '#7a7d85' ? '#666a73' : '#ffffff'}
              transmission={0.9}
              transparent
              roughness={0.1}
              ior={1.5}
            />
          </mesh>
        </group>
      )}
    </group>
  );
}
