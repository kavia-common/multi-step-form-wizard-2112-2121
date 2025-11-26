import React from 'react';
import { cn } from '../../theme/tokens';

// PUBLIC_INTERFACE
export default function Alert({ kind = 'info', title, children, className }) {
  /** Simple alert banner supporting info/success/error kinds. */
  const styles = {
    info: 'bg-blue-50 text-blue-800 border-blue-200',
    success: 'bg-green-50 text-green-800 border-green-200',
    error: 'bg-red-50 text-red-700 border-red-200',
  };
  return (
    <div className={cn('w-full border rounded-lg px-4 py-3', styles[kind], className)}>
      {title && <div className="font-medium mb-1">{title}</div>}
      <div className="text-sm">{children}</div>
    </div>
  );
}
