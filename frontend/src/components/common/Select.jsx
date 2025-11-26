import React from 'react';
import { cn } from '../../theme/tokens';

// PUBLIC_INTERFACE
export default function Select({
  label,
  name,
  value,
  onChange,
  onBlur,
  placeholder = 'Select...',
  options = [],
  error,
  required = false,
  helperText,
}) {
  /**
   * Select input with consistent metrics and helper/error handling.
   * Mirrors Input component spacing: label mb-1.5, field h-[46px], helper/error under field.
   */
  const describedBy = error ? `${name}-error` : helperText ? `${name}-help` : undefined;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name} className="block mb-1.5">
          {label} {required && <span className="text-error">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          id={name}
          name={name}
          value={value || ''}
          onChange={onChange}
          onBlur={onBlur}
          className={cn(
            'ocean-input pr-9 appearance-none',
            error
              ? 'border-[color:var(--danger)] focus:ring-red-200'
              : 'border-[#D7DCE8] focus:border-[color:var(--accent)] focus:ring-[color:var(--focus-ring)]'
          )}
          aria-invalid={!!error}
          aria-describedby={describedBy}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value ?? opt} value={opt.value ?? opt}>
              {opt.label ?? opt}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[color:var(--placeholder)]">▾</span>
      </div>
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
