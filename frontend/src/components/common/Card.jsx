import React from 'react';
import { cn } from '../../theme/tokens';

// PUBLIC_INTERFACE
export default function Card({ children, className }) {
  /** A surface card with soft shadow and rounded corners. */
  return (
    <div className={cn('bg-surface shadow-soft rounded-xl border border-gray-100', className)}>
      {children}
    </div>
  );
}
