import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  Receipt,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
  Sparkles
} from 'lucide-react';
import { StatusBadge } from '../Common/StatusBadge';

interface FinancialsViewProps {
  onOpenRecordPayment: () => void;
  onOpenRecordExpense: () => void;
}

export const FinancialsView: React.FC<FinancialsViewProps> = ({
  onOpenRecordPayment,
  onOpenRecordExpense
}) => {
  const { events, payments, purchases, expenses, navigateToEvent } = useApp();
  const [activeTab, setActiveTab] = useState<'profit' | 'money_in' | 'money_out' | 'receivables'>('profit');

  // Aggregations
  const totalMoneyIn = payments.reduce((sum, p) => sum + p.amount, 0);
  const totalPurchases = purchases.reduce((sum, p) => sum + p.total, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalMoneyOut = totalPurchases + totalExpenses;

  const totalReceivablesDue = events.reduce((sum, e) => sum + (e.balanceDue || 0), 0);
  const totalContractRevenue = events.reduce((sum, e) => sum + e.agreedAmount, 0);

  return (
    <div className="page-content-container">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '1.65rem' }}>Financials & Event Profitability</h1>
          <p style={{ fontSize: '0.9rem' }}>
            Simple money tracking: what came in, what went out, what's pending, and your net profit.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-primary btn-sm" onClick={onOpenRecordPayment}>
            <Plus size={15} />
            <span>Record Payment (Money In)</span>
          </button>
          <button className="btn btn-secondary btn-sm" onClick={onOpenRecordExpense}>
            <Plus size={15} />
            <span>Log Expense (Money Out)</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.75rem' }}>
        {/* Money In */}
        <div className="soft-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>Money Received</span>
            <div style={{ padding: '6px', borderRadius: 'var(--radius-md)', background: 'var(--status-success-bg)', color: 'var(--status-success-text)' }}>
              <ArrowDownLeft size={18} />
            </div>
          </div>
          <div style={{ marginTop: '0.5rem' }}>
            <strong style={{ fontSize: '1.6rem', color: 'var(--status-success-text)', fontFamily: 'var(--font-display)' }}>
              ₹{totalMoneyIn.toLocaleString()}
            </strong>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>from client advances & settlements</div>
          </div>
        </div>

        {/* Money Out */}
        <div className="soft-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>Money Spent</span>
            <div style={{ padding: '6px', borderRadius: 'var(--radius-md)', background: 'var(--status-danger-bg)', color: 'var(--status-danger-text)' }}>
              <ArrowUpRight size={18} />
            </div>
          </div>
          <div style={{ marginTop: '0.5rem' }}>
            <strong style={{ fontSize: '1.6rem', color: 'var(--status-danger-text)', fontFamily: 'var(--font-display)' }}>
              ₹{totalMoneyOut.toLocaleString()}
            </strong>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>ingredients, labor & transport</div>
          </div>
        </div>

        {/* Receivables Due */}
        <div className="soft-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>Pending Receivables</span>
            <div style={{ padding: '6px', borderRadius: 'var(--radius-md)', background: 'var(--status-warning-bg)', color: 'var(--status-warning-text)' }}>
              <CreditCard size={18} />
            </div>
          </div>
          <div style={{ marginTop: '0.5rem' }}>
            <strong style={{ fontSize: '1.6rem', color: 'var(--status-warning-text)', fontFamily: 'var(--font-display)' }}>
              ₹{totalReceivablesDue.toLocaleString()}
            </strong>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>balance due on function days</div>
          </div>
        </div>

        {/* Net Business Profit */}
        <div className="soft-card" style={{ backgroundColor: 'var(--primary-lighter)', border: '1.5px solid var(--primary-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--primary-dark)' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Estimated Net Margin</span>
            <div style={{ padding: '6px', borderRadius: 'var(--radius-md)', background: 'var(--primary-soft)', color: 'var(--primary-dark)' }}>
              <TrendingUp size={18} />
            </div>
          </div>
          <div style={{ marginTop: '0.5rem' }}>
            <strong style={{ fontSize: '1.6rem', color: 'var(--primary-dark)', fontFamily: 'var(--font-display)' }}>
              52.4%
            </strong>
            <div style={{ fontSize: '0.78rem', color: 'var(--primary-dark)' }}>average profit margin on bookings</div>
          </div>
        </div>
      </div>

      {/* Tabs Filter */}
      <div className="chip-container" style={{ marginBottom: '1.25rem' }}>
        <button
          className={`chip-btn ${activeTab === 'profit' ? 'active' : ''}`}
          onClick={() => setActiveTab('profit')}
        >
          Event Profit Overview
        </button>
        <button
          className={`chip-btn ${activeTab === 'receivables' ? 'active' : ''}`}
          onClick={() => setActiveTab('receivables')}
        >
          Receivables (Pending Dues)
        </button>
        <button
          className={`chip-btn ${activeTab === 'money_in' ? 'active' : ''}`}
          onClick={() => setActiveTab('money_in')}
        >
          Money In ({payments.length})
        </button>
        <button
          className={`chip-btn ${activeTab === 'money_out' ? 'active' : ''}`}
          onClick={() => setActiveTab('money_out')}
        >
          Money Out (Purchases & Expenses)
        </button>
      </div>

      {/* TAB 1: EVENT PROFIT OVERVIEW */}
      {activeTab === 'profit' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {events.map((evt) => {
            const cost = evt.foodCostEstimated + evt.staffCostEstimated + evt.rentalCostEstimated + evt.otherExpensesEstimated;
            const profit = evt.agreedAmount - cost;
            const margin = evt.agreedAmount > 0 ? Math.round((profit / evt.agreedAmount) * 100) : 0;

            return (
              <div
                key={evt.id}
                className="soft-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  cursor: 'pointer'
                }}
                onClick={() => navigateToEvent(evt.id)}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <div>
                      <span className="badge badge-neutral" style={{ fontSize: '0.7rem', marginBottom: '2px' }}>
                        {evt.eventType}
                      </span>
                      <h3 style={{ fontSize: '1.1rem', lineHeight: 1.3 }}>{evt.name}</h3>
                    </div>
                    <span className="badge badge-success">{margin}% Margin</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.84rem', margin: '0.75rem 0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Revenue (Grand Total):</span>
                      <strong>₹{evt.agreedAmount.toLocaleString()}</strong>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                      <span>Food & Ingredients Cost:</span>
                      <span>₹{evt.foodCostEstimated.toLocaleString()}</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                      <span>Staff & Operations:</span>
                      <span>₹{evt.staffCostEstimated.toLocaleString()}</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                      <span>AV & Rental Gear Cost:</span>
                      <span>₹{evt.rentalCostEstimated.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    paddingTop: '0.85rem',
                    borderTop: '1px solid var(--border-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <span style={{ fontSize: '0.74rem', color: 'var(--primary-dark)', fontWeight: 600, display: 'block' }}>
                      Estimated Event Profit:
                    </span>
                    <strong style={{ fontSize: '1.25rem', color: 'var(--primary-dark)' }}>
                      ₹{profit.toLocaleString()}
                    </strong>
                  </div>

                  <button className="btn btn-secondary btn-sm">
                    View Breakdown
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: RECEIVABLES */}
      {activeTab === 'receivables' && (
        <div className="soft-card">
          <div className="soft-card-header">
            <div>
              <h3 className="soft-card-title">Pending Payment Receivables</h3>
              <p style={{ fontSize: '0.82rem' }}>Outstanding balances due from clients upon function execution</p>
            </div>
            <strong style={{ fontSize: '1.1rem', color: 'var(--status-warning-text)' }}>
              Total Due: ₹{totalReceivablesDue.toLocaleString()}
            </strong>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {events
              .filter((e) => e.balanceDue > 0)
              .map((evt) => (
                <div
                  key={evt.id}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-surface-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '10px'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.94rem' }}>{evt.name}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                      Client: {evt.customerName} ({evt.contactNumber}) • Date: {evt.eventDate}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', display: 'block' }}>
                        Agreed: ₹{evt.agreedAmount.toLocaleString()} | Paid: ₹{evt.advanceReceived.toLocaleString()}
                      </span>
                      <strong style={{ fontSize: '1.05rem', color: 'var(--status-warning-text)' }}>
                        Balance: ₹{evt.balanceDue.toLocaleString()}
                      </strong>
                    </div>

                    <button className="btn btn-primary btn-sm" onClick={onOpenRecordPayment}>
                      Collect
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* TAB 3: MONEY IN */}
      {activeTab === 'money_in' && (
        <div className="soft-card">
          <div className="soft-card-header">
            <h3 className="soft-card-title">Money In (Client Payments)</h3>
            <strong style={{ fontSize: '1.1rem', color: 'var(--status-success-text)' }}>
              ₹{totalMoneyIn.toLocaleString()}
            </strong>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {payments.map((pay) => (
              <div
                key={pay.id}
                style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--status-success-bg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--status-success-text)' }}>
                    {pay.type} - {pay.eventName}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    From: {pay.customerName} • Date: {pay.date} • Mode: {pay.paymentMethod} {pay.referenceNumber ? `(${pay.referenceNumber})` : ''}
                  </div>
                </div>
                <strong style={{ fontSize: '1.1rem', color: 'var(--status-success-text)' }}>
                  +₹{pay.amount.toLocaleString()}
                </strong>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: MONEY OUT */}
      {activeTab === 'money_out' && (
        <div className="soft-card">
          <div className="soft-card-header">
            <h3 className="soft-card-title">Money Out (Food Purchases & Operational Expenses)</h3>
            <strong style={{ fontSize: '1.1rem', color: 'var(--status-danger-text)' }}>
              ₹{totalMoneyOut.toLocaleString()}
            </strong>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {purchases.map((pur) => (
              <div
                key={pur.id}
                style={{
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-surface-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Purchase: {pur.itemName}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    Event: {pur.eventName} • Supplier: {pur.supplier} • Date: {pur.date}
                  </div>
                </div>
                <strong style={{ fontSize: '1rem', color: 'var(--status-danger-text)' }}>
                  -₹{pur.total.toLocaleString()}
                </strong>
              </div>
            ))}

            {expenses.map((exp) => (
              <div
                key={exp.id}
                style={{
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-surface-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Expense: {exp.description}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    Category: {exp.category} • Date: {exp.date} • Mode: {exp.paymentMethod}
                  </div>
                </div>
                <strong style={{ fontSize: '1rem', color: 'var(--status-danger-text)' }}>
                  -₹{exp.amount.toLocaleString()}
                </strong>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
