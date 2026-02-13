/**
 * Contact form validation using Zod.
 * Shared across all 5 theme Contact page components.
 */
import { z } from 'astro/zod'

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .regex(/^\+?[\d\s\-().]+$/, 'Please enter a valid phone number')
    .or(z.literal(''))
    .optional()
    .default(''),
  service: z.string().optional().default(''),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message is too long'),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
export type ContactFieldName = keyof ContactFormData

/**
 * Validate a single form field on blur.
 * Returns error message string or null if valid.
 */
export function validateField(fieldName: ContactFieldName, value: string): string | null {
  const fieldSchema = contactFormSchema.shape[fieldName]
  const result = fieldSchema.safeParse(value)
  if (result.success) return null
  return result.error.issues[0]?.message ?? 'Invalid value'
}

/**
 * Validate the entire form on submit.
 * Returns either parsed data or a map of field → error message.
 */
export function validateForm(
  formData: FormData
): { success: true; data: ContactFormData } | { success: false; errors: Partial<Record<ContactFieldName, string>> } {
  const raw = Object.fromEntries(formData)
  const result = contactFormSchema.safeParse(raw)

  if (result.success) {
    return { success: true, data: result.data }
  }

  const errors: Partial<Record<ContactFieldName, string>> = {}
  for (const issue of result.error.issues) {
    const field = issue.path[0] as ContactFieldName
    if (!errors[field]) {
      errors[field] = issue.message
    }
  }
  return { success: false, errors }
}
