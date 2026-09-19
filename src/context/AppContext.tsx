import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  CompanyWorkspace,
  Customer,
  EquipmentItem,
  EventRecord,
  EventStatus,
  EventTask,
  ExpenseRecord,
  FoodCategory,
  FoodItem,
  LightSoundPackage,
  LiveCounter,
  PaymentTransaction,
  PurchaseItem,
  Quotation,
  QuotationLineItem,
  ReusableMenu,
  StaffMember,
  UserRole
} from '../types';
import {
  initialCompany,
  initialCustomers,
  initialEquipment,
  initialEvents,
  initialExpenses,
  initialFoodItems,
  initialLightSoundPackages,
  initialLiveCounters,
  initialPayments,
  initialPurchases,
  initialQuotations,
  initialReusableMenus,
  initialStaff,
  initialTasks
} from '../data/initialData';

export type AppView =
  | 'dashboard'
  | 'events'
  | 'event_detail'
  | 'quotations'
  | 'quotation_builder'
  | 'quotation_preview'
  | 'menus'
  | 'menu_builder'
  | 'food_catalog'
  | 'light_sound'
  | 'customers'
  | 'staff'
  | 'financials'
  | 'settings'
  | 'demo_guide';

interface ToastInfo {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'danger';
}

interface AppContextType {
  // Navigation & Role
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  selectedEventId: string | null;
  setSelectedEventId: (id: string | null) => void;
  selectedQuotationId: string | null;
  setSelectedQuotationId: (id: string | null) => void;
  selectedMenuId: string | null;
  setSelectedMenuId: (id: string | null) => void;
  
  // Role
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  
  // Company & Modules
  company: CompanyWorkspace;
  updateCompany: (updated: Partial<CompanyWorkspace>) => void;
  
  // Data entities
  events: EventRecord[];
  customers: Customer[];
  quotations: Quotation[];
  foodItems: FoodItem[];
  reusableMenus: ReusableMenu[];
  liveCounters: LiveCounter[];
  equipmentList: EquipmentItem[];
  lightSoundPackages: LightSoundPackage[];
  staff: StaffMember[];
  tasks: EventTask[];
  purchases: PurchaseItem[];
  expenses: ExpenseRecord[];
  payments: PaymentTransaction[];
  
  // CRUD & Actions
  addEvent: (event: Omit<EventRecord, 'id' | 'advanceReceived' | 'balanceDue'>) => EventRecord;
  updateEvent: (id: string, updates: Partial<EventRecord>) => void;
  updateEventStatus: (id: string, status: EventStatus) => void;
  
  addCustomer: (customer: Omit<Customer, 'id' | 'totalEventsCount'>) => Customer;
  
  addQuotation: (quotation: Omit<Quotation, 'id' | 'quotationNumber'>) => Quotation;
  updateQuotation: (id: string, updates: Partial<Quotation>) => void;
  convertQuotationToEvent: (quotationId: string) => EventRecord;
  
  addFoodItem: (item: Omit<FoodItem, 'id'>) => FoodItem;
  updateFoodItem: (id: string, updates: Partial<FoodItem>) => void;
  
  addReusableMenu: (menu: Omit<ReusableMenu, 'id'>) => ReusableMenu;
  updateReusableMenu: (id: string, updates: Partial<ReusableMenu>) => void;
  
  addLiveCounter: (counter: Omit<LiveCounter, 'id'>) => LiveCounter;
  
  addEquipmentItem: (item: Omit<EquipmentItem, 'id'>) => EquipmentItem;
  addLightSoundPackage: (pkg: Omit<LightSoundPackage, 'id'>) => LightSoundPackage;
  
  addStaffMember: (member: Omit<StaffMember, 'id'>) => StaffMember;
  
  toggleTask: (taskId: string) => void;
  addTask: (task: Omit<EventTask, 'id'>) => void;
  
  recordPayment: (payment: Omit<PaymentTransaction, 'id'>) => void;
  recordPurchase: (purchase: Omit<PurchaseItem, 'id'>) => void;
  recordExpense: (expense: Omit<ExpenseRecord, 'id'>) => void;
  
  // UI Helpers
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isQuickActionOpen: boolean;
  setIsQuickActionOpen: (open: boolean) => void;
  toasts: ToastInfo[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'danger') => void;
  removeToast: (id: string) => void;
  
  // Convenience navigation helpers
  navigateToEvent: (eventId: string) => void;
  navigateToQuotationPreview: (quotationId: string) => void;
  navigateToQuotationBuilder: (quotationId?: string) => void;
  navigateToMenuBuilder: (menuId?: string) => void;
  resetToSampleData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [selectedEventId, setSelectedEventId] = useState<string | null>('evt-01');
  const [selectedQuotationId, setSelectedQuotationId] = useState<string | null>('quot-01');
  const [selectedMenuId, setSelectedMenuId] = useState<string | null>('menu-01');
  const [currentRole, setCurrentRole] = useState<UserRole>('company_owner');
  
