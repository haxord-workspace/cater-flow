import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  CalendarPlus,
  FileText,
  UserPlus,
  Utensils,
  PlusCircle,
  Speaker,
  CreditCard,
  Receipt,
  X
} from 'lucide-react';

interface QuickActionSheetProps {
  onOpenCreateEvent: () => void;
  onOpenCreateCustomer: () => void;
  onOpenCreateFoodItem: () => void;
  onOpenRecordPayment: () => void;
  onOpenRecordExpense: () => void;
}

export const QuickActionSheet: React.FC<QuickActionSheetProps> = ({
  onOpenCreateEvent,
  onOpenCreateCustomer,
  onOpenCreateFoodItem,
  onOpenRecordPayment,
  onOpenRecordExpense
}) => {
  const { isQuickActionOpen, setIsQuickActionOpen, navigateToQuotationBuilder, navigateToMenuBuilder, currentRole } = useApp();

  if (!isQuickActionOpen) return null;

  const actions = [
    {
      title: 'New Quotation',
      subtitle: 'Build custom food menu & light/sound proposal',
      icon: <FileText size={20} className="text-primary" />,
      onClick: () => {
        setIsQuickActionOpen(false);
        navigateToQuotationBuilder();
      },
      show: currentRole !== 'staff'
    },
    {
      title: 'New Event',
      subtitle: 'Schedule upcoming wedding, party or corporate event',
      icon: <CalendarPlus size={20} />,
      onClick: () => {
        setIsQuickActionOpen(false);
        onOpenCreateEvent();
      },
      show: currentRole !== 'staff'
    },
    {
      title: 'New Menu Template',
      subtitle: 'Design reusable per-person feast menu',
      icon: <Utensils size={20} />,
      onClick: () => {
        setIsQuickActionOpen(false);
        navigateToMenuBuilder();
      },
      show: currentRole !== 'staff'
    },
    {
      title: 'Add Food Item',
      subtitle: 'Add starter, main course, curry or beverage',
      icon: <PlusCircle size={20} />,
      onClick: () => {
        setIsQuickActionOpen(false);
        onOpenCreateFoodItem();
      },
      show: currentRole !== 'staff'
    },
    {
      title: 'New Customer',
      subtitle: 'Add client contact info and preferences',
      icon: <UserPlus size={20} />,
      onClick: () => {
        setIsQuickActionOpen(false);
        onOpenCreateCustomer();
      },
      show: true
    },
    {
      title: 'Record Payment',
      subtitle: 'Log advance or final settlement payment',
      icon: <CreditCard size={20} />,
      onClick: () => {
        setIsQuickActionOpen(false);
        onOpenRecordPayment();
      },
      show: currentRole === 'company_owner' || currentRole === 'sales'
    },
    {
      title: 'Log Expense / Purchase',
      subtitle: 'Record ingredient bill, helper wages or fuel',
      icon: <Receipt size={20} />,
      onClick: () => {
        setIsQuickActionOpen(false);
        onOpenRecordExpense();
      },
      show: currentRole === 'company_owner' || currentRole === 'manager'
    }
  ];

  const visibleActions = actions.filter((a) => a.show);

  return (
    <div className="modal-overlay bottom-sheet" onClick={() => setIsQuickActionOpen(false)}>
      <div
        className="modal-container bottom-sheet"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '480px' }}
      >
        <div className="modal-header">
          <div>
            <h3 className="soft-card-title">Quick Action</h3>
            <p style={{ fontSize: '0.82rem', marginTop: '2px' }}>What would you like to create or record?</p>
          </div>
          <button className="btn btn-ghost btn-icon" onClick={() => setIsQuickActionOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body" style={{ padding: '0.75rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.65rem' }}>
            {visibleActions.map((action, index) => (
              <div
                key={index}
                onClick={action.onClick}
                style={{
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-surface-secondary)',
                  border: '1px solid var(--border-color)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  transition: 'all var(--transition-fast)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--primary-lighter)';
                  e.currentTarget.style.borderColor = 'var(--primary-border)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-surface-secondary)';
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                }}
              >
                <div
                  style={{
                    padding: '8px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--bg-surface)',
                    color: 'var(--primary-dark)',
                    display: 'flex'
                  }}
                >
                  {action.icon}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                    {action.title}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    {action.subtitle}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
