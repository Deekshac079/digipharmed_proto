import React, { useState, useEffect } from 'react';
import {
  DEPARTMENTS, DESIGNATIONS,
  DEPT_LABELS, DESIG_LABELS,
  QUALIFICATIONS,
  MQT_REQUIREMENTS,
  DPHARM_MQT_REQUIREMENTS,
  DPHARM_GENERAL_REQUIREMENTS,
  DPHARM_COMPLIANCE_CHECKLIST,
  PART_TIME_PERMITTED_SUBJECTS,
} from '../../constants/regulations';
import { Button } from '../shared/Shared';
import './AddFacultyDrawer.css';

/* ── Validation Functions ────────────────────────────────────────────────── */
const validateEmail = (email) => {
  if (!email.trim()) return { isValid: true, message: '' };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return {
    isValid: emailRegex.test(email),
    message: emailRegex.test(email) ? '' : 'Invalid email format (e.g., user@example.com)'
  };
};

const validateMobileNumber = (mobile) => {
  if (!mobile.trim()) return { isValid: true, message: '' };
  const cleanedNumber = mobile.replace(/\D/g, '');
  
  if (cleanedNumber.length !== 10) {
    return { isValid: false, message: 'Mobile number must be exactly 10 digits' };
  }
  
  if (!/^[6-9]/.test(cleanedNumber)) {
    return { isValid: false, message: 'Mobile number must start with 6, 7, 8, or 9' };
  }
  
  return { isValid: true, message: '' };
};

// Validate State Council No (must be alphanumeric)
const validateStateCouncilNo = (stateCouncilNo) => {
  if (!stateCouncilNo.trim()) return { isValid: false, message: 'State Council No is required (MQT 2014 Requirement)' };
  
  // Check if it contains only alphanumeric and hyphens
  if (!/^[a-zA-Z0-9\-]+$/.test(stateCouncilNo.trim())) {
    return { isValid: false, message: 'State Council No should contain only letters, numbers, and hyphens' };
  }
  
  return { isValid: true, message: '' };
};

// Validate qualification based on designation
const validateQualificationByDesignation = (qualifications, designation) => {
  if (!qualifications || qualifications.length === 0) {
    return { isValid: false, message: 'At least one qualification is required' };
  }
  
  if (designation === DESIGNATIONS.HOI) {
    // HOI requires Post Graduate (M.Pharm, Pharm.D, Ph.D)
    const hasPostGradPharmacy = qualifications.some(q => 
      ['mpharm', 'pharmd', 'phd_pharmacy', 'phd_other'].includes(q)
    );
    if (!hasPostGradPharmacy) {
      return { 
        isValid: false, 
        message: 'HOI must have Post Graduate qualification (M.Pharm, Pharm.D, or Ph.D in Pharmaceutical Sciences)' 
      };
    }
  } else if ([DESIGNATIONS.LECTURER, DESIGNATIONS.ASST_PROF].includes(designation)) {
    // Lecturer requires M.Pharm, Pharm.D, or B.Pharm
    const hasValidQual = qualifications.some(q => 
      ['mpharm', 'pharmd', 'bpharm'].includes(q)
    );
    if (!hasValidQual) {
      return { 
        isValid: false, 
        message: 'Lecturer must have M.Pharm, Pharm.D, or B.Pharm (PCI recognized)' 
      };
    }
  }
  
  return { isValid: true, message: '' };
};

// Validate experience based on designation
const validateExperienceByDesignation = (experience, designation) => {
  const expNum = parseInt(experience) || 0;
  
  if (designation === DESIGNATIONS.HOI) {
    // HOI requires minimum 5 years
    if (expNum < 5) {
      return { 
        isValid: false, 
        message: 'HOI must have minimum 5 years teaching experience in PCI-approved college' 
      };
    }
  } else if ([DESIGNATIONS.LECTURER, DESIGNATIONS.ASST_PROF].includes(designation)) {
    // Lecturer requires minimum 3 years
    if (expNum < 3) {
      return { 
        isValid: false, 
        message: 'Lecturer must have minimum 3 years professional/teaching experience' 
      };
    }
  }
  
  return { isValid: true, message: '' };
};