  // UI Dialog states
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isQuickActionOpen, setIsQuickActionOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  // State Entities
  const [company, setCompany] = useState<CompanyWorkspace>(initialCompany);
  const [events, setEvents] = useState<EventRecord[]>(initialEvents);
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [quotations, setQuotations] = useState<Quotation[]>(initialQuotations);
  const [foodItems, setFoodItems] = useState<FoodItem[]>(initialFoodItems);
  const [reusableMenus, setReusableMenus] = useState<ReusableMenu[]>(initialReusableMenus);
  const [liveCounters, setLiveCounters] = useState<LiveCounter[]>(initialLiveCounters);
  const [equipmentList, setEquipmentList] = useState<EquipmentItem[]>(initialEquipment);
  const [lightSoundPackages, setLightSoundPackages] = useState<LightSoundPackage[]>(initialLightSoundPackages);
  const [staff, setStaff] = useState<StaffMember[]>(initialStaff);
  const [tasks, setTasks] = useState<EventTask[]>(initialTasks);
  const [purchases, setPurchases] = useState<PurchaseItem[]>(initialPurchases);
  const [expenses, setExpenses] = useState<ExpenseRecord[]>(initialExpenses);
  const [payments, setPayments] = useState<PaymentTransaction[]>(initialPayments);

  // Toast notifications
  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'danger' = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const updateCompany = (updated: Partial<CompanyWorkspace>) => {
    setCompany((prev) => ({ ...prev, ...updated }));
    showToast('Company settings updated');
  };

  // Event Handlers
  const addEvent = (eventData: Omit<EventRecord, 'id' | 'advanceReceived' | 'balanceDue'>) => {
    const newId = `evt-${Date.now()}`;
    const newEvent: EventRecord = {
      ...eventData,
      id: newId,
      advanceReceived: 0,
      balanceDue: eventData.agreedAmount
    };
    setEvents((prev) => [newEvent, ...prev]);
    showToast(`Event "${newEvent.name}" created successfully`);
    return newEvent;
  };

  const updateEvent = (id: string, updates: Partial<EventRecord>) => {
    setEvents((prev) =>
      prev.map((evt) => {
        if (evt.id === id) {
          const agreed = updates.agreedAmount !== undefined ? updates.agreedAmount : evt.agreedAmount;
          const advance = updates.advanceReceived !== undefined ? updates.advanceReceived : evt.advanceReceived;
          const balance = agreed - advance;
          return { ...evt, ...updates, balanceDue: balance >= 0 ? balance : 0 };
        }
        return evt;
      })
    );
    showToast('Event details updated');
  };

  const updateEventStatus = (id: string, status: EventStatus) => {
    setEvents((prev) =>
      prev.map((evt) => (evt.id === id ? { ...evt, status } : evt))
    );
    showToast(`Event status changed to "${status}"`);
  };

  const addCustomer = (customerData: Omit<Customer, 'id' | 'totalEventsCount'>) => {
    const newId = `cust-${Date.now()}`;
    const newCust: Customer = {
      ...customerData,
      id: newId,
      totalEventsCount: 0
    };
    setCustomers((prev) => [newCust, ...prev]);
    showToast(`Customer "${newCust.name}" added`);
    return newCust;
  };

  // Quotation Handlers
  const addQuotation = (quotationData: Omit<Quotation, 'id' | 'quotationNumber'>) => {
    const count = quotations.length + 1;
    const num = `QT-2026-${String(count + 40).padStart(4, '0')}`;
    const newId = `quot-${Date.now()}`;
    const newQuot: Quotation = {
      ...quotationData,
      id: newId,
      quotationNumber: num
    };
    setQuotations((prev) => [newQuot, ...prev]);
    showToast(`Quotation ${num} generated successfully!`);
    return newQuot;
  };

  const updateQuotation = (id: string, updates: Partial<Quotation>) => {
    setQuotations((prev) =>
      prev.map((q) => (q.id === id ? { ...q, ...updates } : q))
    );
    showToast('Quotation updated');
  };

