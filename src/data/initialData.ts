import {
  CompanyWorkspace,
  Customer,
  EquipmentItem,
  EventRecord,
  EventTask,
  ExpenseRecord,
  FoodItem,
  LightSoundPackage,
  LiveCounter,
  PaymentTransaction,
  PurchaseItem,
  Quotation,
  ReusableMenu,
  StaffMember
} from '../types';

export const initialCompany: CompanyWorkspace = {
  id: 'comp-01',
  name: 'Royal Feast Catering & Events',
  location: 'Kochi, Kerala, India',
  phone: '+91 98470 55888',
  email: 'info@royalfeastcaterers.com',
  gstNumber: '32AABCR1234F1Z8',
  logoText: 'RF',
  tagline: 'Crafting Exquisite Culinary & Event Experiences',
  enabledModules: {
    food: true,
    menus: true,
    lightAndSound: true,
    rentals: true,
    staff: true,
    purchases: true,
    expenses: true,
    accounting: true,
  }
};

export const initialCustomers: Customer[] = [
  {
    id: 'cust-1',
    name: 'Rahul Menon',
    phone: '+91 98470 12345',
    email: 'rahul.menon@email.com',
    city: 'Kochi, Kerala',
    address: 'Menon Villa, Panampilly Nagar',
    notes: 'Very particular about live counters and sound clarity for reception.',
    totalEventsCount: 2
  },
  {
    id: 'cust-2',
    name: 'Priya Varma',
    phone: '+91 98471 23456',
    email: 'priya.varma@email.com',
    city: 'Thrissur, Kerala',
    address: 'Varma Palace, Round West',
    notes: 'Prefers traditional Travancore & Sadya spread.',
    totalEventsCount: 1
  },
  {
    id: 'cust-3',
    name: 'Anoop Nair',
    phone: '+91 98472 34567',
    email: 'anoop.nair@email.com',
    city: 'Calicut, Kerala',
    address: 'Nair Residency, Mavoor Road',
    notes: 'Family function repeat client.',
    totalEventsCount: 3
  },
  {
    id: 'cust-4',
    name: 'Technopark Events Committee',
    phone: '+91 98473 45678',
    email: 'events@technopark.org',
    city: 'Trivandrum, Kerala',
    address: 'Campus Phase 3, Kazhakkoottam',
    notes: 'Corporate client, quarterly gala events.',
    totalEventsCount: 4
  }
];

