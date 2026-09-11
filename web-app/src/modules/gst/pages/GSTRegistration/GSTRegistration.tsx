import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { routePaths } from '@core/config'
import { useAppStore, useAuthStore } from '@store/index'
import { userStorage } from '@core/storage/userStorage'
import { DraftConfirmModal } from '@shared/components'

import {
  GSTRegistrationStepper,
  GSTStepBusiness,
  GSTStepDocuments,
  GSTStepReview,
  GSTStepPayment,
  GSTPaymentSuccess,
  GSTSidebar,
  type GstBusinessFormData,
  type PaymentResult,
} from '../../components/registration'
import './GSTRegistration.css'

export const GSTRegistration = () => {
  const navigate = useNavigate()
  const pushToast = useAppStore((state) => state.pushToast)
  const user = useAuthStore((state) => state.user)

  // Check for saved draft on initial load
  const [existingDraft] = useState(() => userStorage.getDraft('gst-registration'))
  const [isDraftModalOpen, setIsDraftModalOpen] = useState<boolean>(false)

  const [currentStep, setCurrentStep] = useState<number>(() => {
    if (existingDraft && existingDraft.currentStep <= 4) {
      return existingDraft.currentStep
    }
    return 1
  })

  const [businessData, setBusinessData] = useState<GstBusinessFormData>(() => {
    if (existingDraft?.formData?.businessData) {
      return existingDraft.formData.businessData as GstBusinessFormData
    }
    const fullAddress = [user?.addressLine1, user?.addressLine2].filter(Boolean).join(', ')
    return {
      legalName: user?.fullName || '',
      tradeName: '',
      constitution: 'Proprietorship',
      natureOfBusiness: '',
      commencementDate: '',
      registrationReason: '',
      compositionScheme: 'No',
      placeOfBusiness: '',
      businessAddress: fullAddress || '',
      city: user?.city || '',
      district: '',
      state: user?.state || '',
      pinCode: user?.pincode || '',
      hsnSacCode: '',

      accountHolderName: user?.fullName || '',
      accountNumber: '',
      confirmAccountNumber: '',
      ifscCode: '',
      bankName: '',
      branch: '',
      accountType: '',

      signatoryName: user?.fullName || '',
      signatoryPan: user?.pan || '',
      dob: '',
      designation: '',
      signatoryMobile: user?.mobile || '',
      signatoryEmail: user?.email || '',

      aadhaarConsent: false,
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

  // Auto-save draft whenever step or critical form data changes (before payment)
  useEffect(() => {
    if (currentStep <= 4) {
      const now = new Date()
      const timeStr = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })
      userStorage.saveDraft({
        serviceId: 'gst-registration',
        serviceTitle: 'GST Registration',
        currentStep,
        totalSteps: 4,
        stepLabel: getStepBreadcrumb(currentStep),
        formData: {
          businessData,
        },
        savedAt: timeStr,
        savedTimestamp: Date.now(),
        resumeRoute: routePaths.gst.registration,
      })
    }
  }, [currentStep, businessData])

  const handleBusinessChange = <K extends keyof GstBusinessFormData>(
    field: K,
    value: GstBusinessFormData[K]
  ) => {
    setBusinessData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCancel = () => {
    if (currentStep <= 4) {
      setIsDraftModalOpen(true)
    } else {
      navigate(routePaths.gst.root)
    }
  }

  const handleSaveAndExit = () => {
    const now = new Date()
    const timeStr = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })
    userStorage.saveDraft({
      serviceId: 'gst-registration',
      serviceTitle: 'GST Registration',
      currentStep,
      totalSteps: 4,
      stepLabel: getStepBreadcrumb(currentStep),
      formData: {
        businessData,
      },
      savedAt: timeStr,
      savedTimestamp: Date.now(),
      resumeRoute: routePaths.gst.registration,
    })
    setIsDraftModalOpen(false)
    pushToast('Application saved as draft', 'success')
    navigate(routePaths.dashboard)
  }

  const handleDiscardAndExit = () => {
    userStorage.deleteDraft('gst-registration')
    setIsDraftModalOpen(false)
    pushToast('Draft discarded', 'info')
    navigate(routePaths.dashboard)
  }

  const handleKeepEditing = () => {
    setIsDraftModalOpen(false)
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

  const handleStep3Proceed = () => {
    setCurrentStep(4)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleStep4Back = () => {
    setCurrentStep(3)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePaymentSuccess = (result: PaymentResult) => {
    setPaymentResult(result)
    setCurrentStep(5)
    pushToast('Payment of ₹5,900 successful', 'success')
    window.scrollTo({ top: 0, behavior: 'smooth' })

    // Clear draft upon successful submission
    userStorage.deleteDraft('gst-registration')

    // Keep and persist user application
    userStorage.saveUserApplication({
      id: `app-gst-${Date.now()}`,
      code: result.applicationRef || `GST-${new Date().getFullYear()}-0001`,
      title: 'GST Registration',
      meta: `${businessData.signatoryName || 'New Registration'} · ${businessData.state || 'India'}`,
      statusLabel: 'Submitted',
      statusTone: 'info',
      progress: 25,
      icon: '📄',
      to: routePaths.gst.root,
    })
  }

  function getStepBreadcrumb(step = currentStep) {
    if (step === 1) return 'Business'
    if (step === 2) return 'Documents'
    if (step === 3) return 'Review'
    if (step === 4) return 'Payment'
    return 'Confirmation'
  }

  return (
    <div className="gst-reg-page">
      {/* Top Header */}
      <div className="gst-reg-top-header">
        <div className="gst-reg-header-titles">
          <h1 className="gst-reg-title">GST Registration</h1>
          <p className="gst-reg-subtitle">Complete your GST registration in a few simple steps</p>
        </div>
      </div>

      {/* Stepper (Steps 1 to 4) */}
      {currentStep <= 4 && (
        <div className="gst-reg-stepper-container">
          <GSTRegistrationStepper
            currentStep={currentStep}
            onStepClick={(step) => setCurrentStep(step)}
          />
        </div>
      )}

      {/* Steps 1 to 4: 2-column layout */}
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
              <GSTStepDocuments
                onBack={handleStep2Back}
                onNext={handleStep2Next}
              />
            )}

            {currentStep === 3 && (
              <GSTStepReview
                businessData={businessData}
                onEdit={() => setCurrentStep(1)}
                onBack={handleStep3Back}
                onProceed={handleStep3Proceed}
              />
            )}

            {currentStep === 4 && (
              <GSTStepPayment
                amount={5900}
                applicationRef="GST-2026-00118"
                serviceTitle="GST Registration"
                onBack={handleStep4Back}
                onSuccess={handlePaymentSuccess}
              />
            )}
          </main>

          <aside className="gst-reg-sidebar">
            <GSTSidebar step={currentStep} />
          </aside>
        </div>
      )}

      {/* Step 5: Payment Successful Confirmation Screen */}
      {currentStep === 5 && (
        <GSTPaymentSuccess
          details={paymentResult}
          onBackToDashboard={() => navigate(routePaths.gst.root)}
        />
      )}

      {/* Save Application Progress Confirmation Modal */}
      <DraftConfirmModal
        isOpen={isDraftModalOpen}
        serviceTitle="GST registration"
        onSaveAndExit={handleSaveAndExit}
        onDiscardAndExit={handleDiscardAndExit}
        onKeepEditing={handleKeepEditing}
      />
    </div>
  )
}

export default GSTRegistration
