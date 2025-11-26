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
}) {
  /** Text input with label and error display. */
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name} className="block mb-2">
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
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && (
        <p id={`${name}-error`} className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}
