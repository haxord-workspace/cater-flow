import React from 'react';
import { useApp, AppView } from '../../context/AppContext';
import {
  LayoutDashboard,
  Calendar,
  FileText,
  Users,
  Utensils,
  BookOpen,
  Speaker,
  UserCheck,
  Receipt,
  DollarSign,
  Settings,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapsed: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggleCollapsed }) => {
  const {
    currentView,
    setCurrentView,
    events,
    quotations,
    foodItems,
    reusableMenus,
    company,
    currentRole
  } = useApp();

  const isStaff = currentRole === 'staff';
  const isSales = currentRole === 'sales';

  const navItems: {
    id: AppView;
    label: string;
    icon: React.ReactNode;
    badge?: number | string;
    moduleEnabled?: boolean;
    hideForRole?: boolean;
  }[] = [
    {
      id: 'dashboard',
      label: 'Home',
      icon: <LayoutDashboard size={18} />
    },
    {
      id: 'events',
      label: 'Events',
      icon: <Calendar size={18} />,
      badge: events.length
    },
    {
      id: 'quotations',
      label: 'Quotations',
      icon: <FileText size={18} />,
      badge: quotations.filter((q) => q.status === 'Sent' || q.status === 'Draft').length,
      hideForRole: isStaff
    },
    {
      id: 'customers',
      label: 'Customers',
      icon: <Users size={18} />,
      hideForRole: isStaff
    },
    {
      id: 'menus',
      label: 'Food Menus',
      icon: <Utensils size={18} />,
      badge: reusableMenus.length,
      moduleEnabled: company.enabledModules.menus,
      hideForRole: isStaff
    },
    {
      id: 'food_catalog',
      label: 'Food Catalog',
      icon: <BookOpen size={18} />,
      badge: foodItems.length,
      moduleEnabled: company.enabledModules.food,
      hideForRole: isStaff
    },
    {
      id: 'light_sound',
      label: 'Light & Sound',
      icon: <Speaker size={18} />,
      moduleEnabled: company.enabledModules.lightAndSound,
      hideForRole: isStaff
    },
    {
      id: 'staff',
      label: isStaff ? 'My Schedule' : 'Staff & Tasks',
      icon: <UserCheck size={18} />,
      moduleEnabled: company.enabledModules.staff
    },
    {
      id: 'financials',
      label: 'Accounting & Profit',
      icon: <DollarSign size={18} />,
      moduleEnabled: company.enabledModules.accounting,
      hideForRole: isStaff || isSales
    },
    {
      id: 'demo_guide',
      label: 'Interactive Demo',
      icon: <Sparkles size={18} />
    },
    {
      id: 'settings',
      label: 'Company Settings',
      icon: <Settings size={18} />,
      hideForRole: isStaff || isSales
    }
  ];

  const visibleNavItems = navItems.filter((item) => {
    if (item.hideForRole) return false;
    if (item.moduleEnabled === false) return false;
    return true;
  });

  return (
    <aside className={`desktop-sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="brand-wrapper" onClick={() => setCurrentView('dashboard')} style={{ cursor: 'pointer' }}>
          <div className="brand-icon">{company.logoText}</div>
          {!collapsed && (
            <div>
              <div className="brand-text">{company.name}</div>
              <div className="brand-tagline">{company.tagline.slice(0, 24)}...</div>
            </div>
          )}
        </div>
        <button
          className="btn btn-ghost btn-icon btn-sm"
          onClick={onToggleCollapsed}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          style={{ display: 'none' }}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <div className="sidebar-content">
        {!collapsed && <div className="sidebar-section-title">Navigation</div>}
        {visibleNavItems.map((item) => {
          const isActive =
            currentView === item.id ||
            (item.id === 'events' && currentView === 'event_detail') ||
            (item.id === 'quotations' && (currentView === 'quotation_builder' || currentView === 'quotation_preview')) ||
            (item.id === 'menus' && currentView === 'menu_builder');

          return (
            <button
              key={item.id}
              className={`nav-item-btn ${isActive ? 'active' : ''}`}
              onClick={() => setCurrentView(item.id)}
              title={collapsed ? item.label : undefined}
            >
              <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                {item.icon}
              </span>
              {!collapsed && <span>{item.label}</span>}
              {!collapsed && item.badge !== undefined && (
                <span className="nav-badge">{item.badge}</span>
              )}
            </button>
          );
        })}
      </div>

      <div className="sidebar-footer">
        {!collapsed && (
          <div className="company-pill">
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'var(--status-success-text)'
              }}
            />
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontWeight: 600, fontSize: '0.8rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {company.location}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                GST: {company.gstNumber}
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
