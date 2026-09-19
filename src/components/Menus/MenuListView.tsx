import React from 'react';
import { useApp } from '../../context/AppContext';
import { Utensils, Plus, ArrowRight, CheckCircle2, Edit } from 'lucide-react';

export const MenuListView: React.FC = () => {
  const { reusableMenus, navigateToMenuBuilder, navigateToQuotationBuilder } = useApp();

  return (
    <div className="page-content-container">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '1.65rem' }}>Reusable Food Menus</h1>
          <p style={{ fontSize: '0.9rem' }}>
            Curated catering menu packages ready to be directly inserted and auto-calculated in quotations.
          </p>
        </div>

        <button className="btn btn-primary" onClick={() => navigateToMenuBuilder()} style={{ gap: '6px' }}>
          <Plus size={16} />
          <span>Design New Menu</span>
        </button>
      </div>

      {/* Menus List Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
        {reusableMenus.map((menu) => {
          const totalItemsCount = menu.categories.reduce((sum, cat) => sum + cat.items.length, 0);

          return (
            <div
              key={menu.id}
              className="soft-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <div>
                    <span className="badge badge-primary" style={{ fontSize: '0.72rem', marginBottom: '4px' }}>
                      {menu.pricingType}
                    </span>
                    <h3 style={{ fontSize: '1.2rem', lineHeight: 1.3 }}>{menu.name}</h3>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Price / Person</div>
                    <strong style={{ fontSize: '1.25rem', color: 'var(--primary-dark)' }}>
                      ₹{menu.ratePerPerson}
                    </strong>
                  </div>
                </div>

                {menu.notes && (
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                    {menu.notes}
                  </p>
                )}

                {/* Categories breakdown preview */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: '1rem 0' }}>
                  {menu.categories.map((cat, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '8px 10px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'var(--bg-surface-secondary)',
                        fontSize: '0.82rem'
                      }}
                    >
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '2px' }}>
                        {cat.categoryName} ({cat.items.length})
                      </div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {cat.items.join(', ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  paddingTop: '0.85rem',
                  borderTop: '1px solid var(--border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Total {totalItemsCount} items
                </span>

                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => navigateToMenuBuilder(menu.id)}
                    style={{ gap: '4px' }}
                  >
                    <Edit size={14} />
                    <span>Edit Menu</span>
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => navigateToQuotationBuilder()}
                    style={{ gap: '4px' }}
                  >
                    <span>Use in Quote</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
