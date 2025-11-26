/**
 * Basic validation helpers and step schemas for the wizard.
 */

// PUBLIC_INTERFACE
export const required = (msg = 'This field is required') => (value) =>
  value !== undefined && value !== null && String(value).trim() !== '' ? null : msg;

// PUBLIC_INTERFACE
export const email = (msg = 'Please enter a valid email address') => (value) => {
  if (value === undefined || value === null || String(value).trim() === '') return msg;
  const re = /^[^\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return re.test(String(value).toLowerCase()) ? null : msg;
};

// PUBLIC_INTERFACE
export const minLength = (min, msg = `Must be at least {min} characters`) => (value) => {
  const s = String(value || '');
  return s.length >= min ? null : msg.replace('{min}', String(min));
};

// PUBLIC_INTERFACE
export const inList = (list, msg = 'Invalid value') => (value) =>
  list.includes(value) ? null : msg;

// Country metadata for phone digit validation (examples; can be extended)
const COUNTRY_PHONE_RULES = {
  US: { dialCode: '+1', min: 10, max: 10 },
  CA: { dialCode: '+1', min: 10, max: 10 },
  GB: { dialCode: '+44', min: 10, max: 10 },
  AU: { dialCode: '+61', min: 9, max: 9 },
  IN: { dialCode: '+91', min: 10, max: 10 },
  DE: { dialCode: '+49', min: 10, max: 11 },
  FR: { dialCode: '+33', min: 9, max: 9 },
};

// PUBLIC_INTERFACE
export function getCountryList() {
  /** Return a simple list of ISO country codes and labels for selection. */
  const list = [
    { value: 'US', label: 'United States (+1)' },
    { value: 'CA', label: 'Canada (+1)' },
    { value: 'GB', label: 'United Kingdom (+44)' },
    { value: 'AU', label: 'Australia (+61)' },
    { value: 'IN', label: 'India (+91)' },
    { value: 'DE', label: 'Germany (+49)' },
    { value: 'FR', label: 'France (+33)' },
  ];
  return list;
}

// PUBLIC_INTERFACE
export function getDialCode(iso) {
  /** Get dial code string such as +1 based on ISO code. */
  return COUNTRY_PHONE_RULES[iso]?.dialCode || '';
}

// PUBLIC_INTERFACE
export const phoneDigitsForCountry = (getIsoFn, msg = 'Invalid phone length') => (value) => {
  /**
   * Validate the national number length by selected country.
   * getIsoFn: function to retrieve current ISO code from external state (closure in schema)
   */
  const iso = getIsoFn?.();
  const rule = iso ? COUNTRY_PHONE_RULES[iso] : null;
  const digits = String(value || '').replace(/\\D/g, '');
  if (!digits) return 'This field is required';
  if (!rule) {
    // Fallback: basic min length
    return digits.length >= 7 ? null : msg;
  }
  if (digits.length < rule.min || digits.length > rule.max) {
    return `${msg}. Expect ${rule.min}${rule.max !== rule.min ? '-' + rule.max : ''} digits for ${iso}.`;
  }
  return null;
};

// PUBLIC_INTERFACE
export function validateSchema(schema, data) {
  /**
   * Validate data against a schema: { fieldName: [validators...] }
   * Returns: { fieldName: errorMessage|null }
   */
  const errors = {};
  Object.entries(schema).forEach(([field, validators]) => {
    const vArray = Array.isArray(validators) ? validators : [validators];
    for (const v of vArray) {
      const err = v(data[field]);
      if (err) {
        errors[field] = err;
        break;
      }
    }
  });
  return errors;
}

// PUBLIC_INTERFACE
export const stepSchemas = {
  personal: {
    firstName: [required()],
    middleName: [], // optional
    lastName: [required()],
    gender: [inList(['male', 'female', 'non-binary', 'prefer_not_to_say', 'other'], 'Please select a gender')],
    nationality: [required()],
    idType: [inList(['national-id', 'passport', 'driver-license'], 'Please select an ID type')],
    idNumber: [required()],
    street: [required()],
    city: [required()],
    state: [required()],
    postalCode: [required()],
  },
  contact: {
    email: [required(), email()],
    phoneCountry: [required('Select a country')],
    phone: [
      // phoneDigitsForCountry will be bound at runtime by useWizard with current form state
      // placeholder; see getContactSchema function below
    ],
  },
  preferences: {
    preference: [required()],
    // toggles optional by default
  },
};

// PUBLIC_INTERFACE
export function getContactSchema(getIsoFn) {
  /** Build contact schema that derives phone validation from current selected country. */
  return {
    email: [required(), email()],
    phoneCountry: [required('Select a country')],
    phone: [phoneDigitsForCountry(getIsoFn, 'Invalid phone length')],
  };
}
