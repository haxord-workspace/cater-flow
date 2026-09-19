// Types for CaterFlow SaaS Platform

export type UserRole = 'super_admin' | 'company_owner' | 'manager' | 'sales' | 'staff';

export type EventStatus =
  | 'Enquiry'
  | 'Quotation Draft'
  | 'Quotation Sent'
  | 'Negotiation'
  | 'Confirmed'
  | 'Preparation'
  | 'In Progress'
  | 'Completed'
  | 'Cancelled';

export type EventType =
  | 'Wedding'
  | 'Reception'
  | 'Engagement'
  | 'Birthday'
  | 'Corporate'
  | 'Conference'
  | 'House Function'
  | 'Religious Function'
  | 'Other';

export type FoodCategory =
  | 'Welcome Drinks'
  | 'Starters'
  | 'Main Course'
  | 'Rice'
  | 'Breads'
  | 'Curries'
  | 'Vegetarian'
  | 'Non Vegetarian'
  | 'Salads'
  | 'Pickles'
  | 'Desserts'
  | 'Ice Cream'
  | 'Fruits'
  | 'Tea & Coffee'
  | 'Juices'
  | 'Live Counters'
  | 'Other';

export type FoodUnit =
  | 'Per Person'
  | 'Per Plate'
  | 'Per Piece'
  | 'Per KG'
  | 'Per Litre'
  | 'Per Bowl'
  | 'Per Tray'
  | 'Fixed';

export interface FoodItem {
  id: string;
  name: string;
  category: FoodCategory;
  description: string;
  image?: string;
  unit: FoodUnit;
  sellingRate: number;
  estimatedCost: number;
  dietary: 'veg' | 'non-veg' | 'vegan';
  preparationNotes?: string;
  isAvailable: boolean;
  isActive: boolean;
}

export interface LiveCounter {
  id: string;
  name: string;
  description: string;
  rate: number;
  durationHours: number;
  staffRequired: number;
  equipmentRequired: string[];
  notes?: string;
  image?: string;
}

export interface MenuItemRef {
  foodItemId: string;
  customNotes?: string;
}

export interface ReusableMenu {
  id: string;
  name: string;
  pricingType: 'Per Person' | 'Fixed Package' | 'Custom Pricing';
  ratePerPerson: number;
  minGuestCount?: number;
  categories: {
    categoryName: FoodCategory;
    items: string[]; // food item names or IDs
  }[];
  liveCounters: string[]; // live counter IDs
  notes?: string;
}

export type EquipmentCategory =
  | 'Speakers'
  | 'Subwoofers'
  | 'Amplifiers'
  | 'Wireless Microphones'
  | 'Wired Microphones'
  | 'Mixing Consoles'
  | 'DJ Equipment'
  | 'Moving Head Lights'
  | 'LED Par Lights'
  | 'Follow Spot Lights'
  | 'Stage Lights'
  | 'Truss'
  | 'Other Equipment';

export type RentalUnit = 'Per Event' | 'Per Day' | 'Per Hour' | 'Per Piece';
export type EquipmentStatus = 'Available' | 'Reserved' | 'Out for Event' | 'Maintenance' | 'Damaged';

export interface EquipmentItem {
  id: string;
  name: string;
  category: EquipmentCategory;
  image?: string;
  description: string;
  totalQuantity: number;
  availableQuantity: number;
  rentalRate: number;
  rentalUnit: RentalUnit;
  condition: 'Excellent' | 'Good' | 'Fair';
  status: EquipmentStatus;
  notes?: string;
}

export interface LightSoundPackage {
  id: string;
  name: string;
  description: string;
  rate: number;
  rentalUnit: RentalUnit;
  equipmentList: {
    equipmentId: string;
    quantity: number;
    name: string;
  }[];
  includesOperator: boolean;
  includesInstallation: boolean;
  includesTransport: boolean;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  address?: string;
  notes?: string;
  totalEventsCount: number;
}

