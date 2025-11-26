import React from 'react';
import Select from '../common/Select';

// PUBLIC_INTERFACE
export default function StepPreferences({ formData, setFieldValue, touched, markTouched, errors }) {
  /** Collect user preferences with richer options and layout. */
  const planOptions = [
    { value: 'basic', label: 'Basic' },
    { value: 'pro', label: 'Professional' },
    { value: 'enterprise', label: 'Enterprise' },
  ];
  const freqOptions = [
    { value: 'immediate', label: 'Immediate' },
    { value: 'daily', label: 'Daily Digest' },
    { value: 'weekly', label: 'Weekly Summary' },
  ];
  const topics = ['Product updates', 'Security alerts', 'Tips & guides', 'Events'];

  const toggle = (key) => setFieldValue(key, !formData[key]);

  return (
    <div className="grid grid-cols-1 gap-6">
      <Select
        label="Plan Preference"
        name="preference"
        value={formData.preference}
        onChange={(e) => setFieldValue('preference', e.target.value)}
        onBlur={() => markTouched('preference')}
        required
        error={touched.preference && errors.preference}
        options={planOptions}
        placeholder="Choose a plan"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-700">Notification Channels</h4>
            <span className="text-xs text-gray-500" title="Choose how you'd like to be notified">
              ?
            </span>
          </div>
          <div className="space-y-2">
            {[
              { key: 'notifyEmail', label: 'Email' },
              { key: 'notifySMS', label: 'SMS' },
              { key: 'notifyPush', label: 'Push (browser/app)' },
            ].map((c) => (
              <label key={c.key} className="flex items-center justify-between rounded-lg border border-gray-200 px-3 py-2">
                <span className="text-sm">{c.label}</span>
                <button
                  type="button"
                  onClick={() => toggle(c.key)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    formData[c.key] ? 'bg-primary' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
                      formData[c.key] ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>
              </label>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-700">Topics</h4>
            <span className="text-xs text-gray-500" title="Pick the topics that matter to you">
              ?
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {topics.map((t) => {
              const key = `topic_${t.replace(/\\s+/g, '_').toLowerCase()}`;
              const active = !!formData[key];
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggle(key)}
                  className={`text-xs rounded-lg border px-3 py-2 text-left transition ${
                    active
                      ? 'bg-blue-50 border-blue-300 text-blue-700'
                      : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                  title={t}
                >
                  {t}
                </button>
              );
            })}
          </div>

          <div className="mt-4">
            <Select
              label="Notification Frequency"
              name="notifyFrequency"
              value={formData.notifyFrequency}
              onChange={(e) => setFieldValue('notifyFrequency', e.target.value)}
              onBlur={() => markTouched('notifyFrequency')}
              options={freqOptions}
              placeholder="Choose frequency"
            />
            <p className="text-xs text-gray-500 mt-1">
              Frequency applies to email and push notifications.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center">
        <input
          id="newsletter"
          name="newsletter"
          type="checkbox"
          checked={!!formData.newsletter}
          onChange={(e) => setFieldValue('newsletter', e.target.checked)}
          onBlur={() => markTouched('newsletter')}
          className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-blue-300"
        />
        <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-700">
          Subscribe to newsletter
        </label>
      </div>
    </div>
  );
}
