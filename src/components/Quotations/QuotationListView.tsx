import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  Plus,
  Search,
  ArrowRight,
  Eye,
  Calendar,
  DollarSign,
  CheckCircle,
  Share2
} from 'lucide-react';
import { StatusBadge } from '../Common/StatusBadge';

export const QuotationListView: React.FC = () => {
  const {
    quotations,
    navigateToQuotationBuilder,
    navigateToQuotationPreview,
    convertQuotationToEvent
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filteredQuotations = quotations.filter((q) => {
    const matchesSearch =
      q.quotationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.eventName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || q.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="page-content-container">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '1.65rem' }}>Quotations & Proposals</h1>
          <p style={{ fontSize: '0.9rem' }}>
            Unified catering menus, live counters and light/sound rental quotation management.
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => navigateToQuotationBuilder()}
          style={{ gap: '6px' }}
        >
          <Plus size={16} />
          <span>New Quotation</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="soft-card" style={{ padding: '1rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        <div style={{ position: 'relative' }}>
          <Search
            size={18}
            style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
          />
          <input
            type="text"
            placeholder="Search quotation number, client name or event..."
            className="form-input"
            style={{ paddingLeft: '38px', height: '42px' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="chip-container">
          {['All', 'Draft', 'Sent', 'Approved', 'Converted'].map((st) => (
            <button
              key={st}
              className={`chip-btn ${statusFilter === st ? 'active' : ''}`}
              onClick={() => setStatusFilter(st)}
            >
              <span>{st}</span>
              {st === 'All' ? (
                <span style={{ opacity: 0.7 }}>({quotations.length})</span>
              ) : (
                <span style={{ opacity: 0.7 }}>
                  ({quotations.filter((q) => q.status === st).length})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Quotation Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.25rem' }}>
        {filteredQuotations.map((quo) => (
          <div
            key={quo.id}
            className="soft-card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              cursor: 'pointer'
            }}
            onClick={() => navigateToQuotationPreview(quo.id)}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <div>
                  <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--primary-dark)', display: 'block' }}>
                    {quo.quotationNumber}
                  </span>
                  <h3 style={{ fontSize: '1.1rem', lineHeight: 1.3, marginTop: '2px' }}>{quo.eventName}</h3>
                </div>
                <StatusBadge status={quo.status} size="sm" />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.84rem', color: 'var(--text-secondary)', margin: '0.75rem 0' }}>
                <div>Client: <strong>{quo.customerName}</strong> ({quo.customerPhone})</div>
                <div>Event Date: <strong>{quo.eventDate}</strong> ({quo.guestCount} Guests)</div>
                <div>Venue: {quo.venue}</div>
              </div>

              {/* Items Summary Pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', margin: '0.5rem 0' }}>
                {quo.items.map((it, idx) => (
                  <span key={idx} className="badge badge-neutral" style={{ fontSize: '0.7rem' }}>
                    {it.name.length > 22 ? `${it.name.slice(0, 20)}...` : it.name}
                  </span>
                ))}
              </div>
            </div>

            <div
              style={{
                paddingTop: '0.85rem',
                borderTop: '1px solid var(--border-light)',
                marginTop: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', display: 'block' }}>
                  Grand Total
                </span>
                <strong style={{ fontSize: '1.15rem', color: 'var(--text-primary)' }}>
                  ₹{quo.grandTotal.toLocaleString()}
                </strong>
              </div>

              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateToQuotationBuilder(quo.id);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateToQuotationPreview(quo.id);
                  }}
                  style={{ gap: '4px' }}
                >
                  <Eye size={14} />
                  <span>Preview</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
