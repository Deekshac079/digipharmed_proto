import React from 'react';
import { DESIGNATIONS } from '../../constants/regulations';
import { SectionCard, SlotBadge, Button } from '../shared/Shared';
import './HOISection.css';

export function HOISection({ faculty, onEdit, onAddClick }) {
  const hoi = faculty.find(f => f.designation === DESIGNATIONS.HOI);
  const countVariant = hoi ? 'ok' : 'error';

  return (
    <SectionCard
      icon="👔"
      iconVariant="blue"
      title="Director / Principal / Head of Institution"
      subtitle="Appendix-A, Cl. 3(ii) · 1 mandatory · First Class B.Pharm + M.Pharm + Ph.D · 15 yrs experience"
      countLabel={hoi ? '1 / 1' : '0 / 1'}
      countVariant={countVariant}
    >
      {hoi ? (
        <div className="hoi-table-wrap">
          <table className="hoi-table">
            <thead>
              <tr>
                <th>Faculty name</th>
                <th>Council no.</th>
                <th>Qualification</th>
                <th>Experience</th>
                <th>Employment</th>
                <th>SPC reg.</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="faculty-name">{hoi.name}</div>
                  <div className="faculty-council">{hoi.councilNo}</div>
                </td>
                <td className="cell-mono cell-sm">{hoi.councilNo}</td>
                <td>
                  <div className="flex-row gap-4">
                    <span className="qual-ok">✓</span>
                    <span className="cell-sm">
                      {[hoi.qualification?.pg, hoi.qualification?.phd].filter(Boolean).join(' + ')}
                    </span>
                  </div>
                </td>
                <td className="cell-sm">{hoi.experienceYears} yrs</td>
                <td>
                  <SlotBadge type="filled">Full-time</SlotBadge>
                </td>
                <td>
                  <SlotBadge type={hoi.spcRegistration === 'valid' ? 'filled' : 'pending'}>
                    {hoi.spcRegistration === 'valid' ? 'Valid' : 'Pending'}
                  </SlotBadge>
                </td>
                <td>
                  <SlotBadge type={hoi.status === 'verified' ? 'filled' : 'pending'}>
                    {hoi.status === 'verified' ? 'Verified' : 'Review'}
                  </SlotBadge>
                </td>
                <td>
                  <Button size="sm" variant="ghost" onClick={() => onEdit(hoi.id, {})}>
                    Edit
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="hoi-empty">
          <div className="hoi-empty-icon">⚠️</div>
          <div className="hoi-empty-text">
            No Head of Institution appointed. This is a mandatory requirement.
          </div>
          <Button
            variant="primary"
            onClick={() => onAddClick(null, DESIGNATIONS.HOI)}
          >
            + Appoint HOI
          </Button>
        </div>
      )}
    </SectionCard>
  );
}
