import { apiClient, apiEndpoints } from '@core/api'

import type {
  LoginPayload,
  LoginResponse,
  SendOtpPayload,
  VerifyOtpPayload,
} from '../types/auth.types'

/** Thin transport layer: one function per endpoint, no business rules. */
export const authApi = {
  login: (payload: LoginPayload) => apiClient.post<LoginResponse>(apiEndpoints.auth.login, payload),
  sendOtp: (payload: SendOtpPayload) => apiClient.post<{ sent: boolean }>(apiEndpoints.auth.sendOtp, payload),
  verifyOtp: (payload: VerifyOtpPayload) => apiClient.post<LoginResponse>(apiEndpoints.auth.verifyOtp, payload),
  logout: () => apiClient.post<void>(apiEndpoints.auth.logout),
}