  const convertQuotationToEvent = (quotationId: string): EventRecord => {
    const quot = quotations.find((q) => q.id === quotationId);
    if (!quot) throw new Error('Quotation not found');

    // Extract food menu if available
    const foodMenuItem = quot.items.find((i) => i.category === 'Food Menu');
    const liveCounterItems = quot.items.filter((i) => i.category === 'Live Counters');
    const lightSoundItems = quot.items.filter((i) => i.category === 'Light & Sound');

    const newEvent: EventRecord = {
      id: `evt-${Date.now()}`,
      name: quot.eventName || `${quot.customerName}'s ${quot.eventType}`,
      customerId: quot.customerId,
      customerName: quot.customerName,
      contactNumber: quot.customerPhone,
      contactEmail: quot.customerEmail,
      eventType: quot.eventType,
      eventDate: quot.eventDate,
      startTime: '17:30',
      endTime: '22:30',
      venue: quot.venue,
      guestCount: quot.guestCount,
      status: 'Confirmed',
      quotationId: quot.id,
      agreedAmount: quot.grandTotal,
      advanceReceived: quot.advanceRequired || 0,
      balanceDue: quot.grandTotal - (quot.advanceRequired || 0),
      foodCostEstimated: Math.round(quot.grandTotal * 0.32),
      staffCostEstimated: Math.round(quot.grandTotal * 0.08),
      rentalCostEstimated: Math.round(quot.grandTotal * 0.05),
      otherExpensesEstimated: Math.round(quot.grandTotal * 0.03),
      selectedMenuId: foodMenuItem?.menuId,
      notes: `Converted from Quotation ${quot.quotationNumber}. Notes: ${quot.notes || 'None'}`
    };

    setEvents((prev) => [newEvent, ...prev]);
    updateQuotation(quotationId, { status: 'Converted', eventId: newEvent.id });
    
    // Auto record advance payment if specified
    if (quot.advanceRequired && quot.advanceRequired > 0) {
      recordPayment({
        eventId: newEvent.id,
        eventName: newEvent.name,
        customerId: quot.customerId,
        customerName: quot.customerName,
        date: new Date().toISOString().split('T')[0],
        type: 'Advance Payment',
        amount: quot.advanceRequired,
        paymentMethod: 'Bank Transfer',
        notes: `Advance payment upon quotation conversion (${quot.quotationNumber})`
      });
    }

    showToast(`Quotation converted to Confirmed Event "${newEvent.name}"!`);
    return newEvent;
  };

  // Food & Menu Handlers
  const addFoodItem = (itemData: Omit<FoodItem, 'id'>) => {
    const newItem: FoodItem = {
      ...itemData,
      id: `food-${Date.now()}`
    };
    setFoodItems((prev) => [...prev, newItem]);
    showToast(`Food item "${newItem.name}" added to catalog`);
    return newItem;
  };

