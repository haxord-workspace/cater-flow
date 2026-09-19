import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Check, DollarSign } from 'lucide-react';

interface RecordPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RecordPaymentModal: React.FC<RecordPaymentModalProps> = ({ isOpen, onClose }) => {
  const { events, recordPayment } = useApp();

  const [selectedEventId, setSelectedEventId] = useState<string>(events[0]?.id || '');
  const [amount, setAmount] = useState<number>(50000);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [type, setType] = useState<'Advance Payment' | 'Partial Payment' | 'Final Payment'>('Advance Payment');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Bank Transfer' | 'Cash' | 'Card'>('Bank Transfer');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const event = events.find((ev) => ev.id === selectedEventId);
    if (!event || !amount) return;

    recordPayment({
      eventId: event.id,
      eventName: event.name,
      customerId: event.customerId,
      customerName: event.customerName,
      date,
      type,
      amount: Number(amount),
      paymentMethod,
      referenceNumber,
      notes
    });

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
        <div className="modal-header">
          <div>
            <h3 className="soft-card-title">Record Client Payment (Money In)</h3>
            <p style={{ fontSize: '0.82rem', marginTop: '2px' }}>
              Logs cash, UPI or bank transfer and automatically reduces event balance due.
            </p>
          </div>
          <button className="btn btn-ghost btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Linked Event *</label>
              <select
                className="form-select"
                value={selectedEventId}
                onChange={(e) => setSelectedEventId(e.target.value)}
                required
              >
                {events.map((ev) => (
                  <option key={ev.id} value={ev.id}>
                    {ev.name} (Due: ₹{ev.balanceDue.toLocaleString()})
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Payment Amount (₹) *</label>
                <input
                  type="number"
                  className="form-input"
                  min="1"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Payment Date</label>
                <input
                  type="date"
                  className="form-input"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Payment Stage</label>
                <select
                  className="form-select"
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                >
                  <option value="Advance Payment">Advance Payment</option>
                  <option value="Partial Payment">Partial Payment</option>
                  <option value="Final Payment">Final Settlement</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Payment Mode</label>
                <select
                  className="form-select"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as any)}
                >
                  <option value="Bank Transfer">Bank Transfer (NEFT/IMPS)</option>
                  <option value="UPI">UPI / GPay / PhonePe</option>
                  <option value="Cash">Cash Receipt</option>
                  <option value="Card">Debit / Credit Card</option>
                </select>
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Reference / UTR Number</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. UTR992817265"
                value={referenceNumber}
                onChange={(e) => setReferenceNumber(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" style={{ gap: '6px' }}>
              <Check size={16} />
              <span>Save & Record Payment</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
