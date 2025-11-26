import React from 'react';
import Button from '../common/Button';

// PUBLIC_INTERFACE
export default function WizardNav({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  onSubmit,
  isFinal = false,
  canProceed = true,
  submitting = false,
  isEditMode = false,
  onSaveFromEdit,
}) {
  /** Navigation controls for the wizard. */
  const showBack = currentStep > 0; // keep first-step Back hidden

  return (
    <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
      <div className="flex-1">
        {showBack && (
          <Button
            variant="ghost"
            onClick={onBack}
            className="w-full sm:w-auto"
          >
            Back
          </Button>
        )}
      </div>
      <div className="flex-1 sm:text-right">
        {isEditMode && !isFinal ? (
          <Button
            variant="secondary"
            onClick={onSaveFromEdit}
            disabled={!canProceed}
            className="w-full sm:w-auto"
          >
            Save
          </Button>
        ) : !isFinal ? (
          <Button
            variant="primary"
            onClick={onNext}
            disabled={!canProceed}
            className="w-full sm:w-auto"
          >
            Next
          </Button>
        ) : (
          <Button
            variant="secondary"
            onClick={onSubmit}
            loading={submitting}
            disabled={!canProceed}
            className="w-full sm:w-auto"
          >
            Submit
          </Button>
        )}
      </div>
    </div>
  );
}
