import type {
  ItrApplicationItem,
  ItrServiceCard,
  ItrStatCard,
  TdsEstimatorValues,
} from '../types/itr.types'

export const DEFAULT_ITR_STATS: ItrStatCard[] = []

export const ITR_SERVICES_LIST: ItrServiceCard[] = []

export const INITIAL_APPLICATIONS: ItrApplicationItem[] = []

export const calculateTdsRefund = (totalTds: number): TdsEstimatorValues => {
  const safeTds = Number.isFinite(totalTds) && totalTds > 0 ? totalTds : 0
  const refundFactor = 0.5
  const feeRate = 0.15

  const estimatedRefund = Math.round(safeTds * refundFactor)
  const taxEdgeFee = Math.round(estimatedRefund * feeRate)

  return {
    totalTdsDeducted: safeTds,
    estimatedRefund,
    taxEdgeFee,
  }
}

export const formatIndianCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}
