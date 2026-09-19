import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navigation/Navbar';
import { Sidebar } from './components/Navigation/Sidebar';
import { MobileBottomNav } from './components/Navigation/MobileBottomNav';
import { GlobalSearchModal } from './components/Navigation/GlobalSearchModal';
import { QuickActionSheet } from './components/Navigation/QuickActionSheet';
import { ToastContainer } from './components/Common/ToastContainer';

// View Components
import { DashboardView } from './components/Dashboard/DashboardView';
import { EventsListView } from './components/Events/EventsListView';
import { EventWorkspaceView } from './components/Events/EventWorkspaceView';
import { CreateEventModal } from './components/Events/CreateEventModal';
import { FoodCatalogView } from './components/Food/FoodCatalogView';
import { FoodItemModal } from './components/Food/FoodItemModal';
import { MenuListView } from './components/Menus/MenuListView';
import { MenuBuilderView } from './components/Menus/MenuBuilderView';
import { LightSoundView } from './components/LightSound/LightSoundView';
import { QuotationListView } from './components/Quotations/QuotationListView';
import { QuotationBuilderView } from './components/Quotations/QuotationBuilderView';
import { QuotationPreviewModal } from './components/Quotations/QuotationPreviewModal';
import { CustomerListView } from './components/Customers/CustomerListView';
import { CreateCustomerModal } from './components/Customers/CreateCustomerModal';
import { StaffView } from './components/Staff/StaffView';
import { FinancialsView } from './components/Financials/FinancialsView';
import { RecordPaymentModal } from './components/Financials/RecordPaymentModal';
import { RecordExpenseModal } from './components/Financials/RecordExpenseModal';
import { SettingsView } from './components/Settings/SettingsView';
import { DemoGuideView } from './components/Demo/DemoGuideView';

const MainAppLayout: React.FC = () => {
  const { currentView } = useApp();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Global Dialog Modals
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [isCreateCustomerOpen, setIsCreateCustomerOpen] = useState(false);
  const [isCreateFoodOpen, setIsCreateFoodOpen] = useState(false);
  const [isRecordPaymentOpen, setIsRecordPaymentOpen] = useState(false);
  const [isRecordExpenseOpen, setIsRecordExpenseOpen] = useState(false);

  const renderActiveView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <DashboardView
            onOpenCreateEvent={() => setIsCreateEventOpen(true)}
            onOpenCreateFoodItem={() => setIsCreateFoodOpen(true)}
          />
        );
      case 'events':
        return <EventsListView onOpenCreateEvent={() => setIsCreateEventOpen(true)} />;
      case 'event_detail':
        return (
          <EventWorkspaceView
            onOpenRecordPayment={() => setIsRecordPaymentOpen(true)}
            onOpenRecordExpense={() => setIsRecordExpenseOpen(true)}
          />
        );
      case 'quotations':
        return <QuotationListView />;
      case 'quotation_builder':
        return <QuotationBuilderView />;
      case 'quotation_preview':
        return <QuotationPreviewModal />;
      case 'menus':
        return <MenuListView />;
      case 'menu_builder':
        return <MenuBuilderView />;
      case 'food_catalog':
        return <FoodCatalogView onOpenCreateFoodItem={() => setIsCreateFoodOpen(true)} />;
      case 'light_sound':
        return <LightSoundView />;
      case 'customers':
        return <CustomerListView onOpenCreateCustomer={() => setIsCreateCustomerOpen(true)} />;
      case 'staff':
        return <StaffView />;
      case 'financials':
        return (
          <FinancialsView
            onOpenRecordPayment={() => setIsRecordPaymentOpen(true)}
            onOpenRecordExpense={() => setIsRecordExpenseOpen(true)}
          />
        );
      case 'settings':
        return <SettingsView />;
      case 'demo_guide':
        return <DemoGuideView />;
      default:
        return (
          <DashboardView
            onOpenCreateEvent={() => setIsCreateEventOpen(true)}
            onOpenCreateFoodItem={() => setIsCreateFoodOpen(true)}
          />
        );
    }
  };

  return (
    <div className="app-container">
      {/* Desktop Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggleCollapsed={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Workspace Body */}
      <div className="main-wrapper">
        <Navbar />
        <main>{renderActiveView()}</main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />

      {/* Global Interactive Dialogs & Modals */}
      <GlobalSearchModal />
      <QuickActionSheet
        onOpenCreateEvent={() => setIsCreateEventOpen(true)}
        onOpenCreateCustomer={() => setIsCreateCustomerOpen(true)}
        onOpenCreateFoodItem={() => setIsCreateFoodOpen(true)}
        onOpenRecordPayment={() => setIsRecordPaymentOpen(true)}
        onOpenRecordExpense={() => setIsRecordExpenseOpen(true)}
      />
      <CreateEventModal
        isOpen={isCreateEventOpen}
        onClose={() => setIsCreateEventOpen(false)}
      />
      <CreateCustomerModal
        isOpen={isCreateCustomerOpen}
        onClose={() => setIsCreateCustomerOpen(false)}
      />
      <FoodItemModal
        isOpen={isCreateFoodOpen}
        onClose={() => setIsCreateFoodOpen(false)}
      />
      <RecordPaymentModal
        isOpen={isRecordPaymentOpen}
        onClose={() => setIsRecordPaymentOpen(false)}
      />
      <RecordExpenseModal
        isOpen={isRecordExpenseOpen}
        onClose={() => setIsRecordExpenseOpen(false)}
      />

      {/* Toast Notification Container */}
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainAppLayout />
    </AppProvider>
  );
}

export default App;
