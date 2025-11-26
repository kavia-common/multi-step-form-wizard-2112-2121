import React, { useMemo, useState } from 'react';
import Card from '../common/Card';
import ProgressBar from './ProgressBar';
import WizardNav from './WizardNav';
import Alert from '../common/Alert';
import SuccessScreen from '../SuccessScreen';

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

  // Track whether we navigated from the Review step for editing a specific section
  const [returnToReview, setReturnToReview] = useState(false);

  const onSubmit = async () => {
    setSubmitting(true);
    const result = await submit();
    setSubmitting(false);
    if (result.ok) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <SuccessScreen
        username={formData.username}
        avatarPreview={formData.avatarPreview}
        onReset={() => {
          reset();
          setSubmitted(false);
        }}
      />
    );
  }

  // Determine if the generic banner should be shown:
  // - Only show when the step is invalid AND (user attempted to proceed OR there has been field interaction)
  const showGenericBanner = !isStepValid && (attempted || interacted);

  return (
    <Card className="w-full max-w-2xl mx-auto p-6 md:p-8">
      <div className="space-y-6">
        <ProgressBar
          current={currentStep}
          total={total}
          labels={steps.map((s) => s.title)}
        />

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
            // if jumping from review to edit, set flag
            if (currentStep === total - 1 && idx < total - 1) {
              setReturnToReview(true);
            }
            jumpTo(idx);
          }}
          canJumpTo={canJumpTo}
          isEditMode={returnToReview && currentStep < total - 1}
          onSaveFromEdit={() => {
            // Validate current step before returning
            if (isStepValid) {
              setReturnToReview(false);
              jumpTo(total - 1);
            }
          }}
        />

        {showGenericBanner && (
          <Alert kind="error" title="Please fix the errors above">
            Some fields are missing or invalid. Correct them to continue.
          </Alert>
        )}

        <WizardNav
          currentStep={currentStep}
          totalSteps={total}
          onBack={back}
          onNext={next}
          onSubmit={onSubmit}
          isFinal={currentStep === total - 1}
          canProceed={isStepValid}
          submitting={submitting}
          isEditMode={returnToReview && currentStep < total - 1}
          onSaveFromEdit={() => {
            if (isStepValid) {
              setReturnToReview(false);
              jumpTo(total - 1);
            }
          }}
        />
      </div>
    </Card>
  );
}
