import React from 'react';
import { NON_TEACHING_REQUIREMENTS } from '../../constants/regulations';
import { SectionCard } from '../shared/Shared';
import './NonTeachingStaff.css';

export function NonTeachingStaff({ ntCounts, onAdjust }) {
  const totalRequired = NON_TEACHING_REQUIREMENTS
    .filter(r => !r.dynamic)
    .reduce((s, r) => s + r.minCount, 0);

  const totalFilled = NON_TEACHING_REQUIREMENTS.reduce((s, r) => {
    return s + Math.min(ntCounts[r.id] || 0, r.minCount);
  }, 0);

  const totalVacant = NON_TEACHING_REQUIREMENTS.reduce((s, r) => {
    return s + Math.max(0, r.minCount - (ntCounts[r.id] || 0));
  }, 0);

  const countVariant = totalVacant === 0 ? 'ok' : totalVacant <= 2 ? 'warn' : 'error';

  return (
    <SectionCard
      icon="🧑‍💼"
      iconVariant="amber"
      title="Non-Teaching Staff — B.Pharm"
      subtitle="Appendix-A, Clause 4 · Required counts same for both intake 60 and 100"
      countLabel={`${totalFilled} / ${totalRequired}`}
      countVariant={countVariant}
    >
      <div className="nt-grid">
        {NON_TEACHING_REQUIREMENTS.map(req => {
          const actual = ntCounts[req.id] || 0;
          const short  = Math.max(0, req.minCount - actual);
          const isOk   = short === 0;

          return (
            <NtCard
              key={req.id}
              req={req}
              actual={actual}
              short={short}
              isOk={isOk}
              onDecrement={() => onAdjust(req.id, -1)}
              onIncrement={() => onAdjust(req.id, +1)}
            />
          );
        })}
      </div>
    </SectionCard>
  );
}

function NtCard({ req, actual, short, isOk, onDecrement, onIncrement }) {
  return (
    <div className={`nt-card ${!isOk ? 'nt-card-short' : ''}`}>
      <div className="nt-card-header">
        <div>
          <div className="nt-role">{req.role}</div>
          <div className="nt-qual">{req.qualification}</div>
        </div>
        <span className={`nt-req-badge ${isOk ? 'count-ok' : 'count-warn'}`}>
          {req.countNote}
        </span>
      </div>

      <div className="nt-count-row">
        <button className="nt-btn" onClick={onDecrement}>−</button>
        <span className={`nt-val ${isOk ? 'nt-ok' : 'nt-short'}`}>{actual}</span>
        <button className="nt-btn" onClick={onIncrement}>+</button>

        <div className={`nt-status ${isOk ? 'nt-status-ok' : 'nt-status-short'}`}>
          <span className={`dot ${isOk ? 'dot-green' : 'dot-red'}`} />
          {isOk ? 'Compliant' : `${short} short`}
        </div>
      </div>

      <div className="nt-ref">{req.ref}</div>
    </div>
  );
}
