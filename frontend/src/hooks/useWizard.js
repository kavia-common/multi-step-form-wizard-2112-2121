import { useCallback, useEffect, useMemo, useState } from 'react';
import { stepSchemas, validateSchema, getContactSchema } from '../utils/validation';

const STORAGE_KEY = 'wizard_form_data_v2';

// PUBLIC_INTERFACE
export function useWizard(steps) {
  /**
   * Manage multi-step wizard state including:
   * - current step index
   * - form data and touched fields
   * - next/back navigation with validation
   * - direct jump navigation with gatekeeping
   * - sessionStorage persistence
   * - user interaction flags to control validation UX
   */
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  // Track whether a navigation attempt (next/submit) has occurred on the current step
  const [attempted, setAttempted] = useState(false);
  // Track if any field has been interacted with on the current step at least once
  const [interacted, setInteracted] = useState(false);

  const stepKeys = useMemo(() => ['personal', 'contact', 'additional', 'review'], []);
  const currentKey = stepKeys[currentStep] || stepKeys[0];

  // Reset attempt/interacted flags when step changes
  useEffect(() => {
    setAttempted(false);
    setInteracted(false);
  }, [currentStep]);

  // Persist
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    } catch {
      // ignore
    }
  }, [formData]);

  const setFieldValue = useCallback((name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const markTouched = useCallback((name) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    setInteracted(true);
  }, []);

  const schemaForKey = useCallback(
    (key) => {
      if (key === 'contact') {
        const getIso = () => formData.phoneCountry;
        return getContactSchema(getIso);
      }
      return stepSchemas[key] || {};
    },
    [formData.phoneCountry]
  );

  const validateCurrent = useCallback(() => {
    const schema = schemaForKey(currentKey);
    const result = validateSchema(schema, formData);
    setErrors(result);
    return result;
  }, [currentKey, formData, schemaForKey]);

  const isStepValid = useMemo(() => {
    const schema = schemaForKey(currentKey);
    const result = validateSchema(schema, formData);
    return Object.values(result).every((v) => !v);
  }, [currentKey, formData, schemaForKey]);

  const next = useCallback(() => {
    // Mark that a navigation attempt was made
    setAttempted(true);
    const result = validateCurrent();
    const hasErrors = Object.values(result).some(Boolean);
    if (!hasErrors && currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1);
    } else if (hasErrors) {
      // mark all fields touched on error to trigger UI feedback
      const schema = stepSchemas[currentKey] || {};
      const names = Object.keys(schema);
      setTouched((prev) => {
        const upd = { ...prev };
        names.forEach((n) => (upd[n] = true));
        return upd;
      });
      setInteracted(true);
    }
  }, [currentStep, steps.length, validateCurrent, currentKey]);

  const back = useCallback(() => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  }, [currentStep]);

  const canJumpTo = useCallback(
    (index) => {
      if (index <= currentStep) return true;
      // Ensure previous steps are valid
      for (let i = 0; i < index; i++) {
        const key = stepKeys[i];
        const schema = stepSchemas[key] || {};
        const result = validateSchema(schema, formData);
        if (Object.values(result).some(Boolean)) return false;
      }
      return true;
    },
    [currentStep, formData, stepKeys]
  );

  const jumpTo = useCallback(
    (index) => {
      if (canJumpTo(index)) setCurrentStep(index);
    },
    [canJumpTo]
  );

  const reset = useCallback(() => {
    setFormData({});
    setTouched({});
    setErrors({});
    setCurrentStep(0);
    setAttempted(false);
    setInteracted(false);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  const submit = useCallback(async (options = {}) => {
    const { confirmChecked } = options;
    setAttempted(true);
    const result = validateCurrent();
    const hasErrors = Object.values(result).some(Boolean);
    if (hasErrors) {
      const schema = stepSchemas[currentKey] || {};
      const names = Object.keys(schema);
      setTouched((prev) => {
        const upd = { ...prev };
        names.forEach((n) => (upd[n] = true));
        return upd;
      });
      setInteracted(true);
      return { ok: false, errors: result };
    }
    // If on review step, require confirmation checkbox
    if (currentKey === 'review' && !confirmChecked) {
      return { ok: false, errors: { confirm: 'Please confirm before submitting.' } };
    }
    // simulate submit
    await new Promise((r) => setTimeout(r, 400));
    return { ok: true };
  }, [validateCurrent, currentKey]);

  return {
    currentStep,
    setCurrentStep,
    steps,
    currentKey,
    formData,
    setFieldValue,
    touched,
    markTouched,
    errors,
    isStepValid,
    next,
    back,
    jumpTo,
    canJumpTo,
    reset,
    submit,
    // Flags for UI banner logic
    attempted,
    interacted,
  };
}
