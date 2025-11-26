import React, { useState } from 'react';
import Input from '../common/Input';

/**
 * PUBLIC_INTERFACE
 */
export default function StepAccount({ formData, setFieldValue, touched, markTouched, errors }) {
  /** Account information: username, email, password, confirm password. */
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="space-y-5">
      <Input
        label="Username"
        name="username"
        value={formData.username}
        onChange={(e) => setFieldValue('username', e.target.value)}
        onBlur={() => markTouched('username')}
        required
        error={touched.username && errors.username}
        placeholder="yourname"
      />
      <Input
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={(e) => setFieldValue('email', e.target.value)}
        onBlur={() => markTouched('email')}
        required
        error={touched.email && errors.email}
        placeholder="you@example.com"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Input
            label="Password"
            name="password"
            type={showPwd ? 'text' : 'password'}
            value={formData.password}
            onChange={(e) => setFieldValue('password', e.target.value)}
            onBlur={() => markTouched('password')}
            required
            error={touched.password && errors.password}
            placeholder="At least 8 characters"
          />
          <button
            type="button"
            onClick={() => setShowPwd((s) => !s)}
            className="absolute right-3 top-9 text-xs font-medium text-[color:var(--text-muted)] hover:text-[color:var(--text-medium)]"
            aria-label={showPwd ? 'Hide password' : 'Show password'}
          >
            {showPwd ? 'Hide' : 'Show'}
          </button>
        </div>
        <div className="relative">
          <Input
            label="Confirm Password"
            name="confirmPassword"
            type={showConfirm ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={(e) => setFieldValue('confirmPassword', e.target.value)}
            onBlur={() => markTouched('confirmPassword')}
            required
            error={touched.confirmPassword && errors.confirmPassword}
            placeholder="Re-enter password"
          />
          <button
            type="button"
            onClick={() => setShowConfirm((s) => !s)}
            className="absolute right-3 top-9 text-xs font-medium text-[color:var(--text-muted)] hover:text-[color:var(--text-medium)]"
            aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
          >
            {showConfirm ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>
      <p className="helper-text">Use a strong password with at least 8 characters.</p>
    </div>
  );
}
