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

// ─── Qualifications List (MQT 2014) ──────────────────────────────────────────
export const QUALIFICATIONS = [
  { id: 'bpharm', label: 'B. Pharm (Bachelor of Pharmacy)', category: 'pharmacy' },
  { id: 'mpharm', label: 'M. Pharm (Master of Pharmacy)', category: 'pharmacy' },
  { id: 'pharmd', label: 'Pharm. D (Doctor of Pharmacy)', category: 'pharmacy' },
  { id: 'phd_pharmacy', label: 'Ph.D (Pharmacy/Pharmaceutical Sciences)', category: 'pharmacy' },
  { id: 'phd_other', label: 'Ph.D (any Pharmacy-related subject)', category: 'pharmacy' },
  { id: 'dpharm', label: 'D. Pharm (Diploma in Pharmacy)', category: 'pharmacy' },
  { id: 'mbbs', label: 'M.B.B.S. (Bachelor of Medicine)', category: 'medical' },
  { id: 'msc_math', label: 'M.Sc. (Mathematics)', category: 'support' },
  { id: 'msc_zoology', label: 'M.Sc. (Zoology)', category: 'support' },
  { id: 'msc_botany', label: 'M.Sc. (Botany)', category: 'support' },
  { id: 'be_cs', label: 'B.E. (Computer Science)', category: 'support' },
  { id: 'mca', label: 'MCA (Master of Computer Applications)', category: 'support' },
];

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

// ─── D.Pharm Faculty Requirements (MQT Regulations 2014) ──────────────────────
// Source: D.PHARM — FACULTY QUALIFICATION REQUIREMENTS (MQT Regulations 2014)
// Table: Section I (Diploma Course)
export const DPHARM_MQT_REQUIREMENTS = {
  hoi: {
    label: 'Principal / Director / Head of Institution / Head of Department',
    qualification: 'PCI recognized Post Graduate qualification in any discipline of Pharmaceutical Sciences OR PCI recognized Pharm D qualification',
    experience: 'Essential: 5 years teaching experience in PCI-approved/recognized College; Desirable: Administrative experience in a responsible position',
    ref: 'MQT 2014 — Table, Section I (Diploma Course)',
  },
  lecturer_pharmacy: {
    label: 'Lecturer — Pharmacy Subjects',
    qualification: 'PCI recognized M Pharm / Pharm D OR PCI recognized B Pharm',
    experience: 'Essential: 3 years professional experience',
    ref: 'MQT 2014 — Table, Section I (Diploma Course)',
  },
  lecturer_anatomy: {
    label: 'Lecturer — Anatomy & Physiology / Bio-Chemistry & Clinical Pathology (part-time permitted)',
    qualification: 'M B B S qualification',
    experience: 'As applicable to the subject',
    ref: 'MQT 2014 — Table, Section I (Diploma Course)',
  },
  lecturer_mathematics: {
    label: 'Lecturer — Mathematics (part-time permitted)',
    qualification: 'M Sc (Mathematics)',
    experience: 'As applicable to the subject',
    ref: 'MQT 2014 — Table, Section I (Diploma Course)',
  },
  lecturer_biology: {
    label: 'Lecturer — Biology (part-time permitted)',
    qualification: 'M Sc (Zoology) or M Sc (Botany)',
    experience: 'As applicable to the subject',
    ref: 'MQT 2014 — Table, Section I (Diploma Course)',
  },
  lecturer_computer: {
    label: 'Lecturer — Computer Science (part-time permitted)',
    qualification: 'B E (Computer Science) or MCA',
    experience: 'As applicable to the subject',
    ref: 'MQT 2014 — Table, Section I (Diploma Course)',
  },
};

