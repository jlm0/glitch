import React from 'react';
import './AnimatedLinesLayer.css';

interface AnimatedLinesLayerProps {
  opacity?: number;
  lineCount?: 'minimal' | 'normal' | 'dense';
  color?: 'white' | 'green' | 'blue';
  className?: string;
}

export function AnimatedLinesLayer({ 
  opacity = 0.1, 
  lineCount = 'normal',
  color = 'white',
  className = '' 
}: AnimatedLinesLayerProps) {
  const getLinePositions = () => {
    switch (lineCount) {
      case 'minimal':
        return { horizontal: [30, 70], vertical: [30, 70] };
      case 'normal':
        return { horizontal: [20, 40, 60, 80], vertical: [20, 40, 60, 80] };
      case 'dense':
        return { horizontal: [15, 30, 45, 60, 75, 90], vertical: [15, 30, 45, 60, 75, 90] };
    }
  };

  const { horizontal, vertical } = getLinePositions();

  return (
    <div className={`animated-lines-layer ${className}`} style={{ opacity }}>
      {/* Horizontal lines */}
      {horizontal.map((position, index) => (
        <div
          key={`h-${index}`}
          className={`glitch-line-horizontal glitch-line-${color}`}
          style={{
            top: `${position}%`,
            animationDelay: `${index * 0.5}s`
          }}
        />
      ))}
      
      {/* Vertical lines */}
      {vertical.map((position, index) => (
        <div
          key={`v-${index}`}
          className={`glitch-line-vertical glitch-line-${color}`}
          style={{
            left: `${position}%`,
            animationDelay: `${index * 0.7}s`
          }}
        />
      ))}
    </div>
  );
}
