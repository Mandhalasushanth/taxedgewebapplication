import { AuthIdentityHeroPanel, RegistrationCard } from '@modules/authentication/components'
import './CreateProfilePage.css'

export const CreateProfilePage = () => {
  return (
    <div className="create-profile-page">
      {/* Left 45% Stage: Branded Identity Hero Panel */}
      <aside className="create-profile-page__left-panel">
        <AuthIdentityHeroPanel />
      </aside>

      {/* Right 55% Stage: Target Registration Card Form */}
      <main className="create-profile-page__right-section">
        <div className="create-profile-page__card-container">
          <RegistrationCard />
        </div>
      </main>
    </div>
  )
}

export default CreateProfilePage
