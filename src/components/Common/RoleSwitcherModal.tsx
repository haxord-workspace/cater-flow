import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { Shield, UserCheck, Briefcase, DollarSign, Users, X, Check } from 'lucide-react';

interface RoleSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RoleSwitcherModal: React.FC<RoleSwitcherModalProps> = ({ isOpen, onClose }) => {
  const { currentRole, setCurrentRole, showToast } = useApp();

  if (!isOpen) return null;

  const rolesList: { role: UserRole; title: string; desc: string; icon: React.ReactNode; tag: string }[] = [
    {
      role: 'company_owner',
      title: 'Company Owner (Full Access)',
      desc: 'Complete control over workspace, all event financials, pricing, staff, purchases and profitability analytics.',
      icon: <Shield size={20} className="text-primary" />,
      tag: 'Executive'
    },
    {
      role: 'manager',
      title: 'Catering & Event Manager',
      desc: 'Operational management: menus, event preparation, tasks, staff allocations and kitchen coordination.',
      icon: <Briefcase size={20} />,
      tag: 'Operations'
    },
    {
      role: 'sales',
      title: 'Sales & Quotation Coordinator',
      desc: 'Enquiries, customer relations, building food menus & light/sound quotations, converting leads.',
      icon: <DollarSign size={20} />,
      tag: 'Front Office'
    },
    {
      role: 'staff',
      title: 'Event / Kitchen Staff',
      desc: 'Simplified view: My Assigned Events, tasks, schedules. All sensitive financial records are safely hidden.',
      icon: <Users size={20} />,
      tag: 'Field Staff'
    },
    {
      role: 'super_admin',
      title: 'SaaS Platform Super Admin',
      desc: 'Multi-tenant subscription manager, company provisioning and system health.',
      icon: <UserCheck size={20} />,
      tag: 'Platform'
    }
  ];

  const handleSelect = (role: UserRole) => {
    setCurrentRole(role);
    showToast(`Switched active perspective to "${rolesList.find((r) => r.role === role)?.title}"`);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '540px' }}>
        <div className="modal-header">
          <div>
            <h3 className="soft-card-title" style={{ fontSize: '1.15rem' }}>Switch Role Perspective</h3>
            <p style={{ fontSize: '0.82rem', marginTop: '2px' }}>
              Experience CaterFlow through different team member permissions
            </p>
          </div>
          <button className="btn btn-ghost btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {rolesList.map((r) => {
            const isSelected = currentRole === r.role;
            return (
              <div
                key={r.role}
                onClick={() => handleSelect(r.role)}
                style={{
                  padding: '1rem',
                  borderRadius: 'var(--radius-lg)',
                  border: `1.5px solid ${isSelected ? 'var(--primary)' : 'var(--border-color)'}`,
                  backgroundColor: isSelected ? 'var(--primary-lighter)' : 'var(--bg-surface)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.9rem',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <div
                  style={{
                    padding: '8px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: isSelected ? 'var(--primary-soft)' : 'var(--bg-surface-secondary)',
                    color: isSelected ? 'var(--primary-dark)' : 'var(--text-secondary)',
                    marginTop: '2px'
                  }}
                >
                  {r.icon}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.94rem', color: 'var(--text-primary)' }}>
                      {r.title}
                    </span>
                    <span className="badge badge-neutral" style={{ fontSize: '0.7rem' }}>
                      {r.tag}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.82rem', marginTop: '4px', lineHeight: 1.4 }}>
                    {r.desc}
                  </p>
                </div>

                {isSelected && (
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--primary)',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <Check size={14} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
