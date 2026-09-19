import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserCheck, Plus, Phone, CheckSquare, Calendar, Shield } from 'lucide-react';
import { StatusBadge } from '../Common/StatusBadge';

export const StaffView: React.FC = () => {
  const { staff, tasks, events, toggleTask, currentRole } = useApp();
  const [activeTab, setActiveTab] = useState<'roster' | 'tasks'>('roster');

  const isStaff = currentRole === 'staff';

  return (
    <div className="page-content-container">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '1.65rem' }}>{isStaff ? 'My Event Schedule & Tasks' : 'Staff & Field Operations'}</h1>
          <p style={{ fontSize: '0.9rem' }}>
            Executive chefs, catering supervisors, sound/lighting engineers, and service boys roster.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className={`btn ${activeTab === 'roster' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('roster')}
          >
            Staff Directory ({staff.length})
          </button>
          <button
            className={`btn ${activeTab === 'tasks' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('tasks')}
          >
            Operations Tasks ({tasks.length})
          </button>
        </div>
      </div>

      {/* ROSTER TAB */}
      {activeTab === 'roster' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {staff.map((member) => {
            const assignedEvents = events.filter((e) => member.assignedEventIds.includes(e.id));

            return (
              <div
                key={member.id}
                className="soft-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--primary-soft)',
                          color: 'var(--primary-dark)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '1.1rem'
                        }}
                      >
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <h3 style={{ fontSize: '1.05rem' }}>{member.name}</h3>
                        <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>
                          {member.role}
                        </span>
                      </div>
                    </div>

                    <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>
                      {member.isAvailable ? 'Available' : 'Assigned'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.84rem', color: 'var(--text-secondary)', margin: '0.75rem 0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Phone size={14} style={{ color: 'var(--primary)' }} />
                      <span>{member.phone}</span>
                    </div>

                    {!isStaff && (
                      <div style={{ marginTop: '2px' }}>
                        Daily Rate: <strong>₹{member.dailyRate.toLocaleString()} / day</strong>
                      </div>
                    )}
                  </div>

                  {/* Assigned Events */}
                  <div style={{ marginTop: '0.75rem', padding: '8px 10px', backgroundColor: 'var(--bg-surface-secondary)', borderRadius: 'var(--radius-sm)' }}>
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'block' }}>
                      Current Event Assignments ({assignedEvents.length}):
                    </span>
                    {assignedEvents.length === 0 ? (
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>No active assignment</span>
                    ) : (
                      assignedEvents.map((e) => (
                        <div key={e.id} style={{ fontSize: '0.8rem', color: 'var(--text-primary)', marginTop: '2px' }}>
                          • {e.name} ({e.eventDate})
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TASKS TAB */}
      {activeTab === 'tasks' && (
        <div className="soft-card">
          <div className="soft-card-header">
            <div>
              <h3 className="soft-card-title">All Team Tasks & Checklists</h3>
              <p style={{ fontSize: '0.82rem' }}>Kitchen prep, audio-visual loads, table linen coordination</p>
            </div>
            <span className="badge badge-neutral">{tasks.filter((t) => !t.isCompleted).length} pending</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {tasks.map((t) => (
              <div
                key={t.id}
                onClick={() => toggleTask(t.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: t.isCompleted ? 'var(--bg-surface)' : 'var(--bg-surface-secondary)',
                  border: '1px solid var(--border-color)',
                  cursor: 'pointer'
                }}
              >
                <input
                  type="checkbox"
                  checked={t.isCompleted}
                  onChange={() => {}}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
                />
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontWeight: 500,
                      fontSize: '0.92rem',
                      textDecoration: t.isCompleted ? 'line-through' : 'none',
                      color: t.isCompleted ? 'var(--text-muted)' : 'var(--text-primary)'
                    }}
                  >
                    {t.title}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Department: <strong>{t.category}</strong> • Responsible: <strong>{t.assignedToName || 'Unassigned'}</strong> • Due: {t.dueDate}
                  </div>
                </div>
                <span className={`badge ${t.isCompleted ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: '0.72rem' }}>
                  {t.isCompleted ? 'Completed' : 'Action Required'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
