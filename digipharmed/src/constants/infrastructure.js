// ─────────────────────────────────────────────────────────────────────────────
// INFRASTRUCTURE CONSTANTS
// Sources:
//   B.Pharm → Appendix-A, Cl. 5 & 6 | Course Regulations 2014, Gazette 362
//   D.Pharm → Appendix-3, ER-2020, Gazette 435
//   MOM-07  → DIGI-PHARMed Kickoff Meeting 7 (27 Mar 2026)
//
// MOM-07 key directives implemented here:
//   • Validation at institution level, not zone/hospital level
//   • Each session processed as discrete independent unit
//   • Course-wise infrastructure defined separately — no merging
//   • Hard validations at point of data entry (not only at scrutiny)
//   • Standard unit: sq. ft. (B.Pharm) / sq. mt. (D.Pharm) per regulation
//   • Mandatory vs Conditional fields (e.g. Herbal Garden = conditional)
//   • Deficiency detection must generate pre-computed report for PCI scrutiny
//   • Shared infrastructure rules: pending PCI confirmation — flagged as OPEN
//   • Admin-configurable thresholds (no backend code change needed)
// ─────────────────────────────────────────────────────────────────────────────

// ── Area units ──────────────────────────────────────────────────────────────
export const AREA_UNITS = {
  SQFT: 'sq. ft.',
  SQMT: 'sq. mt.',
};

// ── Status tokens used across all infra checks ──────────────────────────────
export const INFRA_STATUS = {
  COMPLIANT:     'compliant',
  NON_COMPLIANT: 'non_compliant',
  PARTIAL:       'partial',
  NOT_ENTERED:   'not_entered',
};

// ─────────────────────────────────────────────────────────────────────────────
// B.PHARM INFRASTRUCTURE REQUIREMENTS
// Source: Appendix-A, Clause 5 & 6 | Gazette No. 362, Dec 11 2014
// ─────────────────────────────────────────────────────────────────────────────

// ── Physical / general rooms ─────────────────────────────────────────────────
export const BPHARM_ROOMS = [
  {
    id: 'lecture_hall',
    label: 'Lecture Hall',
    mandatory: true,
    minCount: 2,
    minAreaPerUnit: 900, // sq. ft.
    areaUnit: AREA_UNITS.SQFT,
    note: 'Minimum 2 lecture halls required',
    ref: 'Appendix-A, Cl. 5',
  },
  {
    id: 'principal_room',
    label: 'Principal / HOD Room',
    mandatory: true,
    minCount: 1,
    minAreaPerUnit: null,
    areaUnit: AREA_UNITS.SQFT,
    note: 'Suitable accommodation with adequate ventilation and lighting',
    ref: 'Appendix-A, Cl. 5',
  },
  {
    id: 'office',
    label: 'Administrative Office',
    mandatory: true,
    minCount: 1,
    minAreaPerUnit: null,
    areaUnit: AREA_UNITS.SQFT,
    note: 'Adequate ventilation and hygienic conditions required',
    ref: 'Appendix-A, Cl. 5',
  },
  {
    id: 'library',
    label: 'Library',
    mandatory: true,
    minCount: 1,
    minAreaPerUnit: null,
    areaUnit: AREA_UNITS.SQFT,
    note: 'Must have adequate seating and reference materials',
    ref: 'Appendix-A, Cl. 5',
  },
  {
    id: 'staff_room',
    label: 'Staff Room',
    mandatory: true,
    minCount: 1,
    minAreaPerUnit: null,
    areaUnit: AREA_UNITS.SQFT,
    ref: 'Appendix-A, Cl. 5',
  },
  {
    id: 'common_room_student',
    label: "Student Common Room",
    mandatory: true,
    minCount: 1,
    minAreaPerUnit: null,
    areaUnit: AREA_UNITS.SQFT,
    ref: 'Appendix-A, Cl. 5',
  },
  {
    id: 'museum',
    label: 'Museum',
    mandatory: true,
    minCount: 1,
    minAreaPerUnit: null,
    areaUnit: AREA_UNITS.SQFT,
    ref: 'Appendix-A, Cl. 5',
  },
  {
    id: 'stores',
    label: 'Store Room',
    mandatory: true,
    minCount: 1,
    minAreaPerUnit: null,
    areaUnit: AREA_UNITS.SQFT,
    ref: 'Appendix-A, Cl. 5',
  },
  {
    id: 'balance_room',
    label: 'Balance Room',
    mandatory: true,
    minCount: 1,
    minAreaPerUnit: null,
    areaUnit: AREA_UNITS.SQFT,
    note: 'Additional provision — mandatory',
    ref: 'Appendix-A, Cl. 5',
  },
  {
    id: 'machine_room',
    label: 'Machine Room',
    mandatory: true,
    minCount: 1,
    minAreaPerUnit: null,
    areaUnit: AREA_UNITS.SQFT,
    note: 'Additional provision — mandatory',
    ref: 'Appendix-A, Cl. 5',
  },
  {
    id: 'animal_house',
    label: 'Animal House',
    mandatory: true,
    minCount: 1,
    minAreaPerUnit: null,
    areaUnit: AREA_UNITS.SQFT,
    note: 'CPCSEA compliance required; or replaced entirely by computer-assisted modules',
    ref: 'Appendix-A, Cl. 5',
  },
  {
    id: 'herbal_garden',
    label: 'Herbal Garden',
    mandatory: false, // conditional — shown only for courses with Pharmacognosy
    conditional: 'pharmacognosy',
    minCount: 1,
    minAreaPerUnit: null,
    areaUnit: AREA_UNITS.SQFT,
    note: 'Required for Pharmacognosy practical work',
    ref: 'Appendix-A, Cl. 5',
  },
];

