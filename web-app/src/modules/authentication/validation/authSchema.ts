import { z } from 'zod'

import { REGEX } from '@shared/constants'

export const mobileField = z
  .string()
  .trim()
  .regex(REGEX.mobile, 'Enter a valid 10-digit Indian mobile number')

export const loginSchema = z.object({
  mobile: mobileField,
  password: z.string().min(1, 'Password is required'),
})

export type LoginInput = z.infer<typeof loginSchema>
