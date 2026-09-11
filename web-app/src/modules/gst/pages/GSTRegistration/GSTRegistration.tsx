import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { routePaths } from '@core/config'
import { useAppStore, useAuthStore } from '@store/index'
import { userStorage } from '@core/storage/userStorage'

import { GSTOrderSummary } from '../../components'
import {
  GSTRegistrationStepper,
  GSTStepBusiness,
  GSTStepAddressBank,
  GSTStepDocuments,
  GSTStepReview,
  GSTStepPayment,
  GSTPaymentSuccess,
  type BusinessFormData,
  type AddressBankFormData,
  type PaymentResult,
} from '../../components/registration'
import './GSTRegistration.css'

export const GSTRegistration = () => {
  const navigate = useNavigate()
  const pushToast = useAppStore((state) => state.pushToast)
  const user = useAuthStore((state) => state.user)

  const [currentStep, setCurrentStep] = useState<number>(1)
  const [businessData, setBusinessData] = useState<BusinessFormData>(() => ({
    legalName: user?.fullName || '',
    tradeName: '',
    pan: user?.pan || '',
    aadhaar: user?.aadhaar || '',
    mobile: user?.mobile || '',
    email: user?.email || '',
    constitution: '',
    natureOfBusiness: '',
    principalActivity: '',
    turnover: '',
    compositionScheme: '',
  }))

  const [addressBankData, setAddressBankData] = useState<AddressBankFormData>(() => {
    const fullAddress = [user?.addressLine1, user?.addressLine2].filter(Boolean).join(', ')
    return {
      address: fullAddress,
      city: user?.city || '',
      pinCode: user?.pincode || '',
      state: user?.state || '',
      possessionNature: '',
      accountHolderName: user?.fullName || '',
      accountNumber: '',
      ifscCode: '',
      accountType: '',
      additionalPlaces: [],
    }
  })

  const [paymentResult, setPaymentResult] = useState<PaymentResult>(() => ({
    transactionId: `TXN${Date.now()}`,
    receiptNumber: `TE/${new Date().getFullYear()}/R-${Math.floor(Math.random() * 9000 + 1000)}`,
    method: 'UPI',
    dateText: new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(new Date()),
    applicationRef: `GST-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 90000 + 10000))}`,
    amount: 5900,
  }))

  const handleBusinessChange = (field: keyof BusinessFormData, value: string) => {
    setBusinessData((prev) => ({ ...prev, [field]: value }))
  }

  const handleAddressBankChange = (
    field: keyof AddressBankFormData,
    value: string | string[]
  ) => {
    setAddressBankData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCancel = () => {
    navigate(routePaths.gst.root)
  }

  const handleStep1Next = () => {
    setCurrentStep(2)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleStep2Back = () => {
    setCurrentStep(1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleStep2Next = () => {
    setCurrentStep(3)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleStep3Back = () => {
    setCurrentStep(2)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleStep3Next = () => {
    setCurrentStep(4)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleStep4Back = () => {
    setCurrentStep(3)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleStep4Proceed = () => {
    setCurrentStep(5)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleStep5Back = () => {
    setCurrentStep(4)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePaymentSuccess = (result: PaymentResult) => {
    setPaymentResult(result)
    setCurrentStep(6)
    pushToast('Payment of ₹5,900 successful', 'success')
    window.scrollTo({ top: 0, behavior: 'smooth' })

    // Keep and persist user application
    userStorage.saveUserApplication({
      id: `app-gst-${Date.now()}`,
      code: result.applicationRef || `GST-${new Date().getFullYear()}-0001`,
      title: 'GST Registration',
      meta: `${businessData.tradeName || businessData.legalName || 'New Registration'} · ${addressBankData.state || 'India'}`,
      statusLabel: 'Submitted',
      statusTone: 'info',
      progress: 25,
      icon: '📄',
      to: routePaths.gst.root,
    })
  }

  const getStepBreadcrumb = () => {
    if (currentStep === 1) return 'Business details'
    if (currentStep === 2) return 'Address & bank'
    if (currentStep === 3) return 'Upload'
    if (currentStep === 4) return 'Review'
    if (currentStep === 5) return 'Payment'
    return 'Confirmation'
  }

  return (
    <div className="gst-reg-page">
      {/* Top Breadcrumbs */}
      <nav className="gst-reg-breadcrumb" aria-label="Breadcrumb">
        <span
          className="gst-reg-breadcrumb__item gst-reg-breadcrumb__item--link"
          onClick={() => navigate(routePaths.gst.root)}
        >
          GST
        </span>
        <span className="gst-reg-breadcrumb__separator">→</span>
        <span className="gst-reg-breadcrumb__item">Registration</span>
        <span className="gst-reg-breadcrumb__separator">→</span>
        <span className="gst-reg-breadcrumb__item gst-reg-breadcrumb__item--active">
          {getStepBreadcrumb()}
        </span>
      </nav>

      {/* Stepper (Steps 1 to 5) */}
      {currentStep <= 5 && (
        <div className="gst-reg-stepper-container">
          <GSTRegistrationStepper
            currentStep={currentStep}
            onStepClick={(step) => setCurrentStep(step)}
          />
        </div>
      )}

      {/* Steps 1 to 4: Standard 2-column layout */}
      {currentStep <= 4 && (
        <div className="gst-reg-content-grid">
          <main className="gst-reg-main-content">
            {currentStep === 1 && (
              <GSTStepBusiness
                data={businessData}
                onChange={handleBusinessChange}
                onNext={handleStep1Next}
                onCancel={handleCancel}
              />
            )}

            {currentStep === 2 && (
              <GSTStepAddressBank
                data={addressBankData}
                onChange={handleAddressBankChange}
                onNext={handleStep2Next}
                onBack={handleStep2Back}
              />
            )}

            {currentStep === 3 && (
              <GSTStepDocuments
                onBack={handleStep3Back}
                onNext={handleStep3Next}
              />
            )}

            {currentStep === 4 && (
              <GSTStepReview
                businessData={businessData}
                addressBankData={addressBankData}
                onEdit={() => setCurrentStep(1)}
                onBack={handleStep4Back}
                onProceed={handleStep4Proceed}
              />
            )}
          </main>

          <aside className="gst-reg-sidebar">
            <GSTOrderSummary step={currentStep} />
          </aside>
        </div>
      )}

      {/* Step 5: Complete Your Payment */}
      {currentStep === 5 && (
        <GSTStepPayment
          amount={5900}
          applicationRef="GST-2026-00118"
          serviceTitle="GST Registration"
          onBack={handleStep5Back}
          onSuccess={handlePaymentSuccess}
        />
      )}

      {/* Step 6: Payment Successful Confirmation Screen */}
      {currentStep === 6 && (
        <GSTPaymentSuccess
          details={paymentResult}
          onBackToDashboard={() => navigate(routePaths.gst.root)}
        />
      )}
    </div>
  )
}

export default GSTRegistration