export const initialFoodItems: FoodItem[] = [
  // Welcome Drinks
  {
    id: 'food-01',
    name: 'Tender Coconut Elixir with Mint',
    category: 'Welcome Drinks',
    description: 'Fresh coastal tender coconut water infused with mint & lime.',
    unit: 'Per Person',
    sellingRate: 45,
    estimatedCost: 18,
    dietary: 'vegan',
    isAvailable: true,
    isActive: true
  },
  {
    id: 'food-02',
    name: 'Passion Fruit Mojito Cooler',
    category: 'Welcome Drinks',
    description: 'Refreshing sparkling passion fruit nectar with crushed ice.',
    unit: 'Per Person',
    sellingRate: 55,
    estimatedCost: 22,
    dietary: 'veg',
    isAvailable: true,
    isActive: true
  },
  {
    id: 'food-03',
    name: 'Spiced Kerala Sambharam (Buttermilk)',
    category: 'Welcome Drinks',
    description: 'Traditional churned spiced buttermilk with ginger and curry leaves.',
    unit: 'Per Person',
    sellingRate: 35,
    estimatedCost: 12,
    dietary: 'veg',
    isAvailable: true,
    isActive: true
  },

  // Starters
  {
    id: 'food-04',
    name: 'Malabar Chicken Pepper Bites',
    category: 'Starters',
    description: 'Succulent boneless chicken pan-tossed in Tellicherry black pepper and curry leaves.',
    unit: 'Per Person',
    sellingRate: 90,
    estimatedCost: 38,
    dietary: 'non-veg',
    isAvailable: true,
    isActive: true
  },
  {
    id: 'food-05',
    name: 'Crispy Corn & Water Chestnut Pepper Fry',
    category: 'Starters',
    description: 'Wok-tossed sweet corn kernels with crunchy water chestnuts and scallions.',
    unit: 'Per Person',
    sellingRate: 70,
    estimatedCost: 26,
    dietary: 'veg',
    isAvailable: true,
    isActive: true
  },
  {
    id: 'food-06',
    name: 'Tandoori Malai Paneer Skewers',
    category: 'Starters',
    description: 'Soft cottage cheese cubes marinated in rich cardamom cream and chargrilled.',
    unit: 'Per Person',
    sellingRate: 85,
    estimatedCost: 32,
    dietary: 'veg',
    isAvailable: true,
    isActive: true
  },
  {
    id: 'food-07',
    name: 'Golden Fried Butter Garlic Prawns',
    category: 'Starters',
    description: 'Crispy Arabian Sea prawns tossed in golden garlic butter.',
    unit: 'Per Person',
    sellingRate: 130,
    estimatedCost: 65,
    dietary: 'non-veg',
    isAvailable: true,
    isActive: true
  },

  // Main Course / Rice
  {
    id: 'food-08',
    name: 'Authentic Thalassery Dum Biryani (Chicken)',
    category: 'Main Course',
    description: 'Fragrant Kaima rice layered with tender marinated chicken, fried onions & saffron ghee.',
    unit: 'Per Person',
    sellingRate: 190,
    estimatedCost: 78,
    dietary: 'non-veg',
    isAvailable: true,
    isActive: true
  },
  {
    id: 'food-09',
    name: 'Fragrant Kerala Ghee Rice (Neychoru)',
    category: 'Rice',
    description: 'Short-grain rice tempered in pure Malabar ghee, cashew nuts and golden sultanas.',
    unit: 'Per Person',
    sellingRate: 65,
    estimatedCost: 24,
    dietary: 'veg',
    isAvailable: true,
    isActive: true
  },
  {
    id: 'food-10',
    name: 'Jeera Basmati Pulao',
    category: 'Rice',
    description: 'Long-grain royal basmati rice infused with toasted cumin seeds.',
    unit: 'Per Person',
    sellingRate: 60,
    estimatedCost: 20,
    dietary: 'veg',
    isAvailable: true,
    isActive: true
  },

  // Breads
  {
    id: 'food-11',
    name: 'Layered Malabar Parotta',
    category: 'Breads',
    description: 'Flaky, multi-layered handmade hot parottas.',
    unit: 'Per Person',
    sellingRate: 40,
    estimatedCost: 14,
    dietary: 'veg',
    isAvailable: true,
    isActive: true
  },
  {
    id: 'food-12',
    name: 'Tandoori Butter Naan & Roti Basket',
    category: 'Breads',
    description: 'Assorted hot naan and tandoori rotis brushed with cultured butter.',
    unit: 'Per Person',
    sellingRate: 45,
    estimatedCost: 16,
    dietary: 'veg',
    isAvailable: true,
    isActive: true
  },

  // Curries
  {
    id: 'food-13',
    name: 'Travancore Chicken Roast (Semi-Gravy)',
    category: 'Curries',
    description: 'Slow-cooked chicken in caramelized shallots, tomatoes and Kerala spice blend.',
    unit: 'Per Person',
    sellingRate: 110,
    estimatedCost: 45,
    dietary: 'non-veg',
    isAvailable: true,
    isActive: true
  },
  {
    id: 'food-14',
    name: 'Alleppey Coconut Fish Curry',
    category: 'Curries',
    description: 'Fresh seer fish simmered in raw mangoes and creamy coconut milk.',
    unit: 'Per Person',
    sellingRate: 140,
    estimatedCost: 68,
    dietary: 'non-veg',
    isAvailable: true,
    isActive: true
  },
  {
    id: 'food-15',
    name: 'Paneer Butter Masala',
    category: 'Curries',
    description: 'Cottage cheese simmered in smooth cashew and tomato cream gravy.',
    unit: 'Per Person',
    sellingRate: 85,
    estimatedCost: 32,
    dietary: 'veg',
    isAvailable: true,
    isActive: true
  },
  {
    id: 'food-16',
    name: 'Kerala Mixed Vegetable Stew',
    category: 'Curries',
    description: 'Mild stew of carrots, potatoes and green peas in spiced first-press coconut milk.',
    unit: 'Per Person',
    sellingRate: 65,
    estimatedCost: 22,
    dietary: 'veg',
    isAvailable: true,
    isActive: true
  },

  // Desserts
  {
    id: 'food-17',
    name: 'Royal Elaneer (Tender Coconut) Payasam',
    category: 'Desserts',
    description: 'Signature rich dessert made of fresh tender coconut pulp, condensed milk & cardamom.',
    unit: 'Per Person',
    sellingRate: 75,
    estimatedCost: 28,
    dietary: 'veg',
    isAvailable: true,
    isActive: true
  },
  {
    id: 'food-18',
    name: 'Hot Gulab Jamun with Natural Vanilla Bean Ice Cream',
    category: 'Desserts',
    description: 'Warm melt-in-mouth jamuns paired with slow-churned vanilla ice cream.',
    unit: 'Per Person',
    sellingRate: 65,
    estimatedCost: 25,
    dietary: 'veg',
    isAvailable: true,
    isActive: true
  }
];

