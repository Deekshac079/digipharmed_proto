import React from 'react';
import {
  BPHARM_INFRA_CHECKLIST, DPHARM_INFRA_CHECKLIST,
} from '../../constants/infrastructure';
import { Button } from '../shared/Shared';
import './ScrutinyPanel.css';

const CHECKLIST_OPTIONS = ['compliant', 'non_compliant', 'na', 'wip'];
const OPTION_CONFIG = {
  compliant:     { label: '✓ Compliant',     cls: 'opt-ok' },
  non_compliant: { label: '✗ Non-Compliant', cls: 'opt-fail' },
  na:            { label: 'N/A',             cls: 'opt-na' },
  wip:           { label: 'WIP',             cls: 'opt-wip' },
};

export function ScrutinyPanel({ open, onClose, compliance, form, course, checklist, onUpdateChecklist }) {
  const checklistItems = course === 'bpharm' ? BPHARM_INFRA_CHECKLIST : DPHARM_INFRA_CHECKLIST;

  const totalChecks  = checklistItems.length;
  const compliantCt  = checklistItems.filter(c => checklist[c.id] === 'compliant').length;
  const failedCt     = checklistItems.filter(c => checklist[c.id] === 'non_compliant').length;
  const pendingCt    = checklistItems.filter(c => !checklist[c.id]).length;

  const { deficiencies } = compliance;

  return (
    <>
      {open && <div className="scrutiny-overlay" onClick={onClose} />}

      <aside className={`scrutiny-drawer ${open ? 'scrutiny-open' : ''}`}>
        <div className="scrutiny-header">
          <div>
            <div className="scrutiny-title">Infrastructure Scrutiny Report</div>
            <div className="scrutiny-sub">
              {course.toUpperCase()} · Pre-computed deficiency report for PCI officer review
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="scrutiny-body">

          {/* Summary pills */}
          <div className="scrutiny-summary">
            <SumPill label="Compliant"     value={compliantCt} color="green" />
            <SumPill label="Non-compliant" value={failedCt}    color="red" />
            <SumPill label="Pending"       value={pendingCt}   color="amber" />
            <SumPill label="Total checks"  value={totalChecks} color="blue" />
          </div>

          {/* Auto-detected deficiencies from form data */}
          {deficiencies.length > 0 && (
            <div className="deficiency-block">
              <div className="deficiency-block-title">
                ⚠ {deficiencies.length} auto-detected deficiencie{deficiencies.length !== 1 ? 's' : ''}
              </div>
              <div className="deficiency-list">
                {deficiencies.map((d, i) => (
                  <div key={i} className="deficiency-item">
                    <span className="def-section">{d.section}</span>
                    <span className="def-lbl">{d.label}</span>
                    {d.detail && <span className="def-detail">{d.detail}</span>}
                    <span className="def-ref">{d.ref}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Manual checklist */}
          <div className="checklist-section-title">
            First-level compliance checklist
            <span className="checklist-hint">Use ✓/✗/NA/WIP for each item</span>
          </div>

          {checklistItems.map(item => {
            const current = checklist[item.id] || null;
            return (
              <div key={item.id} className={`checklist-item ${current === 'non_compliant' ? 'item-fail' : current === 'compliant' ? 'item-ok' : ''}`}>
                <div className="checklist-item-text">
                  <span className="checklist-item-num">#{checklistItems.indexOf(item) + 1}</span>
                  {item.text}
                  <span className="checklist-ref">{item.ref}</span>
                </div>
                <div className="checklist-options">
                  {CHECKLIST_OPTIONS.map(opt => (
                    <button
                      key={opt}
                      className={`checklist-opt ${OPTION_CONFIG[opt].cls} ${current === opt ? 'opt-active' : ''}`}
                      onClick={() => onUpdateChecklist(item.id, current === opt ? null : opt)}
                    >
                      {OPTION_CONFIG[opt].label}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}

        </div>

        <div className="scrutiny-footer">
          <Button variant="primary" fullWidth onClick={onClose}>
            Save Scrutiny & Close
          </Button>
          <Button variant="ghost" onClick={onClose}>Close</Button>
        </div>
      </aside>
    </>
  );
}

function SumPill({ label, value, color }) {
  return (
    <div className={`sum-pill sum-${color}`}>
      <div className="sum-val">{value}</div>
      <div className="sum-lbl">{label}</div>
    </div>
  );
}
