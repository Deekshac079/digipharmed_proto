// ─── Source: B.Pharm Course Regulations 2014, Appendix-A, Clause 3 ───────────
// Gazette No. 362, Dec 11 2014 | Pages 36-37

export const INTAKE_OPTIONS = [60, 100];

// Department IDs used throughout the app
export const DEPARTMENTS = {
  PHARMACEUTICS:     'pharmaceutics',
  PHARM_CHEMISTRY:   'pharm_chemistry',   // includes Pharmaceutical Analysis
  PHARMACOLOGY:      'pharmacology',
  PHARMACOGNOSY:     'pharmacognosy',
  PHARMACY_PRACTICE: 'pharmacy_practice',
};

// Designation IDs
export const DESIGNATIONS = {
  HOI:        'hoi',            // Head of Institution / Director / Principal
  PROFESSOR:  'professor',
  ASSOC_PROF: 'assoc_prof',
  ASST_PROF:  'asst_prof',
  LECTURER:   'lecturer',
};

// Display labels
export const DEPT_LABELS = {
  [DEPARTMENTS.PHARMACEUTICS]:     'Pharmaceutics',
  [DEPARTMENTS.PHARM_CHEMISTRY]:   'Pharm. Chemistry (incl. Analysis)',
  [DEPARTMENTS.PHARMACOLOGY]:      'Pharmacology',
  [DEPARTMENTS.PHARMACOGNOSY]:     'Pharmacognosy',
  [DEPARTMENTS.PHARMACY_PRACTICE]: 'Pharmacy Practice & Related',
};

export const DESIG_LABELS = {
  [DESIGNATIONS.HOI]:        'Head of Institution / Director',
  [DESIGNATIONS.PROFESSOR]:  'Professor',
  [DESIGNATIONS.ASSOC_PROF]: 'Associate Professor',
  [DESIGNATIONS.ASST_PROF]:  'Assistant Professor',
  [DESIGNATIONS.LECTURER]:   'Lecturer',
};