// ─── D.Pharm General Requirements ────────────────────────────────────────────
export const DPHARM_GENERAL_REQUIREMENTS = {
  basicPharmacyDegree: 'All pharmacy teachers must possess a basic pharmacy degree recognized by PCI, obtained from a PCI-approved examining authority (University) under Section 12 of the Pharmacy Act 1948',
  statePharmacyCouncilRegistration: 'State Pharmacy Council registration must be current and valid at the time of appointment and continuously thereafter',
  noConcurrentEmployment: 'No faculty member is concurrently employed at another pharmacy institution — Staff Declaration Forms collected and on file',
  oneInstitutionPerSession: 'One-institution-per-session rule verified: each faculty member counted in only one pharmacy college for the current academic year (1 July – 30 June)',
  payScaleFloor: 'Pay scales for all teaching faculty are not less than State Govt / UGC/AICTE prescribed rates for equivalent posts',
  noDebarmentOrder: 'No faculty member currently under a 3-year debarment order from PCI for misconduct or concurrent employment violation',
  equivalentQualifications: 'Equivalent qualifications, if any, are formally approved and notified by PCI — documentary proof available',
  promotionsCompliant: 'Promotions for existing regular faculty governed by MQT Regulations 2014 — promotion orders reviewed accordingly',
  fullTimeMandate: 'All pharmacy subject lecturers appointed as full-time — appointment orders confirmed',
  partTimePermitted: 'Part-time staff, if appointed, ONLY for Mathematics, Statistics, Basic Electronics, Computer Applications, Pharmaceutical Business Management, Engineering Drawing, and Pathology',
};

