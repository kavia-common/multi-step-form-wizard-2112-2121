import React, { useEffect, useRef, useState } from 'react';
import Alert from '../common/Alert';

/**
 * PUBLIC_INTERFACE
 */
export default function StepImageUpload({ formData, setFieldValue, touched, markTouched, errors, isEditMode = false, onSaveFromEdit }) {
  /** Image upload with preview; optional field with client-side checks. */
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(formData.avatarPreview || '');

  useEffect(() => {
    // generate preview when avatarFile set
    if (formData.avatarFile instanceof File) {
      const url = URL.createObjectURL(formData.avatarFile);
      setPreview(url);
      setFieldValue('avatarPreview', url);
      return () => URL.revokeObjectURL(url);
    }
    if (!formData.avatarFile) {
      setPreview('');
      setFieldValue('avatarPreview', '');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.avatarFile]);

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    setFieldValue('avatarFile', file || null);
    markTouched('avatarFile');
  };

  const removeImage = () => {
    setFieldValue('avatarFile', null);
    setFieldValue('avatarPreview', '');
    setPreview('');
    if (inputRef.current) inputRef.current.value = '';
  };

  const error = touched.avatarFile && errors.avatarFile;

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Profile Image <span className="text-gray-400 font-normal">(JPEG/PNG up to 3MB)</span>
        </label>
        <input
          ref={inputRef}
          id="avatarFile"
          name="avatarFile"
          type="file"
          accept="image/png,image/jpeg"
          onChange={onFileChange}
          onBlur={() => markTouched('avatarFile')}
          className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-3 file:rounded-lg file:border file:border-gray-300 file:text-sm file:font-medium file:bg-white file:text-gray-700 hover:file:bg-gray-50"
          aria-invalid={!!error}
          aria-describedby={error ? 'avatarFile-error' : undefined}
        />
        {error && (
          <p id="avatarFile-error" className="mt-1 text-sm text-error">
            {error}
          </p>
        )}
      </div>

      {preview ? (
        <div className="flex items-center gap-4">
          <img
            src={preview}
            alt="Preview"
            className="h-24 w-24 rounded-lg object-cover border border-gray-200"
          />
          <button
            type="button"
            onClick={removeImage}
            className="text-sm text-primary hover:underline"
          >
            Remove
          </button>
        </div>
      ) : (
        <Alert kind="info" title="No image uploaded">
          You can skip this step or upload a profile image to personalize your account.
        </Alert>
      )}

      {isEditMode && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onSaveFromEdit}
            className="inline-flex items-center justify-center rounded-lg px-4 py-2 font-medium transition-colors bg-secondary text-white hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}
