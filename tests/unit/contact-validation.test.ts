import { describe, it, expect } from 'vitest'
import { validateField, validateForm } from '@lib/contact-validation'

describe('validateField', () => {
  describe('name', () => {
    it('returns null for valid name', () => {
      expect(validateField('name', 'John Doe')).toBeNull()
    })

    it('returns error for name shorter than 2 characters', () => {
      expect(validateField('name', 'J')).toBeTruthy()
    })

    it('returns error for empty name', () => {
      expect(validateField('name', '')).toBeTruthy()
    })

    it('returns error for name exceeding 100 characters', () => {
      expect(validateField('name', 'A'.repeat(101))).toBeTruthy()
    })
  })

  describe('email', () => {
    it('returns null for valid email', () => {
      expect(validateField('email', 'test@example.com')).toBeNull()
    })

    it('returns error for invalid email', () => {
      expect(validateField('email', 'not-an-email')).toBeTruthy()
    })

    it('returns error for empty email', () => {
      expect(validateField('email', '')).toBeTruthy()
    })
  })

  describe('phone', () => {
    it('returns null for valid phone numbers', () => {
      expect(validateField('phone', '(555) 123-4567')).toBeNull()
      expect(validateField('phone', '+1 555 123 4567')).toBeNull()
      expect(validateField('phone', '555-123-4567')).toBeNull()
    })

    it('returns null for empty phone (optional field)', () => {
      expect(validateField('phone', '')).toBeNull()
    })

    it('returns error for invalid phone format', () => {
      expect(validateField('phone', 'abc-def-ghij')).toBeTruthy()
    })
  })

  describe('message', () => {
    it('returns null for valid message', () => {
      expect(validateField('message', 'This is a valid message with more than 10 chars.')).toBeNull()
    })

    it('returns error for message shorter than 10 characters', () => {
      expect(validateField('message', 'Short')).toBeTruthy()
    })

    it('returns error for empty message', () => {
      expect(validateField('message', '')).toBeTruthy()
    })

    it('returns error for message exceeding 2000 characters', () => {
      expect(validateField('message', 'A'.repeat(2001))).toBeTruthy()
    })
  })
})

describe('validateForm', () => {
  const validForm = (): FormData => {
    const fd = new FormData()
    fd.set('name', 'Jane Smith')
    fd.set('email', 'jane@example.com')
    fd.set('phone', '555-123-4567')
    fd.set('service', 'residential-cleaning')
    fd.set('message', 'I need a deep cleaning for my home please.')
    return fd
  }

  it('returns success for valid form data', () => {
    const result = validateForm(validForm())
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.name).toBe('Jane Smith')
      expect(result.data.email).toBe('jane@example.com')
    }
  })

  it('returns errors for missing required fields', () => {
    const fd = new FormData()
    fd.set('name', '')
    fd.set('email', '')
    fd.set('message', '')
    const result = validateForm(fd)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.errors.name).toBeTruthy()
      expect(result.errors.email).toBeTruthy()
      expect(result.errors.message).toBeTruthy()
    }
  })

  it('returns only first error per field', () => {
    const fd = new FormData()
    fd.set('name', '')
    fd.set('email', 'bad')
    fd.set('message', '')
    const result = validateForm(fd)
    expect(result.success).toBe(false)
    if (!result.success) {
      // Each field should have at most one error message
      expect(typeof result.errors.name).toBe('string')
      expect(typeof result.errors.email).toBe('string')
    }
  })

  it('allows optional phone and service fields to be empty', () => {
    const fd = new FormData()
    fd.set('name', 'Test User')
    fd.set('email', 'test@test.com')
    fd.set('phone', '')
    fd.set('service', '')
    fd.set('message', 'This is my message for testing purposes.')
    const result = validateForm(fd)
    expect(result.success).toBe(true)
  })
})
