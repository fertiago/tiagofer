import React from 'react';

const ProgressBar = ({ currentStepId }) => {
  const steps = [
    { id: 'contact-name', label: 'Name' },
    { id: 'contact-email', label: 'Email' },
    { id: 'contact-message', label: 'Message' },
    { id: 'contact-submit', label: 'Submit' }
  ];

  return (
    <section id="contact-progress" className="py-4">
      <center>
        <ul className="steps">
          {steps.map((step) => (
            <li 
              key={step.id} 
              id={step.id} 
              className={`step ${currentStepId === step.id || steps.findIndex(s => s.id === currentStepId) >= steps.findIndex(s => s.id === step.id) ? 'step-primary' : ''}`}
            >
              {step.label}
            </li>
          ))}
        </ul>
      </center>
    </section>
  );
};

export default ProgressBar;
