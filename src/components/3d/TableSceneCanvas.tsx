'use client';

import React, { Suspense } from 'react';

import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';

import * as THREE from 'three';

import { TableComposition } from '@/types/sirius';
import { SiriusScene } from './scene/SiriusScene';

interface TableSceneCanvasProps {
  composition: TableComposition;
  lightIntensity?: number;
  interactive?: boolean;
}

export function TableSceneCanvas({
  composition,
  lightIntensity = 1,
  interactive = true,
}: TableSceneCanvasProps) {
  return (
    <div className="relative h-full min-h-[520px] w-full overflow-hidden bg-[#050505]">
      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{
          position: [0, 4.8, 6.5],
          fov: 42,
          near: 0.1,
          far: 100,
        }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        onCreated={({ gl }) => {
          gl.toneMapping =
            THREE.ACESFilmicToneMapping;

          gl.toneMappingExposure = 1;

          gl.outputColorSpace =
            THREE.SRGBColorSpace;
        }}
      >
        <Suspense fallback={null}>
          <SiriusScene
            composition={composition}
            lightIntensity={lightIntensity}
            interactive={interactive}
          />

          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}