import React, { useState, useEffect } from 'react';
import {
  DEPARTMENTS, DESIGNATIONS,
  DEPT_LABELS, DESIG_LABELS,
  MQT_REQUIREMENTS,
} from '../../constants/regulations';
import { Button } from '../shared/Shared';
import './AddFacultyDrawer.css';

const EMPTY_FORM = {
  name:           '',
  councilNo:      '',
  department:     '',
  designation:    '',
  ugQual:         '',
  pgQual:         '',
  phd:            '',
  employmentType: '',
  experienceYears:'',
  dateOfJoining:  '',
  oneInstitution: '',
};

export function AddFacultyDrawer({ open, prefillDept, prefillDesig, onClose, onSave, onToast }) {
  const [form, setForm] = useState(EMPTY_FORM);

  // Pre-fill when triggered from matrix "+Add" button
  useEffect(() => {
    if (open) {
      setForm(prev => ({
        ...EMPTY_FORM,
        department:  prefillDept  || '',
        designation: prefillDesig || '',
      }));
    }
  }, [open, prefillDept, prefillDesig]);

  function field(key, val) {
    setForm(prev => ({ ...prev, [key]: val }));
  }

  function handleSave() {
    if (!form.name.trim()) {
      onToast('Please enter the faculty name', 'error'); return;
    }
    if (!form.department) {
      onToast('Department is required', 'error'); return;
    }
    if (!form.designation) {
      onToast('Designation is required', 'error'); return;
    }
    if (!form.councilNo.trim()) {
      onToast('PCI council registration number is required', 'error'); return;
    }
    if (!form.employmentType) {
      onToast('Employment type is required', 'error'); return;
    }

    const quals = {
      ug:  form.ugQual || null,
      pg:  form.pgQual || null,
      phd: form.phd    || null,
    };

    onSave({
      name:           form.name.trim(),
      councilNo:      form.councilNo.trim(),
      department:     form.department,
      designation:    form.designation,
      qualification:  quals,
      experienceYears: parseFloat(form.experienceYears) || 0,
      dateOfJoining:  form.dateOfJoining || null,
      employmentType: form.employmentType,
      spcRegistration:'pending',
      aebas:          false,
      status:         'pending',
      courses:        ['bpharm'],
    });

    onToast('Faculty member added — review in roster', 'success');
    onClose();
  }

  const mqt = MQT_REQUIREMENTS[form.designation];

  return (
    <>
      {/* Overlay */}
      {open && <div className="drawer-overlay" onClick={onClose} />}

      {/* Drawer */}
      <aside className={`add-drawer ${open ? 'drawer-open' : ''}`}>
        <div className="drawer-header">
          <div className="drawer-title">Add Faculty Member</div>
          <button className="close-btn" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="drawer-body">

          {/* Qual hint box */}
          {mqt && (
            <div className="qual-info-box">
              <div className="qual-info-row">
                <strong>Slot:</strong>
                <span>{DEPT_LABELS[form.department] || '—'} › {DESIG_LABELS[form.designation] || '—'}</span>
              </div>
              <div className="qual-info-row">
                <strong>UG:</strong><span>{mqt.ug}</span>
              </div>
              <div className="qual-info-row">
                <strong>PG:</strong><span>{mqt.pg}</span>
              </div>
              <div className="qual-info-row">
                <strong>Ph.D:</strong><span>{mqt.phd}</span>
              </div>
              <div className="qual-info-row">
                <strong>Exp:</strong><span>{mqt.exp}</span>
              </div>
              <div className="qual-info-ref">{mqt.ref}</div>
            </div>
          )}

          {/* Department + Designation */}
          <div className="form-row-2">
            <FormField label="Department" required regRef="App-A Cl3">
              <select
                className="form-input"
                value={form.department}
                onChange={e => field('department', e.target.value)}
              >
                <option value="">— Select department —</option>
                {Object.entries(DEPT_LABELS).map(([id, label]) => (
                  <option key={id} value={id}>{label}</option>
                ))}
              </select>
            </FormField>

            <FormField label="Designation" required regRef="App-A Cl3">
              <select
                className="form-input"
                value={form.designation}
                onChange={e => field('designation', e.target.value)}
              >
                <option value="">— Select —</option>
                {Object.entries(DESIG_LABELS).map(([id, label]) => (
                  <option key={id} value={id}>{label}</option>
                ))}
              </select>
            </FormField>
          </div>

          {/* Full name */}
          <FormField label="Full name" required>
            <input
              type="text"
              className="form-input"
              placeholder="As per council registration"
              value={form.name}
              onChange={e => field('name', e.target.value)}
            />
          </FormField>

          {/* Council no */}
          <FormField
            label="PCI Council Registration No."
            required
            regRef="MQT Cl(ii)"
            hint="Must be a valid, current registration in the State Pharmacy Council pharmacist register."
          >
            <input
              type="text"
              className="form-input"
              placeholder="e.g. BH-P-24-XXXXXXXXXX"
              value={form.councilNo}
              onChange={e => field('councilNo', e.target.value)}
            />
          </FormField>

          {/* UG + PG */}
          <div className="form-row-2">
            <FormField
              label="UG Qualification"
              required
              regRef="MQT S-II"
              hint="First Class (≥60%) is mandatory."
            >
              <select
                className="form-input"
                value={form.ugQual}
                onChange={e => field('ugQual', e.target.value)}
              >
                <option value="">— Select —</option>
                <option value="B.Pharm (First Class ≥60%)">B.Pharm (First Class ≥60%)</option>
                <option value="B.Pharm (Second Class)">B.Pharm (Second Class)</option>
                <option value="Pharm.D">Pharm.D</option>
              </select>
            </FormField>

            <FormField label="PG Qualification" required>
              <select
                className="form-input"
                value={form.pgQual}
                onChange={e => field('pgQual', e.target.value)}
              >
                <option value="">— Select —</option>
                <option value="M.Pharm (Pharmaceutics)">M.Pharm (Pharmaceutics)</option>
                <option value="M.Pharm (Pharmaceutical Chemistry)">M.Pharm (Pharmaceutical Chemistry)</option>
                <option value="M.Pharm (Pharmacology)">M.Pharm (Pharmacology)</option>
                <option value="M.Pharm (Pharmacognosy)">M.Pharm (Pharmacognosy)</option>
                <option value="M.Pharm (Pharmacy Practice)">M.Pharm (Pharmacy Practice)</option>
                <option value="Pharm.D (Pharmacy Practice)">Pharm.D (Pharmacy Practice)</option>
              </select>
            </FormField>
          </div>

          {/* Ph.D + Employment */}
          <div className="form-row-2">
            <FormField label="Ph.D">
              <select
                className="form-input"
                value={form.phd}
                onChange={e => field('phd', e.target.value)}
              >
                <option value="">— Select —</option>
                <option value="Ph.D">Awarded (PCI recognized)</option>
                <option value="pursuing">Pursuing — within 7-yr window</option>
                <option value="">Not applicable</option>
              </select>
            </FormField>

            <FormField label="Employment type" required regRef="App-A Cl3(i)">
              <select
                className="form-input"
                value={form.employmentType}
                onChange={e => field('employmentType', e.target.value)}
              >
                <option value="">— Select —</option>
                <option value="full-time">Full-time (mandatory for pharmacy subjects)</option>
                <option value="part-time">Part-time (only: Maths / Stats / Electronics / CS)</option>
              </select>
            </FormField>
          </div>

          {/* Exp + DOJ */}
          <div className="form-row-2">
            <FormField label="Total experience (years)" required>
              <input
                type="number"
                className="form-input"
                placeholder="0"
                min="0" max="60"
                value={form.experienceYears}
                onChange={e => field('experienceYears', e.target.value)}
              />
            </FormField>
            <FormField label="Date of joining" required>
              <input
                type="date"
                className="form-input"
                value={form.dateOfJoining}
                onChange={e => field('dateOfJoining', e.target.value)}
              />
            </FormField>
          </div>

          {/* One-institution declaration */}
          <FormField
            label="One-institution declaration"
            required
            regRef="MQT Cl(xii)"
            hint="A faculty member can be counted at only ONE pharmacy college per academic year (1 Jul – 30 Jun)."
          >
            <select
              className="form-input"
              value={form.oneInstitution}
              onChange={e => field('oneInstitution', e.target.value)}
            >
              <option value="">— Select —</option>
              <option value="confirmed">Confirmed — not counted at any other institution this session</option>
              <option value="pending">Pending Staff Declaration Form</option>
            </select>
          </FormField>

        </div>

        <div className="drawer-footer">
          <Button variant="primary" fullWidth onClick={handleSave}>
            Save &amp; add to roster
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </div>
      </aside>
    </>
  );
}

/* ── FormField helper ────────────────────────────────────────────────────── */
function FormField({ label, required, regRef, hint, children }) {
  return (
    <div className="form-field">
      <label className="form-label">
        {label}
        {required && <span className="req-star">*</span>}
        {regRef && <span className="reg-ref-badge">{regRef}</span>}
      </label>
      {children}
      {hint && <div className="form-hint">{hint}</div>}
    </div>
  );
}
