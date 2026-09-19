import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  FileText,
  DollarSign,
  TrendingUp,
  Plus,
  ArrowRight,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { StatusBadge } from '../Common/StatusBadge';

interface DashboardViewProps {
  onOpenCreateEvent: () => void;
  onOpenCreateFoodItem: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onOpenCreateEvent,
  onOpenCreateFoodItem
}) => {
  const {
    events,
    quotations,
    tasks,
    payments,
    company,
    currentRole,
    navigateToEvent,
    navigateToQuotationPreview,
    navigateToQuotationBuilder,
    navigateToMenuBuilder,
    setCurrentView,
    toggleTask
  } = useApp();

  const isStaff = currentRole === 'staff';

  // Core 4 Summary Metrics (As specified: Never show more than 4 primary summary metrics)
  const todayDateStr = '2026-12-24'; // Using sample date anchor
  const todayEvents = events.filter((e) => e.status === 'Confirmed' || e.status === 'In Progress');
  const upcomingEvents = events.filter((e) => e.status === 'Confirmed' || e.status === 'Preparation');
  const pendingQuotations = quotations.filter((q) => q.status === 'Sent' || q.status === 'Draft');
  
  const totalAmountDue = events.reduce((sum, e) => sum + (e.balanceDue || 0), 0);

  return (
    <div className="page-content-container">
      {/* Welcome Greeting Header */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h1 style={{ fontSize: '1.65rem', fontWeight: 700 }}>Good morning, Royal Feast Team</h1>
            <p style={{ fontSize: '0.92rem' }}>
              Here is your catering and event operations schedule for today.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setCurrentView('demo_guide')}
              style={{ gap: '6px' }}
            >
              <Sparkles size={15} style={{ color: 'var(--primary)' }} />
              <span>Guided Demo Walkthrough</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Primary Summary Cards (Clean, Soft Monochromatic) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '0.75rem',
          marginBottom: '1.25rem',
          width: '100%'
        }}
      >
        {/* Metric 1 */}
        <div className="soft-card" style={{ padding: '0.9rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 500 }}>Today's Events</span>
            <div style={{ padding: '5px', borderRadius: 'var(--radius-md)', background: 'var(--primary-soft)', color: 'var(--primary-dark)' }}>
              <Calendar size={16} />
            </div>
          </div>
          <div style={{ marginTop: '0.4rem', display: 'flex', alignItems: 'baseline', gap: '4px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'var(--font-display)' }}>
              {todayEvents.length}
            </span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>active</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="soft-card" style={{ padding: '0.9rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 500 }}>Upcoming</span>
            <div style={{ padding: '5px', borderRadius: 'var(--radius-md)', background: 'var(--primary-lighter)', color: 'var(--primary-dark)' }}>
              <Clock size={16} />
            </div>
          </div>
          <div style={{ marginTop: '0.4rem', display: 'flex', alignItems: 'baseline', gap: '4px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'var(--font-display)' }}>
              {upcomingEvents.length}
            </span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>booked</span>
          </div>
        </div>

        {/* Metric 3 */}
        {!isStaff ? (
          <div className="soft-card" style={{ padding: '0.9rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 500 }}>Pending Quotes</span>
              <div style={{ padding: '5px', borderRadius: 'var(--radius-md)', background: 'var(--status-warning-bg)', color: 'var(--status-warning-text)' }}>
                <FileText size={16} />
              </div>
            </div>
            <div style={{ marginTop: '0.4rem', display: 'flex', alignItems: 'baseline', gap: '4px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'var(--font-display)' }}>
                {pendingQuotations.length}
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>drafts</span>
            </div>
          </div>
        ) : (
          <div className="soft-card" style={{ padding: '0.9rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 500 }}>My Tasks</span>
              <div style={{ padding: '5px', borderRadius: 'var(--radius-md)', background: 'var(--primary-soft)', color: 'var(--primary-dark)' }}>
                <CheckCircle2 size={16} />
              </div>
            </div>
            <div style={{ marginTop: '0.4rem', display: 'flex', alignItems: 'baseline', gap: '4px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'var(--font-display)' }}>
                {tasks.filter((t) => !t.isCompleted).length}
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>actions</span>
            </div>
          </div>
        )}

        {/* Metric 4 */}
        {!isStaff ? (
          <div className="soft-card" style={{ padding: '0.9rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 500 }}>Amount Due</span>
              <div style={{ padding: '5px', borderRadius: 'var(--radius-md)', background: 'var(--status-info-bg)', color: 'var(--status-info-text)' }}>
                <DollarSign size={16} />
              </div>
            </div>
            <div style={{ marginTop: '0.4rem', display: 'flex', alignItems: 'baseline', gap: '4px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'var(--font-display)' }}>
                ₹{(totalAmountDue / 1000).toFixed(0)}k
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>balance</span>
            </div>
          </div>
        ) : (
          <div className="soft-card" style={{ padding: '0.9rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 500 }}>Reporting</span>
              <div style={{ padding: '5px', borderRadius: 'var(--radius-md)', background: 'var(--primary-lighter)', color: 'var(--primary-dark)' }}>
                <MapPin size={16} />
              </div>
            </div>
            <div style={{ marginTop: '0.4rem' }}>
              <span style={{ fontSize: '0.92rem', fontWeight: 600 }}>Grand Conv.</span>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>15:30 IST</div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Action Shortcuts Banner */}
      {!isStaff && (
        <div
          className="soft-card"
          style={{
            marginBottom: '1.25rem',
            padding: '0.85rem 1rem',
            backgroundColor: 'var(--bg-surface-secondary)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: 600, fontSize: '0.86rem' }}>Quick Actions</span>
            <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>Catering shortcuts</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '6px' }}>
            <button className="btn btn-primary btn-sm" onClick={onOpenCreateEvent} style={{ fontSize: '0.78rem', padding: '0.4rem 0.5rem' }}>
              <Plus size={14} />
              <span>New Event</span>
            </button>
            <button className="btn btn-secondary btn-sm" onClick={() => navigateToQuotationBuilder()} style={{ fontSize: '0.78rem', padding: '0.4rem 0.5rem' }}>
              <FileText size={14} />
              <span>New Quote</span>
            </button>
            <button className="btn btn-secondary btn-sm" onClick={() => navigateToMenuBuilder()} style={{ fontSize: '0.78rem', padding: '0.4rem 0.5rem' }}>
              <Plus size={14} />
              <span>New Menu</span>
            </button>
            <button className="btn btn-secondary btn-sm" onClick={onOpenCreateFoodItem} style={{ fontSize: '0.78rem', padding: '0.4rem 0.5rem' }}>
              <Plus size={14} />
              <span>Add Dish</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Grid: Today's Featured Event & Event Schedule */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem', width: '100%' }}>
        {/* Left Column: Featured Confirmed Event */}
        <div className="soft-card">
          <div className="soft-card-header">
            <div>
              <div className="soft-card-title">Featured Event Focus</div>
              <p style={{ fontSize: '0.8rem' }}>Next major confirmed catering function</p>
            </div>
            <span className="badge badge-success">Priority</span>
          </div>

          {events[0] && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div
                style={{
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--primary-lighter)',
                  border: '1px solid var(--primary-border)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap' }}>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <h3 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', lineHeight: 1.3 }}>{events[0].name}</h3>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      Client: <strong>{events[0].customerName}</strong>
                    </div>
                  </div>
                  <StatusBadge status={events[0].status} size="sm" />
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
                    gap: '6px',
                    marginTop: '0.75rem',
                    paddingTop: '0.65rem',
                    borderTop: '1px dashed var(--primary-border)',
                    fontSize: '0.8rem'
                  }}
                >
                  <div>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.72rem', display: 'block' }}>Date</span>
                    <strong>{events[0].eventDate}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.72rem', display: 'block' }}>Guests</span>
                    <strong>{events[0].guestCount} Plates</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.72rem', display: 'block' }}>Venue</span>
                    <strong>{events[0].venue.split(',')[0]}</strong>
                  </div>
                </div>

                {!isStaff && (
                  <div
                    style={{
                      marginTop: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '4px',
                      backgroundColor: 'var(--bg-surface)',
                      padding: '6px 10px',
                      borderRadius: 'var(--radius-sm)'
                    }}
                  >
                    <span style={{ fontSize: '0.8rem' }}>
                      Total: <strong>₹{events[0].agreedAmount.toLocaleString()}</strong>
                    </span>
                    <span style={{ fontSize: '0.76rem', color: 'var(--status-success-text)' }}>
                      Adv: ₹{events[0].advanceReceived.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => navigateToEvent(events[0].id)}
                  style={{ width: '100%', gap: '6px' }}
                >
                  <span>Event Workspace (Menu, AV, Profit)</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Upcoming Bookings & Tasks */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Upcoming Events List */}
          <div className="soft-card">
            <div className="soft-card-header">
              <div className="soft-card-title">Event Schedule</div>
              <button className="btn btn-ghost btn-sm" onClick={() => setCurrentView('events')}>
                View All ({events.length})
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {events.slice(0, 3).map((evt) => (
                <div
                  key={evt.id}
                  onClick={() => navigateToEvent(evt.id)}
                  style={{
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-surface-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'background var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary-lighter)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-surface-secondary)')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'var(--bg-surface)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        color: 'var(--primary-dark)',
                        lineHeight: 1.1
                      }}
                    >
                      <span>{evt.eventDate.split('-')[2] || '24'}</span>
                      <span style={{ fontSize: '0.62rem', color: 'var(--text-secondary)' }}>DEC</span>
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{evt.name}</div>
                      <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                        {evt.guestCount} guests • {evt.venue.split(',')[0]}
                      </div>
                    </div>
                  </div>
                  <StatusBadge status={evt.status} size="sm" />
                </div>
              ))}
            </div>
          </div>

          {/* Operational Task List */}
          <div className="soft-card">
            <div className="soft-card-header">
              <div className="soft-card-title">Operational Tasks</div>
              <span className="badge badge-neutral">{tasks.filter((t) => !t.isCompleted).length} pending</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {tasks.slice(0, 3).map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    padding: '8px 10px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: task.isCompleted ? 'transparent' : 'var(--bg-surface-secondary)',
                    cursor: 'pointer'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={task.isCompleted}
                    onChange={() => {}}
                    style={{ marginTop: '3px', accentColor: 'var(--primary)' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: '0.84rem',
                        fontWeight: 500,
                        textDecoration: task.isCompleted ? 'line-through' : 'none',
                        color: task.isCompleted ? 'var(--text-muted)' : 'var(--text-primary)'
                      }}
                    >
                      {task.title}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      Assigned: {task.assignedToName || 'Unassigned'} • Due: {task.dueDate}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
