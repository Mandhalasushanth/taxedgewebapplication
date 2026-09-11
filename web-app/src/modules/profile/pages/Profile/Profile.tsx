import { Badge, Card } from '@shared/components'
import { useAuthStore } from '@store/index'
import { authStorage } from '@core/auth'
import './Profile.css'

export const Profile = () => {
  const storeUser = useAuthStore((state) => state.user)
  const user = storeUser || authStorage.getUser()

  return (
    <div className="profile-page">
      <header className="profile-page__header">
        <h1 className="profile-page__title">Profile &amp; Account</h1>
        <p className="profile-page__subtitle">Your verified personal details, tax identifiers, and address.</p>
      </header>

      {/* Account Status Card */}
      <Card title="Account Overview" subtitle="Status of your TaxEdge registration">
        <div className="profile-page__grid">
          <div className="profile-page__item">
            <span className="profile-page__label">Account Status</span>
            <div style={{ marginTop: '4px' }}>
              <Badge tone="success">Active</Badge>
            </div>
          </div>
          <div className="profile-page__item">
            <span className="profile-page__label">Customer Type</span>
            <p className="profile-page__value" style={{ textTransform: 'capitalize' }}>
              {user?.customerType || 'Individual'}
            </p>
          </div>
          <div className="profile-page__item">
            <span className="profile-page__label">User Role</span>
            <p className="profile-page__value">{user?.role || 'CUSTOMER'}</p>
          </div>
        </div>
      </Card>

      {/* Personal Information */}
      <Card title="Personal Information" subtitle="Full name, contacts, and personal records">
        <div className="profile-page__grid">
          <div className="profile-page__item">
            <span className="profile-page__label">Full Name</span>
            <p className="profile-page__value">{user?.fullName || '—'}</p>
          </div>
          <div className="profile-page__item">
            <span className="profile-page__label">Email Address</span>
            <p className="profile-page__value">{user?.email || '—'}</p>
          </div>
          <div className="profile-page__item">
            <span className="profile-page__label">Mobile Number</span>
            <p className="profile-page__value">{user?.mobile ? `+91 ${user.mobile}` : '—'}</p>
          </div>
          <div className="profile-page__item">
            <span className="profile-page__label">Date of Birth</span>
            <p className="profile-page__value">{user?.dob || '—'}</p>
          </div>
          <div className="profile-page__item">
            <span className="profile-page__label">Gender</span>
            <p className="profile-page__value">{user?.gender || '—'}</p>
          </div>
          <div className="profile-page__item">
            <span className="profile-page__label">Father / Spouse Name</span>
            <p className="profile-page__value">{user?.fatherSpouseName || '—'}</p>
          </div>
        </div>
      </Card>

      {/* Identity & Tax Numbers */}
      <Card title="Identity &amp; Tax Documents" subtitle="Government identification recorded during signup">
        <div className="profile-page__grid">
          <div className="profile-page__item">
            <span className="profile-page__label">PAN Card Number</span>
            <p className="profile-page__value" style={{ fontFamily: 'monospace', letterSpacing: '0.05em' }}>
              {user?.pan || '—'}
            </p>
          </div>
          <div className="profile-page__item">
            <span className="profile-page__label">Aadhaar Number</span>
            <p className="profile-page__value" style={{ fontFamily: 'monospace', letterSpacing: '0.05em' }}>
              {user?.aadhaar
                ? user.aadhaar.length === 12
                  ? `XXXX-XXXX-${user.aadhaar.slice(8)}`
                  : user.aadhaar
                : '—'}
            </p>
          </div>
        </div>
      </Card>

      {/* Address */}
      <Card title="Registered Address" subtitle="Primary communication address on file">
        <div className="profile-page__grid">
          <div className="profile-page__item" style={{ gridColumn: '1 / -1' }}>
            <span className="profile-page__label">Street Address</span>
            <p className="profile-page__value">
              {[user?.addressLine1, user?.addressLine2].filter(Boolean).join(', ') || '—'}
            </p>
          </div>
          <div className="profile-page__item">
            <span className="profile-page__label">City</span>
            <p className="profile-page__value">{user?.city || '—'}</p>
          </div>
          <div className="profile-page__item">
            <span className="profile-page__label">State / UT</span>
            <p className="profile-page__value">{user?.state || '—'}</p>
          </div>
          <div className="profile-page__item">
            <span className="profile-page__label">PIN Code</span>
            <p className="profile-page__value">{user?.pincode || '—'}</p>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Profile
