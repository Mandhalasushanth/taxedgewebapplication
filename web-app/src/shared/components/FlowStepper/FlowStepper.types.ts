export type FlowStepStatus = 'completed' | 'active' | 'upcoming'

export interface FlowStepItem {
  stepNumber: number
  title?: string
  shortLabel?: string
  description?: string
  disabled?: boolean
}

export interface FlowStepperProps {
  steps: FlowStepItem[]
  currentStep: number
  onStepClick?: (stepNumber: number) => void
  completedUntilStep?: number
  className?: string
  ariaLabel?: string
}