export const initialLiveCounters: LiveCounter[] = [
  {
    id: 'counter-01',
    name: 'Live Ghee Roast & Masala Dosa Counter',
    description: 'Crispy golden dosas made live with selection of 4 chutneys and piping hot Sambar.',
    rate: 12000,
    durationHours: 4,
    staffRequired: 2,
    equipmentRequired: ['Tawa Range', 'Batter Dispenser', 'Chutney Station'],
    notes: 'Requires 1 dedicated 16A power socket.'
  },
  {
    id: 'counter-02',
    name: 'Live Shawarma & Pita Station',
    description: 'Vertical rotating grill rotisserie with shredded marinated chicken, tahini, toum garlic cream.',
    rate: 16000,
    durationHours: 4,
    staffRequired: 2,
    equipmentRequired: ['Shawarma Machine', 'Display Chafing'],
    notes: 'Very popular with evening receptions.'
  },
  {
    id: 'counter-03',
    name: 'Italian Live Pasta Station',
    description: 'Choice of Penne/Fusilli cooked on spot in Alfredo cream, Arrabbiata and Basil Pesto sauces.',
    rate: 15000,
    durationHours: 3.5,
    staffRequired: 2,
    equipmentRequired: ['Induction Burners', 'Pasta Boilers'],
    notes: 'Offers both Veg and Chicken toppings.'
  },
  {
    id: 'counter-04',
    name: 'Delhi Chaat & Pani Puri Bar',
    description: 'Live crispy puris with 3 varieties of flavored mint/tamarind water, Sev Puri & Dahi Papdi.',
    rate: 9500,
    durationHours: 3,
    staffRequired: 1,
    equipmentRequired: ['Chaat Counter Display'],
    notes: 'Kids & family favorite.'
  },
  {
    id: 'counter-05',
    name: 'Artisanal Ice Cream & Sundae Bar',
    description: 'Scooped live gelato with toppings: roasted nuts, chocolate fudge, berry coulis, sprinkles.',
    rate: 11000,
    durationHours: 3,
    staffRequired: 1,
    equipmentRequired: ['Ice Cream Deep Freezer Cart'],
    notes: 'Includes 6 premium flavors.'
  }
];

export const initialReusableMenus: ReusableMenu[] = [
  {
    id: 'menu-01',
    name: 'Premium Wedding Menu',
    pricingType: 'Per Person',
    ratePerPerson: 650,
    minGuestCount: 200,
    categories: [
      {
        categoryName: 'Welcome Drinks',
        items: ['Tender Coconut Elixir with Mint', 'Passion Fruit Mojito Cooler']
      },
      {
        categoryName: 'Starters',
        items: ['Malabar Chicken Pepper Bites', 'Tandoori Malai Paneer Skewers', 'Crispy Corn & Water Chestnut Pepper Fry']
      },
      {
        categoryName: 'Main Course',
        items: ['Authentic Thalassery Dum Biryani (Chicken)', 'Layered Malabar Parotta', 'Fragrant Kerala Ghee Rice (Neychoru)']
      },
      {
        categoryName: 'Curries',
        items: ['Travancore Chicken Roast (Semi-Gravy)', 'Paneer Butter Masala', 'Kerala Mixed Vegetable Stew']
      },
      {
        categoryName: 'Desserts',
        items: ['Royal Elaneer (Tender Coconut) Payasam', 'Hot Gulab Jamun with Natural Vanilla Bean Ice Cream']
      }
    ],
    liveCounters: ['counter-01'],
    notes: 'Includes premium copper chafing dishes, linen service, and complimentary mints.'
  },
  {
    id: 'menu-02',
    name: 'Traditional Kerala Sadya Feast',
    pricingType: 'Per Person',
    ratePerPerson: 450,
    minGuestCount: 100,
    categories: [
      {
        categoryName: 'Welcome Drinks',
        items: ['Spiced Kerala Sambharam (Buttermilk)']
      },
      {
        categoryName: 'Main Course',
        items: ['Fragrant Kerala Ghee Rice (Neychoru)']
      },
      {
        categoryName: 'Curries',
        items: ['Kerala Mixed Vegetable Stew', 'Paneer Butter Masala']
      },
      {
        categoryName: 'Desserts',
        items: ['Royal Elaneer (Tender Coconut) Payasam']
      }
    ],
    liveCounters: [],
    notes: 'Authentic banana leaf service with 22 traditional side dishes, pickles and payasams.'
  },
  {
    id: 'menu-03',
    name: 'Corporate Gala Dinner',
    pricingType: 'Per Person',
    ratePerPerson: 580,
    minGuestCount: 150,
    categories: [
      {
        categoryName: 'Welcome Drinks',
        items: ['Passion Fruit Mojito Cooler']
      },
      {
        categoryName: 'Starters',
        items: ['Golden Fried Butter Garlic Prawns', 'Tandoori Malai Paneer Skewers']
      },
      {
        categoryName: 'Main Course',
        items: ['Jeera Basmati Pulao', 'Tandoori Butter Naan & Roti Basket']
      },
      {
        categoryName: 'Curries',
        items: ['Alleppey Coconut Fish Curry', 'Paneer Butter Masala']
      },
      {
        categoryName: 'Desserts',
        items: ['Hot Gulab Jamun with Natural Vanilla Bean Ice Cream']
      }
    ],
    liveCounters: ['counter-03'],
    notes: 'Buffet setup with corporate staff uniforms and customized menu cards.'
  }
];

