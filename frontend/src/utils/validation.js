/**
 * Basic validation helpers and step schemas for the wizard.
 */

// PUBLIC_INTERFACE
export const required = (msg = 'This field is required') => (value) =>
  value !== undefined && value !== null && String(value).trim() !== '' ? null : msg;

// PUBLIC_INTERFACE
export const email = (msg = 'Please enter a valid email address') => (value) => {
  if (value === undefined || value === null || String(value).trim() === '') return msg;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(value).toLowerCase()) ? null : msg;
};

// PUBLIC_INTERFACE
export const minLength = (min, msg = `Must be at least {min} characters`) => (value) => {
  const s = String(value || '');
  return s.length >= min ? null : msg.replace('{min}', String(min));
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
    lastName: [required()],
  },
  contact: {
    email: [required(), email()],
    phone: [required(), minLength(7)],
  },
  preferences: {
    preference: [required()],
    newsletter: [], // optional
  },
};
