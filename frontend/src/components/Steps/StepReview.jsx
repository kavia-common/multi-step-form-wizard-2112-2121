import React from 'react';

// PUBLIC_INTERFACE
export default function StepReview({ formData, setFieldValue, touched, markTouched, errors, jumpTo, canJumpTo }) {
  /** Present review of entered data with links to edit specific steps and confirmation checkbox. */
  const entries = [
    {
      title: 'Account',
      index: 0,
      fields: [
        ['Username', formData.username || '—'],
        ['Email', formData.email || '—'],
      ],
    },
    {
      title: 'Personal',
      index: 1,
      fields: [
        ['First Name', formData.firstName || '—'],
        ['Last Name', formData.lastName || '—'],
        ['Gender', formData.gender || '—'],
        ['DOB', formData.dob || '—'],
        ['Phone', formData.phone || '—'],
        ['State', formData.state || '—'],
        ['City', formData.city || '—'],
      ],
    },
    {
      title: 'Image',
      index: 2,
      fields: [
        ['Uploaded', formData.avatarFile ? (formData.avatarFile.name || 'Yes') : 'No'],
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
          {section.title === 'Image' && formData.avatarPreview && (
            <div className="mt-3">
              <img
                src={formData.avatarPreview}
                alt="Uploaded preview"
                className="h-24 w-24 rounded-lg object-cover border border-gray-200"
              />
            </div>
          )}
        </div>
      ))}

      <div className="border border-gray-200 rounded-lg p-4">
        <label className="flex items-start gap-3">
          <input
            id="confirm"
            name="confirm"
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-blue-300"
            checked={!!formData.confirm}
            onChange={(e) => setFieldValue('confirm', e.target.checked)}
            onBlur={() => markTouched('confirm')}
          />
          <span className="text-sm text-gray-700">
            I confirm the information is accurate and agree to the Terms.
          </span>
        </label>
        {touched.confirm && errors.confirm && (
          <p className="mt-1 text-sm text-error">{errors.confirm}</p>
        )}
      </div>

      <p className="text-sm text-gray-600">
        Review your information and click Submit when ready.
      </p>
    </div>
  );
}
