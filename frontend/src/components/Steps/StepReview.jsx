import React from 'react';

// PUBLIC_INTERFACE
export default function StepReview({ formData, jumpTo, canJumpTo }) {
  /** Present review of entered data with links to edit specific steps. */
  const entries = [
    {
      title: 'Personal',
      index: 0,
      fields: [
        ['First Name', formData.firstName || '—'],
        ['Last Name', formData.lastName || '—'],
      ],
    },
    {
      title: 'Contact',
      index: 1,
      fields: [
        ['Email', formData.email || '—'],
        ['Phone', formData.phone || '—'],
      ],
    },
    {
      title: 'Preferences',
      index: 2,
      fields: [
        ['Plan', formData.preference || '—'],
        ['Newsletter', formData.newsletter ? 'Yes' : 'No'],
      ],
    },
  ];

  return (
    <div className="space-y-4">
      {entries.map((section) => (
        <div key={section.title} className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-text">{section.title}</h3>
            <button
              className="text-sm text-primary hover:underline disabled:text-gray-400"
              onClick={() => jumpTo(section.index)}
              disabled={!canJumpTo(section.index)}
            >
              Edit
            </button>
          </div>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
            {section.fields.map(([k, v]) => (
              <div key={k} className="flex">
                <dt className="w-32 text-gray-500">{k}</dt>
                <dd className="text-text">{String(v)}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
      <p className="text-sm text-gray-600">
        Review your information and click Submit when ready.
      </p>
    </div>
  );
}