// ── Laboratories — B.Pharm ────────────────────────────────────────────────────
// MOM-07: lab names must be controlled dropdown derived from regulation
// Composition: 2 Pharmaceutics+PK, 2 Life Science, 2 Pharm Chem, 1 Pharmacognosy, 1 Pharm Analysis
export const BPHARM_LABS = [
  {
    id: 'pharmaceutics_pk_1',
    label: 'Pharmaceutics & Pharmacokinetics Lab 1',
    group: 'Pharmaceutics & Pharmacokinetics',
    mandatory: true,
    minArea: 900,      // sq. ft. — includes preparation room
    areaUnit: AREA_UNITS.SQFT,
    areaPerStudent: 30, // sq. ft. per student at any given time
    minCount: 2,       // total in group
    note: 'Min 900 sq. ft. incl. Preparation Room. Must NOT exclude prep room from measurement.',
    bottleneck: '900 sq. ft. minimum INCLUDES Preparation Room — common measurement error',
    ref: 'Appendix-A, Cl. 5',
  },
  {
    id: 'pharmaceutics_pk_2',
    label: 'Pharmaceutics & Pharmacokinetics Lab 2',
    group: 'Pharmaceutics & Pharmacokinetics',
    mandatory: true,
    minArea: 900,
    areaUnit: AREA_UNITS.SQFT,
    areaPerStudent: 30,
    minCount: 2,
    ref: 'Appendix-A, Cl. 5',
  },
  {
    id: 'life_science_1',
    label: 'Life Science Lab 1 (Pharmacology / Physiology / Pathophysiology)',
    group: 'Life Science',
    mandatory: true,
    minArea: 900,
    areaUnit: AREA_UNITS.SQFT,
    areaPerStudent: 30,
    minCount: 2,
    ref: 'Appendix-A, Cl. 5',
  },
  {
    id: 'life_science_2',
    label: 'Life Science Lab 2 (Pharmacology / Physiology / Pathophysiology)',
    group: 'Life Science',
    mandatory: true,
    minArea: 900,
    areaUnit: AREA_UNITS.SQFT,
    areaPerStudent: 30,
    minCount: 2,
    ref: 'Appendix-A, Cl. 5',
  },
  {
    id: 'pharm_chemistry_1',
    label: 'Pharmaceutical Chemistry Lab 1',
    group: 'Pharmaceutical Chemistry',
    mandatory: true,
    minArea: 900,
    areaUnit: AREA_UNITS.SQFT,
    areaPerStudent: 30,
    minCount: 2,
    ref: 'Appendix-A, Cl. 5',
  },
  {
    id: 'pharm_chemistry_2',
    label: 'Pharmaceutical Chemistry Lab 2',
    group: 'Pharmaceutical Chemistry',
    mandatory: true,
    minArea: 900,
    areaUnit: AREA_UNITS.SQFT,
    areaPerStudent: 30,
    minCount: 2,
    ref: 'Appendix-A, Cl. 5',
  },
  {
    id: 'pharmacognosy_lab',
    label: 'Pharmacognosy Lab',
    group: 'Pharmacognosy',
    mandatory: true,
    minArea: 900,
    areaUnit: AREA_UNITS.SQFT,
    areaPerStudent: 30,
    minCount: 1,
    ref: 'Appendix-A, Cl. 5',
  },
  {
    id: 'pharm_analysis_lab',
    label: 'Pharmaceutical Analysis Lab',
    group: 'Pharmaceutical Analysis',
    mandatory: true,
    minArea: 900,
    areaUnit: AREA_UNITS.SQFT,
    areaPerStudent: 30,
    minCount: 1,
    note: 'Pharmaceutical Analysis is merged with Pharm. Chemistry in PCI staffing — separate lab still required',
    ref: 'Appendix-A, Cl. 5',
  },
];

