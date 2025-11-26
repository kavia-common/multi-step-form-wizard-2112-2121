import React from 'react';
import { getDialCode } from '../../utils/validation';

// PUBLIC_INTERFACE
export default function StepReview({ formData, jumpTo, canJumpTo }) {
  /** Present review of entered data with links to edit specific steps, grouped nicely. */
  const phoneDisplay = formData.phone ? `${getDialCode(formData.phoneCountry)} ${formData.phone}` : '—';

  const entries = [
    {
      title: 'Personal',
      index: 0,
      fields: [
        ['First Name', formData.firstName || '—'],
        ['Middle Name', formData.middleName || '—'],
        ['Last Name', formData.lastName || '—'],
        ['Gender', formData.gender || '—'],
        ['Nationality', formData.nationality || '—'],
        ['Street', formData.street || '—'],
        ['City', formData.city || '—'],
        ['State/Province', formData.state || '—'],
        ['Postal Code', formData.postalCode || '—'],
        ['District', formData.district || '—'],
        ['Taluk', formData.taluk || '—'],
      ],
    },
    {
      title: 'Contact',
      index: 1,
      fields: [
        ['Email', formData.email || '—'],
        ['Phone', phoneDisplay],
      ],
    },
    {
      title: 'Preferences',
      index: 2,
      fields: [
        ['Plan', formData.preference || '—'],
        ['Newsletter', formData.newsletter ? 'Yes' : 'No'],
        ['Notify: Email', formData.notifyEmail ? 'On' : 'Off'],
        ['Notify: SMS', formData.notifySMS ? 'On' : 'Off'],
        ['Notify: Push', formData.notifyPush ? 'On' : 'Off'],
        ['Frequency', formData.notifyFrequency || '—'],
        ['Topics', Object.keys(formData)
          .filter((k) => k.startsWith('topic_') && formData[k])
          .map((k) => k.replace('topic_', '').replace(/_/g, ' '))
          .join(', ') || '—'],
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
                <dt className="w-40 text-gray-500">{k}</dt>
                <dd className="text-text">{String(v)}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
        <h4 className="text-sm font-medium text-amber-800">Confirmation</h4>
        <p className="text-sm text-amber-800/90 mt-1">
          By submitting, you confirm the information provided is accurate and consent to receive
          notifications per your selected preferences.
        </p>
      </div>
      <p className="text-sm text-gray-600">
        Review your information and click Submit when ready.
      </p>
    </div>
  );
}
