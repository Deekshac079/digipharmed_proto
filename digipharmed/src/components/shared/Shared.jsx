import React, { useEffect, useRef } from 'react';
import './Shared.css';

// ─── Badge ─────────────────────────────────────────────────────────────────
export function Badge({ variant = 'info', children, small }) {
  return (
    <span className={`badge badge-${variant}${small ? ' badge-sm' : ''}`}>
      {children}
    </span>
  );
}

// ─── Button ────────────────────────────────────────────────────────────────
export function Button({ variant = 'ghost', size = 'md', onClick, children, disabled, fullWidth }) {
  return (
    <button
      className={`btn btn-${variant} btn-${size}${fullWidth ? ' btn-full' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

// ─── Counter ───────────────────────────────────────────────────────────────
export function Counter({ value, required, onDecrement, onIncrement, compact }) {
  const isShort = value < required;
  const isOk    = value >= required;
  return (
    <div className={`counter ${compact ? 'counter-compact' : ''}`}>
      <button className="counter-btn" onClick={onDecrement}>−</button>
      <span className={`counter-val ${isOk ? 'ok' : 'short'}`}>{value}</span>
      <button className="counter-btn" onClick={onIncrement}>+</button>
    </div>
  );
}

// ─── StatusDot ─────────────────────────────────────────────────────────────
export function StatusDot({ status }) {
  const map = {
    ok:      'dot-green',
    warning: 'dot-amber',
    error:   'dot-red',
    pending: 'dot-amber',
  };
  return <span className={`dot ${map[status] || 'dot-amber'}`} />;
}

// ─── Slot badge ─────────────────────────────────────────────────────────────
export function SlotBadge({ type, children }) {
  return <span className={`slot-badge slot-${type}`}>{children}</span>;
}

// ─── Workload pill ───────────────────────────────────────────────────────────
export function WorkloadPill({ hours }) {
  const cls = hours === 8 ? 'w8' : hours === 12 ? 'w12' : 'w16';
  return <span className={`workload-pill ${cls}`}>{hours} hrs/wk</span>;
}

// ─── Section card ─────────────────────────────────────────────────────────
export function SectionCard({ icon, iconVariant = 'blue', title, subtitle, countLabel, countVariant, defaultOpen = true, children }) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div className="section-card">
      <div className="section-header" onClick={() => setOpen(o => !o)}>
        <div className="section-header-left">
          <div className={`section-icon icon-${iconVariant}`}>{icon}</div>
          <div>
            <div className="section-title">{title}</div>
            {subtitle && <div className="section-sub">{subtitle}</div>}
          </div>
        </div>
        <div className="section-header-right">
          {countLabel && (
            <span className={`section-count count-${countVariant || 'info'}`}>{countLabel}</span>
          )}
          <span className={`chevron ${open ? 'open' : ''}`}>▼</span>
        </div>
      </div>
      {open && <div className="section-body">{children}</div>}
    </div>
  );
}

// ─── RegStrip ───────────────────────────────────────────────────────────────
export function RegStrip({ children }) {
  return (
    <div className="reg-strip">
      <div className="reg-icon">📋</div>
      <div className="reg-body">{children}</div>
    </div>
  );
}

// ─── Toast ─────────────────────────────────────────────────────────────────
export function Toast({ message, type, visible }) {
  return (
    <div className={`toast ${visible ? 'toast-show' : ''} toast-${type || 'default'}`}>
      {message}
    </div>
  );
}

// ─── useToast hook ──────────────────────────────────────────────────────────
export function useToast() {
  const [toast, setToast] = React.useState({ visible: false, message: '', type: 'default' });
  const timerRef = useRef(null);

  const showToast = useCallback((message, type = 'default') => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToast({ visible: true, message, type });
    timerRef.current = setTimeout(() => setToast(t => ({ ...t, visible: false })), 3000);
  }, []);

  return { toast, showToast };
}

function useCallback(fn, deps) {
  return React.useCallback(fn, deps);
}