export const initialEquipment: EquipmentItem[] = [
  {
    id: 'eq-01',
    name: 'JBL VRX Line Array Speaker System',
    category: 'Speakers',
    description: 'High-power dual 8-inch two-way line array loudspeaker system for crystal clear vocals & acoustic punch.',
    totalQuantity: 8,
    availableQuantity: 4,
    rentalRate: 3500,
    rentalUnit: 'Per Event',
    condition: 'Excellent',
    status: 'Available'
  },
  {
    id: 'eq-02',
    name: 'RCF 18-inch High-Excursion Active Subwoofer',
    category: 'Subwoofers',
    description: '1400W peak active bass cabinet for deep resonant low frequencies.',
    totalQuantity: 6,
    availableQuantity: 2,
    rentalRate: 4000,
    rentalUnit: 'Per Event',
    condition: 'Excellent',
    status: 'Available'
  },
  {
    id: 'eq-03',
    name: 'Beam 230W 7R Moving Head Stage Lights',
    category: 'Moving Head Lights',
    description: 'High output sharp beam moving heads with multi-color gobo wheels & prism effects.',
    totalQuantity: 16,
    availableQuantity: 8,
    rentalRate: 2500,
    rentalUnit: 'Per Piece',
    condition: 'Excellent',
    status: 'Available'
  },
  {
    id: 'eq-04',
    name: 'Slim 54x3W RGBW LED Par Wash Lights',
    category: 'LED Par Lights',
    description: 'Warm & vibrant architectural/stage color wash lights.',
    totalQuantity: 32,
    availableQuantity: 20,
    rentalRate: 600,
    rentalUnit: 'Per Piece',
    condition: 'Good',
    status: 'Available'
  },
  {
    id: 'eq-05',
    name: 'Shure QLXD UHF Wireless Handheld Mic Set',
    category: 'Wireless Microphones',
    description: 'Studio-grade wireless vocal microphones with zero interference.',
    totalQuantity: 8,
    availableQuantity: 4,
    rentalRate: 1500,
    rentalUnit: 'Per Piece',
    condition: 'Excellent',
    status: 'Available'
  },
  {
    id: 'eq-06',
    name: 'Behringer X32 Digital 32-Channel Mixing Console',
    category: 'Mixing Consoles',
    description: 'Flagship 40-input, 25-bus digital mixing console with motorized faders.',
    totalQuantity: 2,
    availableQuantity: 1,
    rentalRate: 6500,
    rentalUnit: 'Per Event',
    condition: 'Excellent',
    status: 'Available'
  },
  {
    id: 'eq-07',
    name: 'Aluminium Box Truss System (10x10ft Goalpost)',
    category: 'Truss',
    description: 'Heavy duty modular aluminium trussing for stage lighting and speaker rigging.',
    totalQuantity: 4,
    availableQuantity: 2,
    rentalRate: 8000,
    rentalUnit: 'Per Event',
    condition: 'Good',
    status: 'Available'
  }
];

