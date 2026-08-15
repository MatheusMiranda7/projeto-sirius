'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  ContactShadows,
  Environment,
} from '@react-three/drei';

import { TableComposition } from '@/types/sirius';
import { TableObjects } from './TableObjects';

interface TableSceneCanvasProps {
  composition: TableComposition;
  lightIntensity?: number;
  interactive?: boolean;
}

function LoaderFallback() {
  return (
    <mesh>
      <sphereGeometry args={[0.05, 16, 16]} />
      <meshStandardMaterial color="#ffffff" />
    </mesh>
  );
}

export function TableSceneCanvas({
  composition,
  lightIntensity = 1,
  interactive = true,
}: TableSceneCanvasProps) {
  return (
    <div className="relative h-full min-h-[420px] w-full overflow-hidden rounded-2xl bg-[#080808]">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{
          position: [0, 3.1, 4.5],
          fov: 34,
          near: 0.1,
          far: 100,
        }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        onCreated={({ gl }) => {
          gl.toneMappingExposure = 1.05;
        }}
      >
        <color attach="background" args={['#080808']} />

        <ambientLight intensity={0.12} />

        <directionalLight
          position={[3.5, 5, 4]}
          intensity={lightIntensity * 2.2}
          color="#fff8ef"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-near={0.1}
          shadow-camera-far={20}
          shadow-camera-left={-5}
          shadow-camera-right={5}
          shadow-camera-top={5}
          shadow-camera-bottom={-5}
        />

        <spotLight
          position={[-3, 4, 2]}
          intensity={lightIntensity * 2}
          angle={0.45}
          penumbra={1}
          color="#d9c09a"
          castShadow
        />

        <spotLight
          position={[3, 2.5, -3]}
          intensity={lightIntensity * 1.2}
          angle={0.5}
          penumbra={1}
          color="#dbe6ff"
        />

        <Suspense fallback={<LoaderFallback />}>
          <TableObjects
            composition={composition}
            lightIntensity={lightIntensity}
          />

          <ContactShadows
            position={[0, -0.61, 0]}
            opacity={0.45}
            scale={7}
            blur={3}
            far={3}
          />

          <Environment preset="studio" environmentIntensity={0.35} />
        </Suspense>

        {interactive && (
          <OrbitControls
            enablePan={false}
            enableZoom
            enableDamping
            dampingFactor={0.06}
            minDistance={3.2}
            maxDistance={6}
            minPolarAngle={Math.PI / 5}
            maxPolarAngle={Math.PI / 2.4}
            rotateSpeed={0.4}
            zoomSpeed={0.6}
            target={[0, 0.15, 0]}
          />
        )}
      </Canvas>
    </div>
  );
}