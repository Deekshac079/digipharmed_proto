import React, { useState } from 'react';
import { DEPT_LABELS, DESIG_LABELS } from '../../constants/regulations';
import { SectionCard, SlotBadge, Button } from '../shared/Shared';
import './FacultyRoster.css';

const STATUS_CONFIG = {
  verified:    { label: 'Verified',     type: 'filled' },
  qual_review: { label: 'Qual. review', type: 'pending' },
  pending:     { label: 'Pending',      type: 'vacant' },
};

const SPC_CONFIG = {
  valid:   { label: 'Valid',    type: 'filled' },
  pending: { label: 'Pending', type: 'pending' },
  expired: { label: 'Expired', type: 'vacant' },
};

function QualIcon({ faculty }) {
  const hasPgPhd = faculty.qualification?.phd;
  const hasPhd   = faculty.qualification?.phd === 'Ph.D';

  if (hasPhd)   return <span className="qual-ok">✓</span>;
  if (hasPgPhd) return <span className="qual-warn">⚠</span>;
  return <span className="qual-error">✗</span>;
}

export function FacultyRoster({ faculty, onEdit, onRemove }) {
  const [sortKey,  setSortKey]  = useState('name');
  const [sortDir,  setSortDir]  = useState('asc');
  const [filterDept, setFilterDept] = useState('all');

  const depts = ['all', ...new Set(faculty.map(f => f.department).filter(Boolean))];

  const sorted = [...faculty]
    .filter(f => filterDept === 'all' || f.department === filterDept)
    .sort((a, b) => {
      const av = a[sortKey] ?? '';
      const bv = b[sortKey] ?? '';
      const cmp = String(av).localeCompare(String(bv));
      return sortDir === 'asc' ? cmp : -cmp;
    });

  function toggleSort(key) {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  }

  function SortTh({ label, col }) {
    const active = sortKey === col;
    return (
      <th
        className={`sortable ${active ? 'sort-active' : ''}`}
        onClick={() => toggleSort(col)}
      >
        {label}
        <span className="sort-icon">{active ? (sortDir === 'asc' ? ' ↑' : ' ↓') : ' ↕'}</span>
      </th>
    );
  }

  const countVariant = faculty.length > 0 ? 'info' : 'warn';

  return (
    <SectionCard
      icon="📋"
      iconVariant="green"
      title="Faculty Roster"
      subtitle="All faculty entries for this course. Click column headers to sort."
      countLabel={`${sorted.length} entries`}
      countVariant={countVariant}
    >
      {/* Filter bar */}
      <div className="roster-filter-bar">
        <span className="roster-filter-label">Filter by dept:</span>
        {depts.map(d => (
          <button
            key={d}
            className={`filter-chip ${filterDept === d ? 'active' : ''}`}
            onClick={() => setFilterDept(d)}
          >
            {d === 'all' ? 'All' : DEPT_LABELS[d] || d}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="roster-table-wrap">
        {sorted.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">👩‍🏫</div>
            <div className="empty-text">No faculty entries yet. Click "+ Add Faculty" to begin.</div>
          </div>
        ) : (
          <table className="roster-table">
            <thead>
              <tr>
                <th>#</th>
                <SortTh label="Faculty name"  col="name" />
                <SortTh label="Department"    col="department" />
                <SortTh label="Designation"   col="designation" />
                <th>Qualification</th>
                <SortTh label="Experience"    col="experienceYears" />
                <th>Employment</th>
                <th>SPC Reg.</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((f, idx) => {
                const statusCfg = STATUS_CONFIG[f.status] || STATUS_CONFIG.pending;
                const spcCfg    = SPC_CONFIG[f.spcRegistration] || SPC_CONFIG.pending;
                return (
                  <tr key={f.id} className={f.status === 'qual_review' ? 'row-warn' : ''}>
                    <td className="cell-idx">{idx + 1}</td>
                    <td>
                      <div className="faculty-name">{f.name}</div>
                      <div className="faculty-council">{f.councilNo}</div>
                    </td>
                    <td className="cell-sm">
                      {DEPT_LABELS[f.department] || f.department}
                    </td>
                    <td>
                      <DesigSelect
                        value={f.designation}
                        onChange={val => onEdit(f.id, { designation: val })}
                      />
                    </td>
                    <td>
                      <div className="flex-row gap-4">
                        <QualIcon faculty={f} />
                        <span className="cell-sm">
                          {[f.qualification?.ug, f.qualification?.pg, f.qualification?.phd]
                            .filter(Boolean)
                            .join(' · ')}
                        </span>
                      </div>
                    </td>
                    <td className="cell-sm cell-mono">{f.experienceYears} yrs</td>
                    <td>
                      <SlotBadge type={f.employmentType === 'full-time' ? 'filled' : 'pending'}>
                        {f.employmentType === 'full-time' ? 'Full-time' : 'Part-time'}
                      </SlotBadge>
                    </td>
                    <td>
                      <SlotBadge type={spcCfg.type}>{spcCfg.label}</SlotBadge>
                    </td>
                    <td>
                      <SlotBadge type={statusCfg.type}>{statusCfg.label}</SlotBadge>
                    </td>
                    <td>
                      <div className="flex-row gap-6">
                        <Button size="sm" variant="ghost" onClick={() => onEdit(f.id, {})}>
                          Edit
                        </Button>
                        <Button size="sm" variant="danger" onClick={() => onRemove(f.id)}>
                          ✕
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </SectionCard>
  );
}

function DesigSelect({ value, onChange }) {
  const options = [
    { value: 'hoi',        label: 'Head of Institution' },
    { value: 'professor',  label: 'Professor' },
    { value: 'assoc_prof', label: 'Associate Professor' },
    { value: 'asst_prof',  label: 'Assistant Professor' },
    { value: 'lecturer',   label: 'Lecturer' },
  ];
  return (
    <select
      className="inline-select"
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      {options.map(o => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}
