import React from 'react';

// PUBLIC_INTERFACE
export default function StepReview({ formData, setFieldValue, touched, markTouched, errors, jumpTo, canJumpTo }) {
  /** Present review of entered data with edit links to jump to a specific step. */
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
        <div key={section.title} className="rounded-lg p-4 bg-[#F7F9FC] border border-[#E6E8EE]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-text">{section.title}</h3>
            <button
              type="button"
              className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-blue-50 text-primary hover:bg-blue-100 disabled:bg-gray-100 disabled:text-gray-400"
              onClick={() => jumpTo(section.index)}
              disabled={!canJumpTo(section.index)}
            >
              Edit
            </button>
          </div>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            {section.fields.map(([k, v]) => (
              <div key={k} className="py-2 border-t border-[#EDF2F8] first:border-t-0">
                <dt className="text-[12.5px] font-semibold text-gray-600">{k}</dt>
                <dd className="text-[13.5px] font-semibold text-text mt-1">{String(v)}</dd>
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

      <div className="rounded-lg p-4 border border-[#E6E8EE]">
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
