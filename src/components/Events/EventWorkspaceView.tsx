import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EventStatus } from '../../types';
import {
  Calendar,
  MapPin,
  Users,
  Phone,
  Mail,
  Utensils,
  Speaker,
  UserCheck,
  CheckSquare,
  DollarSign,
  Receipt,
  FileText,
  Plus,
  ArrowLeft,
  Clock,
  Sparkles,
  TrendingUp,
  CreditCard
} from 'lucide-react';
import { StatusBadge } from '../Common/StatusBadge';

interface EventWorkspaceViewProps {
  onOpenRecordPayment: () => void;
  onOpenRecordExpense: () => void;
}

export const EventWorkspaceView: React.FC<EventWorkspaceViewProps> = ({
  onOpenRecordPayment,
  onOpenRecordExpense
}) => {
  const {
    selectedEventId,
    events,
    quotations,
    reusableMenus,
    foodItems,
    liveCounters,
    equipmentList,
    lightSoundPackages,
    staff,
    tasks,
    purchases,
    expenses,
    payments,
    updateEventStatus,
    toggleTask,
    setCurrentView,
    navigateToQuotationBuilder,
    navigateToQuotationPreview,
    currentRole
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'menu'
    | 'light_sound'
    | 'staff'
    | 'tasks'
    | 'purchases'
    | 'expenses'
    | 'payments_profit'
  >('overview');

  const isStaff = currentRole === 'staff';

  const event = events.find((e) => e.id === selectedEventId) || events[0];

  if (!event) {
    return (
      <div className="page-content-container">
        <button className="btn btn-secondary btn-sm" onClick={() => setCurrentView('events')}>
          <ArrowLeft size={16} />
          <span>Back to Events</span>
        </button>
        <div style={{ marginTop: '2rem' }}>No event selected.</div>
      </div>
    );
  }

  // Linked entities
  const linkedQuotation = quotations.find((q) => q.id === event.quotationId || q.eventId === event.id);
  const selectedMenu = reusableMenus.find((m) => m.id === event.selectedMenuId);
  const eventTasks = tasks.filter((t) => t.eventId === event.id);
  const eventPurchases = purchases.filter((p) => p.eventId === event.id);
  const eventExpenses = expenses.filter((exp) => exp.eventId === event.id);
  const eventPayments = payments.filter((pay) => pay.eventId === event.id);
  const assignedStaffList = staff.filter((s) => event.assignedStaffIds?.includes(s.id));

  // Profitability Calculation
  const totalRevenue = event.agreedAmount;
  const actualPurchasesCost = eventPurchases.reduce((sum, p) => sum + p.total, 0) || event.foodCostEstimated;
  const actualStaffCost = event.staffCostEstimated;
  const actualRentalCost = event.rentalCostEstimated;
  const actualExpensesCost = eventExpenses.reduce((sum, e) => sum + e.amount, 0) || event.otherExpensesEstimated;

  const totalEventCost = actualPurchasesCost + actualStaffCost + actualRentalCost + actualExpensesCost;
  const estimatedProfit = totalRevenue - totalEventCost;
  const profitMarginPercent = totalRevenue > 0 ? Math.round((estimatedProfit / totalRevenue) * 100) : 0;

  const allStatuses: EventStatus[] = [
    'Enquiry',
    'Quotation Draft',
    'Quotation Sent',
    'Confirmed',
    'Preparation',
    'In Progress',
    'Completed',
    'Cancelled'
  ];

  return (
    <div className="page-content-container">
      {/* Top back breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <button className="btn btn-ghost btn-sm" onClick={() => setCurrentView('events')} style={{ gap: '6px' }}>
          <ArrowLeft size={16} />
          <span>All Events</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>Status:</span>
          <select
            className="form-select"
            style={{ padding: '4px 10px', fontSize: '0.84rem', width: 'auto' }}
            value={event.status}
            onChange={(e) => updateEventStatus(event.id, e.target.value as EventStatus)}
          >
            {allStatuses.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Event Workspace Header Card */}
      <div className="soft-card" style={{ marginBottom: '1.5rem', padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="badge badge-primary">{event.eventType}</span>
              <StatusBadge status={event.status} />
              {linkedQuotation && (
                <button
                  className="badge badge-neutral"
                  onClick={() => navigateToQuotationPreview(linkedQuotation.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <FileText size={12} />
                  <span>{linkedQuotation.quotationNumber}</span>
                </button>
              )}
            </div>
            <h1 style={{ fontSize: '1.75rem', marginTop: '4px' }}>{event.name}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', marginTop: '6px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Calendar size={15} style={{ color: 'var(--primary)' }} />
                <strong>{event.eventDate}</strong> ({event.startTime} - {event.endTime})
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <MapPin size={15} style={{ color: 'var(--primary)' }} />
                {event.venue}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Users size={15} style={{ color: 'var(--primary)' }} />
                <strong>{event.guestCount} Guests</strong>
              </span>
            </div>
          </div>

          {/* Quick Header Financials (Hidden for staff) */}
          {!isStaff && (
            <div
              style={{
                backgroundColor: 'var(--bg-surface-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '0.75rem 1rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
                gap: '0.85rem',
                width: '100%',
                maxWidth: '480px'
              }}
            >
              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', display: 'block' }}>Contract Total</span>
                <strong style={{ fontSize: '1.08rem' }}>₹{event.agreedAmount.toLocaleString()}</strong>
              </div>
              <div style={{ paddingLeft: '0.5rem', borderLeft: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', display: 'block' }}>Advance Paid</span>
                <strong style={{ fontSize: '1.08rem', color: 'var(--status-success-text)' }}>
                  ₹{event.advanceReceived.toLocaleString()}
                </strong>
              </div>
              <div style={{ paddingLeft: '0.5rem', borderLeft: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', display: 'block' }}>Balance Due</span>
                <strong style={{ fontSize: '1.08rem', color: event.balanceDue > 0 ? 'var(--status-warning-text)' : 'var(--text-secondary)' }}>
                  ₹{event.balanceDue.toLocaleString()}
                </strong>
              </div>
            </div>
          )}
        </div>

        {/* Tab Navigation Navigation (Clean Pills) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            borderTop: '1px solid var(--border-light)',
            marginTop: '1.25rem',
            paddingTop: '1rem',
            overflowX: 'auto',
            scrollbarWidth: 'none'
          }}
        >
          <button
            className={`chip-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`chip-btn ${activeTab === 'menu' ? 'active' : ''}`}
            onClick={() => setActiveTab('menu')}
          >
            <Utensils size={14} />
            <span>Food Menu</span>
          </button>
          <button
            className={`chip-btn ${activeTab === 'light_sound' ? 'active' : ''}`}
            onClick={() => setActiveTab('light_sound')}
          >
            <Speaker size={14} />
            <span>Light & Sound</span>
          </button>
          <button
            className={`chip-btn ${activeTab === 'staff' ? 'active' : ''}`}
            onClick={() => setActiveTab('staff')}
          >
            <UserCheck size={14} />
            <span>Staff ({assignedStaffList.length})</span>
          </button>
          <button
            className={`chip-btn ${activeTab === 'tasks' ? 'active' : ''}`}
            onClick={() => setActiveTab('tasks')}
          >
            <CheckSquare size={14} />
            <span>Tasks ({eventTasks.length})</span>
          </button>
          {!isStaff && (
            <>
              <button
                className={`chip-btn ${activeTab === 'purchases' ? 'active' : ''}`}
                onClick={() => setActiveTab('purchases')}
              >
                <Receipt size={14} />
                <span>Purchases ({eventPurchases.length})</span>
              </button>
              <button
                className={`chip-btn ${activeTab === 'payments_profit' ? 'active' : ''}`}
                onClick={() => setActiveTab('payments_profit')}
              >
                <DollarSign size={14} />
                <span>Financials & Profit</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* TAB CONTENT 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {/* Customer Profile & Contact */}
          <div className="soft-card">
            <div className="soft-card-header">
              <h3 className="soft-card-title">Customer & Contact</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block' }}>Primary Client</span>
                <strong>{event.customerName}</strong>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block' }}>Phone Contact</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Phone size={15} style={{ color: 'var(--primary)' }} />
                  {event.contactNumber}
                </span>
              </div>
              {event.contactEmail && (
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block' }}>Email</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Mail size={15} style={{ color: 'var(--primary)' }} />
                    {event.contactEmail}
                  </span>
                </div>
              )}
              {event.notes && (
                <div style={{ marginTop: '0.5rem', padding: '10px', backgroundColor: 'var(--bg-surface-secondary)', borderRadius: 'var(--radius-md)' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'block' }}>Event Notes:</span>
                  <p style={{ fontSize: '0.84rem', marginTop: '2px', color: 'var(--text-primary)' }}>{event.notes}</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions & Quotation Link */}
          <div className="soft-card">
            <div className="soft-card-header">
              <h3 className="soft-card-title">Event Operations & Quotation</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {linkedQuotation ? (
                <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--primary-lighter)', border: '1px solid var(--primary-border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{linkedQuotation.quotationNumber}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                        Grand Total: ₹{linkedQuotation.grandTotal.toLocaleString()}
                      </div>
                    </div>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => navigateToQuotationPreview(linkedQuotation.id)}
                    >
                      View Full Quotation
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-surface-secondary)', textAlign: 'center' }}>
                  <p style={{ fontSize: '0.86rem', marginBottom: '0.75rem' }}>No quotation currently generated for this event.</p>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => navigateToQuotationBuilder()}
                  >
                    <Plus size={15} />
                    <span>Build Quotation for this Event</span>
                  </button>
                </div>
              )}

              {!isStaff && (
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                  <button className="btn btn-secondary btn-sm" onClick={onOpenRecordPayment} style={{ flex: 1 }}>
                    <CreditCard size={15} />
                    <span>Record Payment</span>
                  </button>
                  <button className="btn btn-secondary btn-sm" onClick={onOpenRecordExpense} style={{ flex: 1 }}>
                    <Receipt size={15} />
                    <span>Log Expense</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: FOOD MENU */}
      {activeTab === 'menu' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="soft-card">
            <div className="soft-card-header">
              <div>
                <h3 className="soft-card-title">Catering Food Menu</h3>
                <p style={{ fontSize: '0.82rem' }}>
                  Configured feast spread for <strong>{event.guestCount} guests</strong>
                </p>
              </div>

              {selectedMenu && (
                <div className="badge badge-primary" style={{ fontSize: '0.82rem', padding: '6px 12px' }}>
                  Menu: {selectedMenu.name} (₹{selectedMenu.ratePerPerson}/person)
                </div>
              )}
            </div>

            {selectedMenu ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                  {selectedMenu.categories.map((cat, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '1rem',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--bg-surface-secondary)',
                        border: '1px solid var(--border-light)'
                      }}
                    >
                      <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>
                        {cat.categoryName}
                      </div>
                      <ul style={{ listStyle: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {cat.items.map((item, i) => (
                          <li key={i} style={{ fontSize: '0.86rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ color: 'var(--primary)' }}>•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Pricing summary */}
                <div
                  style={{
                    marginTop: '1rem',
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--primary-lighter)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '10px'
                  }}
                >
                  <div>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Menu Calculation Formula:</span>
                    <div style={{ fontWeight: 600, fontSize: '1rem' }}>
                      {event.guestCount} Guests × ₹{selectedMenu.ratePerPerson} = ₹{(event.guestCount * selectedMenu.ratePerPerson).toLocaleString()}
                    </div>
                  </div>
                  <span className="badge badge-success">Menu Food Ready</span>
                </div>
              </div>
            ) : (
              <div style={{ padding: '2rem', textAlign: 'center' }}>
                <p>No master menu pre-selected. Click below to choose from reusable menu catalog.</p>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setCurrentView('menus')}
                  style={{ marginTop: '0.75rem' }}
                >
                  Select from Menus
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: LIGHT & SOUND */}
      {activeTab === 'light_sound' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="soft-card">
            <div className="soft-card-header">
              <div>
                <h3 className="soft-card-title">Assigned Audio-Visual & Lighting Gear</h3>
                <p style={{ fontSize: '0.82rem' }}>Stage sound engineering and ambient fixture checklist</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {lightSoundPackages.slice(0, 1).map((pkg) => (
                <div
                  key={pkg.id}
                  style={{
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-surface-secondary)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>Primary Audio Rig</span>
                      <h4 style={{ fontSize: '1rem', marginTop: '4px' }}>{pkg.name}</h4>
                    </div>
                    <strong style={{ fontSize: '0.98rem' }}>₹{pkg.rate.toLocaleString()}</strong>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    {pkg.description}
                  </p>

                  <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-light)' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                      Rigged Equipment Checklist:
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '4px' }}>
                      {pkg.equipmentList.map((eq, i) => (
                        <div key={i} style={{ fontSize: '0.82rem', display: 'flex', justifyContent: 'space-between' }}>
                          <span>{eq.name}</span>
                          <strong>×{eq.quantity}</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {/* Individual Lights */}
              <div
                style={{
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-surface-secondary)',
                  border: '1px solid var(--border-color)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span className="badge badge-neutral" style={{ fontSize: '0.7rem' }}>Moving Beam Rig</span>
                    <h4 style={{ fontSize: '1rem', marginTop: '4px' }}>Beam 230W 7R Moving Heads</h4>
                  </div>
                  <strong style={{ fontSize: '0.98rem' }}>₹20,000</strong>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  8x high output beam heads rigged on overhead aluminium truss.
                </p>

                <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="badge badge-success">Sound & AV Engineer: Rohit Mohan</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 4: STAFF */}
      {activeTab === 'staff' && (
        <div className="soft-card">
          <div className="soft-card-header">
            <div>
              <h3 className="soft-card-title">Staff Rostered for this Event</h3>
              <p style={{ fontSize: '0.82rem' }}>Kitchen, supervisory and technical event team</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
            {assignedStaffList.map((s) => (
              <div
                key={s.id}
                style={{
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-surface-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--primary-soft)',
                    color: 'var(--primary-dark)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700
                  }}
                >
                  {s.name.charAt(0)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>{s.name}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{s.role}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{s.phone}</div>
                </div>
                <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>Assigned</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT 5: TASKS */}
      {activeTab === 'tasks' && (
        <div className="soft-card">
          <div className="soft-card-header">
            <div>
              <h3 className="soft-card-title">Event Operations Checklist</h3>
              <p style={{ fontSize: '0.82rem' }}>Preparation milestones and verification items</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {eventTasks.map((t) => (
              <div
                key={t.id}
                onClick={() => toggleTask(t.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: t.isCompleted ? 'var(--bg-surface)' : 'var(--bg-surface-secondary)',
                  border: '1px solid var(--border-color)',
                  cursor: 'pointer'
                }}
              >
                <input
                  type="checkbox"
                  checked={t.isCompleted}
                  onChange={() => {}}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
                />
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontWeight: 500,
                      fontSize: '0.92rem',
                      textDecoration: t.isCompleted ? 'line-through' : 'none',
                      color: t.isCompleted ? 'var(--text-muted)' : 'var(--text-primary)'
                    }}
                  >
                    {t.title}
                  </div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Category: {t.category} • Assigned: {t.assignedToName} • Due: {t.dueDate}
                  </div>
                </div>
                <span className={`badge ${t.isCompleted ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: '0.72rem' }}>
                  {t.isCompleted ? 'Done' : 'Pending'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT 6: PURCHASES */}
      {activeTab === 'purchases' && !isStaff && (
        <div className="soft-card">
          <div className="soft-card-header">
            <div>
              <h3 className="soft-card-title">Food Ingredient Purchases</h3>
              <p style={{ fontSize: '0.82rem' }}>Raw materials, wholesale spices & dairy bills logged for this event</p>
            </div>
            <strong style={{ fontSize: '1.05rem' }}>
              Total: ₹{eventPurchases.reduce((s, p) => s + p.total, 0).toLocaleString()}
            </strong>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {eventPurchases.map((pur) => (
              <div
                key={pur.id}
                style={{
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-surface-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '8px'
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{pur.itemName}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    Supplier: {pur.supplier} • Date: {pur.date} • {pur.quantity} {pur.unit} @ ₹{pur.unitCost}/{pur.unit}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <strong style={{ fontSize: '0.95rem' }}>₹{pur.total.toLocaleString()}</strong>
                  <span className="badge badge-success" style={{ display: 'block', fontSize: '0.68rem', marginTop: '2px' }}>
                    {pur.paymentStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT 7: PAYMENTS & PROFITABILITY (Clean non-jargon financial summary) */}
      {activeTab === 'payments_profit' && !isStaff && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {/* Payment Transactions */}
          <div className="soft-card">
            <div className="soft-card-header">
              <h3 className="soft-card-title">Money In (Client Payments)</h3>
              <button className="btn btn-primary btn-sm" onClick={onOpenRecordPayment}>
                <Plus size={14} />
                <span>Record Payment</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {eventPayments.map((pay) => (
                <div
                  key={pay.id}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--status-success-bg)',
                    border: '1px solid var(--status-success-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--status-success-text)' }}>
                      {pay.type}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                      Date: {pay.date} • Mode: {pay.paymentMethod} {pay.referenceNumber ? `(${pay.referenceNumber})` : ''}
                    </div>
                  </div>
                  <strong style={{ fontSize: '1.1rem', color: 'var(--status-success-text)' }}>
                    +₹{pay.amount.toLocaleString()}
                  </strong>
                </div>
              ))}

              <div
                style={{
                  marginTop: '0.5rem',
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-surface-secondary)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.88rem'
                }}
              >
                <span>Total Contract: <strong>₹{event.agreedAmount.toLocaleString()}</strong></span>
                <span>Balance Remaining: <strong style={{ color: event.balanceDue > 0 ? 'var(--status-warning-text)' : 'var(--status-success-text)' }}>₹{event.balanceDue.toLocaleString()}</strong></span>
              </div>
            </div>
          </div>

          {/* Event Profitability Breakdown Widget */}
          <div className="soft-card" style={{ backgroundColor: 'var(--bg-surface)' }}>
            <div className="soft-card-header">
              <div>
                <h3 className="soft-card-title">Event Profitability Summary</h3>
                <p style={{ fontSize: '0.82rem' }}>Revenue vs. actual ingredient, staff & equipment costs</p>
              </div>
              <span className="badge badge-success">{profitMarginPercent}% Margin</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '6px', borderBottom: '1px solid var(--border-light)' }}>
                <span>(+) Event Revenue (Grand Total):</span>
                <strong>₹{totalRevenue.toLocaleString()}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>(-) Food & Raw Materials:</span>
                <span>-₹{actualPurchasesCost.toLocaleString()}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>(-) Staff Honorarium & Labor:</span>
                <span>-₹{actualStaffCost.toLocaleString()}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>(-) AV & Equipment Cost:</span>
                <span>-₹{actualRentalCost.toLocaleString()}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>(-) Logistics & Transport:</span>
                <span>-₹{actualExpensesCost.toLocaleString()}</span>
              </div>

              <div
                style={{
                  marginTop: '0.75rem',
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--primary-lighter)',
                  border: '1.5px solid var(--primary-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--primary-dark)', fontWeight: 600, display: 'block' }}>
                    Estimated Event Profit:
                  </span>
                  <strong style={{ fontSize: '1.4rem', color: 'var(--primary-dark)' }}>
                    ₹{estimatedProfit.toLocaleString()}
                  </strong>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', display: 'block' }}>Net Profit Margin</span>
                  <strong style={{ fontSize: '1.1rem', color: 'var(--status-success-text)' }}>{profitMarginPercent}%</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