export const initialLightSoundPackages: LightSoundPackage[] = [
  {
    id: 'lsp-01',
    name: 'Premium Wedding Sound Package',
    description: 'Complete high-fidelity concert sound system tailored for wedding receptions (up to 1,000 guests).',
    rate: 45000,
    rentalUnit: 'Per Event',
    equipmentList: [
      { equipmentId: 'eq-01', name: 'JBL VRX Line Array Speakers', quantity: 4 },
      { equipmentId: 'eq-02', name: 'RCF 18-inch Active Subwoofers', quantity: 4 },
      { equipmentId: 'eq-05', name: 'Shure QLXD Wireless Mics', quantity: 4 },
      { equipmentId: 'eq-06', name: 'Behringer X32 Digital Console', quantity: 1 }
    ],
    includesOperator: true,
    includesInstallation: true,
    includesTransport: true
  },
  {
    id: 'lsp-02',
    name: 'Grand Stage Ambient Lighting Package',
    description: 'Atmospheric and energetic stage lighting setup with moving beams, soft color washes, and haze.',
    rate: 28000,
    rentalUnit: 'Per Event',
    equipmentList: [
      { equipmentId: 'eq-03', name: 'Beam 230W Moving Heads', quantity: 6 },
      { equipmentId: 'eq-04', name: '54x3W RGBW LED Par Lights', quantity: 16 },
      { equipmentId: 'eq-07', name: 'Aluminium Box Truss Rig', quantity: 1 }
    ],
    includesOperator: true,
    includesInstallation: true,
    includesTransport: true
  },
  {
    id: 'lsp-03',
    name: 'Corporate Audio-Visual Setup',
    description: 'Crisp speech reinforcement and balanced ambient music for conferences & award ceremonies.',
    rate: 25000,
    rentalUnit: 'Per Event',
    equipmentList: [
      { equipmentId: 'eq-01', name: 'JBL VRX Line Array Speakers', quantity: 2 },
      { equipmentId: 'eq-05', name: 'Shure QLXD Wireless Mics', quantity: 2 },
      { equipmentId: 'eq-06', name: 'Behringer X32 Digital Console', quantity: 1 }
    ],
    includesOperator: true,
    includesInstallation: true,
    includesTransport: true
  }
];

export const initialQuotations: Quotation[] = [
  {
    id: 'quot-01',
    quotationNumber: 'QT-2026-0042',
    date: '2026-10-15',
    validUntil: '2026-11-15',
    customerId: 'cust-1',
    customerName: 'Rahul Menon',
    customerPhone: '+91 98470 12345',
    customerEmail: 'rahul.menon@email.com',
    eventId: 'evt-01',
    eventName: 'Rahul & Anjali Wedding Reception',
    eventType: 'Wedding',
    eventDate: '2026-12-24',
    venue: 'Grand Convention Centre, Kochi',
    guestCount: 650,
    items: [
      {
        id: 'qitem-1',
        category: 'Food Menu',
        name: 'Premium Wedding Menu',
        description: 'Selected 5-course feast with welcome drinks, starters, Thalassery Biryani, gravies & desserts for 650 guests.',
        quantity: 650,
        unit: 'Per Person',
        rate: 650,
        discount: 0,
        total: 422500,
        menuId: 'menu-01',
        menuDetails: {
          categories: [
            { categoryName: 'Welcome Drinks', items: ['Tender Coconut Elixir', 'Passion Fruit Mojito'] },
            { categoryName: 'Starters', items: ['Malabar Chicken Pepper Bites', 'Tandoori Malai Paneer', 'Crispy Corn Pepper Fry'] },
            { categoryName: 'Main Course & Breads', items: ['Thalassery Dum Biryani', 'Layered Malabar Parotta', 'Ghee Rice'] },
            { categoryName: 'Gravies', items: ['Travancore Chicken Roast', 'Paneer Butter Masala', 'Vegetable Stew'] },
            { categoryName: 'Desserts', items: ['Royal Elaneer Payasam', 'Gulab Jamun with Ice Cream'] }
          ]
        }
      },
      {
        id: 'qitem-2',
        category: 'Live Counters',
        name: 'Live Ghee Roast & Masala Dosa Counter',
        description: 'On-spot crispy dosas served with 4 traditional chutneys and sambar.',
        quantity: 1,
        unit: 'Counter',
        rate: 12000,
        discount: 0,
        total: 12000
      },
      {
        id: 'qitem-3',
        category: 'Light & Sound',
        name: 'Premium Wedding Sound Package',
        description: 'JBL VRX Line Array (4 tops, 4 subs), Behringer X32 console, 4 wireless mics & sound operator.',
        quantity: 1,
        unit: 'Package',
        rate: 45000,
        discount: 0,
        total: 45000
      },
      {
        id: 'qitem-4',
        category: 'Light & Sound',
        name: 'Beam 230W Moving Head Stage Lights',
        description: 'Special intelligent overhead beam effects.',
        quantity: 8,
        unit: 'Units',
        rate: 2500,
        discount: 0,
        total: 20000
      }
    ],
    subtotal: 499500,
    discount: 9500,
    additionalCharges: 0,
    taxPercentage: 5,
    tax: 24500,
    grandTotal: 514500,
    advanceRequired: 200000,
    balance: 314500,
    paymentScheduleNotes: '50% advance on confirmation, 30% on food preparation date, 20% post event.',
    termsAndConditions: [
      'Final guest count confirmation required at least 3 days prior to event.',
      'Sound and lighting rig will be commissioned 4 hours before event commencement.',
      'All taxes and transportation within Kochi city limits included.'
    ],
    status: 'Converted',
    notes: 'Client confirmed via meeting on Oct 20.'
  },
  {
    id: 'quot-02',
    quotationNumber: 'QT-2026-0043',
    date: '2026-11-01',
    validUntil: '2026-12-01',
    customerId: 'cust-2',
    customerName: 'Priya Varma',
    customerPhone: '+91 98471 23456',
    customerEmail: 'priya.varma@email.com',
    eventId: 'evt-02',
    eventName: 'Priya Varma Engagement Celebration',
    eventType: 'Engagement',
    eventDate: '2027-01-15',
    venue: 'Gokulam Park, Thrissur',
    guestCount: 250,
    items: [
      {
        id: 'qitem-201',
        category: 'Food Menu',
        name: 'Traditional Kerala Sadya Feast',
        quantity: 250,
        unit: 'Per Person',
        rate: 450,
        discount: 0,
        total: 112500,
        menuId: 'menu-02'
      },
      {
        id: 'qitem-202',
        category: 'Live Counters',
        name: 'Delhi Chaat & Pani Puri Bar',
        quantity: 1,
        unit: 'Counter',
        rate: 9500,
        discount: 0,
        total: 9500
      },
      {
        id: 'qitem-203',
        category: 'Light & Sound',
        name: 'Grand Stage Ambient Lighting Package',
        quantity: 1,
        unit: 'Package',
        rate: 28000,
        discount: 0,
        total: 28000
      }
    ],
    subtotal: 150000,
    discount: 5000,
    additionalCharges: 0,
    taxPercentage: 5,
    tax: 7250,
    grandTotal: 152250,
    advanceRequired: 60000,
    balance: 92250,
    status: 'Sent',
    notes: 'Quotation sent over WhatsApp and Email. Awaiting family approval.'
  }
];

