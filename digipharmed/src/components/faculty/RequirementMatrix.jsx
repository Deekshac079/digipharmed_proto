import React from 'react';
import {
  DEPARTMENTS, DESIGNATIONS,
  DEPT_LABELS, DESIG_LABELS,
  WORKLOAD
} from '../../constants/regulations';
import { Counter, WorkloadPill, SectionCard } from '../shared/Shared';
import './RequirementMatrix.css';

// Ordered rows for the matrix
const MATRIX_ROWS = [
  // [dept, desig]
  [DEPARTMENTS.PHARMACEUTICS,     DESIGNATIONS.PROFESSOR],
  [DEPARTMENTS.PHARMACEUTICS,     DESIGNATIONS.ASST_PROF],
  [DEPARTMENTS.PHARMACEUTICS,     DESIGNATIONS.LECTURER],
  [DEPARTMENTS.PHARM_CHEMISTRY,   DESIGNATIONS.PROFESSOR],
  [DEPARTMENTS.PHARM_CHEMISTRY,   DESIGNATIONS.ASST_PROF],
  [DEPARTMENTS.PHARM_CHEMISTRY,   DESIGNATIONS.LECTURER],
  [DEPARTMENTS.PHARMACOLOGY,      DESIGNATIONS.PROFESSOR],
  [DEPARTMENTS.PHARMACOLOGY,      DESIGNATIONS.ASST_PROF],
  [DEPARTMENTS.PHARMACOLOGY,      DESIGNATIONS.LECTURER],
  [DEPARTMENTS.PHARMACOGNOSY,     DESIGNATIONS.PROFESSOR],
  [DEPARTMENTS.PHARMACOGNOSY,     DESIGNATIONS.ASST_PROF],
  [DEPARTMENTS.PHARMACOGNOSY,     DESIGNATIONS.LECTURER],
  [DEPARTMENTS.PHARMACY_PRACTICE, DESIGNATIONS.PROFESSOR],
  [DEPARTMENTS.PHARMACY_PRACTICE, DESIGNATIONS.ASST_PROF],
  [DEPARTMENTS.PHARMACY_PRACTICE, DESIGNATIONS.LECTURER],
];

// Qualification shorthand per dept+desig for quick display
function qualHint(dept, desig) {
  if (desig === DESIGNATIONS.PROFESSOR) return 'M.Pharm + Ph.D (mandatory)';
  if (desig === DESIGNATIONS.ASSOC_PROF) return 'M.Pharm + Ph.D within 7 yrs';
  const deptMap = {
    [DEPARTMENTS.PHARMACEUTICS]:     'M.Pharm (Pharmaceutics)',
    [DEPARTMENTS.PHARM_CHEMISTRY]:   'M.Pharm (Pharm. Chemistry)',
    [DEPARTMENTS.PHARMACOLOGY]:      'M.Pharm (Pharmacology)',
    [DEPARTMENTS.PHARMACOGNOSY]:     'M.Pharm (Pharmacognosy)',
    [DEPARTMENTS.PHARMACY_PRACTICE]: 'M.Pharm / Pharm.D',
  };
  return deptMap[dept] + '; 1st Class B.Pharm';
}

export function RequirementMatrix({ requirements, slotCounts, intake, onAddClick }) {
  // Group rows by dept for shading
  let lastDept = null;
  const totalFilled  = Object.values(slotCounts).reduce((s, v) => s + v, 0);
  const totalRequired = Object.values(requirements).reduce((s, v) => s + v, 0);
  const totalVacant   = Math.max(0, totalRequired - totalFilled);
  const countVariant  = totalVacant === 0 ? 'ok' : totalVacant <= 3 ? 'warn' : 'error';

  return (
    <SectionCard
      icon="📐"
      iconVariant="blue"
      title="Teaching Faculty — Requirement Matrix"
      subtitle="Department-wise slots against approved intake. Switch intake above to recalculate."
      countLabel={`${totalFilled} / ${totalRequired}`}
      countVariant={countVariant}
    >
      {/* Column headers */}
      <div className="matrix-header">
        <span>Department</span>
        <span>Designation</span>
        <span>Required</span>
        <span>Filled</span>
        <span>Vacant</span>
        <span>Workload</span>
        <span>Qualification</span>
        <span></span>
      </div>

      {MATRIX_ROWS.map(([dept, desig], idx) => {
        const key      = `${dept}_${desig}`;
        const required = requirements[key] ?? 0;
        const filled   = slotCounts[key]   ?? 0;
        const vacant   = Math.max(0, required - filled);
        const isShort  = vacant > 0;
        const isNewDept = dept !== lastDept;
        if (isNewDept) lastDept = dept;

        // Show dept label only on first row of dept group
        const deptLabel = isNewDept ? DEPT_LABELS[dept] : null;
        const isPharmPracticeProf = dept === DEPARTMENTS.PHARMACY_PRACTICE && desig === DESIGNATIONS.PROFESSOR;

        return (
          <div
            key={key}
            className={`matrix-row ${isNewDept ? 'row-dept-start' : ''} ${isShort ? 'row-short' : ''}`}
          >
            {/* Department */}
            <div className="mat-cell cell-dept">
              {deptLabel && (
                <span className="dept-label">
                  {deptLabel}
                  {dept === DEPARTMENTS.PHARM_CHEMISTRY && (
                    <small className="dept-note">(incl. Analysis)</small>
                  )}
                </span>
              )}
            </div>

            {/* Designation */}
            <div className="mat-cell cell-desig">
              {DESIG_LABELS[desig]}
              {isPharmPracticeProf && (
                <small className="desig-note">
                  {intake === 60 ? '(not required at 60)' : '(required at 100)'}
                </small>
              )}
            </div>

            {/* Required */}
            <div className="mat-cell">
              <span className={`req-num ${required === 0 ? 'muted' : ''}`}>
                {required === 0 ? '—' : required}
              </span>
            </div>

            {/* Filled counter */}
            <div className="mat-cell">
              {required > 0 ? (
                <span className={`req-num ${filled >= required ? 'ok' : 'short'}`}>{filled}</span>
              ) : (
                <span className="req-num muted">—</span>
              )}
            </div>

            {/* Vacant */}
            <div className="mat-cell">
              {required > 0 ? (
                <span className={`req-num ${vacant === 0 ? 'ok' : 'short'}`}>
                  {vacant === 0 ? '0' : vacant}
                </span>
              ) : (
                <span className="req-num muted">—</span>
              )}
            </div>

            {/* Workload */}
            <div className="mat-cell">
              <WorkloadPill hours={WORKLOAD[desig] ?? WORKLOAD[DESIGNATIONS.PROFESSOR]} />
            </div>

            {/* Qualification hint */}
            <div className="mat-cell cell-qual">
              <span className="qual-hint">{qualHint(dept, desig)}</span>
            </div>

            {/* Add button */}
            <div className="mat-cell">
              <button
                className={`btn-add ${isShort ? 'btn-add-urgent' : ''}`}
                onClick={() => onAddClick(dept, desig)}
              >
                + Add
              </button>
            </div>
          </div>
        );
      })}
    </SectionCard>
  );
}
