import React, { useState, useCallback } from 'react';
import { useFacultyStore } from '../../hooks/useFacultyStore';
import { CourseIntakeSelector } from './CourseIntakeSelector';
import { ComplianceSummary }    from './ComplianceSummary';
import { HOISection }           from './HOISection';
import { RequirementMatrix }    from './RequirementMatrix';
import { FacultyRoster }        from './FacultyRoster';
import { NonTeachingStaff }     from './NonTeachingStaff';
import { AddFacultyDrawer }     from './AddFacultyDrawer';
import { RegStrip, Toast }      from '../shared/Shared';
import './FacultyPage.css';

export function FacultyPage() {
  const store = useFacultyStore();

  // Drawer state
  const [drawerOpen,    setDrawerOpen]    = useState(false);
  const [prefillDept,   setPrefillDept]   = useState(null);
  const [prefillDesig,  setPrefillDesig]  = useState(null);

  // Toast state
  const [toast, setToast] = useState({ visible: false, message: '', type: 'default' });

  const showToast = useCallback((message, type = 'default') => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 3200);
  }, []);

  function openDrawer(dept = null, desig = null) {
    setPrefillDept(dept);
    setPrefillDesig(desig);
    setDrawerOpen(true);
  }

  function handleSaveDraft() {
    showToast('Draft saved successfully', 'success');
  }

  return (
    <div className="faculty-page">

      {/* Regulation reference */}
      <RegStrip>
        <strong>Regulatory basis:</strong> B.Pharm Course Regulations 2014, Appendix-A, Clause 3 &amp; 4
        (Gazette No. 362, Dec 11 2014) &nbsp;|&nbsp;
        Minimum Qualification for Teachers (MQT) Regulations 2014 (Gazette No. 325, Nov 12 2014)
        &nbsp;|&nbsp;
        All faculty must be <strong>full-time</strong>. Part-time permitted only for Mathematics,
        Statistics, Basic Electronics, Computer Applications.
      </RegStrip>

      {/* Course + Intake selector */}
      <CourseIntakeSelector
        course={store.course}
        intake={store.intake}
        onCourseChange={id => {
          store.setCourse(id);
          showToast(`Switched to ${id.toUpperCase()} view`, 'success');
        }}
        onIntakeChange={n => {
          store.setIntake(n);
          showToast(`Intake updated to ${n} seats — requirements recalculated`, 'success');
        }}
      />

      {/* Compliance summary bar */}
      <ComplianceSummary compliance={store.compliance} />

      {/* HOI section */}
      <HOISection
        faculty={store.filteredFaculty}
        onEdit={store.updateFaculty}
        onAddClick={openDrawer}
      />

      {/* Requirement matrix */}
      <RequirementMatrix
        requirements={store.requirements}
        slotCounts={store.slotCounts}
        intake={store.intake}
        faculty={store.filteredFaculty}
        onAddClick={openDrawer}
        onEdit={store.updateFaculty}
      />

      {/* Faculty roster */}
      <FacultyRoster
        faculty={store.filteredFaculty}
        onEdit={store.updateFaculty}
        onRemove={id => {
          store.removeFaculty(id);
          showToast('Faculty member removed', 'default');
        }}
      />

      {/* Non-teaching staff */}
      <NonTeachingStaff
        ntCounts={store.ntCounts}
        onAdjust={store.adjustNtCount}
      />

      {/* Add faculty drawer */}
      <AddFacultyDrawer
        open={drawerOpen}
        prefillDept={prefillDept}
        prefillDesig={prefillDesig}
        onClose={() => setDrawerOpen(false)}
        onSave={store.addFaculty}
        onToast={showToast}
      />

      {/* Toast */}
      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
      />
    </div>
  );
}
