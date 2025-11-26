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
}) {
  /** Select input with label and error display. */
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name} className="block mb-2">
          {label} {required && <span className="text-error">*</span>}
        </label>
      )}
      <select
        id={name}
        name={name}
        value={value || ''}
        onChange={onChange}
        onBlur={onBlur}
        className={cn(
          'ocean-input',
          error
            ? 'border-[color:var(--danger)] focus:ring-red-200'
            : 'border-[#D7DCE8] focus:border-[color:var(--accent)] focus:ring-[color:var(--focus-ring)]'
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
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
      {error && (
        <p id={`${name}-error`} className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}
