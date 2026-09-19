import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '80px',
        right: '20px',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        maxWidth: '380px',
        width: 'calc(100% - 40px)',
        pointerEvents: 'none'
      }}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px 16px',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-md)',
            color: 'var(--text-primary)',
            fontSize: '0.9rem',
            animation: 'slideUp 200ms ease-out'
          }}
        >
          {toast.type === 'success' && <CheckCircle2 size={18} style={{ color: 'var(--status-success-text)', flexShrink: 0 }} />}
          {toast.type === 'danger' && <AlertCircle size={18} style={{ color: 'var(--status-danger-text)', flexShrink: 0 }} />}
          {toast.type === 'warning' && <AlertCircle size={18} style={{ color: 'var(--status-warning-text)', flexShrink: 0 }} />}
          {toast.type === 'info' && <Info size={18} style={{ color: 'var(--status-info-text)', flexShrink: 0 }} />}

          <span style={{ flex: 1 }}>{toast.message}</span>

          <button
            onClick={() => removeToast(toast.id)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '2px',
              display: 'flex'
            }}
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};
