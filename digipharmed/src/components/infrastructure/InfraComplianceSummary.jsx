import React from 'react';
import { Button } from '../shared/Shared';
import './InfraComplianceSummary.css';

export function InfraComplianceSummary({ compliance, onViewScrutiny }) {
  const { total, passed, failed, pct } = compliance;
  const pctColor = pct >= 90 ? 'green' : pct >= 70 ? 'amber' : 'red';

  return (
    <div className="infra-compliance-bar">
      <CompStat label="Total checks"  value={total}  color="blue"     />
      <CompStat label="Passed"        value={passed} color="green"    />
      <CompStat label="Deficiencies"  value={failed} color={failed > 0 ? 'red' : 'green'} />
      <CompStat label="Compliance"    value={`${pct}%`} color={pctColor} />

      <div className="infra-comp-action">
        <Button variant="primary" size="sm" onClick={onViewScrutiny}>
          View Scrutiny Report →
        </Button>
        <div className="infra-comp-hint">
          {failed > 0
            ? `${failed} deficiencie${failed !== 1 ? 's' : ''} detected — resolve before submission`
            : total === 0
            ? 'Fill in infrastructure details to compute compliance'
            : 'All checks passed — ready for scrutiny'}
        </div>
      </div>
    </div>
  );
}

function CompStat({ label, value, color }) {
  return (
    <div className="infra-comp-stat">
      <div className={`infra-comp-val infra-comp-${color}`}>{value}</div>
      <div className="infra-comp-lbl">{label}</div>
    </div>
  );
}
