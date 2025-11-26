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
}) {
  /** Navigation controls for the wizard. */
  return (
    <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
      <div className="flex-1">
        <Button
          variant="ghost"
          onClick={onBack}
          disabled={currentStep === 0}
          className="w-full sm:w-auto"
        >
          Back
        </Button>
      </div>
      <div className="flex-1 sm:text-right">
        {!isFinal ? (
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
            className="w-full sm:w-auto"
          >
            Submit
          </Button>
        )}
      </div>
    </div>
  );
}