// ─── B.Pharm Faculty requirement matrix ──────────────────────────────────────
// Source: Appendix-A, Cl. 3(iii) | Key: `${dept}_${desig}`
export const BPHARM_REQUIREMENTS = {
  60: {
    [`${DEPARTMENTS.PHARMACEUTICS}_${DESIGNATIONS.PROFESSOR}`]:      1,
    [`${DEPARTMENTS.PHARMACEUTICS}_${DESIGNATIONS.ASST_PROF}`]:      1,
    [`${DEPARTMENTS.PHARMACEUTICS}_${DESIGNATIONS.LECTURER}`]:       2,

    [`${DEPARTMENTS.PHARM_CHEMISTRY}_${DESIGNATIONS.PROFESSOR}`]:    1,
    [`${DEPARTMENTS.PHARM_CHEMISTRY}_${DESIGNATIONS.ASST_PROF}`]:    1,
    [`${DEPARTMENTS.PHARM_CHEMISTRY}_${DESIGNATIONS.LECTURER}`]:     3,

    [`${DEPARTMENTS.PHARMACOLOGY}_${DESIGNATIONS.PROFESSOR}`]:       1,
    [`${DEPARTMENTS.PHARMACOLOGY}_${DESIGNATIONS.ASST_PROF}`]:       1,
    [`${DEPARTMENTS.PHARMACOLOGY}_${DESIGNATIONS.LECTURER}`]:        2,

    [`${DEPARTMENTS.PHARMACOGNOSY}_${DESIGNATIONS.PROFESSOR}`]:      1,
    [`${DEPARTMENTS.PHARMACOGNOSY}_${DESIGNATIONS.ASST_PROF}`]:      1,
    [`${DEPARTMENTS.PHARMACOGNOSY}_${DESIGNATIONS.LECTURER}`]:       1,

    [`${DEPARTMENTS.PHARMACY_PRACTICE}_${DESIGNATIONS.PROFESSOR}`]:  0,  // Not req at 60
    [`${DEPARTMENTS.PHARMACY_PRACTICE}_${DESIGNATIONS.ASST_PROF}`]:  1,
    [`${DEPARTMENTS.PHARMACY_PRACTICE}_${DESIGNATIONS.LECTURER}`]:   1,
  },
  100: {
    [`${DEPARTMENTS.PHARMACEUTICS}_${DESIGNATIONS.PROFESSOR}`]:      1,
    [`${DEPARTMENTS.PHARMACEUTICS}_${DESIGNATIONS.ASST_PROF}`]:      2,
    [`${DEPARTMENTS.PHARMACEUTICS}_${DESIGNATIONS.LECTURER}`]:       3,

    [`${DEPARTMENTS.PHARM_CHEMISTRY}_${DESIGNATIONS.PROFESSOR}`]:    1,
    [`${DEPARTMENTS.PHARM_CHEMISTRY}_${DESIGNATIONS.ASST_PROF}`]:    2,
    [`${DEPARTMENTS.PHARM_CHEMISTRY}_${DESIGNATIONS.LECTURER}`]:     3,

    [`${DEPARTMENTS.PHARMACOLOGY}_${DESIGNATIONS.PROFESSOR}`]:       1,
    [`${DEPARTMENTS.PHARMACOLOGY}_${DESIGNATIONS.ASST_PROF}`]:       1,
    [`${DEPARTMENTS.PHARMACOLOGY}_${DESIGNATIONS.LECTURER}`]:        3,

    [`${DEPARTMENTS.PHARMACOGNOSY}_${DESIGNATIONS.PROFESSOR}`]:      1,
    [`${DEPARTMENTS.PHARMACOGNOSY}_${DESIGNATIONS.ASST_PROF}`]:      1,
    [`${DEPARTMENTS.PHARMACOGNOSY}_${DESIGNATIONS.LECTURER}`]:       1,

    [`${DEPARTMENTS.PHARMACY_PRACTICE}_${DESIGNATIONS.PROFESSOR}`]:  1,  // Required at 100
    [`${DEPARTMENTS.PHARMACY_PRACTICE}_${DESIGNATIONS.ASST_PROF}`]:  1,
    [`${DEPARTMENTS.PHARMACY_PRACTICE}_${DESIGNATIONS.LECTURER}`]:   1,
  },
};

// Workload hours per week by designation — Appendix-A, Cl. 3(iii)
export const WORKLOAD = {
  [DESIGNATIONS.HOI]:        null,
  [DESIGNATIONS.PROFESSOR]:  8,
  [DESIGNATIONS.ASSOC_PROF]: 8,
  [DESIGNATIONS.ASST_PROF]:  12,
  [DESIGNATIONS.LECTURER]:   16,
};

