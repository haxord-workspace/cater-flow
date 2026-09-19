import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Settings, Shield, ToggleLeft, ToggleRight, Check, Building, RefreshCw } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { company, updateCompany, resetToSampleData } = useApp();

  const [companyName, setCompanyName] = useState(company.name);
  const [location, setLocation] = useState(company.location);
  const [phone, setPhone] = useState(company.phone);
  const [email, setEmail] = useState(company.email);
  const [gstNumber, setGstNumber] = useState(company.gstNumber || '');
  const [tagline, setTagline] = useState(company.tagline);

  const [modules, setModules] = useState(company.enabledModules);

  const handleToggleModule = (moduleKey: keyof typeof modules) => {
    const updated = { ...modules, [moduleKey]: !modules[moduleKey] };
    setModules(updated);
    updateCompany({ enabledModules: updated });
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateCompany({
      name: companyName,
      location,
      phone,
      email,
      gstNumber,
      tagline,
      enabledModules: modules
    });
  };

  return (
    <div className="page-content-container" style={{ maxWidth: '800px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '1.65rem' }}>Workspace & Module Settings</h1>
          <p style={{ fontSize: '0.9rem' }}>
            Configure your catering enterprise profile, GSTIN tax credentials, and active business modules.
          </p>
        </div>

        <button className="btn btn-secondary btn-sm" onClick={resetToSampleData} style={{ gap: '6px' }}>
          <RefreshCw size={14} />
          <span>Reset Sample Data</span>
        </button>
      </div>

      {/* Module Activation Section (Multi-tenant feature flag per spec) */}
      <div className="soft-card" style={{ marginBottom: '1.5rem', padding: '1.5rem' }}>
        <h3 className="soft-card-title" style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
          Feature Modules Activation
        </h3>
        <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
          Tailor CaterFlow to your business type (e.g. pure catering vs. full event management with light & sound rentals).
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
          {[
            { key: 'food', label: 'Food & Beverage Catalog', desc: 'Culinary catalog, ingredient costs and recipe notes.' },
            { key: 'menus', label: 'Reusable Food Menus', desc: 'Pre-configured multi-course packages.' },
            { key: 'lightAndSound', label: 'Light & Sound Rentals', desc: 'Stage concert sound rigs, beam lighting and mic sets.' },
            { key: 'staff', label: 'Staff Roster & Tasks', desc: 'Chefs, supervisors and crew allocations.' },
            { key: 'purchases', label: 'Raw Ingredient Purchases', desc: 'Track spice, poultry and dairy bills.' },
            { key: 'accounting', label: 'Financials & Profitability', desc: 'Track money in, money out and estimated margins.' }
          ].map((mod) => {
            const isEnabled = (modules as any)[mod.key];

            return (
              <div
                key={mod.key}
                onClick={() => handleToggleModule(mod.key as any)}
                style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: isEnabled ? 'var(--primary-lighter)' : 'var(--bg-surface-secondary)',
                  border: `1.5px solid ${isEnabled ? 'var(--primary-border)' : 'var(--border-color)'}`,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: isEnabled ? 'var(--primary-dark)' : 'var(--text-primary)' }}>
                    {mod.label}
                  </div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    {mod.desc}
                  </div>
                </div>

                <div style={{ color: isEnabled ? 'var(--primary)' : 'var(--text-muted)' }}>
                  {isEnabled ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Company Profile Form */}
      <div className="soft-card" style={{ padding: '1.5rem' }}>
        <h3 className="soft-card-title" style={{ fontSize: '1.1rem', marginBottom: '1.25rem' }}>
          Company Business Profile
        </h3>

        <form onSubmit={handleSaveProfile}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Business Name</label>
              <input
                type="text"
                className="form-input"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Location / Base City</label>
              <input
                type="text"
                className="form-input"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Official Phone</label>
              <input
                type="text"
                className="form-input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Official Email</label>
              <input
                type="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">GSTIN / Tax ID</label>
              <input
                type="text"
                className="form-input"
                value={gstNumber}
                onChange={(e) => setGstNumber(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Brand Tagline</label>
              <input
                type="text"
                className="form-input"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <button type="submit" className="btn btn-primary" style={{ gap: '6px' }}>
              <Check size={16} />
              <span>Save Company Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
