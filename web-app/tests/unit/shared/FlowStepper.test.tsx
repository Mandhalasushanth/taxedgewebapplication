import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { FlowStepper } from '../../../src/shared/components/FlowStepper'

describe('FlowStepper component', () => {
  const mockSteps = [
    { stepNumber: 1, title: 'What describes your income?', shortLabel: 'Income' },
    { stepNumber: 2, title: 'Details about income', shortLabel: 'Details' },
    { stepNumber: 3, title: 'Deductions', shortLabel: 'Deductions' },
    { stepNumber: 4, title: 'Documents checklist', shortLabel: 'Documents' },
  ]

  it('renders all step labels dynamically', () => {
    render(<FlowStepper steps={mockSteps} currentStep={2} />)
    expect(screen.getByText('Income')).toBeInTheDocument()
    expect(screen.getByText('Details')).toBeInTheDocument()
    expect(screen.getByText('Deductions')).toBeInTheDocument()
    expect(screen.getByText('Documents')).toBeInTheDocument()
  })

  it('sets the active step correctly with aria-current', () => {
    render(<FlowStepper steps={mockSteps} currentStep={2} />)
    const activeItem = screen.getByText('Details').closest('li')
    expect(activeItem).toHaveAttribute('aria-current', 'step')
    expect(activeItem?.className).toContain('flow-step--active')
  })

  it('renders completed steps with check icon', () => {
    render(<FlowStepper steps={mockSteps} currentStep={3} />)
    const completedItem = screen.getByText('Income').closest('li')
    expect(completedItem?.className).toContain('flow-step--completed')
  })

  it('calls onStepClick when a step is clicked', () => {
    const handleStepClick = vi.fn()
    render(<FlowStepper steps={mockSteps} currentStep={1} onStepClick={handleStepClick} />)
    fireEvent.click(screen.getByText('Details'))
    expect(handleStepClick).toHaveBeenCalledWith(2)
  })
})
