import React, { useState } from 'react';
import { DPHARM_LABS, DPHARM_EQUIPMENT } from '../../constants/infrastructure';
import { SectionCard } from '../shared/Shared';
import './EquipmentSection.css';

export function EquipmentSection({ form, deficiencies, onUpdateEquipment }) {
  const [openLab, setOpenLab] = useState('dpharm_lab1');
  const equipment = form.equipment || {};

  const totalItems   = Object.values(DPHARM_EQUIPMENT).flat().length;
  const filledItems  = Object.values(DPHARM_EQUIPMENT).flat()
    .filter(item => item.qtyType === 'numeric' && !isNaN(parseInt(equipment[item.id]?.qty ?? '', 10)))
    .length;
  const deficientItems = Object.values(deficiencies).flat().length;

  const countVariant = deficientItems === 0 && filledItems > 0 ? 'ok' : deficientItems > 0 ? 'error' : 'warn';

  return (
    <SectionCard
      icon="⚗️"
      iconVariant="green"
      title="Equipment Inventory — D.Pharm"
      subtitle="Appendix-3, ER-2020 — Enter actual quantities available. Minimum required quantities are pre-filled. Deficiencies highlighted in red."
      countLabel={deficientItems > 0 ? `${deficientItems} deficiencies` : `${filledItems} / ${totalItems} entered`}
      countVariant={countVariant}
    >
      {/* Lab tab strip */}
      <div className="equip-tabs">
        {DPHARM_LABS.map(lab => {
          const labDef = (deficiencies[lab.id] || []).length;
          const isActive = openLab === lab.id;
          return (
            <button
              key={lab.id}
              className={`equip-tab ${isActive ? 'equip-tab-active' : ''} ${labDef > 0 ? 'equip-tab-warn' : ''}`}
              onClick={() => setOpenLab(lab.id)}
            >
              {lab.label.replace('Lab 1 — ', '').replace('Lab 2 — ', '').replace('Lab 3 — ', '').replace('Lab 4 — ', '')}
              {labDef > 0 && <span className="equip-tab-badge">{labDef}</span>}
            </button>
          );
        })}
      </div>

      {/* Active lab panel */}
      {DPHARM_LABS.map(lab => {
        if (lab.id !== openLab) return null;
        const items = DPHARM_EQUIPMENT[lab.id] || [];
        const labDef = deficiencies[lab.id] || [];

        return (
          <div key={lab.id} className="equip-panel">
            {lab.note && (
              <div className="equip-lab-note">
                <span>ℹ️</span> {lab.note}
                {lab.bottleneck && <strong> · ⚠ {lab.bottleneck}</strong>}
              </div>
            )}

            {/* Equipment table header */}
            <div className="equip-header">
              <span>#</span>
              <span>Equipment / Item</span>
              <span>Min. required</span>
              <span>Qty available</span>
              <span>Status</span>
              <span>Reg. ref.</span>
            </div>

            {items.map((item, idx) => {
              const val        = equipment[item.id] || {};
              const enteredQty = parseInt(val.qty ?? '', 10);
              const isEntered  = !isNaN(enteredQty);
              const isOk       = isEntered && (item.qtyType !== 'numeric' || enteredQty >= item.minQty);
              const isShort    = isEntered && item.qtyType === 'numeric' && enteredQty < item.minQty;
              const shortfall  = isShort ? item.minQty - enteredQty : 0;

              // For area-type items (patient counselling, DIC)
              const isAreaType = item.qtyType === 'area';

              return (
                <div
                  key={item.id}
                  className={`equip-row ${isShort ? 'equip-row-short' : isOk ? 'equip-row-ok' : ''}`}
                >
                  <div className="equip-cell equip-cell-idx">{idx + 1}</div>

                  <div className="equip-cell equip-cell-name">
                    <span className="equip-name">{item.label}</span>
                  </div>

                  <div className="equip-cell equip-cell-min">
                    <span className="min-qty">
                      {item.qtyType === 'adequate'
                        ? item.qtyLabel || 'Adequate'
                        : item.qtyType === 'area'
                        ? `${item.areaMin} ${item.areaUnit}`
                        : item.minQty}
                    </span>
                  </div>

                  <div className="equip-cell">
                    {item.qtyType === 'adequate' ? (
                      <AvailabilityToggle
                        value={val.qty === 'yes' ? true : val.qty === 'no' ? false : null}
                        onChange={v => onUpdateEquipment(item.id, 'qty', v ? 'yes' : 'no')}
                        compact
                      />
                    ) : isAreaType ? (
                      <div className="area-input-group">
                        <input
                          type="number"
                          className={`equip-input ${isShort ? 'input-short' : isOk ? 'input-ok' : ''}`}
                          placeholder={`${item.areaMin}`}
                          min="0"
                          value={val.area || ''}
                          onChange={e => onUpdateEquipment(item.id, 'area', e.target.value)}
                        />
                        <span className="area-unit-sm">{item.areaUnit}</span>
                      </div>
                    ) : (
                      <input
                        type="number"
                        className={`equip-input ${isShort ? 'input-short' : isOk ? 'input-ok' : ''}`}
                        placeholder={`Min. ${item.minQty}`}
                        min="0"
                        value={val.qty || ''}
                        onChange={e => onUpdateEquipment(item.id, 'qty', e.target.value)}
                      />
                    )}
                  </div>

                  <div className="equip-cell">
                    {!isEntered && item.qtyType !== 'adequate'
                      ? <span className="status-empty">Not entered</span>
                      : isShort
                      ? <span className="status-short">Short by {shortfall}</span>
                      : isOk
                      ? <span className="status-ok">✓ Met</span>
                      : <span className="status-empty">—</span>}
                  </div>

                  <div className="equip-cell equip-cell-ref">
                    {item.ref}
                  </div>
                </div>
              );
            })}

            {/* Deficiency summary for this lab */}
            {labDef.length > 0 && (
              <div className="equip-deficiency-summary">
                <div className="def-header">⚠ {labDef.length} deficiencie{labDef.length !== 1 ? 's' : ''} in this lab</div>
                {labDef.map(d => (
                  <div key={d.itemId} className="def-row">
                    <span className="def-label">{d.label}</span>
                    <span className="def-detail">Required: {d.required} · Available: {d.actual} · Short by: {d.shortfall}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </SectionCard>
  );
}

function AvailabilityToggle({ value, onChange, compact }) {
  return (
    <div className={`avail-toggle ${compact ? 'avail-compact' : ''}`}>
      <button className={`avail-btn ${value === true  ? 'avail-yes' : ''}`} onClick={() => onChange(value === true  ? null : true)}>✓ Yes</button>
      <button className={`avail-btn ${value === false ? 'avail-no'  : ''}`} onClick={() => onChange(value === false ? null : false)}>✗ No</button>
    </div>
  );
}
