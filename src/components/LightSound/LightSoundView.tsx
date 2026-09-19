import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EquipmentCategory, EquipmentItem, LightSoundPackage } from '../../types';
import { Speaker, Plus, Search, Check, Wrench, Shield, CheckCircle2 } from 'lucide-react';
import { StatusBadge } from '../Common/StatusBadge';

export const LightSoundView: React.FC = () => {
  const {
    equipmentList,
    lightSoundPackages,
    addEquipmentItem,
    addLightSoundPackage,
    navigateToQuotationBuilder
  } = useApp();

  const [activeTab, setActiveTab] = useState<'packages' | 'inventory'>('packages');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const categories: string[] = [
    'All',
    'Speakers',
    'Subwoofers',
    'Moving Head Lights',
    'LED Par Lights',
    'Wireless Microphones',
    'Mixing Consoles',
    'Truss'
  ];

  const filteredEquipment = equipmentList.filter((eq) => {
    const matchesSearch =
      eq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      eq.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      eq.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCat = categoryFilter === 'All' || eq.category === categoryFilter;

    return matchesSearch && matchesCat;
  });

  return (
    <div className="page-content-container">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '1.65rem' }}>Light & Sound Rental Operations</h1>
          <p style={{ fontSize: '0.9rem' }}>
            Stage concert sound systems, moving beam lighting, and AV packages directly quotation-ready.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className={`btn ${activeTab === 'packages' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('packages')}
          >
            <span>Rental Packages ({lightSoundPackages.length})</span>
          </button>
          <button
            className={`btn ${activeTab === 'inventory' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('inventory')}
          >
            <span>Equipment Inventory ({equipmentList.length})</span>
          </button>
        </div>
      </div>

      {/* PACKAGES TAB */}
      {activeTab === 'packages' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
          {lightSoundPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="soft-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <div>
                    <span className="badge badge-primary" style={{ fontSize: '0.72rem', marginBottom: '4px' }}>
                      {pkg.rentalUnit}
                    </span>
                    <h3 style={{ fontSize: '1.2rem', lineHeight: 1.3 }}>{pkg.name}</h3>
                  </div>

                  <strong style={{ fontSize: '1.25rem', color: 'var(--primary-dark)' }}>
                    ₹{pkg.rate.toLocaleString()}
                  </strong>
                </div>

                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: 1.4 }}>
                  {pkg.description}
                </p>

                {/* Included Gear Breakdown */}
                <div
                  style={{
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-surface-secondary)',
                    marginBottom: '1rem'
                  }}
                >
                  <div style={{ fontSize: '0.76rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Packaged Audio/Visual Rig:
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {pkg.equipmentList.map((eq, i) => (
                      <div key={i} style={{ fontSize: '0.82rem', display: 'flex', justifyContent: 'space-between' }}>
                        <span>{eq.name}</span>
                        <strong>×{eq.quantity}</strong>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Inclusions badges */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                  {pkg.includesOperator && (
                    <span className="badge badge-neutral" style={{ fontSize: '0.72rem' }}>
                      ✓ Sound Tech Included
                    </span>
                  )}
                  {pkg.includesInstallation && (
                    <span className="badge badge-neutral" style={{ fontSize: '0.72rem' }}>
                      ✓ Rigging & Setup
                    </span>
                  )}
                  {pkg.includesTransport && (
                    <span className="badge badge-neutral" style={{ fontSize: '0.72rem' }}>
                      ✓ Transport Included
                    </span>
                  )}
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
                  Ready to add to quote
                </span>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => navigateToQuotationBuilder()}
                >
                  Add to Quotation
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* INVENTORY TAB */}
      {activeTab === 'inventory' && (
        <div>
          {/* Search & Filter */}
          <div className="soft-card" style={{ padding: '1rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ position: 'relative' }}>
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
                placeholder="Search speaker model, light fixture, console..."
                className="form-input"
                style={{ paddingLeft: '38px', height: '42px' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="chip-container">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`chip-btn ${categoryFilter === cat ? 'active' : ''}`}
                  onClick={() => setCategoryFilter(cat)}
                >
                  <span>{cat}</span>
                  {cat === 'All' ? (
                    <span style={{ opacity: 0.7 }}>({equipmentList.length})</span>
                  ) : (
                    <span style={{ opacity: 0.7 }}>
                      ({equipmentList.filter((eq) => eq.category === cat).length})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
            {filteredEquipment.map((eq) => (
              <div
                key={eq.id}
                className="soft-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <div>
                      <span className="badge badge-neutral" style={{ fontSize: '0.7rem', marginBottom: '4px' }}>
                        {eq.category}
                      </span>
                      <h3 style={{ fontSize: '1.05rem', lineHeight: 1.3 }}>{eq.name}</h3>
                    </div>
                    <StatusBadge status={eq.status} size="sm" />
                  </div>

                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', lineHeight: 1.4 }}>
                    {eq.description}
                  </p>
                </div>

                <div
                  style={{
                    paddingTop: '0.75rem',
                    borderTop: '1px solid var(--border-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Rental Rate</div>
                    <strong style={{ fontSize: '1.05rem' }}>₹{eq.rentalRate.toLocaleString()}</strong>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}> / {eq.rentalUnit.replace('Per ', '')}</span>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Available</div>
                    <span style={{ fontWeight: 600, color: 'var(--status-success-text)' }}>
                      {eq.availableQuantity} of {eq.totalQuantity} Units
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
