import React from 'react';
import './ScanlineLayer.css';

interface ScanlineLayerProps {
  opacity?: number;
  lineSpacing?: number;
  color?: 'white' | 'green' | 'blue';
  className?: string;
}

export function ScanlineLayer({ 
  opacity = 0.05, 
  lineSpacing = 4,
  color = 'white',
  className = '' 
}: ScanlineLayerProps) {
  return (
    <div 
      className={`scanline-layer scanline-${color} ${className}`}
      style={{ 
        opacity,
        backgroundSize: `100% ${lineSpacing}px`
      }}
    />
  );
}
