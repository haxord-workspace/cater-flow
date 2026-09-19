import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { FoodCategory, FoodItem, ReusableMenu } from '../../types';
import {
  Utensils,
  Plus,
  Trash2,
  ArrowLeft,
  Check,
  Search,
  Sparkles,
  DollarSign
} from 'lucide-react';

export const MenuBuilderView: React.FC = () => {
  const {
    selectedMenuId,
    reusableMenus,
    foodItems,
    liveCounters,
    addReusableMenu,
    updateReusableMenu,
    setCurrentView
  } = useApp();

  const existingMenu = reusableMenus.find((m) => m.id === selectedMenuId);

  // Form State
  const [menuName, setMenuName] = useState(existingMenu?.name || 'Kerala Royal Feast Menu');
  const [pricingType, setPricingType] = useState<'Per Person' | 'Fixed Package' | 'Custom Pricing'>(
    existingMenu?.pricingType || 'Per Person'
  );
  const [ratePerPerson, setRatePerPerson] = useState<number>(existingMenu?.ratePerPerson || 650);
  const [notes, setNotes] = useState(
    existingMenu?.notes || 'Signature wedding feast with live counter and premium copper service.'
  );

  // Selected items organized by category
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory>('Welcome Drinks');
  const [searchFoodQuery, setSearchFoodQuery] = useState('');
  
  // Array of { categoryName: FoodCategory, items: string[] }
  const [menuCategories, setMenuCategories] = useState<{ categoryName: FoodCategory; items: string[] }[]>(
    existingMenu?.categories || [
      {
        categoryName: 'Welcome Drinks',
        items: ['Tender Coconut Elixir with Mint', 'Passion Fruit Mojito Cooler']
      },
      {
        categoryName: 'Starters',
        items: ['Malabar Chicken Pepper Bites', 'Tandoori Malai Paneer Skewers']
      },
      {
        categoryName: 'Main Course',
        items: ['Authentic Thalassery Dum Biryani (Chicken)', 'Fragrant Kerala Ghee Rice (Neychoru)']
      },
      {
        categoryName: 'Curries',
        items: ['Travancore Chicken Roast (Semi-Gravy)', 'Paneer Butter Masala']
      },
      {
        categoryName: 'Desserts',
        items: ['Royal Elaneer (Tender Coconut) Payasam']
      }
    ]
  );

  const [selectedCounters, setSelectedCounters] = useState<string[]>(
    existingMenu?.liveCounters || ['counter-01']
  );

  // Available food categories
  const categoriesList: FoodCategory[] = [
    'Welcome Drinks',
    'Starters',
    'Main Course',
    'Rice',
    'Breads',
    'Curries',
    'Desserts'
  ];

  // Helper to toggle food item in selected category
  const isItemInMenu = (itemName: string) => {
    return menuCategories.some((cat) => cat.items.includes(itemName));
  };

  const handleToggleItem = (categoryName: FoodCategory, itemName: string) => {
    setMenuCategories((prev) => {
      const existingCatIndex = prev.findIndex((c) => c.categoryName === categoryName);

      if (existingCatIndex > -1) {
        const cat = prev[existingCatIndex];
        const isSelected = cat.items.includes(itemName);

        let newItems = isSelected
          ? cat.items.filter((i) => i !== itemName)
          : [...cat.items, itemName];

        if (newItems.length === 0) {
          return prev.filter((_, idx) => idx !== existingCatIndex);
        } else {
          const updated = [...prev];
          updated[existingCatIndex] = { ...cat, items: newItems };
          return updated;
        }
      } else {
        return [...prev, { categoryName, items: [itemName] }];
      }
    });
  };

  const handleRemoveCategoryItem = (categoryName: FoodCategory, itemName: string) => {
    handleToggleItem(categoryName, itemName);
  };

  // Live total count
  const totalSelectedItems = menuCategories.reduce((sum, cat) => sum + cat.items.length, 0);

  // Filtered food items for the center catalog column
  const availableItemsForCategory = foodItems.filter((f) => {
    const matchesCat = f.category === selectedCategory || (selectedCategory === 'Main Course' && (f.category === 'Main Course' || f.category === 'Rice' || f.category === 'Breads'));
    const matchesSearch = f.name.toLowerCase().includes(searchFoodQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleSave = () => {
    if (!menuName.trim()) return;

    if (existingMenu) {
      updateReusableMenu(existingMenu.id, {
        name: menuName,
        pricingType,
        ratePerPerson: Number(ratePerPerson),
        categories: menuCategories,
        liveCounters: selectedCounters,
        notes
      });
    } else {
      addReusableMenu({
        name: menuName,
        pricingType,
        ratePerPerson: Number(ratePerPerson),
        categories: menuCategories,
        liveCounters: selectedCounters,
        notes
      });
    }

    setCurrentView('menus');
  };

  // Mobile View Switcher (for small screens)
  const [mobileActiveTab, setMobileActiveTab] = useState<'categories' | 'food' | 'selected'>('food');

  return (
    <div className="page-content-container">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button className="btn btn-ghost btn-icon btn-sm" onClick={() => setCurrentView('menus')}>
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 style={{ fontSize: '1.5rem' }}>{existingMenu ? 'Edit Menu Template' : 'Interactive Menu Builder'}</h1>
            <p style={{ fontSize: '0.84rem' }}>Select food categories, pick delicacies, and configure per-person rates</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-secondary btn-sm" onClick={() => setCurrentView('menus')}>
            Cancel
          </button>
          <button className="btn btn-primary btn-sm" onClick={handleSave} style={{ gap: '6px' }}>
            <Check size={16} />
            <span>Save Menu</span>
          </button>
        </div>
      </div>

      {/* Menu Settings Bar */}
      <div className="soft-card" style={{ padding: '1rem 1.25rem', marginBottom: '1.25rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.85rem', alignItems: 'flex-end' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Menu Template Name *</label>
            <input
              type="text"
              className="form-input"
              value={menuName}
              onChange={(e) => setMenuName(e.target.value)}
              placeholder="e.g. Royal Travancore Feast"
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Pricing Model</label>
            <select
              className="form-select"
              value={pricingType}
              onChange={(e) => setPricingType(e.target.value as any)}
            >
              <option value="Per Person">Per Person Rate (₹/plate)</option>
              <option value="Fixed Package">Fixed Package Rate</option>
              <option value="Custom Pricing">Custom Pricing</option>
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Price Per Person (₹) *</label>
            <input
              type="number"
              className="form-input"
              value={ratePerPerson}
              onChange={(e) => setRatePerPerson(Number(e.target.value))}
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Service Inclusions</label>
            <input
              type="text"
              className="form-input"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Copper chafing & linen included"
            />
          </div>
        </div>
      </div>

      {/* Mobile Step Selector (Visible on Mobile / Hidden on Desktop) */}
      <div className="chip-container mobile-step-bar" style={{ marginBottom: '1rem' }}>
        <button
          className={`chip-btn ${mobileActiveTab === 'categories' ? 'active' : ''}`}
          onClick={() => setMobileActiveTab('categories')}
        >
          1. Categories ({selectedCategory})
        </button>
        <button
          className={`chip-btn ${mobileActiveTab === 'food' ? 'active' : ''}`}
          onClick={() => setMobileActiveTab('food')}
        >
          2. Pick Food Items
        </button>
        <button
          className={`chip-btn ${mobileActiveTab === 'selected' ? 'active' : ''}`}
          onClick={() => setMobileActiveTab('selected')}
        >
          3. Selected Menu ({totalSelectedItems})
        </button>
      </div>

      {/* 3-Part Workspace Layout */}
      <div className={`menu-builder-grid-desktop mobile-tab-${mobileActiveTab}`}>
        {/* Column 1: Food Categories (Left) */}
        <div className="soft-card" style={{ padding: '1rem' }}>
          <div className="soft-card-title" style={{ fontSize: '0.95rem', marginBottom: '0.75rem' }}>
            1. Categories
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {categoriesList.map((cat) => {
              const currentCatObj = menuCategories.find((c) => c.categoryName === cat);
              const count = currentCatObj ? currentCatObj.items.length : 0;
              const isSelected = selectedCategory === cat;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '9px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    backgroundColor: isSelected ? 'var(--primary-soft)' : 'var(--bg-surface)',
                    color: isSelected ? 'var(--primary-dark)' : 'var(--text-primary)',
                    fontWeight: isSelected ? 600 : 500,
                    fontSize: '0.86rem',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <span>{cat}</span>
                  {count > 0 && (
                    <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Column 2: Available Food Items (Center) */}
        <div className="soft-card" style={{ padding: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <div className="soft-card-title" style={{ fontSize: '0.95rem' }}>
              2. Available {selectedCategory}
            </div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              Click + to add/remove
            </span>
          </div>

          <div style={{ position: 'relative', marginBottom: '0.75rem' }}>
            <Search
              size={16}
              style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
            />
            <input
              type="text"
              placeholder={`Search in ${selectedCategory}...`}
              className="form-input"
              style={{ paddingLeft: '32px', height: '38px', fontSize: '0.84rem' }}
              value={searchFoodQuery}
              onChange={(e) => setSearchFoodQuery(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '520px', overflowY: 'auto' }}>
            {availableItemsForCategory.length === 0 ? (
              <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                No items found for this category.
              </div>
            ) : (
              availableItemsForCategory.map((item) => {
                const added = isItemInMenu(item.name);

                return (
                  <div
                    key={item.id}
                    onClick={() => handleToggleItem(selectedCategory, item.name)}
                    style={{
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: added ? 'var(--primary-lighter)' : 'var(--bg-surface-secondary)',
                      border: `1px solid ${added ? 'var(--primary-border)' : 'var(--border-color)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '0.75rem' }}>
                        {item.dietary === 'veg' ? '🟢' : item.dietary === 'vegan' ? '🌱' : '🔴'}
                      </span>
                      <div>
                        <div style={{ fontWeight: 500, fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                          {item.name}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                          Cost: ₹{item.estimatedCost} • Base: ₹{item.sellingRate}
                        </div>
                      </div>
                    </div>

                    <button
                      className={`btn btn-sm ${added ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                    >
                      {added ? <Check size={14} /> : <Plus size={14} />}
                      <span>{added ? 'Added' : 'Add'}</span>
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Column 3: Selected Menu Structure & Live Pricing (Right) */}
        <div className="soft-card" style={{ padding: '1rem', backgroundColor: 'var(--bg-surface)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <div className="soft-card-title" style={{ fontSize: '0.95rem' }}>
              3. Selected Menu ({totalSelectedItems} items)
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '420px', overflowY: 'auto' }}>
            {menuCategories.length === 0 ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                No dishes added yet. Select from the center list.
              </div>
            ) : (
              menuCategories.map((cat, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '8px 10px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--bg-surface-secondary)',
                    border: '1px solid var(--border-light)'
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: '0.84rem', color: 'var(--primary-dark)', marginBottom: '4px' }}>
                    {cat.categoryName} ({cat.items.length})
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    {cat.items.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          fontSize: '0.82rem'
                        }}
                      >
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          • {item}
                        </span>
                        <button
                          onClick={() => handleRemoveCategoryItem(cat.categoryName, item)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--text-muted)',
                            cursor: 'pointer',
                            padding: '2px'
                          }}
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Live Pricing Box */}
          <div
            style={{
              marginTop: '1rem',
              padding: '12px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--primary-lighter)',
              border: '1px solid var(--primary-border)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', marginBottom: '4px' }}>
              <span>Price Rate:</span>
              <strong>₹{ratePerPerson} / person</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              <span>Example (650 guests):</span>
              <span>₹{(650 * ratePerPerson).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