export const initialEvents: EventRecord[] = [
  {
    id: 'evt-01',
    name: 'Rahul & Anjali Wedding Reception',
    customerId: 'cust-1',
    customerName: 'Rahul Menon',
    contactNumber: '+91 98470 12345',
    contactEmail: 'rahul.menon@email.com',
    eventType: 'Wedding',
    eventDate: '2026-12-24',
    startTime: '18:00',
    endTime: '23:30',
    venue: 'Grand Convention Centre, Kochi',
    guestCount: 650,
    status: 'Confirmed',
    notes: 'Grand wedding reception with 650 guests. Live dosa counter on north patio, sound rig on central stage.',
    quotationId: 'quot-01',
    agreedAmount: 514500,
    advanceReceived: 200000,
    balanceDue: 314500,
    foodCostEstimated: 162000,
    staffCostEstimated: 42000,
    rentalCostEstimated: 18000,
    otherExpensesEstimated: 14500,
    selectedMenuId: 'menu-01',
    liveCounterIds: ['counter-01'],
    equipmentPackageIds: ['lsp-01'],
    assignedStaffIds: ['staff-01', 'staff-02', 'staff-03', 'staff-04', 'staff-05']
  },
  {
    id: 'evt-02',
    name: 'Priya Varma Engagement Celebration',
    customerId: 'cust-2',
    customerName: 'Priya Varma',
    contactNumber: '+91 98471 23456',
    contactEmail: 'priya.varma@email.com',
    eventType: 'Engagement',
    eventDate: '2027-01-15',
    startTime: '10:30',
    endTime: '15:00',
    venue: 'Gokulam Park, Thrissur',
    guestCount: 250,
    status: 'Quotation Sent',
    notes: 'Traditional Sadya feast followed by evening ambient stage setup.',
    quotationId: 'quot-02',
    agreedAmount: 152250,
    advanceReceived: 0,
    balanceDue: 152250,
    foodCostEstimated: 48000,
    staffCostEstimated: 16000,
    rentalCostEstimated: 8500,
    otherExpensesEstimated: 5000,
    selectedMenuId: 'menu-02',
    liveCounterIds: ['counter-04'],
    equipmentPackageIds: ['lsp-02'],
    assignedStaffIds: ['staff-02', 'staff-04']
  },
  {
    id: 'evt-03',
    name: 'Technopark Annual Corporate Gala',
    customerId: 'cust-4',
    customerName: 'Technopark Events Committee',
    contactNumber: '+91 98473 45678',
    contactEmail: 'events@technopark.org',
    eventType: 'Corporate',
    eventDate: '2027-02-08',
    startTime: '17:00',
    endTime: '22:00',
    venue: 'Le Meridien Convention Centre, Kochi',
    guestCount: 400,
    status: 'Enquiry',
    notes: 'Executive gala dinner with AV and international live pasta counter.',
    agreedAmount: 260000,
    advanceReceived: 0,
    balanceDue: 260000,
    foodCostEstimated: 88000,
    staffCostEstimated: 24000,
    rentalCostEstimated: 14000,
    otherExpensesEstimated: 8000,
    selectedMenuId: 'menu-03',
    liveCounterIds: ['counter-03'],
    equipmentPackageIds: ['lsp-03'],
    assignedStaffIds: []
  },
  {
    id: 'evt-04',
    name: 'Ayaan 1st Birthday Celebration',
    customerId: 'cust-3',
    customerName: 'Anoop Nair',
    contactNumber: '+91 98472 34567',
    contactEmail: 'anoop.nair@email.com',
    eventType: 'Birthday',
    eventDate: '2026-11-12',
    startTime: '16:00',
    endTime: '20:30',
    venue: 'Waterfront Villa Lawn, Calicut',
    guestCount: 120,
    status: 'Completed',
    notes: 'Intimate gathering with kids sundae bar and light acoustic sound setup.',
    agreedAmount: 95000,
    advanceReceived: 95000,
    balanceDue: 0,
    foodCostEstimated: 32000,
    staffCostEstimated: 12000,
    rentalCostEstimated: 6000,
    otherExpensesEstimated: 3500,
    selectedMenuId: 'menu-01',
    liveCounterIds: ['counter-05'],
    assignedStaffIds: ['staff-02', 'staff-05']
  }
];

