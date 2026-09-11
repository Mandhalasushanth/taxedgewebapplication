import React from 'react'
import './AuthIdentityHeroPanel.css'

export const AuthIdentityHeroPanel: React.FC = () => {
  return (
    <div className="identity-hero">
      {/* Background Skyscraper Silhouette & Lit Typography */}
      <div className="identity-hero__bg-building" aria-hidden="true">
        <div className="identity-hero__bg-text">
          <span>PEOPLE</span>
          <br />
          <span>PROCESS</span>
          <br />
          <span>TECHNOLOGY</span>
          <br />
          <span>A BRIGHTER</span>
          <br />
          <span>TOMORROW</span>
        </div>
      </div>

      {/* 1. Top Header Bar with Real TaxEdge Logo */}
      <div className="identity-hero__top-bar">
        <div className="identity-hero__brand">
          <div className="identity-hero__logo-box">
            <img src="/icon.png" alt="TaxEdge" className="identity-hero__logo-img" />
          </div>
          <div className="identity-hero__brand-info">
            <span className="identity-hero__brand-name">
              Tax<span className="identity-hero__brand-accent">Edge</span>
            </span>
            <span className="identity-hero__brand-sub">FIN SOLUTIONS</span>
          </div>
        </div>
      </div>

      {/* 2. Tagline & Main Headline */}
      <div className="identity-hero__intro">
        <div className="identity-hero__tagline-row">
          <div className="identity-hero__accent-bar" aria-hidden="true" />
          <span className="identity-hero__tagline-text">SIMPLE • SECURE • COMPLIANT</span>
        </div>

        <h1 className="identity-hero__headline">
          Your Identity
          <span className="identity-hero__headline-orange">Our Expertise</span>
        </h1>
      </div>

      {/* 3. Center Visual: Seamless 3D Pedestal Stage with Floating Badges */}
      <div className="identity-hero__visual-stage">
        <div className="identity-hero__pedestal-glow" aria-hidden="true" />

        <div className="identity-hero__pedestal-wrapper">
          <img
            src="/assets/images/pan-aadhaar-pedestal.jpg"
            alt="TaxEdge PAN and Aadhaar Secure Verification Pedestal"
            className="identity-hero__pedestal-img"
          />

          {/* Left Floating Badge: Auto-fill Your Returns */}
          <div className="identity-hero__badge identity-hero__badge--left">
            <span className="identity-hero__badge-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </span>
            <div>
              <span>Auto-fill</span>
              <br />
              <span>Your Returns</span>
            </div>
          </div>

          {/* Right Top Floating Badge: Access AIS & TIS Data */}
          <div className="identity-hero__badge identity-hero__badge--right-top">
            <span className="identity-hero__badge-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
              </svg>
            </span>
            <div>
              <span>Access AIS</span>
              <br />
              <span>& TIS Data</span>
            </div>
          </div>

          {/* Right Bottom Floating Badge: Secure & Private */}
          <div className="identity-hero__badge identity-hero__badge--right-bottom">
            <span className="identity-hero__badge-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
            </span>
            <div>
              <span>Secure</span>
              <br />
              <span>& Private</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Three Feature Trust Cards */}
      <div className="identity-hero__features-row">
        <div className="identity-hero__feature-card">
          <div className="identity-hero__feature-icon-circle">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <ellipse cx="12" cy="5" rx="9" ry="3" />
              <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
            </svg>
          </div>
          <div className="identity-hero__feature-text">
            <span className="identity-hero__feature-title">
              Encrypted Document
              <br />
              Storage
            </span>
            <span className="identity-hero__feature-sub">Your data stays safe</span>
          </div>
        </div>

        <div className="identity-hero__feature-card">
          <div className="identity-hero__feature-icon-circle">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div className="identity-hero__feature-text">
            <span className="identity-hero__feature-title">
              Role-based Staff
              <br />
              Access
            </span>
            <span className="identity-hero__feature-sub">Controlled & secure</span>
          </div>
        </div>

        <div className="identity-hero__feature-card">
          <div className="identity-hero__feature-icon-circle">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </div>
          <div className="identity-hero__feature-text">
            <span className="identity-hero__feature-title">
              Complete Activity
              <br />
              Tracking
            </span>
            <span className="identity-hero__feature-sub">Full transparency</span>
          </div>
        </div>
      </div>

      {/* 5. Bottom Row: Protection Promise & Cursive Motto */}
      <div className="identity-hero__bottom-row">
        <div className="identity-hero__protection">
          <div className="identity-hero__shield-icon">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
          </div>
          <div className="identity-hero__protection-text">
            <span className="identity-hero__protection-title">Your financial information stays protected.</span>
            <span className="identity-hero__protection-sub">Secure. Private. Built for compliance.</span>
          </div>
        </div>

        <div className="identity-hero__cursive-motto">
          <span className="identity-hero__cursive-text">
            Simplifying Taxes for a
            <br />
            Brighter Tomorrow.
          </span>
          <svg className="identity-hero__cursive-swoosh" viewBox="0 0 110 10" fill="none">
            <path d="M2 3C35 9 85 9 108 2" stroke="#FF6A00" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* 6. Smooth Sweeping Orange Corner Wave */}
      <svg className="identity-hero__corner-wave" viewBox="0 0 320 140" fill="none" aria-hidden="true">
        <path d="M0 140V50C60 75 140 110 320 140H0Z" fill="url(#heroOrangeWaveGrad)" />
        <defs>
          <linearGradient id="heroOrangeWaveGrad" x1="0" y1="50" x2="320" y2="140" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF7A1A" />
            <stop offset="1" stopColor="#EA580C" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
