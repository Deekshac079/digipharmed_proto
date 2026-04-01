import React from 'react';
import { BPHARM_LABS, DPHARM_LABS } from '../../constants/infrastructure';
import { SectionCard } from '../shared/Shared';
import './LabsSection.css';

export function LabsSection({ form, course, intake, onUpdateLab }) {
  const labs     = course === 'bpharm' ? BPHARM_LABS : DPHARM_LABS;
  const formLabs = form.labs || {};

  const available  = labs.filter(l => formLabs[l.id]?.available === true).length;
  const countVariant = available === labs.length ? 'ok' : available >= labs.length * 0.75 ? 'warn' : 'error';

  // Group B.Pharm labs by group
  const groups = course === 'bpharm'
    ? [...new Set(BPHARM_LABS.map(l => l.group))]
    : null;

  const subtitle = course === 'bpharm'
    ? 'Appendix-A, Cl. 5 — Min. 8 labs in mandated composition · 900 sq. ft. incl. Preparation Room · 30 sq. ft. per student at any given time'
    : 'Appendix-3, ER-2020 — 4 mandatory labs + Machine Room + Model Community Pharmacy';

  return (
    <SectionCard
      icon="🔬"
      iconVariant="blue"
      title="Laboratories"
      subtitle={subtitle}
      countLabel={`${available} / ${labs.length}`}
      countVariant={countVariant}
    >
      {/* B.Pharm: grouped layout */}
      {course === 'bpharm' && groups && groups.map(group => (
        <LabGroup
          key={group}
          groupName={group}
          labs={BPHARM_LABS.filter(l => l.group === group)}
          formLabs={formLabs}
          intake={intake}
          onUpdateLab={onUpdateLab}
          showArea
        />
      ))}

      {/* D.Pharm: flat list */}
      {course === 'dpharm' && (
        <div className="labs-table">
          <div className="labs-header">
            <span>Laboratory</span>
            <span>Available?</span>
            <span>Area (sq. mt.)</span>
            <span>Min. area</span>
            <span>Remarks</span>
          </div>
          {DPHARM_LABS.map(lab => {
            const val = formLabs[lab.id] || {};
            const areaEntered = parseFloat(val.area);
            const areaOk = !lab.minArea || isNaN(areaEntered) || areaEntered >= lab.minArea;

            return (
              <div key={lab.id} className={`lab-row ${val.available === false ? 'lab-row-missing' : ''}`}>
                <div className="lab-cell cell-name">
                  <span className="lab-name">{lab.label}</span>
                  {lab.note && <span className="lab-note">{lab.note}</span>}
                  {lab.bottleneck && (
                    <span className="bottleneck-tag">⚠ {lab.bottleneck}</span>
                  )}
                  <span className="lab-ref">{lab.ref}</span>
                </div>

                <div className="lab-cell">
                  <AvailabilityToggle
                    value={val.available}
                    onChange={v => onUpdateLab(lab.id, 'available', v)}
                  />
                </div>

                <div className="lab-cell">
                  <input
                    type="number"
                    className={`lab-input ${!areaOk ? 'input-warn' : ''}`}
                    placeholder="0"
                    min="0"
                    value={val.area || ''}
                    onChange={e => onUpdateLab(lab.id, 'area', e.target.value)}
                  />
                  {!areaOk && (
                    <span className="area-err">Below {lab.minArea} sq. mt.</span>
                  )}
                </div>

                <div className="lab-cell cell-req">
                  {lab.minArea ? (
                    <span className="req-pill">{lab.minArea} sq. mt.</span>
                  ) : (
                    <span className="text-muted">—</span>
                  )}
                </div>

                <div className="lab-cell">
                  <input
                    type="text"
                    className="lab-input lab-input-full"
                    placeholder="Optional remarks"
                    value={val.remarks || ''}
                    onChange={e => onUpdateLab(lab.id, 'remarks', e.target.value)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </SectionCard>
  );
}

// ── B.Pharm group component ──────────────────────────────────────────────────
function LabGroup({ groupName, labs, formLabs, intake, onUpdateLab }) {
  const required = labs[0]?.minCount ?? labs.length;
  const filled   = labs.filter(l => formLabs[l.id]?.available === true).length;
  const isShort  = filled < required;

  return (
    <div className="lab-group">
      <div className="lab-group-header">
        <span className="lab-group-name">{groupName}</span>
        <span className={`lab-group-count ${isShort ? 'count-warn' : 'count-ok'}`}>
          {filled} / {required} required
        </span>
      </div>

      <div className="labs-table">
        <div className="labs-header labs-header-inner">
          <span>Lab name</span>
          <span>Available?</span>
          <span>Area (sq. ft.)</span>
          <span>Prep room incl.?</span>
          <span>Bottleneck note</span>
        </div>

        {labs.map(lab => {
          const val = formLabs[lab.id] || {};
          const areaEntered = parseFloat(val.area);
          const areaOk = isNaN(areaEntered) || areaEntered >= (lab.minArea || 0);

          return (
            <div key={lab.id} className={`lab-row ${val.available === false ? 'lab-row-missing' : ''}`}>
              <div className="lab-cell cell-name">
                <span className="lab-name">{lab.label}</span>
                {lab.note && <span className="lab-note">{lab.note}</span>}
                <span className="lab-ref">{lab.ref}</span>
              </div>

              <div className="lab-cell">
                <AvailabilityToggle
                  value={val.available}
                  onChange={v => onUpdateLab(lab.id, 'available', v)}
                />
              </div>

              <div className="lab-cell">
                <div className="area-input-row">
                  <input
                    type="number"
                    className={`lab-input ${!areaOk && val.area ? 'input-warn' : ''}`}
                    placeholder={`Min. ${lab.minArea}`}
                    min="0"
                    value={val.area || ''}
                    onChange={e => onUpdateLab(lab.id, 'area', e.target.value)}
                  />
                  <span className="area-unit">sq. ft.</span>
                </div>
                {!areaOk && val.area && (
                  <span className="area-err">Below 900 sq. ft. min.</span>
                )}
              </div>

              <div className="lab-cell">
                <PrepRoomToggle
                  value={val.prepRoomIncluded}
                  onChange={v => onUpdateLab(lab.id, 'prepRoomIncluded', v)}
                />
              </div>

              <div className="lab-cell">
                {lab.bottleneck
                  ? <span className="bottleneck-tag">⚠ {lab.bottleneck}</span>
                  : <span className="text-muted text-sm">—</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AvailabilityToggle({ value, onChange }) {
  return (
    <div className="avail-toggle">
      <button className={`avail-btn ${value === true  ? 'avail-yes' : ''}`} onClick={() => onChange(value === true  ? null : true)}>✓ Yes</button>
      <button className={`avail-btn ${value === false ? 'avail-no'  : ''}`} onClick={() => onChange(value === false ? null : false)}>✗ No</button>
    </div>
  );
}

function PrepRoomToggle({ value, onChange }) {
  return (
    <div className="avail-toggle">
      <button className={`avail-btn avail-btn-sm ${value === true  ? 'avail-yes' : ''}`} onClick={() => onChange(value === true  ? null : true)}>Yes</button>
      <button className={`avail-btn avail-btn-sm ${value === false ? 'avail-no'  : ''}`} onClick={() => onChange(value === false ? null : false)}>No</button>
    </div>
  );
}