// Qualification requirements — MQT Regulations 2014, Table, Section II
export const MQT_REQUIREMENTS = {
  [DESIGNATIONS.HOI]: {
    label: 'Head of Institution / Director / Principal',
    ug: 'First Class B.Pharm (≥60%) from PCI-approved institution',
    pg: 'M.Pharm (relevant specialization, PCI recognized)',
    phd: 'Ph.D in any Pharmacy subject (PCI recognized) — Mandatory',
    exp: '15 yrs teaching/research; of which 5 yrs as Professor/HOD in PCI-approved college',
    ref: 'MQT 2014 — Table, Section II',
  },
  [DESIGNATIONS.PROFESSOR]: {
    label: 'Professor',
    ug: 'First Class B.Pharm (≥60%) from PCI-approved institution',
    pg: 'M.Pharm (relevant specialization, PCI recognized)',
    phd: 'Ph.D in any Pharmacy subject (PCI recognized) — Mandatory',
    exp: '10 yrs teaching/research; of which 5 yrs as Associate Professor in PCI-approved college',
    ref: 'MQT 2014 — Table, Section II',
  },
  [DESIGNATIONS.ASSOC_PROF]: {
    label: 'Associate Professor',
    ug: 'First Class B.Pharm (≥60%) from PCI-approved institution',
    pg: 'M.Pharm (relevant spec.) OR Pharm.D (for Pathophysiology, Pharmacology, Pharmacy Practice)',
    phd: 'Must acquire PCI-recognized Ph.D within 7 years of appointment to become eligible for Professor',
    exp: '3 yrs teaching/research at Assistant Professor level or equivalent in PCI-approved college',
    ref: 'MQT 2014 — Table, Section II',
  },
  [DESIGNATIONS.ASST_PROF]: {
    label: 'Assistant Professor',
    ug: 'First Class B.Pharm (≥60%) from PCI-approved institution',
    pg: 'M.Pharm (relevant spec.) OR Pharm.D (for Pathophysiology, Pharmacology, Pharmacy Practice)',
    phd: 'Not required for initial appointment',
    exp: 'No minimum experience required for initial appointment as Lecturer/Asst. Professor',
    ref: 'MQT 2014 — Table, Section II',
  },
  [DESIGNATIONS.LECTURER]: {
    label: 'Lecturer',
    ug: 'First Class B.Pharm (≥60%) from PCI-approved institution',
    pg: 'M.Pharm (relevant spec.) OR Pharm.D (for Pathophysiology, Pharmacology, Pharmacy Practice)',
    phd: 'Not required — re-designated as Asst. Professor after 2 years teaching in PCI-approved college',
    exp: 'No minimum experience required for initial appointment',
    ref: 'MQT 2014 — Table, Section II',
  },
};

// ─── Non-Teaching Staff requirements ─────────────────────────────────────────
// Source: Appendix-A, Clause 4 | Same count for intake 60 and 100
export const NON_TEACHING_REQUIREMENTS = [
  {
    id: 'lab_technician',
    role: 'Laboratory Technician',
    qualification: 'D.Pharm',
    minCount: 5,   // 1 per department (5 departments)
    countNote: '1 per department (5 depts)',
    ref: 'App.-A, Cl.4',
  },
  {
    id: 'lab_assistant',
    role: 'Laboratory Assistant / Attender',
    qualification: 'SSLC',
    minCount: 8,   // 1 per lab minimum (8 labs for B.Pharm)
    countNote: '1 per lab minimum (8 labs)',
    ref: 'App.-A, Cl.4',
  },
  {
    id: 'office_supt',
    role: 'Office Superintendent',
    qualification: 'Degree',
    minCount: 1,
    countNote: 'Min. 1',
    ref: 'App.-A, Cl.4',
  },
  {
    id: 'accountant',
    role: 'Accountant',
    qualification: 'Degree',
    minCount: 1,
    countNote: 'Min. 1',
    ref: 'App.-A, Cl.4',
  },
  {
    id: 'store_keeper',
    role: 'Store Keeper',
    qualification: 'D.Pharm or Bachelor Degree (recognized)',
    minCount: 1,
    countNote: 'Min. 1',
    ref: 'App.-A, Cl.4',
  },
  {
    id: 'computer_operator',
    role: 'Computer Data Operator',
    qualification: 'BCA or Graduate with Computer Course',
    minCount: 1,
    countNote: 'Min. 1',
    ref: 'App.-A, Cl.4',
  },
  {
    id: 'office_staff_1',
    role: 'Office Staff I',
    qualification: 'Degree',
    minCount: 1,
    countNote: 'Min. 1',
    ref: 'App.-A, Cl.4',
  },
  {
    id: 'office_staff_2',
    role: 'Office Staff II',
    qualification: 'Degree',
    minCount: 2,
    countNote: 'Min. 2',
    ref: 'App.-A, Cl.4',
  },
  {
    id: 'peon',
    role: 'Peon',
    qualification: 'SSLC',
    minCount: 2,
    countNote: 'Min. 2',
    ref: 'App.-A, Cl.4',
  },
];

