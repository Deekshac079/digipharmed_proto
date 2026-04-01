import { useState, useCallback, useMemo } from 'react';
import { BPHARM_REQUIREMENTS, NON_TEACHING_REQUIREMENTS, DEPARTMENTS, DESIGNATIONS } from '../constants/regulations';
import { SEED_FACULTY, SEED_NON_TEACHING_COUNTS } from '../data/seedFaculty';

// ─── Derive slot counts from faculty roster ────────────────────────────────
function deriveSlotCounts(faculty, course) {
  const counts = {};
  faculty
    .filter(f => f.courses.includes(course))
    .forEach(f => {
      // Map assoc_prof into professor slot for matrix purposes
      const desigKey = f.designation === DESIGNATIONS.ASSOC_PROF
        ? DESIGNATIONS.PROFESSOR
        : f.designation;
      const key = `${f.department}_${desigKey}`;
      counts[key] = (counts[key] || 0) + 1;
    });
  return counts;
}

// ─── Compute compliance summary ────────────────────────────────────────────
function computeCompliance(faculty, ntCounts, intake, course) {
  const reqs = BPHARM_REQUIREMENTS[intake] || BPHARM_REQUIREMENTS[60];
  const slotCounts = deriveSlotCounts(faculty, course);

  let totalRequired = 1; // +1 for HOI
  let totalFilled   = faculty.filter(f => f.designation === DESIGNATIONS.HOI && f.courses.includes(course)).length > 0 ? 1 : 0;
  let totalVacant   = totalFilled === 0 ? 1 : 0;
  let qualPending   = faculty.filter(f => f.status === 'qual_review' && f.courses.includes(course)).length;

  Object.entries(reqs).forEach(([key, req]) => {
    const filled = Math.min(slotCounts[key] || 0, req);
    totalRequired += req;
    totalFilled   += filled;
    totalVacant   += Math.max(0, req - (slotCounts[key] || 0));
  });

  // NT compliance
  let ntVacant = 0;
  NON_TEACHING_REQUIREMENTS.forEach(({ id, minCount }) => {
    const actual = ntCounts[id] || 0;
    if (actual < minCount) ntVacant += (minCount - actual);
  });

  const pct = totalRequired > 0 ? Math.round((totalFilled / totalRequired) * 100) : 0;

  return { totalRequired, totalFilled, totalVacant, qualPending, ntVacant, pct };
}

// ─── Hook ─────────────────────────────────────────────────────────────────
export function useFacultyStore() {
  const [faculty, setFaculty]   = useState(SEED_FACULTY);
  const [ntCounts, setNtCounts] = useState(SEED_NON_TEACHING_COUNTS);
  const [course, setCourse]     = useState('bpharm');
  const [intake, setIntake]     = useState(60);
  const [lastSaved, setLastSaved] = useState('2 min ago');

  // ── Roster operations ──────────────────────────────────────────────────
  const addFaculty = useCallback((member) => {
    const newMember = { ...member, id: `f${Date.now()}`, status: 'pending' };
    setFaculty(prev => [...prev, newMember]);
    setLastSaved('just now');
  }, []);

  const updateFaculty = useCallback((id, updates) => {
    setFaculty(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f));
    setLastSaved('just now');
  }, []);

  const removeFaculty = useCallback((id) => {
    setFaculty(prev => prev.filter(f => f.id !== id));
    setLastSaved('just now');
  }, []);

  // ── NT counter operations ──────────────────────────────────────────────
  const adjustNtCount = useCallback((id, delta) => {
    setNtCounts(prev => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + delta),
    }));
    setLastSaved('just now');
  }, []);

  // ── Derived data ───────────────────────────────────────────────────────
  const filteredFaculty = useMemo(
    () => faculty.filter(f => f.courses.includes(course)),
    [faculty, course]
  );

  const slotCounts = useMemo(
    () => deriveSlotCounts(faculty, course),
    [faculty, course]
  );

  const compliance = useMemo(
    () => computeCompliance(faculty, ntCounts, intake, course),
    [faculty, ntCounts, intake, course]
  );

  const requirements = useMemo(
    () => BPHARM_REQUIREMENTS[intake] || BPHARM_REQUIREMENTS[60],
    [intake]
  );

  return {
    // State
    faculty,
    filteredFaculty,
    ntCounts,
    course,
    intake,
    lastSaved,
    // Derived
    slotCounts,
    compliance,
    requirements,
    // Actions
    setCourse,
    setIntake,
    addFaculty,
    updateFaculty,
    removeFaculty,
    adjustNtCount,
  };
}
