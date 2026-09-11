import { Card, EmptyState } from '@shared/components'
import './Itr.css'

export const Itr = () => {
  return (
    <div className="itr-hub-page">
      <header className="itr-page__header" style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-navy-dark, #0b2b48)', margin: '0 0 0.5rem' }}>
          ITR (Income Tax Return)
        </h1>
        <p style={{ margin: 0, color: '#64748b', fontSize: '0.95rem' }}>
          Income tax return filings, refunds, and notice assistance.
        </p>
      </header>

      <Card title="ITR & TDS Services" subtitle="Returns, refunds and tax computation.">
        <EmptyState
          title="No ITR Data Available"
          description="ITR filing, TDS refund claims, and tax computation services will be available here soon."
        />
      </Card>
    </div>
  )
}

export default Itr
