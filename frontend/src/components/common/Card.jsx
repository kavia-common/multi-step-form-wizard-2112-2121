import React from 'react';
import { cn } from '../../theme/tokens';

 // PUBLIC_INTERFACE
export default function Card({ children, className }) {
  /** A surface card with soft shadow and rounded corners. */
  return (
    <div
      className={cn(
        'bg-surface rounded-xl border border-gray-100 shadow-[0_10px_25px_-10px_rgba(31,41,55,0.18)]',
        className
      )}
    >
      {children}
    </div>
  );
}
