import React from 'react';
import { BPHARM_ROOMS, BPHARM_LAB_FITTINGS } from '../../constants/infrastructure';
import { SectionCard } from '../shared/Shared';
import './RoomsSection.css';

export function RoomsSection({ form, onUpdateRoom, onUpdateFitting }) {
  const rooms   = form.rooms   || {};
  const fittings = form.fittings || {};

  const filledCount  = BPHARM_ROOMS.filter(r => rooms[r.id]?.available === true).length;
  const mandatoryCount = BPHARM_ROOMS.filter(r => r.mandatory).length;
  const countVariant = filledCount >= mandatoryCount ? 'ok' : 'warn';

  return (
    <>
      <SectionCard
        icon="🏛️"
        iconVariant="blue"
        title="Physical Rooms & Accommodation"
        subtitle="Appendix-A, Cl. 5 — Suitable accommodation with adequate ventilation, lighting and hygienic conditions"
        countLabel={`${filledCount} / ${mandatoryCount}`}
        countVariant={countVariant}
      >
        {/* Column headers */}
        <div className="rooms-header">
          <span>Room / Facility</span>
          <span>Required</span>
          <span>Available?</span>
          <span>Count</span>
          <span>Area (sq. ft.)</span>
          <span>Remarks</span>
        </div>

        {BPHARM_ROOMS.map(room => {
          const val = rooms[room.id] || {};
          const isOk = val.available === true;
          const isMissing = val.available === false;

          return (
            <div key={room.id} className={`rooms-row ${isMissing ? 'row-missing' : ''}`}>
              <div className="room-cell cell-label">
                <span className="room-name">{room.label}</span>
                {room.note && <span className="room-note">{room.note}</span>}
                {!room.mandatory && <span className="cond-badge">Conditional</span>}
              </div>

              <div className="room-cell">
                <span className="req-pill">
                  {room.minCount ? `Min. ${room.minCount}` : 'Min. 1'}
                </span>
                <span className="ref-tag">{room.ref}</span>
              </div>

              <div className="room-cell">
                <AvailabilityToggle
                  value={val.available}
                  onChange={v => onUpdateRoom(room.id, 'available', v)}
                />
              </div>

              <div className="room-cell">
                <input
                  type="number"
                  className="room-input room-input-sm"
                  min="0" max="99"
                  placeholder="0"
                  value={val.count || ''}
                  onChange={e => onUpdateRoom(room.id, 'count', e.target.value)}
                />
              </div>

              <div className="room-cell">
                <input
                  type="number"
                  className="room-input"
                  min="0"
                  placeholder={room.minAreaPerUnit ? `Min. ${room.minAreaPerUnit}` : '—'}
                  value={val.area || ''}
                  onChange={e => onUpdateRoom(room.id, 'area', e.target.value)}
                />
                {room.minAreaPerUnit && val.area && parseFloat(val.area) < room.minAreaPerUnit && (
                  <span className="area-warn">Below min.</span>
                )}
              </div>

              <div className="room-cell">
                <input
                  type="text"
                  className="room-input room-input-full"
                  placeholder="Optional remarks"
                  value={val.remarks || ''}
                  onChange={e => onUpdateRoom(room.id, 'remarks', e.target.value)}
                />
              </div>
            </div>
          );
        })}
      </SectionCard>

      {/* Lab Fittings */}
      <SectionCard
        icon="🔧"
        iconVariant="amber"
        title="Lab Fittings & Utilities"
        subtitle="Appendix-A, Cl. 5 — Gas and water fittings, shelves, fuming cupboards wherever necessary"
        countLabel={`${Object.values(fittings).filter(v => v?.available === true).length} / ${BPHARM_LAB_FITTINGS.length}`}
        countVariant={Object.values(fittings).filter(v => v?.available === true).length === BPHARM_LAB_FITTINGS.length ? 'ok' : 'warn'}
      >
        <div className="fittings-grid">
          {BPHARM_LAB_FITTINGS.map(f => {
            const val = fittings[f.id] || {};
            return (
              <div key={f.id} className={`fitting-card ${val.available === false ? 'fitting-missing' : val.available === true ? 'fitting-ok' : ''}`}>
                <div className="fitting-name">{f.label}</div>
                <div className="fitting-ref">{f.ref}</div>
                <AvailabilityToggle
                  value={val.available}
                  onChange={v => onUpdateFitting(f.id, v)}
                  compact
                />
              </div>
            );
          })}
        </div>
      </SectionCard>
    </>
  );
}

function AvailabilityToggle({ value, onChange, compact }) {
  return (
    <div className={`avail-toggle ${compact ? 'avail-compact' : ''}`}>
      <button
        className={`avail-btn ${value === true ? 'avail-yes' : ''}`}
        onClick={() => onChange(value === true ? null : true)}
      >✓ Yes</button>
      <button
        className={`avail-btn ${value === false ? 'avail-no' : ''}`}
        onClick={() => onChange(value === false ? null : false)}
      >✗ No</button>
    </div>
  );
}
