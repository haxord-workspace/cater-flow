import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Plus, UserCheck, Shield, Sparkles, RefreshCw } from 'lucide-react';
import { RoleSwitcherModal } from '../Common/RoleSwitcherModal';

interface NavbarProps {
  onToggleSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const {
    setIsSearchOpen,
    setIsQuickActionOpen,
    currentRole,
    company,
    setCurrentView,
    resetToSampleData
  } = useApp();

  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

  const getRoleLabel = () => {
    switch (currentRole) {
      case 'company_owner': return 'Owner';
      case 'manager': return 'Manager';
      case 'sales': return 'Sales';
      case 'staff': return 'Staff';
      case 'super_admin': return 'Super Admin';
    }
  };

  return (
    <>
      <header className="top-navbar">
        <div className="top-nav-left" style={{ minWidth: 0, flexShrink: 1 }}>
          {/* Brand on mobile */}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', minWidth: 0 }}
            onClick={() => setCurrentView('dashboard')}
          >
            <div className="brand-icon" style={{ width: '32px', height: '32px', fontSize: '0.95rem', flexShrink: 0 }}>
              {company.logoText}
            </div>
            <div style={{ minWidth: 0, overflow: 'hidden' }}>
              <div
                className="brand-text"
                style={{
                  fontSize: '0.98rem',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap'
                }}
              >
                {company.name}
              </div>
            </div>
          </div>
        </div>

        <div className="top-nav-right" style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
          {/* Quick global search trigger */}
          <button
            className="search-trigger-btn"
            onClick={() => setIsSearchOpen(true)}
            title="Search anywhere (Cmd+K)"
            style={{ padding: '0.4rem 0.6rem' }}
          >
            <Search size={15} />
          </button>

          {/* Quick Create Action */}
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setIsQuickActionOpen(true)}
            style={{ gap: '4px', padding: '0.4rem 0.65rem', fontSize: '0.8rem' }}
          >
            <Plus size={15} />
            <span>Create</span>
          </button>

          {/* Role switcher pill */}
          <button
            className="chip-btn"
            onClick={() => setIsRoleModalOpen(true)}
            style={{
              padding: '0.35rem 0.6rem',
              backgroundColor: 'var(--primary-soft)',
              borderColor: 'var(--primary-border)',
              color: 'var(--primary-dark)',
              fontWeight: 600,
              fontSize: '0.74rem'
            }}
            title="Switch User Role"
          >
            <Shield size={13} />
            <span>{getRoleLabel()}</span>
          </button>
        </div>
      </header>

      <RoleSwitcherModal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
      />
    </>
  );
};
