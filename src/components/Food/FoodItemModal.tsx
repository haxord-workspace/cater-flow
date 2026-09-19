import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { FoodCategory, FoodItem, FoodUnit } from '../../types';
import { X, Check } from 'lucide-react';

interface FoodItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingItem?: FoodItem | null;
}

export const FoodItemModal: React.FC<FoodItemModalProps> = ({ isOpen, onClose, editingItem }) => {
  const { addFoodItem, updateFoodItem } = useApp();

  const [name, setName] = useState('');
  const [category, setCategory] = useState<FoodCategory>('Main Course');
  const [description, setDescription] = useState('');
  const [unit, setUnit] = useState<FoodUnit>('Per Person');
  const [sellingRate, setSellingRate] = useState<number>(100);
  const [estimatedCost, setEstimatedCost] = useState<number>(40);
  const [dietary, setDietary] = useState<'veg' | 'non-veg' | 'vegan'>('veg');
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    if (editingItem) {
      setName(editingItem.name);
      setCategory(editingItem.category);
      setDescription(editingItem.description);
      setUnit(editingItem.unit);
      setSellingRate(editingItem.sellingRate);
      setEstimatedCost(editingItem.estimatedCost);
      setDietary(editingItem.dietary);
      setIsAvailable(editingItem.isAvailable);
    } else {
      setName('');
      setCategory('Main Course');
      setDescription('');
      setUnit('Per Person');
      setSellingRate(100);
      setEstimatedCost(40);
      setDietary('veg');
      setIsAvailable(true);
    }
  }, [editingItem, isOpen]);

  if (!isOpen) return null;

  const categories: FoodCategory[] = [
    'Welcome Drinks',
    'Starters',
    'Main Course',
    'Rice',
    'Breads',
    'Curries',
    'Vegetarian',
    'Non Vegetarian',
    'Salads',
    'Pickles',
    'Desserts',
    'Ice Cream',
    'Fruits',
    'Tea & Coffee',
    'Juices',
    'Live Counters',
    'Other'
  ];

  const units: FoodUnit[] = [
    'Per Person',
    'Per Plate',
    'Per Piece',
    'Per KG',
    'Per Litre',
    'Per Bowl',
    'Per Tray',
    'Fixed'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    if (editingItem) {
      updateFoodItem(editingItem.id, {
        name,
        category,
        description,
        unit,
        sellingRate: Number(sellingRate),
        estimatedCost: Number(estimatedCost),
        dietary,
        isAvailable
      });
    } else {
      addFoodItem({
        name,
        category,
        description,
        unit,
        sellingRate: Number(sellingRate),
        estimatedCost: Number(estimatedCost),
        dietary,
        isAvailable,
        isActive: true
      });
    }

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3 className="soft-card-title">{editingItem ? 'Edit Food Item' : 'Add Food Item to Catalog'}</h3>
            <p style={{ fontSize: '0.82rem', marginTop: '2px' }}>
              Used in reusable menus and direct quotation calculations
            </p>
          </div>
          <button className="btn btn-ghost btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Food Item Name *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Malabar Dum Biryani"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as FoodCategory)}
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Dietary Type</label>
                <select
                  className="form-select"
                  value={dietary}
                  onChange={(e) => setDietary(e.target.value as 'veg' | 'non-veg' | 'vegan')}
                >
                  <option value="veg">Vegetarian 🟢</option>
                  <option value="non-veg">Non-Vegetarian 🔴</option>
                  <option value="vegan">Vegan 🌱</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Pricing Unit</label>
                <select
                  className="form-select"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value as FoodUnit)}
                >
                  {units.map((u) => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Selling Rate (₹) *</label>
                <input
                  type="number"
                  className="form-input"
                  min="0"
                  value={sellingRate}
                  onChange={(e) => setSellingRate(Number(e.target.value))}
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Estimated Cost (₹)</label>
                <input
                  type="number"
                  className="form-input"
                  min="0"
                  value={estimatedCost}
                  onChange={(e) => setEstimatedCost(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Description & Key Ingredients</label>
              <textarea
                className="form-textarea"
                placeholder="Fragrant aged Kaima rice layered with tender meat, fried onions and Malabar spices..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" style={{ gap: '6px' }}>
              <Check size={16} />
              <span>{editingItem ? 'Save Changes' : 'Add to Catalog'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
