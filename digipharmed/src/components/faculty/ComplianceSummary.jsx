import React from 'react';
import './ComplianceSummary.css';

export function ComplianceSummary({ compliance }) {
  const { totalRequired, totalFilled, totalVacant, qualPending, ntVacant, pct } = compliance;

  const pctColor = pct >= 90 ? 'green' : pct >= 70 ? 'amber' : 'red';
  const vacColor = totalVacant === 0 ? 'green' : totalVacant <= 3 ? 'amber' : 'red';

  return (
    <div className="compliance-bar">
      <CompStat label="Required (incl. HOI)" value={totalRequired} color="blue" />
      <CompStat label="Slots filled"          value={totalFilled}   color="green" />
      <CompStat label="Slots vacant"          value={totalVacant}   color={vacColor} />
      <CompStat label="Qual. pending"         value={qualPending}   color={qualPending > 0 ? 'amber' : 'green'} />
      <CompStat label="NT staff gaps"         value={ntVacant}      color={ntVacant > 0 ? 'red' : 'green'} />
      <CompStat label="Compliance"            value={`${pct}%`}     color={pctColor} />
    </div>
  );
}

function CompStat({ label, value, color }) {
  return (
    <div className="comp-stat">
      <div className={`comp-val comp-${color}`}>{value}</div>
      <div className="comp-lbl">{label}</div>
    </div>
  );
}
