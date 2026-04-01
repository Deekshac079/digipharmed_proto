import React, { useState, useCallback } from 'react';
import { useInfrastructureStore } from '../../hooks/useInfrastructureStore';
import { CourseIntakeSelector }   from '../faculty/CourseIntakeSelector';
import { InfraComplianceSummary } from './InfraComplianceSummary';
import { RoomsSection }           from './RoomsSection';
import { LabsSection }            from './LabsSection';
import { EquipmentSection }       from './EquipmentSection';
import { ScrutinyPanel }          from './ScrutinyPanel';
import { RegStrip, Toast }        from '../shared/Shared';
import './InfrastructurePage.css';

export function InfrastructurePage() {
  const store = useInfrastructureStore('bpharm');

  const [intake, setIntake] = useState(60);
  const [toast,  setToast]  = useState({ visible: false, message: '', type: 'default' });
  const [scrutinyOpen, setScrutinyOpen] = useState(false);

  const showToast = useCallback((message, type = 'default') => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 3000);
  }, []);

  function handleCourseChange(id) {
    store.changeCourse(id);
    showToast(`Switched to ${id.toUpperCase()} — infrastructure requirements updated`, 'success');
  }

  function handleSaveDraft() {
    store.setLastSaved('just now');
    showToast('Infrastructure draft saved', 'success');
  }

  const regText = store.activeCourse === 'bpharm'
    ? 'B.Pharm Course Regulations 2014, Appendix-A, Clause 5 & 6 (Gazette No. 362, Dec 11 2014) — Area unit: sq. ft. · Min 900 sq. ft. per lab incl. Preparation Room · 30 sq. ft. per student at any given time'
    : 'D.Pharm Education Regulations ER-2020, Appendix-3 (Gazette No. 435, Oct 2020) — Equipment counts for batch of 20 students (intake 60) · Scale proportionally for larger intake';

  return (
    <div className="infra-page">

      {/* Reg reference */}
      <RegStrip>
        <strong>Regulatory basis:</strong> {regText}
      </RegStrip>

      {/* Course + intake selector */}
      <CourseIntakeSelector
        course={store.activeCourse}
        intake={intake}
        onCourseChange={handleCourseChange}
        onIntakeChange={setIntake}
      />

      {/* Compliance summary */}
      <InfraComplianceSummary
        compliance={store.compliance}
        onViewScrutiny={() => setScrutinyOpen(true)}
      />

      {/* Rooms section — B.Pharm only */}
      {store.activeCourse === 'bpharm' && (
        <RoomsSection
          form={store.form}
          onUpdateRoom={store.updateRoom}
          onUpdateFitting={store.updateFitting}
        />
      )}

      {/* Labs section — both courses */}
      <LabsSection
        form={store.form}
        course={store.activeCourse}
        intake={intake}
        onUpdateLab={store.updateLab}
      />

      {/* Equipment section — D.Pharm only */}
      {store.activeCourse === 'dpharm' && (
        <EquipmentSection
          form={store.form}
          deficiencies={store.equipmentDeficiencies}
          onUpdateEquipment={store.updateEquipment}
        />
      )}

      {/* Scrutiny panel overlay */}
      <ScrutinyPanel
        open={scrutinyOpen}
        onClose={() => setScrutinyOpen(false)}
        compliance={store.compliance}
        form={store.form}
        course={store.activeCourse}
        checklist={store.form.checklist}
        onUpdateChecklist={store.updateChecklist}
      />

      <Toast message={toast.message} type={toast.type} visible={toast.visible} />

      <div style={{ height: 48 }} />
    </div>
  );
}
