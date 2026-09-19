import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Calendar, FileText, Utensils, Speaker, Users, DollarSign, X, ArrowRight } from 'lucide-react';
import { StatusBadge } from '../Common/StatusBadge';

export const GlobalSearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    events,
    quotations,
    foodItems,
    reusableMenus,
    equipmentList,
    customers,
    navigateToEvent,
    navigateToQuotationPreview,
    navigateToMenuBuilder,
    setCurrentView
  } = useApp();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  // Keyboard shortcut listener for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const q = query.trim().toLowerCase();

  const matchedEvents = events.filter(
    (e) =>
      e.name.toLowerCase().includes(q) ||
      e.customerName.toLowerCase().includes(q) ||
      e.venue.toLowerCase().includes(q)
  );

  const matchedQuotations = quotations.filter(
    (quo) =>
      quo.quotationNumber.toLowerCase().includes(q) ||
      quo.customerName.toLowerCase().includes(q) ||
      quo.eventName.toLowerCase().includes(q)
  );

  const matchedFood = foodItems.filter(
    (f) => f.name.toLowerCase().includes(q) || f.category.toLowerCase().includes(q)
  );

  const matchedMenus = reusableMenus.filter((m) => m.name.toLowerCase().includes(q));

  const matchedEquipment = equipmentList.filter(
    (eq) => eq.name.toLowerCase().includes(q) || eq.category.toLowerCase().includes(q)
  );

  const hasResults =
    matchedEvents.length > 0 ||
    matchedQuotations.length > 0 ||
    matchedFood.length > 0 ||
    matchedMenus.length > 0 ||
    matchedEquipment.length > 0;

  return (
    <div className="modal-overlay" onClick={() => setIsSearchOpen(false)}>
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '640px', maxHeight: '80vh' }}
      >
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Search size={20} style={{ color: 'var(--text-secondary)' }} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search events, quotations, menus, food, equipment..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              background: 'transparent',
              fontSize: '1rem',
              color: 'var(--text-primary)',
              outline: 'none'
            }}
          />
          {query && (
            <button
              className="btn btn-ghost btn-icon btn-sm"
              onClick={() => setQuery('')}
            >
              <X size={16} />
            </button>
          )}
          <span className="kbd-shortcut">ESC to close</span>
        </div>

        <div className="modal-body" style={{ padding: '1rem', maxHeight: '60vh', overflowY: 'auto' }}>
          {!q ? (
            <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <p style={{ fontSize: '0.9rem' }}>Type to search instantly across all CaterFlow modules.</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '1rem', flexWrap: 'wrap' }}>
                <button className="chip-btn" onClick={() => setQuery('Wedding')}>Try "Wedding"</button>
                <button className="chip-btn" onClick={() => setQuery('Biryani')}>Try "Biryani"</button>
                <button className="chip-btn" onClick={() => setQuery('Sound')}>Try "Sound"</button>
                <button className="chip-btn" onClick={() => setQuery('Rahul')}>Try "Rahul"</button>
              </div>
            </div>
          ) : !hasResults ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
              <p>No matches found for "<strong>{query}</strong>"</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Events */}
              {matchedEvents.length > 0 && (
                <div>
                  <div className="sidebar-section-title" style={{ padding: '0 0 0.5rem 0' }}>Events ({matchedEvents.length})</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {matchedEvents.slice(0, 3).map((evt) => (
                      <div
                        key={evt.id}
                        onClick={() => {
                          navigateToEvent(evt.id);
                          setIsSearchOpen(false);
                        }}
                        style={{
                          padding: '8px 12px',
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: 'var(--bg-surface-secondary)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <Calendar size={16} style={{ color: 'var(--primary)' }} />
                          <div>
                            <div style={{ fontWeight: 500, fontSize: '0.88rem' }}>{evt.name}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                              {evt.customerName} • {evt.eventDate} • {evt.venue}
                            </div>
                          </div>
                        </div>
                        <StatusBadge status={evt.status} size="sm" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quotations */}
              {matchedQuotations.length > 0 && (
                <div>
                  <div className="sidebar-section-title" style={{ padding: '0 0 0.5rem 0' }}>Quotations ({matchedQuotations.length})</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {matchedQuotations.slice(0, 3).map((q) => (
                      <div
                        key={q.id}
                        onClick={() => {
                          navigateToQuotationPreview(q.id);
                          setIsSearchOpen(false);
                        }}
                        style={{
                          padding: '8px 12px',
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: 'var(--bg-surface-secondary)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <FileText size={16} style={{ color: 'var(--primary)' }} />
                          <div>
                            <div style={{ fontWeight: 500, fontSize: '0.88rem' }}>{q.quotationNumber} - {q.eventName}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                              {q.customerName} • ₹{q.grandTotal.toLocaleString()}
                            </div>
                          </div>
                        </div>
                        <StatusBadge status={q.status} size="sm" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Menus & Food */}
              {(matchedMenus.length > 0 || matchedFood.length > 0) && (
                <div>
                  <div className="sidebar-section-title" style={{ padding: '0 0 0.5rem 0' }}>Menu & Food Items</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {matchedMenus.slice(0, 2).map((m) => (
                      <div
                        key={m.id}
                        onClick={() => {
                          navigateToMenuBuilder(m.id);
                          setIsSearchOpen(false);
                        }}
                        style={{
                          padding: '8px 12px',
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: 'var(--bg-surface-secondary)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <Utensils size={16} style={{ color: 'var(--primary)' }} />
                          <span style={{ fontWeight: 500, fontSize: '0.88rem' }}>Menu: {m.name}</span>
                        </div>
                        <span className="badge badge-primary" style={{ fontSize: '0.72rem' }}>₹{m.ratePerPerson}/person</span>
                      </div>
                    ))}

                    {matchedFood.slice(0, 3).map((f) => (
                      <div
                        key={f.id}
                        onClick={() => {
                          setCurrentView('food_catalog');
                          setIsSearchOpen(false);
                        }}
                        style={{
                          padding: '8px 12px',
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: 'var(--bg-surface-secondary)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ fontSize: '0.75rem' }}>{f.dietary === 'veg' ? '🟢' : '🔴'}</span>
                          <div>
                            <div style={{ fontWeight: 500, fontSize: '0.88rem' }}>{f.name}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{f.category}</div>
                          </div>
                        </div>
                        <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>₹{f.sellingRate}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Equipment */}
              {matchedEquipment.length > 0 && (
                <div>
                  <div className="sidebar-section-title" style={{ padding: '0 0 0.5rem 0' }}>Light & Sound Rentals</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {matchedEquipment.slice(0, 3).map((eq) => (
                      <div
                        key={eq.id}
                        onClick={() => {
                          setCurrentView('light_sound');
                          setIsSearchOpen(false);
                        }}
                        style={{
                          padding: '8px 12px',
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: 'var(--bg-surface-secondary)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <Speaker size={16} style={{ color: 'var(--primary)' }} />
                          <div>
                            <div style={{ fontWeight: 500, fontSize: '0.88rem' }}>{eq.name}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{eq.category} • {eq.availableQuantity} available</div>
                          </div>
                        </div>
                        <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>₹{eq.rentalRate.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
