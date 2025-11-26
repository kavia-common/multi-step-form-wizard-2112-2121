import React from 'react';
import Input from '../common/Input';
import Select from '../common/Select';

/**
 * PUBLIC_INTERFACE
 */
export default function StepPersonalInfo({ formData, setFieldValue, touched, markTouched, errors }) {
  /** Personal information form fields per spec. */
  const genders = [
    { value: 'female', label: 'Female' },
    { value: 'male', label: 'Male' },
    { value: 'other', label: 'Other' },
    { value: 'prefer_not', label: 'Prefer not to say' },
  ];

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
      <Select
        label="Gender"
        name="gender"
        value={formData.gender}
        onChange={(e) => setFieldValue('gender', e.target.value)}
        onBlur={() => markTouched('gender')}
        required
        error={touched.gender && errors.gender}
        options={genders}
        placeholder="Select gender"
      />
      <Input
        label="Date of Birth"
        name="dob"
        type="date"
        value={formData.dob}
        onChange={(e) => setFieldValue('dob', e.target.value)}
        onBlur={() => markTouched('dob')}
        required
        error={touched.dob && errors.dob}
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
      <Input
        label="State"
        name="state"
        value={formData.state}
        onChange={(e) => setFieldValue('state', e.target.value)}
        onBlur={() => markTouched('state')}
        required
        error={touched.state && errors.state}
        placeholder="Your state"
      />
      <Input
        label="City"
        name="city"
        value={formData.city}
        onChange={(e) => setFieldValue('city', e.target.value)}
        onBlur={() => markTouched('city')}
        required
        error={touched.city && errors.city}
        placeholder="Your city"
      />
    </div>
  );
}