// Lab fittings — apply to all labs
export const BPHARM_LAB_FITTINGS = [
  { id: 'gas_fittings',     label: 'Gas fittings',              mandatory: true,  ref: 'Appendix-A, Cl. 5' },
  { id: 'water_fittings',   label: 'Water fittings',            mandatory: true,  ref: 'Appendix-A, Cl. 5' },
  { id: 'shelves',          label: 'Shelves',                   mandatory: true,  ref: 'Appendix-A, Cl. 5' },
  { id: 'fuming_cupboard',  label: 'Fuming cupboard',           mandatory: true,  ref: 'Appendix-A, Cl. 5' },
  { id: 'aseptic_cabinet',  label: 'Aseptic room / cabinet',    mandatory: true,  ref: 'Appendix-A, Cl. 5' },
];

// ─────────────────────────────────────────────────────────────────────────────
// D.PHARM INFRASTRUCTURE REQUIREMENTS
// Source: Appendix-3, ER-2020 | Gazette No. 435, Oct 2020
// ─────────────────────────────────────────────────────────────────────────────

// 4 mandatory labs for D.Pharm
export const DPHARM_LABS = [
  {
    id: 'dpharm_lab1',
    label: 'Lab 1 — Physiology, Pharmacology & Pharmacognosy',
    mandatory: true,
    minArea: null,
    areaUnit: AREA_UNITS.SQMT,
    ref: 'Appendix-3, ER-2020',
  },
  {
    id: 'dpharm_lab2',
    label: 'Lab 2 — Pharmaceutical Chemistry / Biochemistry & Clinical Pathology',
    mandatory: true,
    minArea: null,
    areaUnit: AREA_UNITS.SQMT,
    ref: 'Appendix-3, ER-2020',
  },
  {
    id: 'dpharm_lab3',
    label: 'Lab 3 — Pharmaceutics',
    mandatory: true,
    minArea: null,
    areaUnit: AREA_UNITS.SQMT,
    ref: 'Appendix-3, ER-2020',
  },
  {
    id: 'dpharm_lab4',
    label: 'Lab 4 — Hospital & Clinical Pharmacy',
    mandatory: true,
    minArea: null,
    areaUnit: AREA_UNITS.SQMT,
    note: 'Requires adequate desktop computers with internet connectivity',
    ref: 'Appendix-3, ER-2020',
  },
  {
    id: 'dpharm_machine_room',
    label: 'Machine Room (part of Pharmaceutics Lab)',
    mandatory: true,
    minArea: null,
    areaUnit: AREA_UNITS.SQMT,
    note: 'All 17 machine room items must be present independently — cannot share with main Pharmaceutics lab during simultaneous batches',
    ref: 'Appendix-3, ER-2020 — Machine Room',
  },
  {
    id: 'dpharm_model_pharmacy',
    label: 'Model Community Pharmacy',
    mandatory: true,
    minArea: 80,       // sq. mt.
    areaUnit: AREA_UNITS.SQMT,
    note: 'Min. 80 sq. mt. total — must include Drug Information Centre (10 sq. mt.) + Patient Counselling area (10 sq. mt.) within the 80 sq. mt.',
    bottleneck: 'Model Pharmacy 80 sq. mt. must contain DIC (10 sqmt) + Patient Counselling (10 sqmt) within the space',
    ref: 'Appendix-3, ER-2020',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// EQUIPMENT LISTS — D.PHARM
// Source: Appendix-3, ER-2020 | counts for batch of 20 students (intake 60)
// ─────────────────────────────────────────────────────────────────────────────

export const DPHARM_EQUIPMENT = {
  dpharm_lab1: [
    { id: 'microscopes',           label: 'Microscopes',                                           minQty: 20,  qtyType: 'numeric', ref: 'Appendix-3, Lab 1, Pg. 69' },
    { id: 'haemocytometer',        label: 'Haemocytometer with Micropipettes',                     minQty: 20,  qtyType: 'numeric', ref: 'Appendix-3, Lab 1, Pg. 69' },
    { id: 'haemoglobinometer',     label: "Sahli's Haemoglobinometers",                            minQty: 20,  qtyType: 'numeric', ref: 'Appendix-3, Lab 1, Pg. 69' },
    { id: 'sphygmomanometer',      label: 'Sphygmomanometers',                                     minQty: 5,   qtyType: 'numeric', ref: 'Appendix-3, Lab 1, Pg. 69' },
    { id: 'stethoscopes',          label: 'Stethoscopes',                                          minQty: 10,  qtyType: 'numeric', ref: 'Appendix-3, Lab 1, Pg. 69' },
    { id: 'human_slides',          label: 'Human Permanent Slides — various tissues, organs, endocrine glands', minQty: 1, qtyType: 'adequate', qtyLabel: 'One pair of each', ref: 'Appendix-3, Lab 1, Pg. 69' },
    { id: 'organ_models',          label: 'Models for various organ systems',                      minQty: 1,   qtyType: 'adequate', qtyLabel: 'One model each organ system', ref: 'Appendix-3, Lab 1, Pg. 69' },
    { id: 'organ_specimens',       label: 'Specimens for various organs and systems',              minQty: 1,   qtyType: 'adequate', qtyLabel: 'One model each organ system', ref: 'Appendix-3, Lab 1, Pg. 69' },
    { id: 'human_skeleton',        label: 'Human Skeleton and bones',                             minQty: 1,   qtyType: 'adequate', qtyLabel: 'One set + one spare bone', ref: 'Appendix-3, Lab 1, Pg. 69' },
    { id: 'contraceptive_devices', label: 'Different Contraceptive Devices and Models',            minQty: 1,   qtyType: 'adequate', qtyLabel: 'One set of each device', ref: 'Appendix-3, Lab 1, Pg. 69' },
    { id: 'digital_balance_10mg',  label: 'Digital Balance (10 mg sensitivity)',                   minQty: 1,   qtyType: 'numeric', ref: 'Appendix-3, Lab 1, Pg. 69' },
    { id: 'computer_lcd',          label: 'Computer with LCD',                                     minQty: 1,   qtyType: 'numeric', ref: 'Appendix-3, Lab 1, Pg. 69' },
    { id: 'licensed_software',     label: 'Licensed Software for Physiological & Pharmacological experiments', minQty: 1, qtyType: 'numeric', ref: 'Appendix-3, Lab 1, Pg. 69' },
    { id: 'ir_thermometer',        label: 'IR Thermometer',                                        minQty: 2,   qtyType: 'numeric', ref: 'Appendix-3, Lab 1, Pg. 69' },
    { id: 'refrigerator_lab1',     label: 'Refrigerator',                                          minQty: 1,   qtyType: 'numeric', ref: 'Appendix-3, Lab 1, Pg. 69' },
    { id: 'stop_watch_lab1',       label: 'Stop Watch',                                            minQty: 20,  qtyType: 'numeric', ref: 'Appendix-3, Lab 1, Pg. 69' },
    { id: 'inhalers_nebulizer',    label: 'Dummy Inhalers and Nebulizer',                          minQty: 1,   qtyType: 'numeric', ref: 'Appendix-3, Lab 1, Pg. 69' },
    { id: 'digital_bp',            label: 'Digital BP Instrument',                                 minQty: 5,   qtyType: 'numeric', ref: 'Appendix-3, Lab 1, Pg. 69' },
    { id: 'mercury_thermometer',   label: 'Mercury Thermometer',                                   minQty: 10,  qtyType: 'numeric', ref: 'Appendix-3, Lab 1, Pg. 69' },
    { id: 'digital_thermometer',   label: 'Digital Thermometer',                                   minQty: 10,  qtyType: 'numeric', ref: 'Appendix-3, Lab 1, Pg. 69' },
    { id: 'pulse_oximeter',        label: 'Pulse Oximeter',                                        minQty: 5,   qtyType: 'numeric', ref: 'Appendix-3, Lab 1, Pg. 69' },
    { id: 'esr_apparatus',         label: 'ESR Apparatus (Westergren and Wintrobe)',               minQty: 10,  qtyType: 'numeric', ref: 'Appendix-3, Lab 1, Pg. 69' },
    { id: 'peak_flow_meter',       label: 'Peak Flow Meter',                                       minQty: 10,  qtyType: 'numeric', ref: 'Appendix-3, Lab 1, Pg. 69' },
    { id: 'stadiometer_lab1',      label: 'Stadiometer',                                           minQty: 2,   qtyType: 'numeric', ref: 'Appendix-3, Lab 1, Pg. 69' },
    { id: 'weighing_scale',        label: 'Adult Weighing Scale (150 kg)',                         minQty: 5,   qtyType: 'numeric', ref: 'Appendix-3, Lab 1, Pg. 69' },
    { id: 'glucometer',            label: 'Glucometer',                                            minQty: 10,  qtyType: 'numeric', ref: 'Appendix-3, Lab 1, Pg. 69' },
    { id: 'projection_microscope', label: 'Projection Microscope',                                 minQty: 1,   qtyType: 'numeric', ref: 'Appendix-3, Lab 1, Pg. 69' },
    { id: 'pharmacognosy_slides',  label: 'Permanent Slide Set of plants and charts for Pharmacognosy', minQty: 1, qtyType: 'adequate', qtyLabel: 'Adequate', ref: 'Appendix-3, Lab 1, Pg. 69' },
    { id: 'first_aid',             label: 'First Aid Equipment',                                   minQty: 1,   qtyType: 'adequate', qtyLabel: 'Adequate', ref: 'Appendix-3, Lab 1, Pg. 69' },
  ],

  dpharm_lab2: [
    { id: 'hot_plates_lab2',       label: 'Hot Plates',                                            minQty: 5,  qtyType: 'numeric', ref: 'Appendix-3, Lab 2, Pg. 70' },
    { id: 'hot_air_oven_lab2',     label: 'Hot Air Oven',                                          minQty: 1,  qtyType: 'numeric', ref: 'Appendix-3, Lab 2, Pg. 70' },
    { id: 'refrigerator_lab2',     label: 'Refrigerator',                                          minQty: 1,  qtyType: 'numeric', ref: 'Appendix-3, Lab 2, Pg. 70' },
    { id: 'analytical_balance',    label: 'Analytical Balances for demonstration',                 minQty: 1,  qtyType: 'numeric', ref: 'Appendix-3, Lab 2, Pg. 70' },
    { id: 'digital_balance_lab2',  label: 'Digital Balance (10 mg sensitivity)',                   minQty: 5,  qtyType: 'numeric', ref: 'Appendix-3, Lab 2, Pg. 70' },
    { id: 'magnetic_stirrer',      label: 'Magnetic Stirrers with Thermostat',                     minQty: 10, qtyType: 'numeric', ref: 'Appendix-3, Lab 2, Pg. 70' },
    { id: 'vacuum_pump_lab2',      label: 'Vacuum Pump',                                           minQty: 1,  qtyType: 'numeric', ref: 'Appendix-3, Lab 2, Pg. 70' },
    { id: 'ph_meter_lab2',         label: 'Digital pH Meter',                                      minQty: 1,  qtyType: 'numeric', ref: 'Appendix-3, Lab 2, Pg. 70' },
    { id: 'distillation_unit',     label: 'Wall Mounted Water Distillation Unit',                  minQty: 2,  qtyType: 'numeric', ref: 'Appendix-3, Lab 2, Pg. 70' },
    { id: 'nessler_cylinders',     label: "Nessler's Cylinders",                                   minQty: 40, qtyType: 'numeric', ref: 'Appendix-3, Lab 2, Pg. 70' },
    { id: 'melting_point',         label: 'Digital Melting Point Apparatus',                       minQty: 2,  qtyType: 'numeric', ref: 'Appendix-3, Lab 2, Pg. 70' },
    { id: 'thieles_tube',          label: "Thieles Tube",                                          minQty: 20, qtyType: 'numeric', ref: 'Appendix-3, Lab 2, Pg. 70' },
    { id: 'colorimeter',           label: 'Digital Colorimeter',                                   minQty: 2,  qtyType: 'numeric', ref: 'Appendix-3, Lab 2, Pg. 70' },
    { id: 'thermostatic_bath',     label: 'Thermostatic Water Bath',                               minQty: 1,  qtyType: 'numeric', ref: 'Appendix-3, Lab 2, Pg. 70' },
  ],

  dpharm_lab3: [
    { id: 'digital_balance_lab3',  label: 'Digital Balance (10 mg)',                               minQty: 5,  qtyType: 'numeric', ref: 'Appendix-3, Lab 3, Pg. 70' },
    { id: 'microscopes_lab3',      label: 'Microscopes',                                           minQty: 10, qtyType: 'numeric', ref: 'Appendix-3, Lab 3, Pg. 70' },
    { id: 'autoclave',             label: 'Autoclave',                                             minQty: 1,  qtyType: 'numeric', ref: 'Appendix-3, Lab 3, Pg. 70' },
    { id: 'vacuum_pump_lab3',      label: 'Vacuum Pump',                                           minQty: 1,  qtyType: 'numeric', ref: 'Appendix-3, Lab 3, Pg. 70' },
    { id: 'standard_sieves',       label: 'Standard Sieves (No. 8,10,12,22,24,44,54,60,80,85,100,120)', minQty: 10, qtyType: 'numeric', qtyLabel: '10 sets', ref: 'Appendix-3, Lab 3, Pg. 70' },
    { id: 'dissolution_apparatus', label: 'Tablet Dissolution Test Apparatus IP — Digital',        minQty: 1,  qtyType: 'numeric', ref: 'Appendix-3, Lab 3, Pg. 70' },
    { id: 'magnetic_stirrer_lab3', label: 'Magnetic Stirrer 500ml & 1L with speed control',        minQty: 5,  qtyType: 'numeric', ref: 'Appendix-3, Lab 3, Pg. 71' },
    { id: 'ph_meter_lab3',         label: 'Digital pH Meter',                                      minQty: 1,  qtyType: 'numeric', ref: 'Appendix-3, Lab 3, Pg. 71' },
    { id: 'capsule_counter',       label: 'Capsule Counter',                                       minQty: 2,  qtyType: 'numeric', ref: 'Appendix-3, Lab 3, Pg. 71' },
    { id: 'hot_plate_lab3',        label: 'Hot Plate',                                             minQty: 2,  qtyType: 'numeric', ref: 'Appendix-3, Lab 3, Pg. 71' },
    { id: 'distillation_lab3',     label: 'Distillation Unit',                                     minQty: 1,  qtyType: 'numeric', ref: 'Appendix-3, Lab 3, Pg. 71' },
    { id: 'tablet_counter',        label: 'Tablet Counter (small size)',                           minQty: 2,  qtyType: 'numeric', ref: 'Appendix-3, Lab 3, Pg. 71' },
    { id: 'hot_air_oven_lab3',     label: 'Hot Air Oven',                                          minQty: 1,  qtyType: 'numeric', ref: 'Appendix-3, Lab 3, Pg. 71' },
    { id: 'water_bath_lab3',       label: 'Electric Water Bath Unit',                              minQty: 2,  qtyType: 'numeric', ref: 'Appendix-3, Lab 3, Pg. 71' },
    { id: 'stalagmometer',         label: 'Stalagmometer',                                         minQty: 5,  qtyType: 'numeric', ref: 'Appendix-3, Lab 3, Pg. 71' },
    { id: 'desiccator',            label: 'Desiccator',                                            minQty: 5,  qtyType: 'numeric', ref: 'Appendix-3, Lab 3, Pg. 71' },
    { id: 'buchner_funnels',       label: 'Buchner Funnels (medium)',                              minQty: 10, qtyType: 'numeric', ref: 'Appendix-3, Lab 3, Pg. 71' },
    { id: 'filtration_assembly',   label: 'Filtration Assembly with Vacuum Pump',                  minQty: 1,  qtyType: 'numeric', ref: 'Appendix-3, Lab 3, Pg. 71' },
    { id: 'andreasons_pipette',    label: "Andreasen's Pipette",                                   minQty: 5,  qtyType: 'numeric', ref: 'Appendix-3, Lab 3, Pg. 71' },
    { id: 'ointment_slab',         label: 'Ointment Slab',                                         minQty: 20, qtyType: 'numeric', ref: 'Appendix-3, Lab 3, Pg. 71' },
    { id: 'ointment_spatula',      label: 'Ointment Spatula',                                      minQty: 20, qtyType: 'numeric', ref: 'Appendix-3, Lab 3, Pg. 71' },
    { id: 'pestle_mortar',         label: 'Pestle and Mortar (porcelain)',                         minQty: 20, qtyType: 'numeric', ref: 'Appendix-3, Lab 3, Pg. 71' },
    { id: 'refrigerator_lab3',     label: 'Refrigerator',                                          minQty: 1,  qtyType: 'numeric', ref: 'Appendix-3, Lab 3, Pg. 71' },
    { id: 'micrometre_eyepiece',   label: 'Micrometre Slide Eyepiece',                             minQty: 5,  qtyType: 'numeric', ref: 'Appendix-3, Lab 3, Pg. 71' },
    { id: 'micrometre_stage',      label: 'Micrometre Slide Stage',                                minQty: 5,  qtyType: 'numeric', ref: 'Appendix-3, Lab 3, Pg. 71' },
    { id: 'viscometer',            label: 'Viscometer Ostwald/Brookfield',                         minQty: 1,  qtyType: 'numeric', ref: 'Appendix-3, Lab 3, Pg. 71' },
    { id: 'stop_watch_lab3',       label: 'Stop Watch',                                            minQty: 1,  qtyType: 'numeric', ref: 'Appendix-3, Lab 3, Pg. 71' },
    { id: 'sintered_glass_filter', label: 'Sintered Glass Filter with Vacuum',                     minQty: 4,  qtyType: 'numeric', ref: 'Appendix-3, Lab 3, Pg. 71' },
  ],

  dpharm_machine_room: [
    { id: 'capsule_filling',       label: 'Capsule Filling Machine',                               minQty: 1,  qtyType: 'numeric', ref: 'Appendix-3, Machine Room, Pg. 71' },
    { id: 'tablet_punching',       label: 'Automated Single Station Tablet Punching Machine',      minQty: 1,  qtyType: 'numeric', ref: 'Appendix-3, Machine Room, Pg. 71' },
    { id: 'disintegration_tester', label: 'Tablet Disintegration Test Apparatus IP — Digital',     minQty: 1,  qtyType: 'numeric', ref: 'Appendix-3, Machine Room, Pg. 71' },
    { id: 'monsanto_hardness',     label: "Monsanto's Hardness Tester",                            minQty: 2,  qtyType: 'numeric', ref: 'Appendix-3, Machine Room, Pg. 71' },
    { id: 'pfizer_hardness',       label: 'Pfizer Type Hardness Tester',                           minQty: 2,  qtyType: 'numeric', ref: 'Appendix-3, Machine Room, Pg. 71' },
    { id: 'friability_tester',     label: 'Friability Test Apparatus — Digital',                   minQty: 1,  qtyType: 'numeric', ref: 'Appendix-3, Machine Room, Pg. 71' },
    { id: 'sieve_shaker',          label: 'Sieve Shaker with Sieve Set',                           minQty: 1,  qtyType: 'numeric', ref: 'Appendix-3, Machine Room, Pg. 71' },
    { id: 'ointment_filling',      label: 'Ointment Filling Machine',                              minQty: 1,  qtyType: 'numeric', ref: 'Appendix-3, Machine Room, Pg. 72' },
    { id: 'all_purpose_equip',     label: 'All-Purpose Equipment with all accessories',            minQty: 1,  qtyType: 'numeric', ref: 'Appendix-3, Machine Room, Pg. 72' },
    { id: 'bottle_washer',         label: 'Bottle Washing Machine',                                minQty: 1,  qtyType: 'numeric', ref: 'Appendix-3, Machine Room, Pg. 72' },
    { id: 'bottle_sealer',         label: 'Bottle Sealing Machine',                                minQty: 1,  qtyType: 'numeric', ref: 'Appendix-3, Machine Room, Pg. 72' },
    { id: 'liquid_filler',         label: 'Liquid Filling Machine',                                minQty: 1,  qtyType: 'numeric', ref: 'Appendix-3, Machine Room, Pg. 72' },
    { id: 'ampoule_washer',        label: 'Ampoule Washing Machine',                               minQty: 1,  qtyType: 'numeric', ref: 'Appendix-3, Machine Room, Pg. 72' },
    { id: 'ampoule_sealer',        label: 'Ampoule Filling and Sealing Machine (Jet Burner)',      minQty: 1,  qtyType: 'numeric', ref: 'Appendix-3, Machine Room, Pg. 72' },
    { id: 'clarity_tester',        label: 'Clarity Test Apparatus',                                minQty: 1,  qtyType: 'numeric', ref: 'Appendix-3, Machine Room, Pg. 72' },
    { id: 'collapsible_tube',      label: 'Collapsible Tube Filling and Sealing Machine',          minQty: 1,  qtyType: 'numeric', ref: 'Appendix-3, Machine Room, Pg. 72' },
    { id: 'liquid_mixer',          label: 'Liquid Mixer',                                          minQty: 1,  qtyType: 'numeric', ref: 'Appendix-3, Machine Room, Pg. 72' },
  ],

  dpharm_lab4: [
    { id: 'cpr_mannequin',         label: 'Mannequins for CPR (with indication signals)',          minQty: 2,  qtyType: 'numeric', ref: 'Appendix-3, Lab 4, Pg. 72' },
    { id: 'iv_mannequin',          label: 'Mannequins for Injection — IV Arm',                     minQty: 2,  qtyType: 'numeric', ref: 'Appendix-3, Lab 4, Pg. 72' },
    { id: 'needles',               label: 'Variety of Needles',                                    minQty: 20, qtyType: 'numeric', ref: 'Appendix-3, Lab 4, Pg. 72' },
    { id: 'syringes',              label: 'Variety of Syringes',                                   minQty: 20, qtyType: 'numeric', ref: 'Appendix-3, Lab 4, Pg. 72' },
    { id: 'catheters',             label: 'Variety of Catheters',                                  minQty: 5,  qtyType: 'numeric', ref: 'Appendix-3, Lab 4, Pg. 72' },
    { id: 'iv_set',                label: 'IV Set',                                                minQty: 20, qtyType: 'numeric', ref: 'Appendix-3, Lab 4, Pg. 72' },
    { id: 'urine_bag',             label: 'Urine Bag',                                             minQty: 2,  qtyType: 'numeric', ref: 'Appendix-3, Lab 4, Pg. 72' },
    { id: 'ryles_tube',            label: "RYLE's Tube",                                           minQty: 2,  qtyType: 'numeric', ref: 'Appendix-3, Lab 4, Pg. 72' },
    { id: 'urine_pots',            label: 'Urine Pots',                                            minQty: 2,  qtyType: 'numeric', ref: 'Appendix-3, Lab 4, Pg. 72' },
    { id: 'colostomy_bags',        label: 'Colostomy Bags',                                        minQty: 2,  qtyType: 'numeric', ref: 'Appendix-3, Lab 4, Pg. 72' },
    { id: 'oxygen_masks',          label: 'Oxygen Masks',                                          minQty: 10, qtyType: 'numeric', ref: 'Appendix-3, Lab 4, Pg. 72' },
    { id: 'retail_pharmacy_sw',    label: 'Inventory Software for Retail Pharmacy',                minQty: 1,  qtyType: 'numeric', ref: 'Appendix-3, Lab 4, Pg. 72' },
  ],

  dpharm_model_pharmacy: [
    { id: 'computer_lcd_mp',       label: 'Computer with LCD',                                     minQty: 1,  qtyType: 'numeric', ref: 'Appendix-3, Model Pharmacy, Pg. 73' },
    { id: 'pharmacy_mgmt_sw',      label: 'Computer with hospital & community pharmacy management software', minQty: 1, qtyType: 'numeric', ref: 'Appendix-3, Model Pharmacy, Pg. 73' },
    { id: 'patient_counselling',   label: 'Designated Patient Counselling Area',                   minQty: 1,  qtyType: 'area', areaMin: 10, areaUnit: 'sq. mt.', ref: 'Appendix-3, Model Pharmacy, Pg. 73' },
    { id: 'drug_info_centre',      label: 'Designated Drug Information Centre area',               minQty: 1,  qtyType: 'area', areaMin: 10, areaUnit: 'sq. mt.', ref: 'Appendix-3, Model Pharmacy, Pg. 73' },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// INFRASTRUCTURE CHECKLIST — B.Pharm
// Source: Validation Workbook Sheet C, rows 39-46
// ─────────────────────────────────────────────────────────────────────────────
export const BPHARM_INFRA_CHECKLIST = [
  { id: 'min_2_lecture_halls',    text: 'Minimum 2 lecture halls available',                                                                                ref: 'Appendix-A, Cl. 5' },
  { id: 'lab_composition',        text: '8 labs present — 2 Pharmaceutics+PK, 2 Life Science, 2 Pharm. Chemistry, 1 Pharmacognosy, 1 Pharm. Analysis',     ref: 'Appendix-A, Cl. 5' },
  { id: 'additional_rooms',       text: 'Balance room, aseptic room/cabinet, animal house, and machine room provided',                                      ref: 'Appendix-A, Cl. 5' },
  { id: 'floor_area_per_student', text: 'Lab floor area: minimum 30 sq. ft. per student working at any given time',                                         ref: 'Appendix-A, Cl. 5' },
  { id: 'total_floor_area',       text: 'Total lab floor area (incl. preparation room): minimum 900 sq. ft.',                                               ref: 'Appendix-A, Cl. 5' },
  { id: 'gas_water_fittings',     text: 'Gas and water fittings, shelves, fuming cupboards provided wherever necessary',                                    ref: 'Appendix-A, Cl. 5' },
  { id: 'accommodation',          text: 'Rooms for Principal/HOD, office, classrooms, library, staff rooms, student/staff common rooms, museum, stores — adequate ventilation and lighting', ref: 'Appendix-A, Cl. 5' },
  { id: 'equipment_present',      text: 'Equipment and apparatus as prescribed by PCI present for each department',                                          ref: 'Appendix-A, Cl. 6' },
];

// ─────────────────────────────────────────────────────────────────────────────
// INFRASTRUCTURE CHECKLIST — D.Pharm
// Source: Validation Workbook Sheet G, rows 8-19
// ─────────────────────────────────────────────────────────────────────────────
export const DPHARM_INFRA_CHECKLIST = [
  { id: 'd_4_labs',               text: '4 laboratories present: Pharmaceutics / Pharmaceutical Chemistry / Physiology-Pharmacology-Pharmacognosy / Biochemistry-Clinical Pathology-Hospital-Clinical Pharmacy', ref: 'Appendix-3, ER-2020' },
  { id: 'd_model_pharmacy',       text: 'Model Community Pharmacy: minimum 80 sq. mt. total — includes Drug Information Centre (10 sq. mt.) + Patient Counselling area (10 sq. mt.)', ref: 'Appendix-3, ER-2020' },
  { id: 'd_aseptic_cabinet',      text: 'Aseptic cabinet or aseptic area provided in Pharmaceutics Lab (as per ER-2020 Appendix-A)',                        ref: 'Appendix-3, ER-2020' },
  { id: 'd_machine_room',         text: 'Machine Room: all 17 specified equipment items present — capsule filling, tablet punching, disintegration tester, hardness testers ×2, friability tester, sieve shaker, ointment filling, ampoule machines, clarity tester, collapsible tube filler, liquid mixer, bottle washer, bottle sealer, liquid filler', ref: 'Appendix-3, Machine Room' },
  { id: 'd_lab1_items',           text: 'Lab 1 (Physiology/Pharmacology/Pharmacognosy): all 29 specified items present in required quantities (batch of 20)', ref: 'Appendix-3, Lab 1' },
  { id: 'd_lab2_items',           text: 'Lab 2 (Pharmaceutical Chemistry/Biochemistry): all 14 specified items present in required quantities',              ref: 'Appendix-3, Lab 2' },
  { id: 'd_lab3_items',           text: 'Lab 3 (Pharmaceutics): all 28 specified items present in required quantities',                                     ref: 'Appendix-3, Lab 3' },
  { id: 'd_lab4_items',           text: 'Lab 4 (Hospital & Clinical Pharmacy): all 12 specified items present in required quantities',                      ref: 'Appendix-3, Lab 4' },
  { id: 'd_model_pharmacy_items', text: 'Model Pharmacy: all 4 specified items present — including computer with pharmacy management software, Drug Information Centre area, Patient Counselling area', ref: 'Appendix-3, Model Pharmacy' },
  { id: 'd_glassware',            text: 'Adequate glassware provided in each laboratory and department',                                                    ref: 'Appendix-3, All sections' },
  { id: 'd_computers',            text: 'Desktop computers with internet connectivity available in Hospital & Clinical Pharmacy Lab (adequate numbers)',     ref: 'ER20-25P NOTE' },
  { id: 'd_computer_module',      text: 'Animal experimentation replaced entirely with computer-assisted modules (e.g., Ex Pharm or equivalent licensed software)', ref: 'Appendix-3 NOTE; PCI D.Pharm Amendment' },
];
