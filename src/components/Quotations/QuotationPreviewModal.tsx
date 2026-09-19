import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  Printer,
  Share2,
  CheckCircle2,
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Phone,
  Mail,
  Edit
} from 'lucide-react';
import { StatusBadge } from '../Common/StatusBadge';

export const QuotationPreviewModal: React.FC = () => {
  const {
    selectedQuotationId,
    quotations,
    company,
    convertQuotationToEvent,
    navigateToQuotationBuilder,
    setCurrentView,
    navigateToEvent,
    showToast
  } = useApp();

  const quotation = quotations.find((q) => q.id === selectedQuotationId) || quotations[0];

  if (!quotation) {
    return (
      <div className="page-content-container">
        <button className="btn btn-secondary btn-sm" onClick={() => setCurrentView('quotations')}>
          <ArrowLeft size={16} />
          <span>Back to Quotations</span>
        </button>
        <div style={{ marginTop: '2rem' }}>Quotation not found.</div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    showToast(`Quotation link copied! Ready to share via WhatsApp with ${quotation.customerName}`);
  };

  const handleConvert = () => {
    const createdEvent = convertQuotationToEvent(quotation.id);
    navigateToEvent(createdEvent.id);
  };

  return (
    <div className="page-content-container" style={{ maxWidth: '900px' }}>
      {/* Top Action Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          gap: '10px'
        }}
      >
        <button className="btn btn-ghost btn-sm" onClick={() => setCurrentView('quotations')} style={{ gap: '6px' }}>
          <ArrowLeft size={16} />
          <span>All Quotations</span>
        </button>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button className="btn btn-secondary btn-sm" onClick={() => navigateToQuotationBuilder(quotation.id)}>
            <Edit size={15} />
            <span>Edit</span>
          </button>
          <button className="btn btn-secondary btn-sm" onClick={handleShare}>
            <Share2 size={15} />
            <span>Share</span>
          </button>
          <button className="btn btn-secondary btn-sm" onClick={handlePrint}>
            <Printer size={15} />
            <span>Print / PDF</span>
          </button>

          {quotation.status !== 'Converted' ? (
            <button className="btn btn-primary btn-sm" onClick={handleConvert} style={{ gap: '6px' }}>
              <CheckCircle2 size={16} />
              <span>Convert to Confirmed Event</span>
            </button>
          ) : (
            <span className="badge badge-success" style={{ padding: '6px 12px' }}>
              ✓ Converted to Event
            </span>
          )}
        </div>
      </div>

      {/* Printable Quotation Paper Document */}
      <div className="quotation-paper">
        {/* Document Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            paddingBottom: '1.5rem',
            borderBottom: '2px solid var(--border-color)',
            marginBottom: '1.5rem'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--primary)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontFamily: 'var(--font-display)'
                }}
              >
                {company.logoText}
              </div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {company.name}
              </h2>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              {company.tagline}
            </p>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              {company.location} • {company.phone} • GSTIN: {company.gstNumber}
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--primary-dark)', letterSpacing: '0.02em' }}>
              QUOTATION
            </div>
            <div style={{ fontWeight: 600, fontSize: '0.92rem', marginTop: '2px' }}>
              {quotation.quotationNumber}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Date: {quotation.date}
            </div>
            <div style={{ marginTop: '4px' }}>
              <StatusBadge status={quotation.status} size="sm" />
            </div>
          </div>
        </div>

        {/* Customer & Event 2-Column Info */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
            padding: '1.25rem',
            backgroundColor: 'var(--bg-surface-secondary)',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.5rem'
          }}
        >
          <div>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600, color: 'var(--text-muted)' }}>
              Client Information:
            </span>
            <div style={{ fontWeight: 600, fontSize: '1.02rem', marginTop: '4px' }}>
              {quotation.customerName}
            </div>
            <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Phone: {quotation.customerPhone}
            </div>
            {quotation.customerEmail && (
              <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                Email: {quotation.customerEmail}
              </div>
            )}
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600, color: 'var(--text-muted)' }}>
              Event Particulars:
            </span>
            <div style={{ fontWeight: 600, fontSize: '1.02rem', marginTop: '4px' }}>
              {quotation.eventName} ({quotation.eventType})
            </div>
            <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Date: <strong>{quotation.eventDate}</strong> • <strong>{quotation.guestCount} Guests</strong>
            </div>
            <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
              Venue: {quotation.venue}
            </div>
          </div>
        </div>

        {/* Itemized Line Table */}
        <div style={{ marginBottom: '1.5rem' }} className="table-responsive-wrapper">
          <div style={{ minWidth: '540px' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '40px 1fr 90px 90px 110px',
                padding: '10px 12px',
                backgroundColor: 'var(--primary-soft)',
                color: 'var(--primary-dark)',
                fontWeight: 600,
                fontSize: '0.82rem',
                borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0'
              }}
            >
              <div>#</div>
              <div>Description & Service Particulars</div>
              <div style={{ textAlign: 'center' }}>Qty</div>
              <div style={{ textAlign: 'right' }}>Rate (₹)</div>
              <div style={{ textAlign: 'right' }}>Amount (₹)</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {quotation.items.map((item, idx) => (
                <div
                  key={item.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '40px 1fr 90px 90px 110px',
                    padding: '12px',
                    borderBottom: '1px solid var(--border-light)',
                    fontSize: '0.86rem',
                    alignItems: 'start'
                  }}
                >
                  <div style={{ color: 'var(--text-muted)' }}>{idx + 1}</div>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.name}</div>
                    <span className="badge badge-neutral" style={{ fontSize: '0.68rem', margin: '2px 0' }}>
                      {item.category}
                    </span>
                    {item.description && (
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        {item.description}
                      </div>
                    )}

                    {/* Menu items breakdown if attached */}
                    {item.menuDetails && item.menuDetails.categories && (
                      <div
                        style={{
                          marginTop: '8px',
                          padding: '8px 10px',
                          backgroundColor: 'var(--bg-surface-secondary)',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.78rem'
                        }}
                      >
                        <strong style={{ color: 'var(--primary-dark)', display: 'block', marginBottom: '4px' }}>
                          Selected Course Menu:
                        </strong>
                        {item.menuDetails.categories.map((c, i) => (
                          <div key={i} style={{ marginBottom: '2px' }}>
                            <span style={{ fontWeight: 600 }}>{c.categoryName}:</span> {c.items.join(', ')}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    {item.quantity} {item.unit.replace('Per ', '')}
                  </div>
                  <div style={{ textAlign: 'right' }}>₹{item.rate.toLocaleString()}</div>
                  <div style={{ textAlign: 'right', fontWeight: 600 }}>₹{item.total.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing Summary Calculation Box */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem' }}>
          <div style={{ width: '320px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.88rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Subtotal:</span>
              <span>₹{quotation.subtotal.toLocaleString()}</span>
            </div>

            {quotation.discount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--status-success-text)' }}>
                <span>Discount / Privilege:</span>
                <span>-₹{quotation.discount.toLocaleString()}</span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
              <span>GST Tax ({quotation.taxPercentage}%):</span>
              <span>+₹{quotation.tax.toLocaleString()}</span>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '8px',
                marginTop: '4px',
                borderTop: '2px solid var(--border-color)',
                fontWeight: 700,
                fontSize: '1.2rem',
                color: 'var(--primary-dark)'
              }}
            >
              <span>Grand Total:</span>
              <span>₹{quotation.grandTotal.toLocaleString()}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginTop: '6px', color: 'var(--text-secondary)' }}>
              <span>Advance Required:</span>
              <strong style={{ color: 'var(--text-primary)' }}>₹{quotation.advanceRequired.toLocaleString()}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              <span>Balance Due on Function:</span>
              <strong>₹{quotation.balance.toLocaleString()}</strong>
            </div>
          </div>
        </div>

        {/* Payment Terms & Notes */}
        <div
          style={{
            padding: '1.25rem',
            backgroundColor: 'var(--bg-surface-secondary)',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.82rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.5
          }}
        >
          <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>
            Terms & Conditions:
          </strong>
          <ul style={{ paddingLeft: '1.2rem', margin: '4px 0' }}>
            <li>Confirmation upon receipt of 40% initial booking advance.</li>
            <li>Final guest count must be locked 3 business days prior to catering date.</li>
            <li>Stage sound and lighting setup completed 4 hours prior to event start.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
