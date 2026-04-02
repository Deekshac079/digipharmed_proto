import React, { useState } from 'react';
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

export function RequirementMatrix({ requirements, slotCounts, intake, faculty, onAddClick, onEdit }) {
  const [selectedSlot, setSelectedSlot] = useState(null);
  
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
            <div 
              className="mat-cell cell-desig mat-cell-clickable"
              onClick={() => {
                if (filled > 0) {
                  setSelectedSlot({ dept, desig, filled });
                }
              }}
              style={{ cursor: filled > 0 ? 'pointer' : 'default' }}
            >
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
            {/* <div className="mat-cell">
              <button
                className={`btn-add ${isShort ? 'btn-add-urgent' : ''}`}
                onClick={() => onAddClick(dept, desig)}
              >
                + Add
              </button>
            </div> */}
          </div>
        );
      })}

      {/* Modal for showing faculty details */}
      {selectedSlot && (
        <FacultySlotModal
          slot={selectedSlot}
          faculty={faculty}
          onClose={() => setSelectedSlot(null)}
          onEdit={onEdit}
        />
      )}
    </SectionCard>
  );
}

// ─── Faculty Slot Modal ───────────────────────────────────────────────
function FacultySlotModal({ slot, faculty, onClose, onEdit }) {
  const { dept, desig } = slot;
  
  // Filter faculty for this dept + desig
  // Note: ASSOC_PROF is mapped to PROFESSOR slot in deriveSlotCounts
  const slotFaculty = faculty.filter(f => {
    if (f.department !== dept) return false;
    if (f.designation === desig) return true;
    // If looking for professor slot, also include assoc_prof faculty
    if (desig === DESIGNATIONS.PROFESSOR && f.designation === DESIGNATIONS.ASSOC_PROF) return true;
    return false;
  });

  return (
    <div className="modal-container">
      {/* Modal overlay */}
      <div className="modal-overlay" onClick={onClose} />
      
      {/* Modal content */}
      <div className="modal-slot-content">
        <div className="modal-header">
          <div>
            <h3 className="modal-title">
              {DEPT_LABELS[dept]} — {DESIG_LABELS[desig]}
            </h3>
            <p className="modal-subtitle">{slotFaculty.length} faculty member(s)</p>
          </div>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {slotFaculty.length === 0 ? (
            <div className="modal-empty-state">
              <p>No faculty members assigned to this slot.</p>
            </div>
          ) : (
            <table className="faculty-slot-table">
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Faculty Name</th>
                  <th>Council No.</th>
                  <th>Qualification</th>
                  <th>Experience</th>
                  <th>Employment</th>
                  <th>SPC Reg.</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {slotFaculty.map(member => {
                  // Format qualification from object { ug, pg, phd }
                  const qualString = member.qualification && typeof member.qualification === 'object'
                    ? Object.values(member.qualification).filter(q => q).join(' + ')
                    : member.qualification || '—';

                  return (
                    <tr key={member.id}>
                      <td className="photo-column">
                        <div className="faculty-photo-sm">
                          {member.profilePhoto ? (
                            <img
                              src={typeof member.profilePhoto === 'string' ? member.profilePhoto : URL.createObjectURL(member.profilePhoto)}
                              alt={member.name}
                              onError={(e) => {
                                e.target.src = '/assets/images/image.png';
                              }}
                            />
                          ) : (
                            <img
                              src="/assets/images/image.png"
                              alt={member.name}
                            />
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="faculty-name-sm">{member.name}</div>
                        <div className="faculty-council-sm">{member.councilNo || member.centralisedCouncilNo}</div>
                      </td>
                      <td className="cell-mono">{member.councilNo || member.centralisedCouncilNo || '—'}</td>
                      <td>
                        <div className="qual-list">
                          {qualString}
                        </div>
                      </td>
                      <td className="cell-sm">{member.experienceYears || member.overallExp || '—'} yrs</td>
                      <td>
                        <span className={`badge-emp ${member.employmentType === 'full-time' ? 'full-time' : 'part-time'}`}>
                          {member.employmentType === 'full-time' ? 'Full-time' : 'Part-time'}
                        </span>
                      </td>
                      <td>
                        <span className={`badge-spc ${member.spcRegistration === 'valid' ? 'valid' : 'pending'}`}>
                          {member.spcRegistration === 'valid' ? 'Valid' : 'Pending'}
                        </span>
                      </td>
                      <td>
                        <span className={`badge-status ${member.status === 'verified' ? 'active' : 'pending'}`}>
                          {member.status === 'verified' ? 'Verified' : 'Review'}
                        </span>
                      </td>
                      {/* <td>
                        <button className="btn-edit-sm" onClick={() => onEdit(member.id)}>
                          Edit
                        </button>
                      </td> */}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
