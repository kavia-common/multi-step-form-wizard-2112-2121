import React from 'react';
import { cn } from '../../theme/tokens';

 // PUBLIC_INTERFACE
export default function Card({ children, className }) {
  /** A surface card with soft shadow and rounded corners. */
  return (
    <div
      className={cn(
        'ocean-card',
        className
      )}
    >
      {children}
    </div>
  );
}
