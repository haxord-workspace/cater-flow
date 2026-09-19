import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EventStatus } from '../../types';
import {
  Calendar,
  Search,
  Plus,
  Filter,
  MapPin,
  Users,
  Clock,
  Phone,
  ArrowRight,
  FileText,
  DollarSign
} from 'lucide-react';
import { StatusBadge } from '../Common/StatusBadge';

interface EventsListViewProps {
  onOpenCreateEvent: () => void;
}

export const EventsListView: React.FC<EventsListViewProps> = ({ onOpenCreateEvent }) => {
  const { events, navigateToEvent, navigateToQuotationBuilder, currentRole } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const isStaff = currentRole === 'staff';

  const statuses: (string | EventStatus)[] = [
    'All',
    'Confirmed',
    'Quotation Sent',
    'Enquiry',
    'Preparation',
    'Completed'
  ];

  const filteredEvents = events.filter((evt) => {
    const matchesSearch =
      evt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.venue.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || evt.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="page-content-container">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '1.65rem' }}>Events Management</h1>
          <p style={{ fontSize: '0.9rem' }}>
            The operational core: every quotation, menu, staff roster and purchase originates from an event.
          </p>
        </div>

        {!isStaff && (
          <button className="btn btn-primary" onClick={onOpenCreateEvent} style={{ gap: '6px' }}>
            <Plus size={16} />
            <span>Create New Event</span>
          </button>
        )}
      </div>

      {/* Search & Filter Bar */}
      <div
        className="soft-card"
        style={{
          padding: '1rem',
          marginBottom: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.85rem'
        }}
      >
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search
              size={18}
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)'
              }}
            />
            <input
              type="text"
              placeholder="Search by event title, client name, or venue..."
              className="form-input"
              style={{ paddingLeft: '38px', height: '44px' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Status Chips */}
        <div className="chip-container">
          {statuses.map((st) => (
            <button
              key={st}
              className={`chip-btn ${statusFilter === st ? 'active' : ''}`}
              onClick={() => setStatusFilter(st)}
            >
              <span>{st}</span>
              {st === 'All' ? (
                <span style={{ opacity: 0.7 }}>({events.length})</span>
              ) : (
                <span style={{ opacity: 0.7 }}>
                  ({events.filter((e) => e.status === st).length})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid / Card List */}
      {filteredEvents.length === 0 ? (
        <div className="soft-card" style={{ padding: '3rem', textAlign: 'center' }}>
          <Calendar size={40} style={{ color: 'var(--text-muted)', margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.1rem' }}>No events found</h3>
          <p style={{ fontSize: '0.88rem', marginTop: '4px' }}>
            Try altering your search keywords or status filter.
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.25rem' }}>
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="soft-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'all var(--transition-normal)'
              }}
              onClick={() => navigateToEvent(evt.id)}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '0.75rem' }}>
                  <div>
                    <span className="badge badge-neutral" style={{ fontSize: '0.7rem', marginBottom: '4px' }}>
                      {evt.eventType}
                    </span>
                    <h3 style={{ fontSize: '1.1rem', lineHeight: 1.3 }}>{evt.name}</h3>
                  </div>
                  <StatusBadge status={evt.status} size="sm" />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.84rem', color: 'var(--text-secondary)', margin: '0.75rem 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Calendar size={15} style={{ color: 'var(--primary)' }} />
                    <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{evt.eventDate}</span>
                    <span>({evt.startTime} - {evt.endTime})</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MapPin size={15} style={{ color: 'var(--primary)' }} />
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {evt.venue}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Users size={15} style={{ color: 'var(--primary)' }} />
                    <span><strong>{evt.guestCount}</strong> Expected Guests</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Phone size={15} style={{ color: 'var(--primary)' }} />
                    <span>{evt.customerName} ({evt.contactNumber})</span>
                  </div>
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
                {!isStaff ? (
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block' }}>
                      Agreed Total:
                    </span>
                    <strong style={{ fontSize: '0.98rem', color: 'var(--text-primary)' }}>
                      ₹{evt.agreedAmount.toLocaleString()}
                    </strong>
                    {evt.balanceDue > 0 ? (
                      <span style={{ fontSize: '0.72rem', color: 'var(--status-warning-text)', display: 'block' }}>
                        Due: ₹{evt.balanceDue.toLocaleString()}
                      </span>
                    ) : (
                      <span style={{ fontSize: '0.72rem', color: 'var(--status-success-text)', display: 'block' }}>
                        Fully Settled
                      </span>
                    )}
                  </div>
                ) : (
                  <span style={{ fontSize: '0.82rem', color: 'var(--primary-dark)', fontWeight: 500 }}>
                    Assigned Event
                  </span>
                )}

                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateToEvent(evt.id);
                    }}
                  >
                    <span>Workspace</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