export const initialStaff: StaffMember[] = [
  {
    id: 'staff-01',
    name: 'Chef Suresh Pillai',
    phone: '+91 98470 99001',
    role: 'Chef',
    isAvailable: true,
    dailyRate: 4500,
    assignedEventIds: ['evt-01']
  },
  {
    id: 'staff-02',
    name: 'Manu Krishnan',
    phone: '+91 98470 99002',
    role: 'Supervisor',
    isAvailable: true,
    dailyRate: 3000,
    assignedEventIds: ['evt-01', 'evt-02', 'evt-04']
  },
  {
    id: 'staff-03',
    name: 'Rohit Mohan',
    phone: '+91 98470 99003',
    role: 'Sound Operator',
    isAvailable: true,
    dailyRate: 3500,
    assignedEventIds: ['evt-01']
  },
  {
    id: 'staff-04',
    name: 'Vishnu Das',
    phone: '+91 98470 99004',
    role: 'Lighting Operator',
    isAvailable: true,
    dailyRate: 2800,
    assignedEventIds: ['evt-01', 'evt-02']
  },
  {
    id: 'staff-05',
    name: 'Deepa Thomas',
    phone: '+91 98470 99005',
    role: 'Service Staff',
    isAvailable: true,
    dailyRate: 1800,
    assignedEventIds: ['evt-01', 'evt-04']
  },
  {
    id: 'staff-06',
    name: 'Akhil Kumar',
    phone: '+91 98470 99006',
    role: 'Driver',
    isAvailable: true,
    dailyRate: 1600,
    assignedEventIds: []
  }
];

export const initialTasks: EventTask[] = [
  {
    id: 'tsk-01',
    eventId: 'evt-01',
    title: 'Source 75kg fresh Tellicherry black pepper and aged Kaima rice',
    assignedToStaffId: 'staff-01',
    assignedToName: 'Chef Suresh Pillai',
    dueDate: '2026-12-22',
    isCompleted: true,
    category: 'Kitchen'
  },
  {
    id: 'tsk-02',
    eventId: 'evt-01',
    title: 'Load VRX line array, 4 subs, and 8 moving head lights in truck',
    assignedToStaffId: 'staff-03',
    assignedToName: 'Rohit Mohan',
    dueDate: '2026-12-24',
    isCompleted: false,
    category: 'Sound & Light'
  },
  {
    id: 'tsk-03',
    eventId: 'evt-01',
    title: 'Coordinate 32 service staff uniforms & linen table runners',
    assignedToStaffId: 'staff-02',
    assignedToName: 'Manu Krishnan',
    dueDate: '2026-12-24',
    isCompleted: false,
    category: 'Service'
  },
  {
    id: 'tsk-04',
    eventId: 'evt-01',
    title: 'Verify venue power load & 16A connections for Dosa station',
    assignedToStaffId: 'staff-04',
    assignedToName: 'Vishnu Das',
    dueDate: '2026-12-23',
    isCompleted: true,
    category: 'Logistics'
  }
];

