import React, { useMemo, useState } from 'react';
import Card from '../common/Card';
import ProgressBar from './ProgressBar';
import WizardNav from './WizardNav';
import Alert from '../common/Alert';

// PUBLIC_INTERFACE
export default function WizardContainer({
  steps,
  hook,
}) {
  /**
   * A wrapper that renders the current step component, a progress bar,
   * and navigation controls.
   */
  const {
    currentStep,
    setCurrentStep,
    formData,
    setFieldValue,
    touched,
    markTouched,
    errors,
    isStepValid,
    next,
    back,
    submit,
    reset,
    jumpTo,
    canJumpTo,
    attempted,
    interacted,
  } = hook;

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const total = steps.length;

  const Current = useMemo(() => steps[currentStep].component, [steps, currentStep]);

  // Track when we came from review to edit a section
  const [editReturnToReview, setEditReturnToReview] = useState(false);
  const [confirmChecked, setConfirmChecked] = useState(false);

  const onSubmit = async () => {
    setSubmitting(true);
    const result = await submit({ confirmChecked });
    setSubmitting(false);
    if (result.ok) {
      setSubmitted(true);
      // optional: clear storage but keep data for review
    }
  };

  if (submitted) {
    return (
      <Card className="w-full max-w-xl mx-auto p-6 md:p-8">
        <div className="text-center space-y-3">
          <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="w-7 h-7 text-green-600" viewBox="0 0 24 24" fill="none">
              <path d="M20 7L9 18l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-text">All set!</h1>
          <p className="text-gray-600">Your information was submitted successfully.</p>
          <div className="pt-2">
            <button
              onClick={() => { reset(); setSubmitted(false); }}
              className="text-primary hover:underline font-medium"
            >
              Submit another response
            </button>
          </div>
        </div>
      </Card>
    );
  }

  // Determine if the generic banner should be shown:
  // - Only show when the step is invalid AND (user attempted to proceed OR there has been field interaction)
  const showGenericBanner = !isStepValid && (attempted || interacted);

  return (
    <Card className="w-full max-w-2xl mx-auto p-6 md:p-8">
      <div className="space-y-6">
        <ProgressBar current={currentStep} total={total} />

        {steps[currentStep].title && (
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-text">
              {steps[currentStep].title}
            </h2>
            {steps[currentStep].description && (
              <p className="text-gray-600 mt-1">{steps[currentStep].description}</p>
            )}
          </div>
        )}

        <Current
          formData={formData}
          setFieldValue={setFieldValue}
          touched={touched}
          markTouched={markTouched}
          errors={errors}
          jumpTo={(idx) => {
            setEditReturnToReview(true);
            jumpTo(idx);
          }}
          canJumpTo={canJumpTo}
          isEditMode={editReturnToReview && currentStep !== steps.length - 1}
          onSaveFromEdit={() => {
            // Validate current step; if valid, return to review (last step)
            if (isStepValid) {
              setCurrentStep(steps.length - 1);
              setEditReturnToReview(false);
            }
          }}
          confirmChecked={confirmChecked}
          setConfirmChecked={setConfirmChecked}
        />

        {showGenericBanner && (
          <Alert kind="error" title="Please fix the errors above">
            Some fields are missing or invalid. Correct them to continue.
          </Alert>
        )}

        <WizardNav
          currentStep={currentStep}
          totalSteps={total}
          onBack={() => {
            if (currentStep === total - 1) {
              // going back from review clears edit-return flag
              setEditReturnToReview(false);
            }
            back();
          }}
          onNext={() => {
            if (currentStep === total - 2) {
              // moving from Additional Info to Review, reset edit flag
              setEditReturnToReview(false);
            }
            next();
          }}
          onSubmit={onSubmit}
          isFinal={currentStep === total - 1}
          canProceed={currentStep === total - 1 ? isStepValid && confirmChecked : isStepValid}
          submitting={submitting}
        />
      </div>
    </Card>
  );
}
