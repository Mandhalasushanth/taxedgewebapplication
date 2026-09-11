import React from 'react'
import './DobDatePickerModal.css'

export interface DobCalendarGridProps {
  viewYear: number
  viewMonth: number
  daysInMonth: number
  firstDayOfWeek: number
  selectedDate: Date | null
  maxDate: Date
  minDate: Date
  onSelectDay: (day: number) => void
}

const DAYS_OF_WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

export const DobCalendarGrid: React.FC<DobCalendarGridProps> = ({
  viewYear,
  viewMonth,
  daysInMonth,
  firstDayOfWeek,
  selectedDate,
  maxDate,
  minDate,
  onSelectDay,
}) => {
  const isDayDisabled = (day: number) => {
    const candidate = new Date(viewYear, viewMonth, day, 23, 59, 59)
    if (candidate > maxDate) return true
    const candidateStart = new Date(viewYear, viewMonth, day, 0, 0, 0)
    if (candidateStart < minDate) return true
    return false
  }

  const isDaySelected = (day: number) => {
    if (!selectedDate) return false
    return (
      selectedDate.getFullYear() === viewYear &&
      selectedDate.getMonth() === viewMonth &&
      selectedDate.getDate() === day
    )
  }

  return (
    <>
      <div className="dob-popover__weekdays-row">
        {DAYS_OF_WEEK.map((d) => (
          <span key={d} className="dob-popover__weekday">
            {d}
          </span>
        ))}
      </div>

      <div className="dob-popover__days-grid">
        {Array.from({ length: firstDayOfWeek }).map((_, index) => (
          <div key={`empty-${index}`} className="dob-popover__day-cell dob-popover__day-cell--empty" />
        ))}

        {Array.from({ length: daysInMonth }).map((_, index) => {
          const dayNum = index + 1
          const isSelected = isDaySelected(dayNum)
          const disabled = isDayDisabled(dayNum)

          return (
            <button
              key={`day-${dayNum}`}
              type="button"
              className={`dob-popover__day-cell ${isSelected ? 'dob-popover__day-cell--selected' : ''} ${disabled ? 'dob-popover__day-cell--disabled' : ''}`}
              onClick={() => onSelectDay(dayNum)}
              disabled={disabled}
            >
              {dayNum}
            </button>
          )
        })}
      </div>
    </>
  )
}
