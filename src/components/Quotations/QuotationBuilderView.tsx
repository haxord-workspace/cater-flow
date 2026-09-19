import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Customer,
  EventType,
  Quotation,
  QuotationLineItem,
  ReusableMenu
} from '../../types';
import {
  FileText,
  Utensils,
  Speaker,
  Plus,
  Trash2,
  ArrowLeft,
  Check,
  Eye,
  Percent,
  Sparkles,
  HelpCircle
} from 'lucide-react';

export const QuotationBuilderView: React.FC = () => {
  const {
    selectedQuotationId,
    quotations,
    customers,
    reusableMenus,
    liveCounters,
    lightSoundPackages,
    equipmentList,
    addQuotation,
    updateQuotation,
    navigateToQuotationPreview,
    setCurrentView
  } = useApp();

  const existingQuotation = quotations.find((q) => q.id === selectedQuotationId);

  // Customer & Event State
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>(
    existingQuotation?.customerId || customers[0]?.id || ''
  );
  const [eventName, setEventName] = useState(
    existingQuotation?.eventName || 'Rahul & Anjali Wedding Reception'
  );
  const [eventType, setEventType] = useState<EventType>(
    existingQuotation?.eventType || 'Wedding'
  );
  const [eventDate, setEventDate] = useState(
    existingQuotation?.eventDate || '2026-12-24'
  );
  const [venue, setVenue] = useState(
    existingQuotation?.venue || 'Grand Convention Centre, Kochi'
  );
  const [guestCount, setGuestCount] = useState<number>(
    existingQuotation?.guestCount || 650
  );

  // Quotation Items State
  const [items, setItems] = useState<QuotationLineItem[]>(
    existingQuotation?.items || [
      {
        id: 'item-1',
        category: 'Food Menu',
        name: 'Premium Wedding Menu',
        description: 'Selected 5-course feast with welcome drinks, starters, Thalassery Biryani, gravies & desserts.',
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
        id: 'item-2',
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
        id: 'item-3',
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
        id: 'item-4',
        category: 'Light & Sound',
        name: 'Beam 230W 7R Moving Head Stage Lights',
        description: 'Special intelligent overhead beam effects.',
        quantity: 8,
        unit: 'Units',
        rate: 2500,
        discount: 0,
        total: 20000
      }
    ]
  );

  // Financial Discounts & Tax
  const [discountAmount, setDiscountAmount] = useState<number>(
    existingQuotation?.discount !== undefined ? existingQuotation.discount : 9500
  );
  const [taxPercentage, setTaxPercentage] = useState<number>(
    existingQuotation?.taxPercentage !== undefined ? existingQuotation.taxPercentage : 5
  );
  const [advanceRequired, setAdvanceRequired] = useState<number>(
    existingQuotation?.advanceRequired !== undefined ? existingQuotation.advanceRequired : 200000
  );
  const [notes, setNotes] = useState(
    existingQuotation?.notes || 'Grand celebration banquet proposal. Client confirmed via consultation.'
  );

  // Quick Insertion Pickers
  const [selectedMenuToAdd, setSelectedMenuToAdd] = useState<string>('menu-01');
  const [selectedCounterToAdd, setSelectedCounterToAdd] = useState<string>('counter-01');
  const [selectedPackageToAdd, setSelectedPackageToAdd] = useState<string>('lsp-01');
  const [selectedEquipmentToAdd, setSelectedEquipmentToAdd] = useState<string>('eq-03');
  const [equipmentQtyToAdd, setEquipmentQtyToAdd] = useState<number>(8);

  // Automatically recalculate Menu items when guest count updates
  const handleGuestCountChange = (newCount: number) => {
    setGuestCount(newCount);
    setItems((prev) =>
      prev.map((it) => {
        if (it.category === 'Food Menu') {
          const newTot = newCount * it.rate;
          return { ...it, quantity: newCount, total: newTot };
        }
        return it;
      })
    );
  };

  // Add Existing Food Menu to Quotation
  const handleAddFoodMenu = () => {
    const menuObj = reusableMenus.find((m) => m.id === selectedMenuToAdd);
    if (!menuObj) return;

    const newItem: QuotationLineItem = {
      id: `item-${Date.now()}`,
      category: 'Food Menu',
      name: menuObj.name,
      description: `Full catered feast configured with ${menuObj.categories.length} course categories.`,
      quantity: guestCount,
      unit: 'Per Person',
      rate: menuObj.ratePerPerson,
      discount: 0,
      total: guestCount * menuObj.ratePerPerson,
      menuId: menuObj.id,
      menuDetails: {
        categories: menuObj.categories.map((c) => ({
          categoryName: c.categoryName,
          items: [...c.items]
        }))
      }
    };

    setItems((prev) => [...prev, newItem]);
  };

  // Add Live Counter to Quotation
  const handleAddLiveCounter = () => {
    const counterObj = liveCounters.find((c) => c.id === selectedCounterToAdd);
    if (!counterObj) return;

    const newItem: QuotationLineItem = {
      id: `item-${Date.now()}`,
      category: 'Live Counters',
      name: counterObj.name,
      description: counterObj.description,
      quantity: 1,
      unit: 'Counter',
      rate: counterObj.rate,
      discount: 0,
      total: counterObj.rate
    };

    setItems((prev) => [...prev, newItem]);
  };

  // Add Light & Sound Package to Quotation
  const handleAddSoundPackage = () => {
    const pkgObj = lightSoundPackages.find((p) => p.id === selectedPackageToAdd);
    if (!pkgObj) return;

    const newItem: QuotationLineItem = {
      id: `item-${Date.now()}`,
      category: 'Light & Sound',
      name: pkgObj.name,
      description: pkgObj.description,
      quantity: 1,
      unit: 'Package',
      rate: pkgObj.rate,
      discount: 0,
      total: pkgObj.rate
    };

    setItems((prev) => [...prev, newItem]);
  };

  // Add Individual Rental Equipment
  const handleAddEquipment = () => {
    const eqObj = equipmentList.find((e) => e.id === selectedEquipmentToAdd);
    if (!eqObj) return;

    const qty = Number(equipmentQtyToAdd) || 1;
    const newItem: QuotationLineItem = {
      id: `item-${Date.now()}`,
      category: 'Light & Sound',
      name: eqObj.name,
      description: eqObj.description,
      quantity: qty,
      unit: eqObj.rentalUnit.replace('Per ', ''),
      rate: eqObj.rentalRate,
      discount: 0,
      total: qty * eqObj.rentalRate
    };

    setItems((prev) => [...prev, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const handleUpdateItem = (id: string, field: 'quantity' | 'rate' | 'name', val: any) => {
    setItems((prev) =>
      prev.map((it) => {
        if (it.id === id) {
          const updated = { ...it, [field]: val };
          if (field === 'quantity' || field === 'rate') {
            const q = field === 'quantity' ? Number(val) : it.quantity;
            const r = field === 'rate' ? Number(val) : it.rate;
            updated.total = q * r;
          }
          return updated;
        }
        return it;
      })
    );
  };

  // Calculations
  const subtotal = items.reduce((sum, it) => sum + it.total, 0);
  const discountedSubtotal = Math.max(0, subtotal - Number(discountAmount));
  const taxAmount = Math.round((discountedSubtotal * Number(taxPercentage)) / 100);
  const grandTotal = discountedSubtotal + taxAmount;
  const balance = Math.max(0, grandTotal - Number(advanceRequired));

  // Save Quotation
  const handleSaveQuotation = (targetStatus: 'Draft' | 'Sent' = 'Draft') => {
    const cust = customers.find((c) => c.id === selectedCustomerId);

    const quotPayload = {
      date: new Date().toISOString().split('T')[0],
      validUntil: '2026-12-31',
      customerId: selectedCustomerId,
      customerName: cust ? cust.name : 'Valued Client',
      customerPhone: cust ? cust.phone : '',
      customerEmail: cust ? cust.email : '',
      eventName,
      eventType,
      eventDate,
      venue,
      guestCount: Number(guestCount),
      items,
      subtotal,
      discount: Number(discountAmount),
      additionalCharges: 0,
      taxPercentage: Number(taxPercentage),
      tax: taxAmount,
      grandTotal,
      advanceRequired: Number(advanceRequired),
      balance,
      paymentScheduleNotes: '50% advance on confirmation, 30% on food preparation, 20% post event completion.',
      termsAndConditions: [
        'Final guest count must be locked 3 days prior to event.',
        'Stage sound & lighting installation will be commissioned 4 hours before function start.',
        'All taxes included as per GST guidelines.'
      ],
      status: targetStatus,
      notes
    };

    let savedQuotation: Quotation;
    if (existingQuotation) {
      updateQuotation(existingQuotation.id, quotPayload);
      savedQuotation = { ...existingQuotation, ...quotPayload };
    } else {
      savedQuotation = addQuotation(quotPayload);
    }

    navigateToQuotationPreview(savedQuotation.id);
  };

  return (
    <div className="page-content-container">
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button className="btn btn-ghost btn-icon btn-sm" onClick={() => setCurrentView('quotations')}>
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 style={{ fontSize: '1.55rem' }}>
              {existingQuotation ? `Edit Quotation (${existingQuotation.quotationNumber})` : 'Quotation Builder'}
            </h1>
            <p style={{ fontSize: '0.84rem' }}>
              Combine food menus, live stations and audio-visual gear into an elegant client proposal
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-secondary" onClick={() => handleSaveQuotation('Draft')}>
            Save Draft
          </button>
          <button className="btn btn-primary" onClick={() => handleSaveQuotation('Sent')} style={{ gap: '6px' }}>
            <Eye size={16} />
            <span>Save & Preview Client Sheet</span>
          </button>
        </div>
      </div>

      {/* Two-Column Desktop Workspace Layout */}
      <div className="builder-layout-desktop">
        {/* Left Column: Form & Line Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Section 1: Customer & Event Setup */}
          <div className="soft-card" style={{ padding: '1.25rem' }}>
            <h3 className="soft-card-title" style={{ fontSize: '1.05rem', marginBottom: '1rem' }}>
              1. Event & Client Information
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.85rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Client</label>
                <select
                  className="form-select"
                  value={selectedCustomerId}
                  onChange={(e) => setSelectedCustomerId(e.target.value)}
                >
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.phone})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Event Occasion Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Event Date</label>
                <input
                  type="date"
                  className="form-input"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Expected Guest Count *</label>
                <input
                  type="number"
                  className="form-input"
                  min="1"
                  value={guestCount}
                  onChange={(e) => handleGuestCountChange(Number(e.target.value))}
                  style={{ fontWeight: 700, color: 'var(--primary-dark)' }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Venue Location</label>
                <input
                  type="text"
                  className="form-input"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Section 2: Direct Component Quick Injectors */}
          <div className="soft-card" style={{ padding: '1.25rem', backgroundColor: 'var(--bg-surface-secondary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <h3 className="soft-card-title" style={{ fontSize: '1.02rem' }}>
                2. Quick Add First-Class Components
              </h3>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                Insert menus, live counters & light/sound instantly
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem' }}>
              {/* Insert Food Menu */}
              <div style={{ backgroundColor: 'var(--bg-surface)', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: 600, color: 'var(--primary-dark)', marginBottom: '6px' }}>
                  <Utensils size={14} />
                  <span>Insert Food Menu</span>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <select
                    className="form-select"
                    style={{ fontSize: '0.82rem', padding: '4px 8px' }}
                    value={selectedMenuToAdd}
                    onChange={(e) => setSelectedMenuToAdd(e.target.value)}
                  >
                    {reusableMenus.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name} (₹{m.ratePerPerson}/p)
                      </option>
                    ))}
                  </select>
                  <button className="btn btn-primary btn-sm" onClick={handleAddFoodMenu}>
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Insert Live Counter */}
              <div style={{ backgroundColor: 'var(--bg-surface)', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: 600, color: 'var(--primary-dark)', marginBottom: '6px' }}>
                  <Sparkles size={14} />
                  <span>Insert Live Counter</span>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <select
                    className="form-select"
                    style={{ fontSize: '0.82rem', padding: '4px 8px' }}
                    value={selectedCounterToAdd}
                    onChange={(e) => setSelectedCounterToAdd(e.target.value)}
                  >
                    {liveCounters.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} (₹{c.rate})
                      </option>
                    ))}
                  </select>
                  <button className="btn btn-primary btn-sm" onClick={handleAddLiveCounter}>
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Insert Sound Package */}
              <div style={{ backgroundColor: 'var(--bg-surface)', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: 600, color: 'var(--primary-dark)', marginBottom: '6px' }}>
                  <Speaker size={14} />
                  <span>Insert Sound Package</span>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <select
                    className="form-select"
                    style={{ fontSize: '0.82rem', padding: '4px 8px' }}
                    value={selectedPackageToAdd}
                    onChange={(e) => setSelectedPackageToAdd(e.target.value)}
                  >
                    {lightSoundPackages.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} (₹{p.rate})
                      </option>
                    ))}
                  </select>
                  <button className="btn btn-primary btn-sm" onClick={handleAddSoundPackage}>
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Insert Equipment / Moving Heads */}
              <div style={{ backgroundColor: 'var(--bg-surface)', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: 600, color: 'var(--primary-dark)', marginBottom: '6px' }}>
                  <Speaker size={14} />
                  <span>Insert Equipment</span>
                </div>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <select
                    className="form-select"
                    style={{ fontSize: '0.82rem', padding: '4px 6px', flex: 2 }}
                    value={selectedEquipmentToAdd}
                    onChange={(e) => setSelectedEquipmentToAdd(e.target.value)}
                  >
                    {equipmentList.map((eq) => (
                      <option key={eq.id} value={eq.id}>
                        {eq.name} (₹{eq.rentalRate})
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    className="form-input"
                    style={{ width: '50px', padding: '4px', fontSize: '0.82rem', textAlign: 'center' }}
                    value={equipmentQtyToAdd}
                    min="1"
                    onChange={(e) => setEquipmentQtyToAdd(Number(e.target.value))}
                  />
                  <button className="btn btn-primary btn-sm" onClick={handleAddEquipment}>
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Line Items Table */}
          <div className="soft-card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 className="soft-card-title" style={{ fontSize: '1.05rem' }}>
                3. Quotation Line Items ({items.length})
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {items.map((it, idx) => (
                <div
                  key={it.id}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className="badge badge-primary" style={{ fontSize: '0.72rem' }}>
                          {it.category}
                        </span>
                        <input
                          type="text"
                          className="form-input"
                          style={{ padding: '2px 6px', height: 'auto', fontWeight: 600, fontSize: '0.94rem' }}
                          value={it.name}
                          onChange={(e) => handleUpdateItem(it.id, 'name', e.target.value)}
                        />
                      </div>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                        {it.description}
                      </p>
                    </div>

                    <button
                      className="btn btn-ghost btn-icon btn-sm"
                      onClick={() => handleRemoveItem(it.id)}
                      title="Remove Item"
                    >
                      <Trash2 size={15} style={{ color: 'var(--status-danger-text)' }} />
                    </button>
                  </div>

                  {/* Quantity, Rate & Total Row */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '8px',
                      borderTop: '1px solid var(--border-light)',
                      fontSize: '0.86rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>Qty:</span>
                        <input
                          type="number"
                          className="form-input"
                          style={{ width: '80px', padding: '3px 6px', fontSize: '0.84rem' }}
                          value={it.quantity}
                          min="1"
                          onChange={(e) => handleUpdateItem(it.id, 'quantity', e.target.value)}
                        />
                        <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>{it.unit}</span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>Rate:</span>
                        <input
                          type="number"
                          className="form-input"
                          style={{ width: '90px', padding: '3px 6px', fontSize: '0.84rem' }}
                          value={it.rate}
                          min="0"
                          onChange={(e) => handleUpdateItem(it.id, 'rate', e.target.value)}
                        />
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', display: 'block' }}>Line Total</span>
                      <strong style={{ fontSize: '1.05rem', color: 'var(--primary-dark)' }}>
                        ₹{it.total.toLocaleString()}
                      </strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Live Quotation Summary */}
        <div className="sticky-sidebar-summary">
          <div className="soft-card" style={{ padding: '1.5rem', backgroundColor: 'var(--bg-surface)' }}>
            <h3 className="soft-card-title" style={{ fontSize: '1.15rem', marginBottom: '1.25rem' }}>
              Quotation Summary
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Subtotal ({items.length} items):</span>
                <strong>₹{subtotal.toLocaleString()}</strong>
              </div>

              {/* Discount Input */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Discount (₹):</span>
                <input
                  type="number"
                  className="form-input"
                  style={{ width: '110px', padding: '3px 8px', textAlign: 'right', fontSize: '0.86rem' }}
                  value={discountAmount}
                  min="0"
                  onChange={(e) => setDiscountAmount(Number(e.target.value))}
                />
              </div>

              {/* Tax GST Input */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>GST Tax ({taxPercentage}%):</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <select
                    className="form-select"
                    style={{ width: '68px', padding: '3px 6px', fontSize: '0.82rem' }}
                    value={taxPercentage}
                    onChange={(e) => setTaxPercentage(Number(e.target.value))}
                  >
                    <option value={0}>0%</option>
                    <option value={5}>5%</option>
                    <option value={12}>12%</option>
                    <option value={18}>18%</option>
                  </select>
                  <span>₹{taxAmount.toLocaleString()}</span>
                </div>
              </div>

              <div
                style={{
                  marginTop: '0.5rem',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--primary-lighter)',
                  border: '1.5px solid var(--primary-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--primary-dark)', fontWeight: 600, display: 'block' }}>
                    Grand Total
                  </span>
                  <strong style={{ fontSize: '1.45rem', color: 'var(--primary-dark)', fontFamily: 'var(--font-display)' }}>
                    ₹{grandTotal.toLocaleString()}
                  </strong>
                </div>
                <span className="badge badge-success">Ready to Send</span>
              </div>

              {/* Advance & Balance */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.25rem' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Advance Required (₹):</span>
                <input
                  type="number"
                  className="form-input"
                  style={{ width: '120px', padding: '3px 8px', textAlign: 'right', fontSize: '0.86rem' }}
                  value={advanceRequired}
                  min="0"
                  onChange={(e) => setAdvanceRequired(Number(e.target.value))}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Estimated Balance on Function:</span>
                <strong style={{ color: 'var(--status-warning-text)' }}>₹{balance.toLocaleString()}</strong>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '1rem' }}>
                <button
                  className="btn btn-primary"
                  onClick={() => handleSaveQuotation('Sent')}
                  style={{ width: '100%', gap: '6px' }}
                >
                  <Eye size={16} />
                  <span>Preview & Export Client Sheet</span>
                </button>

                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleSaveQuotation('Draft')}
                  style={{ width: '100%' }}
                >
                  Save as Draft
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
