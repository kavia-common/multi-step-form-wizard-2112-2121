import React from 'react';
import Input from '../common/Input';

// PUBLIC_INTERFACE
export default function StepContact({ formData, setFieldValue, touched, markTouched, errors }) {
  /** Collect email and phone. */
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
      <Input
        label="Phone"
        name="phone"
        type="tel"
        value={formData.phone}
        onChange={(e) => setFieldValue('phone', e.target.value)}
        onBlur={() => markTouched('phone')}
        required
        error={touched.phone && errors.phone}
        placeholder="(555) 123-4567"
      />
    </div>
  );
}