export interface QuotationLineItem {
  id: string;
  category:
    | 'Food Menu'
    | 'Additional Food'
    | 'Drinks'
    | 'Live Counters'
    | 'Light & Sound'
    | 'Equipment Rental'
    | 'Transportation'
    | 'Staff / Service'
    | 'Other Charges';
  name: string;
  description?: string;
  quantity: number;
  unit: string;
  rate: number;
  discount: number;
  total: number;
  // If attached to a menu
  menuId?: string;
  menuDetails?: {
    categories: { categoryName: string; items: string[] }[];
  };
}

export interface Quotation {
  id: string;
  quotationNumber: string;
  date: string;
  validUntil: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  eventId?: string;
  eventName: string;
  eventType: EventType;
  eventDate: string;
  venue: string;
  guestCount: number;
  items: QuotationLineItem[];
  subtotal: number;
  discount: number;
  additionalCharges: number;
  tax: number;
  taxPercentage: number;
  grandTotal: number;
  advanceRequired: number;
  balance: number;
  paymentScheduleNotes?: string;
  termsAndConditions?: string[];
  status: 'Draft' | 'Sent' | 'Approved' | 'Declined' | 'Converted';
  notes?: string;
}

export interface StaffMember {
  id: string;
  name: string;
  phone: string;
  role:
    | 'Manager'
    | 'Supervisor'
    | 'Chef'
    | 'Cook'
    | 'Kitchen Staff'
    | 'Service Staff'
    | 'Sound Operator'
    | 'Lighting Operator'
    | 'Driver'
    | 'Helper';
  isAvailable: boolean;
  dailyRate: number;
  assignedEventIds: string[];
}

export interface EventTask {
  id: string;
  eventId: string;
  title: string;
  assignedToStaffId?: string;
  assignedToName?: string;
  dueDate: string;
  isCompleted: boolean;
  category: 'Kitchen' | 'Service' | 'Logistics' | 'Sound & Light' | 'General';
}

export interface PurchaseItem {
  id: string;
  eventId?: string;
  eventName?: string;
  supplier: string;
  date: string;
  itemCategory: string;
  itemName: string;
  quantity: number;
  unit: string;
  unitCost: number;
  total: number;
  paymentStatus: 'Paid' | 'Pending' | 'Partial';
}

export interface ExpenseRecord {
  id: string;
  eventId?: string;
  eventName?: string;
  date: string;
  category:
    | 'Food Ingredients'
    | 'Staff'
    | 'Transportation'
    | 'Fuel'
    | 'Equipment'
    | 'Packaging'
    | 'Utilities'
    | 'Marketing'
    | 'Other';
  amount: number;
  description: string;
  paymentMethod: 'UPI' | 'Bank Transfer' | 'Cash' | 'Card';
}

export interface PaymentTransaction {
  id: string;
  eventId: string;
  eventName: string;
  customerId: string;
  customerName: string;
  date: string;
  type: 'Advance Payment' | 'Partial Payment' | 'Final Payment' | 'Other Income';
  amount: number;
  paymentMethod: 'UPI' | 'Bank Transfer' | 'Cash' | 'Card';
  referenceNumber?: string;
  notes?: string;
}

export interface EventRecord {
  id: string;
  name: string;
  customerId: string;
  customerName: string;
  contactNumber: string;
  contactEmail?: string;
  eventType: EventType;
  eventDate: string;
  startTime: string;
  endTime: string;
  venue: string;
  guestCount: number;
  status: EventStatus;
  notes?: string;
  quotationId?: string;
  
  // Financial Snapshot
  agreedAmount: number;
  advanceReceived: number;
  balanceDue: number;
  
  // Costs & Profitability
  foodCostEstimated: number;
  staffCostEstimated: number;
  rentalCostEstimated: number;
  otherExpensesEstimated: number;
  
  // References
  selectedMenuId?: string;
  liveCounterIds?: string[];
  equipmentPackageIds?: string[];
  individualEquipmentIds?: { equipmentId: string; quantity: number }[];
  assignedStaffIds?: string[];
}

export interface CompanyWorkspace {
  id: string;
  name: string;
  location: string;
  phone: string;
  email: string;
  gstNumber?: string;
  logoText: string;
  tagline: string;
  enabledModules: {
    food: boolean;
    menus: boolean;
    lightAndSound: boolean;
    rentals: boolean;
    staff: boolean;
    purchases: boolean;
    expenses: boolean;
    accounting: boolean;
  };
}
