import React from 'react';
import { cn } from '../../theme/tokens';

// PUBLIC_INTERFACE
export default function Input({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  required = false,
  helperText,
}) {
  /**
   * Text input with consistent label spacing, input metrics, and helper/error display.
   * - Label: 12.5px, medium, mb-1.5
   * - Input: h-[46px], rounded-[10px]
   * - Helper text: text-xs muted, appears when provided and no error
   * - Error text: text-xs danger, mt-1
   */
  const describedBy = error ? `${name}-error` : helperText ? `${name}-help` : undefined;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name} className="block mb-1.5">
          {label} {required && <span className="text-error">*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value || ''}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={cn(
          'ocean-input',
          error
            ? 'border-[color:var(--danger)] focus:ring-red-200'
            : 'border-[#D7DCE8] focus:border-[color:var(--accent)] focus:ring-[color:var(--focus-ring)]'
        )}
        aria-invalid={!!error}
        aria-describedby={describedBy}
      />
      {!error && helperText && (
        <p id={`${name}-help`} className="helper-text mt-1">
          {helperText}
        </p>
      )}
      {error && (
        <p id={`${name}-error`} className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}
