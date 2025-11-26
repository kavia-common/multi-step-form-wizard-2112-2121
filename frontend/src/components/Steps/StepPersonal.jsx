import React from 'react';
import Input from '../common/Input';

// PUBLIC_INTERFACE
export default function StepPersonal({ formData, setFieldValue, touched, markTouched, errors }) {
  /** Collect first and last name. */
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Input
        label="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={(e) => setFieldValue('firstName', e.target.value)}
        onBlur={() => markTouched('firstName')}
        required
        error={touched.firstName && errors.firstName}
        placeholder="Jane"
      />
      <Input
        label="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={(e) => setFieldValue('lastName', e.target.value)}
        onBlur={() => markTouched('lastName')}
        required
        error={touched.lastName && errors.lastName}
        placeholder="Doe"
      />
    </div>
  );
}
