import React from 'react';
import { Button } from '../shared/Shared';
import './TopBar.css';

const PAGE_META = {
  faculty: {
    title:    'Faculty Module',
    crumb:    'Faculty',
    primaryLabel: '+ Add Faculty',
    hasPrimary: true,
  },
  infrastructure: {
    title:    'Infrastructure Module',
    crumb:    'Infrastructure',
    primaryLabel: 'View Scrutiny Report',
    hasPrimary: false,   // scrutiny lives inside the page itself
  },
  institution: {
    title:    'Institution Information',
    crumb:    'Institution Info',
    hasPrimary: false,
  },
  curriculum: {
    title:    'Curriculum',
    crumb:    'Curriculum',
    hasPrimary: false,
  },
  library: {
    title:    'Library',
    crumb:    'Library',
    hasPrimary: false,
  },
  finance: {
    title:    'Finance',
    crumb:    'Finance',
    hasPrimary: false,
  },
};

export function TopBar({ activePage = 'faculty', lastSaved, onSaveDraft, onPrimaryAction }) {
  const meta = PAGE_META[activePage] || PAGE_META.faculty;

  return (
    <header className="top-bar">
      <div className="top-bar-left">
        <div className="page-title">{meta.title}</div>
        <div className="breadcrumb">
          Seven Hills College of Pharmacy
          <span className="bc-sep">›</span>
          <span>SIF 2026–27</span>
          <span className="bc-sep">›</span>
          <span>{meta.crumb}</span>
        </div>
      </div>

      <div className="top-bar-right">
        {lastSaved && (
          <span className="save-hint">Last saved: {lastSaved}</span>
        )}
        <Button variant="ghost" onClick={onSaveDraft}>Save Draft</Button>
        {meta.hasPrimary && (
          <Button variant="primary" onClick={onPrimaryAction}>
            {meta.primaryLabel}
          </Button>
        )}
      </div>
    </header>
  );
}
