import React from 'react'
import { GoogleIcon } from '../RegistrationIcons/RegistrationIcons'
import './MobileEntryView.css'

export interface MobileEntryViewProps {
  mobile: string
  onMobileChange: (val: string) => void
  selectedCountryCode: string
  onToggleCountry: () => void
  onSubmit: (e: React.FormEvent) => void
  isSubmitting: boolean
  error: string | null
  onGoogleLogin?: () => void
}

export const MobileEntryView: React.FC<MobileEntryViewProps> = ({
  mobile,
  onMobileChange,
  selectedCountryCode,
  onToggleCountry,
  onSubmit,
  isSubmitting,
  error,
  onGoogleLogin,
}) => {
  return (
    <form className="mobile-entry-form" onSubmit={onSubmit} noValidate>
      {/* Top Section: Mobile Number Input */}
      <div className="mobile-entry-form__top-section">
        <div className="mobile-entry-form__field">
          <label htmlFor="auth-mobile-input" className="mobile-entry-form__label">
            Mobile Number
          </label>
          <div className="mobile-entry-form__input-row">
            <button
              type="button"
              className="mobile-entry-form__country-box"
              title={`Country: ${selectedCountryCode}. Click to switch.`}
              onClick={onToggleCountry}
            >
              <span>{selectedCountryCode}</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            <div className="mobile-entry-form__input-box">
              <input
                id="auth-mobile-input"
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                className={`mobile-entry-form__input ${error ? 'mobile-entry-form__input--error' : ''}`}
                placeholder="Enter your mobile number"
                value={mobile}
                onChange={(e) => onMobileChange(e.target.value)}
                maxLength={10}
                autoComplete="tel-national"
              />
            </div>
          </div>

          {error && <span className="mobile-entry-form__error-msg">{error}</span>}
        </div>
      </div>

      {/* Bottom Actions: Continue Button, Divider, Google Button */}
      <div className="mobile-entry-form__bottom-actions">
        <button
          type="submit"
          className="mobile-entry-form__btn-primary"
          disabled={isSubmitting}
        >
          <span>{isSubmitting ? 'Continuing...' : 'Continue'}</span>
        </button>

        <div className="mobile-entry-form__divider">
          <span className="mobile-entry-form__divider-line" />
          <span className="mobile-entry-form__divider-text">or</span>
          <span className="mobile-entry-form__divider-line" />
        </div>

        <button
          type="button"
          className="mobile-entry-form__google-btn"
          onClick={onGoogleLogin}
        >
          <GoogleIcon size={18} />
          <span>Continue with Google</span>
        </button>
      </div>
    </form>
  )
}

export default MobileEntryView