// ─── Compliance Checklist for D.Pharm Faculty ──────────────────────────────
// Source: D.PHARM — FACULTY QUALIFICATION COMPLIANCE CHECKLIST
export const DPHARM_COMPLIANCE_CHECKLIST = [
  {
    id: 1,
    area: 'Principal / Director',
    item: 'PCI/HCI appointment order available and confirmed as full-time',
    category: 'appointment',
    ref: 'MQT 2014 — Table, Section I (Diploma Course)',
  },
  {
    id: 2,
    area: 'Principal / Director',
    item: 'M Pharm/PG in any Pharmaceutical Sciences discipline OR PCI recognized Pharm D',
    category: 'qualification',
    ref: 'MQT 2014 — Table, Section I',
  },
  {
    id: 3,
    area: 'Principal / Director',
    item: '5 years teaching experience in PCI-approved/recognized Pharmacy College confirmed via experience certificates',
    category: 'experience',
    ref: 'MQT 2014',
  },
  {
    id: 4,
    area: 'Principal / Director',
    item: 'Current State Pharmacy Council registration certificate on file',
    category: 'registration',
    ref: 'MQT 2014',
  },
  {
    id: 5,
    area: 'Principal / Director',
    item: 'Degree/certificate originals sighted and attested copies maintained in personnel file',
    category: 'documents',
    ref: 'Document Verification',
  },
  {
    id: 6,
    area: 'Lecturers — Pharmacy Subjects',
    item: 'Appointment orders for all Lecturers confirmed as full-time',
    category: 'appointment',
    ref: 'MQT 2014',
  },
  {
    id: 7,
    area: 'Lecturers — Pharmacy Subjects',
    item: 'Each Lecturer holds PCI recognized M Pharm / Pharm D OR PCI recognized B Pharm — degree certificates verified',
    category: 'qualification',
    ref: 'MQT 2014 — Table, Section I (Diploma Course)',
  },
  {
    id: 8,
    area: 'Lecturers — Pharmacy Subjects',
    item: '3 years professional experience verified via experience certificates / appointment orders for each Lecturer',
    category: 'experience',
    ref: 'MQT 2014',
  },
  {
    id: 9,
    area: 'Lecturers — Pharmacy Subjects',
    item: 'No Lecturer appointed to a Pharmacy subject holds only a non-pharmacy qualification',
    category: 'compliance',
    ref: 'MQT 2014',
  },
  {
    id: 10,
    area: 'Lecturers — Pharmacy Subjects',
    item: 'Current State Pharmacy Council registration certificate on file for each Lecturer',
    category: 'registration',
    ref: 'MQT 2014',
  },
  {
    id: 11,
    area: 'Part-Time Permitted Subjects',
    item: 'Part time staff, if appointed, are ONLY for Mathematics & Statistics, Basic Electronics, Computer Applications, Pharmaceutical Business Management, Engineering Drawing, and Pathology',
    category: 'compliance',
    ref: 'MQT 2014',
  },
  {
    id: 12,
    area: 'Part-Time Anatomy & Physiology / Bio-Chemistry & Clinical Pathology',
    item: 'Lecturer for Anatomy & Physiology & Clinical Pathology must hold M B B S qualification (verified)',
    category: 'qualification',
    ref: 'MQT 2014',
  },
  {
    id: 13,
    area: 'Part-Time Mathematics',
    item: 'Lecturer for Mathematics (part-time) — M Sc (Mathematics) qualification verified',
    category: 'qualification',
    ref: 'MQT 2014',
  },
  {
    id: 14,
    area: 'Part-Time Biology',
    item: 'Lecturer for Biology (part-time) — M Sc (Zoology) or M Sc (Botany) qualification verified',
    category: 'qualification',
    ref: 'MQT 2014',
  },
  {
    id: 15,
    area: 'Part-Time Computer Science',
    item: 'Lecturer for Computer Science (part-time) — B E (Computer Science) or MCA qualification verified',
    category: 'qualification',
    ref: 'MQT 2014',
  },
  {
    id: 16,
    area: 'Part-Time Permitted Subjects',
    item: 'No part-time staff appointed for any core pharmacy subject outside the permitted list',
    category: 'compliance',
    ref: 'MQT 2014',
  },
  {
    id: 17,
    area: 'General Compliance',
    item: 'All pharmacy teachers possess a PCI-recognized basic pharmacy degree from a PCI-approved examining authority (University) under Section 12 of the Pharmacy Act 1948',
    category: 'compliance',
    ref: 'MQT 2014',
  },
  {
    id: 18,
    area: 'General Compliance',
    item: 'State Pharmacy Council registration verified as current and valid for every faculty member',
    category: 'registration',
    ref: 'MQT 2014',
  },
  {
    id: 19,
    area: 'General Compliance',
    item: 'No faculty member is concurrently employed at another pharmacy institution — Staff Declaration Forms collected and on file',
    category: 'compliance',
    ref: 'MQT 2014',
  },
  {
    id: 20,
    area: 'General Compliance',
    item: 'One-institution-per-session rule verified: each faculty member counted in only one pharmacy college for the current academic year (1 July – 30 June)',
    category: 'compliance',
    ref: 'MQT 2014, Clause (xii)',
  },
  {
    id: 21,
    area: 'General Compliance',
    item: 'Pay scales for all teaching faculty are not less than State Govt / UGC/AICTE prescribed rates for equivalent posts',
    category: 'compliance',
    ref: 'MQT 2014',
  },
  {
    id: 22,
    area: 'General Compliance',
    item: 'No faculty member currently under a 3-year debarment order from PCI for misconduct or concurrent employment violation',
    category: 'compliance',
    ref: 'MQT 2014',
  },
  {
    id: 23,
    area: 'General Compliance',
    item: 'Equivalent qualifications, if any, are formally approved and notified by PCI — documentary proof available',
    category: 'compliance',
    ref: 'MQT 2014',
  },
  {
    id: 24,
    area: 'General Compliance',
    item: 'Promotions for existing regular faculty governed by MQT Regulations 2014 — promotion orders reviewed accordingly',
    category: 'compliance',
    ref: 'MQT 2014',
  },
  {
    id: 25,
    area: 'Document Verification',
    item: 'Degree certificates (UG and PG) — originals sighted, attested copies on file for each faculty member',
    category: 'documents',
    ref: 'Document Verification',
  },
  {
    id: 26,
    area: 'Document Verification',
    item: 'Experience certificates from all previous institutions — one certificate per institution on file',
    category: 'documents',
    ref: 'Document Verification',
  },
  {
    id: 27,
    area: 'Document Verification',
    item: 'Appointment/joining letter at current institution on file',
    category: 'documents',
    ref: 'Document Verification',
  },
  {
    id: 28,
    area: 'Document Verification',
    item: 'State Pharmacy Council registration certificate — current, valid, on file',
    category: 'documents',
    ref: 'Document Verification',
  },
  {
    id: 29,
    area: 'Document Verification',
    item: 'Staff Declaration Form (SDF) signed and submitted by each faculty member',
    category: 'documents',
    ref: 'Compliance',
  },
  {
    id: 30,
    area: 'Document Verification',
    item: 'Salary slips/payroll records for last 3 months confirming full-time employment',
    category: 'documents',
    ref: 'Document Verification',
  },
];

// ─── Part-Time Permitted Subjects ────────────────────────────────────────────
export const PART_TIME_PERMITTED_SUBJECTS = [
  'Mathematics & Statistics',
  'Basic Electronics',
  'Computer Applications',
  'Pharmaceutical Business Management',
  'Engineering Drawing',
  'Pathology',
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
