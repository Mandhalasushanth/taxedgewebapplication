/**
 * Modular Functional Input Validation Utilities
 * Zero loops, strictly pure functions and regex rules.
 */

export interface ValidationResult {
  isValid: boolean
  error?: string
}

export const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
export const AADHAAR_REGEX = /^[0-9]{12}$/
export const ACK_NUMBER_REGEX = /^[0-9]{15}$/
export const NOTICE_NUMBER_REGEX = /^[A-Za-z0-9/_-]{6,35}$/
export const DATE_DMY_REGEX = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/
export const PHONE_IN_REGEX = /^[6-9]\d{9}$/
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const validatePan = (pan: string): ValidationResult => {
  const cleaned = pan.trim().toUpperCase()
  if (!cleaned) {
    return { isValid: false, error: 'PAN is required' }
  }
  if (!PAN_REGEX.test(cleaned)) {
    return { isValid: false, error: 'Enter a valid 10-digit PAN (e.g. ABCDE1234F)' }
  }
  return { isValid: true }
}

export const validateAadhaar = (aadhaar: string): ValidationResult => {
  const cleaned = aadhaar.trim().replace(/\s+/g, '')
  if (!cleaned) {
    return { isValid: false, error: 'Aadhaar number is required' }
  }
  if (!AADHAAR_REGEX.test(cleaned)) {
    return { isValid: false, error: 'Enter a valid 12-digit numeric Aadhaar number' }
  }
  return { isValid: true }
}

export const validateAckNumber = (ack: string): ValidationResult => {
  const cleaned = ack.trim().replace(/\s+/g, '')
  if (!cleaned) {
    return { isValid: false, error: 'Original acknowledgement number is required' }
  }
  if (!ACK_NUMBER_REGEX.test(cleaned)) {
    return { isValid: false, error: 'Enter a valid 15-digit acknowledgement number' }
  }
  return { isValid: true }
}

export const validateNoticeNumber = (notice: string): ValidationResult => {
  const cleaned = notice.trim()
  if (!cleaned) {
    return { isValid: false, error: 'Notice number is required' }
  }
  if (!NOTICE_NUMBER_REGEX.test(cleaned)) {
    return { isValid: false, error: 'Enter a valid notice reference number (e.g. CPC/2526/A3/284419260)' }
  }
  return { isValid: true }
}

export const validateNoticeDate = (dateStr: string): ValidationResult => {
  const cleaned = dateStr.trim()
  if (!cleaned) {
    return { isValid: true } // Optional field
  }
  if (!DATE_DMY_REGEX.test(cleaned)) {
    return { isValid: false, error: 'Enter date in DD-MM-YYYY format' }
  }
  return { isValid: true }
}

export const validateCurrencyAmount = (val: string): ValidationResult => {
  const cleaned = val.trim().replace(/,/g, '').replace(/₹/g, '')
  if (!cleaned) {
    return { isValid: true }
  }
  const num = Number(cleaned)
  if (isNaN(num) || num < 0) {
    return { isValid: false, error: 'Enter a valid positive amount' }
  }
  return { isValid: true }
}

/**
 * Universal functional validator that inspects placeholder & value
 */
export const validateByPlaceholder = (
  value: string,
  placeholder = '',
  required = false,
): ValidationResult => {
  const p = placeholder.toLowerCase()
  const val = value.trim()

  if (required && !val) {
    return { isValid: false, error: 'This field is required' }
  }
  if (!val && !required) {
    return { isValid: true }
  }

  if (p.includes('aadhaar') || p.includes('12-digit')) {
    return validateAadhaar(val)
  }
  if (p.includes('pan') || p.includes('abcde1234f')) {
    return validatePan(val)
  }
  if (p.includes('28441925') || p.includes('acknowledgement') || p.includes('ack')) {
    return validateAckNumber(val)
  }
  if (p.includes('cpc/') || p.includes('notice')) {
    return validateNoticeNumber(val)
  }
  if (p.includes('dd-mm-yyyy')) {
    return validateNoticeDate(val)
  }
  if (p.includes('amount') || p.includes('₹') || p.includes('salary') || p.includes('interest')) {
    return validateCurrencyAmount(val)
  }
  if (p.includes('email') || p.includes('@')) {
    return EMAIL_REGEX.test(val)
      ? { isValid: true }
      : { isValid: false, error: 'Enter a valid email address' }
  }
  if (p.includes('mobile') || p.includes('phone')) {
    return PHONE_IN_REGEX.test(val)
      ? { isValid: true }
      : { isValid: false, error: 'Enter a valid 10-digit mobile number' }
  }

  return { isValid: true }
}
