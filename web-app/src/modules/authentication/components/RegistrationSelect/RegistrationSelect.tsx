import React, { useState, useRef, useEffect, useCallback } from 'react'
import { ChevronDownIcon } from '../RegistrationIcons/RegistrationIcons'
import './RegistrationSelect.css'

export interface RegistrationSelectProps {
  id: string
  name: string
  value: string
  placeholder: string
  options: readonly string[]
  icon?: React.ReactNode
  hasError?: boolean
  align?: 'left' | 'right'
  searchable?: boolean
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export const RegistrationSelect: React.FC<RegistrationSelectProps> = ({
  id,
  name,
  value,
  placeholder,
  options,
  icon,
  hasError = false,
  align = 'left',
  searchable = false,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const handleClose = useCallback(() => {
    setIsOpen(false)
    setSearchQuery('')
  }, [])

  useEffect(() => {
    if (!isOpen) return

    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        handleClose()
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose()
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('touchstart', handleOutsideClick)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('touchstart', handleOutsideClick)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleClose])

  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isOpen, searchable])

  const handleSelect = (selectedValue: string) => {
    const syntheticEvent = {
      target: { name, value: selectedValue },
    } as unknown as React.ChangeEvent<HTMLSelectElement>

    onChange(syntheticEvent)
    handleClose()
  }

  const filteredOptions = searchable && searchQuery.trim()
    ? options.filter((item) => item.toLowerCase().includes(searchQuery.toLowerCase()))
    : options

  return (
    <div className="reg-select" ref={containerRef}>
      {/* Hidden input for DOM/form compliance */}
      <input type="hidden" id={id} name={name} value={value} />

      {/* Trigger Button */}
      <button
        type="button"
        className={`reg-select__trigger ${isOpen ? 'reg-select__trigger--open' : ''} ${
          hasError ? 'reg-select__trigger--error' : ''
        }`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {icon && <span className="reg-select__icon">{icon}</span>}
        <span className={`reg-select__value ${!value ? 'reg-select__value--placeholder' : ''}`}>
          {value || placeholder}
        </span>
        <span className={`reg-select__chevron ${isOpen ? 'reg-select__chevron--open' : ''}`}>
          <ChevronDownIcon size={15} />
        </span>
      </button>

      {/* Dropdown Menu (Strictly positioned to open downward) */}
      {isOpen && (
        <div className={`reg-select__menu reg-select__menu--${align}`} role="listbox">
          {searchable && (
            <div className="reg-select__search-wrapper">
              <input
                ref={searchInputRef}
                type="text"
                className="reg-select__search-input"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}

          <ul className="reg-select__list">
            {filteredOptions.length === 0 ? (
              <li className="reg-select__empty">No options found</li>
            ) : (
              filteredOptions.map((item) => (
                <li
                  key={item}
                  className={`reg-select__item ${item === value ? 'reg-select__item--selected' : ''}`}
                  onClick={() => handleSelect(item)}
                  role="option"
                  aria-selected={item === value}
                >
                  <span>{item}</span>
                  {item === value && (
                    <svg className="reg-select__check" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <polyline points="20 6 9 17 4 12" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
