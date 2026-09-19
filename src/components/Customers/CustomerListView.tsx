import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Plus, Search, Phone, Mail, MapPin, Calendar, ArrowRight } from 'lucide-react';

interface CustomerListViewProps {
  onOpenCreateCustomer: () => void;
}

export const CustomerListView: React.FC<CustomerListViewProps> = ({ onOpenCreateCustomer }) => {
  const { customers, events, navigateToEvent } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      c.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="page-content-container">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '1.65rem' }}>Customer Directory</h1>
          <p style={{ fontSize: '0.9rem' }}>
            Client contacts, event history, preferences and notes.
          </p>
        </div>

        <button className="btn btn-primary" onClick={onOpenCreateCustomer} style={{ gap: '6px' }}>
          <Plus size={16} />
          <span>New Customer</span>
        </button>
      </div>

      {/* Search */}
      <div className="soft-card" style={{ padding: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ position: 'relative' }}>
          <Search
            size={18}
            style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
          />
          <input
            type="text"
            placeholder="Search by customer name, phone number, or city..."
            className="form-input"
            style={{ paddingLeft: '38px', height: '42px' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Customer Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {filteredCustomers.map((c) => {
          const clientEvents = events.filter((e) => e.customerId === c.id || e.customerName === c.name);

          return (
            <div
              key={c.id}
              className="soft-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '0.75rem' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--primary-soft)',
                      color: 'var(--primary-dark)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '1.1rem'
                    }}
                  >
                    {c.name.charAt(0)}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem' }}>{c.name}</h3>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                      {c.city}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Phone size={15} style={{ color: 'var(--primary)' }} />
                    <span>{c.phone}</span>
                  </div>
                  {c.email && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Mail size={15} style={{ color: 'var(--primary)' }} />
                      <span>{c.email}</span>
                    </div>
                  )}
                  {c.notes && (
                    <div style={{ marginTop: '0.5rem', padding: '8px', backgroundColor: 'var(--bg-surface-secondary)', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem' }}>
                      "{c.notes}"
                    </div>
                  )}
                </div>
              </div>

              <div
                style={{
                  marginTop: '1rem',
                  paddingTop: '0.75rem',
                  borderTop: '1px solid var(--border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span className="badge badge-primary" style={{ fontSize: '0.72rem' }}>
                  {clientEvents.length} Events Booked
                </span>

                {clientEvents[0] && (
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => navigateToEvent(clientEvents[0].id)}
                    style={{ gap: '4px' }}
                  >
                    <span>Latest Event</span>
                    <ArrowRight size={14} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
