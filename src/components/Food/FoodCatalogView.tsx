import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FoodCategory, FoodItem } from '../../types';
import { Search, Plus, Utensils, Edit, Check, Sparkles } from 'lucide-react';
import { FoodItemModal } from './FoodItemModal';

interface FoodCatalogViewProps {
  onOpenCreateFoodItem: () => void;
}

export const FoodCatalogView: React.FC<FoodCatalogViewProps> = () => {
  const { foodItems } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [dietaryFilter, setDietaryFilter] = useState<string>('All');
  const [editingItem, setEditingItem] = useState<FoodItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories: string[] = [
    'All',
    'Welcome Drinks',
    'Starters',
    'Main Course',
    'Rice',
    'Breads',
    'Curries',
    'Desserts'
  ];

  const filteredItems = foodItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesDietary = dietaryFilter === 'All' || item.dietary === dietaryFilter;

    return matchesSearch && matchesCategory && matchesDietary;
  });

  const handleEdit = (item: FoodItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  return (
    <div className="page-content-container">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '1.65rem' }}>Food & Beverage Catalog</h1>
          <p style={{ fontSize: '0.9rem' }}>
            Manage all culinary items, selling rates, estimated food costs and recipe notes.
          </p>
        </div>

        <button className="btn btn-primary" onClick={handleAddNew} style={{ gap: '6px' }}>
          <Plus size={16} />
          <span>Add Food Item</span>
        </button>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="soft-card" style={{ padding: '1rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
            <Search
              size={18}
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)'
              }}
            />
            <input
              type="text"
              placeholder="Search food item, ingredient or spice..."
              className="form-input"
              style={{ paddingLeft: '38px', height: '42px' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              className={`chip-btn ${dietaryFilter === 'All' ? 'active' : ''}`}
              onClick={() => setDietaryFilter('All')}
            >
              All Types
            </button>
            <button
              className={`chip-btn ${dietaryFilter === 'veg' ? 'active' : ''}`}
              onClick={() => setDietaryFilter('veg')}
            >
              🟢 Veg Only
            </button>
            <button
              className={`chip-btn ${dietaryFilter === 'non-veg' ? 'active' : ''}`}
              onClick={() => setDietaryFilter('non-veg')}
            >
              🔴 Non-Veg
            </button>
          </div>
        </div>

        {/* Category Chips */}
        <div className="chip-container">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`chip-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              <span>{cat}</span>
              {cat === 'All' ? (
                <span style={{ opacity: 0.7 }}>({foodItems.length})</span>
              ) : (
                <span style={{ opacity: 0.7 }}>
                  ({foodItems.filter((f) => f.category === cat).length})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Food Items Catalog Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
        {filteredItems.map((item) => {
          const margin = item.sellingRate - item.estimatedCost;
          const marginPercent = item.sellingRate > 0 ? Math.round((margin / item.sellingRate) * 100) : 0;

          return (
            <div
              key={item.id}
              className="soft-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'border-color var(--transition-fast)'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.8rem' }}>
                        {item.dietary === 'veg' ? '🟢' : item.dietary === 'vegan' ? '🌱' : '🔴'}
                      </span>
                      <span className="badge badge-neutral" style={{ fontSize: '0.7rem' }}>
                        {item.category}
                      </span>
                    </div>
                    <h3 style={{ fontSize: '1.05rem', lineHeight: 1.3 }}>{item.name}</h3>
                  </div>

                  <button
                    className="btn btn-ghost btn-icon btn-sm"
                    onClick={() => handleEdit(item)}
                    title="Edit Item"
                  >
                    <Edit size={15} />
                  </button>
                </div>

                <p style={{ fontSize: '0.82rem', marginTop: '6px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  {item.description}
                </p>
              </div>

              <div
                style={{
                  marginTop: '1rem',
                  paddingTop: '0.75rem',
                  borderTop: '1px solid var(--border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Selling Rate</div>
                  <strong style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                    ₹{item.sellingRate}
                  </strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}> / {item.unit.replace('Per ', '')}</span>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Est. Food Cost</div>
                  <span style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                    ₹{item.estimatedCost} ({marginPercent}% margin)
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <FoodItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingItem={editingItem}
      />
    </div>
  );
};
