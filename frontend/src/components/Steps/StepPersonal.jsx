import React, { useEffect, useMemo, useState } from 'react';
import Input from '../common/Input';
import Select from '../common/Select';
import { lookupPincode } from '../../utils/pincode';

// PUBLIC_INTERFACE
export default function StepPersonal({ formData, setFieldValue, touched, markTouched, errors }) {
  /** Collect personal details including name, gender, nationality, and address with pincode auto-fill for district/taluk. */
  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'non-binary', label: 'Non-binary' },
    { value: 'prefer_not_to_say', label: 'Prefer not to say' },
    { value: 'other', label: 'Other' },
  ];

  // track if user manually overrides autofilled district/taluk
  const [overrideDistrict, setOverrideDistrict] = useState(false);
  const [overrideTaluk, setOverrideTaluk] = useState(false);

  // Memoized clean pincode value
  const cleanPincode = useMemo(() => String(formData.postalCode || '').replace(/\D/g, ''), [formData.postalCode]);

  useEffect(() => {
    // Auto-lookup when pincode becomes valid length (6 typical for IN) or present in dataset
    async function doLookup() {
      if (!cleanPincode || cleanPincode.length < 5) return; // basic threshold
      const result = await lookupPincode(cleanPincode);
      if (result && !overrideDistrict && !formData.district) {
        setFieldValue('district', result.district);
      }
      if (result && !overrideTaluk && !formData.taluk) {
        setFieldValue('taluk', result.taluk);
      }
    }
    doLookup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cleanPincode]);

  const onDistrictChange = (e) => {
    setOverrideDistrict(true);
    setFieldValue('district', e.target.value);
  };
  const onTalukChange = (e) => {
    setOverrideTaluk(true);
    setFieldValue('taluk', e.target.value);
  };

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
          <Input
            label="District"
            name="district"
            value={formData.district}
            onChange={onDistrictChange}
            onBlur={() => markTouched('district')}
            required
            error={touched.district && errors.district}
            placeholder="Auto-filled from pincode"
          />
          <Input
            label="Taluk"
            name="taluk"
            value={formData.taluk}
            onChange={onTalukChange}
            onBlur={() => markTouched('taluk')}
            required
            error={touched.taluk && errors.taluk}
            placeholder="Auto-filled from pincode"
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
          {(touched.postalCode && !errors.postalCode) && (
            <p className="text-xs text-gray-500">
              If district/taluk did not auto-fill or are incorrect, you can edit them manually.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
