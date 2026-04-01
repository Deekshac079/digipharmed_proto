import { useState, useCallback, useMemo } from 'react';
import {
  BPHARM_ROOMS, BPHARM_LABS, BPHARM_LAB_FITTINGS, BPHARM_INFRA_CHECKLIST,
  DPHARM_LABS, DPHARM_EQUIPMENT, DPHARM_INFRA_CHECKLIST,
  INFRA_STATUS,
} from '../constants/infrastructure';

// ── Build initial form state ─────────────────────────────────────────────────
function buildInitialForm(course) {
  if (course === 'bpharm') {
    const rooms = {};
    BPHARM_ROOMS.forEach(r => {
      rooms[r.id] = { available: null, count: '', area: '', remarks: '' };
    });
    const labs = {};
    BPHARM_LABS.forEach(l => {
      labs[l.id] = { available: null, area: '', remarks: '' };
    });
    const fittings = {};
    BPHARM_LAB_FITTINGS.forEach(f => {
      fittings[f.id] = { available: null };
    });
    const checklist = {};
    BPHARM_INFRA_CHECKLIST.forEach(c => {
      checklist[c.id] = null; // null = not entered
    });
    return { rooms, labs, fittings, checklist, equipment: {} };
  }

  if (course === 'dpharm') {
    const labs = {};
    DPHARM_LABS.forEach(l => {
      labs[l.id] = { available: null, area: '', remarks: '' };
    });
    const equipment = {};
    Object.entries(DPHARM_EQUIPMENT).forEach(([labId, items]) => {
      items.forEach(item => {
        equipment[item.id] = { qty: '', area: '' };
      });
    });
    const checklist = {};
    DPHARM_INFRA_CHECKLIST.forEach(c => {
      checklist[c.id] = null;
    });
    return { rooms: {}, labs, fittings: {}, checklist, equipment };
  }

  return { rooms: {}, labs: {}, fittings: {}, checklist: {}, equipment: {} };
}

// ── Compute per-lab equipment deficiencies ───────────────────────────────────
function computeEquipmentDeficiencies(equipment, course) {
  if (course !== 'dpharm') return {};
  const deficiencies = {};
  Object.entries(DPHARM_EQUIPMENT).forEach(([labId, items]) => {
    items.forEach(item => {
      if (item.qtyType === 'numeric') {
        const entered = parseInt(equipment[item.id]?.qty ?? '', 10);
        if (!isNaN(entered) && entered < item.minQty) {
          if (!deficiencies[labId]) deficiencies[labId] = [];
          deficiencies[labId].push({
            itemId: item.id,
            label: item.label,
            required: item.minQty,
            actual: entered,
            shortfall: item.minQty - entered,
          });
        }
      }
    });
  });
  return deficiencies;
}

