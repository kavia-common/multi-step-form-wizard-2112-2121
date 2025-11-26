import React from 'react';
import { cn } from '../../theme/tokens';

// PUBLIC_INTERFACE
export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  loading = false,
  className = '',
}) {
  /** Themed button with primary/secondary/ghost variants. */
  const base = 'ocean-btn';
  const variants = {
    primary: 'bg-primary text-white hover:bg-blue-600 focus:ring-blue-500 shadow-[0_8px_16px_rgba(59,130,246,0.25)]',
    secondary: 'bg-amber-500 text-white hover:bg-amber-600 focus:ring-amber-500 shadow-[0_6px_12px_rgba(245,158,11,0.25)]',
    ghost: 'bg-transparent text-primary hover:bg-blue-50 focus:ring-blue-500 border border-blue-200',
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(base, variants[variant] || variants.primary, className)}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none" viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10"
            stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
      )}
      {children}
    </button>
  );
}
