import { z } from 'zod'
import { Role } from '@prisma/client'

const email = z.string().trim().toLowerCase().email('Enter a valid email address').max(255)

/**
 * Minimum 12 characters. Length beats composition rules for real-world
 * resistance, so we require length and check nothing else beyond a blocklist.
 */
const password = z
  .string()
  .min(12, 'Password must be at least 12 characters')
  .max(200, 'Password must be at most 200 characters')
  .refine(
    (v) => !['password', '123456789012', 'qwertyuiop12'].includes(v.toLowerCase()),
    'That password is too common',
  )

export const registerSchema = z
  .object({
    email,
    password,
    firstName: z.string().trim().min(1).max(80),
    lastName: z.string().trim().min(1).max(80).optional(),
    phone: z.string().trim().max(32).optional(),
    countryCode: z.string().trim().length(2).toUpperCase().optional(),
    /**
     * Self-registration may only produce a USER, a CUSTOMER or a TESTER.
     * ADMIN and SUB_ADMIN are created by an Admin (§2.2), never by signup.
     */
    intendedRole: z.enum([Role.USER, Role.CUSTOMER, Role.TESTER]).default(Role.USER),
    /** Required when intendedRole is CUSTOMER — creates the organisation. */
    organisationName: z.string().trim().min(2).max(160).optional(),
    acceptedTerms: z.literal(true, {
      errorMap: () => ({ message: 'You must accept the Terms of Use to register' }),
    }),
  })
  .refine((data) => data.intendedRole !== Role.CUSTOMER || !!data.organisationName, {
    message: 'Organisation name is required for a customer account',
    path: ['organisationName'],
  })

export const loginSchema = z.object({
  email,
  password: z.string().min(1, 'Password is required').max(200),
})

export const refreshSchema = z.object({
  /** Optional: the token normally arrives in an httpOnly cookie. */
  refreshToken: z.string().min(1).optional(),
})

export const forgotPasswordSchema = z.object({ email })

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  password,
})

export const verifyEmailSchema = z.object({
  token: z.string().min(1, 'Verification token is required'),
})

export const resendVerificationSchema = z.object({ email })

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: password,
})

export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>
