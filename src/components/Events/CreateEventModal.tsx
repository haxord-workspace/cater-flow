import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EventType, EventStatus } from '../../types';
import { X, Calendar, MapPin, Users, Phone, Mail, FileText, Check } from 'lucide-react';

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateEventModal: React.FC<CreateEventModalProps> = ({ isOpen, onClose }) => {
  const { customers, addEvent, addCustomer, reusableMenus, navigateToEvent } = useApp();

  const [selectedCustomerId, setSelectedCustomerId] = useState<string>(customers[0]?.id || '');
  const [isNewCustomer, setIsNewCustomer] = useState(false);
  
  // New Customer fields
  const [newCustName, setNewCustName] = useState('');
  const [newCustPhone, setNewCustPhone] = useState('');
  const [newCustEmail, setNewCustEmail] = useState('');
  const [newCustCity, setNewCustCity] = useState('');

  // Event fields
  const [eventName, setEventName] = useState('');
  const [eventType, setEventType] = useState<EventType>('Wedding');
  const [eventDate, setEventDate] = useState('2026-12-28');
  const [startTime, setStartTime] = useState('18:00');
  const [endTime, setEndTime] = useState('23:00');
  const [venue, setVenue] = useState('');
  const [guestCount, setGuestCount] = useState<number>(400);
  const [status, setStatus] = useState<EventStatus>('Enquiry');
  const [selectedMenuId, setSelectedMenuId] = useState<string>('');
  const [estimatedBudget, setEstimatedBudget] = useState<number>(250000);
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let customerId = selectedCustomerId;
    let customerName = '';
    let customerPhone = '';
    let customerEmail = '';

    if (isNewCustomer) {
      if (!newCustName || !newCustPhone) return;
      const createdCust = addCustomer({
        name: newCustName,
        phone: newCustPhone,
        email: newCustEmail,
        city: newCustCity || 'Kochi, Kerala'
      });
      customerId = createdCust.id;
      customerName = createdCust.name;
      customerPhone = createdCust.phone;
      customerEmail = createdCust.email;
    } else {
      const cust = customers.find((c) => c.id === selectedCustomerId);
      if (cust) {
        customerName = cust.name;
        customerPhone = cust.phone;
        customerEmail = cust.email;
      }
    }

    const newEvt = addEvent({
      name: eventName || `${customerName}'s ${eventType}`,
      customerId,
      customerName,
      contactNumber: customerPhone,
      contactEmail: customerEmail,
      eventType,
      eventDate,
      startTime,
      endTime,
      venue: venue || 'To be decided',
      guestCount: Number(guestCount) || 100,
      status,
      agreedAmount: Number(estimatedBudget) || 0,
      foodCostEstimated: Math.round(Number(estimatedBudget) * 0.35),
      staffCostEstimated: Math.round(Number(estimatedBudget) * 0.08),
      rentalCostEstimated: Math.round(Number(estimatedBudget) * 0.05),
      otherExpensesEstimated: Math.round(Number(estimatedBudget) * 0.02),
      selectedMenuId: selectedMenuId || undefined,
      notes
    });

    onClose();
    navigateToEvent(newEvt.id);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3 className="soft-card-title">Schedule New Event</h3>
            <p style={{ fontSize: '0.82rem', marginTop: '2px' }}>
              Create event record as the operational anchor for menus, quotation and staffing.
            </p>
          </div>
          <button className="btn btn-ghost btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body" style={{ maxHeight: '72vh' }}>
            {/* Customer Selection or Quick Add */}
            <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-surface-secondary)', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span className="form-label" style={{ fontWeight: 600 }}>Customer Details</span>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() => setIsNewCustomer(!isNewCustomer)}
                  style={{ color: 'var(--primary-dark)', fontWeight: 600 }}
                >
                  {isNewCustomer ? '← Select Existing Customer' : '+ Add New Customer'}
                </button>
              </div>

              {!isNewCustomer ? (
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <select
                    className="form-select"
                    value={selectedCustomerId}
                    onChange={(e) => setSelectedCustomerId(e.target.value)}
                    required
                  >
                    {customers.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.phone}) - {c.city}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Customer Name *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Anand Varma"
                      value={newCustName}
                      onChange={(e) => setNewCustName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Phone Number *</label>
                    <input
                      type="tel"
                      className="form-input"
                      placeholder="+91 98470 XXXXX"
                      value={newCustPhone}
                      onChange={(e) => setNewCustPhone(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Kochi"
                      value={newCustCity}
                      onChange={(e) => setNewCustCity(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Event Specifics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Event Name / Occasion *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Dr. Sidharth & Maya Wedding Reception"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Event Type</label>
                <select
                  className="form-select"
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value as EventType)}
                >
                  <option value="Wedding">Wedding</option>
                  <option value="Reception">Reception</option>
                  <option value="Engagement">Engagement</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Corporate">Corporate</option>
                  <option value="Conference">Conference</option>
                  <option value="House Function">House Function</option>
                  <option value="Religious Function">Religious Function</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Event Date *</label>
                <input
                  type="date"
                  className="form-input"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Time Window</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="time"
                    className="form-input"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                  <span style={{ alignSelf: 'center', color: 'var(--text-muted)' }}>to</span>
                  <input
                    type="time"
                    className="form-input"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Venue Location *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Gokulam Convention Centre, Kaloor"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Expected Guest Count *</label>
                <input
                  type="number"
                  className="form-input"
                  min="10"
                  max="10000"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Initial Status</label>
                <select
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as EventStatus)}
                >
                  <option value="Enquiry">Enquiry</option>
                  <option value="Quotation Draft">Quotation Draft</option>
                  <option value="Quotation Sent">Quotation Sent</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Preparation">Preparation</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Pre-attach Food Menu (Optional)</label>
                <select
                  className="form-select"
                  value={selectedMenuId}
                  onChange={(e) => setSelectedMenuId(e.target.value)}
                >
                  <option value="">-- No Menu Selected --</option>
                  {reusableMenus.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} (₹{m.ratePerPerson}/person)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group" style={{ marginTop: '0.5rem' }}>
              <label className="form-label">Special Notes / Dietary Preferences / AV Requests</label>
              <textarea
                className="form-textarea"
                placeholder="e.g. Vegetarian counters separated on west wing, acoustic sound package requested for reception band."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" style={{ gap: '6px' }}>
              <Check size={16} />
              <span>Create Event Record</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