export const initialPurchases: PurchaseItem[] = [
  {
    id: 'pur-01',
    eventId: 'evt-01',
    eventName: 'Rahul & Anjali Wedding Reception',
    supplier: 'Malabar Wholesale Spices',
    date: '2026-12-20',
    itemCategory: 'Spices & Staples',
    itemName: 'Aged Kaima Biryani Rice (120 KG)',
    quantity: 120,
    unit: 'KG',
    unitCost: 110,
    total: 13200,
    paymentStatus: 'Paid'
  },
  {
    id: 'pur-02',
    eventId: 'evt-01',
    eventName: 'Rahul & Anjali Wedding Reception',
    supplier: 'Coastal Fresh Poultry & Meats',
    date: '2026-12-22',
    itemCategory: 'Meat & Poultry',
    itemName: 'Fresh Farm Chicken (180 KG)',
    quantity: 180,
    unit: 'KG',
    unitCost: 180,
    total: 32400,
    paymentStatus: 'Paid'
  },
  {
    id: 'pur-03',
    eventId: 'evt-01',
    eventName: 'Rahul & Anjali Wedding Reception',
    supplier: 'Highland Dairy Farms',
    date: '2026-12-23',
    itemCategory: 'Dairy',
    itemName: 'Pure Malabar Cow Ghee & Malai Paneer',
    quantity: 35,
    unit: 'KG',
    unitCost: 480,
    total: 16800,
    paymentStatus: 'Paid'
  },
  {
    id: 'pur-04',
    eventId: 'evt-01',
    eventName: 'Rahul & Anjali Wedding Reception',
    supplier: 'Green Valley Agro Traders',
    date: '2026-12-23',
    itemCategory: 'Produce & Veg',
    itemName: 'Fresh Tender Coconuts (400 Units)',
    quantity: 400,
    unit: 'Pieces',
    unitCost: 35,
    total: 14000,
    paymentStatus: 'Paid'
  }
];

export const initialExpenses: ExpenseRecord[] = [
  {
    id: 'exp-01',
    eventId: 'evt-01',
    eventName: 'Rahul & Anjali Wedding Reception',
    date: '2026-12-23',
    category: 'Transportation',
    amount: 6500,
    description: 'Heavy vehicle truck rental & driver fuel for equipment and food hot-boxes',
    paymentMethod: 'UPI'
  },
  {
    id: 'exp-02',
    eventId: 'evt-01',
    eventName: 'Rahul & Anjali Wedding Reception',
    date: '2026-12-24',
    category: 'Staff',
    amount: 18500,
    description: 'Service team daily honorarium (12 service boys & kitchen helpers)',
    paymentMethod: 'Cash'
  },
  {
    id: 'exp-03',
    eventId: 'evt-01',
    eventName: 'Rahul & Anjali Wedding Reception',
    date: '2026-12-24',
    category: 'Packaging',
    amount: 3200,
    description: 'Eco-friendly biodegradable takeaway boxes, food wraps and tissues',
    paymentMethod: 'UPI'
  },
  {
    id: 'exp-04',
    date: '2026-11-28',
    category: 'Equipment',
    amount: 4500,
    description: 'Audio XLR cabling and spare wireless microphone antennas maintenance',
    paymentMethod: 'Bank Transfer'
  }
];

export const initialPayments: PaymentTransaction[] = [
  {
    id: 'pay-01',
    eventId: 'evt-01',
    eventName: 'Rahul & Anjali Wedding Reception',
    customerId: 'cust-1',
    customerName: 'Rahul Menon',
    date: '2026-10-20',
    type: 'Advance Payment',
    amount: 200000,
    paymentMethod: 'Bank Transfer',
    referenceNumber: 'NEFT9928172635',
    notes: 'Received initial 40% confirmation advance.'
  },
  {
    id: 'pay-02',
    eventId: 'evt-04',
    eventName: 'Ayaan 1st Birthday Celebration',
    customerId: 'cust-3',
    customerName: 'Anoop Nair',
    date: '2026-11-12',
    type: 'Final Payment',
    amount: 95000,
    paymentMethod: 'UPI',
    referenceNumber: 'UPI/20261112/98212',
    notes: 'Settled in full post successful function.'
  }
];
