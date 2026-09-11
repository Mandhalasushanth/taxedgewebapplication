import { describe, it, expect } from 'vitest'
import {
  validatePan,
  validateAadhaar,
  validateAckNumber,
  validateNoticeNumber,
  validateNoticeDate,
  validateByPlaceholder,
} from '../../../src/shared/utils/inputValidation'

describe('Functional Input Validation', () => {
  it('validates PAN numbers correctly', () => {
    expect(validatePan('AXTPD4419K').isValid).toBe(true)
    expect(validatePan('invalidpan').isValid).toBe(false)
  })

  it('validates Notice numbers correctly', () => {
    expect(validateNoticeNumber('CPC/2526/A3/284419260').isValid).toBe(true)
    expect(validateNoticeNumber('bad').isValid).toBe(false)
  })

  it('validates Aadhaar numbers correctly', () => {
    expect(validateAadhaar('123456789012').isValid).toBe(true)
    expect(validateAadhaar('12345').isValid).toBe(false)
  })

  it('validates Acknowledgement numbers correctly', () => {
    expect(validateAckNumber('284419250714208').isValid).toBe(true)
    expect(validateAckNumber('1234').isValid).toBe(false)
  })

  it('validates Notice dates correctly', () => {
    expect(validateNoticeDate('14-07-2025').isValid).toBe(true)
    expect(validateNoticeDate('2025-07-14').isValid).toBe(false)
  })

  it('validates automatically according to placeholder string', () => {
    expect(validateByPlaceholder('ABCDE1234F', 'e.g. ABCDE1234F').isValid).toBe(true)
    expect(validateByPlaceholder('bad', 'e.g. ABCDE1234F').isValid).toBe(false)
    expect(validateByPlaceholder('123456789012', '12-digit Aadhaar number').isValid).toBe(true)
    expect(validateByPlaceholder('123', '12-digit Aadhaar number').isValid).toBe(false)
  })
})
