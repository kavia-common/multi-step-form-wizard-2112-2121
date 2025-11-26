import React from 'react';

/**
 * PUBLIC_INTERFACE
 */
export default function ProgressBar({ current, total, labels = [] }) {
  /** Accessible horizontal stepper with badges, labels, and connector lines. */
  const pct = Math.round(((current + 1) / total) * 100);

  return (
    <nav aria-label="Progress" className="relative">
      {/* Connector line */}
      <div className="absolute left-0 right-0 top-5 h-0.5 bg-[#E2E6F2]">
        <div
          className="h-0.5 bg-primary transition-all"
          style={{
            width: `${Math.min(100, Math.max(0, (current / (total - 1)) * 100))}%`,
          }}
          aria-hidden="true"
        />
      </div>

      <ol className="relative z-10 flex items-start justify-between pb-4 border-b border-[#EEF1F6]" role="list">
        {Array.from({ length: total }).map((_, i) => {
          const isActive = i === current;
          const isCompleted = i < current;
          const label = labels[i] || `Step ${i + 1}`;

          return (
            <li
              key={i}
              className="flex flex-col items-center gap-2 min-w-0 text-center"
              aria-current={isActive ? 'step' : undefined}
            >
              <span
                className={[
                  'h-10 w-10 rounded-full grid place-items-center text-sm font-bold',
                  'transition-colors ring-0',
                  isActive
                    ? 'bg-primary text-white ring-2 ring-blue-200'
                    : isCompleted
                    ? 'bg-blue-600 text-white'
                    : 'bg-[#E9ECF7] text-[#67728A]',
                ].join(' ')}
              >
                {isCompleted ? (
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M20 7L9 18l-5-5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  i + 1
                )}
              </span>
              <span
                className={[
                  'text-[12px] font-semibold truncate max-w-[6rem]',
                  isActive ? 'text-primary' : 'text-gray-500',
                ].join(' ')}
                title={label}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ol>

      {/* Inline status for screen readers */}
      <div className="sr-only" role="status" aria-live="polite">
        Step {current + 1} of {total} — {pct}% complete
      </div>
    </nav>
  );
}
