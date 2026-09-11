import React from 'react'
import type { FlowStepItem, FlowStepperProps, FlowStepStatus } from './FlowStepper.types'
import './FlowStepper.css'

const CheckSvgIcon: React.FC = () => (
  <svg
    className="flow-step-check-icon"
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const resolveStepStatus = (
  stepNumber: number,
  currentStep: number,
  completedUntilStep?: number,
): FlowStepStatus => {
  if (stepNumber === currentStep) {
    return 'active'
  }
  const effectiveCompletedMax =
    typeof completedUntilStep === 'number' ? completedUntilStep : currentStep - 1

  if (stepNumber <= effectiveCompletedMax) {
    return 'completed'
  }
  return 'upcoming'
}

export const FlowStepper: React.FC<FlowStepperProps> = ({
  steps,
  currentStep,
  onStepClick,
  completedUntilStep,
  className = '',
  ariaLabel = 'Progress steps',
}) => {
  const handleStepClick = (step: FlowStepItem) => {
    if (step.disabled) return
    if (onStepClick) {
      onStepClick(step.stepNumber)
    }
  }

  return (
    <nav
      className={`flow-stepper-container ${className}`.trim()}
      aria-label={ariaLabel}
    >
      <ol className="flow-stepper-track">
        {steps.map((step, index) => {
          const status = resolveStepStatus(step.stepNumber, currentStep, completedUntilStep)
          const displayLabel = step.shortLabel || step.title || `Step ${step.stepNumber}`
          const isInteractive = Boolean(onStepClick && !step.disabled)

          const isPreviousCompleted =
            index > 0 &&
            resolveStepStatus(
              steps[index - 1].stepNumber,
              currentStep,
              completedUntilStep,
            ) === 'completed'

          const isCurrentActive = status === 'active'

          const connectorClass =
            status === 'completed'
              ? 'flow-step-connector--completed'
              : isCurrentActive && isPreviousCompleted
                ? 'flow-step-connector--active'
                : ''

          return (
            <li
              key={step.stepNumber}
              className={`flow-step-node-wrapper flow-step--${status}`}
              aria-current={status === 'active' ? 'step' : undefined}
            >
              <div
                className={`flow-step-connector ${connectorClass}`.trim()}
                aria-hidden="true"
              />

              <button
                type="button"
                className="flow-step-button"
                onClick={() => handleStepClick(step)}
                disabled={!isInteractive}
                aria-label={`${displayLabel} (${status})`}
              >
                <div className="flow-step-circle">
                  {status === 'completed' ? (
                    <CheckSvgIcon />
                  ) : (
                    <span>{step.stepNumber}</span>
                  )}
                </div>

                <span className="flow-step-label">{displayLabel}</span>
              </button>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
