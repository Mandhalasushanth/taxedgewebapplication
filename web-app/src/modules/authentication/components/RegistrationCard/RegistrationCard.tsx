import React from 'react'
import { RegistrationForm } from '../RegistrationForm/RegistrationForm'
import './RegistrationCard.css'

export const RegistrationCard: React.FC = () => {
  return (
    <div className="reg-card">
      <div className="reg-card__accent-line" aria-hidden="true" />

      <header className="reg-card__header">
        <h2 className="reg-card__title">Create Account</h2>
        <p className="reg-card__subtitle">Fill in your details to create your account.</p>
      </header>

      <RegistrationForm />
    </div>
  )
}
