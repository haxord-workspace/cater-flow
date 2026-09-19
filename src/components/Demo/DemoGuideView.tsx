import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Utensils,
  Speaker,
  FileText,
  DollarSign,
  Users,
  Calendar,
  CreditCard
} from 'lucide-react';

export const DemoGuideView: React.FC = () => {
  const {
    setCurrentView,
    navigateToEvent,
    navigateToQuotationPreview,
    navigateToQuotationBuilder,
    navigateToMenuBuilder
  } = useApp();

  const steps = [
    {
      step: 1,
      title: 'Customer & Wedding Event Creation',
      desc: 'Client Rahul Menon books a grand wedding reception for 650 guests at Grand Convention Centre, Kochi.',
      actionText: 'View Event Workspace',
      icon: <Calendar size={18} />,
      onClick: () => navigateToEvent('evt-01')
    },
    {
      step: 2,
      title: 'Design Reusable Food Menu',
      desc: 'Build "Premium Wedding Menu" with Thalassery Biryani, Malabar Parotta, Travancore Roast & Elaneer Payasam at ₹650/person.',
      actionText: 'Open 3-Part Menu Builder',
      icon: <Utensils size={18} />,
      onClick: () => navigateToMenuBuilder('menu-01')
    },
    {
      step: 3,
      title: 'Light & Sound Rentals + Live Counters',
      desc: 'Check available JBL VRX concert line array sound packages, moving head beams, and live Dosa counter setup.',
      actionText: 'Explore AV & Rentals',
      icon: <Speaker size={18} />,
      onClick: () => setCurrentView('light_sound')
    },
    {
      step: 4,
      title: 'Unified Quotation Builder (Core Hero)',
      desc: 'Select food menu → Enter 650 guests (auto computes ₹4,22,500) → Add Dosa Counter (₹12k) → Add Sound Package (₹45k) → Add Moving Heads (₹20k) → ₹9.5k discount → 5% Tax = ₹5,14,500 grand total!',
      actionText: 'Open Quotation Builder',
      icon: <FileText size={18} />,
      onClick: () => navigateToQuotationBuilder('quot-01')
    },
    {
      step: 5,
      title: 'Client-Ready Quotation Document',
      desc: 'Preview minimal, elegant client document with course breakdown, payment terms, and 1-click "Convert to Confirmed Event".',
      actionText: 'Preview Client Quotation',
      icon: <CheckCircle2 size={18} />,
      onClick: () => navigateToQuotationPreview('quot-01')
    },
    {
      step: 6,
      title: 'Record ₹2,00,000 Advance Payment',
      desc: 'Receive confirmation advance and observe real-time balance reduction across event and accounting registers.',
      actionText: 'View Payments (Money In)',
      icon: <CreditCard size={18} />,
      onClick: () => setCurrentView('financials')
    },
    {
      step: 7,
      title: 'Event Staffing & Kitchen Purchases',
      desc: 'Assign Executive Chef Suresh Pillai & AV team. Track Kaima rice and poultry bills tied directly to the event.',
      actionText: 'Open Event Workspace',
      icon: <Users size={18} />,
      onClick: () => navigateToEvent('evt-01')
    },
    {
      step: 8,
      title: 'Real-Time Event Profitability Analysis',
      desc: 'Calculates: Revenue (₹5,14,500) - Costs (₹1,62,000 Food + ₹42,000 Staff + ₹18,000 AV + ₹14,500 Logistics) = ₹2,78,000 Net Profit (54% Margin!).',
      actionText: 'View Profitability Breakdown',
      icon: <DollarSign size={18} />,
      onClick: () => setCurrentView('financials')
    }
  ];

  return (
    <div className="page-content-container" style={{ maxWidth: '860px' }}>
      {/* Header */}
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--primary-soft)', color: 'var(--primary-dark)', fontSize: '0.78rem', fontWeight: 600, marginBottom: '8px' }}>
          <Sparkles size={14} />
          <span>Interactive Stakeholder Story</span>
        </div>
        <h1 style={{ fontSize: '1.75rem' }}>CaterFlow Product Demonstration Journey</h1>
        <p style={{ fontSize: '0.92rem' }}>
          Follow this 8-step live walkthrough to experience how CaterFlow simplifies catering & event rental operations from initial enquiry to final profit calculation.
        </p>
      </div>

      {/* Story Steps */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {steps.map((s) => (
          <div
            key={s.step}
            className="soft-card"
            style={{
              padding: '1.25rem 1.5rem',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: '1.25rem',
              flexWrap: 'wrap'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', flex: 1, minWidth: '260px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  flexShrink: 0
                }}
              >
                {s.step}
              </div>

              <div>
                <h3 style={{ fontSize: '1.05rem', color: 'var(--text-primary)' }}>{s.title}</h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.45 }}>
                  {s.desc}
                </p>
              </div>
            </div>

            <button
              className="btn btn-secondary btn-sm"
              onClick={s.onClick}
              style={{ gap: '6px', alignSelf: 'center' }}
            >
              <span>{s.actionText}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