  const updateFoodItem = (id: string, updates: Partial<FoodItem>) => {
    setFoodItems((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...updates } : f))
    );
    showToast('Food item updated');
  };

  const addReusableMenu = (menuData: Omit<ReusableMenu, 'id'>) => {
    const newMenu: ReusableMenu = {
      ...menuData,
      id: `menu-${Date.now()}`
    };
    setReusableMenus((prev) => [...prev, newMenu]);
    showToast(`Reusable menu "${newMenu.name}" created!`);
    return newMenu;
  };

  const updateReusableMenu = (id: string, updates: Partial<ReusableMenu>) => {
    setReusableMenus((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updates } : m))
    );
    showToast('Menu updated');
  };

  const addLiveCounter = (counterData: Omit<LiveCounter, 'id'>) => {
    const newCounter: LiveCounter = {
      ...counterData,
      id: `counter-${Date.now()}`
    };
    setLiveCounters((prev) => [...prev, newCounter]);
    showToast(`Live counter "${newCounter.name}" added`);
    return newCounter;
  };

  const addEquipmentItem = (itemData: Omit<EquipmentItem, 'id'>) => {
    const newItem: EquipmentItem = {
      ...itemData,
      id: `eq-${Date.now()}`
    };
    setEquipmentList((prev) => [...prev, newItem]);
    showToast(`Equipment "${newItem.name}" added`);
    return newItem;
  };

  const addLightSoundPackage = (pkgData: Omit<LightSoundPackage, 'id'>) => {
    const newPkg: LightSoundPackage = {
      ...pkgData,
      id: `lsp-${Date.now()}`
    };
    setLightSoundPackages((prev) => [...prev, newPkg]);
    showToast(`Package "${newPkg.name}" added`);
    return newPkg;
  };

  const addStaffMember = (memberData: Omit<StaffMember, 'id'>) => {
    const newMember: StaffMember = {
      ...memberData,
      id: `staff-${Date.now()}`
    };
    setStaff((prev) => [...prev, newMember]);
    showToast(`Staff member "${newMember.name}" added`);
    return newMember;
  };

  const toggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, isCompleted: !t.isCompleted } : t))
    );
  };

  const addTask = (taskData: Omit<EventTask, 'id'>) => {
    const newTask: EventTask = {
      ...taskData,
      id: `tsk-${Date.now()}`
    };
    setTasks((prev) => [newTask, ...prev]);
    showToast('Task added');
  };

  const recordPayment = (paymentData: Omit<PaymentTransaction, 'id'>) => {
    const newPayment: PaymentTransaction = {
      ...paymentData,
      id: `pay-${Date.now()}`
    };
    setPayments((prev) => [newPayment, ...prev]);

    // Update event advance/balance
    if (paymentData.eventId) {
      setEvents((prev) =>
        prev.map((evt) => {
          if (evt.id === paymentData.eventId) {
            const newAdvance = evt.advanceReceived + paymentData.amount;
            const newBal = evt.agreedAmount - newAdvance;
            return {
              ...evt,
              advanceReceived: newAdvance,
              balanceDue: newBal >= 0 ? newBal : 0
            };
          }
          return evt;
        })
      );
    }

    showToast(`Recorded payment of ₹${paymentData.amount.toLocaleString()} successfully`);
  };

  const recordPurchase = (purchaseData: Omit<PurchaseItem, 'id'>) => {
    const newPur: PurchaseItem = {
      ...purchaseData,
      id: `pur-${Date.now()}`
    };
    setPurchases((prev) => [newPur, ...prev]);

    // Update event estimated food costs if linked
    if (purchaseData.eventId) {
      setEvents((prev) =>
        prev.map((evt) => {
          if (evt.id === purchaseData.eventId) {
            return {
              ...evt,
              foodCostEstimated: evt.foodCostEstimated + purchaseData.total
            };
          }
          return evt;
        })
      );
    }
    showToast(`Purchase of ${purchaseData.itemName} logged`);
  };

  const recordExpense = (expenseData: Omit<ExpenseRecord, 'id'>) => {
    const newExp: ExpenseRecord = {
      ...expenseData,
      id: `exp-${Date.now()}`
    };
    setExpenses((prev) => [newExp, ...prev]);

    // Update event other expenses if linked
    if (expenseData.eventId) {
      setEvents((prev) =>
        prev.map((evt) => {
          if (evt.id === expenseData.eventId) {
            return {
              ...evt,
              otherExpensesEstimated: evt.otherExpensesEstimated + expenseData.amount
            };
          }
          return evt;
        })
      );
    }
    showToast(`Expense of ₹${expenseData.amount.toLocaleString()} logged`);
  };

  // Nav shortcuts
  const navigateToEvent = (eventId: string) => {
    setSelectedEventId(eventId);
    setCurrentView('event_detail');
  };

  const navigateToQuotationPreview = (quotationId: string) => {
    setSelectedQuotationId(quotationId);
    setCurrentView('quotation_preview');
  };

  const navigateToQuotationBuilder = (quotationId?: string) => {
    setSelectedQuotationId(quotationId || null);
    setCurrentView('quotation_builder');
  };

  const navigateToMenuBuilder = (menuId?: string) => {
    setSelectedMenuId(menuId || null);
    setCurrentView('menu_builder');
  };

  const resetToSampleData = () => {
    setEvents(initialEvents);
    setQuotations(initialQuotations);
    setFoodItems(initialFoodItems);
    setReusableMenus(initialReusableMenus);
    setLiveCounters(initialLiveCounters);
    setEquipmentList(initialEquipment);
    setLightSoundPackages(initialLightSoundPackages);
    setStaff(initialStaff);
    setTasks(initialTasks);
    setPurchases(initialPurchases);
    setExpenses(initialExpenses);
    setPayments(initialPayments);
    setCustomers(initialCustomers);
    showToast('Sample dataset restored to initial state');
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedEventId,
        setSelectedEventId,
        selectedQuotationId,
        setSelectedQuotationId,
        selectedMenuId,
        setSelectedMenuId,
        currentRole,
        setCurrentRole,
        company,
        updateCompany,
        events,
        customers,
        quotations,
        foodItems,
        reusableMenus,
        liveCounters,
        equipmentList,
        lightSoundPackages,
        staff,
        tasks,
        purchases,
        expenses,
        payments,
        addEvent,
        updateEvent,
        updateEventStatus,
        addCustomer,
        addQuotation,
        updateQuotation,
        convertQuotationToEvent,
        addFoodItem,
        updateFoodItem,
        addReusableMenu,
        updateReusableMenu,
        addLiveCounter,
        addEquipmentItem,
        addLightSoundPackage,
        addStaffMember,
        toggleTask,
        addTask,
        recordPayment,
        recordPurchase,
        recordExpense,
        isSearchOpen,
        setIsSearchOpen,
        isQuickActionOpen,
        setIsQuickActionOpen,
        toasts,
        showToast,
        removeToast,
        navigateToEvent,
        navigateToQuotationPreview,
        navigateToQuotationBuilder,
        navigateToMenuBuilder,
        resetToSampleData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
