import React from 'react';

// PUBLIC_INTERFACE
export default function ProgressBar({ current, total }) {
  /** Horizontal progress indicator showing step completion styled like a stepper bar. */
  const pct = Math.round(((current + 1) / total) * 100);
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-gray-500 mb-2">
        <span>Step {current + 1} of {total}</span>
        <span>{pct}%</span>
      </div>
      <div className="relative">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${pct}%` }}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={pct}
            role="progressbar"
          />
        </div>
        <div className="absolute inset-0 flex justify-between px-1">
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              className={`h-2 w-2 -mt-0.5 rounded-full ring-2 ring-white ${i <= current ? 'bg-primary' : 'bg-gray-300'}`}
              style={{ transform: 'translateY(-2px)' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