// ─── MQT 2014 Compliance Checklist Validators ──────────────────────────────
// Full-time staff requirement for pharmacy subjects
const validateFullTimeMandate = (denomination, designation) => {
  // Pharmacy subject lecturers must be full-time
  if ([DESIGNATIONS.LECTURER, DESIGNATIONS.ASSOC_PROF, DESIGNATIONS.ASST_PROF].includes(designation)) {
    if (denomination !== 'full-time') {
      return {
        isValid: false,
        message: 'All pharmacy subject lecturers must be full-time per MQT 2014 requirement'
      };
    }
  }
  return { isValid: true, message: '' };
};

// No concurrent employment check (Staff Declaration Form)
const validateNoConcurrentEmployment = (isConfirmed) => {
  if (!isConfirmed) {
    return {
      isValid: false,
      message: 'Must confirm no concurrent employment at another pharmacy institution (Staff Declaration Form required)'
    };
  }
  return { isValid: true, message: '' };
};

// No debarment order check
const validateNoDebarmentOrder = (isConfirmed) => {
  if (!isConfirmed) {
    return {
      isValid: false,
      message: 'Must confirm no 3-year debarment order from PCI for misconduct or concurrent employment violation'
    };
  }
  return { isValid: true, message: '' };
};

// PCI recognized basic pharmacy degree check
const validatePCIRecognizedDegree = (isConfirmed) => {
  if (!isConfirmed) {
    return {
      isValid: false,
      message: 'Must confirm basic pharmacy degree from PCI-approved institution under Pharmacy Act 1948, Section 12'
    };
  }
  return { isValid: true, message: '' };
};

const EMPTY_FORM = {
  facultyName:        '',
  profilePhoto:       '',
  centralisedCouncilNo: '',
  stateCouncilNo:     '',
  qualifications:     [],  // Array of qualification IDs
  designation:        '',
  department:         '',
  overallExp:         '',
  email:              '',
  mobile:             '',
  dateOfJoining:      '',
  employmentType:     'full-time',  // 'full-time' or 'part-time'
  noConcurrentEmployment: false,    // Staff Declaration: No concurrent employment
  noDebarmentOrder:   false,        // No 3-year debarment order
  pciRecognizedDegree: false,       // PCI recognized basic pharmacy degree
};

