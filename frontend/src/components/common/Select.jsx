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
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
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
          'block w-full h-12 rounded-[10px] border px-3.5 py-2 shadow-sm focus:outline-none focus:ring-4',
          error
            ? 'border-error focus:ring-red-200'
            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200',
          'bg-white text-text'
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
        <p id={`${name}-error`} className="mt-1 text-sm text-error">
          {error}
        </p>
      )}
    </div>
  );
}