// ── Compute overall compliance summary ───────────────────────────────────────
function computeInfraCompliance(form, course) {
  let total = 0, passed = 0, deficiencies = [];

  if (course === 'bpharm') {
    // Rooms
    BPHARM_ROOMS.forEach(r => {
      if (!r.mandatory) return;
      total++;
      const v = form.rooms[r.id];
      if (v?.available === true) passed++;
      else deficiencies.push({ section: 'Rooms', label: r.label, ref: r.ref });
    });
    // Labs
    BPHARM_LABS.forEach(l => {
      total++;
      const v = form.labs[l.id];
      const areaOk = !l.minArea || (parseFloat(v?.area) >= l.minArea);
      if (v?.available === true && areaOk) passed++;
      else deficiencies.push({
        section: 'Labs',
        label: l.label,
        detail: !areaOk ? `Area ${v?.area || 0} sq.ft < required ${l.minArea} sq.ft` : 'Not available',
        ref: l.ref,
      });
    });
    // Fittings
    BPHARM_LAB_FITTINGS.forEach(f => {
      if (!f.mandatory) return;
      total++;
      const v = form.fittings[f.id];
      if (v?.available === true) passed++;
      else deficiencies.push({ section: 'Lab Fittings', label: f.label, ref: f.ref });
    });
  }

  if (course === 'dpharm') {
    // Labs
    DPHARM_LABS.forEach(l => {
      total++;
      const v = form.labs[l.id];
      const areaOk = !l.minArea || (parseFloat(v?.area) >= l.minArea);
      if (v?.available === true && areaOk) passed++;
      else deficiencies.push({
        section: 'Labs',
        label: l.label,
        detail: !areaOk ? `Area ${v?.area || 0} sq.mt < required ${l.minArea} sq.mt` : 'Not available',
        ref: l.ref,
      });
    });
    // Equipment — count items not meeting minimum
    Object.entries(DPHARM_EQUIPMENT).forEach(([labId, items]) => {
      items.forEach(item => {
        if (item.qtyType !== 'numeric') return;
        total++;
        const entered = parseInt(form.equipment[item.id]?.qty ?? '', 10);
        if (!isNaN(entered) && entered >= item.minQty) passed++;
        else deficiencies.push({
          section: 'Equipment',
          label: item.label,
          detail: isNaN(entered) ? 'Not entered' : `${entered} < required ${item.minQty}`,
          ref: item.ref,
        });
      });
    });
  }

  const pct = total > 0 ? Math.round((passed / total) * 100) : 0;
  return { total, passed, failed: total - passed, pct, deficiencies };
}

// ── Hook ─────────────────────────────────────────────────────────────────────
export function useInfrastructureStore(course = 'bpharm') {
  const [form, setForm]         = useState(() => buildInitialForm(course));
  const [activeCourse, setActiveCourse] = useState(course);
  const [lastSaved, setLastSaved]       = useState(null);

  // Reset form when course changes
  const changeCourse = useCallback((newCourse) => {
    setActiveCourse(newCourse);
    setForm(buildInitialForm(newCourse));
  }, []);

  // ── Room field update ──────────────────────────────────────────────────────
  const updateRoom = useCallback((id, field, value) => {
    setForm(prev => ({
      ...prev,
      rooms: { ...prev.rooms, [id]: { ...prev.rooms[id], [field]: value } },
    }));
  }, []);

  // ── Lab field update ───────────────────────────────────────────────────────
  const updateLab = useCallback((id, field, value) => {
    setForm(prev => ({
      ...prev,
      labs: { ...prev.labs, [id]: { ...prev.labs[id], [field]: value } },
    }));
  }, []);

  // ── Fitting update ─────────────────────────────────────────────────────────
  const updateFitting = useCallback((id, value) => {
    setForm(prev => ({
      ...prev,
      fittings: { ...prev.fittings, [id]: { available: value } },
    }));
  }, []);

  // ── Equipment quantity update ──────────────────────────────────────────────
  const updateEquipment = useCallback((id, field, value) => {
    setForm(prev => ({
      ...prev,
      equipment: { ...prev.equipment, [id]: { ...prev.equipment[id], [field]: value } },
    }));
  }, []);

  // ── Checklist update ───────────────────────────────────────────────────────
  const updateChecklist = useCallback((id, value) => {
    setForm(prev => ({
      ...prev,
      checklist: { ...prev.checklist, [id]: value },
    }));
  }, []);

  // ── Derived ───────────────────────────────────────────────────────────────
  const equipmentDeficiencies = useMemo(
    () => computeEquipmentDeficiencies(form.equipment, activeCourse),
    [form.equipment, activeCourse]
  );

  const compliance = useMemo(
    () => computeInfraCompliance(form, activeCourse),
    [form, activeCourse]
  );

  return {
    form,
    activeCourse,
    lastSaved,
    compliance,
    equipmentDeficiencies,
    changeCourse,
    updateRoom,
    updateLab,
    updateFitting,
    updateEquipment,
    updateChecklist,
    setLastSaved,
  };
}
