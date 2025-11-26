import React from 'react';
import Select from '../common/Select';

// PUBLIC_INTERFACE
export default function StepPreferences({ formData, setFieldValue, touched, markTouched, errors }) {
  /** Collect user preferences. */
  const options = [
    { value: 'basic', label: 'Basic' },
    { value: 'pro', label: 'Professional' },
    { value: 'enterprise', label: 'Enterprise' },
  ];
  return (
    <div className="grid grid-cols-1 gap-4">
      <Select
        label="Plan Preference"
        name="preference"
        value={formData.preference}
        onChange={(e) => setFieldValue('preference', e.target.value)}
        onBlur={() => markTouched('preference')}
        required
        error={touched.preference && errors.preference}
        options={options}
        placeholder="Choose a plan"
      />
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
