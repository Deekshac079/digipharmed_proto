import React, { useState, useCallback } from 'react';
import { Sidebar }            from './components/layout/Sidebar';
import { TopBar }             from './components/layout/TopBar';
import { FacultyPage }        from './components/faculty/FacultyPage';
import { InfrastructurePage } from './components/infrastructure/InfrastructurePage';
import './styles/tokens.css';
import './App.css';

// ── Placeholder for pages not yet built ──────────────────────────────────────
function ComingSoon({ title }) {
  return (
    <div className="coming-soon">
      <div className="coming-soon-icon">🚧</div>
      <div className="coming-soon-title">{title}</div>
      <div className="coming-soon-sub">This module is not yet built. Infrastructure and Faculty are complete.</div>
    </div>
  );
}

export default function App() {
  // activePage  → which full page renders in main content
  // activeModule → which sidebar nav item is highlighted (can differ, e.g. lab = infrastructure page)
  const [activePage,   setActivePage]   = useState('faculty');
  const [activeModule, setActiveModule] = useState('faculty');
  const [lastSaved,    setLastSaved]    = useState('2 min ago');

  // Called by Sidebar on nav click
  const handleModuleChange = useCallback((page, moduleId) => {
    setActivePage(page);
    setActiveModule(moduleId);
  }, []);

  function handleSaveDraft() {
    setLastSaved('just now');
  }

  // TopBar primary action dispatches to the active page
  function handlePrimaryAction() {
    // Faculty page: open add-faculty drawer via custom event
    if (activePage === 'faculty') {
      document.dispatchEvent(new CustomEvent('open-add-faculty'));
    }
  }

  return (
    <div className="app-shell">
      <Sidebar
        activeModule={activeModule}
        onModuleChange={handleModuleChange}
      />

      <div className="app-main">
        <TopBar
          activePage={activePage}
          lastSaved={lastSaved}
          onSaveDraft={handleSaveDraft}
          onPrimaryAction={handlePrimaryAction}
        />

        <div className="page-container">
          {activePage === 'faculty'         && <FacultyPage />}
          {activePage === 'infrastructure'  && <InfrastructurePage />}
          {activePage === 'institution'     && <ComingSoon title="Institution Information" />}
          {activePage === 'curriculum'      && <ComingSoon title="Curriculum" />}
          {activePage === 'library'         && <ComingSoon title="Library" />}
          {activePage === 'finance'         && <ComingSoon title="Finance" />}
          {activePage === 'research'        && <ComingSoon title="Research" />}
          {activePage === 'cocurricular'    && <ComingSoon title="Co-curricular Activities" />}
        </div>
      </div>
    </div>
  );
}
