import React, { useState } from 'react';
import { useApp, AppView } from '../../context/AppContext';
import {
  LayoutDashboard,
  Calendar,
  FileText,
  Plus,
  MoreHorizontal,
  Utensils,
  BookOpen,
  Speaker,
  UserCheck,
  DollarSign,
  Settings,
  Users,
  Sparkles,
  X
} from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    setIsQuickActionOpen,
    currentRole
  } = useApp();

  const [isMoreSheetOpen, setIsMoreSheetOpen] = useState(false);
  const isStaff = currentRole === 'staff';

  const handleNav = (view: AppView) => {
    setCurrentView(view);
    setIsMoreSheetOpen(false);
  };

  const moreItems: { id: AppView; label: string; icon: React.ReactNode; hideForStaff?: boolean }[] = [
    { id: 'menus', label: 'Food Menus', icon: <Utensils size={20} />, hideForStaff: true },
    { id: 'food_catalog', label: 'Food Catalog', icon: <BookOpen size={20} />, hideForStaff: true },
    { id: 'light_sound', label: 'Light & Sound', icon: <Speaker size={20} />, hideForStaff: true },
    { id: 'customers', label: 'Customers', icon: <Users size={20} />, hideForStaff: true },
    { id: 'staff', label: isStaff ? 'My Schedule' : 'Staff & Tasks', icon: <UserCheck size={20} /> },
    { id: 'financials', label: 'Accounting & Profit', icon: <DollarSign size={20} />, hideForStaff: true },
    { id: 'demo_guide', label: 'Interactive Demo', icon: <Sparkles size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} />, hideForStaff: true }
  ];

  return (
    <>
      <nav className="mobile-bottom-nav">
        <button
          className={`mobile-nav-item ${currentView === 'dashboard' ? 'active' : ''}`}
          onClick={() => handleNav('dashboard')}
        >
          <LayoutDashboard size={20} />
          <span>Home</span>
        </button>

        <button
          className={`mobile-nav-item ${currentView === 'events' || currentView === 'event_detail' ? 'active' : ''}`}
          onClick={() => handleNav('events')}
        >
          <Calendar size={20} />
          <span>Events</span>
        </button>

        {/* Center Floating Action Button */}
        <button
          className="mobile-nav-create-btn"
          onClick={() => setIsQuickActionOpen(true)}
          title="Quick Create"
        >
          <Plus size={24} />
        </button>

        {!isStaff ? (
          <button
            className={`mobile-nav-item ${currentView === 'quotations' || currentView === 'quotation_builder' || currentView === 'quotation_preview' ? 'active' : ''}`}
            onClick={() => handleNav('quotations')}
          >
            <FileText size={20} />
            <span>Quotes</span>
          </button>
        ) : (
          <button
            className={`mobile-nav-item ${currentView === 'staff' ? 'active' : ''}`}
            onClick={() => handleNav('staff')}
          >
            <UserCheck size={20} />
            <span>Schedule</span>
          </button>
        )}

        <button
          className={`mobile-nav-item ${isMoreSheetOpen ? 'active' : ''}`}
          onClick={() => setIsMoreSheetOpen(true)}
        >
          <MoreHorizontal size={20} />
          <span>More</span>
        </button>
      </nav>

      {/* Mobile More Bottom Sheet */}
      {isMoreSheetOpen && (
        <div className="modal-overlay bottom-sheet" onClick={() => setIsMoreSheetOpen(false)}>
          <div className="modal-container bottom-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="soft-card-title">More Modules & Tools</h3>
              <button className="btn btn-ghost btn-icon" onClick={() => setIsMoreSheetOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {moreItems
                .filter((item) => !(isStaff && item.hideForStaff))
                .map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNav(item.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: currentView === item.id ? 'var(--primary-soft)' : 'var(--bg-surface-secondary)',
                      color: currentView === item.id ? 'var(--primary-dark)' : 'var(--text-primary)',
                      border: '1px solid var(--border-color)',
                      fontWeight: 500,
                      fontSize: '0.88rem',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <span style={{ color: currentView === item.id ? 'var(--primary-dark)' : 'var(--primary)' }}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