export function AddFacultyDrawer({ open, prefillDept, prefillDesig, onClose, onSave, onToast }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Pre-fill when triggered from matrix "+Add" button
  useEffect(() => {
    if (open) {
      setForm(prev => ({
        ...EMPTY_FORM,
        department:  prefillDept  || '',
        designation: prefillDesig || '',
      }));
      setErrors({});
      setTouched({});
    }
  }, [open, prefillDept, prefillDesig]);

  function field(key, val) {
    setForm(prev => ({ ...prev, [key]: val }));
    
    // Real-time validation for email and mobile
    if (key === 'email') {
      const validation = validateEmail(val);
      setErrors(prev => ({
        ...prev,
        email: validation.message
      }));
    }
    
    if (key === 'mobile') {
      const validation = validateMobileNumber(val);
      setErrors(prev => ({
        ...prev,
        mobile: validation.message
      }));
    }

    // Real-time validation for State Council No
    if (key === 'stateCouncilNo') {
      const validation = validateStateCouncilNo(val);
      setErrors(prev => ({
        ...prev,
        stateCouncilNo: validation.message
      }));
    }

    // Real-time validation for Qualifications based on designation
    if (key === 'qualifications' || key === 'designation') {
      const targetDesignation = key === 'designation' ? val : form.designation;
      const targetQualifications = key === 'qualifications' ? val : form.qualifications;
      
      if (targetDesignation) {
        const validation = validateQualificationByDesignation(targetQualifications, targetDesignation);
        setErrors(prev => ({
          ...prev,
          qualifications: validation.message
        }));
      }
    }

    // Real-time validation for Experience based on designation
    if (key === 'overallExp' || key === 'designation') {
      const targetDesignation = key === 'designation' ? val : form.designation;
      const targetExp = key === 'overallExp' ? val : form.overallExp;
      
      if (targetDesignation) {
        const validation = validateExperienceByDesignation(targetExp, targetDesignation);
        setErrors(prev => ({
          ...prev,
          overallExp: validation.message
        }));
      }
    }
    
    // Clear touched error when user starts typing
    if (touched[key]) {
      setTouched(prev => ({
        ...prev,
        [key]: true
      }));
    }
  }

  function handleFieldBlur(fieldName) {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    
    // Validate on blur
    if (fieldName === 'email') {
      const validation = validateEmail(form.email);
      if (!validation.isValid) {
        setErrors(prev => ({ ...prev, email: validation.message }));
      }
    }
    
    if (fieldName === 'mobile') {
      const validation = validateMobileNumber(form.mobile);
      if (!validation.isValid) {
        setErrors(prev => ({ ...prev, mobile: validation.message }));
      }
    }

    if (fieldName === 'stateCouncilNo') {
      const validation = validateStateCouncilNo(form.stateCouncilNo);
      if (!validation.isValid) {
        setErrors(prev => ({ ...prev, stateCouncilNo: validation.message }));
      }
    }

    if (fieldName === 'qualifications' && form.designation) {
      const validation = validateQualificationByDesignation(form.qualifications, form.designation);
      if (!validation.isValid) {
        setErrors(prev => ({ ...prev, qualifications: validation.message }));
      }
    }

    if (fieldName === 'overallExp' && form.designation) {
      const validation = validateExperienceByDesignation(form.overallExp, form.designation);
      if (!validation.isValid) {
        setErrors(prev => ({ ...prev, overallExp: validation.message }));
      }
    }
  }

  function handleSave() {
    // Validate required fields
    if (!form.facultyName.trim()) {
      onToast('Please enter the faculty name', 'error');
      setTouched(prev => ({ ...prev, facultyName: true }));
      return;
    }
    if (!form.department) {
      onToast('Department is required', 'error');
      setTouched(prev => ({ ...prev, department: true }));
      return;
    }
    if (!form.designation) {
      onToast('Designation is required', 'error');
      setTouched(prev => ({ ...prev, designation: true }));
      return;
    }
    if (!form.centralisedCouncilNo.trim()) {
      onToast('Centralised council number is required', 'error');
      setTouched(prev => ({ ...prev, centralisedCouncilNo: true }));
      return;
    }

    // ─── MQT 2014 Requirement: State Council Registration ────────────────────
    const stateCouncilValidation = validateStateCouncilNo(form.stateCouncilNo);
    if (!stateCouncilValidation.isValid) {
      onToast(stateCouncilValidation.message, 'error');
      setTouched(prev => ({ ...prev, stateCouncilNo: true }));
      return;
    }

    if (!form.qualifications || form.qualifications.length === 0) {
      onToast('At least one qualification is required', 'error');
      setTouched(prev => ({ ...prev, qualifications: true }));
      return;
    }

    // ─── MQT 2014 Requirement: Qualification by Designation ──────────────────
    const qualificationValidation = validateQualificationByDesignation(form.qualifications, form.designation);
    if (!qualificationValidation.isValid) {
      onToast(qualificationValidation.message, 'error');
      setTouched(prev => ({ ...prev, qualifications: true }));
      return;
    }

    // ─── MQT 2014 Requirement: Experience by Designation ────────────────────
    const experienceValidation = validateExperienceByDesignation(form.overallExp, form.designation);
    if (!experienceValidation.isValid) {
      onToast(experienceValidation.message, 'error');
      setTouched(prev => ({ ...prev, overallExp: true }));
      return;
    }

    if (!form.dateOfJoining.trim()) {
      onToast('Date of joining is required', 'error');
      setTouched(prev => ({ ...prev, dateOfJoining: true }));
      return;
    }

    // Validate email if filled
    if (form.email.trim()) {
      const emailValidation = validateEmail(form.email);
      if (!emailValidation.isValid) {
        onToast('Please enter a valid email address', 'error');
        return;
      }
    }

    // Validate mobile if filled
    if (form.mobile.trim()) {
      const mobileValidation = validateMobileNumber(form.mobile);
      if (!mobileValidation.isValid) {
        onToast(mobileValidation.message, 'error');
        return;
      }
    }

    // ─── MQT 2014 Compliance Checklist Validations ─────────────────────────────

    // Full-time mandate for pharmacy subject lecturers
    const fullTimeValidation = validateFullTimeMandate(form.employmentType, form.designation);
    if (!fullTimeValidation.isValid) {
      onToast(fullTimeValidation.message, 'error');
      setTouched(prev => ({ ...prev, employmentType: true }));
      return;
    }

    // No concurrent employment verification
    const concurrentEmpValidation = validateNoConcurrentEmployment(form.noConcurrentEmployment);
    if (!concurrentEmpValidation.isValid) {
      onToast(concurrentEmpValidation.message, 'error');
      return;
    }

    // No debarment order verification
    const debarmentValidation = validateNoDebarmentOrder(form.noDebarmentOrder);
    if (!debarmentValidation.isValid) {
      onToast(debarmentValidation.message, 'error');
      return;
    }

    // PCI recognized basic pharmacy degree verification
    const pciDegreeValidation = validatePCIRecognizedDegree(form.pciRecognizedDegree);
    if (!pciDegreeValidation.isValid) {
      onToast(pciDegreeValidation.message, 'error');
      return;
    }

    // Get qualification labels for display
    const qualificationLabels = form.qualifications
      .map(id => QUALIFICATIONS.find(q => q.id === id)?.label)
      .filter(Boolean);

    // All validations passed
    onSave({
      facultyName:        form.facultyName.trim(),
      profilePhoto:       form.profilePhoto || null,
      centralisedCouncilNo: form.centralisedCouncilNo.trim(),
      stateCouncilNo:     form.stateCouncilNo.trim(),
      qualifications:     form.qualifications,
      qualificationLabels: qualificationLabels,
      designation:        form.designation,
      department:         form.department,
      overallExp:         form.overallExp || '0',
      email:              form.email.trim() || null,
      mobile:             form.mobile.trim() || null,
      dateOfJoining:      form.dateOfJoining,
      employmentType:     form.employmentType,
      noConcurrentEmployment: form.noConcurrentEmployment,
      noDebarmentOrder:   form.noDebarmentOrder,
      pciRecognizedDegree: form.pciRecognizedDegree,
    });

    onToast('Faculty member added successfully (MQT 2014 & Compliance Checklist verified)', 'success');
    onClose();
  }

  return (
    <>
      {/* Overlay */}
      {open && <div className="drawer-overlay" onClick={onClose} />}

      {/* Drawer */}
      <aside className={`add-drawer ${open ? 'drawer-open' : ''}`} role="dialog" aria-modal="true" aria-labelledby="drawer-title">
        <div className="drawer-header">
          <div className="drawer-title" id="drawer-title">Add Faculty Member</div>
          <button className="close-btn" onClick={onClose} aria-label="Close drawer">✕</button>
        </div>

        <div className="drawer-body">

          {/* Profile Photo */}
          <FormField label="Profile Photo">
            <input
              type="file"
              className="form-input"
              accept="image/*"
              onChange={e => field('profilePhoto', e.target.files?.[0] || '')}
            />
          </FormField>

          {/* Faculty Name */}
          <FormField label="Faculty Name" required>
            <input
              type="text"
              className={`form-input ${touched.facultyName && !form.facultyName.trim() ? 'input-error' : ''}`}
              placeholder="Enter full name"
              value={form.facultyName}
              onChange={e => field('facultyName', e.target.value)}
              onBlur={() => handleFieldBlur('facultyName')}
              aria-required="true"
            />
            {touched.facultyName && !form.facultyName.trim() && (
              <span className="form-error">Faculty name is required</span>
            )}
          </FormField>

          {/* Centralised Council No + State Council No */}
          <div className="form-row-2">
            <FormField label="Centralised Council No" required>
              <input
                type="text"
                className={`form-input ${touched.centralisedCouncilNo && !form.centralisedCouncilNo.trim() ? 'input-error' : ''}`}
                placeholder="e.g. BH-P-23-XXXXX"
                value={form.centralisedCouncilNo}
                onChange={e => field('centralisedCouncilNo', e.target.value)}
                onBlur={() => handleFieldBlur('centralisedCouncilNo')}
              />
              {touched.centralisedCouncilNo && !form.centralisedCouncilNo.trim() && (
                <span className="form-error">Centralised council number is required</span>
              )}
            </FormField>

            <FormField label="State Council No" required hint="MQT 2014 Requirement">
              <input
                type="text"
                className={`form-input ${touched.stateCouncilNo && errors.stateCouncilNo ? 'input-error' : ''}`}
                placeholder="e.g. PH-12-XXXXX"
                value={form.stateCouncilNo}
                onChange={e => field('stateCouncilNo', e.target.value)}
                onBlur={() => handleFieldBlur('stateCouncilNo')}
              />
              {touched.stateCouncilNo && errors.stateCouncilNo && (
                <span className="form-error">{errors.stateCouncilNo}</span>
              )}
            </FormField>
          </div>

          {/* Designation + Department */}
          <div className="form-row-2">
            <FormField label="Designation" required>
              <select
                className={`form-input ${touched.designation && !form.designation ? 'input-error' : ''}`}
                value={form.designation}
                onChange={e => field('designation', e.target.value)}
                onBlur={() => handleFieldBlur('designation')}
              >
                <option value="">— Select —</option>
                {Object.entries(DESIG_LABELS).map(([id, label]) => (
                  <option key={id} value={id}>{label}</option>
                ))}
              </select>
              {touched.designation && !form.designation && (
                <span className="form-error">Designation is required</span>
              )}
            </FormField>

            <FormField label="Department" required>
              <select
                className={`form-input ${touched.department && !form.department ? 'input-error' : ''}`}
                value={form.department}
                onChange={e => field('department', e.target.value)}
                onBlur={() => handleFieldBlur('department')}
              >
                <option value="">— Select department —</option>
                {Object.entries(DEPT_LABELS).map(([id, label]) => (
                  <option key={id} value={id}>{label}</option>
                ))}
              </select>
              {touched.department && !form.department && (
                <span className="form-error">Department is required</span>
              )}
            </FormField>
          </div>

          {/* Qualification - Multi-Select Checkboxes */}
          <div className="form-field">
            <label className="form-label">
              Qualifications
              <span className="req-star">*</span>
            </label>
            <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '12px' }}>See MQT 2014 requirements for your designation</div>
            
            {/* Pharmacy Qualifications */}
            <div style={{ marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#1f2937', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Pharmacy Qualifications
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {QUALIFICATIONS.filter(q => q.category === 'pharmacy').map(qual => (
                  <label key={qual.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={form.qualifications.includes(qual.id)}
                      onChange={e => {
                        const newQuals = e.target.checked
                          ? [...form.qualifications, qual.id]
                          : form.qualifications.filter(q => q !== qual.id);
                        field('qualifications', newQuals);
                      }}
                      onBlur={() => handleFieldBlur('qualifications')}
                      style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: '#3b82f6' }}
                    />
                    <span style={{ fontSize: '13px', color: '#1f2937' }}>{qual.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Medical Qualifications */}
            <div style={{ marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#1f2937', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Medical Qualifications
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {QUALIFICATIONS.filter(q => q.category === 'medical').map(qual => (
                  <label key={qual.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={form.qualifications.includes(qual.id)}
                      onChange={e => {
                        const newQuals = e.target.checked
                          ? [...form.qualifications, qual.id]
                          : form.qualifications.filter(q => q !== qual.id);
                        field('qualifications', newQuals);
                      }}
                      onBlur={() => handleFieldBlur('qualifications')}
                      style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: '#3b82f6' }}
                    />
                    <span style={{ fontSize: '13px', color: '#1f2937' }}>{qual.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Support Subject Qualifications */}
            <div style={{ marginBottom: '8px' }}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#1f2937', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Support Subject Qualifications
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {QUALIFICATIONS.filter(q => q.category === 'support').map(qual => (
                  <label key={qual.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={form.qualifications.includes(qual.id)}
                      onChange={e => {
                        const newQuals = e.target.checked
                          ? [...form.qualifications, qual.id]
                          : form.qualifications.filter(q => q !== qual.id);
                        field('qualifications', newQuals);
                      }}
                      onBlur={() => handleFieldBlur('qualifications')}
                      style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: '#3b82f6' }}
                    />
                    <span style={{ fontSize: '13px', color: '#1f2937' }}>{qual.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {touched.qualifications && errors.qualifications && (
              <span className="form-error" style={{ marginTop: '8px', display: 'block' }}>{errors.qualifications}</span>
            )}
          </div>

          {/* Overall Experience + Date of Joining */}
          <div className="form-row-2">
            <FormField label="Overall Experience (years)" required hint="See MQT 2014 for designation minimums">
              <input
                type="number"
                className={`form-input ${(touched.overallExp && !form.overallExp) || (touched.overallExp && errors.overallExp) ? 'input-error' : ''}`}
                placeholder="0"
                min="0" max="60"
                value={form.overallExp}
                onChange={e => field('overallExp', e.target.value)}
                onBlur={() => handleFieldBlur('overallExp')}
              />
              {touched.overallExp && !form.overallExp && (
                <span className="form-error">Overall experience is required</span>
              )}
              {touched.overallExp && errors.overallExp && form.overallExp && (
                <span className="form-error">{errors.overallExp}</span>
              )}
            </FormField>

            <FormField label="Date of Joining" required>
              <input
                type="date"
                className={`form-input ${touched.dateOfJoining && !form.dateOfJoining ? 'input-error' : ''}`}
                value={form.dateOfJoining}
                onChange={e => field('dateOfJoining', e.target.value)}
                onBlur={() => handleFieldBlur('dateOfJoining')}
              />
              {touched.dateOfJoining && !form.dateOfJoining && (
                <span className="form-error">Date of joining is required</span>
              )}
            </FormField>
          </div>

          {/* Email + Mobile */}
          <div className="form-row-2">
            <FormField label="Email" hint="(Format: user@example.com)">
              <input
                type="email"
                className={`form-input ${touched.email && errors.email ? 'input-error' : ''}`}
                placeholder="e.g. email@domain.com"
                value={form.email}
                onChange={e => field('email', e.target.value)}
                onBlur={() => handleFieldBlur('email')}
              />
              {touched.email && errors.email && (
                <span className="form-error">{errors.email}</span>
              )}
            </FormField>

            <FormField label="Mobile" hint="(10-digit number)">
              <input
                type="tel"
                className={`form-input ${touched.mobile && errors.mobile ? 'input-error' : ''}`}
                placeholder="e.g. 9876543210"
                value={form.mobile}
                onChange={e => field('mobile', e.target.value)}
                onBlur={() => handleFieldBlur('mobile')}
                maxLength="10"
              />
              {touched.mobile && errors.mobile && (
                <span className="form-error">{errors.mobile}</span>
              )}
            </FormField>
          </div>

          {/* ─── MQT 2014 Compliance Checklist ──────────────────────────── */}
          <div style={{ borderTop: '1px solid #e5e7eb', marginTop: '24px', paddingTop: '24px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#1f2937', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '16px' }}>
              ✓ MQT 2014 Compliance Checklist
            </div>

            {/* Employment Type */}
            <FormField label="Employment Type" required>
              <select
                className={`form-input ${touched.employmentType ? '' : ''}`}
                value={form.employmentType}
                onChange={e => field('employmentType', e.target.value)}
                onBlur={() => handleFieldBlur('employmentType')}
              >
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time (Mathematics, Statistics, etc. only)</option>
              </select>
            </FormField>

            {/* No Concurrent Employment Declaration */}
            <label className="checkbox-field">
              <input
                type="checkbox"
                checked={form.noConcurrentEmployment}
                onChange={e => field('noConcurrentEmployment', e.target.checked)}
              />
              <span className="checkbox-label">
                I confirm no concurrent employment at another pharmacy institution
                <br />
                <small style={{ color: '#6b7280', marginTop: '4px', display: 'block' }}>Staff Declaration Form required</small>
              </span>
            </label>

            {/* No Debarment Order Declaration */}
            <label className="checkbox-field">
              <input
                type="checkbox"
                checked={form.noDebarmentOrder}
                onChange={e => field('noDebarmentOrder', e.target.checked)}
              />
              <span className="checkbox-label">
                I confirm no 3-year debarment order from PCI
                <br />
                <small style={{ color: '#6b7280', marginTop: '4px', display: 'block' }}>For misconduct or employment violations</small>
              </span>
            </label>

            {/* PCI Recognized Basic Pharmacy Degree */}
            <label className="checkbox-field">
              <input
                type="checkbox"
                checked={form.pciRecognizedDegree}
                onChange={e => field('pciRecognizedDegree', e.target.checked)}
              />
              <span className="checkbox-label">
                I confirm basic pharmacy degree from PCI-approved institution
                <br />
                <small style={{ color: '#6b7280', marginTop: '4px', display: 'block' }}>Under Pharmacy Act 1948, Section 12</small>
              </span>
            </label>
          </div>

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

/* ── FormField helper ────────────────────────────────────────────────── */
function FormField({ label, required, hint, children }) {
  return (
    <div className="form-field">
      <div className="form-label-container">
        <label className="form-label">
          {label}
          {required && <span className="req-star">*</span>}
        </label>
        {hint && <span className="form-hint">{hint}</span>}
      </div>
      {children}
    </div>
  );
}
