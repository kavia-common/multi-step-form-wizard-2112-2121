import React from 'react';
import './App.css';
import { useWizard } from './hooks/useWizard';
import WizardContainer from './components/Wizard/WizardContainer';
import StepPersonal from './components/Steps/StepPersonal';
import StepContact from './components/Steps/StepContact';
import StepAdditionalInfo from './components/Steps/StepAdditionalInfo';
import StepReview from './components/Steps/StepReview';

// PUBLIC_INTERFACE
function App() {
  /** App entry: renders centered wizard UI over subtle gradient background. */
  const steps = [
    { title: 'Personal Details', description: 'Tell us about yourself', component: StepPersonal },
    { title: 'Contact Information', description: 'How can we reach you?', component: StepContact },
    { title: 'Additional Info', description: 'Provide any extra details (placeholder)', component: StepAdditionalInfo },
    { title: 'Review', description: 'Confirm your information before submitting', component: StepReview },
  ];

  const hook = useWizard(steps);

  return (
    <div className="min-h-screen bg-ocean-gradient from-blue-500/10 to-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-8 md:py-12">
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-text">Ocean Wizard</h1>
          <p className="text-gray-600 mt-2">A clean multi-step form built with Tailwind</p>
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
