import React from 'react';
import './App.css';
import { useWizard } from './hooks/useWizard';
import WizardContainer from './components/Wizard/WizardContainer';
import StepAccount from './components/Steps/StepAccount';
import StepPersonalInfo from './components/Steps/StepPersonalInfo';
import StepImageUpload from './components/Steps/StepImageUpload';
import StepReview from './components/Steps/StepReview';

// PUBLIC_INTERFACE
function App() {
  /** App entry: renders centered wizard UI over subtle gradient background. */
  const steps = [
    { title: 'Account Information', description: 'Create your account credentials', component: StepAccount },
    { title: 'Personal Information', description: 'Tell us a bit about you', component: StepPersonalInfo },
    { title: 'Profile Image', description: 'Upload a profile image (optional)', component: StepImageUpload },
    { title: 'Review & Confirm', description: 'Confirm your details before submitting', component: StepReview },
  ];

  const hook = useWizard(steps);

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-5xl px-4 py-10 md:py-14">
        <div className="text-center mb-6 md:mb-8">
          <h1 className="tracking-tight">Create your account</h1>
          <p className="mt-2 text-sm md:text-base text-[color:var(--text-muted)]">
            Follow the steps to set up your profile
          </p>
        </div>
        <WizardContainer steps={steps} hook={hook} />
        <footer className="text-center text-xs text-gray-500 mt-6">
          © {new Date().getFullYear()} Ocean Professional Theme
        </footer>
      </div>
    </div>
  );
}

export default App;
