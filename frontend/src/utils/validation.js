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
export const pattern = (re, msg = 'Invalid value') => (value) => {
  const s = String(value || '');
  return re.test(s) ? null : msg;
};

// PUBLIC_INTERFACE
export const matches = (otherKey, getData, msg = 'Values do not match') => () => {
  const data = getData();
  return data?.password && data?.confirmPassword && data.password === data.confirmPassword
    ? null
    : msg;
};

// PUBLIC_INTERFACE
export const validDate = (msg = 'Enter a valid date (YYYY-MM-DD)') => (value) => {
  if (!value) return msg;
  const d = new Date(value);
  return isNaN(d.getTime()) ? msg : null;
};

// PUBLIC_INTERFACE
export const ageBetween = (min, max, msg = `Age must be between ${min} and ${max}`) => (value) => {
  if (!value) return msg;
  const d = new Date(value);
  if (isNaN(d.getTime())) return 'Invalid date';
  const today = new Date();
  let age = today.getFullYear() - d.getFullYear();
  const m = today.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < d.getDate())) age--;
  return age >= min && age <= max ? null : msg;
};

// PUBLIC_INTERFACE
export const fileCheck = ({ maxSizeMB = 2, types = ['image/jpeg', 'image/png'] } = {}, msg = 'Invalid file') => (file) => {
  if (!file) return null; // optional
  if (file.size > maxSizeMB * 1024 * 1024) return `File must be <= ${maxSizeMB}MB`;
  if (!types.includes(file.type)) return `Only ${types.map(t => t.split('/')[1].toUpperCase()).join(', ')} allowed`;
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
  // Step 0: Account Information
  account: (getData) => ({
    username: [required(), minLength(3)],
    email: [required(), email()],
    password: [required(), minLength(8)],
    confirmPassword: [required(), matches('password', getData, 'Passwords must match')],
  }),
  // Step 1: Personal Information
  personalInfo: {
    firstName: [required()],
    lastName: [required()],
    gender: [required()],
    dob: [required(), validDate(), ageBetween(13, 120)],
    phone: [required(), pattern(/^[0-9()+\-\s]{7,20}$/, 'Enter a valid phone number')],
    state: [required()],
    city: [required()],
  },
  // Step 2: Image Upload (optional but validate if present)
  image: {
    avatarFile: [fileCheck({ maxSizeMB: 3, types: ['image/jpeg', 'image/png'] })],
  },
  // Step 3: Review
  review: {
    confirm: [required('You must confirm to submit')],
  },
};
