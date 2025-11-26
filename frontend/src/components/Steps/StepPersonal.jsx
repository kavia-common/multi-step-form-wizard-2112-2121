import React from 'react';
import Input from '../common/Input';
import Select from '../common/Select';

// PUBLIC_INTERFACE
export default function StepPersonal({ formData, setFieldValue, touched, markTouched, errors }) {
  /** Collect comprehensive personal details including name, gender, nationality, address, and ID. */
  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'non-binary', label: 'Non-binary' },
    { value: 'prefer_not_to_say', label: 'Prefer not to say' },
    { value: 'other', label: 'Other' },
  ];

  const idTypeOptions = [
    { value: 'national-id', label: 'National ID' },
    { value: 'passport', label: 'Passport' },
    { value: 'driver-license', label: 'Driver License' },
  ];

  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          label="Middle Name"
          name="middleName"
          value={formData.middleName}
          onChange={(e) => setFieldValue('middleName', e.target.value)}
          onBlur={() => markTouched('middleName')}
          error={touched.middleName && errors.middleName}
          placeholder="A."
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select
          label="Gender"
          name="gender"
          value={formData.gender}
          onChange={(e) => setFieldValue('gender', e.target.value)}
          onBlur={() => markTouched('gender')}
          required
          error={touched.gender && errors.gender}
          options={genderOptions}
          placeholder="Select gender"
        />
        <Input
          label="Nationality"
          name="nationality"
          value={formData.nationality}
          onChange={(e) => setFieldValue('nationality', e.target.value)}
          onBlur={() => markTouched('nationality')}
          required
          error={touched.nationality && errors.nationality}
          placeholder="e.g., United States"
        />
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="ID Type"
            name="idType"
            value={formData.idType}
            onChange={(e) => setFieldValue('idType', e.target.value)}
            onBlur={() => markTouched('idType')}
            required
            error={touched.idType && errors.idType}
            options={idTypeOptions}
            placeholder="Select ID type"
          />
          <Input
            label="ID Number"
            name="idNumber"
            value={formData.idNumber}
            onChange={(e) => setFieldValue('idNumber', e.target.value)}
            onBlur={() => markTouched('idNumber')}
            required
            error={touched.idNumber && errors.idNumber}
            placeholder="Enter ID number"
          />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Address</h4>
        <div className="grid grid-cols-1 gap-4">
          <Input
            label="Street Address"
            name="street"
            value={formData.street}
            onChange={(e) => setFieldValue('street', e.target.value)}
            onBlur={() => markTouched('street')}
            required
            error={touched.street && errors.street}
            placeholder="123 Main St"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="City"
              name="city"
              value={formData.city}
              onChange={(e) => setFieldValue('city', e.target.value)}
              onBlur={() => markTouched('city')}
              required
              error={touched.city && errors.city}
              placeholder="Springfield"
            />
            <Input
              label="State/Province"
              name="state"
              value={formData.state}
              onChange={(e) => setFieldValue('state', e.target.value)}
              onBlur={() => markTouched('state')}
              required
              error={touched.state && errors.state}
              placeholder="CA"
            />
            <Input
              label="Postal Code"
              name="postalCode"
              value={formData.postalCode}
              onChange={(e) => setFieldValue('postalCode', e.target.value)}
              onBlur={() => markTouched('postalCode')}
              required
              error={touched.postalCode && errors.postalCode}
              placeholder="90001"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
