import React from 'react';
import { SIF_MODULES } from '../../constants/regulations';
import './Sidebar.css';

// Map module IDs to page route keys
const MODULE_TO_PAGE = {
  'institution-info': 'institution',
  'infrastructure':   'infrastructure',
  'faculty':          'faculty',
  'non-teaching':     'faculty',      // handled inside faculty page for now
  'laboratory':       'infrastructure',
  'equipment':        'infrastructure',
  'curriculum':       'curriculum',
  'library':          'library',
  'finance':          'finance',
  'research':         'research',
  'cocurricular':     'cocurricular',
};

export function Sidebar({ activeModule = 'faculty', onModuleChange }) {
  function handleClick(e, mod) {
    e.preventDefault();
    const page = MODULE_TO_PAGE[mod.id] || mod.id;
    if (onModuleChange) onModuleChange(page, mod.id);
  }

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-mark">
          <div className="logo-icon">DP</div>
          <div>
            <div className="logo-text">DIGI-PHARMed</div>
          </div>
        </div>
        <div className="logo-sub">Pharmacy Council of India</div>
      </div>

      {/* Session badge */}
      <div className="sidebar-session">
        <div className="session-dot" />
        SIF Window: 2026 – 27 · Open
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        <div className="nav-section-label">SIF Modules</div>
        {SIF_MODULES.map(mod => (
          <NavItem
            key={mod.id}
            mod={mod}
            active={mod.id === activeModule}
            onClick={e => handleClick(e, mod)}
          />
        ))}

        <div className="nav-section-label" style={{ marginTop: 8 }}>Actions</div>
        <a className="nav-item" href="#" onClick={e => e.preventDefault()}>
          <span className="nav-icon">📄</span> Preview SIF
        </a>
        <a className="nav-item" href="#" onClick={e => e.preventDefault()}>
          <span className="nav-icon">📤</span> Submit to PCI
        </a>
      </nav>
    </aside>
  );
}

function NavItem({ mod, active, onClick }) {
  const isDone   = mod.status === 'done';
  const isActive = active;

  return (
    <a
      className={`nav-item${isActive ? ' active' : ''}${isDone && !isActive ? ' done' : ''}`}
      href="#"
      onClick={onClick}
    >
      <span className="nav-icon">{mod.icon}</span>
      {mod.label}
      {isDone && !isActive && (
        <span className="nav-badge nav-badge-done">✓</span>
      )}
      {isActive && (
        <span className="nav-badge">WIP</span>
      )}
    </a>
  );
}
