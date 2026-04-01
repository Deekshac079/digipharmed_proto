import React from 'react';
import { COURSES, INTAKE_OPTIONS } from '../../constants/regulations';
import './CourseIntakeSelector.css';

export function CourseIntakeSelector({ course, intake, onCourseChange, onIntakeChange }) {
  return (
    <div className="context-bar">
      <span className="ctx-label">Course</span>

      <div className="course-tabs">
        {COURSES.map(c => (
          <button
            key={c.id}
            className={`course-tab ${course === c.id ? 'active' : ''}`}
            onClick={() => onCourseChange(c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="divider-v" />

      <span className="ctx-label">Approved Intake</span>

      <div className="intake-toggle">
        {INTAKE_OPTIONS.map(n => (
          <button
            key={n}
            className={`intake-btn ${intake === n ? 'active' : ''}`}
            onClick={() => onIntakeChange(n)}
          >
            {n} seats
          </button>
        ))}
      </div>
    </div>
  );
}
