"use client";

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Lazy load Spline component to prevent blocking initial render
const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/80" />
});

export function SplineHero() {
  return (
    <Suspense fallback={<div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/80 z-0" />}>
      <Spline
        scene="https://prod.spline.design/jbe4P1bCXGhYxXg7/scene.splinecode" 
        className="absolute inset-0 z-0 opacity-100"
      />
    </Suspense>
  );
}