// ─── Courses available ────────────────────────────────────────────────────────
export const COURSES = [
  { id: 'bpharm',  label: 'B.Pharm',  regulation: 'Course Regulations 2014' },
  { id: 'dpharm',  label: 'D.Pharm',  regulation: 'ER-2020' },
  { id: 'mpharm',  label: 'M.Pharm',  regulation: 'Course Regulations 2014' },
  { id: 'pharmd',  label: 'Pharm.D',  regulation: 'ER-2020' },
];

// ─── SIF sidebar navigation modules ──────────────────────────────────────────
export const SIF_MODULES = [
  { id: 'institution-info', label: 'Institution Info',    icon: '🏛️', status: 'done' },
  { id: 'infrastructure',   label: 'Infrastructure',      icon: '🏗️', status: 'done' },
  { id: 'faculty',          label: 'Faculty',             icon: '👩‍🏫', status: 'active' },
  { id: 'non-teaching',     label: 'Non-Teaching Staff',  icon: '🧑‍💼', status: 'pending' },
  { id: 'laboratory',       label: 'Laboratory',          icon: '🔬', status: 'pending' },
  { id: 'equipment',        label: 'Equipment',           icon: '⚗️', status: 'pending' },
  { id: 'curriculum',       label: 'Curriculum',          icon: '📚', status: 'pending' },
  { id: 'library',          label: 'Library',             icon: '📖', status: 'pending' },
  { id: 'finance',          label: 'Finance',             icon: '💰', status: 'pending' },
  { id: 'research',         label: 'Research',            icon: '🔭', status: 'pending' },
  { id: 'cocurricular',     label: 'Co-curricular',       icon: '🎓', status: 'pending' },
];

// ─── Compliance bottlenecks (for future validation layer) ────────────────────
// Source: Pharma_Validation_Workbook.xlsx, Sheet D - B.PHARM Bottlenecks
export const COMPLIANCE_BOTTLENECKS = [
  { id: 1,  rule: 'Full-time mandate',           desc: 'ALL faculty must be full-time — no exceptions per department', ref: 'App.-A, Cl.3(i)' },
  { id: 2,  rule: 'Ph.D for Prof/Principal',     desc: 'Professors and Principals must hold PCI-recognized Ph.D', ref: 'MQT 2014' },
  { id: 3,  rule: 'Assoc. Prof. Ph.D window',    desc: 'Must acquire Ph.D within 7 years of appointment', ref: 'MQT 2014' },
  { id: 4,  rule: 'First Class B.Pharm',         desc: 'Minimum 60% aggregate — non-negotiable for all faculty', ref: 'MQT 2014' },
  { id: 5,  rule: 'One-institution-per-session', desc: 'Counted in ONE college per academic year (1 Jul–30 Jun)', ref: 'MQT Cl.(xii)' },
  { id: 6,  rule: 'Pharmacy Practice at 100',    desc: 'Prof/AP mandatory at intake 100, not required at 60', ref: 'App.-A, Cl.3(iii)' },
  { id: 7,  rule: 'Pharm Analysis merged',       desc: 'Must be counted under Pharmaceutical Chemistry — not separate dept', ref: 'App.-A, Cl.3(iii)' },
  { id: 8,  rule: '8 labs exact composition',    desc: '2 Pharmaceutics, 2 Life Science, 2 Pharm Chem, 1 Pharmacognosy, 1 Pharm Analysis', ref: 'App.-A, Cl.5' },
  { id: 9,  rule: '900 sq.ft incl. Prep Room',   desc: 'Prep room area must be INCLUDED in the 900 sq.ft minimum — common error', ref: 'App.-A, Cl.5' },
  { id: 10, rule: 'Practical training timing',   desc: '150 hrs after 2nd year, min. 1 month — documented per student', ref: 'Reg. 7' },
  { id: 11, rule: 'Exam notice to PCI',          desc: 'Examining Authority must notify PCI ≥6 weeks before exams', ref: 'App.-B, Cl.6' },
  { id: 12, rule: 'Sessional records',           desc: 'Theory AND practical records for every student for every subject', ref: 'Reg. 13(1)' },
];
