import React from 'react';
import './GridLayer.css';

interface GridLayerProps {
  opacity?: number;
  gridSize?: number;
  color?: 'white' | 'green' | 'blue';
  className?: string;
}

export function GridLayer({ 
  opacity = 0.05, 
  gridSize = 20,
  color = 'white',
  className = '' 
}: GridLayerProps) {
  return (
    <div 
      className={`grid-layer grid-${color} ${className}`}
      style={{ 
        opacity,
        backgroundSize: `${gridSize}px ${gridSize}px`
      }}
    />
  );
}
