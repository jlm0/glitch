import React from 'react';
import './NoiseLayer.css';

interface NoiseLayerProps {
  opacity?: number;
  animated?: boolean;
  className?: string;
}

export function NoiseLayer({ 
  opacity = 0.1, 
  animated = true, 
  className = '' 
}: NoiseLayerProps) {
  return (
    <div 
      className={`noise-layer ${animated ? 'noise-animated' : ''} ${className}`}
      style={{ opacity }}
    />
  );
}
