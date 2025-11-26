import React from 'react';
import Input from '../common/Input';
import Select from '../common/Select';
import { getCountryList, getDialCode } from '../../utils/validation';

// PUBLIC_INTERFACE
export default function StepContact({ formData, setFieldValue, touched, markTouched, errors }) {
  /** Collect email and phone with country code selection and validation. */
  const countries = getCountryList();
  const dialCode = getDialCode(formData.phoneCountry);

  return (
    <div className="grid grid-cols-1 gap-4">
      <Input
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={(e) => setFieldValue('email', e.target.value)}
        onBlur={() => markTouched('email')}
        required
        error={touched.email && errors.email}
        placeholder="jane@example.com"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select
          label="Country"
          name="phoneCountry"
          value={formData.phoneCountry}
          onChange={(e) => setFieldValue('phoneCountry', e.target.value)}
          onBlur={() => markTouched('phoneCountry')}
          required
          error={touched.phoneCountry && errors.phoneCountry}
          options={countries}
          placeholder="Select country"
        />
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number <span className="text-error">*</span>
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-700 text-sm">
              {dialCode || '—'}
            </span>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone || ''}
              onChange={(e) => setFieldValue('phone', e.target.value.replace(/[^\d]/g, ''))}
              onBlur={() => markTouched('phone')}
              placeholder="Enter digits only"
              className={`block w-full rounded-r-lg border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 ${
                touched.phone && errors.phone
                  ? 'border-error focus:ring-red-200'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
              } bg-white text-text placeholder:text-gray-400`}
              aria-invalid={!!(touched.phone && errors.phone)}
              aria-describedby={touched.phone && errors.phone ? 'phone-error' : undefined}
            />
          </div>
          {touched.phone && errors.phone && (
            <p id="phone-error" className="mt-1 text-sm text-error">
              {errors.phone}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
