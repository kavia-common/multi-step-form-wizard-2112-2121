import React from 'react';
import Alert from '../common/Alert';

// PUBLIC_INTERFACE
export default function StepAdditionalInfo({ formData, setFieldValue, touched, markTouched, errors, isEditMode = false, onSaveFromEdit }) {
  /** Placeholder step to be customized later; currently shows an informational banner. */
  return (
    <div className="space-y-4">
      <Alert kind="info" title="Additional Info (Placeholder)">
        This step is a placeholder and can be customized later with additional form fields.
      </Alert>
      {isEditMode && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onSaveFromEdit}
            className="inline-flex items-center justify-center rounded-lg px-4 py-2 font-medium transition-colors bg-primary text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}
